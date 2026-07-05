# SnapOps Marketing Film — Scenes 3–5 Spec
**For:** Claude Code, working in `snapops-marketing/`
**From:** Creative direction pass on top of existing Scene 1 (Problem) + Scene 2 (Flatlay Desk), which are approved and untouched.
**Format:** This is a cinematic scroll-locked film, not a SaaS landing page. Every scene must earn its place in the story. No feature-tile grids, no logo walls, no generic testimonial carousels.

---

## 0. Context: what already exists (do not rebuild)

- `page.tsx` wheel-locks through scenes using `activeScene` state + `goToScene()`. Each scene section fades/scales in via Tailwind transition classes keyed to `activeScene === n`.
- Scene components accept an `isActive` boolean and use a `hasPlayedRef` guard so the entrance timeline plays once, not on every activation.
- Motion is authored with GSAP inside `useEffect(() => { const ctx = gsap.context(...); return () => ctx.revert(); }, [])`, scoped to the section ref.
- Design tokens actually in use (not the unused `design-system/` folder): `--background: #f7f5f2` (warm ivory), `--foreground: #1d3539` (deep pine-teal), font is Geist Sans/Mono via `--font-geist-sans`. Gold/champagne accent appears ad hoc in scene-local classes — carry `#B08D55` forward from the SnapOps CRM design system for consistency (see product design system already shipped for the CRM).
- Scene 2 (`Scene02_FlatlayDesk`) establishes the desk staging convention: objects tagged `.desk-object`, container `.desk-stage`, entrance = objects fly in from center at scale 0.03 → settle into flatlay position. **Scenes 3 and 5 should reuse this exact staging convention** — same desk, same objects, continued or bookended, not a new visual system.
- Reusable raw material already coded, currently unwired:
  - `Scene02_Chaos/constants.ts` — notification objects (WhatsApp, Payment, Call, Album, Instagram) with icon, title, message, time. Useful for Scene 5's "rhyme back to chaos" beat.
  - `Scene04_AI/` — `AIOrb.tsx`, `PromptBar.tsx`, `DashboardPreview.tsx`, `FloatingCards.tsx`, `animations.ts`. Real, styled components. Repurpose for Scene 4, reframed per the direction below (not a chat-with-AI demo).
- Empty scaffolds to delete outright: `Scene02_EditorialDesk`, `Scene02_ProductReveal`, `Scene02_Transformation`, `Scene03_Reveal`, `Scene04_Product`, `Scene05_Trust`, `Scene06_FinalCTA`. These are stub files (SCENE_ID + SCENE_INDEX only, no markup). Remove them and their exports in `scenes/index.ts` and `scenes/types.ts` to avoid confusion; rebuild fresh per this spec.

Final scene order for `page.tsx` (update `totalScenes = 5`):
1. `Scene01_Problem` — existing, untouched
2. `Scene02_FlatlayDesk` — existing, untouched
3. `Scene03_DeskAtWork` — new, spec below
4. `Scene04_QuietIntelligence` — new, spec below
5. `Scene05_CloseTheLoop` — new, spec below (merges "trust" + "final CTA" into one closing movement — see rationale)

---

## 1. Scene 3 — "The Desk, Working" (`Scene03_DeskAtWork`)

### Story beat
Scene 2 revealed the desk as a calm system. Scene 3 proves it's alive — one real wedding (Rahul & Sneha, reused from Scene 1/2's chaos cards for continuity) moves across the desk in real time, start to finish, without leaving the desk metaphor. No dashboard cutaway. No UI chrome. The camera never really "leaves" the flatlay.

### Why not a dashboard tour
A generic product demo breaks the film's visual language and reads as a tone shift into SaaS-land. Staying diegetic (objects moving on a physical desk) is what makes scenes 1–2 feel authored. Scene 3 must protect that.

### Visual structure
Reuse `Scene02_FlatlayDesk`'s desk composition as the base (same background, same object styling, same soft shadow/paper texture) but **zoomed slightly closer** on a subset of objects, arranged left-to-right as a timeline rather than scattered flatlay.

Sequence of beats, each triggered by scroll progress within the scene (use a GSAP timeline scrubbed to scroll, or an internal auto-play triggered by `isActive` matching Scene 2's pattern — recommend internal timeline for consistency with existing scenes rather than introducing scroll-scrubbing, which nothing else in the film uses):

1. **Lead lands.** A phone/message card (reuse `Scene02_Chaos` WhatsApp object styling) slides onto the desk from the left edge, settles at ~15% position. Text: "Rahul & Sneha — Loved your work. Available Dec 12?"
2. **It sorts itself.** Card animates a subtle state change — a small pill appears on the card reading "Follow-up scheduled" — no cursor, no click, it just happens. This is the single most important beat in the scene: it must read as *automatic*, not *operated*.
3. **Contract appears.** The existing contract paper object (already in Scene 2's asset set — "CONTRACT / RAHUL & SNEHA") slides in from top, lands center-left, slight rotation for the handmade-desk feel already established.
4. **Date claims itself on the calendar.** The December calendar object (already exists in Scene 2 assets) gets a small gold ring/mark animate onto "12" — reuse the champagne gold accent.
5. **Payment chip flips.** A small chip/receipt object animates from "PENDING" to "PAID" — color transition from neutral to the deep pine or gold, not a jarring red→green (protect the editorial palette; no traffic-light colors anywhere in this film).
6. **Album gets a checkmark.** The wedding album spread object (from Scene 2 assets) gets a small checkmark badge — "143 photos" → "Delivered."
7. **Hold on full desk, everything resolved.** Camera (scale) pulls back slightly to reveal the full set from beat 1–6 sitting calmly together, like a completed still-life. This is the button on the scene.

### Copy
Left-aligned text block (same position/type treatment as Scene 2's headline for rhythm consistency):

- Eyebrow: `ONE WEDDING, START TO FINISH`
- Headline: `The desk does the following up.`
- Subhead: `You shoot. SnapOps tracks the lead, the date, the payment, the delivery — while you're behind the camera, not the keyboard.`

### Motion notes
- Timing: total scene entrance ~2.2–2.8s once `isActive` fires, matching Scene 2's `power4.out` / `0.38–0.7s` per-beat pacing. Stagger beats 1–6 roughly 250–350ms apart, not simultaneous — this is a sequence, not a reveal.
- No toast/notification-style UI (rounded corner popup with drop shadow in the top-right) — that's Scene 4's or Scene02_Chaos's territory and mixing it here dilutes the "physical desk" idea.
- `hasPlayedRef` guard, same as Scene 2, so it doesn't replay on scroll-back.

### Technical
- New folder `src/scenes/Scene03_DeskAtWork/` with `index.tsx`, `constants.ts` (the 6 beat objects: id, type, label, position, delay), reuse desk asset image (`flatlay-scene.jpg` or crop it further if needed — check with Bharath before generating new photography).
- Props: `{ isActive?: boolean }`, matching existing scene signature exactly.

---

## 2. Scene 4 — "Quiet Intelligence" (`Scene04_QuietIntelligence`)

### Story beat
Scene 3 showed *what* happens. Scene 4 answers *how*, briefly — without turning into a chatbot demo. The existing `Scene04_AI` components (orb, prompt bar, dashboard preview) are good raw material but were built for a "chat with your data" framing. Reframe: the orb represents the studio's quiet awareness, not a conversational AI product. Keep the visit here short — this is the one scene most at risk of overstaying its welcome and breaking the film's restraint.

### Visual structure
- Center-stage: the `AIOrb` component, breathing/pulsing gently (reuse existing animation, likely already close to right).
- One line types itself out near the orb, using `AI_PROMPTS` content from the existing constants file, but only **one** prompt, not a cycling list — e.g. "Which clients have pending payments?" — followed by a quiet, non-chat-bubble answer surfacing as a small object (reuse `DashboardPreview` treatment) sliding just below.
- No visible prompt input field, no cursor blinking in a text box — the "prompt bar" UI reads as a product feature demo, which breaks tone. If `PromptBar.tsx` is reused, it should render as inert/decorative (already-typed), never interactive-looking.
- Background stays the same ivory canvas as scenes 1–3 — do not switch to a dark "AI mode" palette. Consistency of world is more important than signaling "high-tech."

### Copy
- Eyebrow: `WHILE YOU SLEEP`
- Headline: `It knows before you ask.`
- Subhead: `Every lead, shoot, and payment — watched quietly, surfaced only when it matters.`

### Motion notes
- Shortest scene in the film — target ~1.5–2s entrance, minimal hold. This scene should feel like a breath, not a stop.
- Orb pulse continues subtly even after entrance completes (idle loop), unlike scenes 1–3 which resolve to a static hold — this is the one moment of continuous motion, appropriate since it's about ongoing awareness.

### Technical
- New folder `src/scenes/Scene04_QuietIntelligence/`. Salvage `AIOrb.tsx`, `animations.ts`, and relevant pieces of `DashboardPreview.tsx` from the old `Scene04_AI/` folder; drop `FloatingCards.tsx` and interactive-looking `PromptBar.tsx` unless restyled as decorative per above.
- Props: `{ isActive?: boolean }`.

---

## 3. Scene 5 — "Close the Loop" (`Scene05_CloseTheLoop`)

### Why merged (trust + final CTA → one scene)
A separate testimonial/trust scene followed by a separate CTA scene risks two flat, generic beats back to back — exactly the SaaS-template pattern this film is avoiding. Better: one closing movement that does both jobs at once, visually rhyming back to Scene 1.

### Story beat
Return to the desk composition from Scene 2/3, now fully at rest. One human line of trust (founder voice) appears — quiet, not a testimonial card with a star rating. Then the chaos objects from Scene 1 (phone, WhatsApp bubbles, scattered notification cards) drift back in from off-screen edges **and settle onto the desk, calm** — the visual rhyme that closes the film. CTA appears last, as the natural next beat, not a separate section.

### Visual structure
1. Desk composition at rest (same base as Scene 3's final hold).
2. A single quote surfaces, small, typographic, no avatar/card/star-rating chrome:
   > "We stopped losing leads in WhatsApp the week we switched." — attribute simply, e.g. "Bharath, Nuptial Diaries" (pre-approved for founder-story use).
3. The chaos objects — reuse `Scene02_Chaos` notification card assets (WhatsApp, Payment, Call, Album, Instagram) — drift in from the four corners (mirroring how Scene 1 likely staged them) and land softly on the desk, no longer alarming, just... filed. This is the emotional payoff of the whole film.
4. CTA button fades in last, center or lower-third, consistent with Scene 1's existing CTA style (`Start Organizing Your Studio →`) — reuse that exact component/style for continuity, don't design a new button.

### Copy
- Eyebrow: `FROM CHAOS TO CALM`
- Quote: (as above)
- CTA: `Start Organizing Your Studio →` (reuse Scene 1's button component/copy exactly)

### Motion notes
- This is the longest hold in the film — let it breathe. Quote fades in first and holds ~1.5s alone before the desk objects begin drifting in, ~150ms stagger each, `power2.out`, softer/slower than Scene 3's beats (this is resolution, not action).
- CTA button: same entrance treatment as Scene 1 for visual bookending.

### Technical
- New folder `src/scenes/Scene05_CloseTheLoop/`. Reuse Scene 1's CTA button as a shared component if it isn't already extracted — if it's inline in `Hero.tsx`, extract it to `src/components/buttons/` so both scenes import the same component rather than duplicating markup.
- Props: `{ isActive?: boolean }`.

---

## 4. Cross-scene checklist for Claude Code

- [ ] Delete empty scaffold folders listed in §0 and clean up `scenes/index.ts` / `scenes/types.ts` accordingly.
- [ ] Update `page.tsx`: `totalScenes = 5`, add sections for Scene03/04/05 following the exact fade/scale pattern already used for scenes 1–2.
- [ ] No color outside the established palette (`#f7f5f2` ivory, `#1d3539` pine, `#B08D55` gold accent) — no red/green traffic-light states anywhere, including the payment chip in Scene 3.
- [ ] No card/UI chrome that looks like a generic SaaS dashboard notification (drop shadow + rounded rect + bold title + timestamp) outside of what's already established in Scene 1's floating cards — reuse that exact card style if a "notification" object is needed again, don't invent a second notification visual language.
- [ ] Every scene keeps the `isActive` + `hasPlayedRef` + `gsap.context` pattern already established — no new animation library, no scroll-scrubbing introduced without discussion.
- [ ] Full regression on scenes 1–2 after wiring changes to `page.tsx` — must remain pixel-identical to current approved state.
- [ ] Mobile: confirm each new scene has a reasonable fallback — Scene 1 already has `MobileStoryCards.tsx` as a mobile-specific variant; Scenes 3–5 will likely need the same pattern rather than trying to force the desk-zoom choreography onto small viewports. Flag for a separate mobile pass if scope is too large for this cycle.

---

## 5. Open decisions for Bharath (flag before/during build, don't silently decide)

1. Scene 5's quote — confirm exact wording and attribution (used a placeholder above).
2. Whether Scene 3's "one wedding" should stay Rahul & Sneha (continuity with Scene 1/2) or use a different name to avoid over-repeating one couple across the whole film.
3. Mobile treatment for Scenes 3–5 — same design pass now, or backlog like the CRM mobile Settings sections were?
