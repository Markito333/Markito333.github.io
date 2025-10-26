document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });

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

  const currentYear = document.getElementById('current-year');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});
// Modal functionality
const privateModal = document.getElementById('privateModal');
const progressModal = document.getElementById('progressModal');
const modalMessage = document.getElementById('modalMessage');
const modalGallery = document.getElementById('modalGallery');
const progressGallery = document.getElementById('progressGallery');

// Mensajes personalizados para proyectos privados
const privateMessages = {
  'children-management': 'Sistema de gestión desarrollado para el Jardín Infantil "José Francisco Costa Velázquez". Por políticas de seguridad y confidencialidad, este proyecto no está disponible para acceso público.',
  'educational-site': 'Plataforma educativa desarrollada para el Centro Universitario Municipal de Guanajay. Este es un sistema interno y no está disponible para visualización pública.',
  'remesas-system': 'Sistema de envío de remesas entre agentes de empresas privadas. Por seguridad y políticas corporativas, este proyecto es de acceso restringido.'
};

// Función para abrir modal
function openModal(modal, projectId = null, images = '') {
  // Configurar mensaje personalizado si es un proyecto privado
  if (modal === privateModal && projectId && privateMessages[projectId]) {
    modalMessage.textContent = privateMessages[projectId];
  }
  
  // Configurar galería de imágenes
  const gallery = modal === privateModal ? modalGallery : progressGallery;
  loadGallery(gallery, images);
  
  // Mostrar modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Función para cerrar modal
function closeModal(modal) {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Función para cargar galería de imágenes
function loadGallery(galleryElement, imagesString) {
  galleryElement.innerHTML = '';
  
  if (!imagesString) return;
  
  const images = imagesString.split(',');
  images.forEach(imageSrc => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'modal-gallery-item';
    
    const img = document.createElement('img');
    img.src = imageSrc.trim();
    img.alt = 'Preview del proyecto';
    img.loading = 'lazy';
    
    galleryItem.appendChild(img);
    galleryElement.appendChild(galleryItem);
  });
}

// Event listeners para modales
document.querySelectorAll('.modal-close').forEach(closeBtn => {
  closeBtn.addEventListener('click', function() {
    const modal = this.closest('.modal');
    closeModal(modal);
  });
});

// Cerrar modal al hacer clic fuera del contenido
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', function(e) {
    if (e.target === this) {
      closeModal(this);
    }
  });
});

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(modal => {
      if (modal.classList.contains('active')) {
        closeModal(modal);
      }
    });
  }
});

// Event listeners para proyectos privados
document.querySelectorAll('.private-project').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    const projectId = this.getAttribute('data-project');
    const images = this.getAttribute('data-images') || '';
    openModal(privateModal, projectId, images);
  });
});

// Event listeners para proyectos en progreso
document.querySelectorAll('.progress-project').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    const projectId = this.getAttribute('data-project');
    const images = this.getAttribute('data-images') || '';
    openModal(progressModal, null, images);
  });
});