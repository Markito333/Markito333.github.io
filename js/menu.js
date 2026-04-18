class Menu {
  constructor() {
    this.fab = document.querySelector('.menu-fab');
    this.overlay = document.querySelector('.menu-overlay');
    this.nav = document.querySelector('.nav-menu');
    this.items = document.querySelectorAll('.nav-item');
    this.init();
  }

  init() {
    if (!this.fab) return;
    
    this.fab.addEventListener('click', () => this.toggle());
    this.overlay?.addEventListener('click', () => this.close());
    
    this.items.forEach(item => {
      item.addEventListener('click', () => this.close());
    });
  }

  toggle() {
    this.fab.classList.toggle('active');
    this.overlay?.classList.toggle('active');
    this.nav?.classList.toggle('active');
  }

  open() {
    this.fab?.classList.add('active');
    this.overlay?.classList.add('active');
    this.nav?.classList.add('active');
  }

  close() {
    this.fab?.classList.remove('active');
    this.overlay?.classList.remove('active');
    this.nav?.classList.remove('active');
  }
}

export default Menu;