import { Assessment } from "./types";

export const assessments: Assessment[] = [
  {
    courseId: "tier-1-foundation",
    title: "Tier 1 — Foundation Assessment",
    passingScore: 80,
    timeMinutes: 15,
    questions: [
      {
        question: "What does SQDC stand for?",
        options: ["Safety, Quality, Delivery, Cost", "Standards, Quality, Data, Control", "Safety, Quantity, Distribution, Compliance", "Systems, Quality, Demand, Cost"],
        correctIndex: 0,
        explanation: "SQDC = Safety, Quality, Delivery, Cost — in priority order.",
        variants: [
          { question: "Which of the following correctly lists the SQDC priorities?", options: ["Systems, Quality, Demand, Cost", "Safety, Quality, Delivery, Cost", "Standards, Quality, Data, Control", "Safety, Quantity, Distribution, Compliance"], correctIndex: 1 },
          { question: "The SQDC framework prioritizes which four areas?", options: ["Safety, Quantity, Distribution, Compliance", "Standards, Quality, Data, Control", "Systems, Quality, Demand, Cost", "Safety, Quality, Delivery, Cost"], correctIndex: 3 },
        ],
      },
      {
        question: "What is the #1 priority in SQDC?",
        options: ["Quality", "Delivery", "Safety", "Cost"],
        correctIndex: 2,
        explanation: "Safety is ALWAYS #1 — nothing is worth getting hurt.",
        variants: [
          { question: "In the SQDC framework, which element always comes first?", options: ["Cost", "Safety", "Quality", "Delivery"], correctIndex: 1 },
          { question: "Which SQDC priority is non-negotiable and always takes precedence?", options: ["Delivery", "Cost", "Quality", "Safety"], correctIndex: 3 },
        ],
      },
      {
        question: "What is a 'Good Catch'?",
        options: ["A quality defect found at inspection", "A hazard identified BEFORE causing an incident", "A production target achieved early", "A customer compliment"],
        correctIndex: 1,
        explanation: "A Good Catch identifies a hazard BEFORE it causes an incident.",
        variants: [
          { question: "A 'Good Catch' in safety refers to:", options: ["Exceeding production targets", "Identifying a hazard before it causes harm", "Catching a quality defect at final inspection", "Receiving positive customer feedback"], correctIndex: 1 },
          { question: "When a team member spots a frayed cord before anyone is hurt, this is called a:", options: ["Near miss report", "Good Catch", "Safety violation", "Quality escape"], correctIndex: 1 },
        ],
      },
      {
        question: "What does TRIR measure?",
        options: ["Total Returns and Income Rate", "Total Recordable Incident Rate", "Training Record Inspection Report", "Team Resource Investment Ratio"],
        correctIndex: 1,
        explanation: "TRIR = Total Recordable Incident Rate — the industry safety benchmark.",
        variants: [
          { question: "TRIR is the industry standard measurement for:", options: ["Production efficiency", "Workplace safety performance", "Employee satisfaction", "Equipment reliability"], correctIndex: 1 },
          { question: "Which metric do customers evaluate before awarding contracts related to safety?", options: ["OEE", "TRIR", "ROI", "MTBF"], correctIndex: 1 },
        ],
      },
      {
        question: "In the 5S methodology, what does the first 'S' (Sort) involve?",
        options: ["Cleaning the workspace", "Removing unnecessary items", "Labeling everything", "Creating visual standards"],
        correctIndex: 1,
        explanation: "Sort = Remove unnecessary items from the work area.",
        variants: [
          { question: "The 'Sort' step in 5S requires you to:", options: ["Label all tools and materials", "Eliminate items that aren't needed in the work area", "Clean every surface", "Create standard operating procedures"], correctIndex: 1 },
          { question: "What is the first action in a 5S implementation?", options: ["Shine — deep clean the area", "Sort — remove what doesn't belong", "Set — organize remaining items", "Sustain — build daily habits"], correctIndex: 1 },
        ],
      },
      {
        question: "What is the '30-Second Rule' in 5S?",
        options: ["Clean for 30 seconds every hour", "Find any item within 30 seconds", "Complete tasks in 30-second intervals", "Wait 30 seconds before starting work"],
        correctIndex: 1,
        explanation: "Anyone should find any item within 30 seconds — and return it just as fast.",
        variants: [
          { question: "According to the 5S 30-Second Rule, how quickly should anyone locate a tool?", options: ["10 seconds", "30 seconds", "60 seconds", "5 minutes"], correctIndex: 1 },
          { question: "The 5S standard for workplace organization states that any item should be found and returned within:", options: ["1 minute", "30 seconds", "5 minutes", "The end of the shift"], correctIndex: 1 },
        ],
      },
      {
        question: "What is 'transactional discipline' in scanning?",
        options: ["Scanning once per day", "Scan accurately, completely, and on time", "Only scanning finished products", "Scanning for inventory only"],
        correctIndex: 1,
        explanation: "Scan accurately, completely, and on time — every time.",
        variants: [
          { question: "Transactional discipline means scanning should be:", options: ["Done in batches at end of shift", "Accurate, complete, and timely", "Only for finished goods", "Optional for small runs"], correctIndex: 1 },
        ],
      },
      {
        question: "What happens if production is not scanned?",
        options: ["Nothing significant", "No data, no visibility in the system", "Automatic overtime approval", "Quality alert triggered"],
        correctIndex: 1,
        explanation: "No scan = no data = no visibility in the system.",
        variants: [
          { question: "When scanning is skipped during production, the result is:", options: ["Automatic alerts to management", "Complete loss of system visibility", "No real impact", "Overtime is approved"], correctIndex: 1 },
        ],
      },
      {
        question: "In 'One Piece Flow', what is passed to the next station?",
        options: ["The entire batch", "Half the batch", "One piece at a time", "Whatever is convenient"],
        correctIndex: 2,
        explanation: "One piece at a time — finds defects faster and reduces WIP.",
        variants: [
          { question: "One Piece Flow means each station passes forward:", options: ["A full batch before moving on", "One unit at a time immediately", "Half of the current batch", "Whatever the operator decides"], correctIndex: 1 },
        ],
      },
      {
        question: "What quality standards does Simpson Strong-Tie follow?",
        options: ["FDA and EPA", "AISC and ISO", "OSHA only", "No specific standards"],
        correctIndex: 1,
        explanation: "AISC (steel construction) and ISO 9001 (quality management).",
        variants: [
          { question: "Simpson Strong-Tie's quality management is governed by which standards?", options: ["OSHA regulations only", "AISC and ISO 9001", "FDA guidelines", "No formal standards"], correctIndex: 1 },
        ],
      },
      {
        question: "The Safety Cross uses colors to indicate daily status. What does GREEN mean?",
        options: ["Good Catch reported", "Safe day - no incidents", "Incident occurred", "Equipment maintenance"],
        correctIndex: 1,
        explanation: "Green = Safe day with no incidents.",
        variants: [
          { question: "On the Safety Cross calendar, a green day indicates:", options: ["A Good Catch was filed", "Zero incidents occurred", "Equipment was serviced", "An injury was reported"], correctIndex: 1 },
        ],
      },
      {
        question: "What should happen if Pre-Flight reveals a safety hazard?",
        options: ["Document and continue", "STOP and resolve before starting", "Report at end of shift", "Ignore if minor"],
        correctIndex: 1,
        explanation: "STOP and resolve — safety hazards are NO-GO items.",
        variants: [
          { question: "During Pre-Flight, you discover a damaged machine guard. You should:", options: ["Note it and continue production", "Stop work and resolve the hazard immediately", "Report it at the next Tier 1 meeting", "Ignore it if production is behind schedule"], correctIndex: 1 },
        ],
      },
      {
        question: "In the 1-10-100 rule, catching a defect at the customer costs:",
        options: ["$1", "$10", "$100 or more", "Nothing if under warranty"],
        correctIndex: 2,
        explanation: "$100+ including returns, rework, and lost trust.",
        variants: [
          { question: "According to the 1-10-100 rule, the most expensive place to catch a defect is:", options: ["During prevention planning", "At in-house inspection", "After it reaches the customer", "During raw material intake"], correctIndex: 2 },
        ],
      },
      {
        question: "What is the purpose of Post-Flight?",
        options: ["To leave quickly", "To clean area and complete handoff for next shift", "To count overtime hours", "To report to management"],
        correctIndex: 1,
        explanation: "Clean area, verify scans, complete handoff notes for the next shift.",
        variants: [
          { question: "Post-Flight procedures exist primarily to:", options: ["Speed up shift departure", "Ensure a clean handoff to the incoming team", "Calculate overtime totals", "File reports with management"], correctIndex: 1 },
        ],
      },
      {
        question: "The next downstream process is considered your:",
        options: ["Competition", "Customer", "Supervisor", "Inventory"],
        correctIndex: 1,
        explanation: "Your customer — never pass defects to them.",
        variants: [
          { question: "In lean manufacturing, the person or process receiving your work is your:", options: ["Supervisor", "Internal customer", "Competitor", "Inventory buffer"], correctIndex: 1 },
        ],
      },
    ],
  },
  {
    courseId: "tier-2-developing",
    title: "Tier 2 — Developing Assessment",
    passingScore: 80,
    timeMinutes: 15,
    questions: [
      {
        question: "In the '5 Whys' method, what are you trying to find?",
        options: ["Who made the mistake", "The root cause of a problem", "Five different solutions", "Management approval"],
        correctIndex: 1,
        explanation: "5 Whys finds the root cause, not blame.",
        variants: [
          { question: "The purpose of asking 'Why?' repeatedly in root cause analysis is to:", options: ["Assign blame to the responsible person", "Dig past symptoms to the true root cause", "Generate five possible solutions", "Get management to approve a fix"], correctIndex: 1 },
        ],
      },
      {
        question: "The '1-10-100' rule suggests that prevention costs:",
        options: ["The most", "The least", "The same as correction", "More than customer returns"],
        correctIndex: 1,
        explanation: "Prevention costs $1 vs $10 (in-house) vs $100+ (customer).",
        variants: [
          { question: "According to the 1-10-100 quality cost model, which stage is cheapest?", options: ["External failure correction", "Prevention", "Internal rework", "Customer warranty claims"], correctIndex: 1 },
        ],
      },
      {
        question: "What is 'Cost of Poor Quality' (COPQ)?",
        options: ["Training expenses", "All costs from defects: scrap, rework, returns", "Equipment maintenance", "Raw material costs"],
        correctIndex: 1,
        explanation: "COPQ = all costs from defects and failures.",
        variants: [
          { question: "COPQ includes which of the following?", options: ["Only visible scrap costs", "All costs resulting from doing things wrong: scrap, rework, returns, lost reputation", "Only equipment repair bills", "Training and onboarding expenses"], correctIndex: 1 },
        ],
      },
      {
        question: "In the coaching model 'Tell-Show-Do-Review', what comes after 'Show'?",
        options: ["Tell again", "Do (let them practice)", "Review immediately", "Document"],
        correctIndex: 1,
        explanation: "Do = let them practice while you observe.",
        variants: [
          { question: "After demonstrating a task to a team member (Show), the next coaching step is:", options: ["Explain it again verbally", "Let them try it while you observe", "Give them written feedback", "Move on to the next task"], correctIndex: 1 },
        ],
      },
      {
        question: "What score indicates 'Fully Sustained' in a 5S audit?",
        options: ["1", "2", "3", "4"],
        correctIndex: 3,
        explanation: "4 = Fully Sustained, 0 = Not implemented.",
        variants: [
          { question: "On the 5S audit scale (0-4), the highest rating means:", options: ["Just starting implementation", "Partially implemented", "Mostly sustained", "Fully sustained without reminders"], correctIndex: 3 },
        ],
      },
      {
        question: "When conducting 5 Whys, you should focus on:",
        options: ["Blaming individuals", "Process and system issues", "Quick fixes", "Management decisions"],
        correctIndex: 1,
        explanation: "Focus on process — bad systems beat good people.",
        variants: [
          { question: "Root cause analysis should target:", options: ["Individual mistakes", "System and process failures", "Temporary workarounds", "Who to discipline"], correctIndex: 1 },
        ],
      },
      {
        question: "How often should 5S audits be conducted?",
        options: ["Monthly", "Weekly", "Annually", "Only when problems occur"],
        correctIndex: 1,
        explanation: "Weekly audits sustain 5S discipline.",
        variants: [
          { question: "To prevent 5S standards from drifting, audits should happen:", options: ["Once a year", "Every week", "Only after complaints", "Every quarter"], correctIndex: 1 },
        ],
      },
      {
        question: "What is the primary benefit of investing in prevention?",
        options: ["Higher inspection costs", "Reduced failure costs", "More paperwork", "Slower production"],
        correctIndex: 1,
        explanation: "Prevention investment reduces failure costs significantly.",
        variants: [
          { question: "Spending more on prevention (training, standards, planning) results in:", options: ["Increased bureaucracy", "Significantly lower failure and rework costs", "Slower throughput", "Higher material costs"], correctIndex: 1 },
        ],
      },
      {
        question: "When developing team members, you should:",
        options: ["Do the work yourself", "Give stretch responsibilities", "Avoid feedback", "Wait for HR to train them"],
        correctIndex: 1,
        explanation: "Stretch assignments develop capabilities.",
        variants: [
          { question: "The best way to develop future leaders on your team is to:", options: ["Handle all difficult tasks yourself", "Assign challenging responsibilities that push their skills", "Wait for formal HR training programs", "Avoid giving critical feedback"], correctIndex: 1 },
        ],
      },
      {
        question: "Quality costs are divided into Prevention, Appraisal, and:",
        options: ["Production", "Failure", "Labor", "Material"],
        correctIndex: 1,
        explanation: "Prevention + Appraisal + Failure = Total Quality Costs.",
        variants: [
          { question: "The three categories of total quality cost are Prevention, Appraisal, and:", options: ["Labor", "Material", "Failure", "Overhead"], correctIndex: 2 },
        ],
      },
      {
        question: "A team member shows initiative and helps others. This indicates potential for:",
        options: ["Termination", "Future leadership", "Transfer", "Demotion"],
        correctIndex: 1,
        explanation: "Initiative and teamwork indicate leadership potential.",
        variants: [
          { question: "Which behavior best signals leadership potential in a team member?", options: ["Doing only their assigned tasks", "Taking initiative and supporting teammates", "Avoiding difficult conversations", "Working independently without collaboration"], correctIndex: 1 },
        ],
      },
      {
        question: "In root cause analysis, stopping at the first answer is:",
        options: ["Recommended", "A common pitfall", "Required by ISO", "Best practice"],
        correctIndex: 1,
        explanation: "Stopping early = treating symptoms, not causes.",
        variants: [
          { question: "Accepting the first 'why' answer without digging deeper is:", options: ["Efficient problem-solving", "A frequent mistake that only fixes symptoms", "Standard ISO procedure", "The recommended approach for simple issues"], correctIndex: 1 },
        ],
      },
      {
        question: "The purpose of visual management in 5S is to:",
        options: ["Decorate the workspace", "Make standards clear without words", "Hide problems", "Reduce lighting costs"],
        correctIndex: 1,
        explanation: "Visual management makes standards obvious at a glance.",
        variants: [
          { question: "Visual standards in 5S are designed so that:", options: ["The workspace looks attractive", "Anyone can see the correct state at a glance without reading instructions", "Problems are less visible", "Lighting requirements are reduced"], correctIndex: 1 },
        ],
      },
      {
        question: "Coaching feedback should be:",
        options: ["Vague and general", "Specific and behavior-focused", "Only positive", "Given annually"],
        correctIndex: 1,
        explanation: "Specific, behavior-focused feedback drives improvement.",
        variants: [
          { question: "Effective coaching feedback is:", options: ["General praise like 'good job'", "Focused on specific observable behaviors", "Saved up for annual reviews", "Always positive to avoid conflict"], correctIndex: 1 },
        ],
      },
      {
        question: "Failure costs include scrap, rework, and:",
        options: ["Training", "Customer returns and warranty claims", "Equipment purchases", "Safety gear"],
        correctIndex: 1,
        explanation: "Returns and warranty claims are major failure costs.",
        variants: [
          { question: "Beyond scrap and rework, which of these is also a failure cost?", options: ["Preventive training programs", "Warranty claims and customer returns", "New equipment investments", "PPE purchases"], correctIndex: 1 },
        ],
      },
    ],
  },
  {
    courseId: "tier-3-advanced",
    title: "Tier 3 — Advanced Assessment",
    passingScore: 80,
    timeMinutes: 15,
    questions: [
      {
        question: "What percentage of change initiatives typically fail?",
        options: ["30%", "50%", "70%", "90%"],
        correctIndex: 2,
        explanation: "70% of change initiatives fail — leadership matters.",
        variants: [
          { question: "Research shows that roughly how many organizational change efforts do not succeed?", options: ["3 out of 10", "5 out of 10", "7 out of 10", "9 out of 10"], correctIndex: 2 },
        ],
      },
      {
        question: "In Kaizen, what does 'gemba' mean?",
        options: ["The office", "The place where work happens", "The conference room", "Management"],
        correctIndex: 1,
        explanation: "Gemba = the actual place where work happens.",
        variants: [
          { question: "'Go to Gemba' means:", options: ["Schedule a meeting in the conference room", "Visit the actual location where work is performed", "Review reports in the office", "Consult with upper management"], correctIndex: 1 },
        ],
      },
      {
        question: "The PDCA cycle stands for:",
        options: ["Plan, Do, Check, Act", "Prepare, Deliver, Confirm, Adjust", "Process, Data, Control, Analyze", "Plan, Design, Create, Approve"],
        correctIndex: 0,
        explanation: "Plan, Do, Check, Act — continuous improvement cycle.",
        variants: [
          { question: "The continuous improvement cycle used in Kaizen is:", options: ["Define, Measure, Analyze, Improve", "Plan, Do, Check, Act", "Observe, Orient, Decide, Act", "Identify, Plan, Execute, Monitor"], correctIndex: 1 },
        ],
      },
      {
        question: "In change management, what must be communicated constantly?",
        options: ["The schedule", "The budget", "The 'why' (vision)", "The complaints"],
        correctIndex: 2,
        explanation: "The 'why' must be communicated constantly.",
        variants: [
          { question: "People need to hear this 7+ times during a change initiative:", options: ["The detailed project timeline", "The reason and vision behind the change", "The cost breakdown", "The list of complaints from others"], correctIndex: 1 },
        ],
      },
      {
        question: "A leader's lasting value is measured by:",
        options: ["Personal achievements", "Succession - who they developed", "Years of service", "Salary level"],
        correctIndex: 1,
        explanation: "Succession — the leaders you develop are your legacy.",
        variants: [
          { question: "What defines a leader's true legacy?", options: ["Their personal awards and accolades", "The quality of leaders they developed to succeed them", "How long they held the position", "Their compensation level"], correctIndex: 1 },
        ],
      },
      {
        question: "What is the first stage of the 'Change Curve'?",
        options: ["Commitment", "Denial", "Exploration", "Acceptance"],
        correctIndex: 1,
        explanation: "Denial is first, then Resistance, Exploration, Commitment.",
        variants: [
          { question: "When change is first announced, most people's initial reaction is:", options: ["Immediate commitment", "Denial — 'This won't affect me'", "Eager exploration", "Full acceptance"], correctIndex: 1 },
        ],
      },
      {
        question: "Small improvements daily beat:",
        options: ["No improvements", "Big projects annually", "Team meetings", "Documentation"],
        correctIndex: 1,
        explanation: "Daily small improvements compound over time.",
        variants: [
          { question: "The Kaizen philosophy teaches that consistent small changes are more effective than:", options: ["Doing nothing at all", "Large annual improvement projects", "Regular team huddles", "Detailed documentation"], correctIndex: 1 },
        ],
      },
      {
        question: "Strategic alignment means connecting daily work to:",
        options: ["Personal goals", "Company strategy and customer outcomes", "Social media", "Competitor actions"],
        correctIndex: 1,
        explanation: "Connect daily work to strategy and customer outcomes.",
        variants: [
          { question: "A strategically aligned team leader connects their team's daily tasks to:", options: ["Individual career ambitions", "The company's mission and what customers need", "Industry trends on social media", "What competitors are doing"], correctIndex: 1 },
        ],
      },
      {
        question: "When mentoring, you should:",
        options: ["Rescue them immediately when struggling", "Let them struggle before rescuing", "Never share your failures", "Avoid stretch assignments"],
        correctIndex: 1,
        explanation: "Let them struggle to build capability, then coach.",
        variants: [
          { question: "Effective mentoring means:", options: ["Jumping in immediately to fix their mistakes", "Allowing some struggle to build capability before coaching", "Only sharing your successes, not failures", "Keeping them in their comfort zone"], correctIndex: 1 },
        ],
      },
      {
        question: "The best Kaizen ideas come from:",
        options: ["Consultants", "People doing the work", "Executives only", "Competitors"],
        correctIndex: 1,
        explanation: "People doing the work know the problems best.",
        variants: [
          { question: "Who is the best source of improvement ideas on the production floor?", options: ["External consultants", "The operators and workers doing the job daily", "Senior executives", "Industry benchmarking"], correctIndex: 1 },
        ],
      },
      {
        question: "Leading a Kaizen event requires:",
        options: ["Working alone", "Clear scope, right people, management support", "Unlimited time", "No follow-up"],
        correctIndex: 1,
        explanation: "Clear scope, right people, and management support.",
        variants: [
          { question: "A successful Kaizen event depends on:", options: ["One person driving all changes alone", "Well-defined scope, the right team members, and leadership backing", "An open-ended timeline with no deadlines", "Completing the event with no follow-up needed"], correctIndex: 1 },
        ],
      },
      {
        question: "When someone resists change, you should:",
        options: ["Ignore them", "Acknowledge concerns honestly", "Force compliance", "Terminate them"],
        correctIndex: 1,
        explanation: "Acknowledge concerns — resistance often has valid roots.",
        variants: [
          { question: "The best response to a team member pushing back on a change is to:", options: ["Dismiss their concerns and move on", "Listen, acknowledge their concerns, and address them honestly", "Mandate compliance with no discussion", "Remove them from the team"], correctIndex: 1 },
        ],
      },
      {
        question: "Your leadership legacy is defined by:",
        options: ["Your title", "The leaders you develop", "Your office size", "Your parking spot"],
        correctIndex: 1,
        explanation: "The leaders you develop define your legacy.",
        variants: [
          { question: "Years from now, your impact as a leader will be measured by:", options: ["The title you held", "The people you developed who went on to lead", "The size of your responsibilities", "Your seniority in the organization"], correctIndex: 1 },
        ],
      },
      {
        question: "Celebrating small wins during change is:",
        options: ["Unnecessary", "Critical for sustaining momentum", "Unprofessional", "Only for children"],
        correctIndex: 1,
        explanation: "Small wins maintain momentum and prove progress.",
        variants: [
          { question: "Recognizing incremental progress during a change effort is:", options: ["A waste of time", "Essential for maintaining momentum and proving the change works", "Inappropriate in a professional setting", "Only necessary for new employees"], correctIndex: 1 },
        ],
      },
      {
        question: "Advanced leaders 'create standards' rather than just:",
        options: ["Ignoring them", "Meeting or raising them", "Documenting them", "Complaining about them"],
        correctIndex: 1,
        explanation: "Advanced leaders create standards, not just follow them.",
        variants: [
          { question: "What separates advanced leaders from average ones regarding standards?", options: ["Advanced leaders ignore outdated standards", "Advanced leaders establish new standards instead of only following existing ones", "Advanced leaders focus on documentation over action", "Advanced leaders avoid accountability for standards"], correctIndex: 1 },
        ],
      },
    ],
  },
];
