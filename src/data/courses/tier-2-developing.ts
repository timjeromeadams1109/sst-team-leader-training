import { CourseContent } from "./types";

export const tier2Developing: CourseContent = {
  courseId: "tier-2-developing",
  title: "Tier 2 — Developing",
  tier: "developing",
  tierLabel: "Intermediate",
  description:
    "Building Leadership Capabilities. Cost of Quality, Root Cause Analysis, 5S Audits, and Team Development.",
  objectives: [
    "Apply the 1-10-100 Rule to quality decisions",
    "Conduct 5-Why root cause analysis on process problems",
    "Lead weekly 5S audits with proper scoring",
    "Coach team members using Tell-Show-Do-Review",
    "Identify and develop future leaders on your team",
  ],
  prerequisites: ["Tier 1 — Foundation (80% assessment score)"],
  icon: "📊",
  color: "#F59E0B",
  modules: [
    {
      id: "cost-of-quality",
      title: "Cost of Quality",
      subtitle: "Prevention • Appraisal • Failure",
      description:
        "Understanding why prevention is cheaper than correction, and why quality failures multiply in cost.",
      durationMinutes: 20,
      lessons: [
        {
          id: "1-10-100-rule",
          title: "The 1-10-100 Rule",
          content: `The cost of quality defects multiplies at each stage of the process:

**$1 — PREVENTION**
Training, standards, quality planning, doing it right the first time.

**$10 — INTERNAL FAILURE**
Rework, scrap, re-inspection — catching it inside our facility.

**$100+ — EXTERNAL FAILURE**
Returns, warranty claims, lost customers — the defect reaches the customer.

**Key Insight:** Investing $1 in prevention saves $10 in rework and $100+ in customer failures. This is why "Build it Right the First Time" isn't just a slogan — it's math.

**Quality Standards: AISC & ISO 9001**
Simpson Strong-Tie follows AISC (American Institute of Steel Construction) and ISO 9001 quality management standards. These aren't optional — they're our commitment to customers who trust our products to keep people safe.

Think about what Simpson Strong-Tie makes: structural connectors that hold buildings together. A quality failure in our product could mean a structural failure in someone's home. The stakes are as high as they get.`,
          keyTakeaways: [
            "$1 prevention saves $10 rework and $100+ customer failures",
            "Build it right the first time — it's math, not just a slogan",
            "Quality standards (AISC/ISO) are non-negotiable commitments",
            "Our products protect lives — quality failures have real consequences",
          ],
          quiz: [
            {
              question:
                "The '1-10-100' rule suggests that prevention costs:",
              options: [
                "The most",
                "The least",
                "The same as correction",
                "More than customer returns",
              ],
              correctIndex: 1,
              explanation:
                "Prevention costs $1 vs $10 for internal failure vs $100+ for external failure. Prevention is always cheapest.",
            },
          ],
        },
        {
          id: "copq",
          title: "Cost of Poor Quality (COPQ)",
          content: `**COPQ** = All costs incurred because things weren't done right the first time. It includes both visible and hidden costs.

**Visible COPQ:**
• Scrap material
• Rework labor
• Re-inspection time
• Customer returns
• Warranty claims

**Hidden COPQ (The Iceberg):**
• Lost production time
• Expediting costs
• Customer dissatisfaction
• Reputation damage
• Lost future orders

The visible costs are just the tip of the iceberg. Hidden COPQ can be 4-10x larger than visible costs. When you add it all up:

**Total Quality Cost = Prevention + Appraisal + Failure**

The goal is to shift spending toward prevention, which reduces both appraisal and failure costs.

**Your Role in Quality:**
• Check your own work before passing
• Never "work around" a defect
• Report quality issues immediately
• Train your team on quality standards
• Celebrate catches, not cover-ups

**Customer Focus:** The next process is your customer. Quality failures impact their work and our reputation.`,
          keyTakeaways: [
            "COPQ includes visible costs (scrap, rework) AND hidden costs (reputation, lost orders)",
            "Hidden COPQ is 4-10x larger than visible costs",
            "Total Quality Cost = Prevention + Appraisal + Failure",
            "Shift spending toward prevention to reduce total costs",
          ],
          quiz: [
            {
              question: "What is 'Cost of Poor Quality' (COPQ)?",
              options: [
                "Training expenses",
                "All costs from defects: scrap, rework, returns",
                "Equipment maintenance",
                "Raw material costs",
              ],
              correctIndex: 1,
              explanation:
                "COPQ = all costs incurred because things weren't done right the first time, including visible and hidden costs.",
            },
          ],
        },
      ],
    },
    {
      id: "root-cause-analysis",
      title: "Root Cause Analysis",
      subtitle: "5 Whys Method • Problem Solving",
      description:
        "Learn to find and fix root causes instead of treating symptoms.",
      durationMinutes: 20,
      lessons: [
        {
          id: "5-whys-method",
          title: "The 5 Whys Method",
          content: `Ask "Why?" five times to dig past symptoms and find the root cause.

**Example:**
**Problem:** Machine stopped producing

**Why 1:** Overload sensor tripped
**Why 2:** Bearing was overheating
**Why 3:** Insufficient lubrication
**Why 4:** Lubrication pump not working
**Why 5:** PM schedule wasn't followed

**ROOT CAUSE:** Process failure — PM schedule not followed
**FIX:** Improve PM scheduling & accountability

Notice: We didn't stop at "overload sensor tripped" — that's a symptom. We didn't blame a person — we found a system gap.

**5 Whys Rules:**
• Focus on PROCESS, not people
• Don't stop at the first answer
• Base each "why" on facts, not assumptions
• Continue until you reach a fixable cause
• Sometimes it takes more or fewer than 5

**Common Pitfalls:**
• Blaming individuals instead of systems
• Stopping too soon (accepting the first answer)
• Guessing without data
• Accepting "human error" as a root cause

"Human error" is never a root cause — it's a symptom. Ask: why was the human set up to fail? Was the process unclear? Was training inadequate? Were there too many steps?`,
          keyTakeaways: [
            "Ask 'Why?' five times to find the root cause",
            "Focus on process and systems, not blame",
            "Don't stop at the first answer — dig deeper",
            "'Human error' is never a root cause — find the system gap",
          ],
          quiz: [
            {
              question:
                "In the '5 Whys' method, what are you trying to find?",
              options: [
                "Who made the mistake",
                "The root cause of a problem",
                "Five different solutions",
                "Management approval",
              ],
              correctIndex: 1,
              explanation:
                "The 5 Whys method helps you find the root cause of a problem — not assign blame.",
            },
            {
              question:
                "In root cause analysis, stopping at the first answer is:",
              options: [
                "Recommended",
                "A common pitfall",
                "Required by ISO",
                "Best practice",
              ],
              correctIndex: 1,
              explanation:
                "Stopping at the first answer means you're treating symptoms, not the root cause.",
            },
          ],
        },
      ],
    },
    {
      id: "5s-auditing",
      title: "5S Auditing",
      subtitle: "Sustain Through Accountability",
      description:
        "Learn to conduct effective 5S audits that sustain standards and drive improvement.",
      durationMinutes: 15,
      lessons: [
        {
          id: "5s-audit-process",
          title: "5S Audit Process",
          content: `Without regular audits, 5S standards drift. Weekly audits are the key to sustained excellence.

**Audit Scoring (0-4):**
• **0** — Not implemented
• **1** — Just starting
• **2** — Partially implemented
• **3** — Mostly sustained
• **4** — Fully sustained

**Audit Frequency:**
Weekly audits are recommended. Without regular audits, standards drift back to chaos within weeks.

**What to Audit:**
• **SORT:** Are unnecessary items removed?
• **SET:** Is everything in its designated place?
• **SHINE:** Is the area clean and well-maintained?
• **STANDARDIZE:** Are visual standards clear and current?
• **SUSTAIN:** Are habits maintained without reminders?

**After the Audit:**
• Review scores with your team — transparency builds ownership
• Identify improvement opportunities together
• Assign corrective actions with owners and due dates
• Follow up on previous gaps — did they stay fixed?
• Celebrate improvements — recognize effort

The best 5S audits aren't punitive — they're coaching opportunities. Walk the area WITH your team member, point out what's working well, and collaborate on gaps.`,
          keyTakeaways: [
            "Weekly audits prevent standards from drifting",
            "Score 0-4 for each S category",
            "Audits are coaching opportunities, not punishment",
            "Follow up on previous gaps — ensure fixes stick",
          ],
          quiz: [
            {
              question: "How often should 5S audits be conducted?",
              options: [
                "Monthly",
                "Weekly",
                "Annually",
                "Only when problems occur",
              ],
              correctIndex: 1,
              explanation:
                "Weekly audits are recommended to sustain 5S discipline and prevent drift.",
            },
            {
              question: "What score indicates 'Fully Sustained' in a 5S audit?",
              options: ["1", "2", "3", "4"],
              correctIndex: 3,
              explanation:
                "4 = Fully Sustained. 0 = Not implemented, through 3 = Mostly sustained.",
            },
          ],
        },
      ],
    },
    {
      id: "team-development",
      title: "Team Development",
      subtitle: "Coaching • Feedback • Growth",
      description:
        "Your most important job as a Team Leader: developing the people on your team.",
      durationMinutes: 20,
      lessons: [
        {
          id: "tell-show-do-review",
          title: "Tell-Show-Do-Review",
          content: `The four-step coaching model for developing skills:

**TELL** — Explain the task and why it matters
Give context. People learn better when they understand the "why" behind the "what."

**SHOW** — Demonstrate the right way
Do it yourself at normal speed, then again slowly, calling out key steps.

**DO** — Let them practice while you observe
Resist the urge to take over. Let them try, make small mistakes, and self-correct.

**REVIEW** — Give feedback and reinforce learning
Be specific about what went well and what to adjust. End on a positive note.

**Effective Feedback:**
• Be specific, not vague ("You missed the third weld on that joint" vs. "Be more careful")
• Focus on behavior, not personality
• Give it close to the event — don't save it for weeks later
• Balance positive and constructive feedback
• Ask for their perspective — "How do you think that went?"

**Signs of Leadership Potential:**
• Takes initiative without being asked
• Helps others succeed (not just themselves)
• Stays calm under pressure
• Asks good questions
• Accepts feedback well and adjusts

Your most important job is developing your team. Ask yourself: who will be the next Team Leader? Are you actively developing them?`,
          keyTakeaways: [
            "Tell → Show → Do → Review — the coaching cycle",
            "Give specific, behavior-focused feedback close to the event",
            "Resist taking over — let them practice and self-correct",
            "Identify and develop future leaders on your team",
          ],
          quiz: [
            {
              question:
                "In the coaching model 'Tell-Show-Do-Review', what comes after 'Show'?",
              options: [
                "Tell again",
                "Do (let them practice)",
                "Review immediately",
                "Document",
              ],
              correctIndex: 1,
              explanation:
                "After demonstrating (Show), let them practice (Do) while you observe.",
            },
            {
              question: "Coaching feedback should be:",
              options: [
                "Vague and general",
                "Specific and behavior-focused",
                "Only positive",
                "Given annually",
              ],
              correctIndex: 1,
              explanation:
                "Specific, behavior-focused feedback drives improvement. 'Good job' doesn't teach anything.",
            },
          ],
        },
      ],
    },
  ],
};
