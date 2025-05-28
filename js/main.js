    cat <<EOF > js/main.js
    // Estado global
    let idiomaActual = localStorage.getItem('idioma') || 'es';
    let monedaActual = localStorage.getItem('moneda') || 'ARS';
    let traducciones = {};
    let tasas = { ARS: 1, USD: 1000, ILS: 110 }; // Valores por defecto
    const simbolos = { ARS: "$", USD: "US$", ILS: "₪" };

    // Determinar la ruta base para los recursos (locales, css, js, etc.)
    // Si la página actual está en /ciudades/, la base es '../'. Sino, es './' o ''.
    const basePath = window.location.pathname.includes('/ciudades/') ? '../' : './';

    // --- FUNCIONES NÚCLEO ---

    async function cargarTraducciones(idioma) {
      try {
        const response = await fetch(\`\${basePath}locales/\${idioma}.json\`);
        if (!response.ok) throw new Error(\`Error HTTP: \${response.status}\`);
        traducciones = await response.json();
      } catch (error) {
        console.error("Error cargando traducciones:", error);
        traducciones = { idioma: "Idioma:", moneda: "Moneda:", tituloPrincipal: "Error de Carga" };
      }
    }

    async function actualizarTasas() {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();
        if (data && data.result === "success") {
          tasas.ARS = data.rates.ARS;
          tasas.USD = 1;
          tasas.ILS = data.rates.ILS;
        }
      } catch (error) {
        console.warn("Error actualizando tasas de cambio, usando valores por defecto:", error);
      }
    }

    function aplicarTraducciones() {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (traducciones[key]) {
          // Para elementos como input placeholder o title, usar el.placeholder o el.title
          if (el.tagName === 'INPUT' && el.type === 'text' && key.toLowerCase().includes('placeholder')) {
            el.placeholder = traducciones[key];
          } else if (el.hasAttribute('title') && key.toLowerCase().includes('title')) {
            el.title = traducciones[key];
          } else {
            el.textContent = traducciones[key];
          }
        } else {
          // console.warn(\`Clave de traducción no encontrada: \${key}\`);
        }
      });

      renderMenu();
      if (document.getElementById('tabla-transporte')) {
        renderTablaTransporte();
      }
      if (document.getElementById('corrientes-atracciones')) {
        mostrarAtraccionesCorrientes();
      }
      // Aplicar dirección de texto
      document.body.dir = (idiomaActual === 'he') ? 'rtl' : 'ltr';
      // Actualizar título de la página si existe la clave
      const pageTitleKey = document.body.dataset.pageTitleKey; // ej: data-page-title-key="tituloPrincipal"
      if (pageTitleKey && traducciones[pageTitleKey]) {
        document.title = traducciones[pageTitleKey];
      }
    }

    // --- RENDERIZADO UI ---

    function renderMenu() {
      const menuEl = document.getElementById('menu-ciudades');
      if (!menuEl || !traducciones.menu) return;

      menuEl.innerHTML = '';
      const menuData = traducciones.menu;
      // La ruta a las ciudades es relativa a la página actual
      // Si estamos en index.html (basePath = './'), ruta es 'ciudades/archivo.html'
      // Si estamos en ciudades/ciudad.html (basePath = '../'), ruta es 'archivo.html' (para otras ciudades) o '../mapa.html'
      
      menuData.forEach((item) => {
        const li = document.createElement('li');
        let href = '';
        if (basePath === './') { // Desde index.html o mapa.html en raíz
          if (item.archivo.includes('mapa.html')) {
            href = \`\${basePath}mapa.html\`; // Asumiendo que mapa.html está en la raíz
          } else {
            href = \`\${basePath}ciudades/\${item.archivo}\`;
          }
        } else { // Desde una página dentro de /ciudades/
          if (item.archivo.includes('mapa.html')) {
            href = \`\${basePath}mapa.html\`; // Sube un nivel y luego a mapa.html
          } else {
            href = item.archivo; // Enlace directo a otra ciudad en la misma carpeta
          }
        }
        li.innerHTML = \`<a href="\${href}">\${item.nombre}</a>\`;
        menuEl.appendChild(li);
      });

      // Enlace "Volver al itinerario" para páginas que no son index.html
      const volverLinkContainer = document.getElementById('volver-link-container');
      if (volverLinkContainer && basePath === '../' && traducciones.volverAlItinerario) {
          volverLinkContainer.innerHTML = \`<a href="\${basePath}index.html" data-i18n="volverAlItinerario">\${traducciones.volverAlItinerario}</a>\`;
      }


      menuEl.style.textAlign = (idiomaActual === 'he') ? 'right' : 'left';
    }

    function renderTablaTransporte() {
      const tbody = document.getElementById('tabla-transporte');
      if (!tbody || !traducciones.tablaTransporte) return;

      tbody.innerHTML = '';
      traducciones.tablaTransporte.forEach(fila => {
        const tr = document.createElement('tr');
        fila.forEach((celda, j) => {
          const td = document.createElement('td');
          if (j === 4) { // Columna de precio
            let valorOriginalARS = Number(celda);
            let simbolo = simbolos[monedaActual];
            let valorConvertido = valorOriginalARS;

            if (monedaActual === 'USD') {
              valorConvertido = (valorOriginalARS / tasas.ARS).toFixed(2);
            } else if (monedaActual === 'ILS') {
              valorConvertido = (valorOriginalARS / tasas.ARS * tasas.ILS).toFixed(2);
            }
            td.textContent = \`\${simbolo} \${valorConvertido}\`;
          } else if (j === 5) { // Columna Compañía con enlace
            td.innerHTML = celda;
          } else {
            td.textContent = celda;
          }
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
    }

    function mostrarAtraccionesCorrientes() {
      const atraccionesDiv = document.getElementById("corrientes-atracciones");
      if (!atraccionesDiv) return;

      // Mostrar solo si estamos en index.html o corrientes.html
      const esIndex = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');
      const esCorrientesPage = window.location.pathname.includes("corrientes.html");

      if (esIndex || esCorrientesPage) {
        atraccionesDiv.style.display = "block";
        const h3 = atraccionesDiv.querySelector('h3');
        const link = atraccionesDiv.querySelector('a');
        if (h3 && traducciones.atraccionesPrincipales) h3.textContent = traducciones.atraccionesPrincipales;
        if (link && traducciones.descubriCorrientes) link.textContent = traducciones.descubriCorrientes;
      } else {
        atraccionesDiv.style.display = "none";
      }
    }

    // --- MANEJADORES DE EVENTOS E INICIALIZACIÓN ---

    window.cambiarIdioma = async function(idioma) {
      idiomaActual = idioma;
      localStorage.setItem('idioma', idioma);
      await cargarTraducciones(idioma);
      aplicarTraducciones();
      actualizarBotones();
    }

    window.cambiarMoneda = function(moneda) {
      monedaActual = moneda;
      localStorage.setItem('moneda', moneda);
      if (document.getElementById('tabla-transporte')) {
        renderTablaTransporte();
      }
      // Si hay otras tablas o elementos con precios, re-renderizarlos aquí
      actualizarBotones();
    }

    function actualizarBotones() {
      document.getElementById('btn-es').classList.toggle('active', idiomaActual === 'es');
      document.getElementById('btn-he').classList.toggle('active', idiomaActual === 'he');
      document.getElementById('btn-ars').classList.toggle('active', monedaActual === 'ARS');
      document.getElementById('btn-usd').classList.toggle('active', monedaActual === 'USD');
      document.getElementById('btn-ils').classList.toggle('active', monedaActual === 'ILS');
    }
    
    async function initApp() {
      // Asignar eventos a los botones de idioma y moneda
      document.getElementById('btn-es').addEventListener('click', () => cambiarIdioma('es'));
      document.getElementById('btn-he').addEventListener('click', () => cambiarIdioma('he'));
      document.getElementById('btn-ars').addEventListener('click', () => cambiarMoneda('ARS'));
      document.getElementById('btn-usd').addEventListener('click', () => cambiarMoneda('USD'));
      document.getElementById('btn-ils').addEventListener('click', () => cambiarMoneda('ILS'));

      await actualizarTasas();
      await cargarTraducciones(idiomaActual);
      aplicarTraducciones();
      actualizarBotones();
    }

    document.addEventListener('DOMContentLoaded', initApp);
    EOF
    