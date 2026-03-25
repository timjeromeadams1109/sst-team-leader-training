"use client";

import { use } from "react";
import Link from "next/link";
import { getDocument } from "@/data/documents";

function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 bg-sst-orange hover:bg-sst-orange-dark text-white font-semibold px-6 py-2.5 rounded-lg transition-colors print:hidden"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
      Print / Save PDF
    </button>
  );
}

function DocHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="border-b-2 border-sst-dark pb-3 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-sst-orange tracking-widest uppercase">Simpson Strong-Tie</div>
          <h1 className="text-xl font-bold mt-1">{title}</h1>
          {subtitle && <p className="text-xs text-sst-gray mt-0.5">{subtitle}</p>}
        </div>
        <div className="text-right text-xs text-sst-gray">
          <div>Date: _______________</div>
          <div className="mt-1">Shift: ☐ 1st ☐ 2nd ☐ 3rd</div>
        </div>
      </div>
      <div className="flex gap-6 mt-2 text-xs text-sst-gray">
        <span>Team Leader: ________________________</span>
        <span>Area: ________________________</span>
      </div>
    </div>
  );
}

function CheckRow({ text, bold }: { text: string; bold?: boolean }) {
  return (
    <div className="flex items-start gap-2 py-1.5 border-b border-sst-border/20">
      <span className="w-4 h-4 border border-sst-charcoal rounded-sm flex-shrink-0 mt-0.5" />
      <span className={`text-sm ${bold ? "font-semibold" : ""}`}>{text}</span>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="font-bold text-sm bg-sst-light-gray px-3 py-2 rounded mt-4 mb-2 uppercase tracking-wide">
      {title}
    </h2>
  );
}

function TableHeader({ cols }: { cols: string[] }) {
  return (
    <div className="grid gap-0 bg-sst-dark text-white text-xs font-bold" style={{ gridTemplateColumns: cols.map(() => "1fr").join(" ") }}>
      {cols.map((c) => (
        <div key={c} className="px-2 py-2 border-r border-sst-charcoal last:border-r-0">{c}</div>
      ))}
    </div>
  );
}

function TableRow({ cols }: { cols: number }) {
  return (
    <div className="grid gap-0 border-b border-sst-border/30" style={{ gridTemplateColumns: Array(cols).fill("1fr").join(" ") }}>
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} className="px-2 py-3 border-r border-sst-border/20 last:border-r-0 min-h-[2rem]" />
      ))}
    </div>
  );
}

function PreFlightChecklist() {
  return (
    <div>
      <DocHeader title="Pre-Flight Checklist" subtitle="Complete before starting production — NO-GO items must be resolved" />
      <SectionTitle title="Universal Pre-Flight" />
      <CheckRow text="PPE complete and proper (safety glasses, gloves, steel toes, hearing protection)" />
      <CheckRow text="Work area organized (5S — clear paths, tools in place)" />
      <CheckRow text="Tools and equipment present and in working condition" />
      <CheckRow text="Materials staged and verified against work order" />
      <CheckRow text="Work orders reviewed and understood" />
      <CheckRow text="Prior shift handoff notes reviewed" />
      <CheckRow text="Scanner logged in and functioning" />
      <SectionTitle title="Welding Pre-Flight" />
      <CheckRow text="Machine settings verified per WPS" />
      <CheckRow text="Gas flow rate checked" />
      <CheckRow text="Tips/nozzles in good condition" />
      <CheckRow text="Ventilation functioning properly" />
      <SectionTitle title="Fabrication Pre-Flight" />
      <CheckRow text="Machine guards in place" />
      <CheckRow text="E-stops functional (TEST them)" />
      <CheckRow text="Tooling secure and correct for job" />
      <CheckRow text="Gauges calibrated and ready" />
      <div className="mt-4 bg-sst-error/10 border border-sst-error/30 rounded p-3 text-sm">
        <strong className="text-sst-error">NO-GO:</strong> Missing PPE, damaged equipment, or safety hazards = <strong>STOP and resolve before starting.</strong>
      </div>
      <div className="mt-4 text-xs text-sst-gray">
        <div className="flex gap-8">
          <span>Completed by: ________________________</span>
          <span>Time: ________</span>
          <span>All items clear: ☐ YES ☐ NO</span>
        </div>
      </div>
    </div>
  );
}

function PostFlightChecklist() {
  return (
    <div>
      <DocHeader title="Post-Flight Checklist" subtitle="Complete before leaving — Respect the next shift" />
      <SectionTitle title="Production Closeout" />
      <CheckRow text="All production counts verified" />
      <CheckRow text="All production SCANNED (no batch scanning)" />
      <CheckRow text="Quality checks completed and documented" />
      <CheckRow text="Scrap counted, documented, and disposed" />
      <SectionTitle title="Area Closeout (5S)" />
      <CheckRow text="Work area cleaned" />
      <CheckRow text="Tools returned to designated locations" />
      <CheckRow text="Materials properly stored or staged" />
      <CheckRow text="Scrap bins emptied if full" />
      <CheckRow text="Equipment shut down per standard" />
      <SectionTitle title="Handoff Preparation" />
      <CheckRow text="Shift handoff notes completed (use Passdown form)" />
      <CheckRow text="Open issues documented with status" />
      <CheckRow text="Incoming Team Leader briefed (face-to-face if possible)" />
      <div className="mt-4 bg-sst-orange/10 border border-sst-orange/30 rounded p-3 text-sm">
        <strong>Golden Rule:</strong> Never leave the next shift guessing. If it&apos;s important, write it down.
      </div>
      <div className="mt-4 text-xs text-sst-gray flex gap-8">
        <span>Completed by: ________________________</span>
        <span>Time: ________</span>
      </div>
    </div>
  );
}

function ShiftPassdown() {
  return (
    <div>
      <DocHeader title="Shift Passdown Communication" subtitle="Complete at end of shift — Leave nothing to guesswork" />
      <SectionTitle title="S — Status (Where are we vs. schedule?)" />
      <div className="border border-sst-border/30 rounded p-3 min-h-[4rem] mb-2">
        <div className="text-xs text-sst-gray">Production target: ________ Actual: ________ Variance: ________</div>
        <div className="text-xs text-sst-gray mt-6">Notes:</div>
      </div>
      <SectionTitle title="I — Issues (Problems that occurred)" />
      <div className="border border-sst-border/30 rounded p-3 min-h-[4rem] mb-2" />
      <SectionTitle title="E — Equipment (Any concerns?)" />
      <div className="border border-sst-border/30 rounded p-3 min-h-[4rem] mb-2" />
      <SectionTitle title="Q — Quality (Defects, holds, or concerns?)" />
      <div className="border border-sst-border/30 rounded p-3 min-h-[4rem] mb-2" />
      <SectionTitle title="S — Safety (Incidents, hazards, or Good Catches?)" />
      <div className="border border-sst-border/30 rounded p-3 min-h-[4rem] mb-2" />
      <SectionTitle title="Action Items Carried Forward" />
      <TableHeader cols={["Item", "Owner", "Due", "Status"]} />
      {Array.from({ length: 5 }).map((_, i) => <TableRow key={i} cols={4} />)}
      <div className="mt-4 text-xs text-sst-gray flex gap-8">
        <span>Outgoing TL: ________________________</span>
        <span>Incoming TL: ________________________</span>
        <span>Time: ________</span>
      </div>
    </div>
  );
}

function Tier1MeetingScript() {
  return (
    <div>
      <DocHeader title="Tier 1 Meeting Script" subtitle="10-15 minutes — At the board — SQDCPE sequence" />
      <div className="space-y-3">
        {[
          { time: "0-2 min", topic: "S — Safety", prompts: ["Any safety concerns?", "Good Catches to report?", "Update the Safety Cross"] },
          { time: "2-4 min", topic: "Q — Quality", prompts: ["Quality issues from last shift?", "First piece inspection results?", "Any NCRs or holds?"] },
          { time: "4-6 min", topic: "D — Delivery", prompts: ["Where are we vs. target?", "Any production gaps? Root cause?", "Schedule changes today?"] },
          { time: "6-8 min", topic: "C — Cost / P — People", prompts: ["Scrap report?", "Attendance today?", "Training needs?", "Recognition?"] },
          { time: "8-10 min", topic: "E — Environment / Actions", prompts: ["Open items from yesterday — status?", "New action items — who owns, due when?", "Any escalations needed?"] },
          { time: "10 min", topic: "Close", prompts: ["Any questions?", "Let's have a safe, productive shift.", "Update: ☐ Board updated ☐ Actions assigned ☐ Ended on time"] },
        ].map((s) => (
          <div key={s.topic} className="flex gap-3 border-b border-sst-border/20 pb-3">
            <div className="w-16 flex-shrink-0 text-xs font-bold text-sst-orange">{s.time}</div>
            <div>
              <div className="font-bold text-sm">{s.topic}</div>
              <ul className="mt-1">
                {s.prompts.map((p) => (
                  <li key={p} className="flex items-start gap-1.5 text-xs text-sst-charcoal">
                    <span className="text-sst-gray mt-0.5">•</span>{p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 bg-sst-light-gray rounded p-3 text-xs">
        <strong>Reminders:</strong> Board must be updated BEFORE the meeting. Team members participate — don&apos;t lecture. Action items need owners + due dates. Never skip the meeting.
      </div>
    </div>
  );
}

function LeaderStandardWork() {
  return (
    <div>
      <DocHeader title="Leader Standard Work" subtitle="Team Leader daily routine — consistency across every shift" />
      <SectionTitle title="Shift Start (First 30 Minutes)" />
      <CheckRow text="Review prior shift handoff notes" bold />
      <CheckRow text="Walk area — safety check (PPE, hazards, 5S)" />
      <CheckRow text="Check equipment status and open maintenance tickets" />
      <CheckRow text="Review production schedule and material availability" />
      <CheckRow text="Conduct Tier 1 meeting (10-15 min)" bold />
      <CheckRow text="Assign work and confirm understanding" />
      <SectionTitle title="Hourly Checks" />
      <TableHeader cols={["Hour", "Production vs Target", "Quality", "Safety", "Equipment", "Notes"]} />
      {Array.from({ length: 8 }).map((_, i) => <TableRow key={i} cols={6} />)}
      <SectionTitle title="Shift End (Last 30 Minutes)" />
      <CheckRow text="Verify all production is scanned" bold />
      <CheckRow text="Review quality checks for the shift" />
      <CheckRow text="Update Tier 1 board with final numbers" />
      <CheckRow text="Complete shift passdown notes" bold />
      <CheckRow text="Clean and organize area (5S)" />
      <CheckRow text="Brief incoming Team Leader face-to-face" />
    </div>
  );
}

function SafetyCross() {
  return (
    <div>
      <DocHeader title="Safety Cross — Monthly Calendar" subtitle="Update DAILY at shift start. Goal: All-green month." />
      <div className="flex gap-4 mb-4 text-xs">
        <span className="flex items-center gap-1"><span className="w-4 h-4 bg-green-500 rounded" /> Safe Day</span>
        <span className="flex items-center gap-1"><span className="w-4 h-4 bg-yellow-400 rounded" /> Good Catch</span>
        <span className="flex items-center gap-1"><span className="w-4 h-4 bg-red-500 rounded" /> Incident</span>
      </div>
      <div className="text-center mb-2 font-bold">Month: _____________ Year: _____________</div>
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center text-xs font-bold bg-sst-dark text-white py-1">{d}</div>
        ))}
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="border border-sst-border/30 h-14 p-1 text-xs text-sst-gray">{i < 31 ? i + 1 : ""}</div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
        <div className="bg-sst-light-gray rounded p-3"><div className="font-bold text-lg">___</div><div className="text-xs text-sst-gray">Safe Days</div></div>
        <div className="bg-sst-light-gray rounded p-3"><div className="font-bold text-lg">___</div><div className="text-xs text-sst-gray">Good Catches</div></div>
        <div className="bg-sst-light-gray rounded p-3"><div className="font-bold text-lg">___</div><div className="text-xs text-sst-gray">Incidents</div></div>
      </div>
    </div>
  );
}

function GoodCatchReport() {
  return (
    <div>
      <DocHeader title="Good Catch Report" subtitle="STOP → REPORT → DOCUMENT → RECOGNIZE" />
      <div className="space-y-4">
        <div><div className="text-xs font-bold mb-1">Reported By:</div><div className="border-b border-sst-charcoal w-full" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><div className="text-xs font-bold mb-1">Date:</div><div className="border-b border-sst-charcoal" /></div>
          <div><div className="text-xs font-bold mb-1">Time:</div><div className="border-b border-sst-charcoal" /></div>
        </div>
        <div><div className="text-xs font-bold mb-1">Location / Area:</div><div className="border-b border-sst-charcoal" /></div>
        <div>
          <div className="text-xs font-bold mb-1">Hazard Type:</div>
          <div className="flex flex-wrap gap-3 text-xs">
            {["Slip/Trip/Fall", "Electrical", "Machine/Equipment", "Ergonomic", "Chemical", "PPE", "Housekeeping", "Other"].map((t) => (
              <span key={t} className="flex items-center gap-1"><span className="w-3.5 h-3.5 border border-sst-charcoal rounded-sm" /> {t}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold mb-1">Describe the Hazard (What did you see?):</div>
          <div className="border border-sst-border/30 rounded min-h-[5rem] p-2" />
        </div>
        <div>
          <div className="text-xs font-bold mb-1">Immediate Action Taken:</div>
          <div className="border border-sst-border/30 rounded min-h-[3rem] p-2" />
        </div>
        <div>
          <div className="text-xs font-bold mb-1">Recommended Corrective Action:</div>
          <div className="border border-sst-border/30 rounded min-h-[3rem] p-2" />
        </div>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>Team Leader: ________________________</div>
          <div>Supervisor: ________________________</div>
        </div>
      </div>
      <div className="mt-4 bg-sst-success/10 border border-sst-success/30 rounded p-3 text-sm text-center">
        <strong>Thank you for keeping our team safe!</strong> Every Good Catch is a potential injury PREVENTED.
      </div>
    </div>
  );
}

function ScrapLog() {
  return (
    <div>
      <DocHeader title="Daily Scrap Log" subtitle="Track all scrap by part, reason, and cost impact" />
      <TableHeader cols={["#", "Part / Work Order", "Qty", "Reason Code", "Description", "Est. Cost", "Initials"]} />
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="grid grid-cols-7 gap-0 border-b border-sst-border/30">
          <div className="px-2 py-2.5 text-xs text-sst-gray border-r border-sst-border/20">{i + 1}</div>
          {Array.from({ length: 6 }).map((_, j) => (
            <div key={j} className="px-2 py-2.5 border-r border-sst-border/20 last:border-r-0" />
          ))}
        </div>
      ))}
      <div className="mt-3">
        <div className="text-xs font-bold mb-2">Reason Codes:</div>
        <div className="grid grid-cols-3 gap-1 text-xs text-sst-gray">
          <span>M = Material defect</span>
          <span>S = Setup error</span>
          <span>O = Operator error</span>
          <span>E = Equipment failure</span>
          <span>D = Design/drawing issue</span>
          <span>T = Tooling wear</span>
        </div>
      </div>
      <div className="mt-4 flex justify-between text-xs text-sst-gray border-t border-sst-border/30 pt-3">
        <span>Total Scrap Pieces: ________</span>
        <span>Total Est. Cost: $________</span>
        <span>Reviewed by Supervisor: ☐</span>
      </div>
    </div>
  );
}

function NCRForm() {
  return (
    <div>
      <DocHeader title="Non-Conformance Report (NCR)" subtitle="STOP → SEGREGATE → DOCUMENT → NOTIFY → WAIT" />
      <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
        <div>NCR #: ____________</div>
        <div>Priority: ☐ Critical ☐ Major ☐ Minor</div>
      </div>
      <SectionTitle title="Non-Conformance Details" />
      <div className="space-y-3 text-xs">
        <div className="grid grid-cols-2 gap-4">
          <div>Part #: ________________________</div>
          <div>Work Order: ________________________</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>Qty Affected: ________</div>
          <div>Qty Segregated: ________</div>
        </div>
        <div>
          <div className="font-bold mb-1">Description of Non-Conformance:</div>
          <div className="border border-sst-border/30 rounded min-h-[4rem] p-2" />
        </div>
        <div>
          <div className="font-bold mb-1">Specification Requirement:</div>
          <div className="border border-sst-border/30 rounded min-h-[2rem] p-2" />
        </div>
        <div>
          <div className="font-bold mb-1">Actual Condition Found:</div>
          <div className="border border-sst-border/30 rounded min-h-[2rem] p-2" />
        </div>
      </div>
      <SectionTitle title="Disposition (Quality Use Only)" />
      <div className="flex gap-4 text-xs mb-3">
        {["Use As-Is", "Rework", "Scrap", "Return to Vendor", "Sort"].map((d) => (
          <span key={d} className="flex items-center gap-1"><span className="w-3.5 h-3.5 border border-sst-charcoal rounded-sm" /> {d}</span>
        ))}
      </div>
      <div className="text-xs">
        <div className="font-bold mb-1">Disposition Notes:</div>
        <div className="border border-sst-border/30 rounded min-h-[3rem] p-2" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
        <div>Initiated by: ________________</div>
        <div>Quality: ________________</div>
        <div>Closed date: ________________</div>
      </div>
    </div>
  );
}

function FiveSAudit() {
  return (
    <div>
      <DocHeader title="5S Audit Checklist" subtitle="Weekly audit — Score 0-4 per item" />
      <div className="text-xs mb-3 flex gap-4">
        <span><strong>0</strong>=Not implemented</span>
        <span><strong>1</strong>=Just starting</span>
        <span><strong>2</strong>=Partially</span>
        <span><strong>3</strong>=Mostly sustained</span>
        <span><strong>4</strong>=Fully sustained</span>
      </div>
      {[
        { s: "1S — SORT", items: ["Unnecessary items removed from work area", "Only needed tools and materials present", "Red-tag process used for questionable items", "No personal items in production area", "Excess inventory removed"] },
        { s: "2S — SET IN ORDER", items: ["Every item has a designated location", "Locations clearly marked/labeled", "Frequently used items within arm's reach", "Shadow boards or outlines for tools", "Aisles and walkways clearly marked"] },
        { s: "3S — SHINE", items: ["Work surfaces clean", "Equipment clean and free of debris", "Floors clean (no oil, scraps, chips)", "Cleaning supplies available and stocked", "Inspection done during cleaning (leaks, damage)"] },
        { s: "4S — STANDARDIZE", items: ["Visual standards posted (photos of correct state)", "Standards easy to understand without reading", "Consistent across similar work areas", "Cleaning schedule posted and followed", "Color coding consistent and meaningful"] },
        { s: "5S — SUSTAIN", items: ["Team maintains 5S without reminders", "Audit results posted and reviewed", "Previous action items completed", "Team takes ownership of their area", "Improvements made since last audit"] },
      ].map((section) => (
        <div key={section.s} className="mb-3">
          <div className="font-bold text-xs bg-sst-light-gray px-2 py-1.5 rounded">{section.s}</div>
          {section.items.map((item) => (
            <div key={item} className="flex items-center justify-between py-1.5 border-b border-sst-border/20 text-xs">
              <span>{item}</span>
              <div className="flex gap-2 flex-shrink-0 ml-2">
                {[0,1,2,3,4].map((n) => (
                  <span key={n} className="w-5 h-5 border border-sst-charcoal rounded-sm flex items-center justify-center text-[10px] text-sst-gray">{n}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="mt-3 grid grid-cols-4 gap-3 text-center text-xs border-t border-sst-border/30 pt-3">
        <div>Sort: ___/20</div>
        <div>Set: ___/20</div>
        <div>Shine: ___/20</div>
        <div>Std+Sustain: ___/40</div>
      </div>
      <div className="text-center font-bold mt-2">Total Score: ___/100</div>
    </div>
  );
}

function FiveWhyWorksheet() {
  return (
    <div>
      <DocHeader title="5-Why Root Cause Analysis" subtitle="Focus on PROCESS, not people — Don't stop at the first answer" />
      <div className="space-y-4">
        <div>
          <div className="text-xs font-bold mb-1">Problem Statement (What happened?):</div>
          <div className="border border-sst-border/30 rounded min-h-[3rem] p-2" />
        </div>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>When: ________________________</div>
          <div>Where: ________________________</div>
        </div>
        <div className="space-y-3">
          {[1,2,3,4,5].map((n) => (
            <div key={n} className="flex gap-3 items-start">
              <div className="w-16 flex-shrink-0 bg-sst-orange text-white text-center py-1.5 rounded font-bold text-sm">Why {n}</div>
              <div className="flex-1 border-b-2 border-sst-border/30 pb-3 min-h-[2.5rem]" />
            </div>
          ))}
        </div>
        <div className="bg-sst-orange/10 border border-sst-orange/30 rounded p-3">
          <div className="text-xs font-bold mb-1">ROOT CAUSE:</div>
          <div className="min-h-[2rem]" />
        </div>
        <div>
          <div className="text-xs font-bold mb-1">Countermeasure (Fix the system, not the symptom):</div>
          <div className="border border-sst-border/30 rounded min-h-[3rem] p-2" />
        </div>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>Owner: ________________</div>
          <div>Due: ________________</div>
          <div>Verified: ☐</div>
        </div>
      </div>
      <div className="mt-4 bg-sst-light-gray rounded p-3 text-xs">
        <strong>Rules:</strong> Focus on process/systems, not individuals. Base each &ldquo;why&rdquo; on facts. &ldquo;Human error&rdquo; is never a root cause — ask why the human was set up to fail.
      </div>
    </div>
  );
}

function AndonLog() {
  return (
    <div>
      <DocHeader title="Andon Event Log" subtitle="Document every Andon pull — Respond within 1 minute" />
      <div className="text-xs mb-2">
        <strong>Type Codes:</strong> S=Safety Q=Quality E=Equipment M=Material
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-sst-dark text-white">
              {["#", "Date", "Time", "Area", "Type", "Issue Description", "Response Time", "Responder", "Resolution", "Root Cause"].map((h) => (
                <th key={h} className="px-1.5 py-2 text-left font-bold border-r border-sst-charcoal last:border-r-0 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 12 }).map((_, i) => (
              <tr key={i} className="border-b border-sst-border/30">
                <td className="px-1.5 py-2.5 text-sst-gray border-r border-sst-border/20">{i + 1}</td>
                {Array.from({ length: 9 }).map((_, j) => (
                  <td key={j} className="px-1.5 py-2.5 border-r border-sst-border/20 last:border-r-0" />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 text-xs text-sst-gray">
        <strong>Target:</strong> 100% of Andon events documented. Review at Tier 2 meeting for trends.
      </div>
    </div>
  );
}

const docComponents: Record<string, () => React.ReactNode> = {
  "pre-flight-checklist": PreFlightChecklist,
  "post-flight-checklist": PostFlightChecklist,
  "shift-passdown": ShiftPassdown,
  "tier-1-meeting-script": Tier1MeetingScript,
  "leader-standard-work": LeaderStandardWork,
  "safety-cross": SafetyCross,
  "good-catch-report": GoodCatchReport,
  "scrap-log": ScrapLog,
  "ncr-form": NCRForm,
  "5s-audit": FiveSAudit,
  "5-why-worksheet": FiveWhyWorksheet,
  "andon-log": AndonLog,
};

export default function DocumentPage({
  params,
}: {
  params: Promise<{ docId: string }>;
}) {
  const { docId } = use(params);
  const doc = getDocument(docId);
  const DocComponent = docComponents[docId];

  if (!doc || !DocComponent) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Document Not Found</h1>
        <Link href="/resources" className="text-sst-orange hover:underline">Back to Resources</Link>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        @media print {
          header, footer, nav, .print\\:hidden { display: none !important; }
          main { padding: 0 !important; }
          body { background: white !important; }
          .print-doc { box-shadow: none !important; border: none !important; padding: 1rem !important; max-width: 100% !important; }
        }
      `}</style>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <nav className="flex items-center gap-2 text-sm text-sst-gray mb-6 print:hidden">
          <Link href="/resources" className="hover:text-sst-orange transition-colors">Resources</Link>
          <span>/</span>
          <span className="text-sst-charcoal font-medium">{doc.title}</span>
        </nav>

        <div className="flex items-center justify-between mb-6 print:hidden">
          <h1 className="text-xl font-bold">{doc.icon} {doc.title}</h1>
          <PrintButton />
        </div>

        <div className="print-doc bg-white rounded-xl border border-sst-border/50 p-6 sm:p-8 shadow-sm">
          <DocComponent />
        </div>

        <div className="mt-6 text-center print:hidden">
          <PrintButton />
          <p className="text-xs text-sst-gray mt-2">
            Tip: Use &ldquo;Save as PDF&rdquo; in your browser&apos;s print dialog to download.
          </p>
        </div>
      </div>
    </>
  );
}
