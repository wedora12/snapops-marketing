# Scene 3 Rebuild Brief — "Chaos to Order" (v3, final direction)
**Supersedes:** both prior Scene 3 documents — the original six-beat `Scene03_DeskAtWork` spec, and the "One Lead's Journey" revision. Neither is being tuned further; this replaces the choreography entirely.
**For:** Claude Code, working in `snapops-marketing-v2/src/scenes/Scene03_DeskAtWork/`
**Reviewed and approved by Bharath via mockup before this build.**

---

## 1. The core idea

Many things arrive at once, dense and disordered — almost too fast to individually read — then everything snaps to stillness in a single decisive beat. Relief comes from density contrast: loud → silent, not from one object's slow transformation (that was the previous attempt, and it didn't land — noted below in §5).

Four beats total: **scatter → hold → snap → resolve.**

## 2. Target feeling: relief + expensive (unchanged from prior briefs)

- Expensive = the resolve is calm and unhurried. No bounce, no overshoot easing anywhere in this scene.
- Relief = tension released. The tension source has changed from "one payment left pending" to "too much happening to track" — the snap is the release.

## 3. Object roster

**Reuse existing built components** — do not design new cards. Pull from what already exists in the codebase from the two previous Scene 3 builds (the desk-object cards for: Instagram lead, payment receipt, contract, calendar, timeline, storage/album) plus Scene 1/2's established assets.

**Scatter phase (beats 1–2): 6–7 objects, for density/texture only.** Suggested set: Instagram lead card, payment receipt (pending state), contract (unsigned), calendar, timeline, storage/album-in-progress. These exist purely to create visual density in the chaos — they do not all need to individually reappear afterward.

**Resolved phase (beat 4): exactly 4 objects, no more.** Lead (status: Booked), Contract (status: Signed), Payment (status: Paid), Album (status: Delivered). This is a deliberate cut down from the previous 6-object desk layout — fewer things landing in the resolve means the stillness actually registers. Calendar, timeline, and storage do not need resolved counterparts; their information is implied (date is on the contract, timeline is redundant with "booked").

## 4. Beat-by-beat

Reuse `.desk-object` / `.desk-stage` staging and the `isActive` + `hasPlayedRef` pattern exactly as in prior builds.

**Beat 1 — Scatter arrival (~0.5–0.7s total).** All 6–7 chaos-phase objects fly/fall onto the desk together, landing at varied rotations (roughly −15° to +15°, no two alike), overlapping each other's edges, positioned densely rather than evenly spread. Stagger the landing of individual objects by only ~40–60ms apart — tight enough that it reads as one cluster arriving, not a sequence of individual entrances. This is intentionally close to unreadable; that's correct, not a bug.

**Beat 2 — Hold (~0.3–0.4s).** Brief pause so the eye registers "this is genuinely a lot" before anything resolves. Keep this short — this is not the long tension-hold from the previous brief's payment-pause idea. It's just long enough for legibility, not long enough to drag.

**Beat 3 — The snap (~0.25–0.35s, the fastest beat in the scene).** All scatter-phase objects simultaneously animate toward the center point of the desk stage, shrinking and fading out together — same start time, same duration, same easing (`power3.in` or similarly aggressive) so it reads as a cut, not a drift. At the moment they vanish, trigger a brief impact cue: a thin gold ring (reuse the existing champagne gold accent) scales from ~0.3x to ~1.4x while fading from full opacity to zero, fast (~0.2s), centered on the desk. No blur or glow filters — this is a flat scale+opacity ring, not a soft glow.

**Beat 4 — Resolve (~0.4–0.5s, calm).** Immediately following the snap, the 4 resolved-phase objects (per §3) fade/settle into a clean, evenly spaced, aligned grid — arriving together as one settle, not staggered individually. Easing must be slow and confident (`power2.out`, no overshoot, no bounce) — this is the "expensive" beat. Hold on this resolved state.

**Total scene duration: roughly 1.5–2s**, notably faster overall than either previous attempt — the previous builds dragged because every beat took its time; this one is fast until the resolve, then stops.

## 5. What went wrong before (context for why this is different)

- **First build (six sequential beats):** every beat had equal visual weight and equal timing — read as a checklist animating itself, no climax.
- **Second build (one lead's journey):** a single card slowly transforming had no real "before" tension to feel relief from, and the payment pending→paid transition was reviewed live and didn't produce the intended feeling despite correct easing/timing per spec.
- **This version's hypothesis:** relief needs density contrast (a lot → nothing), not a slow narrative arc. This has not been build-tested yet — treat this brief's timing values as a first pass to react to live, not as settled numbers. Bharath has explicitly said he wants to see it built and watch the transition before judging further.

## 6. What to explicitly avoid

- No overshoot/bounce easing anywhere.
- No traffic-light red/green states.
- No blur or glow filters on the impact ring — flat scale+opacity only.
- No staggering the resolve phase into 4 separate arrival times — they land together.
- Don't spend extra build time perfecting the scatter phase's individual object polish — it's on screen briefly and intentionally dense/hard to read.

## 7. Open item — do not act on this yet, just flag it

Scene 5's originally-planned closing beat (chaos objects drifting back onto the desk, calm, as a rhyme with Scene 1) now visually overlaps with this scene's core trick. When Scene 5 is eventually built, its ending will need to be reworked to not repeat "many objects converge into order" a second time. Not in scope for this build — just don't be surprised when that conversation happens later.

## 8. Copy

Unchanged: "ONE WEDDING, START TO FINISH" / "The desk does the following up." / existing subhead.

## 9. Process

Build this, then stop for review — same as both previous rounds. Given two prior misses, Bharath wants to actually watch this one in motion before any further direction is given, so don't over-invest in polish before the first checkpoint.
