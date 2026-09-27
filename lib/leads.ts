import path from "node:path";
import fs from "node:fs/promises";
import ExcelJS from "exceljs";

// Server-side lead capture for the DHN-26 Contact form. This is a deliberate,
// narrowly-scoped EXCEPTION to PROJECT_BRIEF.md §6 rule 2 ("front-end-only, no
// real API routes") — agreed with the client so submissions can be reported and
// analysed in Excel instead of only showing a mock "thanks" screen. See the
// "Lead capture" section in README.md before relying on this in production:
// it writes to a file on local disk, which does NOT survive on read-only or
// ephemeral serverless filesystems (e.g. a default Vercel deploy) — it needs
// a server with persistent storage, or migrating to a real database.
//
// The DHN-55 Become-a-Host form and its "Host Enquiries" sheet were removed.
// An existing workbook keeps any rows already in that sheet: it is no longer
// managed here, but exceljs carries unknown sheets through read/write intact.

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.xlsx");

const SHEETS = {
  contact: {
    name: "Contact Enquiries",
    columns: [
      { header: "Submitted At", key: "submittedAt", width: 22 },
      { header: "Category", key: "category", width: 16 },
      { header: "Name", key: "name", width: 22 },
      { header: "Email", key: "email", width: 26 },
      { header: "Category Detail", key: "categoryDetail", width: 32 },
      { header: "Message", key: "message", width: 50 },
    ],
  },
} as const;

export type SheetKey = keyof typeof SHEETS;

async function loadWorkbook(): Promise<ExcelJS.Workbook> {
  const workbook = new ExcelJS.Workbook();
  try {
    await fs.access(LEADS_FILE);
    await workbook.xlsx.readFile(LEADS_FILE);
  } catch {
    // No workbook on disk yet — start a fresh one below.
  }

  for (const key of Object.keys(SHEETS) as SheetKey[]) {
    const { name, columns } = SHEETS[key];
    const sheet = workbook.getWorksheet(name) ?? workbook.addWorksheet(name);
    // Re-apply columns (including `key`) on EVERY load, not just when the
    // sheet is new. exceljs does not persist a column's `key` inside the
    // .xlsx file itself (it's JS-side-only metadata for object-keyed
    // addRow calls) — after workbook.xlsx.readFile(), a loaded worksheet's
    // columns have lost their `key` mapping, so addRow({key: value}) would
    // silently append an EMPTY row (verified: this dropped every second
    // submission across two sheets before this fix). Re-setting `.columns`
    // on an already-populated sheet remaps existing cells by position, so
    // data survives as long as this column order never changes.
    sheet.columns = columns as unknown as Array<Partial<ExcelJS.Column>>;
    sheet.getRow(1).font = { bold: true };
  }

  return workbook;
}

// A tiny in-process write queue: concurrent requests must not read-modify-
// write the same file at once, since that would silently drop a submission.
// This only serialises writes within a single Node process/instance, which
// is the same durability boundary as the file storage itself (see README).
let writeQueue: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const result = writeQueue.then(task, task);
  writeQueue = result.then(
    () => undefined,
    () => undefined,
  );
  return result;
}

export function appendLead(sheetKey: SheetKey, row: Record<string, unknown>): Promise<void> {
  return enqueue(async () => {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const workbook = await loadWorkbook();
    const sheet = workbook.getWorksheet(SHEETS[sheetKey].name);
    if (!sheet) throw new Error(`Missing worksheet for "${sheetKey}"`);
    sheet.addRow(row);
    await workbook.xlsx.writeFile(LEADS_FILE);
  });
}

export function readLeadsWorkbookBuffer(): Promise<Buffer> {
  return enqueue(async () => {
    const workbook = await loadWorkbook();
    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  });
}
