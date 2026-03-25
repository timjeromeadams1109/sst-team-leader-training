import { CourseContent } from "./types";

export const tier3Advanced: CourseContent = {
  courseId: "tier-3-advanced",
  title: "Tier 3 — Advanced",
  tier: "advanced",
  tierLabel: "Experienced",
  description:
    "Leading with Excellence. Change Management, Kaizen Culture, Strategic Alignment, and Leadership Legacy.",
  objectives: [
    "Navigate the Change Curve and lead people through transitions",
    "Apply Kaizen thinking and the PDCA cycle to drive continuous improvement",
    "Connect daily team work to Simpson Strong-Tie's strategic mission",
    "Build a leadership legacy through mentoring and succession planning",
    "Create standards — not just follow them",
  ],
  prerequisites: ["Tier 2 — Developing (80% assessment score)"],
  icon: "🏆",
  color: "#8B5CF6",
  modules: [
    {
      id: "change-management",
      title: "Change Management",
      subtitle: "Leading People Through Change",
      description:
        "70% of change initiatives fail. Understanding the Change Curve helps you succeed.",
      durationMinutes: 20,
      lessons: [
        {
          id: "change-curve",
          title: "The Change Curve",
          content: `**70% of change initiatives fail.** Not because the change itself is bad, but because people aren't led through it effectively.

**The Change Curve has 4 stages:**

**1. DENIAL** — "This won't affect me"
People minimize or ignore the change. They assume things will go back to normal.
**Your role:** Communicate clearly. Share the facts. Be honest about what's changing.

**2. RESISTANCE** — "This won't work"
People push back. They may become frustrated, anxious, or disengaged.
**Your role:** Listen to concerns. Acknowledge emotions honestly. Don't dismiss or argue.

**3. EXPLORATION** — "How does this work?"
People start to engage. They ask questions and look for ways to adapt.
**Your role:** Provide training and support. Answer questions patiently. Celebrate early wins.

**4. COMMITMENT** — "This is better"
People embrace the change. They see the value and integrate it into their work.
**Your role:** Reinforce the new standard. Celebrate wins. Prevent regression.

**Leader's Role in Change:**
• Communicate the "WHY" constantly — people need to hear it 7+ times
• Acknowledge emotions honestly — resistance isn't bad, it's human
• Provide clear direction — uncertainty breeds anxiety
• Be patient — change takes time, don't rush people
• Celebrate small wins — momentum sustains change

**When They Resist:**
• Listen first — resistance often has valid roots
• Answer with facts, not frustration
• Address concerns, don't dismiss them
• Find early adopters as champions
• Give people time to adapt`,
          keyTakeaways: [
            "70% of change initiatives fail — leadership makes the difference",
            "Change Curve: Denial → Resistance → Exploration → Commitment",
            "Communicate the 'why' constantly (7+ times)",
            "Resistance is human — listen, acknowledge, address concerns",
          ],
          quiz: [
            {
              question:
                "What percentage of change initiatives typically fail?",
              options: ["30%", "50%", "70%", "90%"],
              correctIndex: 2,
              explanation:
                "70% of change initiatives fail — usually because people aren't led through the transition effectively.",
            },
            {
              question: "What is the first stage of the 'Change Curve'?",
              options: ["Commitment", "Denial", "Exploration", "Acceptance"],
              correctIndex: 1,
              explanation:
                "Denial is first — people minimize or ignore the change before they begin to resist it.",
            },
            {
              question:
                "When someone resists change, you should:",
              options: [
                "Ignore them",
                "Acknowledge concerns honestly",
                "Force compliance",
                "Terminate them",
              ],
              correctIndex: 1,
              explanation:
                "Acknowledge concerns honestly — resistance often has valid roots that need to be heard.",
            },
          ],
        },
      ],
    },
    {
      id: "kaizen-culture",
      title: "Kaizen Culture",
      subtitle: "Small Improvements Daily",
      description:
        "The Kaizen mindset and PDCA cycle — continuous improvement as a way of life.",
      durationMinutes: 20,
      lessons: [
        {
          id: "kaizen-mindset",
          title: "The Kaizen Mindset",
          content: `**KAI = Change** + **ZEN = Good** → **KAIZEN = Change for the Better**

Kaizen isn't a program or a project — it's a mindset. Small improvements every day, by everyone, everywhere. It is one of the three foundations of the TPS House (along with Heijunka/leveling and Standardized Work).

**Kaizen Principles:**
• Small daily improvements compound into massive results
• Everyone can contribute ideas — not just managers
• Go to Gemba (where the work happens) to see reality
• Challenge the status quo respectfully
• Respect what works, improve what doesn't

**PDCA Cycle — The Engine of Improvement:**

**P — PLAN:** Define the problem and propose a solution
What's the gap between current state and target? What do you think will fix it?

**D — DO:** Test the solution on a small scale
Don't roll out plant-wide. Try it on one line, one shift, one cell.

**C — CHECK:** Measure the results
Did it work? How do you know? What does the data say?

**A — ACT:** Standardize if it worked, or adjust and try again
If it worked, make it the new standard. If not, learn from it and try a new approach.

PDCA was developed by Dr. W. Edwards Deming (building on Walter Shewhart's work) and became the backbone of Toyota's continuous improvement system. Toyota calls it the "scientific method of management."

**Gemba** = "The real place" — go where the work happens. The best improvement ideas don't come from the conference room. They come from the people doing the work every day.

Small changes daily beat big projects annually. A team that makes one small improvement per week makes 52 improvements per year. That compounds.`,
          keyTakeaways: [
            "Kaizen = Change for the Better — small daily improvements",
            "PDCA: Plan → Do → Check → Act (the improvement cycle)",
            "Go to Gemba — the best ideas come from people doing the work",
            "Small improvements daily beat big projects annually",
          ],
          quiz: [
            {
              question: "In Kaizen, what does 'gemba' mean?",
              options: [
                "The office",
                "The place where work happens",
                "The conference room",
                "Management",
              ],
              correctIndex: 1,
              explanation:
                "Gemba = the actual place where work happens. Go there to see reality.",
            },
            {
              question: "The PDCA cycle stands for:",
              options: [
                "Plan, Do, Check, Act",
                "Prepare, Deliver, Confirm, Adjust",
                "Process, Data, Control, Analyze",
                "Plan, Design, Create, Approve",
              ],
              correctIndex: 0,
              explanation:
                "Plan, Do, Check, Act — the continuous improvement cycle.",
            },
            {
              question: "The best Kaizen ideas come from:",
              options: [
                "Consultants",
                "People doing the work",
                "Executives only",
                "Competitors",
              ],
              correctIndex: 1,
              explanation:
                "The people doing the work know the problems best — that's why we go to Gemba.",
            },
          ],
        },
      ],
    },
    {
      id: "strategic-alignment",
      title: "Strategic Alignment",
      subtitle: "Connecting Daily Work to Company Goals",
      description:
        "Every weld, every scan, every 5S task connects to Simpson Strong-Tie's mission.",
      durationMinutes: 15,
      lessons: [
        {
          id: "connecting-to-strategy",
          title: "Connecting to Strategy",
          content: `**Simpson Strong-Tie Mission:**
"We help people build safer, stronger homes and buildings."

Every piece of work your team does connects to this mission. Here's the chain:

**MISSION** → Build safer, stronger structures
**STRATEGY** → Quality products, reliable delivery
**SITE GOALS** → SQDC targets, efficiency metrics
**TEAM GOALS** → Daily production, quality scores
**YOUR ACTIONS** → Pre-flight, scan accuracy, 5S

**Your Role in Strategic Alignment:**
• Connect your team's work to site goals — "When we hit our quality target, here's what it means for the customer"
• Explain WHY tasks matter — not just what to do
• Show how SQDC links to customers — every connector we ship goes into a building where people live and work
• Celebrate when your team impacts strategy — "We had zero defects this week — that's our mission in action"
• Make the mission real for your team — it's not just words on a wall

When you explain to a welder that the bracket they're making will hold up someone's roof, the work takes on a different meaning. That's strategic alignment in action.

Advanced leaders don't just follow standards — they CREATE standards. They don't just improve their area — they LEAD improvement for others. This is what separates a Team Leader from someone who just manages tasks.`,
          keyTakeaways: [
            "Every task connects: Mission → Strategy → Site Goals → Team Goals → Your Actions",
            "Explain WHY tasks matter — connect work to the customer",
            "Make the mission real: our products protect people in their homes",
            "Advanced leaders CREATE standards, not just follow them",
          ],
          quiz: [
            {
              question:
                "Strategic alignment means connecting daily work to:",
              options: [
                "Personal goals",
                "Company strategy and customer outcomes",
                "Social media",
                "Competitor actions",
              ],
              correctIndex: 1,
              explanation:
                "Strategic alignment connects daily work to company strategy and customer outcomes.",
            },
          ],
        },
      ],
    },
    {
      id: "leadership-legacy",
      title: "Leadership Legacy",
      subtitle: "The Leaders You Develop",
      description:
        "Your lasting value isn't what you accomplish — it's who you develop.",
      durationMinutes: 15,
      lessons: [
        {
          id: "your-legacy",
          title: "Your Leadership Legacy",
          content: `**"A leader's lasting value is measured by succession."** — John Maxwell

Your legacy isn't your production numbers or your years of service. It's the people you develop and the culture you create.

**Your Legacy Is:**
• The team members you develop into strong contributors
• The standards you establish that outlast your tenure
• The culture of safety, quality, and respect you create daily
• The next Team Leaders you prepare to take your place
• The improvements that continue after you move on

**Succession Planning:**
Who will be the next Team Leader? Are you actively developing them? They should be able to run the team if you're absent for a week.

If you got promoted tomorrow, who would step in? If you can't answer that question, succession planning needs to become a priority.

**Mentoring Principles:**
• Share your failures, not just your successes — real stories build trust
• Give stretch assignments — growth happens outside comfort zones
• Let them struggle before rescuing — capability builds through challenge
• Advocate for their growth with management — be their champion
• Celebrate their wins publicly — build their confidence and reputation

**The Three Pillars — Advanced Level:**
• **PEOPLE:** Develop future leaders — this is your most important job
• **CUSTOMERS:** Drive strategic outcomes — connect work to mission
• **GROWTH:** Lead continuous improvement — create standards, don't just follow them

**BARC in Action:**
Be Customer Focused — every product serves someone
Act with Integrity — do right when no one is watching
Respect Others — everyone's contribution matters
Continuously Improve — never stop getting better

Congratulations on completing all three tiers. You are ready to lead with excellence.`,
          keyTakeaways: [
            "Your legacy = the leaders you develop, not your personal achievements",
            "Succession planning: who steps in if you're promoted tomorrow?",
            "Share failures, give stretch assignments, let them struggle and grow",
            "BARC: Be Customer Focused, Act with Integrity, Respect Others, Continuously Improve",
          ],
          quiz: [
            {
              question: "A leader's lasting value is measured by:",
              options: [
                "Personal achievements",
                "Succession - who they developed",
                "Years of service",
                "Salary level",
              ],
              correctIndex: 1,
              explanation:
                "Succession — the leaders you develop — defines your lasting value.",
            },
            {
              question: "Your leadership legacy is defined by:",
              options: [
                "Your title",
                "The leaders you develop",
                "Your office size",
                "Your parking spot",
              ],
              correctIndex: 1,
              explanation:
                "The leaders you develop and the culture you create are your legacy.",
            },
          ],
        },
      ],
    },
  ],
};
