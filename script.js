function toggleMenu() {
      const menuList = document.getElementById('menu-list');
  const proyectosLink = document.getElementById('proyectos-link');
  
  // Toggle del menú principal
  menuList.classList.toggle('menu-hidden');
  menuList.classList.toggle('menu-visible');
  
  // Toggle del enlace de proyectos
  proyectosLink.classList.toggle('menu-hidden');
  proyectosLink.classList.toggle('menu-visible');
}
    const startWords = ['Imagina', 'Diseña', 'Crea', 'Desarrolla', 'Construye', 'Innova', 'Inspira'];
    const endWords = ['Transforma', 'Impacta', 'Lidera', 'Revoluciona', 'Conecta', 'Evoluciona', 'Descubre'];
    let index = 0;

    function cycleWords() {
      index = (index + 1) % startWords.length;
      document.getElementById('word-start').style.opacity = 0;
      document.getElementById('word-end').style.opacity = 0;

      setTimeout(() => {
        document.getElementById('word-start').textContent = startWords[index];
        document.getElementById('word-end').textContent = endWords[index];
        document.getElementById('word-start').style.opacity = 1;
        document.getElementById('word-end').style.opacity = 1;
      }, 500);
    }

    setInterval(cycleWords, 2500);

    function toggleExpand(card) {
      // Cierra todas las tarjetas primero
      document.querySelectorAll('.expanded').forEach((el) => {
        if (el !== card) {
          el.classList.remove('expanded');
        }
      });
      // Alterna la tarjeta clickeada
      card.classList.toggle('expanded');
    }

    const aboutVideo = document.querySelector('#about-video video');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          aboutVideo.play();
        } else {
          aboutVideo.pause();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(document.querySelector('#about-video'));