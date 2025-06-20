// Clase para manejar el lightbox
class LightboxGallery {
  constructor() {
    this.lightbox = null;
    this.lightboxImage = null;
    this.currentImageSpan = null;
    this.totalImagesSpan = null;
    this.closeBtn = null;
    this.prevBtn = null;
    this.nextBtn = null;
    
    this.currentIndex = 0;
    this.images = [];
    this.currentGallery = '';
    
    this.createLightboxHTML();
    this.init();
  }
  
  // Crear el HTML del lightbox dinámicamente
  createLightboxHTML() {
    const lightboxHTML = `
      <div id="lightbox" class="lightbox">
        <div class="lightbox-content">
          <span class="lightbox-close">&times;</span>
          <span class="lightbox-nav lightbox-prev">&#10094;</span>
          <img id="lightbox-image" class="lightbox-image" src="" alt="">
          <span class="lightbox-nav lightbox-next">&#10095;</span>
          <div class="lightbox-counter">
            <span id="current-image">1</span> / <span id="total-images">1</span>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    // Obtener referencias a los elementos
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImage = document.getElementById('lightbox-image');
    this.currentImageSpan = document.getElementById('current-image');
    this.totalImagesSpan = document.getElementById('total-images');
    this.closeBtn = document.querySelector('.lightbox-close');
    this.prevBtn = document.querySelector('.lightbox-prev');
    this.nextBtn = document.querySelector('.lightbox-next');
  }
  
  init() {
    // Event listeners para controles
    this.closeBtn.addEventListener('click', () => this.closeLightbox());
    this.prevBtn.addEventListener('click', () => this.prevImage());
    this.nextBtn.addEventListener('click', () => this.nextImage());
    
    // Cerrar con ESC o click fuera de la imagen
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.prevImage();
      if (e.key === 'ArrowRight') this.nextImage();
    });
    
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) this.closeLightbox();
    });
  }
  
  // Método para agregar event listeners a nuevas imágenes
  addImageListeners() {
    const clickableImages = document.querySelectorAll('.captura[data-lightbox]');
    
    clickableImages.forEach((img) => {
      // Remover listeners existentes para evitar duplicados
      img.removeEventListener('click', this.handleImageClick);
      // Agregar nuevo listener
      img.addEventListener('click', this.handleImageClick.bind(this));
    });
  }
  
  handleImageClick(e) {
    e.preventDefault();
    this.openLightbox(e.target);
  }
  
  openLightbox(clickedImage) {
    const galleryName = clickedImage.getAttribute('data-lightbox');
    this.currentGallery = galleryName;
    
    // Obtener todas las imágenes del mismo grupo
    this.images = Array.from(document.querySelectorAll(`[data-lightbox="${galleryName}"]`));
    this.currentIndex = this.images.indexOf(clickedImage);
    
    this.updateImage();
    this.updateCounter();
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  closeLightbox() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  updateImage() {
    if (this.images.length > 0) {
      const currentImg = this.images[this.currentIndex];
      this.lightboxImage.src = currentImg.src;
      this.lightboxImage.alt = currentImg.alt;
    }
  }
  
  updateCounter() {
    this.currentImageSpan.textContent = this.currentIndex + 1;
    this.totalImagesSpan.textContent = this.images.length;
    
    const showNav = this.images.length > 1;
    this.prevBtn.style.display = showNav ? 'block' : 'none';
    this.nextBtn.style.display = showNav ? 'block' : 'none';
  }
  
  prevImage() {
    if (this.images.length > 1) {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.updateImage();
      this.updateCounter();
    }
  }
  
  nextImage() {
    if (this.images.length > 1) {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.updateImage();
      this.updateCounter();
    }
  }
}

// Tu código adaptado
let lightboxGallery; // Variable global para el lightbox

fetch("proyectos.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("proyectos-container");
    
    data.forEach((proy, proyectoIndex) => {
      const div = document.createElement("div");
      div.className = "proyecto-card";
      
      // Generar HTML para las capturas con soporte para imágenes y videos
      const capturasHTML = proy.capturas.map((captura, index) => {
        const extension = captura.split('.').pop().toLowerCase();
        if (['mp4', 'webm', 'ogg'].includes(extension)) {
          return `<video class="captura" controls muted playsinline autoplay loop>
                    <source src="${captura}" type="video/${extension}">
                    Tu navegador no soporta el video.
                  </video>`;
        } else {
          return `<img src="${captura}" class="captura" alt="Captura ${index + 1} de ${proy.nombre}" data-lightbox="proyecto-${proyectoIndex}" />`;
        }
      }).join('');
      
      div.innerHTML = `
        <div class="proyecto-info">
          <div class="left-section">
            <img src="${proy.logo}" alt="logo" class="proyecto-logo" />
            <div class="text-col">
              <h1 class="titulo-proyecto">${proy.nombre}</h1>
              <p><strong>Año:</strong> ${proy.anio}</p>
              <p><strong>Autores:</strong> ${proy.autores.join(", ")}</p>
              <p><strong>Tecnologías:</strong> ${proy.tecnologias.join(", ")}</p>
            </div>
            <div class="descripcion">${proy.descripcion}</div>
          </div>

          <div class="capturas-col">
            ${capturasHTML}
          </div>
        </div>
      `;
      
      container.appendChild(div);
      
      // Tu lógica existente para detectar orientación
      const capturasContainer = div.querySelector('.capturas-col');
      const imagenes = div.querySelectorAll('.captura');
      let imagenesVerticales = 0;
      let imagenesHorizontales = 0;
      let imagenesCompletas = 0;
      
      imagenes.forEach((img, index) => {
        if (!(img instanceof HTMLImageElement)) {
          imagenesCompletas++;
          if (imagenesCompletas === imagenes.length) {
            capturasContainer.classList.add('horizontal-layout');
            if (lightboxGallery) {
              lightboxGallery.addImageListeners();
            }
          }
          return;
        }
        img.onload = function() {
          const aspectRatio = this.naturalWidth / this.naturalHeight;
          
          if (aspectRatio < 1) {
            this.classList.add('vertical');
            imagenesVerticales++;
          } else {
            imagenesHorizontales++;
          }
          
          imagenesCompletas++;
          
          if (imagenesCompletas === imagenes.length) {
            if (imagenesVerticales > 0) {
              capturasContainer.classList.add('vertical-layout');
              console.log(`Aplicando layout lado a lado para ${proy.nombre} - Imágenes verticales: ${imagenesVerticales}`);
            } else {
              capturasContainer.classList.add('horizontal-layout');
              console.log(`Aplicando layout arriba-abajo para ${proy.nombre} - Imágenes horizontales: ${imagenesHorizontales}`);
            }
            
            // IMPORTANTE: Agregar listeners del lightbox cuando las imágenes se hayan cargado
            if (lightboxGallery) {
              lightboxGallery.addImageListeners();
            }
          }
        };
        
        img.onerror = function() {
          console.warn(`Error cargando imagen: ${this.src}`);
          imagenesCompletas++;
          
          if (imagenesCompletas === imagenes.length) {
            capturasContainer.classList.add('horizontal-layout');
            console.log('Error en carga de imágenes, usando layout por defecto');
            
            if (lightboxGallery) {
              lightboxGallery.addImageListeners();
            }
          }
        };
        
        if (img.complete) {
          img.onload();
        }
      });
    });
    
    // Inicializar el lightbox después de crear todo el contenido
    lightboxGallery = new LightboxGallery();
    
  })
  .catch(error => {
    console.error('Error cargando proyectos:', error);
  });

// Si necesitas agregar más proyectos dinámicamente después, puedes usar:
// lightboxGallery.addImageListeners();