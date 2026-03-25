import { CourseContent } from "./types";

export const tier1Foundation: CourseContent = {
  courseId: "tier-1-foundation",
  title: "Tier 1 — Foundation",
  tier: "foundation",
  tierLabel: "Beginner",
  description:
    "Building the Foundation for Excellence. Safety, SQDC, 5S, process flow, and shift discipline.",
  objectives: [
    "Understand and update the Safety Cross daily",
    "Explain the SQDC priority framework",
    "Apply 5S methodology in your work area",
    "Demonstrate batch vs. one-piece flow concepts",
    "Execute Pre-Flight and Post-Flight checklists consistently",
  ],
  prerequisites: [],
  icon: "🛡️",
  color: "#22C55E",
  modules: [
    {
      id: "safety-excellence",
      title: "Safety Excellence",
      subtitle: "Safety Cross • Good Catches • TRIR • Hierarchy of Controls",
      description:
        "Safety is the #1 priority at Simpson Strong-Tie. Learn the tools and behaviors that keep every team member safe.",
      durationMinutes: 20,
      lessons: [
        {
          id: "safety-cross",
          title: "The Safety Cross",
          content: `The Safety Cross is a visual calendar displayed in your work area that tracks daily safety performance. Each day is color-coded:

**GREEN** — Safe day, no incidents
**YELLOW** — Good Catch reported (this is a WIN!)
**RED** — Incident occurred

**Goal:** An all-green month.

As a Team Leader, the Safety Cross is one of your most important visual tools. It tells the story of your team's safety culture at a glance.

**Team Leader Responsibilities:**
• Update Safety Cross DAILY at shift start
• Review during team huddles
• Investigate and document any incidents
• Celebrate safe day streaks
• Recognize Good Catch reporters

Good Catches are WINS! A Good Catch identifies a hazard BEFORE it causes an incident. More Good Catches = Fewer incidents. Celebrate every one!

The Safety Cross should be prominently displayed where your entire team can see it. It creates accountability and pride — when your team sees a streak of green days, they naturally want to protect that streak.`,
          keyTakeaways: [
            "Update the Safety Cross at the start of every shift",
            "Green = safe day, Yellow = good catch, Red = incident",
            "Good Catches are celebrated — they prevent injuries",
            "The Safety Cross tells your team's safety story",
          ],
          quiz: [
            {
              question: "What does GREEN mean on the Safety Cross?",
              options: [
                "Good Catch reported",
                "Safe day - no incidents",
                "Incident occurred",
                "Equipment maintenance",
              ],
              correctIndex: 1,
              explanation:
                "Green indicates a safe day with no incidents. The goal is an all-green month.",
            },
          ],
        },
        {
          id: "hierarchy-of-controls",
          title: "Safety Hierarchy of Controls",
          content: `The Safety Pyramid shows the relationship between incident severity and frequency:

**FATALITY** (top — rarest, most severe)
**LOST TIME** injuries
**RECORDABLE** injuries
**FIRST AID** incidents
**NEAR MISSES**
**GOOD CATCHES** (bottom — most frequent, least severe)

**The key insight:** More Good Catches at the bottom = Fewer incidents at the top. This is why we celebrate Good Catches — they are your early warning system.

**Good Catch Process:**
1. **STOP** — Secure the hazard if safe to do so
2. **REPORT** — Notify your Team Leader immediately
3. **DOCUMENT** — Complete the Good Catch form
4. **RECOGNIZE** — Celebrate and share the catch

**Examples of Good Catches:**
• Frayed electrical cord spotted before use
• Oil on floor reported before a slip occurs
• Missing machine guard identified
• Unusual equipment sounds reported
• Improper PPE usage corrected

Every Good Catch is a potential injury that was PREVENTED. When someone reports a Good Catch, they are protecting their teammates. That deserves recognition.`,
          keyTakeaways: [
            "More Good Catches = Fewer serious incidents",
            "STOP → REPORT → DOCUMENT → RECOGNIZE",
            "Good Catches prevent injuries — celebrate them",
            "Every team member is responsible for reporting hazards",
          ],
          quiz: [
            {
              question: "What is a 'Good Catch'?",
              options: [
                "A quality defect found at inspection",
                "A hazard identified BEFORE causing an incident",
                "A production target achieved early",
                "A customer compliment",
              ],
              correctIndex: 1,
              explanation:
                "A Good Catch identifies a hazard BEFORE it causes an incident — it's proactive safety.",
            },
          ],
        },
        {
          id: "understanding-trir",
          title: "Understanding TRIR",
          content: `**TRIR** stands for **Total Recordable Incident Rate** — the industry standard measure of workplace safety performance.

**Formula:**
TRIR = (Recordable Incidents × 200,000) ÷ Hours Worked

The 200,000 represents 100 employees × 40 hours/week × 50 weeks/year. This standardizes the rate so companies of different sizes can be compared.

**What counts as a recordable incident?**
• Medical treatment beyond first aid
• Days away from work
• Restricted work or job transfer
• Loss of consciousness
• Significant injury diagnosed by physician

**Why TRIR matters:**
• Industry benchmark for safety performance
• Required for OSHA reporting
• Customers evaluate our TRIR before awarding contracts
• Insurance costs are directly tied to TRIR
• Reflects the strength of our safety culture

**TRIR Targets:**
• **0** — Our goal (zero incidents)
• **< 1.0** — World class manufacturing
• **3.0** — Manufacturing average

Every recordable injury significantly impacts our TRIR. Prevention is the ONLY strategy that works.

**PEOPLE + CUSTOMERS:** A low TRIR protects our people AND our reputation with customers who evaluate our safety record before doing business with us.`,
          keyTakeaways: [
            "TRIR = (Recordable Incidents × 200,000) ÷ Hours Worked",
            "World class = below 1.0, our goal = zero",
            "Customers evaluate our TRIR before contracts",
            "Prevention is the only strategy",
          ],
        },
      ],
    },
    {
      id: "sqdc-framework",
      title: "SQDC Framework",
      subtitle: "Safety • Quality • Delivery • Cost",
      description:
        "The SQDC priority framework drives every decision. Learn the order and why it matters.",
      durationMinutes: 15,
      lessons: [
        {
          id: "sqdc-priority",
          title: "The SQDC Priority",
          content: `SQDC is the priority framework that guides every decision at Simpson Strong-Tie:

**S — SAFETY** — Nothing is worth getting hurt
**Q — QUALITY** — Build it right the first time
**D — DELIVERY** — Keep our promises to customers
**C — COST** — Efficiency funds our future

The order matters. Safety ALWAYS comes first. If you face a decision where safety and delivery conflict, safety wins. Every time.

**Quality: Your Customer is Next**

The next process downstream is YOUR customer. Never pass defects to them.
• Check your own work before passing
• Stop and fix, don't work around problems
• Ask: "Would I accept this?"

**Quality Standards We Follow:**
• **AISC** — American Institute of Steel Construction
• **ISO 9001** — Quality Management Systems

These aren't optional — they're our commitment to customers who trust Simpson Strong-Tie products to keep people safe in their homes and buildings.`,
          keyTakeaways: [
            "Priority order: Safety → Quality → Delivery → Cost",
            "Safety ALWAYS wins when priorities conflict",
            "The next process is YOUR customer — never pass defects",
            "We follow AISC and ISO 9001 quality standards",
          ],
          quiz: [
            {
              question: "What is the #1 priority in SQDC?",
              options: ["Quality", "Delivery", "Safety", "Cost"],
              correctIndex: 2,
              explanation:
                "Safety is ALWAYS #1 — nothing is worth getting hurt.",
            },
          ],
        },
        {
          id: "productivity-scanning",
          title: "Cost: Productivity & Transactional Discipline",
          content: `Every operation has a standard time. Meeting standards ensures predictable delivery and controlled costs.

**Why Standards Matter:**
• Predictable capacity planning
• Fair workload distribution
• Identifies improvement opportunities
• Controls labor costs
• Enables accurate customer quoting

**Scanning IS Productivity**

Scanning captures what was done, when, and by whom. This data drives everything.

**NO SCAN = NO DATA = NO VISIBILITY**

**Transactional Discipline Checklist:**
☐ Scan at START of operation
☐ Scan at COMPLETION of operation
☐ Scan the CORRECT quantity
☐ Scan to the CORRECT location
☐ NEVER batch scan at end of shift
☐ Report scanning issues immediately

**Impact of Poor Scanning:**
• **Late scanning** → Inaccurate WIP, bad schedules
• **Wrong quantity** → Inventory errors, shortages
• **Skipped scans** → Lost visibility, wrong costing

Accurate scanning IS the standard process. Discipline here enables everything else in SQDC.`,
          keyTakeaways: [
            "No scan = no data = no visibility",
            "Scan at start AND completion of every operation",
            "Never batch scan at end of shift",
            "Scanning discipline drives accurate planning and costing",
          ],
          quiz: [
            {
              question: "What happens if production is not scanned?",
              options: [
                "Nothing significant",
                "No data, no visibility in the system",
                "Automatic overtime approval",
                "Quality alert triggered",
              ],
              correctIndex: 1,
              explanation:
                "No scan = no data = no visibility. Without scans, planning, scheduling, and costing all break down.",
            },
          ],
        },
      ],
    },
    {
      id: "5s-methodology",
      title: "5S Methodology",
      subtitle: "Sort • Set in Order • Shine • Standardize • Sustain",
      description:
        "The foundation of workplace organization. A clean, organized workspace is a safe, efficient workspace.",
      durationMinutes: 15,
      lessons: [
        {
          id: "5s-foundation",
          title: "5S — Foundation of Excellence",
          content: `5S is a systematic methodology for workplace organization:

**1S — SORT (Seiri):** Remove unneeded items
**2S — SET IN ORDER (Seiton):** A place for everything, everything in its place
**3S — SHINE (Seiso):** Clean and inspect
**4S — STANDARDIZE (Seiketsu):** Make it visual
**5S — SUSTAIN (Shitsuke):** Build the habit

5S originates from the Toyota Production System (TPS) and is a foundational pillar of World Class Manufacturing (WCM). The Japanese terms remind us of the system's origins and its proven effectiveness across decades of manufacturing excellence.

**Why 5S Matters:**
• **SAFETY:** Clear paths, no trip hazards
• **QUALITY:** Right tools, right condition
• **EFFICIENCY:** No searching, no wasted motion
• **MORALE:** Pride in a clean workspace

**The 30-Second Rule:** Anyone should be able to find any item within 30 seconds — and return it just as fast.

**Team Leader 5S Duties:**
☐ Model 5S behavior every day
☐ Conduct weekly 5S audits
☐ Coach team members on standards
☐ Recognize and celebrate good 5S
☐ Address gaps immediately

5S isn't a one-time cleanup — it's a daily discipline. The best teams maintain 5S naturally because it's built into their standard work.`,
          keyTakeaways: [
            "5S: Sort, Set in Order, Shine, Standardize, Sustain",
            "30-Second Rule: find any item within 30 seconds",
            "Team Leaders model 5S and conduct weekly audits",
            "5S drives safety, quality, efficiency, and morale",
          ],
          quiz: [
            {
              question:
                "In the 5S methodology, what does the first 'S' (Sort) involve?",
              options: [
                "Cleaning the workspace",
                "Removing unnecessary items",
                "Labeling everything",
                "Creating visual standards",
              ],
              correctIndex: 1,
              explanation:
                "Sort = Remove unnecessary items from the work area. If you don't need it, get rid of it.",
            },
            {
              question: "What is the '30-Second Rule' in 5S?",
              options: [
                "Clean for 30 seconds every hour",
                "Find any item within 30 seconds",
                "Complete tasks in 30-second intervals",
                "Wait 30 seconds before starting work",
              ],
              correctIndex: 1,
              explanation:
                "The 30-Second Rule means anyone should find any item within 30 seconds — and return it just as fast.",
            },
          ],
        },
      ],
    },
    {
      id: "process-games",
      title: "Process Games",
      subtitle: "Learning by Doing",
      description:
        "Hands-on activities that demonstrate batch vs. one-piece flow concepts.",
      durationMinutes: 15,
      lessons: [
        {
          id: "batch-vs-flow",
          title: "Batch vs. One Piece Flow — The Envelope Game",
          content: `This exercise demonstrates the power of one-piece flow vs. batch production.

**Setup:**
• Teams of 4-5 people
• 10 envelopes per team
• Tasks: Fold, Insert, Seal, Stamp
• Stopwatch for timing

**Round 1: BATCH (Red)**
Each person completes ALL 10 of their tasks before passing to the next person. Record time to FIRST completed envelope.

**Round 2: ONE PIECE FLOW (Green)**
Each person does ONE task on ONE envelope, then passes it immediately. Record time to FIRST completed envelope.

**Discussion Questions:**
• Which method produced the FIRST envelope faster?
• What happens if Person 1 makes an error in batch mode?
• How much WIP (Work-In-Process) piles up in batch vs. flow?
• How does this relate to your work area?

**Key Learning:** One piece flow finds problems faster, reduces WIP, and delivers to customers sooner. The next process (your customer) gets product faster.

In batch mode, if there's a defect, you might make 10 defective pieces before anyone catches it. In one-piece flow, the defect is caught after just 1 piece.

**TPS Connection:** One-piece flow is a core element of Just-in-Time (JIT), one of the two pillars of the Toyota Production System. JIT means producing only what is needed, when it is needed, in the amount needed. Flow eliminates the three wastes Toyota identified: **Muda** (waste), **Muri** (overburden), and **Mura** (unevenness).`,
          keyTakeaways: [
            "One-piece flow delivers the first piece faster than batch",
            "Defects are caught sooner with one-piece flow",
            "WIP (inventory) is dramatically lower with flow",
            "The next process (your customer) gets product faster",
          ],
          quiz: [
            {
              question:
                "In 'One Piece Flow', what is passed to the next station?",
              options: [
                "The entire batch",
                "Half the batch",
                "One piece at a time",
                "Whatever is convenient",
              ],
              correctIndex: 2,
              explanation:
                "One piece at a time — this finds defects faster and reduces WIP.",
            },
          ],
        },
      ],
    },
    {
      id: "pre-post-flight",
      title: "Pre-Flight & Post-Flight",
      subtitle: "Start Strong • Finish Clean",
      description:
        "Just like pilots, we don't start or end without a checklist. Standard start-up and shutdown procedures.",
      durationMinutes: 15,
      lessons: [
        {
          id: "pre-flight",
          title: "Pre-Flight Checklist",
          content: `Pilots don't take off without checking their aircraft. We don't start production without verifying readiness.

**Universal Pre-Flight:**
☐ PPE complete and proper
☐ Work area organized (5S)
☐ Tools and equipment present
☐ Materials staged and verified
☐ Work orders reviewed
☐ Prior shift notes reviewed
☐ Scanner logged in

**Welding Pre-Flight:**
☐ Machine settings verified
☐ Gas flow rate checked
☐ Tips/nozzles in good condition
☐ Ventilation functioning

**Fabrication Pre-Flight:**
☐ Machine guards in place
☐ E-stops functional (test them!)
☐ Tooling secure
☐ Gauges ready

**NO-GO Items:** Missing PPE, damaged equipment, or safety hazards = STOP and resolve before starting. Do not begin work until all safety items are cleared.

**Scan Reminder:** Scan IN at the start of each operation. Accurate scanning = accurate data.`,
          keyTakeaways: [
            "Never start work without completing Pre-Flight",
            "Missing PPE or safety hazards are NO-GO items",
            "Scan IN at the start of every operation",
            "Pre-Flight protects you and your teammates",
          ],
        },
        {
          id: "post-flight",
          title: "Post-Flight & Shift Handoff",
          content: `How you leave your area determines how the next shift starts. Respect your teammates.

**Universal Post-Flight:**
☐ Production count verified and SCANNED
☐ Quality checks completed
☐ Work area cleaned (5S)
☐ Tools returned to proper locations
☐ Scrap disposed properly
☐ Equipment shut down per standard
☐ Handoff notes completed

**Effective Shift Handoff — Communicate:**
• **STATUS:** Where are you vs. schedule?
• **ISSUES:** What problems occurred?
• **EQUIPMENT:** Any concerns?
• **QUALITY:** Any defects or holds?
• **SAFETY:** Any incidents or hazards?

**Golden Rule:** Never leave the next shift guessing. If it's important, write it down.

Post-Flight and proper handoff is RESPECT in action — treating your teammates' time and success as important as your own. The incoming team leader should be able to read your notes and know exactly what's happening.`,
          keyTakeaways: [
            "Post-Flight = respect for your teammates on the next shift",
            "Verify scans, clean area, complete handoff notes",
            "Communicate: Status, Issues, Equipment, Quality, Safety",
            "Never leave the next shift guessing",
          ],
          quiz: [
            {
              question: "What is the purpose of Post-Flight?",
              options: [
                "To leave quickly",
                "To clean area and complete handoff for next shift",
                "To count overtime hours",
                "To report to management",
              ],
              correctIndex: 1,
              explanation:
                "Post-Flight ensures your area is clean and the next shift has all the information they need.",
            },
          ],
        },
      ],
    },
  ],
};
