import Menu from './menu.js';
import Pagination from './pagination.js';
import Modal from './modal.js';

const privateMessages = {
  'children-management': 'Management system developed for the "José Francisco Costa Velázquez" kindergarten. Due to security and confidentiality policies, this project is not available for public access.',
  'educational-site': 'Educational platform developed for the Municipal University Center of Guanajay. This is an internal system and is not available for public viewing.',
  'remesas-system': 'Remittance sending system between agents of private companies. For security and corporate policies, access to this project is restricted.'
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