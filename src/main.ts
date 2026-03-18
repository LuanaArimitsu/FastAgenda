const formLink = "https://forms.gle/ECSknKmkMctrQ7ai8";

function formatToday(): string {
  const now = new Date();
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(now);
}

function setText(id: string, value: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = value;
}

function setupMobileMenu() {
  const btn = document.getElementById("menuBtn") as HTMLButtonElement | null;
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  const close = () => {
    btn.setAttribute("aria-expanded", "false");
    menu.setAttribute("hidden", "true");
    document.body.classList.remove("no-scroll");
  };

  const open = () => {
    btn.setAttribute("aria-expanded", "true");
    menu.removeAttribute("hidden");
    document.body.classList.add("no-scroll");
  };

  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    if (expanded) close();
    else open();
  });

  menu.addEventListener("click", (e) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    const a = target.closest("a");
    if (a) close();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

function upgradeFormFallbacks() {
  const links = document.querySelectorAll<HTMLAnchorElement>(`a[href="${formLink}"]`);
  links.forEach((a) => {
    a.rel = "noreferrer";
    a.target = "_blank";
  });
}

setText("todayDate", formatToday());
setText("yearNow", String(new Date().getFullYear()));
setupMobileMenu();
upgradeFormFallbacks();

