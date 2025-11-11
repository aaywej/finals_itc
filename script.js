
window.addEventListener("DOMContentLoaded", () => {

  
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  
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

  
  const overlay = document.getElementById('loading-overlay');
  if (!overlay) return; 

  
  overlay.classList.add('active');
  window.addEventListener('load', () => {
   
    setTimeout(() => overlay.classList.remove('active'), 400);
  });

  
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
  
      if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;
      e.preventDefault();
      overlay.classList.add('active');
      setTimeout(() => {
        window.location.href = href;
      }, 400); 
    });
  });

 
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', () => {
      overlay.classList.add('active');
    });
  });

});

