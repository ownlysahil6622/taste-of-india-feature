// Bridge to the Ownly app. Inside the app, the page draws edge to edge and the app sets
// window.OwnlyHost before any script runs. In a normal browser window.OwnlyHost does not exist.

type SafeArea = { top: number; right: number; bottom: number; left: number };

declare global {
  interface Window {
    OwnlyHost?: {
      safeArea?: SafeArea;
      platform?: string;
      hostVersion?: string;
      goBack?: () => void;
    };
  }
}

// Read once at startup (this module is imported before the app renders). The app's inset
// (in CSS px) wins when larger; env() covers iOS Safari and other browsers with notches.
const inset: SafeArea = window.OwnlyHost?.safeArea ?? { top: 0, right: 0, bottom: 0, left: 0 };
const root = document.documentElement.style;
// Scopes the app-only CSS rules (html.in-app …) so the normal browser layout is unchanged.
if (window.OwnlyHost) document.documentElement.classList.add("in-app");
root.setProperty("--safe-top", `max(${inset.top}px, env(safe-area-inset-top, 0px))`);
root.setProperty("--safe-bottom", `max(${inset.bottom}px, env(safe-area-inset-bottom, 0px))`);

/** Closes the app screen when running inside the Ownly app. Returns false in a normal browser. */
export function closeOwnlyScreen() {
  if (!window.OwnlyHost?.goBack) return false;
  window.OwnlyHost.goBack();
  return true;
}
