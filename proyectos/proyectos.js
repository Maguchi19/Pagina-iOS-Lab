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
            <img src="${proy.logo}" alt="logo" class="proyecto-logo"/>
            <p class="descripcion">${proy.descripcion}</p>
            </div>
            <div class="text-col">
            <h1>${proy.nombre}</h1>
            <p><strong>Año:</strong> ${proy.anio}</p>
            <p><strong>Autores:</strong> ${proy.autores.join(", ")}</p>
            <p><strong>Tecnologías:</strong></p>
            <p>${proy.tecnologias.join(", ")}</p>
            </div>
            <div class="capturas-col">
            <img src="${proy.capturas[0]}" class="captura"/>
            <img src="${proy.capturas[1]}" class="captura"/>
            </div>
        </div>
        `;

      container.appendChild(div);
    });
  });