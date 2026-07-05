# Scene 3 Revision Brief — "One Lead's Journey"
**Supersedes:** the six-beat version of `Scene03_DeskAtWork` currently live in `page.tsx`.
**For:** Claude Code, working in `snapops-marketing-v2/src/scenes/Scene03_DeskAtWork/`
**Reason for revision:** the six-beat build was reviewed live and diagnosed as flat — six equal-weight objects arriving in sequence, no hierarchy, no climax. This brief replaces the structure entirely. Do not tune the existing timeline's easing/stagger values — rebuild the sequence logic per below.

---

## 1. The core idea

One object, followed continuously, transforming as it moves — not six separate objects each animating in once. The audience's eye never has to find a new thing; it watches the *same* thing change.

**The object is the Instagram lead card already established in Scene 1** — reuse `studioChaosCards[3]` from `Scene01_Problem/constants.ts` verbatim: label "Instagram Lead," title "Budget shared," meta "Needs follow-up," Heart icon. This is a deliberate continuity callback — the audience already saw this exact card sitting in the chaos in Scene 1. Scene 3 shows what happens to it.

**Journey:** Instagram DM → Contract → Calendar mark → Payment (held tension) → Payment resolved. Four transformations of one card, not six independent arrivals.

## 2. Target feeling: relief + expensive

This replaces the earlier "snap"/overshoot direction from the previous brief — that was wrong for this target. Corrected direction:

- **Expensive = unhurried, weighted, confident.** No bounce, no overshoot easing (`back.out` is banned here), no fast whip-ins. Every transform should feel like it costs nothing to the system and everything to notice — slow, deliberate, `power2.inOut` or slower custom curves only.
- **Relief = tension released, not just resolution reached.** There must be a held beat of mild unease before the payoff, or there's nothing to feel relieved from. This is the single most important addition versus the previous build: a pause that feels slightly too long, before it resolves.

## 3. Beat-by-beat

Reuse the existing `.desk-object` / `.desk-stage` staging convention and `isActive` + `hasPlayedRef` pattern from Scene 2 exactly as before — only the choreography and object count change.

**Beat 1 — The DM arrives.** The Instagram lead card (per §1) fades/settles onto the desk, exactly as it appeared in Scene 1 — same visual weight, same card style. Hold for a beat, uninterrupted, so the audience registers what it is before anything happens to it. No other objects visible yet.

**Beat 2 — It becomes the contract.** Not a new object entering the frame — a cross-dissolve/morph in place: the Instagram card's content fades out while the contract's content ("CONTRACT / RAHUL & SNEHA") fades in, same position, same rough scale, ideally with a shared transform (e.g. the card rotates slightly during the crossfade, like a page turning) so it reads as one object changing, not object A disappearing and object B appearing. If a true shape morph is too costly to build well, a same-position crossfade with a subtle shared rotation/scale move is an acceptable substitute — but the two objects must never be visible as separate simultaneous entities sliding past each other.

**Beat 3 — It becomes the calendar mark.** Same principle: the contract's position anchors, and the calendar (December 2024, gold ring landing on 12) crossfades in at the same anchor point, then the calendar object settles slightly left as if placed down — this is the one moment allowed a small positional shift, to start establishing the desk layout for the final reveal.

**Beat 4 — The hold.** The receipt appears — status **PENDING**, amber/muted gold pill, per the existing design. This is not a quick pass-through state. **Hold here for longer than feels comfortable** — a slow, quiet pulse on the PENDING pill (opacity breathing, ~0.85–1.0, slow sine, not a blink) for a beat or two beyond what the previous timeline would have allotted. Nothing else moves. This is the tension.

**Beat 5 — The release.** The pill transitions from PENDING to PAID. Slow. No punch, no scale-overshoot, no particle burst. Think of a heavy door closing softly — the color shift (amber → deep pine, never red/green) happens over a longer duration than any other transition in the scene, with a simple `power2.inOut` ease, no bounce. This is the climax, and it should be the *calmest* moment in the scene, not the most energetic one. Calm at the climax is what "expensive" means here.

**Beat 6 — Resolution, wide.** Camera (stage scale) eases back slightly, and the album ("143 photos — Delivered" checkmark) settles into frame alongside the now-resolved receipt/calendar/contract, completing the desk composition matching the still Bharath already reviewed. This final pull-back can be the only beat with any camera/scale movement at all — reserve that move for here, so it doesn't compete with the payment climax.

## 4. What to explicitly avoid (things the previous build did that must not recur)

- No six objects with equal visual weight and equal timing.
- No overshoot/bounce easing anywhere in this scene.
- No two objects visible on screen simultaneously mid-transform unless one is clearly anchoring and the other clearly departing (per Beat 2's morph description).
- No traffic-light red/green — PENDING is amber/gold, PAID is deep pine, per existing palette.
- No camera/scale movement except the single pull-back in Beat 6.

## 5. Copy

Unchanged from the current build — keep "ONE WEDDING, START TO FINISH" / "The desk does the following up." / the existing subhead. This brief only changes the object choreography, not the text block.

## 6. Technical notes

- Delete/replace the current 6-object GSAP timeline inside `Scene03_DeskAtWork/index.tsx` with the 6-beat structure above (note: 6 *beats*, not 6 *objects* — several beats are transformations of the same 1–2 physical elements).
- The crossfade/morph in Beats 2–3 can likely reuse a single wrapper element with swapped inner content and a GSAP `to()` sequence on opacity + a small shared transform, rather than requiring new animation infrastructure.
- Total scene duration will necessarily run longer than the previous build because of the intentional hold in Beat 4 — that's correct, not a bug. Estimate roughly 4–5s total versus the previous ~2.5s, given the deliberate pacing this brief calls for.
- Keep `hasPlayedRef` guard so it doesn't replay on scroll-back.
- Build this, then stop for review before touching Scenes 4–5, same as last time.
