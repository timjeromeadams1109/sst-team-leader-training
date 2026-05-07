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

function LpaCalendarInstructions() {
  return (
    <div>
      <div className="border-b-2 border-sst-dark pb-3 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-bold text-sst-orange tracking-widest uppercase">Simpson Strong-Tie</div>
            <h1 className="text-xl font-bold mt-1">WKI 1200 — Layered Process Audit (LPA) Calendar</h1>
            <p className="text-xs text-sst-gray mt-0.5">Owning Department: Quality | Author: Quality Manager</p>
          </div>
          <div className="text-right text-xs text-sst-gray flex-shrink-0 ml-4">
            <div>Version: 1.0</div>
            <div>Effective: 19-Jan-2026</div>
          </div>
        </div>
      </div>

      <SectionTitle title="Purpose" />
      <p className="text-sm leading-relaxed mb-4">
        The Layered Process Audit (LPA) is a leader-owned system designed to verify that standard work is being followed,
        identify gaps early to prevent defects and escapes, and reinforce safe, consistent, high‑quality processes. It engages
        leaders and non‑bargaining team members in daily problem‑solving. LPAs are not inspections of people — they are
        checks on the process, supporting the organization's commitment to delivering No Equal results for its customers.
      </p>

      <SectionTitle title="Scope" />
      <p className="text-sm mb-4">Quality, Production, Warehouse, Inside Sales, Safety</p>

      <SectionTitle title="When &amp; Where LPAs Are Reviewed / Trained" />
      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-3 text-sm border-b border-sst-border/20 pb-2">
          <span className="font-bold text-sst-orange w-32 flex-shrink-0">Daily — 8:45 AM</span>
          <span>📍 Production Gemba Board</span>
        </div>
        <div className="flex items-start gap-3 text-sm pb-2">
          <span className="font-bold text-sst-orange w-32 flex-shrink-0">Wednesdays — 1:00 PM</span>
          <span>📍 NCR Meeting at the Lead Shack</span>
        </div>
      </div>
      <p className="text-xs text-sst-gray mb-4 italic">These touchpoints ensure alignment, learning, and follow-through.</p>

      <SectionTitle title="Who Completes LPAs" />
      <div className="space-y-1.5 mb-4">
        <CheckRow text="Leaders assigned LPAs on the calendar are accountable for completion" bold />
        <CheckRow text="Leaders may delegate LPAs to their direct reports (non-bargaining)" />
        <CheckRow text="Leaders with non-bargaining team members are treated as one department — promotes engagement, shared ownership, and frontline feedback" />
      </div>
      <div className="bg-sst-light-gray rounded p-3 text-sm mb-4">
        <strong>Bottom line:</strong> Delegation is allowed. Accountability is not transferred.
      </div>

      <SectionTitle title="Weekly Expectations" />
      <div className="space-y-1.5 mb-4">
        <CheckRow text="Complete all LPAs assigned to you within the week they are assigned — first shift or second shift, as your calendar permits" />
        <CheckRow text="Complete the number of LPAs shown on the calendar" />
        <CheckRow text="Enter findings clearly and honestly" />
        <CheckRow text="Identify gaps and ensure actions are captured when standards are not met" />
      </div>
      <div className="bg-sst-error/10 border border-sst-error/30 rounded p-3 text-sm mb-4">
        <strong className="text-sst-error">Important:</strong> LPAs completed late or carried forward defeat the purpose of early detection.
      </div>

      <SectionTitle title="How to Complete an LPA (Standard Method)" />
      <div className="space-y-3 mb-4">
        {[
          { step: "1", label: "Scan the QR Code", detail: "From the Quality Board / STS Board to access the LPA Smartsheet Form." },
          { step: "2", label: "Go to the Assigned Impact Area Gemba", detail: "Observe where the work actually happens." },
          { step: "3", label: "Follow the LPA Checklist", detail: "Verify safety, quality, process, and standard work." },
          { step: "4", label: "Engage the Team", detail: "Ask questions. Listen. Learn." },
          { step: "5", label: "Document Results", detail: "Pass = Standard met. Fail = Gap identified." },
          { step: "6", label: "Share the Results", detail: "Share with the Operator — let them know what Passed and Failed." },
          { step: "7", label: "Capture Actions When Needed", detail: "Link gaps to NCRs, RAILs, or follow-up actions as required." },
          { step: "8", label: "Close the Loop", detail: "Review trends during Gemba or NCR meetings and drive improvement." },
        ].map((s) => (
          <div key={s.step} className="flex gap-3 border-b border-sst-border/20 pb-3">
            <div className="w-7 h-7 rounded-full bg-sst-orange text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{s.step}</div>
            <div>
              <div className="font-bold text-sm">{s.label}</div>
              <div className="text-xs text-sst-gray mt-0.5">{s.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <SectionTitle title="Expectations for Leaders" />
      <div className="space-y-1.5 mb-4">
        <CheckRow text="LPAs are a non-negotiable leadership standard" bold />
        <CheckRow text="Completion reflects discipline and credibility" />
        <CheckRow text="Patterns and trends must drive action, not discussion loops" />
        <CheckRow text="What we tolerate in LPAs becomes our new standard" />
      </div>

      <SectionTitle title="FAQs" />
      <div className="space-y-3 mb-4">
        {[
          { q: "What if I'm short on time this week?", a: "LPAs are part of the job, not extra work. Adjust priorities — do not skip the audit." },
          { q: "What if I delegate the LPA to a direct report?", a: "That's encouraged. You are still accountable for completion and quality." },
          { q: "What if I miss an LPA for the week?", a: "Missed LPAs must be addressed with your manager. Repeated misses will be escalated." },
          { q: "What if I find the same issue repeatedly?", a: "That's a signal. Elevate it through NCRs, RAILs, or the Gemba Board for action." },
          { q: "What if the process isn't clear or the standard doesn't exist?", a: "Document the gap. LPAs help expose where standards need to be created or improved." },
          { q: "What if everything looks good?", a: "Great — document it. Consistency is just as important as problem-finding." },
        ].map((item) => (
          <div key={item.q} className="border border-sst-border/30 rounded p-3">
            <div className="font-bold text-sm text-sst-orange">{item.q}</div>
            <div className="text-sm mt-1 text-sst-charcoal">{item.a}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-sst-gray border-t border-sst-border/20 pt-3">
        Revision History: v1.0 — 19-Jan-2026 — New / first issue
      </div>
    </div>
  );
}

function LpaDeploymentPlan() {
  return (
    <div>
      <div className="border-b-2 border-sst-dark pb-3 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-bold text-sst-orange tracking-widest uppercase">Simpson Strong-Tie — Confidential / Internal Use Only</div>
            <h1 className="text-xl font-bold mt-1">Layered Process Audit — Multi-Site Deployment Plan</h1>
            <p className="text-xs text-sst-gray mt-0.5">LPA Program Rollout Strategy for SST Manufacturing Locations</p>
          </div>
          <div className="text-right text-xs text-sst-gray flex-shrink-0 ml-4">
            <div>Version: 1.0</div>
            <div>March 31, 2026</div>
            <div className="mt-1">Tim Adams, Plant Superintendent</div>
          </div>
        </div>
      </div>

      {/* Section 01 */}
      <h2 className="font-bold text-base bg-sst-orange text-white px-3 py-2 rounded mt-2 mb-3">01 — What is LPA &amp; Why It Matters</h2>
      <p className="text-sm leading-relaxed mb-3">
        A <strong>Layered Process Audit (LPA)</strong> is a leadership-owned quality system that catches problems before they reach customers —
        from the production floor to the branch manager — performing routine audits to verify that standard processes are being followed.
        It is not a quality department program. <strong>It is a leadership program.</strong>
      </p>
      <SectionTitle title="How It Works" />
      <div className="space-y-1.5 mb-3">
        <CheckRow text="Multiple layers of leaders audit the same processes at different frequencies" />
        <CheckRow text="Frontline leaders audit daily — catching issues in real time" />
        <CheckRow text="Supervisors audit weekly — verifying standard work and coaching" />
        <CheckRow text="Operations leaders audit monthly — ensuring process discipline" />
        <CheckRow text="Executives audit bi-annually — showing leadership commitment" />
        <CheckRow text="Findings drive immediate corrective action, not reports that sit on a shelf" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="bg-sst-light-gray rounded p-3">
          <div className="font-bold text-sm mb-2">Aligns with SST Core Values (BARC)</div>
          <ul className="text-xs space-y-1">
            <li>• Be Customer Focused — catch defects before they reach customers</li>
            <li>• Act with Integrity — verify we do what we say we do</li>
            <li>• Respect Others — coach, don't punish</li>
            <li>• Continuously Improve — every audit is a learning opportunity</li>
          </ul>
        </div>
        <div className="bg-sst-light-gray rounded p-3">
          <div className="font-bold text-sm mb-2">Supports SQDC &amp; Operational Excellence</div>
          <ul className="text-xs space-y-1">
            <li>• Safety — audits catch unsafe conditions and behaviors</li>
            <li>• Quality — internal detection reduces customer escapes</li>
            <li>• Delivery — fewer defects means fewer delays</li>
            <li>• Cost — less scrap, less rework, less warranty</li>
          </ul>
        </div>
      </div>
      <div className="bg-sst-orange/10 border border-sst-orange/30 rounded p-3 text-sm mb-4">
        <strong>Goal:</strong> Deploy LPA to additional SST manufacturing facilities over 18 months — one site at a time, ensuring each site is stable and self-sustaining before moving to the next.
      </div>

      {/* Section 02 */}
      <h2 className="font-bold text-base bg-sst-orange text-white px-3 py-2 rounded mt-6 mb-3">02 — The Riverside Blueprint</h2>
      <p className="text-sm mb-3">The proven model we are replicating — 28 leaders, 4 audit layers, 7 production areas</p>
      <SectionTitle title="Audit Layers" />
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-sst-dark text-white">
              {["Layer", "Who", "Frequency", "Purpose", "Position"].map((h) => (
                <th key={h} className="px-2 py-2 text-left font-bold border-r border-sst-charcoal last:border-r-0">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Frontline", "Quality, Production Mgrs, Ops Supv", "Daily (5/day)", "Real-time detection & coaching", "Quality Mgr, Prod Mgr"],
              ["Supervisory", "Supt, LEAN, Inventory, Warehouse, Maint.", "Weekly", "Standard work verification", "Production Manager"],
              ["Operations", "Dir. of Ops, Purchasing, Safety", "Monthly", "Process discipline check", "Production Manager"],
              ["Executive", "Branch Mgr, Directors, HR, Controller", "Bi-Annual", "Leadership visibility", "Ops Supervisor / Branch Mgr"],
            ].map(([layer, who, freq, purpose, pos]) => (
              <tr key={layer} className="border-b border-sst-border/30">
                <td className="px-2 py-2 font-bold border-r border-sst-border/20">{layer}</td>
                <td className="px-2 py-2 border-r border-sst-border/20">{who}</td>
                <td className="px-2 py-2 border-r border-sst-border/20 whitespace-nowrap">{freq}</td>
                <td className="px-2 py-2 border-r border-sst-border/20">{purpose}</td>
                <td className="px-2 py-2">{pos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SectionTitle title="Production Areas Audited" />
      <p className="text-sm mb-2">Fabrication • Armada • Paint • Weld • SSW • QuickFrames • SSL</p>
      <p className="text-xs text-sst-gray mb-4 italic">Each new site will map their own production areas to this same 4-layer model.</p>
      <SectionTitle title="What Riverside Proved" />
      <div className="space-y-1.5 mb-4">
        <CheckRow text="Internal NCR detection improved — catching issues before they reach customers" />
        <CheckRow text="Documentation accuracy increased — complete run sheets and validated work orders" />
        <CheckRow text="Real-time coaching culture established on the production floor" />
        <CheckRow text="Operators proactively perform inspections and validate work order signatures" />
      </div>

      {/* Section 03 */}
      <h2 className="font-bold text-base bg-sst-orange text-white px-3 py-2 rounded mt-6 mb-3">03 — Rollout Approach</h2>
      <p className="text-sm mb-3">One site at a time — each must be stable before we move to the next.</p>
      <div className="bg-sst-dark text-white rounded p-3 text-sm mb-4">
        We are taking a <strong>deliberate, one-site-at-a-time approach.</strong> Rushing to deploy everywhere at once is how programs fail. Each site gets full support, time to build the habit, and must meet success criteria before we move on.
      </div>
      <div className="space-y-4 mb-4">
        {[
          { n: "1", phase: "Package the Playbook", months: "Months 1–2", items: ["Document the Riverside LPA model into a simple, repeatable Site Deployment Playbook", "Create standardized audit checklist templates that can be customized per facility", "Build a blank LPA calendar template with the 4-layer structure", "Prepare a short leadership briefing deck explaining LPA and Riverside results"] },
          { n: "2", phase: "Deploy to First New Site", months: "Months 3–5", items: ["Select one facility with strong plant leadership and existing quality culture", "Identify a Site Champion (Plant Superintendent, Quality Manager, or LEAN Leader)", "Tim Adams supports on-site or virtually for the first 4 weeks", "Run the full deployment sequence (see Site Deployment Sequence)", "Do not proceed to a second site until this site meets success criteria"] },
          { n: "3", phase: "Learn, Adjust, Expand", months: "Months 6–18", items: ["After first site is stable, incorporate lessons learned into the playbook", "Deploy to one additional site every 2–3 months (pace based on success, not calendar)", "Each new Site Champion is trained by someone who has already done it (peer mentoring)", "Quarterly review with corporate: Are sites sustaining? Should we speed up or slow down?", "Target: 4–6 sites in the first 18 months, all self-sustaining"] },
        ].map((s) => (
          <div key={s.n} className="border border-sst-border/30 rounded overflow-hidden">
            <div className="bg-sst-light-gray px-3 py-2 flex items-center justify-between">
              <span className="font-bold text-sm">Phase {s.n}: {s.phase}</span>
              <span className="text-xs text-sst-orange font-bold">{s.months}</span>
            </div>
            <ul className="px-4 py-3 space-y-1">
              {s.items.map((item) => (
                <li key={item} className="flex items-start gap-1.5 text-xs">
                  <span className="text-sst-orange mt-0.5">•</span>{item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="bg-sst-orange/10 border border-sst-orange/30 rounded p-3 text-sm mb-4">
        <strong>Guiding principle:</strong> It is better to have 4 sites doing LPA well than 12 doing it poorly. Speed comes from quality, not the other way around.
      </div>

      {/* Section 04 */}
      <h2 className="font-bold text-base bg-sst-orange text-white px-3 py-2 rounded mt-6 mb-3">04 — Site Deployment Sequence</h2>
      <p className="text-sm mb-3">8-week step-by-step process per facility. Goal: build the habit, not perfection.</p>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-sst-dark text-white">
              {["Week", "Activity", "Owner", "Details"].map((h) => (
                <th key={h} className="px-2 py-2 text-left font-bold border-r border-sst-charcoal last:border-r-0">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Week 1", "Site Champion selected", "Plant Leadership", "Identify the person who will own LPA at this facility. Should be a senior leader who is on the floor daily."],
              ["Week 1", "Site Champion trained", "Tim Adams", "Walk through the playbook, Riverside model, audit templates, and calendar structure. Virtual or on-site."],
              ["Week 2", "Map production areas & leaders", "Site Champion", "List all production areas and identify every leader who will audit. Assign frequency and impact area."],
              ["Week 2", "Build the LPA calendar", "Site Champion", "Use the template to create the facility's calendar. Mirror Riverside's 4-layer structure."],
              ["Week 3", "Leadership kickoff meeting", "Site Champion", "Present LPA to all leaders. Explain what, why, and how. Set expectations. Answer questions."],
              ["Week 4", "First audits begin", "All Leaders", "Daily and weekly auditors start. Keep it simple — use the standard checklist, focus on observation."],
              ["Week 5", "First weekly LPA review meeting", "Site Champion", "Review findings, assign corrective actions, recognize good catches. Establish as a recurring meeting."],
              ["Week 6", "Check-in with Tim Adams", "Tim Adams", "Review audit compliance, quality of findings, corrective action closure. Adjust as needed."],
              ["Weeks 7–8", "Steady state assessment", "Site Champion", "Are audits happening on schedule? Are corrective actions closing? Is the weekly meeting running?"],
            ].map(([week, activity, owner, details]) => (
              <tr key={`${week}-${activity}`} className="border-b border-sst-border/30">
                <td className="px-2 py-2 font-bold text-sst-orange border-r border-sst-border/20 whitespace-nowrap">{week}</td>
                <td className="px-2 py-2 font-semibold border-r border-sst-border/20">{activity}</td>
                <td className="px-2 py-2 border-r border-sst-border/20 whitespace-nowrap">{owner}</td>
                <td className="px-2 py-2 text-sst-gray">{details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 05 */}
      <h2 className="font-bold text-base bg-sst-orange text-white px-3 py-2 rounded mt-6 mb-3">05 — Success Criteria &amp; How We Measure</h2>
      <p className="text-sm mb-3">A site must meet these criteria before we deploy to the next one.</p>
      <div className="grid grid-cols-3 gap-3 mb-4 text-center">
        <div className="bg-sst-light-gray rounded p-3">
          <div className="text-3xl font-bold text-sst-orange">90%</div>
          <div className="text-xs mt-1">Audit Compliance<br />(scheduled vs. completed)</div>
        </div>
        <div className="bg-sst-light-gray rounded p-3">
          <div className="text-3xl font-bold text-sst-orange">80%</div>
          <div className="text-xs mt-1">Corrective Actions<br />Closed Within 1 Week</div>
        </div>
        <div className="bg-sst-light-gray rounded p-3">
          <div className="text-3xl font-bold text-sst-orange">4+</div>
          <div className="text-xs mt-1">Consecutive Weeks<br />of Weekly LPA Meetings</div>
        </div>
      </div>
      <div className="bg-sst-dark text-white rounded p-3 text-sm mb-4 text-center">
        <strong>100%</strong> Leaders Assigned and Actively Auditing
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <SectionTitle title="Track Weekly (Site Level)" />
          <table className="w-full text-xs border-collapse">
            <thead><tr className="bg-sst-light-gray"><th className="px-2 py-1.5 text-left">Metric</th><th className="px-2 py-1.5 text-left">What It Tells Us</th></tr></thead>
            <tbody>
              {[
                ["Audits completed vs. scheduled", "Are leaders actually auditing?"],
                ["Findings per audit", "Are audits real observations or check-the-box?"],
                ["Corrective actions opened", "Are findings being documented?"],
                ["Corrective actions closed", "Are issues actually getting fixed?"],
                ["Weekly LPA meeting held", "Is the rhythm established?"],
              ].map(([m, w]) => (
                <tr key={m} className="border-b border-sst-border/20">
                  <td className="px-2 py-1.5 border-r border-sst-border/20">{m}</td>
                  <td className="px-2 py-1.5 text-sst-gray">{w}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <SectionTitle title="Track Quarterly (Corporate)" />
          <table className="w-full text-xs border-collapse">
            <thead><tr className="bg-sst-light-gray"><th className="px-2 py-1.5 text-left">Metric</th><th className="px-2 py-1.5 text-left">What It Tells Us</th></tr></thead>
            <tbody>
              {[
                ["Customer quality escapes", "Is LPA reducing defects that reach customers?"],
                ["Internal NCR detection rate", "Are we catching more issues internally?"],
                ["Scrap and rework trends", "Is first-pass quality improving?"],
                ["Documentation audit findings", "Are operators following standard work?"],
                ["Sites meeting 'ready' criteria", "Is the rollout on track?"],
              ].map(([m, w]) => (
                <tr key={m} className="border-b border-sst-border/20">
                  <td className="px-2 py-1.5 border-r border-sst-border/20">{m}</td>
                  <td className="px-2 py-1.5 text-sst-gray">{w}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-sst-light-gray rounded p-3 text-sm mb-4">
        <strong>Reporting is Simple:</strong> Site Champions report weekly to Tim Adams (5-min check-in: compliance %, open corrective actions, any blockers). Tim Adams reports quarterly to corporate leadership — a spreadsheet and a conversation go a long way.
      </div>

      {/* Section 06 */}
      <h2 className="font-bold text-base bg-sst-orange text-white px-3 py-2 rounded mt-6 mb-3">06 — Roles &amp; Responsibilities</h2>
      <div className="space-y-4 mb-4">
        <div className="border border-sst-border/30 rounded p-4">
          <div className="font-bold text-sm mb-1">Tim Adams — Program Owner &amp; Riverside Site Champion</div>
          <ul className="text-xs space-y-1">
            {["Owns the playbook and deployment process", "Trains each new Site Champion personally", "Weekly check-ins with active sites", "Decides when a site is 'ready' to sustain on its own", "Decides when to deploy to the next site", "Quarterly report to corporate leadership"].map((i) => (
              <li key={i} className="flex items-start gap-1.5"><span className="text-sst-orange mt-0.5">•</span>{i}</li>
            ))}
          </ul>
        </div>
        <div className="border border-sst-border/30 rounded p-4">
          <div className="font-bold text-sm mb-1">Site Champion — 1 per facility (Plant Supt, QM, or LEAN Leader)</div>
          <ul className="text-xs space-y-1">
            {["Owns LPA at their facility day-to-day", "Builds the LPA calendar and assigns leaders", "Runs the weekly LPA review meeting", "Tracks audit compliance and corrective actions", "Coaches leaders who are struggling", "Weekly 5-min check-in with Tim Adams"].map((i) => (
              <li key={i} className="flex items-start gap-1.5"><span className="text-sst-orange mt-0.5">•</span>{i}</li>
            ))}
          </ul>
        </div>
        <div className="border border-sst-border/30 rounded p-4">
          <div className="font-bold text-sm mb-1">Auditing Leader — Every leader at the facility</div>
          <ul className="text-xs space-y-1">
            {["Performs audits at their assigned frequency", "Uses the standard checklist — observes, doesn't just check boxes", "Documents findings and initiates corrective actions", "Coaches operators in real-time during observations", "Attends weekly LPA review meeting"].map((i) => (
              <li key={i} className="flex items-start gap-1.5"><span className="text-sst-orange mt-0.5">•</span>{i}</li>
            ))}
          </ul>
        </div>
      </div>
      <SectionTitle title="Time Commitment" />
      <table className="w-full text-xs border-collapse mb-4">
        <thead><tr className="bg-sst-dark text-white">{["Role", "Weekly Time", "Notes"].map((h) => <th key={h} className="px-2 py-2 text-left font-bold border-r border-sst-charcoal last:border-r-0">{h}</th>)}</tr></thead>
        <tbody>
          {[
            ["Tim Adams (Program Owner)", "3–5 hours", "Higher during new site launch weeks, lower during steady state"],
            ["Site Champion", "2–3 hours", "Calendar maintenance, weekly meeting, check-ins with Tim"],
            ["Daily Auditor", "~30 min/day", "5 audits per day using standard checklist"],
            ["Weekly Auditor", "~30 min/week", "1 audit per month"],
            ["Bi-Annual Auditor", "~1 hour/year", "2 scheduled audits per year"],
          ].map(([role, time, notes]) => (
            <tr key={role} className="border-b border-sst-border/30">
              <td className="px-2 py-2 font-semibold border-r border-sst-border/20">{role}</td>
              <td className="px-2 py-2 border-r border-sst-border/20 whitespace-nowrap">{time}</td>
              <td className="px-2 py-2 text-sst-gray">{notes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Section 07 */}
      <h2 className="font-bold text-base bg-sst-orange text-white px-3 py-2 rounded mt-6 mb-3">07 — Common Risks &amp; How We Handle Them</h2>
      <table className="w-full text-xs border-collapse mb-4">
        <thead><tr className="bg-sst-dark text-white">{["Risk", "How We Prevent It", "If It Happens Anyway"].map((h) => <th key={h} className="px-2 py-2 text-left font-bold border-r border-sst-charcoal last:border-r-0">{h}</th>)}</tr></thead>
        <tbody>
          {[
            ["\"Too busy to audit\"", "Executive kickoff sets the tone: LPA is part of the job. Keep audits short (5–10 min).", "Site Champion coaches individually. Start with fewer audits per week and build up."],
            ["Check-the-box auditing", "Checklists require written observations, not just pass/fail. Weekly review discusses actual findings.", "Tim Adams or Site Champion shadows audits and provides feedback. Celebrate good catches publicly."],
            ["Corrective actions don't close", "Weekly LPA meeting reviews all open items. Simple tracking — owner, due date.", "Escalate to plant leadership. If systemic, root-cause the closure process itself."],
            ["Program fizzles after launch", "Weekly meeting cadence is the heartbeat. As long as the meeting happens, the program lives.", "Tim Adams re-engages with site for a reset. This is why we don't rush to the next site."],
            ["Checklists don't fit the facility", "Start with standard templates. Site Champion customizes for their production areas in Week 2.", "Iterate — update checklists monthly based on what auditors are actually finding."],
            ["No executive buy-in at new site", "Don't deploy there yet. Pick a different site. Executive support is a prerequisite, not a nice-to-have.", "Share Riverside results data. If still no buy-in, wait. Forced programs don't sustain."],
          ].map(([risk, prevent, handle]) => (
            <tr key={risk} className="border-b border-sst-border/30">
              <td className="px-2 py-2 font-semibold border-r border-sst-border/20">{risk}</td>
              <td className="px-2 py-2 border-r border-sst-border/20 text-sst-gray">{prevent}</td>
              <td className="px-2 py-2 text-sst-gray">{handle}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Section 08 */}
      <h2 className="font-bold text-base bg-sst-orange text-white px-3 py-2 rounded mt-6 mb-3">08 — Next Steps</h2>
      <table className="w-full text-xs border-collapse mb-4">
        <thead><tr className="bg-sst-dark text-white">{["#", "Action", "Owner", "Target"].map((h) => <th key={h} className="px-2 py-2 text-left font-bold border-r border-sst-charcoal last:border-r-0">{h}</th>)}</tr></thead>
        <tbody>
          {[
            ["1", "Present this plan to corporate leadership for approval", "Tim Adams", "April 2026"],
            ["2", "Finalize the Site Deployment Playbook", "Tim Adams", "April–May 2026"],
            ["3", "Select first expansion site (with leadership buy-in confirmed)", "Tim Adams + Corp. Ops", "May 2026"],
            ["4", "Train first Site Champion and begin 8-week deployment", "Tim Adams", "June 2026"],
            ["5", "First site stable & meeting success criteria", "Site Champion", "August 2026"],
            ["6", "Lessons learned incorporated, select second site", "Tim Adams", "September 2026"],
          ].map(([n, action, owner, target]) => (
            <tr key={n} className="border-b border-sst-border/30">
              <td className="px-2 py-2 font-bold text-sst-orange border-r border-sst-border/20">{n}</td>
              <td className="px-2 py-2 border-r border-sst-border/20">{action}</td>
              <td className="px-2 py-2 border-r border-sst-border/20">{owner}</td>
              <td className="px-2 py-2 whitespace-nowrap">{target}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-xs text-sst-gray border-t border-sst-border/20 pt-3">
        Program Contact: Tim Adams, Plant Superintendent — Riverside Business Systems | LPA Program Originator and Pilot Site Lead
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
  "lpa-calendar-instructions": LpaCalendarInstructions,
  "lpa-deployment-plan": LpaDeploymentPlan,
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
