import Menu from './menu.js';
import Pagination from './pagination.js';
import Modal from './modal.js';

const privateMessages = {
  'children-management': 'Sistema de gestión desarrollado para el Jardín Infantil "José Francisco Costa Velázquez". Por políticas de seguridad y confidencialidad, este proyecto no está disponible para acceso público.',
  'educational-site': 'Plataforma educativa desarrollada para el Centro Universitario Municipal de Guanajay. Este es un sistema interno y no está disponible para visualización pública.',
  'remesas-system': 'Sistema de envío de remesas entre agentes de empresas privadas. Por seguridad y políticas corporativas, este proyecto es de acceso restringido.'
};

document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });

  new Menu();
  new Pagination();
  new Modal({ messages: privateMessages });

  const menuFab = document.querySelector('.menu-fab');
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(link => {
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('href');
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

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 300) {
        current = section.getAttribute('id');
      }
    });

    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      if (window.scrollY > 500) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    }
  });

  const currentYear = document.getElementById('current-year');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});