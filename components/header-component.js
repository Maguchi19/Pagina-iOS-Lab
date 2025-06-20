class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Valores predeterminados
        this.homeHref = this.getAttribute('home-href') || '../index.html';
        this.title = this.getAttribute('title') || 'Actividades';
        this.iconSrc = this.getAttribute('icon-src') || 'resources/header.png';
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['home-href', 'title', 'icon-src'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[name.replace('-', '')] = newValue; // Convierte a camelCase
            this.render();
        }
    }

    getStyles() {
        return `
        <style>
            .noticia-header {
                background: #f0eff4;
                color: #f24c00;
                padding: 20px 20px;
                font-size: 2.1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            
            .noticia-header a {
                position: absolute;
                left: 20px;
                font-size: 2rem;
                color: #f24c00;
                text-decoration: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(242, 76, 0, 0.1);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(242, 76, 0, 0.2);
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(242, 76, 0, 0.1);
            }
            
            .noticia-header a:hover {
                background: rgba(242, 76, 0, 0.2);
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(242, 76, 0, 0.2);
                border: 1px solid rgba(242, 76, 0, 0.3);
            }
            
            .noticia-titulo-estatico {
                font-weight: bold;
                font-size: 2rem;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #f24c00, #ff6b35);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-shadow: 0 2px 4px rgba(242, 76, 0, 0.1);
                letter-spacing: 1px;
                position: relative;
            }
            
            .noticia-titulo-estatico::after {
                content: '';
                position: absolute;
                bottom: -5px;
                left: 50%;
                transform: translateX(-50%);
                width: 60%;
                height: 3px;
                background: linear-gradient(90deg, transparent, #fca311, transparent);
                border-radius: 2px;
                opacity: 0.7;
            }
            
            .noticia-icono {
                height: 46px;
                margin-left: auto;
                filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
                transition: transform 0.3s ease;
            }
            
            .noticia-icono:hover {
                transform: scale(1.05);
            }
        </style>
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
        ${this.getStyles()}
        <div class="noticia-header">
            <a href="${this.homeHref}">←</a>
            <span class="noticia-titulo-estatico">${this.title}</span>
            <img src="${this.iconSrc}" alt="icono" class="noticia-icono" />
        </div>
        `;
    }
}

customElements.define('header-component', HeaderComponent);