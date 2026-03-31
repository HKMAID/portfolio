const revealerOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        }, revealerOptions);

        document.querySelectorAll('.scroll-reveal').forEach((elem) => {
            scrollObserver.observe(elem);
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

// Navbar dyn
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("nav .nav-link");

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.remove("active"));
      const activeLink = document.querySelector(
        `nav a[href="#${entry.target.id}"]`
      );
      if (activeLink) activeLink.classList.add("active");
    });
  },
  { threshold: 0.4 }
);

sections.forEach((section) => activeObserver.observe(section));

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
}, { passive: true });

// Footer - année dynamique
const yearEl = document.getElementById("cr");
if (yearEl) yearEl.textContent = new Date().getFullYear();
