// Efecto smooth scroll para los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Navegación activa al hacer scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 300) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Paginación de proyectos
document.addEventListener('DOMContentLoaded', function() {
  const projectGrids = document.querySelectorAll('.projects-grid');
  const paginationButtons = document.querySelectorAll('.pagination-btn');
  
  // Mostrar solo la primera página inicialmente
  projectGrids.forEach((grid, index) => {
    if (index === 0) {
      grid.classList.remove('hidden');
    } else {
      grid.classList.add('hidden');
    }
  });
  
  // Manejar clic en botones de paginación
  paginationButtons.forEach(button => {
    button.addEventListener('click', function() {
      const pageIndex = parseInt(this.getAttribute('data-page'));
      
      // Actualizar botones activos
      paginationButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Mostrar la página correspondiente
      projectGrids.forEach((grid, index) => {
        if (index === pageIndex) {
          grid.classList.remove('hidden');
        } else {
          grid.classList.add('hidden');
        }
      });
    });
  });
  
  // Efecto hover para las tarjetas de tecnología
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      const color = this.style.getPropertyValue('--skill-color');
      this.style.boxShadow = `0 8px 15px ${color}80`;
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });
  });
});