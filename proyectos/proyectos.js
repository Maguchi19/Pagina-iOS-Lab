fetch("proyectos.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("proyectos-container");
    data.forEach(proy => {
      const div = document.createElement("div");
      div.className = "proyecto-card";
      div.innerHTML = `
        <div class="proyecto-info">
          <div class="left-section">
            <img src="${proy.logo}" alt="logo" class="proyecto-logo" />
            <div class="text-col">
              <h1>${proy.nombre}</h1>
              <p><strong>Año:</strong> ${proy.anio}</p>
              <p><strong>Autores:</strong> ${proy.autores.join(", ")}</p>
              <p><strong>Tecnologías:</strong> ${proy.tecnologias.join(", ")}</p>
            </div>
            <div class="descripcion">${proy.descripcion}</div>
          </div>

          <div class="capturas-col">
            <img src="${proy.capturas[0]}" class="captura"/>
            <img src="${proy.capturas[1]}" class="captura"/>
          </div>
        </div>
      `;
      container.appendChild(div);
      
      // Detectar orientación de las imágenes después de que se carguen
      const capturasContainer = div.querySelector('.capturas-col');
      const imagenes = div.querySelectorAll('.captura');
      let imagenesVerticales = 0;
      let imagenesHorizontales = 0;
      let imagenesCompletas = 0;
      
      imagenes.forEach((img, index) => {
        img.onload = function() {
          const aspectRatio = this.naturalWidth / this.naturalHeight;
          
          if (aspectRatio < 1) {
            // Imagen vertical (altura > anchura)
            this.classList.add('vertical');
            imagenesVerticales++;
          } else {
            // Imagen horizontal (anchura >= altura)
            imagenesHorizontales++;
          }
          
          imagenesCompletas++;
          
          // Cuando todas las imágenes se hayan cargado, decidir el layout
          if (imagenesCompletas === imagenes.length) {
            if (imagenesVerticales > 0) {
              // Si hay al menos una imagen vertical, usar layout horizontal (lado a lado)
              capturasContainer.classList.add('vertical-layout');
              console.log(`Aplicando layout lado a lado para ${proy.nombre} - Imágenes verticales: ${imagenesVerticales}`);
            } else {
              // Si todas las imágenes son horizontales, usar layout vertical (una arriba de otra)
              capturasContainer.classList.add('horizontal-layout');
              console.log(`Aplicando layout arriba-abajo para ${proy.nombre} - Imágenes horizontales: ${imagenesHorizontales}`);
            }
          }
        };
        
        // Manejar error de carga de imagen
        img.onerror = function() {
          console.warn(`Error cargando imagen: ${this.src}`);
          imagenesCompletas++;
          
          if (imagenesCompletas === imagenes.length) {
            // Por defecto usar layout vertical si hay errores
            capturasContainer.classList.add('horizontal-layout');
            console.log('Error en carga de imágenes, usando layout por defecto');
          }
        };
        
        // Si la imagen ya está en caché, disparar onload manualmente
        if (img.complete) {
          img.onload();
        }
      });
    });
  })
  .catch(error => {
    console.error('Error cargando proyectos:', error);
  });