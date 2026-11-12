// Runs in the head, before the page is parsed (design D2 of landing-steady-page). The built
// page is in English. A visitor who gets another language must not read it first, so the page
// stays hidden (src/styles.css) until src/mount.tsx has rendered it in their language.
// The rule is `pickLanguage` of src/language.ts, repeated here because nothing can be imported
// this early; test/first-language.test.ts holds the two to the same answer.
(() => {
  let remembered = null;
  try {
    remembered = localStorage.getItem("wake.landing.language");
  } catch {
    // Storage is blocked: the browser's language decides.
  }
  const browser = (navigator.language ?? "").toLowerCase();
  const spanish = remembered === "es" || (remembered !== "en" && browser.startsWith("es"));
  if (!spanish) return;
  const page = document.documentElement;
  page.setAttribute("data-awaiting-language", "");
  // The page's script may never arrive: the English page is better than none.
  setTimeout(() => page.removeAttribute("data-awaiting-language"), 4000);
})();
