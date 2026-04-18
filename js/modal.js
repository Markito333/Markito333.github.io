class Modal {
  constructor(options = {}) {
    this.messages = options.messages || {};
    this.init();
  }

  init() {
    const privateModal = document.getElementById('privateModal');
    const progressModal = document.getElementById('progressModal');
    
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
      closeBtn.addEventListener('click', () => {
        const modal = closeBtn.closest('.modal');
        this.close(modal);
      });
    });

    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.close(modal);
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
          this.close(modal);
        });
      }
    });

    document.querySelectorAll('.private-project').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = button.getAttribute('data-project');
        const images = button.getAttribute('data-images') || '';
        this.open(privateModal, projectId, images);
      });
    });

    document.querySelectorAll('.progress-project').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const images = button.getAttribute('data-images') || '';
        this.open(progressModal, null, images);
      });
    });
  }

  open(modal, projectId = null, images = '') {
    if (modal && projectId && this.messages[projectId]) {
      const messageEl = modal.querySelector('#modalMessage') || modal.querySelector('#progressMessage');
      if (messageEl) {
        messageEl.textContent = this.messages[projectId];
      }
    }

    const galleryId = modal?.id === 'privateModal' ? 'modalGallery' : 'progressGallery';
    this.loadGallery(galleryId, images);

    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  close(modal) {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  loadGallery(galleryId, imagesString) {
    const gallery = document.getElementById(galleryId);
    if (!gallery) return;

    gallery.innerHTML = '';
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
      gallery.appendChild(galleryItem);
    });
  }
}

export default Modal;