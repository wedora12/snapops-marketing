# Scene 4 Brief — "Scale, Then Freedom"
**For:** Claude Code, working in `snapops-marketing-v2/src/scenes/`
**Follows:** Scene 3 (locked). **Precedes:** Scene 5 (not yet built — see note in §6).
**New scene folder:** `Scene04_ScaleAndFreedom` (or similar — pick a name consistent with existing folder conventions).

---

## 0. What this scene is for, and where it sits in the film

Total film is 5 scenes. Scene 3 proved the system handles one wedding's admin, in depth. Scene 4 is the last "proof" beat before Scene 5 closes the film — it needs to escalate what Scene 3 showed, not repeat it, and then hand off to something Scene 3 didn't: the emotional payoff of why any of this matters.

Three-beat arc, decided after extensive brainstorming (many alternatives considered and rejected — see §5 for what NOT to do and why):

1. **Calendar fills fast** — volume/growth, shown as energy, not distress.
2. **Resolves calm** — proof that volume didn't cost the order Scene 3 established.
3. **Releases into a real photograph** — the film leaves the desk metaphor for the first time, landing on an actual wedding moment. This is the emotional peak of the scene, arguably of the film.

## 1. Beat 1 — the calendar fills

Reuse the calendar object already established in Scene 3 (same visual asset/component — this is a continuity callback, not a new object). Rapidly gains booking marks across many dates — fast, light, energetic pacing. This is **growth being celebrated, not chaos being endured** — critically different tone from Scene 3's chaos phase. No overlapping clutter, no noise-tier objects, no dense scatter. Just one familiar object visibly getting busier, quickly and cleanly.

Keep the rest of the desk (contract, receipt, album — whatever's still in frame) completely undisturbed throughout this beat. That stillness elsewhere is what beat 2 pays off.

## 2. Beat 2 — resolves calm

Brief beat, not a long hold — this is reassurance, not the destination. Camera settles. The calendar and the rest of the desk sit together, calm, exactly as composed in Scene 3's resolved grid style (axis-aligned, no overlap — reuse that established grid logic, not Scene 3's abandoned flatlay-overlap attempt). The message: more volume happened, and nothing fell apart.

## 3. Beat 3 — the transition and release

This is the new, technically untested part of the film — approach with the understanding that it may need iteration once built and viewed live, same as Scene 3 did.

**Mechanism (decided after scoping technical cost with you — do not consider three.js or any 3D engine, it's not in this stack and not worth the cost for one transition):**

1. Begin a CSS 3D tilt on the desk-stage container — apply `perspective` + animate `rotateX` (and optionally slight `rotateY`) via GSAP on the existing flat composition, using real layered z-depth on the desk objects if that helps sell it. This should read as "the camera itself is starting to move," not as objects deforming — keep the tilt within a range where the flat object images still read as objects on a tilting plane, not as visibly flattening/skewing artifacts. Reference Scene 2/3's existing per-object absolute positioning to add z-depth per object without restructuring the whole scene.
2. Once the tilt reaches an angle steep enough to plausibly disguise a cut (test this live — there's no way to know the exact right angle without seeing it rendered), transition into the final photograph (see §4) via a well-dressed cut — something in the frame should move in a matched direction across the cut (a pan, a directional blur-streak, a quick flash) so it reads as continuous camera movement, not "the slide changed." A plain crossfade will fail here — this was explicitly flagged as the main risk of this approach and needs real attention, not a default GSAP fade.
3. Hold on the final photograph as the scene's resting point.

**Important constraint:** this scene is the one place in the whole film where the camera's vantage point changes from the overhead view used everywhere else, for the first time. That's the entire point of the device — protect it. Don't let the tilt happen too subtly to notice, and don't let the destination image look like "another object on the desk" — it needs to read as leaving the desk entirely.

## 4. The final asset

**Locked image attached separately: the eye-level photograph** (photographer's shoulder/raised camera in soft-focus foreground, bride and groom in a close, posed, warm moment in the background, cool-to-neutral color grade, tight intimate framing).

**Known trade-off, flagged honestly:** this image is more posed/held-gaze than fully candid-in-motion — several more dynamic/candid alternatives were generated and rejected in favor of this one's color grade and composition. This means the "something should be moving in the destination frame" motion-continuity goal from §3 is **not carried by the photograph itself** — it must be carried entirely by the transition's own motion-matching (the pan/blur-streak/flash at the cut point). Do not assume the source image provides any motion cue on its own.

Optional, low-priority enhancement if time allows: a very subtle continuous parallax/drift (slow scale or pan, not a loop of movement) on the still image once it's the resting frame, purely to avoid it feeling like a static bookend photo — this is a nice-to-have, not a requirement, and should not be attempted before the core tilt-into-cut transition is working and reviewed.

Asset file will be provided separately — place according to existing project asset conventions (see how `flatlay-scene.jpg` and other Scene 1-3 imagery are currently organized) and name it clearly (e.g. `scene4-release-moment.png`).

## 5. What was considered and rejected (context, so this doesn't get re-litigated)

- **A zoomed-out grid of many labeled wedding "tiles"** (names + status per tile) — rejected. Reads as a dashboard/CRM the moment anything has a legible name and status label to parse; breaks the film's "watch, don't read" quality established in Scenes 1-3.
- **AI orb / "quiet intelligence" ambient-awareness concept** (the original Scene 4 plan from the very first spec) — rejected. Scene 3 already communicates "the system watches and handles things quietly" as its core premise; this would repeat that idea rather than escalate it.
- **Objects dissolving into an abstract color field** — rejected. No precedent anywhere else in the film for abstraction; introducing it right before the emotional peak risks looking like a cheap effect with nothing to fall back on.
- **Match cut through a camera lens / album page turning to reveal a live photo** — considered, not chosen. Reasonable ideas, but the actual chosen direction (camera vantage point itself changing) was judged more original and more thematically exact for "getting back to shooting" than either.
- **A grid of soft, unlabeled duplicate desks fading into the distance ("echo")** — rejected as too weak; still centers the business system as the hero image rather than the photographer's freedom, which was identified as the actual point of this scene.

## 6. Open item for later — do not act on this now

Scene 5's original planned ending (chaos objects drifting back and settling calm, as a rhyme with Scene 1) duplicates Scene 3's actual mechanic (chaos-to-order snap). This needs to be reworked when Scene 5 is eventually built. Not in scope here — flagged so it isn't forgotten.

## 7. Copy

Not yet finalized — placeholder only: eyebrow/headline/subhead for this scene still need to be written to match the "scale, then freedom" arc. Flag this back to Bharath before finalizing rather than inventing final copy — draft options are welcome, but don't treat any copy as locked.

## 8. Process

Build in stages, same discipline as Scene 3: beat 1-2 (calendar fill + calm resolve) first, stop for review, then attempt beat 3's transition separately once the first part is confirmed working — the transition is the highest-risk, least-proven part of this brief and deserves its own checkpoint rather than being bundled into one big build-and-review cycle.
