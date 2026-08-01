"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function BookingBar({ className, floating = true }: { className?: string; floating?: boolean }) {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={floating ? { opacity: 0, y: 24 } : undefined}
      animate={floating ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "grid grid-cols-2 gap-3 rounded-sm border border-line-200 bg-cream-50/95 p-5 shadow-[0_20px_60px_-25px_rgba(20,42,29,0.4)] backdrop-blur-sm sm:grid-cols-4 sm:items-end sm:gap-4 lg:p-6",
        className
      )}
    >
      <label className="flex flex-col gap-1.5 text-left">
        <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-500">
          {t("booking", "arrival")}
        </span>
        <input
          type="date"
          required
          className="border-0 border-b border-line-300 bg-transparent pb-1.5 text-sm text-ink-900 outline-none focus:border-gold-500"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-left">
        <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-500">
          {t("booking", "departure")}
        </span>
        <input
          type="date"
          required
          className="border-0 border-b border-line-300 bg-transparent pb-1.5 text-sm text-ink-900 outline-none focus:border-gold-500"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-left">
        <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-500">
          {t("booking", "guests")}
        </span>
        <select className="border-0 border-b border-line-300 bg-transparent pb-1.5 text-sm text-ink-900 outline-none focus:border-gold-500">
          <option>{t("booking", "guestsValue")}</option>
          <option>1 {t("booking", "guests")}</option>
          <option>3 {t("booking", "guests")}</option>
          <option>4+ {t("booking", "guests")}</option>
        </select>
      </label>

      <button
        type="submit"
        data-cursor="link"
        className="rounded-sm bg-pine-900 px-5 py-3 text-[13px] font-medium uppercase tracking-[0.06em] text-cream-50 transition-colors duration-300 hover:bg-pine-700"
      >
        {submitted ? "✓" : t("booking", "submit")}
      </button>

      {submitted && (
        <p className="col-span-2 -mt-1 text-xs text-ink-500 sm:col-span-4">
          Diese Demo-Website verarbeitet keine echten Buchungen — hier würde die
          Anfrage an das Buchungssystem übergeben.
        </p>
      )}
    </motion.form>
  );
}
