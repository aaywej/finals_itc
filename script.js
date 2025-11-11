// 🌸 Run only after the DOM is ready
window.addEventListener("DOMContentLoaded", () => {

  // 🌸 Footer Year
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // 🌸 Simple fade-in on scroll
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
  const appearOnScroll = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));

  // 🌸 Loading overlay logic
  const overlay = document.getElementById('loading-overlay');
  if (!overlay) return; // skip if missing

  // Show overlay as page enters
  overlay.classList.add('active');
  window.addEventListener('load', () => {
    // Hide it slightly after page load (smooth fade)
    setTimeout(() => overlay.classList.remove('active'), 400);
  });

  // 🌸 Show loader when clicking links (and navigate after)
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      // Skip anchor and JS links
      if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;
      e.preventDefault();
      overlay.classList.add('active');
      setTimeout(() => {
        window.location.href = href;
      }, 400); // wait 0.4s before navigating
    });
  });

  // 🌸 Show loader when submitting forms
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', () => {
      overlay.classList.add('active');
    });
  });

});

