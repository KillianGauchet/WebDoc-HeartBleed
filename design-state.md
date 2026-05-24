# Design State: Heartbleed Webdoc Overhaul

_Last updated: 2026-05-22 by design-strategist_

## Brief
- **Problem:** Technical concepts in the Heartbleed webdoc are too abstract and jargon-heavy for a non-technical audience (teens, parents, retirees).
- **Primary persona:** Non-technical general public (15yo teens, non-techy parents, curious retirees).
- **Success metric:** High clarity, physical analogies used for every abstract concept, zero unexplained jargon, "Netflix" documentary tone.
- **Brief document:** `prompt.txt` (External Brief)

## Personas
- **Jordan (15yo)** — Digital native but doesn't care about the plumbing of the internet. Needs engagement and "cool" factor.
- **Priya (Parent)** — Uses the web for banking and shopping. Needs to know the real-world risk and "what's in it for me?".
- **Marcus (Retiree)** — Curious about tech but gets lost in jargon. Needs clear, slow-paced analogies and historical context.

## Design Principles
1. **Physical Analogies First** — Every abstract digital concept must be grounded in a physical, everyday object (cooking, mail, house).
2. **"Netflix" Tone** — Engaging, human, slightly dramatic but educational. Never condescending.
3. **The "Me" Factor** — Always explain the personal stake: why does this line of code matter to my bank account or my privacy?
4. **Jargon Decoupling** — No technical term without immediate, plain-language translation or explanation.

## Taste Profile
- **Emotional target:** "High-stakes revelation", "Engaging mystery", "Empowering clarity"
- **Quality level:** Production
- **Key references:** Netflix documentary style (e.g., "The Social Dilemma" style of explanation)
- **Aesthetic principles:** Vivid imagery through words, high-signal/low-noise.

## Decisions Log
| Date | Agent | Decision | Rationale |
|------|-------|----------|-----------|
| 2026-05-22 | design-strategist | Initialized project based on `prompt.txt` | Requirements are clear and highly specialized for non-technical vulgarization. |

## Open Questions
- [ ] Do we have a specific character limit for the rewritten sections, or just "enriched and clarified"? (User said "don't shorten")

## Artefact Index
| Artefact | Path | Status |
|----------|------|--------|
| Brief | `prompt.txt` | Approved |
| Design State | `design-state.md` | Active |

## Handoff Chain
### 2026-05-22 orchestrator → design-strategist
> "Starting the overhaul of the Heartbleed webdoc. The goal is total clarity for a general audience. We're keeping the 'Netflix' tone you established in the intro."

### 2026-05-22 design-strategist → content-writer
> "I've mapped out the personas and principles. We need to ground the 'Heartbeat' mechanism in something physical. Think about how to make 'RAM' feel like a physical space where secrets are stored. Section 1 is up first."
