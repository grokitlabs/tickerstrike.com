# TickerStrike — Product Discovery Log

Working document for the vision/positioning iteration on the public site.
Method: founder interviews (Michael = customer zero) + docs from the rails app
(`PRODUCT_OVERVIEW.md`, `initial_planning_exchange.md`).

---

## Round 1 — 2026-07-03

**Core pain:** All four pains are real (synthesis burden, missing the moment,
unverified conviction, lost reasoning), but #1 is **unverified conviction —
"that leads to losses or paralysis."** Two distinct costs: money lost on
edgeless setups, and entries never taken because conviction couldn't be trusted.

**Aha moment:** The **convergence alert** — thesis + verified edge + live
signal line up on a ticker → strike now.

**Customer #1:** All four candidate segments selected (newsletter
power-subscribers, futures/day traders, swing traders, quant-curious retail).
⚠️ Needs narrowing eventually; deferred because motivation is founder-pain-first.

**Venture goal:** Solve own pain first; commercializing is optional upside.

## Round 2 — 2026-07-03

**Paralysis fix = proof.** The missing ingredient that turns hesitation into a
pulled trigger is **hard numbers that the setup has edge** — not consensus, not
a pre-armed plan, not risk quantification. Verification is the conviction engine.

**Convergence recipe (minimum actionable set):**
1. Verified-edge setup firing
2. Thesis at high conviction
3. Trusted-source agreement (2+ independent sources)

Notably **excluded from the minimum**: price/flow confirmation. The evidence
stack creates the conviction, not the tape.

**User #1 (verbatim, condensed):** Was the ES-futures morning planner; has been
verifying edge from ES newsletters and his own setup ideas to build conviction.
Concluded **individual stocks are easier to find edge with** and wants to move
away from day-trade holding periods **even if that's where the entry is built**.
Real answer: **looking for edge at lower AND higher timeframes, on indexes AND
stocks.**

→ Key product insight: **enter with day-trader precision, hold with
swing-trader conviction.** Entry timing lives at low timeframes; the edge and
the hold live at higher ones. Multi-timeframe, multi-instrument.

**Trust bar for a verdict** (what makes it size-up-able):
- Plain-English stats + honest caveats (win rate, R, sample size, ranges)
- Visible methodology (pre-registration, baseline, out-of-sample — inspectable)
- **Tested on my own trades** — run the engine against his actual trade history
  and separate edge from luck. (Implies: trade-history import is a
  trust-building feature, not just a journal feature.)

Not selected: "kills ideas publicly" as a trust signal.

---

## Round 2.5 — 2026-07-03 (positioning lightbulb)

While building the /why/ page, Michael articulated the gap statement directly:
**"TradingView and thinkorswim backtesting isn't reliable or easy to do...
quant frameworks are clunky, hard to learn, onerous, and you have to be an
expert to use them properly. What we're building bridges the gap."**

Guardrails he set for all public claims: credibility and trustworthiness are
everything for this product; no outlandish claims; grounded in real, accepted,
defensible processes; honest about where we are now vs. where we're going;
transparent where it doesn't hurt the (potential) business. The /why/ page now
includes a "Where we are, honestly" section (works today / being built / open
problems) as a deliberate trust device.

Quant-skeptic review findings applied to /why/ (2026-07-03): don't attribute
the matched-placebo baseline to White/Hansen (cite as lineage, not
implementation — the engine runs matched placebo + BH FDR + bootstrap CIs, not
Reality Check/SPA); "settled science"/"gold standard" softened to
"well accepted"; automation claims moved to future tense; costs mentioned;
three-way verdict (edge / no edge / not enough evidence) surfaced; holdout
exhaustion at product scale flagged publicly as an open problem.

## Emerging product spine

**Verify → Conviction → Convergence → Strike.**
Edge verification isn't one feature among six — it's what makes every other
feature trustworthy. The synthesis layer builds the case; verification proves
the setup; the convergence alert fires when proof, thesis, and source agreement
line up; the journal closes the loop by scoring reasoning against outcomes.

## Open questions (future rounds)

- Holding-period transition: what does the low-timeframe-entry /
  higher-timeframe-hold workflow concretely look like? What breaks today?
- "Thesis at high conviction" — measured how? Source count? Claim strength?
  Recency? Who scores it?
- Trade-history import: which broker(s)/format? How much history exists?
- Where do price/flow signals fit if they're not in the minimum convergence set —
  confirmation layer, or entry-timing layer?
- Segment narrowing: which of the four segments feels the pain of *unverified
  conviction* most acutely (vs. synthesis burden)?
- What would Michael pay for this today if someone else had built it?
