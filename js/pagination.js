class Pagination {
  constructor(options = {}) {
    this.gridsSelector = options.gridsSelector || '.projects-grid';
    this.init();
  }

  init() {
    const grids = document.querySelectorAll(this.gridsSelector);
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    
    if (!grids.length || !prevBtn || !nextBtn) return;

    let currentPage = 0;
    const totalPages = grids.length;

    const showPage = (index) => {
      if (index < 0) index = 0;
      if (index >= totalPages) index = totalPages - 1;
      currentPage = index;

      grids.forEach((grid, i) => {
        if (i === currentPage) {
          grid.classList.remove('hidden');
        } else {
          grid.classList.add('hidden');
        }
      });

      prevBtn.disabled = currentPage === 0;
      nextBtn.disabled = currentPage === totalPages - 1;
    };

    prevBtn.addEventListener('click', () => showPage(currentPage - 1));
    nextBtn.addEventListener('click', () => showPage(currentPage + 1));

    showPage(0);
  }
}

export default Pagination;