document.addEventListener('DOMContentLoaded', function() {
  // Inicializar AOS
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });

  // Navegación suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        if (nav.classList.contains('active')) {
          menuToggle.classList.remove('active');
          nav.classList.remove('active');
        }
      }
    });
  });

  // Navegación activa
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop - 300) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
    
    // Botón volver arriba
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 500) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  });

  // Menú móvil
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Cerrar menú al hacer clic en un enlace
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      if (nav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
      }
    });
  });

  // Paginación de proyectos
  const projectGrids = document.querySelectorAll('.projects-grid');
  const paginationButtons = document.querySelectorAll('.pagination-btn');
  
  projectGrids.forEach((grid, index) => {
    if (index === 0) {
      grid.classList.remove('hidden');
    } else {
      grid.classList.add('hidden');
    }
  });
  
  paginationButtons.forEach(button => {
    button.addEventListener('click', function() {
      const pageIndex = parseInt(this.getAttribute('data-page'));
      
      paginationButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      projectGrids.forEach((grid, index) => {
        if (index === pageIndex) {
          grid.classList.remove('hidden');
        } else {
          grid.classList.add('hidden');
        }
      });
    });
  });

  // Año actual en el footer
  const currentYear = document.getElementById('current-year');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});