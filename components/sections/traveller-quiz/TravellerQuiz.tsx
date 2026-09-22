"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Mail, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CapabilityBadge } from "@/components/ui/CapabilityBadge";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import {
  ARCHETYPES,
  ARCH_ORDER,
  QUESTIONS,
  SECTIONS,
  type ArchetypeKey,
  type QuizQuestion,
} from "@/content/traveller-quiz-data";

// DHN-54? — Traveller Preference Quiz. See PROJECT_BRIEF.md §4's second
// amendment: this ticket number conflicts with Travel Guides (already
// DHN-54, built at /travel-guides) and is UNRESOLVED — check the live Jira
// ticket before trusting either mapping. A gamified 45-question survey
// (stamped "passport" progress, XP, confetti, an 8-archetype "Traveller DNA"
// reveal) ported from the standalone prototype artifact
// (https://claude.ai/artifact/Gcu7EsFaBs39i4anQJYbAt). Front-end only, per
// PROJECT_BRIEF.md §6 rule 2 (no database/API routes for this feature):
// completed quizzes are sent as a pre-filled email rather than written to a
// backend — labeled "live" below because that email flow genuinely works
// today, not a demo.

const DHYANA_EMAIL = "dhyanaarccreation@gmail.com"; // matches components/nav/Footer.tsx
const DRAFT_KEY = "dhyana_quiz_draft";

type SingleAnswer = { value: string; text?: string };
type MultiAnswer = { selected: string[]; text?: string };
type AnswerValue = SingleAnswer | MultiAnswer | string;
type AnswerMap = Record<number, AnswerValue>;

// ---------- pure helpers (operate on QUESTIONS + an AnswerMap) ----------

function isAnswered(q: QuizQuestion, answers: AnswerMap): boolean {
  const a = answers[q.id];
  if (a === undefined) return false;
  if (q.type === "multi") return (a as MultiAnswer).selected.length > 0;
  if (q.type === "short" || q.type === "long") return typeof a === "string" && a.trim().length > 0;
  return Boolean((a as SingleAnswer).value);
}

function visibleQuestions(answers: AnswerMap): QuizQuestion[] {
  return QUESTIONS.filter((q) => {
    if (!q.showIf) return true;
    const dep = answers[q.showIf.q] as SingleAnswer | undefined;
    return dep?.value !== q.showIf.not;
  });
}

function answerText(q: QuizQuestion, answers: AnswerMap): string {
  const a = answers[q.id];
  if (a === undefined) return "";
  if (q.type === "single") {
    const sa = a as SingleAnswer;
    const opt = q.opts?.find((o) => o.v === sa.value);
    let txt = opt ? opt.l : sa.value;
    if (sa.value === "other" && sa.text) txt += ` (${sa.text})`;
    return txt;
  }
  if (q.type === "multi") {
    const ma = a as MultiAnswer;
    const labels = ma.selected.map((v) => q.opts?.find((o) => o.v === v)?.l ?? v);
    if (ma.selected.includes("other") && ma.text) {
      const i = labels.indexOf("Other");
      if (i > -1) labels[i] = `Other (${ma.text})`;
    }
    return labels.join(", ");
  }
  return (a as string).trim();
}

function scoreArchetype(answers: AnswerMap): ArchetypeKey {
  const tally = Object.fromEntries(ARCH_ORDER.map((k) => [k, 0])) as Record<ArchetypeKey, number>;
  QUESTIONS.forEach((q) => {
    const a = answers[q.id];
    if (a === undefined) return;
    const vals = q.type === "single" ? [(a as SingleAnswer).value] : q.type === "multi" ? (a as MultiAnswer).selected : [];
    vals.forEach((v) => {
      const opt = q.opts?.find((o) => o.v === v);
      if (!opt?.tags) return;
      (Object.keys(opt.tags) as ArchetypeKey[]).forEach((k) => {
        tally[k] += opt.tags![k] ?? 0;
      });
    });
  });
  let best = ARCH_ORDER[0];
  ARCH_ORDER.forEach((k) => {
    if (tally[k] > tally[best]) best = k;
  });
  return best;
}

function computeStats(answers: AnswerMap) {
  const v16 = (answers[16] as SingleAnswer | undefined)?.value;
  const v19 = (answers[19] as SingleAnswer | undefined)?.value;
  const v14 = (answers[14] as SingleAnswer | undefined)?.value;
  const bools = [
    v16 ? ["experience", "luxury", "unique"].includes(v16) : null,
    v19 ? ["b", "depends-exp"].includes(v19) : null,
    v14 ? v14 === "b" : null,
  ].filter((b): b is boolean => b !== null);
  const expScore = bools.length ? Math.round((bools.filter(Boolean).length / bools.length) * 100) : 0;

  const v12 = (answers[12] as SingleAnswer | undefined)?.value;
  const plannerType = v12
    ? ["1-3m", "gt3m"].includes(v12)
      ? "Planner"
      : ["last-minute", "1-3d"].includes(v12)
        ? "Spontaneous"
        : "Balanced"
    : "—";

  return { expScore, plannerType };
}

function buildReport(answers: AnswerMap, full: boolean): string {
  const archetype = ARCHETYPES[scoreArchetype(answers)];
  const lines: string[] = [`TRAVELLER DNA: ${archetype.emoji} ${archetype.name}`, archetype.tagline, ""];
  let curSec = 0;
  QUESTIONS.forEach((q) => {
    if (q.showIf) {
      const dep = answers[q.showIf.q] as SingleAnswer | undefined;
      if (dep?.value === q.showIf.not) return;
    }
    const txt = answerText(q, answers);
    if (!txt) return;
    if (q.sec !== curSec) {
      curSec = q.sec;
      lines.push("", `— ${SECTIONS[curSec - 1].title.toUpperCase()} —`);
    }
    lines.push(`Q${q.id}. ${q.q}`, `→ ${full ? txt : txt.length > 220 ? `${txt.slice(0, 220)}…` : txt}`);
  });
  lines.push("", "Submitted via the Dhyana Stays Traveller Quiz");
  let text = lines.join("\n");
  if (!full && text.length > 5800) text = `${text.slice(0, 5800)}\n\n…(truncated for email — full answers captured in-app)`;
  return text;
}

// ---------- small presentational pieces ----------

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface p-4">
      <div className="font-display text-xl font-semibold text-brand">{value}</div>
      <div className="mt-1 text-xs opacity-60">{label}</div>
    </div>
  );
}

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotate: number;
  color: string;
}

const CONFETTI_COLORS = ["#33513f", "#7fa98d", "#c98e2e", "#e4ebe3", "#a4c7ac"];

// Read the reduced-motion preference via useSyncExternalStore rather than an
// effect + setState — avoids an extra render pass and SSR/client mismatches.
function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}

// ---------- main component ----------

export function TravellerQuiz() {
  const [screen, setScreen] = useState<"intro" | "quiz" | "result">("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [xp, setXp] = useState(0);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, getReducedMotionServerSnapshot);

  const otherInputRef = useRef<HTMLInputElement>(null);
  const answersRef = useRef(answers);
  const idxRef = useRef(idx);
  const advancingRef = useRef(false);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);
  useEffect(() => {
    idxRef.current = idx;
    advancingRef.current = false;
  }, [idx]);

  // Load any saved draft on mount — client only. This is a legitimate
  // one-time sync from an external system (localStorage), not state derived
  // from props/state, so it stays a mount effect rather than a lazy useState
  // initializer: an initializer would run during SSR (no localStorage) and
  // again on the client's first hydration pass with different data, causing
  // a hydration mismatch. Deliberately deviating from
  // react-hooks/set-state-in-effect here.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { answers?: AnswerMap; xp?: number };
        if (parsed.answers && Object.keys(parsed.answers).length > 0) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- see comment above
          setAnswers(parsed.answers);
          setXp(parsed.xp ?? 0);
        }
      }
    } catch {
      /* ignore — per-viewer convenience only */
    }
  }, []);

  // Persist the draft as answers change (skip the very first empty state).
  useEffect(() => {
    if (Object.keys(answers).length === 0) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ answers, xp }));
    } catch {
      /* ignore */
    }
  }, [answers, xp]);

  useEffect(() => {
    if (!toastMsg) return;
    const t = setTimeout(() => setToastMsg(null), 1800);
    return () => clearTimeout(t);
  }, [toastMsg]);

  const burst = useCallback(
    (n: number) => {
      if (reduceMotion) return;
      const pieces: ConfettiPiece[] = Array.from({ length: n }).map((_, i) => ({
        id: Date.now() + i + Math.random(),
        x: (Math.random() - 0.5) * 280,
        y: Math.random() * -220 - 80,
        rotate: (Math.random() - 0.5) * 480,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      }));
      setConfetti((p) => [...p, ...pieces]);
      setTimeout(() => {
        setConfetti((p) => p.filter((piece) => !pieces.some((np) => np.id === piece.id)));
      }, 1200);
    },
    [reduceMotion],
  );

  const qs = useMemo(() => visibleQuestions(answers), [answers]);
  const currentQ = qs[Math.min(idx, qs.length - 1)];
  const hasProgress = Object.keys(answers).length > 0;

  function advance() {
    if (advancingRef.current) return;
    advancingRef.current = true;
    const list = visibleQuestions(answersRef.current);
    const i = idxRef.current;
    const prevQ = list[i];
    const nextI = i + 1;
    if (nextI >= list.length) {
      setScreen("result");
      burst(80);
      return;
    }
    const nextQ = list[nextI];
    if (prevQ && nextQ.sec !== prevQ.sec) {
      const sec = SECTIONS[prevQ.sec - 1];
      setToastMsg(`Section stamped — ${sec.icon} ${sec.title} ✓`);
      burst(36);
    }
    setIdx(nextI);
  }

  function retreat() {
    setIdx((i) => Math.max(0, i - 1));
  }

  function startQuiz() {
    let resumeIdx = 0;
    if (hasProgress) {
      resumeIdx = qs.length;
      for (let i = 0; i < qs.length; i++) {
        if (!isAnswered(qs[i], answers)) {
          resumeIdx = i;
          break;
        }
      }
    }
    setIdx(resumeIdx);
    setScreen("quiz");
  }

  function restartQuiz() {
    setAnswers({});
    setXp(0);
    setIdx(0);
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }
    setScreen("intro");
  }

  function selectSingle(q: QuizQuestion, v: string) {
    const wasAnswered = isAnswered(q, answers);
    const prev = answers[q.id] as SingleAnswer | undefined;
    setAnswers({ ...answers, [q.id]: { value: v, text: v === "other" ? (prev?.value === "other" ? prev.text : "") : undefined } });
    if (!wasAnswered) setXp((x) => x + 10);
    if (v === "other") setTimeout(() => otherInputRef.current?.focus(), 60);
    else setTimeout(() => advance(), 320);
  }

  function toggleMulti(q: QuizQuestion, v: string) {
    const cur = (answers[q.id] as MultiAnswer | undefined) ?? { selected: [], text: "" };
    const already = cur.selected.includes(v);
    if (!already && q.max && cur.selected.length >= q.max) {
      setToastMsg(`You can pick up to ${q.max}`);
      return;
    }
    const nextSelected = already ? cur.selected.filter((x) => x !== v) : [...cur.selected, v];
    const wasAnswered = cur.selected.length > 0;
    setAnswers({ ...answers, [q.id]: { ...cur, selected: nextSelected } });
    if (!wasAnswered && nextSelected.length > 0) setXp((x) => x + 10);
    if (!already && v === "other") setTimeout(() => otherInputRef.current?.focus(), 60);
  }

  function setOtherText(q: QuizQuestion, val: string) {
    if (q.type === "multi") {
      const cur = (answers[q.id] as MultiAnswer | undefined) ?? { selected: [], text: "" };
      setAnswers({ ...answers, [q.id]: { ...cur, text: val } });
    } else {
      const cur = (answers[q.id] as SingleAnswer | undefined) ?? { value: "other" };
      setAnswers({ ...answers, [q.id]: { ...cur, text: val } });
    }
  }

  function setTextAnswer(q: QuizQuestion, val: string) {
    const wasAnswered = isAnswered(q, answers);
    setAnswers({ ...answers, [q.id]: val });
    if (!wasAnswered && val.trim().length > 0) setXp((x) => x + 10);
  }

  const archetypeKey = useMemo(() => scoreArchetype(answers), [answers]);
  const archetype = ARCHETYPES[archetypeKey];
  const stats = useMemo(() => computeStats(answers), [answers]);
  const emailBody = useMemo(() => buildReport(answers, false), [answers]);
  const fullReport = useMemo(() => buildReport(answers, true), [answers]);
  const mailtoHref = `mailto:${DHYANA_EMAIL}?subject=${encodeURIComponent(`Dhyana Traveller Survey — ${archetype.name}`)}&body=${encodeURIComponent(emailBody)}`;

  function handleCopy() {
    setCopyModalOpen(true);
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(fullReport).then(
        () => setToastMsg("Copied to clipboard ✓"),
        () => {},
      );
    }
  }

  const inSection = currentQ ? qs.filter((q) => q.sec === currentQ.sec) : [];
  const posInSection = currentQ ? inSection.indexOf(currentQ) : 0;
  const sectionPct = inSection.length ? Math.round((posInSection / inSection.length) * 100) : 0;

  return (
    <section className="relative mx-auto max-w-2xl px-6 py-16 sm:py-20">
      {/* toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed left-1/2 top-4 z-50 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white shadow-lg"
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* confetti */}
      <div className="pointer-events-none fixed inset-x-0 top-1/3 z-40 overflow-hidden" aria-hidden>
        <AnimatePresence>
          {confetti.map((p) => (
            <motion.span
              key={p.id}
              className="absolute left-1/2 top-0 block h-2 w-3 rounded-sm"
              style={{ backgroundColor: p.color }}
              initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              animate={{ opacity: 0, x: p.x, y: p.y, rotate: p.rotate }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
      </div>

      {screen === "intro" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Dhyana Stays · Traveller Survey</p>
            <CapabilityBadge capability="live" />
          </div>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
            What kind of <em className="text-brand not-italic">traveller</em> are you? 🌍
          </h1>
          <p className="max-w-xl text-sm leading-6 opacity-70 sm:text-base">
            Your next stay should feel like you. Answer honestly — there are no right answers, just your travel
            style. Takes about 3–5 minutes, and you&rsquo;ll get a fun Traveller DNA result at the end.
          </p>
          <div className="flex flex-wrap gap-2">
            {SECTIONS.slice(0, 6).map((s) => (
              <span key={s.n} className="rounded-full border border-dashed border-border-subtle px-3 py-1.5 text-xs opacity-70">
                {s.icon} {s.title}
              </span>
            ))}
            <span className="rounded-full border border-dashed border-border-subtle px-3 py-1.5 text-xs opacity-70">+ 7 more</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs opacity-60">
            <span>🕐 3–5 min</span>
            <span>📝 45 quick questions</span>
            <span>🪪 A Traveller DNA result at the end</span>
          </div>
          <div className="space-y-2 pt-2">
            <Button variant="primary" onClick={startQuiz} className="w-full sm:w-auto">
              {hasProgress ? "Continue where you left off →" : "Start the quiz →"}
            </Button>
            {hasProgress && (
              <button
                type="button"
                onClick={restartQuiz}
                className="block text-xs font-medium text-foreground/60 underline underline-offset-2 hover:text-foreground"
              >
                Start fresh instead
              </button>
            )}
          </div>
        </div>
      )}

      {screen === "quiz" && currentQ && (
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wide opacity-50">
            <span>
              {String(currentQ.sec).padStart(2, "0")}/13 · {SECTIONS[currentQ.sec - 1].icon} {SECTIONS[currentQ.sec - 1].title}
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-soft px-3 py-1 normal-case tracking-normal text-brand">
              <Sparkles size={12} /> {xp} pts
            </span>
          </div>

          <div className="flex gap-1">
            {SECTIONS.map((s) => (
              <div key={s.n} className="h-1.5 flex-1 overflow-hidden rounded-full bg-brand-soft">
                <div
                  className="h-full rounded-full bg-brand transition-all duration-500"
                  style={{
                    width: s.n < currentQ.sec ? "100%" : s.n === currentQ.sec ? `${sectionPct}%` : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <h2 className="font-display text-2xl font-semibold leading-snug sm:text-3xl">{currentQ.q}</h2>
              {currentQ.sub && <p className="mt-2 text-sm opacity-60">{currentQ.sub}</p>}
              {currentQ.optional && (
                <span className="mt-3 inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">Optional</span>
              )}

              {currentQ.type === "single" && (
                <>
                  <div className={`mt-5 grid gap-2.5 ${currentQ.scenario ? "grid-cols-1" : "sm:grid-cols-2"}`}>
                    {currentQ.opts!.map((o) => {
                      const selected = (answers[currentQ.id] as SingleAnswer | undefined)?.value === o.v;
                      return (
                        <button
                          key={o.v}
                          type="button"
                          onClick={() => selectSingle(currentQ, o.v)}
                          className={`rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition-colors ${
                            selected ? "border-brand bg-brand-soft" : "border-border-subtle bg-surface hover:border-brand/40"
                          } ${currentQ.scenario ? "flex flex-col items-start gap-1.5" : "flex items-center gap-3"}`}
                        >
                          {o.sub && <span className="text-[11px] font-semibold uppercase tracking-wider text-brand">{o.sub}</span>}
                          <span className="flex w-full items-center gap-3">
                            {o.e && <span className="text-lg">{o.e}</span>}
                            <span className="flex-1">{o.l}</span>
                            {!currentQ.scenario && selected && <Check size={16} className="shrink-0 text-brand" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {(answers[currentQ.id] as SingleAnswer | undefined)?.value === "other" && (
                    <input
                      ref={otherInputRef}
                      className="mt-3 w-full rounded-2xl border border-border-subtle bg-surface px-4 py-3 text-sm outline-none focus:border-brand"
                      placeholder="Tell us more…"
                      value={(answers[currentQ.id] as SingleAnswer).text ?? ""}
                      onChange={(e) => setOtherText(currentQ, e.target.value)}
                    />
                  )}
                </>
              )}

              {currentQ.type === "multi" && (
                <>
                  <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {currentQ.opts!.map((o) => {
                      const selected = ((answers[currentQ.id] as MultiAnswer | undefined)?.selected ?? []).includes(o.v);
                      return (
                        <button
                          key={o.v}
                          type="button"
                          onClick={() => toggleMulti(currentQ, o.v)}
                          className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition-colors ${
                            selected ? "border-brand bg-brand-soft" : "border-border-subtle bg-surface hover:border-brand/40"
                          }`}
                        >
                          {o.e && <span className="text-lg">{o.e}</span>}
                          <span className="flex-1">{o.l}</span>
                          {selected && <Check size={16} className="shrink-0 text-brand" />}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-xs opacity-50">
                    {(answers[currentQ.id] as MultiAnswer | undefined)?.selected.length ?? 0}
                    {currentQ.max ? ` / ${currentQ.max} selected` : " selected"}
                  </p>
                  {((answers[currentQ.id] as MultiAnswer | undefined)?.selected ?? []).includes("other") && (
                    <input
                      ref={otherInputRef}
                      className="mt-3 w-full rounded-2xl border border-border-subtle bg-surface px-4 py-3 text-sm outline-none focus:border-brand"
                      placeholder="Tell us more…"
                      value={(answers[currentQ.id] as MultiAnswer).text ?? ""}
                      onChange={(e) => setOtherText(currentQ, e.target.value)}
                    />
                  )}
                </>
              )}

              {currentQ.type === "short" && (
                <input
                  className="mt-5 w-full rounded-2xl border border-border-subtle bg-surface px-4 py-3 text-sm outline-none focus:border-brand"
                  placeholder="Type your answer…"
                  value={(answers[currentQ.id] as string | undefined) ?? ""}
                  onChange={(e) => setTextAnswer(currentQ, e.target.value)}
                />
              )}
              {currentQ.type === "long" && (
                <textarea
                  className="mt-5 min-h-[120px] w-full resize-y rounded-2xl border border-border-subtle bg-surface px-4 py-3 text-sm outline-none focus:border-brand"
                  placeholder="Type your answer…"
                  value={(answers[currentQ.id] as string | undefined) ?? ""}
                  onChange={(e) => setTextAnswer(currentQ, e.target.value)}
                />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={retreat} className={idx === 0 ? "invisible" : ""}>
              Back
            </Button>
            <Button
              variant="primary"
              onClick={advance}
              disabled={!currentQ.optional && !isAnswered(currentQ, answers)}
              className="flex-1 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {idx >= qs.length - 1 ? "See my Traveller DNA →" : "Next"}
            </Button>
          </div>
        </div>
      )}

      {screen === "result" && (
        <div className="space-y-8 text-center">
          <div className="relative overflow-hidden rounded-3xl bg-brand px-8 py-10 text-white shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Your traveller DNA</p>
            <div className="mt-4 text-5xl">{archetype.emoji}</div>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{archetype.name}</h2>
            <p className="mt-3 text-sm text-white/80">{archetype.tagline}</p>
            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/90">{archetype.desc}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {archetype.rec.map((r) => (
                <span key={r} className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs">
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatTile value={`${stats.expScore}%`} label="Experience over price" />
            <StatTile value={stats.plannerType} label="Planning style" />
            <StatTile value={String(xp)} label="Travel points" />
            <StatTile value={`${Object.keys(answers).length}/${qs.length}`} label="Answered" />
          </div>

          <div className="space-y-3 text-left">
            <a
              href={mailtoHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-strong"
            >
              <Mail size={16} /> Send my results to Dhyana Stays
            </a>
            <PlaceholderNote>
              Responses are sent by email for now — the site has no database or API routes yet (PROJECT_BRIEF.md
              §6), so this is the honest &ldquo;live&rdquo; option until a backend exists.
            </PlaceholderNote>
            <Button variant="secondary" onClick={handleCopy} className="w-full">
              <Copy size={16} /> Copy full answers as text
            </Button>
            <Button variant="ghost" onClick={restartQuiz} className="w-full">
              <RotateCcw size={16} /> Take the quiz again
            </Button>
          </div>
        </div>
      )}

      {copyModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
          onClick={() => setCopyModalOpen(false)}
        >
          <div className="w-full max-w-lg rounded-3xl bg-surface p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-lg font-semibold">Your full answers</h3>
            <p className="mt-1 text-xs opacity-60">Tap the box, select all, and copy.</p>
            <textarea
              readOnly
              className="mt-3 h-48 w-full rounded-2xl border border-border-subtle bg-background p-3 font-mono text-xs"
              value={fullReport}
              onFocus={(e) => e.currentTarget.select()}
            />
            <Button variant="primary" onClick={() => setCopyModalOpen(false)} className="mt-4 w-full">
              Done
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
