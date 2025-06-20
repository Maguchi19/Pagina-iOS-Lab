// Tu lógica original con pequeños ajustes para el modal
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Variables para el modal (se declaran globalmente)
let galleryImages = [];
let currentImageIndex = 0;

fetch("actividades.json")
  .then(res => res.json())
  .then(data => {
    const noticia = data.find(n => n.id === id);
    if (!noticia) return;

    document.getElementById("titulo-noticia").textContent = noticia.titulo;
    document.getElementById("fecha-noticia").textContent = noticia.fecha;

    const galeria = document.getElementById("galeria-imagenes");
    
    // Modificación: crear imágenes y agregar event listeners
    noticia.imagenes.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `Imagen ${index + 1}`;
      
      // Agregar event listener para abrir el modal
      img.addEventListener('click', () => openModal(index));
      
      galeria.appendChild(img);
    });

    // Actualizar la referencia global de imágenes después de crearlas
    galleryImages = galeria.querySelectorAll('img');
    
    // Actualizar el contador total de imágenes en el modal
    document.getElementById('totalImages').textContent = galleryImages.length;

    document.getElementById("contenido-noticia").textContent = noticia.noticia;
  })
  .catch(error => {
    console.error('Error cargando la noticia:', error);
  });

// FUNCIONES DEL MODAL 
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const currentIndexSpan = document.getElementById('currentImageIndex');
const totalImagesSpan = document.getElementById('totalImages');

// Función para abrir el modal
function openModal(index) {
  currentImageIndex = index;
  modal.classList.add('show');
  modalImg.src = galleryImages[index].src;
  modalImg.alt = galleryImages[index].alt;
  currentIndexSpan.textContent = index + 1;
  document.body.style.overflow = 'hidden'; // Prevenir scroll
}

// Función para cerrar el modal
function closeModal() {
  modal.classList.remove('show');
  document.body.style.overflow = 'auto'; // Restaurar scroll
}

// Función para navegar a la imagen anterior
function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  modalImg.src = galleryImages[currentImageIndex].src;
  modalImg.alt = galleryImages[currentImageIndex].alt;
  currentIndexSpan.textContent = currentImageIndex + 1;
}

// Función para navegar a la imagen siguiente
function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  modalImg.src = galleryImages[currentImageIndex].src;
  modalImg.alt = galleryImages[currentImageIndex].alt;
  currentIndexSpan.textContent = currentImageIndex + 1;
}

// Event listeners para los controles del modal
closeBtn.addEventListener('click', closeModal);
prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);

// Cerrar modal al hacer clic fuera de la imagen
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Controles de teclado
document.addEventListener('keydown', (e) => {
  if (modal.classList.contains('show')) {
    switch(e.key) {
      case 'Escape':
        closeModal();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
    }
  }
});