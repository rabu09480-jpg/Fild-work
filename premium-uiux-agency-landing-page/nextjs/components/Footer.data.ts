export type FooterLink = { label: string; href: string; kind?: "section" | "email" | "external" | "info" };

export const footerCols: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Services",
    links: [
      { label: "Product design", href: "#services" },
      { label: "UX research", href: "#services" },
      { label: "Websites", href: "#services" },
      { label: "Design systems", href: "#services" },
      { label: "Prototyping", href: "#services" },
    ],
  },
  {
    heading: "Studio",
    links: [
      { label: "Work", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "Pricing", href: "#pricing" },
      { label: "Careers", href: "careers", kind: "info" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "SaaS UX playbook", href: "playbook", kind: "info" },
      { label: "Onboarding teardown", href: "#work" },
      { label: "Blog", href: "blog", kind: "info" },
      { label: "Newsletter", href: "#news" },
    ],
  },
];

export const legalCopy: Record<string, { title: string; body: string[] }> = {
  privacy: {
    title: "Privacy policy",
    body: [
      "We only collect the details you submit through our discovery call form — your name, work email, company, project interests, budget range and preferred call time.",
      "That information is used solely to prepare for and follow up on your enquiry. We never sell it, and we don't add you to marketing lists without your explicit consent.",
      "To request a copy of your data or ask us to delete it, email hello@fieldwork.studio and we'll respond within 30 days.",
    ],
  },
  terms: {
    title: "Terms of service",
    body: [
      "Engagements begin with a written proposal that defines scope, timeline and fees. Work starts once the proposal is countersigned and the first invoice is paid.",
      "All design files, source components and intellectual property transfer to you in full on final payment. You retain ownership of everything we produce for you.",
      "Either party may end a monthly engagement with 14 days' written notice. Fees for work already delivered remain payable.",
    ],
  },
  careers: {
    title: "Careers at Fieldwork",
    body: [
      "We're a remote-first studio of eight senior designers, researchers and engineers across Europe. We hire slowly and only when the work demands it.",
      "We don't have open roles right now, but we always want to meet thoughtful product designers and design engineers. Send a portfolio and a short note about work you're proud of.",
      "Introduce yourself at hello@fieldwork.studio — we reply to every thoughtful application.",
    ],
  },
  playbook: {
    title: "The SaaS UX playbook",
    body: [
      "1. Define one activation metric before opening Figma. If the team can't name it, the design won't move it.",
      "2. Interview five recent sign-ups within your first week. Watch them attempt the core task without guidance.",
      "3. Cut the onboarding to the shortest path to first value. Defer everything that isn't required to experience the product.",
      "4. Instrument every step you designed. If you can't see drop-off, you can't defend the next iteration.",
      "5. Ship one improvement every two weeks. Compounding, evidenced changes beat a big-bang redesign.",
    ],
  },
  blog: {
    title: "Fieldnotes",
    body: [
      "Our writing lives in our fortnightly newsletter: short, practical teardowns of SaaS onboarding, pricing pages and design systems.",
      "Recent topics include redesigning trial-to-paid flows, making dashboards answer a question, and writing UI copy that reduces support tickets.",
      "Join the newsletter in the footer, or email us for a specific teardown — we share the good ones with permission.",
    ],
  },
};
