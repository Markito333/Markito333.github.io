document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navOverlay = document.querySelector('.nav-overlay');
  const navClose = document.querySelector('.nav-close');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  function openMenu() {
    menuToggle.classList.add('active');
    navMenu.classList.add('active');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', function() {
    if (navMenu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navOverlay.addEventListener('click', closeMenu);
  navClose.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      closeMenu();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        setTimeout(() => {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }, 300);
      }
    });
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
      }
    });
  });

  const sections = document.querySelectorAll('section');
  const desktopNavLinks = document.querySelectorAll('.nav-item .nav-link');

  window.addEventListener('scroll', function() {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 300) {
        current = section.getAttribute('id');
      }
    });

    desktopNavLinks.forEach(link => {
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

  // Paginación de todos los proyectos
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
// para el modal
const privateModal = document.getElementById('privateModal');
const progressModal = document.getElementById('progressModal');
const modalMessage = document.getElementById('modalMessage');
const modalGallery = document.getElementById('modalGallery');
const progressGallery = document.getElementById('progressGallery');

// mensajes segun el proyecto privado
const privateMessages = {
  'children-management': 'Sistema de gestión desarrollado para el Jardín Infantil "José Francisco Costa Velázquez". Por políticas de seguridad y confidencialidad, este proyecto no está disponible para acceso público.',
  'educational-site': 'Plataforma educativa desarrollada para el Centro Universitario Municipal de Guanajay. Este es un sistema interno y no está disponible para visualización pública.',
  'remesas-system': 'Sistema de envío de remesas entre agentes de empresas privadas. Por seguridad y políticas corporativas, este proyecto es de acceso restringido.'
};

function openModal(modal, projectId = null, images = '') {
  if (modal === privateModal && projectId && privateMessages[projectId]) {
    modalMessage.textContent = privateMessages[projectId];
  }
  
  const gallery = modal === privateModal ? modalGallery : progressGallery;
  loadGallery(gallery, images);
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

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

document.querySelectorAll('.modal-close').forEach(closeBtn => {
  closeBtn.addEventListener('click', function() {
    const modal = this.closest('.modal');
    closeModal(modal);
  });
});

document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', function(e) {
    if (e.target === this) {
      closeModal(this);
    }
  });
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(modal => {
      if (modal.classList.contains('active')) {
        closeModal(modal);
      }
    });
  }
});

document.querySelectorAll('.private-project').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    const projectId = this.getAttribute('data-project');
    const images = this.getAttribute('data-images') || '';
    openModal(privateModal, projectId, images);
  });
});

document.querySelectorAll('.progress-project').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    const projectId = this.getAttribute('data-project');
    const images = this.getAttribute('data-images') || '';
    openModal(progressModal, null, images);
  });
});