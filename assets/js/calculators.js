/* ==========================================================================
   calculators.js — THE MANIFEST
   --------------------------------------------------------------------------
   This is the ONE place you edit to add a calculator to the homepage.
   Each entry renders a card automatically. See README.md for the full
   3-step "add a calculator" flow.

   Fields:
     slug        URL folder + calculator filename + thumbnail basename.
                 e.g. "fuel-calculator" ->  /fuel-calculator/  ,
                      /calculators/fuel-calculator.html ,
                      /assets/thumbnails/fuel-calculator.<ext>
     title       Card + page title.
     description Short line shown on the card.
     thumbnail   Path to the thumbnail image (swap in your real image here).
     cta         (optional) CTA label. Defaults to "Open calculator".
   ========================================================================== */

window.CALCULATORS = [
  {
    slug: "fuel-calculator",
    title: "Fuel Calculator",
    description:
      "Set a customer target and a timeline, and see the media and influencer spend it takes to get there.",
    thumbnail: "/assets/thumbnails/fuel-calculator.svg",
    cta: "Open calculator"
  },
  {
    slug: "retainer-calculator",
    title: "Retainer Calculator",
    description:
      "Work backwards from what you want to keep to find the retainer you should charge.",
    thumbnail: "/assets/thumbnails/retainer-calculator.svg",
    cta: "Open calculator"
  }
];
