import React, { useState } from "react";
import { ShieldCheck, Search } from "lucide-react";

export const AdminAuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const logs = [
    { id: "log_1", event: "Seller Approval", actor: "Super Admin (Aleen M.)", ip: "198.51.100.42", target: "Aura Artisan Acoustics (sel_1)", status: "Success", time: "10 minutes ago" },
    { id: "log_2", event: "Commission Override", actor: "Finance Admin", ip: "198.51.100.12", target: "Chronos Swiss set to 12%", status: "Success", time: "1 hour ago" },
    { id: "log_3", event: "Product Moderation LIVE", actor: "Product Admin", ip: "198.51.100.89", target: "AeroLift Magnetic Riser", status: "Success", time: "3 hours ago" },
    { id: "log_4", event: "Security Lockout Triggered", actor: "System Gateway", ip: "203.0.113.78", target: "Failed OTP attempts on user_894", status: "Security Flag", time: "12 hours ago" },
    { id: "log_5", event: "Warehouse Stock Replenished", actor: "Inventory Manager", ip: "198.51.100.42", target: "SF Hub +450 units", status: "Success", time: "1 day ago" }
  ];

  const filtered = logs.filter(l =>
    l.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.target.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-purple-400">Enterprise Security & Compliance</span>
          <h1 className="font-heading text-2xl font-bold text-white">System Activity & Audit Trail</h1>
          <p className="text-xs text-neutral-400">Immutable 256-bit tamper-evident administrative action ledger.</p>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Filter audit events by actor, action, or IP address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-10 pl-9 pr-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500"
        />
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
      </div>

      <div className="rounded-3xl bg-neutral-900/60 border border-neutral-800 overflow-hidden shadow-2xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-neutral-800 text-[10px] text-neutral-400 uppercase font-bold bg-neutral-950/60">
              <th className="p-4">Event Type</th>
              <th className="p-4">Administrator / Actor</th>
              <th className="p-4">Target Resource</th>
              <th className="p-4">Origin IP</th>
              <th className="p-4">Timestamp</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60">
            {filtered.map(l => (
              <tr key={l.id} className="hover:bg-neutral-800/30 transition-colors">
                <td className="p-4 font-bold text-white">{l.event}</td>
                <td className="p-4 text-purple-300 font-semibold">{l.actor}</td>
                <td className="p-4 text-neutral-300">{l.target}</td>
                <td className="p-4 font-mono text-neutral-500">{l.ip}</td>
                <td className="p-4 text-neutral-400">{l.time}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    l.status === "Success"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                  }`}>
                    {l.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};