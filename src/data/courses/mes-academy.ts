import { CourseContent } from "./types";

export const mesAcademy: CourseContent = {
  courseId: "mes-academy",
  title: "MES Mastery",
  tier: "mes-mastery",
  tierLabel: "Supplemental",
  description:
    "Deep-dive into the SST Manufacturing Execution System. Leader Standard Work, Tier meetings, Escalation, Jidoka, A3 Problem Solving, SMED, and TPM.",
  objectives: [
    "Execute Leader Standard Work consistently across shifts",
    "Facilitate a Tier 1 meeting in under 15 minutes",
    "Escalate appropriately using defined criteria",
    "Apply Jidoka, SMED, and TPM concepts in your area",
    "Conduct A3 and 5-Why analysis for complex problems",
  ],
  prerequisites: ["Tier 1 — Foundation (recommended)"],
  icon: "⚙️",
  color: "#0EA5E9",
  modules: [
    {
      id: "role-clarity",
      title: "Team Leader Role Clarity",
      subtitle: "What a Team Leader Owns",
      description: "Understand the Team Leader role, authority, accountability, and daily rhythm.",
      durationMinutes: 15,
      lessons: [
        {
          id: "tl-role",
          title: "Team Leader vs. Supervisor",
          content: `The Team Leader role is distinct from a Supervisor. Understanding the boundaries prevents confusion and builds confidence.

**Team Leader Owns:**
• Daily execution on the floor
• Tier 1 meetings and team communication
• Standard work adherence and coaching
• First response to abnormalities
• Safety, quality, and 5S in their area

**Supervisor Owns:**
• Cross-area coordination
• Discipline and formal performance issues
• Resource allocation and scheduling
• Tier 2 escalation response
• Policy decisions

**The 5 Team Leader Behaviors:**
1. **Be Present** — Spend 80%+ of your time on the floor with your team
2. **Be Consistent** — Follow standard work every shift, every day
3. **Be Responsive** — React to abnormalities within minutes, not hours
4. **Be Developmental** — Coach and teach, don't just direct
5. **Be Accountable** — Own your area's results, good and bad

**Your Daily Rhythm:**
• **First 30 min:** Pre-flight, review prior shift notes, safety walk, Tier 1 meeting
• **Hourly:** Floor presence, check production vs. target, respond to abnormalities
• **Last 30 min:** Post-flight, update boards, complete handoff notes

**Authority:** You CAN stop work for safety or quality. You CAN reassign tasks within your team. You CANNOT discipline, approve overtime, or change the schedule without Supervisor approval.`,
          keyTakeaways: [
            "Team Leaders own daily execution; Supervisors own cross-area coordination",
            "5 Behaviors: Present, Consistent, Responsive, Developmental, Accountable",
            "Spend 80%+ of your time on the floor with your team",
            "You CAN stop work for safety — you don't need permission",
          ],
          quiz: [
            {
              question: "What percentage of time should a Team Leader spend on the floor?",
              options: ["50%", "60%", "70%", "80%+"],
              correctIndex: 3,
              explanation: "Team Leaders should spend 80%+ of their time on the floor with their team — that's where the work happens.",
            },
          ],
        },
      ],
    },
    {
      id: "leader-standard-work",
      title: "Leader Standard Work",
      subtitle: "Your Documented Routine",
      description: "The documented daily routine that ensures consistency across shifts.",
      durationMinutes: 20,
      lessons: [
        {
          id: "lsw-overview",
          title: "Leader Standard Work (LSW)",
          content: `Leader Standard Work is your documented daily routine. It ensures that critical tasks happen every shift, regardless of who is leading.

**Why LSW Matters:**
• Consistency across shifts and Team Leaders
• Nothing critical gets missed
• New Team Leaders can ramp up faster
• Makes your day manageable instead of reactive
• Creates accountability — you can audit against it

**Shift Start Standard Work (First 30 minutes):**
1. Review prior shift handoff notes
2. Walk your area — safety check (PPE, hazards, 5S)
3. Check equipment status and any open maintenance tickets
4. Review production schedule and material availability
5. Conduct Tier 1 meeting (10-15 minutes)
6. Assign work and confirm understanding

**Hourly Checks Standard Work:**
• Production vs. target — are we on pace?
• Quality — any defects or holds?
• Safety — any new hazards?
• Equipment — any issues?
• People — anyone need help or coaching?

**Shift End Standard Work (Last 30 minutes):**
1. Verify all production is scanned
2. Review quality checks for the shift
3. Update Tier 1 board with final numbers
4. Complete handoff notes (Status, Issues, Equipment, Quality, Safety)
5. Clean and organize area (5S)
6. Brief incoming Team Leader face-to-face if possible

**LSW is not a suggestion — it's standard work.** Just like operators have standard work for their tasks, Team Leaders have standard work for leadership.`,
          keyTakeaways: [
            "LSW ensures consistency — nothing critical gets missed",
            "Shift Start: safety walk, Tier 1 meeting, assign work",
            "Hourly: production, quality, safety, equipment, people checks",
            "Shift End: verify scans, update boards, handoff notes, 5S",
          ],
        },
      ],
    },
    {
      id: "tier-1-meetings",
      title: "Tier 1 Meeting Standard",
      subtitle: "The 10-15 Minute Huddle",
      description: "How to run an effective daily team huddle using the Tier 1 board.",
      durationMinutes: 20,
      lessons: [
        {
          id: "tier-1-standard",
          title: "Tier 1 Meeting Script",
          content: `The Tier 1 meeting is the heartbeat of your team's daily management. It happens every shift, at the board, in 10-15 minutes.

**Tier 1 Board Layout (SQDCPE):**
• **S — Safety:** Safety Cross, Good Catches, JBOs
• **Q — Quality:** First Piece Inspection, NCRs, Escapes
• **D — Delivery:** Hourly targets vs. actual, downtime
• **C — Cost:** Scrap, overtime, waste
• **P — People:** Attendance, training, recognition
• **E — Environment:** Waste reduction, energy

**Meeting Script (Minute by Minute):**
**0-2 min:** Safety — "Any safety concerns? Good Catches to report? Update the Safety Cross."
**2-4 min:** Quality — "Any quality issues from last shift? First piece inspection results?"
**4-6 min:** Delivery — "Where are we vs. target? Any production gaps? Root cause?"
**6-8 min:** Cost/People — "Scrap report. Attendance. Any training needs?"
**8-10 min:** Actions — "Open items from yesterday. New action items. Who owns what? Due when?"
**10 min:** Close — "Any questions? Let's have a safe, productive shift."

**What Good Looks Like:**
• Team Leader facilitates, doesn't lecture
• Team members actively participate and own items
• Board is updated BEFORE the meeting
• Action items have owners and due dates
• Meeting ends on time — respect people's time

**Common Tier 1 Failures:**
• Going over 15 minutes (meeting fatigue)
• Team Leader does all the talking
• Board not updated — data is stale
• No follow-up on action items
• Skipping the meeting "because we're too busy"`,
          keyTakeaways: [
            "Tier 1 meetings: every shift, at the board, 10-15 minutes max",
            "Follow SQDCPE sequence: Safety, Quality, Delivery, Cost, People, Environment",
            "Update the board BEFORE the meeting — stale data wastes time",
            "Action items need owners and due dates — follow up every day",
          ],
          quiz: [
            {
              question: "How long should a Tier 1 meeting last?",
              options: ["5 minutes", "10-15 minutes", "30 minutes", "1 hour"],
              correctIndex: 1,
              explanation: "Tier 1 meetings should be 10-15 minutes max — at the board, following SQDCPE.",
            },
          ],
        },
      ],
    },
    {
      id: "escalation",
      title: "Escalation Rules",
      subtitle: "What, When, How to Escalate",
      description: "Know what to own, what to escalate, and how to communicate upward.",
      durationMinutes: 15,
      lessons: [
        {
          id: "escalation-rules",
          title: "Escalation Decision Tree",
          content: `Knowing when to escalate is a critical Team Leader skill. Escalate too much and you overwhelm your Supervisor. Too little and problems fester.

**What to OWN (Handle Yourself):**
• Standard work deviations you can correct with coaching
• Minor equipment issues covered by AM checklists
• 5S gaps in your area
• Scheduling minor task reassignments within your team
• Answering team member questions about standard work

**What to ESCALATE:**
• Safety incidents or imminent danger — IMMEDIATELY
• Quality issues that could reach customers
• Equipment breakdowns requiring maintenance
• Production more than 1 hour behind target
• Personnel issues beyond coaching (attendance, behavior)
• Material shortages that will stop production

**How to Escalate Effectively:**
1. **State the problem clearly** — "We have a quality hold on Line 3. 15 parts are suspect."
2. **Share what you've done** — "I've segregated the parts and stopped the line."
3. **State what you need** — "I need Quality to disposition the parts and Engineering to check the tooling."
4. **Give a timeline** — "If we don't resolve by 10 AM, we'll miss the delivery."

**Following Up on Escalations:**
• Track every escalation on your Tier 1 board
• Follow up daily until closed
• Communicate resolution back to your team
• Document the outcome for the handoff log`,
          keyTakeaways: [
            "Own: coaching, minor issues, 5S, task reassignment within your team",
            "Escalate: safety incidents, quality escapes, breakdowns, staffing issues",
            "Escalate with: problem, what you've done, what you need, timeline",
            "Track escalations on Tier 1 board and follow up daily",
          ],
          quiz: [
            {
              question: "When should a safety incident be escalated?",
              options: ["End of shift", "During Tier 1 meeting", "Immediately", "After investigation"],
              correctIndex: 2,
              explanation: "Safety incidents or imminent danger must be escalated IMMEDIATELY — no waiting.",
            },
          ],
        },
      ],
    },
    {
      id: "safety-leadership",
      title: "Safety — Your #1 Accountability",
      subtitle: "JBOs • Good Catch Program • Safety Escalation",
      description: "Deep-dive into safety leadership tools and protocols.",
      durationMinutes: 15,
      lessons: [
        {
          id: "safety-tools",
          title: "Safety Leadership Tools",
          content: `As Team Leader, safety is your #1 accountability. You set the tone. If you skip PPE, your team will too.

**Job Breakdown Observations (JBOs):**
JBOs are structured observations of work being performed. You watch a team member do their job and compare it to standard work.

**How to conduct a JBO:**
1. Tell the team member you're observing — it's coaching, not spying
2. Watch the full cycle without interrupting
3. Note deviations from standard work
4. Discuss observations immediately after
5. Coach the correct method using Tell-Show-Do-Review
6. Document and follow up

**Good Catch Program:**
Good Catches are your proactive safety system. A culture where people report hazards freely is a culture that prevents injuries.

**How to build a Good Catch culture:**
• Recognize EVERY Good Catch publicly at Tier 1 meetings
• Never punish or dismiss a report — even if it seems minor
• Share Good Catches across shifts — a hazard on one shift affects all shifts
• Track Good Catch trends — patterns reveal systemic issues
• Set a team goal — aim for 2+ Good Catches per week

**Safety Escalation Protocol — When to Stop Work:**
You have the AUTHORITY and the OBLIGATION to stop work when:
• Imminent danger to any person
• Missing or damaged safety equipment
• Unresolved lockout/tagout issue
• Environmental hazard (spill, fumes, fire risk)

You NEVER need permission to stop work for safety. EVER.

**Safety Leading Indicators:**
• Good Catch rate (higher = better)
• JBO completion rate
• Near-miss reports
• Safety audit scores
• Training completion rate`,
          keyTakeaways: [
            "JBOs: observe, compare to standard, coach immediately",
            "Never punish Good Catch reports — celebrate every one",
            "You NEVER need permission to stop work for safety",
            "Leading indicators (Good Catches, JBOs) predict future performance",
          ],
        },
      ],
    },
    {
      id: "quality-ownership",
      title: "Quality — Building It In",
      subtitle: "First Piece Inspection • NCR Process • Quality Escapes",
      description: "Quality at the source — building it in, not inspecting it in.",
      durationMinutes: 15,
      lessons: [
        {
          id: "quality-source",
          title: "Quality at the Source",
          content: `Quality at the source means building quality into the process, not relying on end-of-line inspection to catch problems.

**First Piece Inspection (FPI):**
Before running production, verify the FIRST piece meets specification.

**FPI Process:**
1. Run the first piece at normal speed
2. Measure against specification (drawings, gauges, templates)
3. If PASS: sign off and begin production
4. If FAIL: STOP, adjust, run another first piece
5. Document FPI results on quality log

**NCR Process (Non-Conformance Report):**
When a defect is found:
1. STOP — Don't continue producing
2. SEGREGATE — Separate suspect parts (red tag or hold area)
3. DOCUMENT — Complete the NCR form (what, where, when, how many)
4. NOTIFY — Inform your Supervisor and Quality
5. WAIT — Do not disposition or rework without Quality approval

**Quality Escapes:**
A quality escape is when a defect leaves your area and reaches the next process or the customer. This is the most expensive type of failure.

**Preventing Escapes:**
• Consistent First Piece Inspection at every setup
• Self-inspection before passing work downstream
• Standard work adherence — the process is designed to prevent defects
• Immediate escalation of quality concerns

**Quality Escalation Protocol — When to Stop:**
Stop production for quality when:
• FPI fails repeatedly
• Defect rate exceeds threshold
• Customer-specific requirement at risk
• Material is suspect or out of spec`,
          keyTakeaways: [
            "First Piece Inspection before every production run",
            "NCR process: Stop, Segregate, Document, Notify, Wait",
            "Quality escapes are the most expensive failures",
            "Stop production when defect rates exceed thresholds",
          ],
          quiz: [
            {
              question: "What should you do when a defect is found during production?",
              options: [
                "Continue and sort later",
                "Stop, segregate, and document",
                "Speed up to make up lost time",
                "Only report at end of shift",
              ],
              correctIndex: 1,
              explanation: "Stop production, segregate suspect parts, and document with an NCR. Don't continue producing defects.",
            },
          ],
        },
      ],
    },
    {
      id: "flow-basics",
      title: "Flow Basics",
      subtitle: "Batch vs. Flow • Bottlenecks • WIP",
      description: "Understanding flow, identifying bottlenecks, and controlling work-in-process.",
      durationMinutes: 15,
      lessons: [
        {
          id: "flow-concepts",
          title: "Understanding Flow",
          content: `**Batch thinking** seems efficient but creates hidden waste. Flow thinking delivers value faster.

**Why Batch Thinking Hurts:**
• Long wait times between operations
• Large WIP (Work-In-Process) inventory piles up
• Defects aren't found until the whole batch is done
• Scheduling becomes complex and unpredictable
• Space is consumed by stored inventory

**One-Piece Flow (Ideal State):**
Each piece moves directly from one operation to the next without waiting. Benefits:
• First piece delivered quickly
• Defects caught immediately (after 1 piece, not 100)
• Minimal WIP inventory
• Simple scheduling
• Less floor space needed

**Identifying Bottlenecks:**
A bottleneck is the operation that limits the throughput of the entire system. Everything downstream waits for the bottleneck.

**How to identify bottlenecks:**
• Where does WIP pile up in front of an operation?
• Which operation consistently falls behind?
• What happens when that station stops?

**Managing WIP:**
• Set WIP limits between operations — when the limit is reached, the upstream operation pauses
• Make WIP visible — if you can't see it, you can't manage it
• Reduce batch sizes — smaller batches flow faster
• Balance workload across stations

Your role as Team Leader: observe flow, identify where things stop moving, and work to reduce those stoppages.`,
          keyTakeaways: [
            "Batch thinking hides waste — flow reveals it",
            "One-piece flow: faster delivery, fewer defects, less WIP",
            "Bottleneck = the operation that limits total throughput",
            "Set WIP limits to prevent inventory pile-up",
          ],
        },
      ],
    },
    {
      id: "jidoka",
      title: "Jidoka — Autonomation",
      subtitle: "Andon System • Response Standard",
      description: "Building quality into the process through Jidoka and the Andon system.",
      durationMinutes: 15,
      lessons: [
        {
          id: "jidoka-andon",
          title: "Jidoka & the Andon System",
          content: `**Jidoka** (autonomation) means "automation with a human touch." The principle: when an abnormality is detected, stop and fix it immediately rather than passing it on.

**The Andon System:**
Andon is a signaling system that makes problems visible instantly. When a team member encounters an abnormality, they "pull Andon" to signal for help.

**Andon Signal Types:**
• **Safety** — Imminent danger or incident
• **Quality** — Defect or specification issue
• **Equipment** — Machine malfunction or breakdown
• **Material** — Wrong material, shortage, or damage

**Your Andon Response Standard:**
1. **Acknowledge** within 1 minute — go to the station
2. **Assess** the situation — is it a safety issue? Quality? Equipment?
3. **Act** — apply immediate countermeasure or escalate
4. **Record** — document in the Andon log (time, issue, response, resolution)

**When to Pull Andon (Decision Criteria):**
• You cannot produce to standard
• A safety hazard exists
• Quality is compromised
• You don't understand the work instruction
• Equipment is behaving abnormally

**Key principle:** It's ALWAYS better to stop and fix than to keep running and create more problems. Never punish someone for pulling Andon — they're protecting the team and the customer.

**Andon Log Completion:**
Every Andon event must be documented: Date, Time, Shift, Area, Issue, Andon Type, Response Time, Resolution, Root Cause, Countermeasure.`,
          keyTakeaways: [
            "Jidoka: stop and fix immediately — don't pass problems on",
            "Respond to Andon within 1 minute",
            "Never punish someone for pulling Andon",
            "Document every Andon event in the log",
          ],
          quiz: [
            {
              question: "How quickly should you respond to an Andon signal?",
              options: ["5 minutes", "Within 1 minute", "End of the hour", "Next Tier 1 meeting"],
              correctIndex: 1,
              explanation: "Acknowledge and respond to Andon within 1 minute — go to the station immediately.",
            },
          ],
        },
      ],
    },
    {
      id: "a3-problem-solving",
      title: "A3 Problem Solving",
      subtitle: "One-Page Thinking • 5-Why Practice",
      description: "Structured problem solving using the A3 format for complex issues.",
      durationMinutes: 20,
      lessons: [
        {
          id: "a3-method",
          title: "A3 Thinking",
          content: `The A3 is a one-page problem-solving document (named after the A3 paper size: 11×17 inches). It forces structured thinking and clear communication.

**Left Side (Understanding the Problem):**
1. **Background** — Why does this matter? What's the context?
2. **Current Condition** — What's happening now? Include data.
3. **Goal** — What should be happening? What's the target?
4. **Root Cause Analysis** — Why is there a gap? Use 5-Why analysis.

**Right Side (Solving the Problem):**
5. **Countermeasures** — What will we do to address the root cause?
6. **Implementation Plan** — Who does what, by when?
7. **Results** — What happened? Did it work?
8. **Follow-up** — How do we sustain the fix? Next PDCA cycle?

**When to Use A3 vs. Quick Fix:**
• **Quick Fix:** Simple, single-cause problems. "The tool broke — replace it."
• **A3:** Complex problems with multiple possible causes, recurring problems, or problems that affect multiple areas.

**5-Why Practice (Built into A3):**
The root cause section of every A3 should include a 5-Why analysis. Don't accept the first answer. Keep asking "Why?" until you reach a systemic cause you can fix.

**A3 Tips:**
• Use data and facts, not opinions
• Include visuals (charts, photos, diagrams)
• Get input from the people doing the work
• Review with your team — they'll catch what you miss
• Keep it to ONE page — the constraint forces clarity`,
          keyTakeaways: [
            "A3: one-page structured problem solving (Left = understand, Right = solve)",
            "Use A3 for complex or recurring problems, quick fix for simple ones",
            "Always include 5-Why root cause analysis",
            "Use data, get input from workers, keep it to one page",
          ],
        },
      ],
    },
    {
      id: "smed",
      title: "SMED Basics",
      subtitle: "Quick Changeover • Internal vs. External Setup",
      description: "Reducing changeover time to increase flexibility and capacity.",
      durationMinutes: 15,
      lessons: [
        {
          id: "smed-overview",
          title: "SMED — Single Minute Exchange of Die",
          content: `**SMED** stands for Single Minute Exchange of Die — the goal of reducing changeover time to under 10 minutes (single digits).

**Why Changeover Time Matters:**
• Long changeovers = large batches (to "justify" the setup time)
• Large batches = more WIP, longer lead times, more defects
• Short changeovers = small batches = more flexibility

**The Key Distinction: Internal vs. External Setup**

**Internal Setup:** Tasks that can ONLY be done when the machine is stopped
• Changing tooling, adjusting settings, swapping fixtures

**External Setup:** Tasks that can be done WHILE the machine is still running
• Staging next tooling, preparing materials, getting paperwork ready

**The SMED Process:**
1. **Observe** the current changeover — video it, time every step
2. **Separate** internal from external tasks
3. **Convert** internal to external where possible (pre-stage, pre-heat, pre-set)
4. **Streamline** remaining internal tasks (quick-release clamps, standardized tooling)
5. **Practice** — like a pit crew, speed comes from repetition

**Your Role as Team Leader in Changeover:**
• Ensure materials and tooling are staged BEFORE the changeover begins
• Time changeovers and track trends
• Coach your team on the standard changeover procedure
• Identify improvement opportunities and bring them to Tier 1

The goal isn't speed for its own sake — it's flexibility. Short changeovers mean we can run smaller batches, respond to customer needs faster, and reduce WIP.`,
          keyTakeaways: [
            "SMED goal: changeover in under 10 minutes (single digits)",
            "Key: separate Internal (machine stopped) from External (machine running) tasks",
            "Convert internal to external — pre-stage everything possible",
            "Short changeovers enable small batches and faster customer response",
          ],
        },
      ],
    },
    {
      id: "tpm-am",
      title: "TPM & Autonomous Maintenance",
      subtitle: "Clean, Inspect, Lubricate • Tagging Abnormalities",
      description: "Operator-driven equipment care that prevents breakdowns.",
      durationMinutes: 15,
      lessons: [
        {
          id: "tpm-basics",
          title: "TPM & Autonomous Maintenance",
          content: `**TPM (Total Productive Maintenance)** is a system where EVERYONE takes ownership of equipment — not just the maintenance team.

**Autonomous Maintenance (AM)** is the operator's role in TPM: basic equipment care that prevents breakdowns before they happen.

**The 3 AM Basics: Clean, Inspect, Lubricate**

**CLEAN:** Cleaning isn't just cosmetics — it's inspection. When you clean a machine, you see problems: leaks, cracks, loose bolts, worn parts.

**INSPECT:** Look for abnormalities during cleaning. Is anything different from yesterday? Unusual sounds, smells, vibrations, temperatures?

**LUBRICATE:** Follow the lubrication schedule. Under-lubrication causes overheating and premature wear. Over-lubrication attracts contaminants.

**AM Checklist Standard:**
• **Daily:** Visual inspection, clean, check fluid levels, listen for abnormal sounds
• **Weekly:** Detailed inspection per checklist, lubrication, filter checks
• **Monthly:** Deep clean, comprehensive inspection, report findings to Maintenance

**Tagging Abnormalities:**
When you find something wrong that you can't fix:
1. Place a tag on the equipment at the abnormality location
2. Document: date, description, who found it, severity
3. Report to Maintenance through the CMMS system
4. Track on your Tier 1 board until resolved

**TPM Leading Indicators:**
• AM checklist completion rate (target: 100%)
• Number of abnormalities tagged
• Mean Time Between Failures (MTBF) — should increase
• Unplanned downtime — should decrease
• Maintenance backlog trend

**Key principle:** The operator knows the machine best because they use it every day. AM leverages that knowledge to prevent problems.`,
          keyTakeaways: [
            "TPM: everyone owns equipment care, not just Maintenance",
            "AM basics: Clean (to inspect), Inspect (for abnormalities), Lubricate (per schedule)",
            "Tag abnormalities you can't fix and report to Maintenance",
            "Track AM completion rate and MTBF as leading indicators",
          ],
        },
      ],
    },
    {
      id: "mes-certification",
      title: "MES Certification Path",
      subtitle: "What Good Looks Like • Next Steps",
      description: "Exemplar Team Leader behaviors and the path to full MES certification.",
      durationMinutes: 10,
      lessons: [
        {
          id: "certification-path",
          title: "What Good Looks Like — Team Leader",
          content: `**An exemplar Team Leader in the SST-MES system:**

**Daily Execution:**
• Completes Pre-Flight and Post-Flight every shift without exception
• Facilitates Tier 1 meeting in 10-15 minutes, at the board, with full team participation
• Updates all boards with current data before meetings
• Responds to Andon within 1 minute
• Conducts hourly floor checks using LSW

**Safety Leadership:**
• Updates Safety Cross first thing every shift
• Recognizes every Good Catch publicly
• Conducts JBOs weekly and coaches immediately
• Never compromises safety for production
• Models PPE compliance 100% of the time

**Quality Ownership:**
• Ensures First Piece Inspection at every setup
• Follows NCR process without shortcuts
• Teaches team "the next process is your customer"
• Tracks quality metrics and drives improvement

**People Development:**
• Coaches using Tell-Show-Do-Review daily
• Identifies and develops future Team Leaders
• Gives specific, timely feedback
• Creates a psychologically safe team environment
• Communicates the "why" behind every change

**Continuous Improvement:**
• Uses PDCA for all improvement activities
• Conducts weekly 5S audits
• Applies 5-Why to every recurring problem
• Brings improvement ideas to Tier 1 and Tier 2
• Tracks and follows up on all action items

**Certification Requirements:**
• Pass all three tier assessments with 80%+ score
• Complete MES Academy modules
• Demonstrate competency through Supervisor observation
• Facilitate 5 observed Tier 1 meetings
• Complete 2 documented A3 problem-solving events

This isn't a destination — it's a standard of daily practice.`,
          keyTakeaways: [
            "Exemplar TLs execute standard work consistently, not occasionally",
            "Safety, quality, people development, and improvement — all daily",
            "Certification: assessments + observation + demonstrated competency",
            "This is a standard of daily practice, not a one-time achievement",
          ],
        },
      ],
    },
  ],
};
