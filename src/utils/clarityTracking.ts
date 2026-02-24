// Microsoft Clarity custom tagging utility for CARLOS Suite
// Docs: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api

declare global {
  interface Window {
    clarity: (...args: any[]) => void;
  }
}

const APP_ID = 'hub';
const VISIT_KEY = 'carlos_visit_count';
const LAST_VISIT_KEY = 'carlos_last_visit';
const PAGES_KEY = 'carlos_session_pages';

function safeClarity(...args: any[]) {
  if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
    window.clarity(...args);
  }
}

// ── Core tags ───────────────────────────────────────────────

export function tagApp() {
  safeClarity('set', 'app', APP_ID);
}

export function tagDemoPath(path: string) {
  safeClarity('set', 'demo_path', path);
}

export function tagEntryType() {
  const referrer = document.referrer;
  if (!referrer) {
    safeClarity('set', 'entry', 'direct');
  } else if (referrer.includes('carloshub-launchpad.dnaventures.es')) {
    safeClarity('set', 'entry', 'hub');
  } else {
    try {
      safeClarity('set', 'entry', new URL(referrer).hostname);
    } catch {
      safeClarity('set', 'entry', 'unknown');
    }
  }
}

export function tagUtmSource() {
  const params = new URLSearchParams(window.location.search);
  const source = params.get('utm_source');
  if (source) {
    safeClarity('set', 'source', source);
  }
}

export function tagScreen(screenName: string) {
  safeClarity('set', 'screen', screenName);
  trackSessionDepth(screenName);
}

export function tagEvent(eventName: string, value?: string) {
  safeClarity('set', eventName, value || 'true');
}

// ── Engagement tracking ─────────────────────────────────────

/** Track return visitors: tags 'return_visitor' and 'visit_number' */
function tagReturnVisitor() {
  try {
    const count = parseInt(localStorage.getItem(VISIT_KEY) || '0', 10) + 1;
    localStorage.setItem(VISIT_KEY, String(count));
    localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString());
    safeClarity('set', 'return_visitor', count > 1 ? 'true' : 'false');
    safeClarity('set', 'visit_number', String(count));
  } catch { /* storage unavailable */ }
}

/** Track unique pages per session → classify depth */
function trackSessionDepth(screenName: string) {
  try {
    const raw = sessionStorage.getItem(PAGES_KEY);
    const pages: string[] = raw ? JSON.parse(raw) : [];
    if (!pages.includes(screenName)) {
      pages.push(screenName);
      sessionStorage.setItem(PAGES_KEY, JSON.stringify(pages));
    }
    const depth = pages.length <= 2 ? 'shallow' : pages.length <= 4 ? 'medium' : 'deep';
    safeClarity('set', 'session_depth', depth);
    safeClarity('set', 'pages_visited', String(pages.length));
  } catch { /* storage unavailable */ }
}

/**
 * Start a page engagement timer.
 * After `thresholdMs` (default 15s), fires a `page_engaged` event.
 * Returns a cleanup function to clear the timer.
 */
export function startEngagementTimer(pageName: string, thresholdMs = 15_000): () => void {
  const timer = window.setTimeout(() => {
    tagEvent('page_engaged', pageName);
  }, thresholdMs);
  return () => clearTimeout(timer);
}

/**
 * Track an outbound app launch with destination app name.
 * Call this onClick when users jump from the Hub to an external app.
 */
export function trackAppExit(appId: string, appName: string) {
  tagEvent('app_launched', appId);
  safeClarity('set', 'last_app_exit', appName);
}

/**
 * Track collateral engagement (download or view).
 */
export function trackCollateral(action: 'download' | 'view', resourceName: string) {
  tagEvent('collateral_' + action, resourceName);
}

/**
 * Track tab/section exploration in multi-tab pages.
 */
export function trackSectionExplored(section: string) {
  tagEvent('section_explored', section);
}

// ── Init ────────────────────────────────────────────────────

export function initClarityTracking() {
  tagApp();
  tagEntryType();
  tagUtmSource();
  tagReturnVisitor();
}
