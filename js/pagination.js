class Pagination {
  constructor(options = {}) {
    this.gridsSelector = options.gridsSelector || '.projects-grid';
    this.buttonsSelector = options.buttonsSelector || '.pagination-btn';
    this.init();
  }

  init() {
    const grids = document.querySelectorAll(this.gridsSelector);
    const buttons = document.querySelectorAll(this.buttonsSelector);
    
    if (!grids.length || !buttons.length) return;

    grids.forEach((grid, index) => {
      if (index === 0) {
        grid.classList.remove('hidden');
      } else {
        grid.classList.add('hidden');
      }
    });

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const pageIndex = parseInt(button.getAttribute('data-page'));
        
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        grids.forEach((grid, index) => {
          if (index === pageIndex) {
            grid.classList.remove('hidden');
          } else {
            grid.classList.add('hidden');
          }
        });
      });
    });
  }
}

export default Pagination;