"use client";

import { openConsentPreferences } from "@/lib/analytics";

// Reabre o aviso de cookies: revogar o consentimento precisa ser tão fácil quanto dar (LGPD).
export function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentPreferences} className={className}>
      Preferências de cookies
    </button>
  );
}
