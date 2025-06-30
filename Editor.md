RESUMEN_PEDIDOS: Organización y lineamientos del proyecto despues de perder informacion
Este archivo contiene TODAS las reglas y lineamientos para el desarrollo y edición del proyecto Argentina Aventura Familiar de 30 Días.


1. Objetivo y alcance
Documentar y organizar un viaje familiar de un mes por Argentina, orientado a familias (pareja + 2 hijos) con información en español y hebreo.

El itinerario debe incluir destinos principales, duración en cada lugar, actividades clave, sugerencias de alojamiento y transporte.

El enfoque está en la comodidad, seguridad y variedad de experiencias familiares (actividades y alojamientos pensados para familias).

Para opciones de comida, priorizar alternativas aptas para diabéticos y bajas en carbohidratos (sin gluten si es posible), sin excluir otras, pero siempre cubriendo esas necesidades.

El proyecto debe funcionar tanto online como offline, en cualquier navegador (especialmente móviles y tablets Android).

El idioma principal del proyecto es español y el secundario es hebreo.

2. Estructura del proyecto y carpetas
.
├── components/
│   ├── CityCard.tsx
│   ├── Footer.tsx
│   ├── InteractiveMap.tsx
│   └── TopBar.tsx
├── docs/
│   ├── agenda/
│   │   └── ariflier1970@gmail.com.ical.zip (Referenciado, no provisto)
│   └── imagenes/
│       ├── bariloche/
│       │   └── emilio-lujan-HhobdGoYzaA-unsplash.jpg
│       ├── buenosaires/
│       │   └── buenosaires.jpg
│       ├── corrientes/
│       │   └── fachy-marin-A5xJay6N_fI-unsplash.jpg
│       ├── ibera/
│       │   └── snapsaga-DMVuTOv5Vys-unsplash.jpg
│       ├── iguazu/
│       │   └── claudio-mota-R9ZvATRLDSk-unsplash.jpg
│       ├── jujuy/
│       │   └── julieta-acosta-u4GAAc-myrg-unsplash.jpg
│       ├── malargue/
│       │   └── Malargue-Argentina.jpg
│       ├── mendoza/
│       │   └── Mendoza-Puente-del-Inca.jpg
│       └── rosario/
│           └── Monumento-a-la-Bandera-1024x768.jpg
├── icons/ (Referenciados en manifest.json, no provistos directamente pero definidos)
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
├── pages/
│   ├── CityDetailPage.tsx
│   └── HomePage.tsx
├── services/
│   └── apiService.ts
├── utils/
│   └── markdownParser.ts
├── App.tsx
├── constants.ts
├── index.html
├── index.tsx
├── manifest.json
├── metadata.json
├── sw.js
└── types.ts

Las imágenes te las voy a pasar por medio de un link que compartire de Google Drive.

Por ejemplo la imagen para Bariloche sera https://drive.google.com/file/d/1xAFu-3SicDoAbH_Bj5FRtdWgQmm7LfFk/view?usp=drive_link


3. Reglas de entrega y edición de archivos

Al corregir, integrar o agregar módulos, conservar toda la estructura y contenido previo (solo agregar o modificar lo necesario).

Si surge un conflicto entre pedidos, consultar antes de decidir.

Todas las instrucciones y archivos deben estar en castellano.

4. Consistencia visual y funcional
Barra fija arriba a la derecha con botones de idioma y botón "⬅ Volver al itinerario".


Mismo diseño, estructura y clases para los botones en todas las páginas.

Menú de navegación y enlaces internos consistentes y sincronizados (ciudades, mapa, volver).

Foto de portada en cada ciudad desde Google Drive.

Estructura igual en todas las ciudades (incluyendo IDs y clases para traducción y funcionalidades).

La selección de idioma y moneda debe mantenerse al navegar .

Todos los textos de botones y enlaces deben ser **traducibles dinámicamente**.

Soporte para texto de derecha a izquierda **(RTL)** para hebreo.

El botón de idioma (`'ai_translate_button_text'`) seleccionado aparece en negrita o destacado igual en todas las páginas.

**Al navegar o cambiar idioma/moneda, toda la navegación y los contenidos se mantienen en ese idioma y moneda.
&gt; Ejemplo: si el usuario está en hebreo y pulsa "⬅ Volver al itinerario", debe seguir en hebreo.**

5. Traducción dinámica y multilenguaje
Todos los textos, botones, títulos, placeholders y mensajes de error deben ser traducibles dinámicamente según el idioma elegido.

El diccionario de traducción debe incluir todas las cadenas de texto del contenido .

El selector de idioma debe cambiar textos y enlaces al idioma correspondiente.

Al navegar, la selección de idioma se mantiene .

Todos los IDs y clases deben ser iguales para que la traducción funcione en todas las páginas.

Los ítems de la lista de equipaje y textos de módulos interactivos se traducen automáticamente al cambiar el idioma.

La IA responde en el idioma en que se hace la pregunta.

No depender de servicios de traducción online ni recursos externos para textos o scripts críticos.

El sitio debe seguir funcionando igual sin conexión a internet.

6. Herramientas interactivas y módulos especiales
6.1 Conversor de moneda
Conversor interactivo moderno, ubicado al final de index.html (antes de &lt;/body&gt;), con tasas reales y actualización diaria (Polygon.io o exchangerate.host).

Conversor clásico en la tabla sigue funcionando con ARS/USD/ILS/EUR.

Si el par directo no está disponible, la conversión se realiza usando USD como intermediario (ejemplo: ARS → USD → ILS).

Solo monedas ARS, USD, EUR, ILS.

El resultado de la conversión debe ser claro y visible.

6.2 Lista de equipaje
Lista con esenciales y opcionales (selector para agregar ítems en la lista correspondiente).

Agregar ítems traduce automáticamente al cambiar de idioma.

El botón para agregar ítems debe ser visible y traducido.
Incluira opcion de borrar  y check list &amp;radic;


    `};
    
      const toggleItem = (id) =&gt; {
        setItems(items.map(item =&gt;
          item.id === id ? { ...item, checked: !item.checked } : item
        ));
      };
    
      const deleteItem = (id) =&gt; {
        setItems(items.filter(item =&gt; item.id !== id));
      };`

Ideal: persistencia usando localStorage para que no se pierda la lista al recargar.

Debe haber siempre la posibilidad de borrar ítems de la lista.

6.3 Consulta a IA
Módulo de consulta a IA experto en viajes familiares en Argentina, al final de index.html.

Puede ser mock (respuesta simulada) o conectado a Pyrefly o una API real.

El botón de consulta queda deshabilitado mientras responde.

Manejo de errores: si la IA falla, mostrar mensaje claro en el idioma actual y no debe quedarse colgado.

Traducción consistente de todos los textos y errores de IA.

La respuesta debe mostrarse en el idioma de la pregunta.

7. Reglas para imágenes
El nombre del archivo de la imagen NO necesariamente será el nombre de la ciudad en minúsculas, sin espacios ni tildes y extensión .jpg.
Lo importante es que esté dentro de docs/imagenes/[ciudad]/ correspondiente.

Descargar imágenes libres de Unsplash o equivalentes para cada ciudad.

No depender de imágenes de servicios externos en producción.

8. Organización de datos y documentación
Guardar los Excel/CSV fuente en subcarpetas específicas por temática en docs/.

Si la app consume datos, agregar una carpeta /data con versiones en JSON.

README(s) en Markdown explicando el propósito de cada carpeta y archivo.

Mantener documentación clara y actualizada en docs/.

No crear carpetas vacías: si es necesario, agregar un archivo .gitkeep.

Los archivos de información y contenido principal (.md, .html) de cada ciudad van juntos en ciudades/.

Todos los recursos multimedia y documentos adjuntos en docs/imagenes/[ciudad]/, docs/agenda/[ciudad]/, o docs/recursos/ según corresponda.

La agenda general del viaje debe estar en docs/agenda/ en formato .ics, .ical y/o comprimido (.zip) según corresponda.

9. Sincronización y enriquecimiento de contenidos
Cada sección importante de la ciudad en su archivo .md debe reflejarse y ampliarse en la carpeta correspondiente en docs/.

Las secciones de ciudad deben estar sincronizadas entre los .html, .md y la documentación en docs/.

Por ejemplo, "Agenda de eventos" debe estar tanto en la página de la ciudad como en docs/agenda/[ciudad]/README.md.

Las agendas de eventos de cada ciudad deben mostrar SOLO eventos relevantes para las fechas en que la familia estará en esa ciudad.

10. Centralización de idioma y moneda
El estado de idioma y moneda debe manejarse globalmente (centralizado, por localStorage, querystring o contexto global).

Cambiar idioma no afecta la conversión de moneda y viceversa.

Los selectores de idioma y moneda usan la misma lógica y clases activas en todas las páginas.

Al navegar o cambiar idioma/moneda, toda la navegación y los contenidos se mantienen en ese idioma y moneda.
Ejemplo: Si el usuario está en hebreo y pulsa "⬅ Volver al itinerario", debe seguir en hebreo.



12. Propuestas y buenas prácticas (futuras/mejoras)
Integrar APIs/MCP de tipo de cambio, reservas, mapas, etc.

Formularios para agregar notas y gastos diarios.

Visualización de presupuesto con tablas, tarjetas, o gráficos.

Documentar scripts de automatización de datos.

Internacionalización: README en español, inglés y hebreo.

Sincronizar eventos automáticamente con tu archivo de ciudades.

Mejorar UI: más íconos, colores por tipo, edición de reservas, exportar PDF, etc.

Permitir agregar eventos personalizados.

Separar frontend y documentación/datos para mayor escalabilidad.

Usar scripts para automatizar conversiones de Excel/CSV a JSON, etc.

Centralizar traducciones en archivos JSON independientes.

Implementar tests, optimización de imágenes, y mejoras de accesibilidad.

Agregar una página tipo blog, con posibilidad de subir fotos desde cuentas Gmail. Las cuentas se sincronizan con el proyecto, pero el usuario puede elegir qué fotos mostrar.

13. Estructura de las páginas
13.1 index.html (página principal)
Es la página principal del itinerario del viaje y debe contener:

Barra superior fija a la derecha con selectores de idioma y moneda, usando las mismas clases y estructura para los botones en todas las páginas.

Título principal y bienvenida.

Cada ciudad debe mostrarse como una tarjeta (card) con imagen, nombre, descripción y botón "Explorar más detalles".

El código para la tarjeta de ciudad está en components/CityCard.tsx. Esta tarjeta muestra una imagen, el nombre de la ciudad, una breve descripción y un botón para explorar más detalles.

Cuando haces clic en el botón "Explorar más detalles", se usa un componente &lt;Link&gt; de react-router-dom que dirige a una URL específica para esa ciudad (ej: /city/buenosaires).

El archivo App.tsx configura las rutas de la app. Hay una ruta tipo &lt;Route path="/city/:cityId" element={&lt;CityDetailPage /&gt;} /&gt;.

Cuando navegas a esa URL, el componente pages/CityDetailPage.tsx se renderiza. Usa useParams de react-router-dom para obtener el cityId de la URL y busca la información de la ciudad en el array CITIES de constants.ts.

Tabla de transporte entre ciudades, con nombres de compañías como enlace (sin columna web).

(Opcional) Sección de atracciones destacadas según corresponda.

Módulos interactivos al final (antes de &lt;/body&gt;): conversor de moneda moderno, lista de equipaje, y consulta a IA, todos integrados y funcionando.

Traducción dinámica de textos y soporte multilenguaje para todos los componentes y módulos.

Consistencia visual y funcional en todos los elementos y botones.

Al hacer clic en "⬅ Volver al itinerario" desde cualquier página de ciudad, debe retornar a index.html.

13.2 Páginas de ciudad (ejemplo: ciudades/rosario.html)
Cada página de ciudad debe tener la siguiente estructura:

Barra superior fija arriba a la derecha, con el mismo diseño y funcionalidad que en index.html: botones de idioma, y botón "⬅ Volver al itinerario" (link a /index.html).

Título con el nombre de la ciudad, traducido dinámicamente.

Foto de portada correspondiente, cargada desde docs/imagenes/[ciudad]/[imagen].jpg (nombre libre).

Secciones principales: breve introducción, actividades recomendadas, gastronomía (con foco en opciones aptas para diabéticos y bajas en carbohidratos siempre incluidas), alojamiento, agenda de eventos, atracciones, presupuesto orientativo y consejos para familias.

Cada sección debe tener su propio título y contenido, ambos traducibles dinámicamente.

El menú de navegación y todos los botones deben usar las mismas clases e IDs que en index.html para que la traducción y la experiencia sean consistentes.

Todos los enlaces internos (a otras ciudades/mapa/etc.) deben funcionar igual y mantenerse en el idioma seleccionado.

El diseño, IDs y clases deben ser los mismos en todas las páginas de ciudad.

Si se agregan módulos adicionales (galería, comentarios, etc.), deben ubicarse después del contenido principal y antes de &lt;/body&gt;, siguiendo la misma lógica de integración que los módulos de la página principal.

14. Integración de MCP (Modelo de Contexto de Protocolo)
Los módulos MCP (conversor de moneda, traducción, mapas, etc.) deben estar en la carpeta /js/ (o en /components/ si usas React).

Cada módulo debe ser reutilizable y estar bien documentado.

La integración de MCP debe ser transparente para el usuario: los datos y funcionalidades se obtienen a través de MCP, no de APIs tradicionales.

Los módulos MCP deben funcionar tanto online como offline (usando caché local cuando sea necesario).

Documentar en README o en la carpeta /docs/ cómo se integra y configura cada módulo MCP.

Si hay dudas sobre cómo o dónde integrar MCP, consultar antes de avanzar.

Hola, vamos a continuar trabajando en la aplicación "Aventura Familiar por Argentina".

**Resumen del Estado Actual y Funcionalidades Clave:**

1.  **Propósito Principal:** Aplicación de itinerario de viaje familiar por Argentina, mostrando información detallada de ciudades, mapas, y ofreciendo herramientas útiles.
2.  **Idiomas Soportados:** Español (ES) y Hebreo (HE), con cambio dinámico.
3.  **Monedas Soportadas:** ARS, USD, EUR, ILS, con conversión de precios (usando Polygon.io y caché local/localStorage).
4.  **Estructura de Navegación:**
    *   Página Principal (`HomePage.tsx`): Muestra tarjetas de ciudades, mapa interactivo general, tabla de transportes, lista de equipaje, consulta general a IA y conversor de moneda.
    *   Página de Detalle de Ciudad (`CityDetailPage.tsx`): Muestra información específica de una ciudad (descripción, imperdibles, actividades, gastronomía, alojamiento, presupuesto, mapa de la ciudad con POIs, consejos, etc.) y consultas específicas a IA para esa ciudad.
5.  **Componentes Reutilizables:** `TopBar.tsx`, `Footer.tsx`, `CityCard.tsx`, `InteractiveMap.tsx`.
6.  **Datos Principales (`constants.ts`):**
    *   `CITIES`: Array de objetos `City` con detalles, claves de traducción, imágenes, coordenadas y POIs.
    *   `translations`: Objeto con traducciones para ES y HE.
    *   `TRANSPORT_DATA`: Array con información de tramos de transporte.
    *   `AI_PROMPT_CONFIGS`: Configuración para los diferentes tipos de consulta a la IA en la página de detalle.
7.  **Tipos (`types.ts`):** Define las interfaces principales como `City`, `Language`, `Currency`, `PackingItem`, `PointOfInterest`, `AppContextType`, `TransportLeg`, `AIPromptContent`, `AIResponseType`.
8.  **Funcionalidades Destacadas:**
    *   **Mapas Interactivos (Leaflet):** Mapa general en `HomePage` y mapa específico con POIs en `CityDetailPage`.
    *   **Lista de Equipaje:** Interactiva, con tipos "esencial" y "opcional", guardada en `localStorage`.
    *   **Integración con Gemini API (`apiService.ts`):**
        *   Consulta general en `HomePage`.
        *   Consultas específicas (menú, alojamiento, consejos familiares, análisis de presupuesto) en `CityDetailPage`, con posibilidad de traducir la respuesta.
    *   **Conversor de Moneda:** En `HomePage`, usa `apiService.ts` para obtener tasas de Polygon.io o caché.
    *   **Tabla de Transporte:** Muestra precios convertidos a la moneda global seleccionada.
    *   **Análisis del Itinerario:** Sección en `HomePage` que resume duraciones y da consejos.
    *   **Offline First (PWA):** `sw.js` para cachear assets y `manifest.json` para PWA.
    *   **Diseño Responsivo:** Uso de TailwindCSS.
    *   **Persistencia:** Idioma, moneda y lista de equipaje se guardan en `localStorage`. Tasas de cambio también se cachean.
9.  **Últimos Cambios Importantes (si aplica, puedes rellenar esto):**
    *   [Ej: Se agregó la funcionalidad X]
    *   [Ej: Se modificó el estilo de Y]

**Mi Próxima Solicitud:**
[Aquí describe tu nueva petición, por ejemplo: "Quiero agregar una nueva ciudad llamada 'Ushuaia' con su información básica y una imagen." o "Necesito modificar el estilo del encabezado para que sea más grande."]

**Archivos del Proyecto (si hay cambios desde la última vez o para asegurar que tienes la última versión):**
--- START OF FILE index.tsx ---
... (contenido) ...
--- END OF FILE index.tsx ---
--- START OF FILE constants.ts ---
... (contenido) ...
--- END OF FILE constants.ts ---
... (y así sucesivamente para todos los archivos relevantes) ...

16. Ciudades y destinos incluidos
Buenos Aires

Rosario

Bariloche

Mendoza

Malargüe

Jujuy

Iguazú

Corrientes

Iberá

Mapa Interactivo

IMPORTANTE:

Toda nueva instrucción debe agregarse en este archivo, bajo el tema correspondiente.

Si tienes dudas o surge un conflicto entre pedidos, CONSÚLTALO antes de decidir.</textarea><div class="CodeMirror cm-s-default CodeMirror-wrap" bis_skin_checked="1" style="font-size: 13px; width: 961px; margin-top: 43px; height: 915px; display: block;"><div style="overflow: hidden; position: relative; width: 3px; height: 0px; top: 649.203px; left: 64px;" bis_skin_checked="1"><textarea autocorrect="off" autocapitalize="off" spellcheck="false" style="position: absolute; padding: 0px; width: 1000px; height: 1em; outline: none;" tabindex="0"></textarea></div><div class="CodeMirror-vscrollbar" cm-not-content="true" style="display: block; bottom: 0px;" bis_skin_checked="1"><div style="min-width: 1px; height: 9671px;" bis_skin_checked="1"></div></div><div class="CodeMirror-hscrollbar" cm-not-content="true" bis_skin_checked="1"><div bis_skin_checked="1" style="height: 100%; min-height: 1px; width: 0px;"></div></div><div class="CodeMirror-scrollbar-filler" cm-not-content="true" bis_skin_checked="1"></div><div class="CodeMirror-gutter-filler" cm-not-content="true" bis_skin_checked="1"></div><div class="CodeMirror-scroll" tabindex="-1" bis_skin_checked="1"><div class="CodeMirror-sizer" style="margin-left: 52px; margin-bottom: -7px; border-right-width: 23px; min-height: 9668px; padding-right: 7px; padding-bottom: 0px;" bis_skin_checked="1"><div style="position: relative; top: 2456.02px;" bis_skin_checked="1"><div class="CodeMirror-lines" bis_skin_checked="1"><div style="position: relative; outline: none;" bis_skin_checked="1"><div class="CodeMirror-measure" bis_skin_checked="1"><pre>x</pre></div><div class="CodeMirror-measure" bis_skin_checked="1"></div><div style="position: relative; z-index: 1;" bis_skin_checked="1"></div><div class="CodeMirror-cursors" bis_skin_checked="1" style="visibility: hidden;"><div class="CodeMirror-cursor" bis_skin_checked="1" style="left: 12px; top: 1029.19px; height: 23.3906px;">&nbsp;</div></div><div class="CodeMirror-code" style="" bis_skin_checked="1"><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">101</div></div><pre class=""><span style="padding-right: 0.1px;">Soporte para texto de derecha a izquierda <span class="cm-strong">**(RTL)**</span> para hebreo.</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">102</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">103</div></div><pre class=""><span style="padding-right: 0.1px;"><span class="cm-cm-overlay cm-matchhighlight">El</span> botón de idioma (<span class="cm-comment">`'ai_translate_button_text'`</span>) seleccionado aparece en negrita o destacado igual en todas las páginas.</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">104</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">105</div></div><pre class=""><span style="padding-right: 0.1px;"><span class="cm-strong">**Al navegar o cambiar idioma/moneda, toda la navegación y los contenidos se mantienen en ese idioma y moneda.</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">106</div></div><pre class=""><span style="padding-right: 0.1px;"><span class="cm-strong cm-quote cm-quote-1">&gt; Ejemplo: si el usuario está en hebreo y pulsa "⬅ Volver al itinerario", debe seguir en hebreo.**</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">107</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">108</div></div><pre class=""><span style="padding-right: 0.1px;"><span class="cm-variable-2">5. Traducción dinámica y multilenguaje</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">109</div></div><pre class=""><span style="padding-right: 0.1px;">Todos los textos, botones, títulos, placeholders y mensajes de error deben ser traducibles dinámicamente según el idioma elegido.</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">110</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">111</div></div><pre class=""><span style="padding-right: 0.1px;"><span class="cm-cm-overlay cm-matchhighlight">El</span> diccionario de traducción debe incluir todas las cadenas de texto del contenido .</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">112</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">113</div></div><pre class=""><span style="padding-right: 0.1px;"><span class="cm-cm-overlay cm-matchhighlight">El</span> selector de idioma debe cambiar textos y enlaces al idioma correspondiente.</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">114</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">115</div></div><pre class=""><span style="padding-right: 0.1px;">Al navegar, la selección de idioma se mantiene .</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">116</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">117</div></div><pre class=""><span style="padding-right: 0.1px;">Todos los IDs y clases deben ser iguales para que la traducción funcione en todas las páginas.</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">118</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">119</div></div><pre class=""><span style="padding-right: 0.1px;">Los ítems de la lista de equipaje y textos de módulos interactivos se traducen automáticamente al cambiar el idioma.</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">120</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">121</div></div><pre class=""><span style="padding-right: 0.1px;">La IA responde en el idioma en que se hace la pregunta.</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">122</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">123</div></div><pre class=""><span style="padding-right: 0.1px;">No depender de servicios de traducción online ni recursos externos para textos o scripts críticos.</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">124</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">125</div></div><pre class=""><span style="padding-right: 0.1px;"><span class="cm-cm-overlay cm-matchhighlight">El</span> sitio debe seguir funcionando igual sin conexión a internet.</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">126</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">127</div></div><pre class=""><span style="padding-right: 0.1px;"><span class="cm-variable-2">6. Herramientas interactivas y módulos especiales</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">128</div></div><pre class=""><span style="padding-right: 0.1px;">6.1 Conversor de moneda</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">129</div></div><pre class=""><span style="padding-right: 0.1px;">Conversor interactivo moderno, ubicado al final de index.html (antes de <span class="cm-tag">&lt;/body&gt;</span>), con tasas reales y actualización diaria (Polygon.io o exchangerate.host).</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">130</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">131</div></div><pre class=""><span style="padding-right: 0.1px;">Conversor clásico en la tabla sigue funcionando con ARS/USD/ILS/EUR.</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">132</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">133</div></div><pre class=""><span style="padding-right: 0.1px;">Si el par directo no está disponible, la conversión se realiza usando USD como intermediario (ejemplo: ARS → USD → ILS).</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">134</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">135</div></div><pre class=""><span style="padding-right: 0.1px;">Solo monedas ARS, USD, EUR, ILS.</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">136</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">137</div></div><pre class=""><span style="padding-right: 0.1px;"><span class="cm-cm-overlay cm-matchhighlight">El</span> resultado de la conversión debe ser claro y visible.</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">138</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">139</div></div><pre class=""><span style="padding-right: 0.1px;">6.2 Lista de equipaje</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">140</div></div><pre class=""><span style="padding-right: 0.1px;">Lista con esenciales y opcionales (selector para agregar ítems en la lista correspondiente).</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">141</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">142</div></div><pre class=""><span style="padding-right: 0.1px;">Agregar ítems traduce automáticamente al cambiar de idioma.</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">143</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div class="CodeMirror-activeline" bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-activeline-background CodeMirror-linebackground" bis_skin_checked="1"></div><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">144</div></div><pre class=""><span style="padding-right: 0.1px;"><span class="cm-cm-overlay cm-matchhighlight">El</span> botón para agregar ítems debe ser visible y traducido.</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">145</div></div><pre class=""><span style="padding-right: 0.1px;">Incluira opcion de borrar  y check list &amp;radic;</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">146</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">147</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">148</div></div><pre class=""><span style="padding-right: 0.1px;"> &nbsp;  <span class="cm-comment">`};</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">149</div></div><pre class=""><span style="padding-right: 0.1px;"><span class="cm-cm-overlay cm-trailingspace"> &nbsp;  </span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">150</div></div><pre class=""><span style="padding-right: 0.1px;"> &nbsp; &nbsp;  <span class="cm-comment">const toggleItem = (id) =&gt; {</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">151</div></div><pre class=""><span style="padding-right: 0.1px;"> &nbsp; &nbsp; &nbsp;  <span class="cm-comment">setItems(items.map(item =&gt;</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">152</div></div><pre class=""><span style="padding-right: 0.1px;"> &nbsp; &nbsp; &nbsp; &nbsp;  <span class="cm-comment">item.id === id ? { ...item, checked: !item.checked } : item</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">153</div></div><pre class=""><span style="padding-right: 0.1px;"> &nbsp; &nbsp; &nbsp;  <span class="cm-comment">));</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">154</div></div><pre class=""><span style="padding-right: 0.1px;"> &nbsp; &nbsp;  <span class="cm-comment">};</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">155</div></div><pre class=""><span style="padding-right: 0.1px;"><span class="cm-cm-overlay cm-trailingspace"> &nbsp;  </span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">156</div></div><pre class=""><span style="padding-right: 0.1px;"> &nbsp; &nbsp;  <span class="cm-comment">const deleteItem = (id) =&gt; {</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">157</div></div><pre class=""><span style="padding-right: 0.1px;"> &nbsp; &nbsp; &nbsp;  <span class="cm-comment">setItems(items.filter(item =&gt; item.id !== id));</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">158</div></div><pre class=""><span style="padding-right: 0.1px;"> &nbsp; &nbsp;  <span class="cm-comment">};`</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">159</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">160</div></div><pre class=""><span style="padding-right: 0.1px;">Ideal: persistencia usando localStorage para que no se pierda la lista al recargar.</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">161</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">162</div></div><pre class=""><span style="padding-right: 0.1px;">Debe haber siempre la posibilidad de borrar ítems de la lista.</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">163</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">164</div></div><pre class=""><span style="padding-right: 0.1px;">6.3 Consulta a IA</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">165</div></div><pre class=""><span style="padding-right: 0.1px;">Módulo de consulta a IA experto en viajes familiares en Argentina, al final de index.html.</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">166</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">167</div></div><pre class=""><span style="padding-right: 0.1px;">Puede ser mock (respuesta simulada) o conectado a Pyrefly o una API real.</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">168</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">169</div></div><pre class=""><span style="padding-right: 0.1px;"><span class="cm-cm-overlay cm-matchhighlight">El</span> botón de consulta queda deshabilitado mientras responde.</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -52px; width: 51px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 23px;">170</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div></div></div></div></div></div><div style="position: absolute; height: 23px; width: 1px; top: 9668px;" bis_skin_checked="1"></div><div class="CodeMirror-gutters" style="height: 9691px;" bis_skin_checked="1"><div class="CodeMirror-gutter CodeMirror-linenumbers" style="width: 31px;" bis_skin_checked="1"></div><div class="CodeMirror-gutter CodeMirror-foldgutter" bis_skin_checked="1"></div></div></div></div><a href="javascript:;" class="fa fa-close editormd-preview-close-btn" style="display: none;"></a>

<div class="editormd-preview" bis_skin_checked="1" style="display: block; width: 960px; top: 42px; height: 915px; background: rgb(255, 255, 255); position: absolute;"><div class="markdown-body editormd-preview-container" bis_skin_checked="1" previewcontainer="true" style="padding: 20px;"><p>RESUMEN_PEDIDOS: Organización y lineamientos del proyecto despues de perder informacion<br>Este archivo contiene TODAS las reglas y lineamientos para el desarrollo y edición del proyecto Argentina Aventura Familiar de 30 Días.</p>
<ol>
<li>Objetivo y alcance<br>Documentar y organizar un viaje familiar de un mes por Argentina, orientado a familias (pareja + 2 hijos) con información en español y hebreo.</li></ol>
<p>El itinerario debe incluir destinos principales, duración en cada lugar, actividades clave, sugerencias de alojamiento y transporte.</p>
<p>El enfoque está en la comodidad, seguridad y variedad de experiencias familiares (actividades y alojamientos pensados para familias).</p>
<p>Para opciones de comida, priorizar alternativas aptas para diabéticos y bajas en carbohidratos (sin gluten si es posible), sin excluir otras, pero siempre cubriendo esas necesidades.</p>
<p>El proyecto debe funcionar tanto online como offline, en cualquier navegador (especialmente móviles y tablets Android).</p>
<p>El idioma principal del proyecto es español y el secundario es hebreo.</p>
<ol>
<li>Estructura del proyecto y carpetas<br>.<br>├── components/<br>│   ├── CityCard.tsx<br>│   ├── Footer.tsx<br>│   ├── InteractiveMap.tsx<br>│   └── TopBar.tsx<br>├── docs/<br>│   ├── agenda/<br>│   │   └── <a href="mailto:ariflier1970@gmail.com.ical">ariflier1970@gmail.com.ical</a>.zip (Referenciado, no provisto)<br>│   └── imagenes/<br>│       ├── bariloche/<br>│       │   └── emilio-lujan-HhobdGoYzaA-unsplash.jpg<br>│       ├── buenosaires/<br>│       │   └── buenosaires.jpg<br>│       ├── corrientes/<br>│       │   └── fachy-marin-A5xJay6N_fI-unsplash.jpg<br>│       ├── ibera/<br>│       │   └── snapsaga-DMVuTOv5Vys-unsplash.jpg<br>│       ├── iguazu/<br>│       │   └── claudio-mota-R9ZvATRLDSk-unsplash.jpg<br>│       ├── jujuy/<br>│       │   └── julieta-acosta-u4GAAc-myrg-unsplash.jpg<br>│       ├── malargue/<br>│       │   └── Malargue-Argentina.jpg<br>│       ├── mendoza/<br>│       │   └── Mendoza-Puente-del-Inca.jpg<br>│       └── rosario/<br>│           └── Monumento-a-la-Bandera-1024x768.jpg<br>├── icons/ (Referenciados en manifest.json, no provistos directamente pero definidos)<br>│   ├── icon-72x72.png<br>│   ├── icon-96x96.png<br>│   ├── icon-128x128.png<br>│   ├── icon-144x144.png<br>│   ├── icon-152x152.png<br>│   ├── icon-192x192.png<br>│   ├── icon-384x384.png<br>│   └── icon-512x512.png<br>├── pages/<br>│   ├── CityDetailPage.tsx<br>│   └── HomePage.tsx<br>├── services/<br>│   └── apiService.ts<br>├── utils/<br>│   └── markdownParser.ts<br>├── App.tsx<br>├── constants.ts<br>├── index.html<br>├── index.tsx<br>├── manifest.json<br>├── metadata.json<br>├── sw.js<br>└── types.ts</li></ol>
<p>Las imágenes te las voy a pasar por medio de un link que compartire de Google Drive.</p>
<p>Por ejemplo la imagen para Bariloche sera <a href="https://drive.google.com/file/d/1xAFu-3SicDoAbH_Bj5FRtdWgQmm7LfFk/view?usp=drive_link">https://drive.google.com/file/d/1xAFu-3SicDoAbH_Bj5FRtdWgQmm7LfFk/view?usp=drive_link</a></p>
<ol>
<li>Reglas de entrega y edición de archivos</li></ol>
<p>Al corregir, integrar o agregar módulos, conservar toda la estructura y contenido previo (solo agregar o modificar lo necesario).</p>
<p>Si surge un conflicto entre pedidos, consultar antes de decidir.</p>
<p>Todas las instrucciones y archivos deben estar en castellano.</p>
<ol>
<li>Consistencia visual y funcional<br>Barra fija arriba a la derecha con botones de idioma y botón “⬅ Volver al itinerario”.</li></ol>
<p>Mismo diseño, estructura y clases para los botones en todas las páginas.</p>
<p>Menú de navegación y enlaces internos consistentes y sincronizados (ciudades, mapa, volver).</p>
<p>Foto de portada en cada ciudad desde Google Drive.</p>
<p>Estructura igual en todas las ciudades (incluyendo IDs y clases para traducción y funcionalidades).</p>
<p>La selección de idioma y moneda debe mantenerse al navegar .</p>
<p>Todos los textos de botones y enlaces deben ser <strong>traducibles dinámicamente</strong>.</p>
<p>Soporte para texto de derecha a izquierda <strong>(RTL)</strong> para hebreo.</p>
<p>El botón de idioma (<code>'ai_translate_button_text'</code>) seleccionado aparece en negrita o destacado igual en todas las páginas.</p>
<p>**Al navegar o cambiar idioma/moneda, toda la navegación y los contenidos se mantienen en ese idioma y moneda.</p>
<blockquote>
<p>Ejemplo: si el usuario está en hebreo y pulsa “⬅ Volver al itinerario”, debe seguir en hebreo.**</p>
</blockquote>
<ol>
<li>Traducción dinámica y multilenguaje<br>Todos los textos, botones, títulos, placeholders y mensajes de error deben ser traducibles dinámicamente según el idioma elegido.</li></ol>
<p>El diccionario de traducción debe incluir todas las cadenas de texto del contenido .</p>
<p>El selector de idioma debe cambiar textos y enlaces al idioma correspondiente.</p>
<p>Al navegar, la selección de idioma se mantiene .</p>
<p>Todos los IDs y clases deben ser iguales para que la traducción funcione en todas las páginas.</p>
<p>Los ítems de la lista de equipaje y textos de módulos interactivos se traducen automáticamente al cambiar el idioma.</p>
<p>La IA responde en el idioma en que se hace la pregunta.</p>
<p>No depender de servicios de traducción online ni recursos externos para textos o scripts críticos.</p>
<p>El sitio debe seguir funcionando igual sin conexión a internet.</p>
<ol>
<li>Herramientas interactivas y módulos especiales<br>6.1 Conversor de moneda<br>Conversor interactivo moderno, ubicado al final de index.html (antes de ), con tasas reales y actualización diaria (Polygon.io o exchangerate.host).</li></ol>
<p>Conversor clásico en la tabla sigue funcionando con ARS/USD/ILS/EUR.</p>
<p>Si el par directo no está disponible, la conversión se realiza usando USD como intermediario (ejemplo: ARS → USD → ILS).</p>
<p>Solo monedas ARS, USD, EUR, ILS.</p>
<p>El resultado de la conversión debe ser claro y visible.</p>
<p>6.2 Lista de equipaje<br>Lista con esenciales y opcionales (selector para agregar ítems en la lista correspondiente).</p>
<p>Agregar ítems traduce automáticamente al cambiar de idioma.</p>
<p>El botón para agregar ítems debe ser visible y traducido.<br>Incluira opcion de borrar  y check list √</p>
<pre class="prettyprint linenums prettyprinted" style=""><ol class="linenums"><li class="L0"><code><span class="str">`};</span></code></li><li class="L1"><code></code></li><li class="L2"><code><span class="str">  const toggleItem = (id) =&gt; {</span></code></li><li class="L3"><code><span class="str">    setItems(items.map(item =&gt;</span></code></li><li class="L4"><code><span class="str">      item.id === id ? { ...item, checked: !item.checked } : item</span></code></li><li class="L5"><code><span class="str">    ));</span></code></li><li class="L6"><code><span class="str">  };</span></code></li><li class="L7"><code></code></li><li class="L8"><code><span class="str">  const deleteItem = (id) =&gt; {</span></code></li><li class="L9"><code><span class="str">    setItems(items.filter(item =&gt; item.id !== id));</span></code></li><li class="L0"><code><span class="str">  };`</span></code></li></ol></pre><p>Ideal: persistencia usando localStorage para que no se pierda la lista al recargar.</p>
<p>Debe haber siempre la posibilidad de borrar ítems de la lista.</p>
<p>6.3 Consulta a IA<br>Módulo de consulta a IA experto en viajes familiares en Argentina, al final de index.html.</p>
<p>Puede ser mock (respuesta simulada) o conectado a Pyrefly o una API real.</p>
<p>El botón de consulta queda deshabilitado mientras responde.</p>
<p>Manejo de errores: si la IA falla, mostrar mensaje claro en el idioma actual y no debe quedarse colgado.</p>
<p>Traducción consistente de todos los textos y errores de IA.</p>
<p>La respuesta debe mostrarse en el idioma de la pregunta.</p>
<ol>
<li>Reglas para imágenes<br>El nombre del archivo de la imagen NO necesariamente será el nombre de la ciudad en minúsculas, sin espacios ni tildes y extensión .jpg.<br>Lo importante es que esté dentro de docs/imagenes/[ciudad]/ correspondiente.</li></ol>
<p>Descargar imágenes libres de Unsplash o equivalentes para cada ciudad.</p>
<p>No depender de imágenes de servicios externos en producción.</p>
<ol>
<li>Organización de datos y documentación<br>Guardar los Excel/CSV fuente en subcarpetas específicas por temática en docs/.</li></ol>
<p>Si la app consume datos, agregar una carpeta /data con versiones en JSON.</p>
<p>README(s) en Markdown explicando el propósito de cada carpeta y archivo.</p>
<p>Mantener documentación clara y actualizada en docs/.</p>
<p>No crear carpetas vacías: si es necesario, agregar un archivo .gitkeep.</p>
<p>Los archivos de información y contenido principal (.md, .html) de cada ciudad van juntos en ciudades/.</p>
<p>Todos los recursos multimedia y documentos adjuntos en docs/imagenes/[ciudad]/, docs/agenda/[ciudad]/, o docs/recursos/ según corresponda.</p>
<p>La agenda general del viaje debe estar en docs/agenda/ en formato .ics, .ical y/o comprimido (.zip) según corresponda.</p>
<ol>
<li>Sincronización y enriquecimiento de contenidos<br>Cada sección importante de la ciudad en su archivo .md debe reflejarse y ampliarse en la carpeta correspondiente en docs/.</li></ol>
<p>Las secciones de ciudad deben estar sincronizadas entre los .html, .md y la documentación en docs/.</p>
<p>Por ejemplo, “Agenda de eventos” debe estar tanto en la página de la ciudad como en docs/agenda/[ciudad]/README.md.</p>
<p>Las agendas de eventos de cada ciudad deben mostrar SOLO eventos relevantes para las fechas en que la familia estará en esa ciudad.</p>
<ol>
<li>Centralización de idioma y moneda<br>El estado de idioma y moneda debe manejarse globalmente (centralizado, por localStorage, querystring o contexto global).</li></ol>
<p>Cambiar idioma no afecta la conversión de moneda y viceversa.</p>
<p>Los selectores de idioma y moneda usan la misma lógica y clases activas en todas las páginas.</p>
<p>Al navegar o cambiar idioma/moneda, toda la navegación y los contenidos se mantienen en ese idioma y moneda.<br>Ejemplo: Si el usuario está en hebreo y pulsa “⬅ Volver al itinerario”, debe seguir en hebreo.</p>
<ol>
<li>Propuestas y buenas prácticas (futuras/mejoras)<br>Integrar APIs/MCP de tipo de cambio, reservas, mapas, etc.</li></ol>
<p>Formularios para agregar notas y gastos diarios.</p>
<p>Visualización de presupuesto con tablas, tarjetas, o gráficos.</p>
<p>Documentar scripts de automatización de datos.</p>
<p>Internacionalización: README en español, inglés y hebreo.</p>
<p>Sincronizar eventos automáticamente con tu archivo de ciudades.</p>
<p>Mejorar UI: más íconos, colores por tipo, edición de reservas, exportar PDF, etc.</p>
<p>Permitir agregar eventos personalizados.</p>
<p>Separar frontend y documentación/datos para mayor escalabilidad.</p>
<p>Usar scripts para automatizar conversiones de Excel/CSV a JSON, etc.</p>
<p>Centralizar traducciones en archivos JSON independientes.</p>
<p>Implementar tests, optimización de imágenes, y mejoras de accesibilidad.</p>
<p>Agregar una página tipo blog, con posibilidad de subir fotos desde cuentas Gmail. Las cuentas se sincronizan con el proyecto, pero el usuario puede elegir qué fotos mostrar.</p>
<ol>
<li>Estructura de las páginas<br>13.1 index.html (página principal)<br>Es la página principal del itinerario del viaje y debe contener:</li></ol>
<p>Barra superior fija a la derecha con selectores de idioma y moneda, usando las mismas clases y estructura para los botones en todas las páginas.</p>
<p>Título principal y bienvenida.</p>
<p>Cada ciudad debe mostrarse como una tarjeta (card) con imagen, nombre, descripción y botón “Explorar más detalles”.</p>
<p>El código para la tarjeta de ciudad está en components/CityCard.tsx. Esta tarjeta muestra una imagen, el nombre de la ciudad, una breve descripción y un botón para explorar más detalles.</p>
<p>Cuando haces clic en el botón “Explorar más detalles”, se usa un componente <link> de react-router-dom que dirige a una URL específica para esa ciudad (ej: /city/buenosaires).</p>
<p>El archivo App.tsx configura las rutas de la app. Hay una ruta tipo <route path="/city/:cityId" element="{&lt;CityDetailPage"></route>} /&gt;.</p>
<p>Cuando navegas a esa URL, el componente pages/CityDetailPage.tsx se renderiza. Usa useParams de react-router-dom para obtener el cityId de la URL y busca la información de la ciudad en el array CITIES de constants.ts.</p>
<p>Tabla de transporte entre ciudades, con nombres de compañías como enlace (sin columna web).</p>
<p>(Opcional) Sección de atracciones destacadas según corresponda.</p>
<p>Módulos interactivos al final (antes de ): conversor de moneda moderno, lista de equipaje, y consulta a IA, todos integrados y funcionando.</p>
<p>Traducción dinámica de textos y soporte multilenguaje para todos los componentes y módulos.</p>
<p>Consistencia visual y funcional en todos los elementos y botones.</p>
<p>Al hacer clic en “⬅ Volver al itinerario” desde cualquier página de ciudad, debe retornar a index.html.</p>
<p>13.2 Páginas de ciudad (ejemplo: ciudades/rosario.html)<br>Cada página de ciudad debe tener la siguiente estructura:</p>
<p>Barra superior fija arriba a la derecha, con el mismo diseño y funcionalidad que en index.html: botones de idioma, y botón “⬅ Volver al itinerario” (link a /index.html).</p>
<p>Título con el nombre de la ciudad, traducido dinámicamente.</p>
<p>Foto de portada correspondiente, cargada desde docs/imagenes/[ciudad]/[imagen].jpg (nombre libre).</p>
<p>Secciones principales: breve introducción, actividades recomendadas, gastronomía (con foco en opciones aptas para diabéticos y bajas en carbohidratos siempre incluidas), alojamiento, agenda de eventos, atracciones, presupuesto orientativo y consejos para familias.</p>
<p>Cada sección debe tener su propio título y contenido, ambos traducibles dinámicamente.</p>
<p>El menú de navegación y todos los botones deben usar las mismas clases e IDs que en index.html para que la traducción y la experiencia sean consistentes.</p>
<p>Todos los enlaces internos (a otras ciudades/mapa/etc.) deben funcionar igual y mantenerse en el idioma seleccionado.</p>
<p>El diseño, IDs y clases deben ser los mismos en todas las páginas de ciudad.</p>
<p>Si se agregan módulos adicionales (galería, comentarios, etc.), deben ubicarse después del contenido principal y antes de , siguiendo la misma lógica de integración que los módulos de la página principal.</p>
<ol>
<li>Integración de MCP (Modelo de Contexto de Protocolo)<br>Los módulos MCP (conversor de moneda, traducción, mapas, etc.) deben estar en la carpeta /js/ (o en /components/ si usas React).</li></ol>
<p>Cada módulo debe ser reutilizable y estar bien documentado.</p>
<p>La integración de MCP debe ser transparente para el usuario: los datos y funcionalidades se obtienen a través de MCP, no de APIs tradicionales.</p>
<p>Los módulos MCP deben funcionar tanto online como offline (usando caché local cuando sea necesario).</p>
<p>Documentar en README o en la carpeta /docs/ cómo se integra y configura cada módulo MCP.</p>
<p>Si hay dudas sobre cómo o dónde integrar MCP, consultar antes de avanzar.</p>
<p>Hola, vamos a continuar trabajando en la aplicación “Aventura Familiar por Argentina”.</p>
<p><strong>Resumen del Estado Actual y Funcionalidades Clave:</strong></p>
<ol>
<li><strong>Propósito Principal:</strong> Aplicación de itinerario de viaje familiar por Argentina, mostrando información detallada de ciudades, mapas, y ofreciendo herramientas útiles.</li><li><strong>Idiomas Soportados:</strong> Español (ES) y Hebreo (HE), con cambio dinámico.</li><li><strong>Monedas Soportadas:</strong> ARS, USD, EUR, ILS, con conversión de precios (usando Polygon.io y caché local/localStorage).</li><li><strong>Estructura de Navegación:</strong><ul>
<li>Página Principal (<code>HomePage.tsx</code>): Muestra tarjetas de ciudades, mapa interactivo general, tabla de transportes, lista de equipaje, consulta general a IA y conversor de moneda.</li><li>Página de Detalle de Ciudad (<code>CityDetailPage.tsx</code>): Muestra información específica de una ciudad (descripción, imperdibles, actividades, gastronomía, alojamiento, presupuesto, mapa de la ciudad con POIs, consejos, etc.) y consultas específicas a IA para esa ciudad.</li></ul>
</li><li><strong>Componentes Reutilizables:</strong> <code>TopBar.tsx</code>, <code>Footer.tsx</code>, <code>CityCard.tsx</code>, <code>InteractiveMap.tsx</code>.</li><li><strong>Datos Principales (<code>constants.ts</code>):</strong><ul>
<li><code>CITIES</code>: Array de objetos <code>City</code> con detalles, claves de traducción, imágenes, coordenadas y POIs.</li><li><code>translations</code>: Objeto con traducciones para ES y HE.</li><li><code>TRANSPORT_DATA</code>: Array con información de tramos de transporte.</li><li><code>AI_PROMPT_CONFIGS</code>: Configuración para los diferentes tipos de consulta a la IA en la página de detalle.</li></ul>
</li><li><strong>Tipos (<code>types.ts</code>):</strong> Define las interfaces principales como <code>City</code>, <code>Language</code>, <code>Currency</code>, <code>PackingItem</code>, <code>PointOfInterest</code>, <code>AppContextType</code>, <code>TransportLeg</code>, <code>AIPromptContent</code>, <code>AIResponseType</code>.</li><li><strong>Funcionalidades Destacadas:</strong><ul>
<li><strong>Mapas Interactivos (Leaflet):</strong> Mapa general en <code>HomePage</code> y mapa específico con POIs en <code>CityDetailPage</code>.</li><li><strong>Lista de Equipaje:</strong> Interactiva, con tipos “esencial” y “opcional”, guardada en <code>localStorage</code>.</li><li><strong>Integración con Gemini API (<code>apiService.ts</code>):</strong><ul>
<li>Consulta general en <code>HomePage</code>.</li><li>Consultas específicas (menú, alojamiento, consejos familiares, análisis de presupuesto) en <code>CityDetailPage</code>, con posibilidad de traducir la respuesta.</li></ul>
</li><li><strong>Conversor de Moneda:</strong> En <code>HomePage</code>, usa <code>apiService.ts</code> para obtener tasas de Polygon.io o caché.</li><li><strong>Tabla de Transporte:</strong> Muestra precios convertidos a la moneda global seleccionada.</li><li><strong>Análisis del Itinerario:</strong> Sección en <code>HomePage</code> que resume duraciones y da consejos.</li><li><strong>Offline First (PWA):</strong> <code>sw.js</code> para cachear assets y <code>manifest.json</code> para PWA.</li><li><strong>Diseño Responsivo:</strong> Uso de TailwindCSS.</li><li><strong>Persistencia:</strong> Idioma, moneda y lista de equipaje se guardan en <code>localStorage</code>. Tasas de cambio también se cachean.</li></ul>
</li><li><strong>Últimos Cambios Importantes (si aplica, puedes rellenar esto):</strong><ul>
<li>[Ej: Se agregó la funcionalidad X]</li><li>[Ej: Se modificó el estilo de Y]</li></ul>
</li></ol>
<p><strong>Mi Próxima Solicitud:</strong><br>[Aquí describe tu nueva petición, por ejemplo: “Quiero agregar una nueva ciudad llamada ‘Ushuaia’ con su información básica y una imagen.” o “Necesito modificar el estilo del encabezado para que sea más grande.”]</p>
<p><strong>Archivos del Proyecto (si hay cambios desde la última vez o para asegurar que tienes la última versión):</strong><br>—- START OF FILE index.tsx —-<br>… (contenido) …<br>—- END OF FILE index.tsx —-<br>—- START OF FILE constants.ts —-<br>… (contenido) …<br>—- END OF FILE constants.ts —-<br>… (y así sucesivamente para todos los archivos relevantes) …</p>
<ol>
<li>Ciudades y destinos incluidos<br>Buenos Aires</li></ol>
<p>Rosario</p>
<p>Bariloche</p>
<p>Mendoza</p>
<p>Malargüe</p>
<p>Jujuy</p>
<p>Iguazú</p>
<p>Corrientes</p>
<p>Iberá</p>
<p>Mapa Interactivo</p>
<p>IMPORTANTE:</p>
<p>Toda nueva instrucción debe agregarse en este archivo, bajo el tema correspondiente.</p>
<p>Si tienes dudas o surge un conflicto entre pedidos, CONSÚLTALO antes de decidir.</p>
</div></div>
<div class="editormd-container-mask" style="display: none;" bis_skin_checked="1"></div>
<div class="editormd-mask" bis_skin_checked="1" style="background-color: rgb(255, 255, 255); opacity: 0.1; z-index: 100012; display: none;"></div><div class="editormd-toolbar" bis_skin_checked="1" style="display: block; position: absolute; width: 100%; left: 0px;"><div class="editormd-toolbar-container" bis_skin_checked="1"><ul class="editormd-menu"><li><a href="javascript:;" title="Undo(Ctrl+Z)" unselectable="on"><i class="fa fa-undo" name="undo" unselectable="on"></i></a></li><li><a href="javascript:;" title="Redo(Ctrl+Y)" unselectable="on"><i class="fa fa-repeat" name="redo" unselectable="on"></i></a></li><li class="divider" unselectable="on">|</li><li><a href="javascript:;" title="Bold" unselectable="on"><i class="fa fa-bold" name="bold" unselectable="on"></i></a></li><li><a href="javascript:;" title="Strikethrough" unselectable="on"><i class="fa fa-strikethrough" name="del" unselectable="on"></i></a></li><li><a href="javascript:;" title="Italic" unselectable="on"><i class="fa fa-italic" name="italic" unselectable="on"></i></a></li><li><a href="javascript:;" title="Block quote" unselectable="on"><i class="fa fa-quote-left" name="quote" unselectable="on"></i></a></li><li><a href="javascript:;" title="Words first letter convert to uppercase" unselectable="on"><i class="fa" name="ucwords" style="font-size:20px;margin-top: -3px;">Aa</i></a></li><li><a href="javascript:;" title="Selection text convert to uppercase" unselectable="on"><i class="fa fa-font" name="uppercase" unselectable="on"></i></a></li><li><a href="javascript:;" title="Selection text convert to lowercase" unselectable="on"><i class="fa" name="lowercase" style="font-size:24px;margin-top: -10px;">a</i></a></li><li class="divider" unselectable="on">|</li><li><a href="javascript:;" title="Heading 1" unselectable="on"><i class="fa editormd-bold" name="h1" unselectable="on">H1</i></a></li><li><a href="javascript:;" title="Heading 2" unselectable="on"><i class="fa editormd-bold" name="h2" unselectable="on">H2</i></a></li><li><a href="javascript:;" title="Heading 3" unselectable="on"><i class="fa editormd-bold" name="h3" unselectable="on">H3</i></a></li><li><a href="javascript:;" title="Heading 4" unselectable="on"><i class="fa editormd-bold" name="h4" unselectable="on">H4</i></a></li><li><a href="javascript:;" title="Heading 5" unselectable="on"><i class="fa editormd-bold" name="h5" unselectable="on">H5</i></a></li><li><a href="javascript:;" title="Heading 6" unselectable="on"><i class="fa editormd-bold" name="h6" unselectable="on">H6</i></a></li><li class="divider" unselectable="on">|</li><li><a href="javascript:;" title="Unordered list" unselectable="on"><i class="fa fa-list-ul" name="list-ul" unselectable="on"></i></a></li><li><a href="javascript:;" title="Ordered list" unselectable="on"><i class="fa fa-list-ol" name="list-ol" unselectable="on"></i></a></li><li><a href="javascript:;" title="Horizontal rule" unselectable="on"><i class="fa fa-minus" name="hr" unselectable="on"></i></a></li><li class="divider" unselectable="on">|</li><li><a href="javascript:;" title="Link" unselectable="on"><i class="fa fa-link" name="link" unselectable="on"></i></a></li><li><a href="javascript:;" title="Reference link" unselectable="on"><i class="fa fa-anchor" name="reference-link" unselectable="on"></i></a></li><li><a href="javascript:;" title="Image" unselectable="on"><i class="fa fa-picture-o" name="image" unselectable="on"></i></a></li><li><a href="javascript:;" title="Code inline" unselectable="on"><i class="fa fa-code" name="code" unselectable="on"></i></a></li><li><a href="javascript:;" title="Preformatted text / Code block (Tab indent)" unselectable="on"><i class="fa fa-file-code-o" name="preformatted-text" unselectable="on"></i></a></li><li><a href="javascript:;" title="Code block (Multi-languages)" unselectable="on"><i class="fa fa-file-code-o" name="code-block" unselectable="on"></i></a></li><li><a href="javascript:;" title="Tables" unselectable="on"><i class="fa fa-table" name="table" unselectable="on"></i></a></li><li><a href="javascript:;" title="Datetime" unselectable="on"><i class="fa fa-clock-o" name="datetime" unselectable="on"></i></a></li><li><a href="javascript:;" title="Emoji" unselectable="on"><i class="fa fa-smile-o" name="emoji" unselectable="on"></i></a></li><li><a href="javascript:;" title="HTML Entities" unselectable="on"><i class="fa fa-copyright" name="html-entities" unselectable="on"></i></a></li><li><a href="javascript:;" title="Page break" unselectable="on"><i class="fa fa-newspaper-o" name="pagebreak" unselectable="on"></i></a></li><li class="divider" unselectable="on">|</li><li><a href="javascript:;" title="Goto line" unselectable="on"><i class="fa fa-terminal" name="goto-line" unselectable="on"></i></a></li><li><a href="javascript:;" title="Unwatch" unselectable="on"><i class="fa fa-eye-slash" name="watch" unselectable="on"></i></a></li><li><a href="javascript:;" title="HTML Preview (Press Shift + ESC exit)" unselectable="on"><i class="fa fa-desktop active" name="preview" unselectable="on"></i></a></li><li><a href="javascript:;" title="Fullscreen (Press ESC exit)" unselectable="on"><i class="fa fa-arrows-alt" name="fullscreen" unselectable="on"></i></a></li><li><a href="javascript:;" title="Clear" unselectable="on"><i class="fa fa-eraser" name="clear" unselectable="on"></i></a></li><li><a href="javascript:;" title="Search" unselectable="on"><i class="fa fa-search" name="search" unselectable="on"></i></a></li><li class="divider" unselectable="on">|</li><li><a href="javascript:;" title="Help" unselectable="on"><i class="fa fa-question-circle" name="help" unselectable="on"></i></a></li><li><a href="javascript:;" title="About Editor.md" unselectable="on"><i class="fa fa-info-circle" name="info" unselectable="on"></i></a></li></ul></div></div><div class="editormd-dialog editormd-image-dialog" id="editormd-image-dialog-1750520373281" bis_skin_checked="1" style="display: none; z-index: 99999; width: 380px; height: 254px; top: 351.5px; left: 766.5px;"><div class="editormd-dialog-header" style="cursor: move;" bis_skin_checked="1"><strong class="editormd-dialog-title">Image</strong></div><a href="javascript:;" class="fa fa-close editormd-dialog-close"></a><div class="editormd-dialog-container" bis_skin_checked="1"><div class="editormd-form" bis_skin_checked="1"><label>Address</label><input type="text" data-url=""><br><label>Title</label><input type="text" value="" data-alt=""><br><label>Link</label><input type="text" value="http://" data-link=""><br></div><div class="editormd-dialog-footer" bis_skin_checked="1"><button class="editormd-btn editormd-enter-btn">Enter</button><button class="editormd-btn editormd-cancel-btn">Cancel</button></div></div><div class="editormd-dialog-mask editormd-dialog-mask-bg" bis_skin_checked="1"></div><div class="editormd-dialog-mask editormd-dialog-mask-con" bis_skin_checked="1"></div></div><div class="editormd-dialog editormd-preformatted-text-dialog" bis_skin_checked="1" style="display: none; z-index: 100001; width: 780px; height: 540px; top: 208.5px; left: 566.5px;"><div class="editormd-dialog-header" style="cursor: move;" bis_skin_checked="1"><strong class="editormd-dialog-title">Preformatted text / Codes</strong></div><a href="javascript:;" class="fa fa-close editormd-dialog-close"></a><div class="editormd-dialog-container" bis_skin_checked="1"><textarea placeholder="coding now...." style="display:none;">lista de equipaje</textarea><div class="CodeMirror cm-s- CodeMirror-wrap CodeMirror-empty" bis_skin_checked="1" style="float: none; margin: 0px 0px 5px; border: 1px solid rgb(221, 221, 221); font-size: 13px; width: 100%; height: 410px;"><div style="overflow: hidden; position: relative; width: 3px; height: 0px; top: 5px; left: 61px;" bis_skin_checked="1"><textarea autocorrect="off" autocapitalize="off" spellcheck="false" style="position: absolute; padding: 0px; width: 1000px; height: 1em; outline: none;" tabindex="0"></textarea></div><div class="CodeMirror-vscrollbar" cm-not-content="true" bis_skin_checked="1"><div bis_skin_checked="1" style="min-width: 1px; height: 0px;"></div></div><div class="CodeMirror-hscrollbar" cm-not-content="true" bis_skin_checked="1"><div bis_skin_checked="1" style="height: 100%; min-height: 1px; width: 0px;"></div></div><div class="CodeMirror-scrollbar-filler" cm-not-content="true" bis_skin_checked="1"></div><div class="CodeMirror-gutter-filler" cm-not-content="true" bis_skin_checked="1"></div><div class="CodeMirror-scroll" tabindex="-1" bis_skin_checked="1"><div class="CodeMirror-sizer" style="margin-left: 48px; margin-bottom: -7px; border-right-width: 23px; min-height: 31px; padding-right: 0px; padding-bottom: 0px;" bis_skin_checked="1"><div style="position: relative; top: 0px;" bis_skin_checked="1"><div class="CodeMirror-lines" bis_skin_checked="1"><div style="position: relative; outline: none;" bis_skin_checked="1"><pre class="CodeMirror-placeholder" style="height: 0px; overflow: visible;">coding now....</pre><div class="CodeMirror-measure" bis_skin_checked="1"><pre><span>xxxxxxxxxx</span></pre><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1"><div bis_skin_checked="1">1</div></div><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1"><div bis_skin_checked="1">11</div></div><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1"><div bis_skin_checked="1">1</div></div></div><div class="CodeMirror-measure" bis_skin_checked="1"></div><div style="position: relative; z-index: 1;" bis_skin_checked="1"></div><div class="CodeMirror-cursors" bis_skin_checked="1" style=""><div class="CodeMirror-cursor" bis_skin_checked="1" style="left: 12px; top: 0px; height: 23.3906px;">&nbsp;</div></div><div class="CodeMirror-code" bis_skin_checked="1" style=""><div class="CodeMirror-activeline" bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-activeline-background CodeMirror-linebackground" bis_skin_checked="1"></div><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -48px; width: 48px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 20px;">1</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div></div></div></div></div></div><div style="position: absolute; height: 23px; width: 1px; top: 31px;" bis_skin_checked="1"></div><div class="CodeMirror-gutters" style="height: 428px;" bis_skin_checked="1"><div class="CodeMirror-gutter CodeMirror-linenumbers" style="width: 28px;" bis_skin_checked="1"></div><div class="CodeMirror-gutter CodeMirror-foldgutter" bis_skin_checked="1"></div></div></div></div><div class="editormd-dialog-footer" bis_skin_checked="1"><button class="editormd-btn editormd-enter-btn">Enter</button><button class="editormd-btn editormd-cancel-btn">Cancel</button></div></div><div class="editormd-dialog-mask editormd-dialog-mask-bg" bis_skin_checked="1"></div><div class="editormd-dialog-mask editormd-dialog-mask-con" bis_skin_checked="1"></div></div><div class="editormd-dialog editormd-code-block-dialog" bis_skin_checked="1" style="display: none; z-index: 100003; width: 780px; height: 565px; top: 196px; left: 566.5px;"><div class="editormd-dialog-header" style="cursor: move;" bis_skin_checked="1"><strong class="editormd-dialog-title">Code block</strong></div><a href="javascript:;" class="fa fa-close editormd-dialog-close"></a><div class="editormd-dialog-container" bis_skin_checked="1"><div class="editormd-code-toolbar" bis_skin_checked="1">Languages: <select><option selected="selected" value="">select a code language...</option><option value="asp" mode="vbscript">ASP</option><option value="actionscript" mode="clike">ActionScript(3.0)/Flash/Flex</option><option value="bash" mode="shell">Bash/Bat</option><option value="css" mode="css">CSS</option><option value="c" mode="clike">C</option><option value="cpp" mode="clike">C++</option><option value="csharp" mode="clike">C#</option><option value="coffeescript" mode="coffeescript">CoffeeScript</option><option value="d" mode="d">D</option><option value="dart" mode="dart">Dart</option><option value="delphi" mode="pascal">Delphi/Pascal</option><option value="erlang" mode="erlang">Erlang</option><option value="go" mode="go">Golang</option><option value="groovy" mode="groovy">Groovy</option><option value="html" mode="text/html">HTML</option><option value="java" mode="clike">Java</option><option value="json" mode="text/json">JSON</option><option value="javascript" mode="javascript">Javascript</option><option value="lua" mode="lua">Lua</option><option value="less" mode="css">LESS</option><option value="markdown" mode="gfm">Markdown</option><option value="objective-c" mode="clike">Objective-C</option><option value="php" mode="php">PHP</option><option value="perl" mode="perl">Perl</option><option value="python" mode="python">Python</option><option value="r" mode="r">R</option><option value="rst" mode="rst">reStructedText</option><option value="ruby" mode="ruby">Ruby</option><option value="sql" mode="sql">SQL</option><option value="sass" mode="sass">SASS/SCSS</option><option value="shell" mode="shell">Shell</option><option value="scala" mode="clike">Scala</option><option value="swift" mode="clike">Swift</option><option value="vb" mode="vb">VB/VBScript</option><option value="xml" mode="text/xml">XML</option><option value="yaml" mode="yaml">YAML</option><option value="other">Other languages</option></select></div><textarea placeholder="coding now...." style="display:none;">lista de equipaje</textarea><div class="CodeMirror cm-s- CodeMirror-wrap" bis_skin_checked="1" style="float: none; margin: 8px 0px; border: 1px solid rgb(221, 221, 221); font-size: 13px; width: 100%; height: 390px;"><div style="overflow: hidden; position: relative; width: 3px; height: 0px; top: 238.906px; left: 77.3438px;" bis_skin_checked="1"><textarea autocorrect="off" autocapitalize="off" spellcheck="false" style="position: absolute; padding: 0px; width: 1000px; height: 1em; outline: none;" tabindex="0"></textarea></div><div class="CodeMirror-vscrollbar" cm-not-content="true" bis_skin_checked="1"><div bis_skin_checked="1" style="min-width: 1px; height: 0px;"></div></div><div class="CodeMirror-hscrollbar" cm-not-content="true" bis_skin_checked="1"><div bis_skin_checked="1" style="height: 100%; min-height: 1px; width: 0px;"></div></div><div class="CodeMirror-scrollbar-filler" cm-not-content="true" bis_skin_checked="1"></div><div class="CodeMirror-gutter-filler" cm-not-content="true" bis_skin_checked="1"></div><div class="CodeMirror-scroll" tabindex="-1" bis_skin_checked="1"><div class="CodeMirror-sizer" style="margin-left: 48px; margin-bottom: -7px; border-right-width: 23px; min-height: 265px; padding-right: 0px; padding-bottom: 0px;" bis_skin_checked="1"><div style="position: relative; top: 0px;" bis_skin_checked="1"><div class="CodeMirror-lines" bis_skin_checked="1"><div style="position: relative; outline: none;" bis_skin_checked="1"><div class="CodeMirror-measure" bis_skin_checked="1"><pre><span>xxxxxxxxxx</span></pre><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1"><div bis_skin_checked="1">1</div></div><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1"><div bis_skin_checked="1">11</div></div></div><div class="CodeMirror-measure" bis_skin_checked="1"></div><div style="position: relative; z-index: 1;" bis_skin_checked="1"></div><div class="CodeMirror-cursors" bis_skin_checked="1" style="visibility: hidden;"><div class="CodeMirror-cursor" bis_skin_checked="1" style="left: 28.3438px; top: 233.906px; height: 23.3906px;">&nbsp;</div></div><div class="CodeMirror-code" bis_skin_checked="1" style=""><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -48px; width: 48px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 20px;">1</div></div><pre class=""><span style="padding-right: 0.1px;">};</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -48px; width: 48px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 20px;">2</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -48px; width: 48px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 20px;">3</div></div><pre class=""><span style="padding-right: 0.1px;">  <span class="cm-keyword">const</span> <span class="cm-variable">toggleItem</span> <span class="cm-operator">=</span> (<span class="cm-def">id</span>) <span class="cm-operator">=&gt;</span> {</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -48px; width: 48px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 20px;">4</div></div><pre class=""><span style="padding-right: 0.1px;"> &nbsp;  <span class="cm-variable">setItems</span>(<span class="cm-variable">items</span>.<span class="cm-property">map</span>(<span class="cm-def">item</span> <span class="cm-operator">=&gt;</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -48px; width: 48px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 20px;">5</div></div><pre class=""><span style="padding-right: 0.1px;"> &nbsp; &nbsp;  <span class="cm-variable-2">item</span>.<span class="cm-property">id</span> <span class="cm-operator">===</span> <span class="cm-variable-2">id</span> <span class="cm-operator">?</span> { <span class="cm-meta">...</span><span class="cm-variable-2">item</span>, <span class="cm-variable">checked</span>: <span class="cm-operator">!</span><span class="cm-variable-2">item</span>.<span class="cm-variable">checked</span> } : <span class="cm-variable-2">item</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -48px; width: 48px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 20px;">6</div></div><pre class=""><span style="padding-right: 0.1px;"> &nbsp;  ));</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -48px; width: 48px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 20px;">7</div></div><pre class=""><span style="padding-right: 0.1px;">  };</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -48px; width: 48px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 20px;">8</div></div><pre class=""><span style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -48px; width: 48px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 20px;">9</div></div><pre class=""><span style="padding-right: 0.1px;">  <span class="cm-keyword">const</span> <span class="cm-variable">deleteItem</span> <span class="cm-operator">=</span> (<span class="cm-def">id</span>) <span class="cm-operator">=&gt;</span> {</span></pre></div><div bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -48px; width: 48px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 20px;">10</div></div><pre class=""><span style="padding-right: 0.1px;"> &nbsp;  <span class="cm-variable">setItems</span>(<span class="cm-variable">items</span>.<span class="cm-property">filter</span>(<span class="cm-def">item</span> <span class="cm-operator">=&gt;</span> <span class="cm-variable-2">item</span>.<span class="cm-property">id</span> <span class="cm-operator">!==</span> <span class="cm-variable-2">id</span>));</span></pre></div><div class="CodeMirror-activeline" bis_skin_checked="1" style="position: relative;"><div class="CodeMirror-activeline-background CodeMirror-linebackground" bis_skin_checked="1"></div><div class="CodeMirror-gutter-wrapper" bis_skin_checked="1" style="left: -48px; width: 48px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" bis_skin_checked="1" style="left: 0px; width: 20px;">11</div></div><pre class=""><span style="padding-right: 0.1px;">  };</span></pre></div></div></div></div></div></div><div style="position: absolute; height: 23px; width: 1px; top: 265px;" bis_skin_checked="1"></div><div class="CodeMirror-gutters" style="height: 408px;" bis_skin_checked="1"><div class="CodeMirror-gutter CodeMirror-linenumbers" style="width: 28px;" bis_skin_checked="1"></div><div class="CodeMirror-gutter CodeMirror-foldgutter" bis_skin_checked="1"></div></div></div></div><div class="editormd-dialog-footer" bis_skin_checked="1"><button class="editormd-btn editormd-enter-btn">Enter</button><button class="editormd-btn editormd-cancel-btn">Cancel</button></div></div><div class="editormd-dialog-mask editormd-dialog-mask-bg" bis_skin_checked="1"></div><div class="editormd-dialog-mask editormd-dialog-mask-con" bis_skin_checked="1"></div></div><div class="editormd-dialog editormd-dialog-html-entities-dialog" bis_skin_checked="1" style="display: none; z-index: 100005; width: 800px; height: 475px; top: 241px; left: 556.5px;"><div class="editormd-dialog-header" style="cursor: move;" bis_skin_checked="1"><strong class="editormd-dialog-title">HTML Entities</strong></div><a href="javascript:;" class="fa fa-close editormd-dialog-close"></a><div class="editormd-dialog-container" bis_skin_checked="1"><div class="editormd-html-entities-box" style="width: 760px;height: 334px;margin-bottom: 8px;overflow: hidden;overflow-y: auto;" bis_skin_checked="1">
<div class="editormd-grid-table" bis_skin_checked="1"><div class="editormd-grid-table-row" bis_skin_checked="1"><a href="javascript:;" value="&amp;#64;" title="@" class="editormd-html-entity-btn">@</a><a href="javascript:;" value="&amp;copy;" title="©" class="editormd-html-entity-btn">©</a><a href="javascript:;" value="&amp;reg;" title="®" class="editormd-html-entity-btn">®</a><a href="javascript:;" value="&amp;trade;" title="™" class="editormd-html-entity-btn">™</a><a href="javascript:;" value="&amp;hearts;" title="♥" class="editormd-html-entity-btn">♥</a><a href="javascript:;" value="&amp;nbsp;" title=" " class="editormd-html-entity-btn">&nbsp;</a><a href="javascript:;" value="&amp;amp;" title="&amp;" class="editormd-html-entity-btn">&amp;</a><a href="javascript:;" value="&amp;#36;" title="$" class="editormd-html-entity-btn">$</a><a href="javascript:;" value="&amp;cent;" title="¢" class="editormd-html-entity-btn">¢</a><a href="javascript:;" value="&amp;pound;" title="£" class="editormd-html-entity-btn">£</a><a href="javascript:;" value="&amp;yen;" title="¥" class="editormd-html-entity-btn">¥</a><a href="javascript:;" value="&amp;euro;" title="€" class="editormd-html-entity-btn">€</a><a href="javascript:;" value="&amp;quot;" title="&quot;" class="editormd-html-entity-btn">"</a><a href="javascript:;" value="&amp;ldquo;" title="“" class="editormd-html-entity-btn">“</a><a href="javascript:;" value="&amp;rdquo;" title="”" class="editormd-html-entity-btn">”</a><a href="javascript:;" value="&amp;lsquo;" title="‘" class="editormd-html-entity-btn">‘</a><a href="javascript:;" value="&amp;rsquo;" title="’" class="editormd-html-entity-btn">’</a><a href="javascript:;" value="&amp;laquo;" title="«" class="editormd-html-entity-btn">«</a><a href="javascript:;" value="&amp;raquo;" title="»" class="editormd-html-entity-btn">»</a><a href="javascript:;" value="&amp;lsaquo;" title="‹" class="editormd-html-entity-btn">‹</a></div><div class="editormd-grid-table-row" bis_skin_checked="1"><a href="javascript:;" value="&amp;rsaquo;" title="›" class="editormd-html-entity-btn">›</a><a href="javascript:;" value="&amp;sect;" title="§" class="editormd-html-entity-btn">§</a><a href="javascript:;" value="&amp;micro;" title="µ" class="editormd-html-entity-btn">µ</a><a href="javascript:;" value="&amp;para;" title="¶" class="editormd-html-entity-btn">¶</a><a href="javascript:;" value="&amp;bull;" title="•" class="editormd-html-entity-btn">•</a><a href="javascript:;" value="&amp;middot;" title="·" class="editormd-html-entity-btn">·</a><a href="javascript:;" value="&amp;hellip;" title="…" class="editormd-html-entity-btn">…</a><a href="javascript:;" value="&amp;#124;" title="|" class="editormd-html-entity-btn">|</a><a href="javascript:;" value="&amp;brvbar;" title="¦" class="editormd-html-entity-btn">¦</a><a href="javascript:;" value="&amp;ndash;" title="–" class="editormd-html-entity-btn">–</a><a href="javascript:;" value="&amp;mdash;" title="—" class="editormd-html-entity-btn">—</a><a href="javascript:;" value="&amp;curren;" title="¤" class="editormd-html-entity-btn">¤</a><a href="javascript:;" value="&amp;#33;" title="!" class="editormd-html-entity-btn">!</a><a href="javascript:;" value="&amp;#35;" title="#" class="editormd-html-entity-btn">#</a><a href="javascript:;" value="&amp;#39;" title="&#39;" class="editormd-html-entity-btn">'</a><a href="javascript:;" value="&amp;#40;" title="(" class="editormd-html-entity-btn">(</a><a href="javascript:;" value="&amp;#41;" title=")" class="editormd-html-entity-btn">)</a><a href="javascript:;" value="&amp;#42;" title="*" class="editormd-html-entity-btn">*</a><a href="javascript:;" value="&amp;#43;" title="+" class="editormd-html-entity-btn">+</a><a href="javascript:;" value="&amp;#44;" title="," class="editormd-html-entity-btn">,</a></div><div class="editormd-grid-table-row" bis_skin_checked="1"><a href="javascript:;" value="&amp;#45;" title="-" class="editormd-html-entity-btn">-</a><a href="javascript:;" value="&amp;#46;" title="." class="editormd-html-entity-btn">.</a><a href="javascript:;" value="&amp;#47;" title="/" class="editormd-html-entity-btn">/</a><a href="javascript:;" value="&amp;#48;" title="0" class="editormd-html-entity-btn">0</a><a href="javascript:;" value="&amp;#49;" title="1" class="editormd-html-entity-btn">1</a><a href="javascript:;" value="&amp;#50;" title="2" class="editormd-html-entity-btn">2</a><a href="javascript:;" value="&amp;#51;" title="3" class="editormd-html-entity-btn">3</a><a href="javascript:;" value="&amp;#52;" title="4" class="editormd-html-entity-btn">4</a><a href="javascript:;" value="&amp;#53;" title="5" class="editormd-html-entity-btn">5</a><a href="javascript:;" value="&amp;#54;" title="6" class="editormd-html-entity-btn">6</a><a href="javascript:;" value="&amp;#55;" title="7" class="editormd-html-entity-btn">7</a><a href="javascript:;" value="&amp;#56;" title="8" class="editormd-html-entity-btn">8</a><a href="javascript:;" value="&amp;#57;" title="9" class="editormd-html-entity-btn">9</a><a href="javascript:;" value="&amp;#58;" title=":" class="editormd-html-entity-btn">:</a><a href="javascript:;" value="&amp;#59;" title=";" class="editormd-html-entity-btn">;</a><a href="javascript:;" value="&amp;#61;" title="=" class="editormd-html-entity-btn">=</a><a href="javascript:;" value="&amp;#63;" title="?" class="editormd-html-entity-btn">?</a><a href="javascript:;" value="&amp;lt;" title="&lt;" class="editormd-html-entity-btn">&lt;</a><a href="javascript:;" value="&amp;gt;" title="&gt;" class="editormd-html-entity-btn">&gt;</a><a href="javascript:;" value="&amp;le;" title="≤" class="editormd-html-entity-btn">≤</a></div><div class="editormd-grid-table-row" bis_skin_checked="1"><a href="javascript:;" value="&amp;ge;" title="≥" class="editormd-html-entity-btn">≥</a><a href="javascript:;" value="&amp;times;" title="×" class="editormd-html-entity-btn">×</a><a href="javascript:;" value="&amp;divide;" title="÷" class="editormd-html-entity-btn">÷</a><a href="javascript:;" value="&amp;minus;" title="−" class="editormd-html-entity-btn">−</a><a href="javascript:;" value="&amp;plusmn;" title="±" class="editormd-html-entity-btn">±</a><a href="javascript:;" value="&amp;ne;" title="≠" class="editormd-html-entity-btn">≠</a><a href="javascript:;" value="&amp;sup1;" title="¹" class="editormd-html-entity-btn">¹</a><a href="javascript:;" value="&amp;sup2;" title="²" class="editormd-html-entity-btn">²</a><a href="javascript:;" value="&amp;sup3;" title="³" class="editormd-html-entity-btn">³</a><a href="javascript:;" value="&amp;frac12;" title="½" class="editormd-html-entity-btn">½</a><a href="javascript:;" value="&amp;frac14;" title="¼" class="editormd-html-entity-btn">¼</a><a href="javascript:;" value="&amp;frac34;" title="¾" class="editormd-html-entity-btn">¾</a><a href="javascript:;" value="&amp;permil;" title="‰" class="editormd-html-entity-btn">‰</a><a href="javascript:;" value="&amp;deg;" title="°" class="editormd-html-entity-btn">°</a><a href="javascript:;" value="&amp;radic;" title="√" class="editormd-html-entity-btn selected">√</a><a href="javascript:;" value="&amp;infin;" title="∞" class="editormd-html-entity-btn">∞</a><a href="javascript:;" value="&amp;larr;" title="←" class="editormd-html-entity-btn">←</a><a href="javascript:;" value="&amp;uarr;" title="↑" class="editormd-html-entity-btn">↑</a><a href="javascript:;" value="&amp;rarr;" title="→" class="editormd-html-entity-btn">→</a><a href="javascript:;" value="&amp;darr;" title="↓" class="editormd-html-entity-btn">↓</a></div><div class="editormd-grid-table-row" bis_skin_checked="1"><a href="javascript:;" value="&amp;harr;" title="↔" class="editormd-html-entity-btn">↔</a><a href="javascript:;" value="&amp;crarr;" title="↵" class="editormd-html-entity-btn">↵</a><a href="javascript:;" value="&amp;lceil;" title="⌈" class="editormd-html-entity-btn">⌈</a><a href="javascript:;" value="&amp;rceil;" title="⌉" class="editormd-html-entity-btn">⌉</a><a href="javascript:;" value="&amp;lfloor;" title="⌊" class="editormd-html-entity-btn">⌊</a><a href="javascript:;" value="&amp;rfloor;" title="⌋" class="editormd-html-entity-btn">⌋</a><a href="javascript:;" value="&amp;spades;" title="♠" class="editormd-html-entity-btn">♠</a><a href="javascript:;" value="&amp;clubs;" title="♣" class="editormd-html-entity-btn">♣</a><a href="javascript:;" value="&amp;hearts;" title="♥" class="editormd-html-entity-btn">♥</a><a href="javascript:;" value="&amp;diams;" title="♦" class="editormd-html-entity-btn">♦</a><a href="javascript:;" value="&amp;loz;" title="◊" class="editormd-html-entity-btn">◊</a><a href="javascript:;" value="&amp;dagger;" title="†" class="editormd-html-entity-btn">†</a><a href="javascript:;" value="&amp;Dagger;" title="‡" class="editormd-html-entity-btn">‡</a><a href="javascript:;" value="&amp;iexcl;" title="¡" class="editormd-html-entity-btn">¡</a><a href="javascript:;" value="&amp;iquest;" title="¿" class="editormd-html-entity-btn">¿</a><a href="javascript:;" value="&amp;#338;" title="Œ" class="editormd-html-entity-btn">Œ</a><a href="javascript:;" value="&amp;#339;" title="œ" class="editormd-html-entity-btn">œ</a><a href="javascript:;" value="&amp;#352;" title="Š" class="editormd-html-entity-btn">Š</a><a href="javascript:;" value="&amp;#353;" title="š" class="editormd-html-entity-btn">š</a><a href="javascript:;" value="&amp;#376;" title="Ÿ" class="editormd-html-entity-btn">Ÿ</a></div><div class="editormd-grid-table-row" bis_skin_checked="1"><a href="javascript:;" value="&amp;#402;" title="ƒ" class="editormd-html-entity-btn">ƒ</a><a href="javascript:;" value="&amp;not;" title="¬" class="editormd-html-entity-btn">¬</a><a href="javascript:;" value="&amp;ordf;" title="ª" class="editormd-html-entity-btn">ª</a><a href="javascript:;" value="&amp;uml;" title="¨" class="editormd-html-entity-btn">¨</a><a href="javascript:;" value="&amp;macr;" title="¯" class="editormd-html-entity-btn">¯</a><a href="javascript:;" value="&amp;acute;" title="´" class="editormd-html-entity-btn">´</a><a href="javascript:;" value="&amp;Agrave;" title="À" class="editormd-html-entity-btn">À</a><a href="javascript:;" value="&amp;Aacute;" title="Á" class="editormd-html-entity-btn">Á</a><a href="javascript:;" value="&amp;Acirc;" title="Â" class="editormd-html-entity-btn">Â</a><a href="javascript:;" value="&amp;Atilde;" title="Ã" class="editormd-html-entity-btn">Ã</a><a href="javascript:;" value="&amp;Auml;" title="Ä" class="editormd-html-entity-btn">Ä</a><a href="javascript:;" value="&amp;Aring;" title="Å" class="editormd-html-entity-btn">Å</a><a href="javascript:;" value="&amp;AElig;" title="Æ" class="editormd-html-entity-btn">Æ</a><a href="javascript:;" value="&amp;Ccedil;" title="Ç" class="editormd-html-entity-btn">Ç</a><a href="javascript:;" value="&amp;Egrave;" title="È" class="editormd-html-entity-btn">È</a><a href="javascript:;" value="&amp;Eacute;" title="É" class="editormd-html-entity-btn">É</a><a href="javascript:;" value="&amp;Ecirc;" title="Ê" class="editormd-html-entity-btn">Ê</a><a href="javascript:;" value="&amp;Euml;" title="Ë" class="editormd-html-entity-btn">Ë</a><a href="javascript:;" value="&amp;Igrave;" title="Ì" class="editormd-html-entity-btn">Ì</a><a href="javascript:;" value="&amp;Iacute;" title="Í" class="editormd-html-entity-btn">Í</a></div><div class="editormd-grid-table-row" bis_skin_checked="1"><a href="javascript:;" value="&amp;Icirc;" title="Î" class="editormd-html-entity-btn">Î</a><a href="javascript:;" value="&amp;Iuml;" title="Ï" class="editormd-html-entity-btn">Ï</a><a href="javascript:;" value="&amp;ETH;" title="Ð" class="editormd-html-entity-btn">Ð</a><a href="javascript:;" value="&amp;Ntilde;" title="Ñ" class="editormd-html-entity-btn">Ñ</a><a href="javascript:;" value="&amp;Ograve;" title="Ò" class="editormd-html-entity-btn">Ò</a><a href="javascript:;" value="&amp;Oacute;" title="Ó" class="editormd-html-entity-btn">Ó</a><a href="javascript:;" value="&amp;Ocirc;" title="Ô" class="editormd-html-entity-btn">Ô</a><a href="javascript:;" value="&amp;Otilde;" title="Õ" class="editormd-html-entity-btn">Õ</a><a href="javascript:;" value="&amp;Ouml;" title="Ö" class="editormd-html-entity-btn">Ö</a><a href="javascript:;" value="&amp;times;" title="×" class="editormd-html-entity-btn">×</a><a href="javascript:;" value="&amp;Oslash;" title="Ø" class="editormd-html-entity-btn">Ø</a><a href="javascript:;" value="&amp;Ugrave;" title="Ù" class="editormd-html-entity-btn">Ù</a><a href="javascript:;" value="&amp;Uacute;" title="Ú" class="editormd-html-entity-btn">Ú</a><a href="javascript:;" value="&amp;Ucirc;" title="Û" class="editormd-html-entity-btn">Û</a><a href="javascript:;" value="&amp;Uuml;" title="Ü" class="editormd-html-entity-btn">Ü</a><a href="javascript:;" value="&amp;Yacute;" title="Ý" class="editormd-html-entity-btn">Ý</a><a href="javascript:;" value="&amp;THORN;" title="Þ" class="editormd-html-entity-btn">Þ</a><a href="javascript:;" value="&amp;szlig;" title="ß" class="editormd-html-entity-btn">ß</a><a href="javascript:;" value="&amp;eth;" title="ð" class="editormd-html-entity-btn">ð</a><a href="javascript:;" value="&amp;ntilde;" title="ñ" class="editormd-html-entity-btn">ñ</a></div><div class="editormd-grid-table-row" bis_skin_checked="1"><a href="javascript:;" value="&amp;ograve;" title="ò" class="editormd-html-entity-btn">ò</a><a href="javascript:;" value="&amp;oacute;" title="ó" class="editormd-html-entity-btn">ó</a><a href="javascript:;" value="&amp;ocirc;" title="ô" class="editormd-html-entity-btn">ô</a><a href="javascript:;" value="&amp;otilde;" title="õ" class="editormd-html-entity-btn">õ</a><a href="javascript:;" value="&amp;ouml;" title="ö" class="editormd-html-entity-btn">ö</a><a href="javascript:;" value="&amp;times;" title="×" class="editormd-html-entity-btn">×</a><a href="javascript:;" value="&amp;oslash;" title="ø" class="editormd-html-entity-btn">ø</a><a href="javascript:;" value="&amp;ugrave;" title="ù" class="editormd-html-entity-btn">ù</a><a href="javascript:;" value="&amp;uacute;" title="ú" class="editormd-html-entity-btn">ú</a><a href="javascript:;" value="&amp;ucirc;" title="û" class="editormd-html-entity-btn">û</a><a href="javascript:;" value="&amp;uuml;" title="ü" class="editormd-html-entity-btn">ü</a><a href="javascript:;" value="&amp;yacute;" title="ý" class="editormd-html-entity-btn">ý</a><a href="javascript:;" value="&amp;thorn;" title="þ" class="editormd-html-entity-btn">þ</a><a href="javascript:;" value="&amp;yuml;" title="ÿ" class="editormd-html-entity-btn">ÿ</a><a href="javascript:;" value="&amp;agrave;" title="à" class="editormd-html-entity-btn">à</a><a href="javascript:;" value="&amp;aacute;" title="á" class="editormd-html-entity-btn">á</a><a href="javascript:;" value="&amp;acirc;" title="â" class="editormd-html-entity-btn">â</a><a href="javascript:;" value="&amp;atilde;" title="ã" class="editormd-html-entity-btn">ã</a><a href="javascript:;" value="&amp;auml;" title="ä" class="editormd-html-entity-btn">ä</a><a href="javascript:;" value="&amp;aring;" title="å" class="editormd-html-entity-btn">å</a></div><div class="editormd-grid-table-row" bis_skin_checked="1"><a href="javascript:;" value="&amp;aelig;" title="æ" class="editormd-html-entity-btn">æ</a><a href="javascript:;" value="&amp;ccedil;" title="ç" class="editormd-html-entity-btn">ç</a><a href="javascript:;" value="&amp;egrave;" title="è" class="editormd-html-entity-btn">è</a><a href="javascript:;" value="&amp;eacute;" title="é" class="editormd-html-entity-btn">é</a><a href="javascript:;" value="&amp;ecirc;" title="ê" class="editormd-html-entity-btn">ê</a><a href="javascript:;" value="&amp;euml;" title="ë" class="editormd-html-entity-btn">ë</a><a href="javascript:;" value="&amp;igrave;" title="ì" class="editormd-html-entity-btn">ì</a><a href="javascript:;" value="&amp;Iacute;" title="Í" class="editormd-html-entity-btn">Í</a><a href="javascript:;" value="&amp;icirc;" title="î" class="editormd-html-entity-btn">î</a><a href="javascript:;" value="&amp;iuml;" title="ï" class="editormd-html-entity-btn">ï</a><a href="javascript:;" value="&amp;#65;" title="A" class="editormd-html-entity-btn">A</a><a href="javascript:;" value="&amp;#66;" title="B" class="editormd-html-entity-btn">B</a><a href="javascript:;" value="&amp;#67;" title="C" class="editormd-html-entity-btn">C</a><a href="javascript:;" value="&amp;#68;" title="D" class="editormd-html-entity-btn">D</a><a href="javascript:;" value="&amp;#69;" title="E" class="editormd-html-entity-btn">E</a><a href="javascript:;" value="&amp;#70;" title="F" class="editormd-html-entity-btn">F</a><a href="javascript:;" value="&amp;#71;" title="G" class="editormd-html-entity-btn">G</a><a href="javascript:;" value="&amp;#72;" title="H" class="editormd-html-entity-btn">H</a><a href="javascript:;" value="&amp;#73;" title="I" class="editormd-html-entity-btn">I</a><a href="javascript:;" value="&amp;#74;" title="J" class="editormd-html-entity-btn">J</a></div><div class="editormd-grid-table-row" bis_skin_checked="1"><a href="javascript:;" value="&amp;#75;" title="K" class="editormd-html-entity-btn">K</a><a href="javascript:;" value="&amp;#76;" title="L" class="editormd-html-entity-btn">L</a><a href="javascript:;" value="&amp;#77;" title="M" class="editormd-html-entity-btn">M</a><a href="javascript:;" value="&amp;#78;" title="N" class="editormd-html-entity-btn">N</a><a href="javascript:;" value="&amp;#79;" title="O" class="editormd-html-entity-btn">O</a><a href="javascript:;" value="&amp;#80;" title="P" class="editormd-html-entity-btn">P</a><a href="javascript:;" value="&amp;#81;" title="Q" class="editormd-html-entity-btn">Q</a><a href="javascript:;" value="&amp;#82;" title="R" class="editormd-html-entity-btn">R</a><a href="javascript:;" value="&amp;#83;" title="S" class="editormd-html-entity-btn">S</a><a href="javascript:;" value="&amp;#84;" title="T" class="editormd-html-entity-btn">T</a><a href="javascript:;" value="&amp;#85;" title="U" class="editormd-html-entity-btn">U</a><a href="javascript:;" value="&amp;#86;" title="V" class="editormd-html-entity-btn">V</a><a href="javascript:;" value="&amp;#87;" title="W" class="editormd-html-entity-btn">W</a><a href="javascript:;" value="&amp;#88;" title="X" class="editormd-html-entity-btn">X</a><a href="javascript:;" value="&amp;#89;" title="Y" class="editormd-html-entity-btn">Y</a><a href="javascript:;" value="&amp;#90;" title="Z" class="editormd-html-entity-btn">Z</a><a href="javascript:;" value="&amp;#91;" title="[" class="editormd-html-entity-btn">[</a><a href="javascript:;" value="&amp;#92;" title="\" class="editormd-html-entity-btn">\</a><a href="javascript:;" value="&amp;#93;" title="]" class="editormd-html-entity-btn">]</a><a href="javascript:;" value="&amp;#94;" title="^" class="editormd-html-entity-btn">^</a></div><div class="editormd-grid-table-row" bis_skin_checked="1"><a href="javascript:;" value="&amp;#95;" title="_" class="editormd-html-entity-btn">_</a><a href="javascript:;" value="&amp;#96;" title="`" class="editormd-html-entity-btn">`</a><a href="javascript:;" value="&amp;#97;" title="a" class="editormd-html-entity-btn">a</a><a href="javascript:;" value="&amp;#98;" title="b" class="editormd-html-entity-btn">b</a><a href="javascript:;" value="&amp;#99;" title="c" class="editormd-html-entity-btn">c</a><a href="javascript:;" value="&amp;#100;" title="d" class="editormd-html-entity-btn">d</a><a href="javascript:;" value="&amp;#101;" title="e" class="editormd-html-entity-btn">e</a><a href="javascript:;" value="&amp;#102;" title="f" class="editormd-html-entity-btn">f</a><a href="javascript:;" value="&amp;#103;" title="g" class="editormd-html-entity-btn">g</a><a href="javascript:;" value="&amp;#104;" title="h" class="editormd-html-entity-btn">h</a><a href="javascript:;" value="&amp;#105;" title="i" class="editormd-html-entity-btn">i</a><a href="javascript:;" value="&amp;#106;" title="j" class="editormd-html-entity-btn">j</a><a href="javascript:;" value="&amp;#107;" title="k" class="editormd-html-entity-btn">k</a><a href="javascript:;" value="&amp;#108;" title="l" class="editormd-html-entity-btn">l</a><a href="javascript:;" value="&amp;#109;" title="m" class="editormd-html-entity-btn">m</a><a href="javascript:;" value="&amp;#110;" title="n" class="editormd-html-entity-btn">n</a><a href="javascript:;" value="&amp;#111;" title="o" class="editormd-html-entity-btn">o</a><a href="javascript:;" value="&amp;#112;" title="p" class="editormd-html-entity-btn">p</a><a href="javascript:;" value="&amp;#113;" title="q" class="editormd-html-entity-btn">q</a><a href="javascript:;" value="&amp;#114;" title="r" class="editormd-html-entity-btn">r</a></div><div class="editormd-grid-table-row" bis_skin_checked="1"><a href="javascript:;" value="&amp;#115;" title="s" class="editormd-html-entity-btn">s</a><a href="javascript:;" value="&amp;#116;" title="t" class="editormd-html-entity-btn">t</a><a href="javascript:;" value="&amp;#117;" title="u" class="editormd-html-entity-btn">u</a><a href="javascript:;" value="&amp;#118;" title="v" class="editormd-html-entity-btn">v</a><a href="javascript:;" value="&amp;#119;" title="w" class="editormd-html-entity-btn">w</a><a href="javascript:;" value="&amp;#120;" title="x" class="editormd-html-entity-btn">x</a><a href="javascript:;" value="&amp;#121;" title="y" class="editormd-html-entity-btn">y</a><a href="javascript:;" value="&amp;#122;" title="z" class="editormd-html-entity-btn">z</a><a href="javascript:;" value="&amp;#123;" title="{" class="editormd-html-entity-btn">{</a><a href="javascript:;" value="&amp;#124;" title="|" class="editormd-html-entity-btn">|</a><a href="javascript:;" value="&amp;#125;" title="}" class="editormd-html-entity-btn">}</a><a href="javascript:;" value="&amp;#126;" title="~" class="editormd-html-entity-btn">~</a></div></div>
</div><div class="editormd-dialog-footer" bis_skin_checked="1"><button class="editormd-btn editormd-enter-btn">Enter</button><button class="editormd-btn editormd-cancel-btn">Cancel</button></div></div><div class="editormd-dialog-mask editormd-dialog-mask-bg" bis_skin_checked="1" style="display: none;"></div><div class="editormd-dialog-mask editormd-dialog-mask-con" bis_skin_checked="1" style="display: none;"></div></div><div class="editormd-dialog editormd-dialog-1750529116964" bis_skin_checked="1" style="display: none; z-index: 100007; width: 380px; height: 211px; top: 373px; left: 770px;"><div class="editormd-dialog-header" style="cursor: move;" bis_skin_checked="1"><strong class="editormd-dialog-title">Link</strong></div><a href="javascript:;" class="fa fa-close editormd-dialog-close"></a><div class="editormd-dialog-container" bis_skin_checked="1"><div class="editormd-form" bis_skin_checked="1"><label>Address</label><input type="text" value="http://" data-url=""><br><label>Title</label><input type="text" value="" data-title=""><br></div><div class="editormd-dialog-footer" bis_skin_checked="1"><button class="editormd-btn editormd-enter-btn">Enter</button><button class="editormd-btn editormd-cancel-btn">Cancel</button></div></div><div class="editormd-dialog-mask editormd-dialog-mask-bg" bis_skin_checked="1"></div><div class="editormd-dialog-mask editormd-dialog-mask-con" bis_skin_checked="1"></div></div><div class="editormd-dialog editormd-dialog-1750529122355" bis_skin_checked="1" style="display: none; z-index: 100009; width: 380px; height: 211px; top: 373px; left: 770px;"><div class="editormd-dialog-header" style="cursor: move;" bis_skin_checked="1"><strong class="editormd-dialog-title">Link</strong></div><a href="javascript:;" class="fa fa-close editormd-dialog-close"></a><div class="editormd-dialog-container" bis_skin_checked="1"><div class="editormd-form" bis_skin_checked="1"><label>Address</label><input type="text" value="http://" data-url=""><br><label>Title</label><input type="text" value="" data-title=""><br></div><div class="editormd-dialog-footer" bis_skin_checked="1"><button class="editormd-btn editormd-enter-btn">Enter</button><button class="editormd-btn editormd-cancel-btn">Cancel</button></div></div><div class="editormd-dialog-mask editormd-dialog-mask-bg" bis_skin_checked="1"></div><div class="editormd-dialog-mask editormd-dialog-mask-con" bis_skin_checked="1"></div></div><div class="editormd-dialog editormd-table-dialog" bis_skin_checked="1" style="display: none; z-index: 100011; width: 360px; height: 226px; top: 365.5px; left: 780px;"><div class="editormd-dialog-header" style="cursor: move;" bis_skin_checked="1"><strong class="editormd-dialog-title">Tables</strong></div><a href="javascript:;" class="fa fa-close editormd-dialog-close"></a><div class="editormd-dialog-container" bis_skin_checked="1"><div class="editormd-form" style="padding: 13px 0;" bis_skin_checked="1">
<label>Cells</label>
Rows <input type="number" value="3" class="number-input" style="width:40px;" max="100" min="2" data-rows="">&nbsp;&nbsp;
Cols <input type="number" value="2" class="number-input" style="width:40px;" max="100" min="1" data-cols=""><br>
<label>Align</label>
<div class="fa-btns" bis_skin_checked="1"><a href="javascript:;"><label for="editormd-table-dialog-radio0" title="Default"><input type="radio" name="table-align" id="editormd-table-dialog-radio0" value="_default" checked="checked">&nbsp;<i class="fa fa-align-justify"></i></label></a><a href="javascript:;"><label for="editormd-table-dialog-radio1" title="Left align"><input type="radio" name="table-align" id="editormd-table-dialog-radio1" value="left">&nbsp;<i class="fa fa-align-left"></i></label></a><a href="javascript:;"><label for="editormd-table-dialog-radio2" title="Center align"><input type="radio" name="table-align" id="editormd-table-dialog-radio2" value="center">&nbsp;<i class="fa fa-align-center"></i></label></a><a href="javascript:;"><label for="editormd-table-dialog-radio3" title="Right align"><input type="radio" name="table-align" id="editormd-table-dialog-radio3" value="right">&nbsp;<i class="fa fa-align-right"></i></label></a></div>
</div><div class="editormd-dialog-footer" bis_skin_checked="1"><button class="editormd-btn editormd-enter-btn">Enter</button><button class="editormd-btn editormd-cancel-btn">Cancel</button></div></div><div class="editormd-dialog-mask editormd-dialog-mask-bg" bis_skin_checked="1"></div><div class="editormd-dialog-mask editormd-dialog-mask-con" bis_skin_checked="1"></div></div><div class="editormd-dialog editormd-goto-line-dialog" bis_skin_checked="1" style="display: none; z-index: 100013; width: 400px; height: 180px; top: 388.5px; left: 760px;"><div class="editormd-dialog-header" style="cursor: move;" bis_skin_checked="1"><strong class="editormd-dialog-title">Goto line</strong></div><a href="javascript:;" class="fa fa-close editormd-dialog-close"></a><div class="editormd-dialog-container" bis_skin_checked="1"><div class="editormd-form" style="padding: 10px 0;" bis_skin_checked="1">
<p style="margin: 0;">Enter a line number, range  1-384&nbsp;&nbsp;&nbsp;<input type="number" class="number-input" style="width: 60px;" value="1" max="384" min="1" data-line-number=""></p>
</div><div class="editormd-dialog-footer" bis_skin_checked="1"><button class="editormd-btn editormd-enter-btn">Enter</button><button class="editormd-btn editormd-cancel-btn">Cancel</button></div></div><div class="editormd-dialog-mask editormd-dialog-mask-bg" bis_skin_checked="1"></div><div class="editormd-dialog-mask editormd-dialog-mask-con" bis_skin_checked="1"></div></div></div>                        
                    </div>
                </div>
            </header>
            <div class="pui-grid pui-layout pui-layout-fixed pui-layout-fixed-1200 page-content" bis_skin_checked="1">
                <div class="pui-row" bis_skin_checked="1">
                    <div class="pui-grid-xs-8" bis_skin_checked="1">
                        <a name="start"></a>
                        <div class="pui-card pui-card-simple" bis_skin_checked="1">
                            <div class="pui-card-title" bis_skin_checked="1">
                                <h1 class="pui-text-left">Example</h1>
                            </div>
                            <div class="pui-card-box" bis_skin_checked="1">
                                <div class="code-box" bis_skin_checked="1">
                                    <pre class="prettyprint lang-html example-code prettyprinted" style=""><span class="tag">&lt;link</span><span class="pln"> </span><span class="atn">rel</span><span class="pun">=</span><span class="atv">"stylesheet"</span><span class="pln"> </span><span class="atn">href</span><span class="pun">=</span><span class="atv">"editormd/css/editormd.css"</span><span class="pln"> </span><span class="tag">/&gt;</span><span class="pln">
</span><span class="tag">&lt;div</span><span class="pln"> </span><span class="atn">id</span><span class="pun">=</span><span class="atv">"test-editor"</span><span class="tag">&gt;</span><span class="pln">
    </span><span class="tag">&lt;textarea</span><span class="pln"> </span><span class="atn">style</span><span class="pun">=</span><span class="atv">"</span><span class="pln">display</span><span class="pun">:</span><span class="pln">none</span><span class="pun">;</span><span class="atv">"</span><span class="tag">&gt;</span><span class="pln">### Editor.md

**Editor.md**: The open source embeddable online markdown editor, based on CodeMirror &amp; jQuery &amp; Marked.
    </span><span class="tag">&lt;/textarea&gt;</span><span class="pln">
</span><span class="tag">&lt;/div&gt;</span><span class="pln">
</span><span class="tag">&lt;script</span><span class="pln"> </span><span class="atn">src</span><span class="pun">=</span><span class="atv">"https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js"</span><span class="tag">&gt;&lt;/script&gt;</span><span class="pln">
</span><span class="tag">&lt;script</span><span class="pln"> </span><span class="atn">src</span><span class="pun">=</span><span class="atv">"editormd/editormd.min.js"</span><span class="tag">&gt;&lt;/script&gt;</span><span class="pln">
</span><span class="tag">&lt;script</span><span class="pln"> </span><span class="atn">type</span><span class="pun">=</span><span class="atv">"text/javascript"</span><span class="tag">&gt;</span><span class="pln">
    $</span><span class="pun">(</span><span class="kwd">function</span><span class="pun">()</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
        </span><span class="kwd">var</span><span class="pln"> editor </span><span class="pun">=</span><span class="pln"> editormd</span><span class="pun">(</span><span class="str">"test-editor"</span><span class="pun">,</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
            </span><span class="com">// width  : "100%",</span><span class="pln">
            </span><span class="com">// height : "100%",</span><span class="pln">
            path   </span><span class="pun">:</span><span class="pln"> </span><span class="str">"editormd/lib/"</span><span class="pln">
        </span><span class="pun">});</span><span class="pln">
    </span><span class="pun">});</span><span class="pln">
</span><span class="tag">&lt;/script&gt;</span></pre>
                                    <span class="copy-btn" data-clipboard-text="&lt;link rel=&quot;stylesheet&quot; href=&quot;editormd/css/editormd.css&quot; /&gt;
&lt;div id=&quot;test-editor&quot;&gt;
    &lt;textarea style=&quot;display:none;&quot;&gt;### Editor.md

**Editor.md**: The open source embeddable online markdown editor, based on CodeMirror &amp; jQuery &amp; Marked.
    &lt;/textarea&gt;
&lt;/div&gt;
&lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;editormd/editormd.min.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
    $(function() {
        var editor = editormd(&quot;test-editor&quot;, {
            // width  : &quot;100%&quot;,
            // height : &quot;100%&quot;,
            path   : &quot;editormd/lib/&quot;
        });
    });
&lt;/script&gt;">Copy</span>
                                </div>
                                <p class="pui-text-right"><a href="http://editor.md.ipandao.com/examples/" class="link pui-text-blue">More Examples &gt;&gt;</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="pui-grid-xs-4" bis_skin_checked="1">
                        <div class="pui-card-title" bis_skin_checked="1">
                            <h1 class="pui-text-left">Features</h1>
                        </div>
                        <div class="pui-card-box" bis_skin_checked="1">
                            <ul>
                                <li>Support Standard Markdown / CommonMark and GFM(GitHub Flavored Markdown);</li>
                                <li>Full-featured: Real-time Preview, <a href="http://editor.md.ipandao.com/examples/image-upload.html" class="link pui-text-blue">Image (cross-domain) upload</a>, Preformatted text/Code blocks/Tables insert, Code fold, Search replace, Read only, Themes, Multi-languages, L18n, HTML entities, Code syntax highlighting...;</li>
                                <li>Markdown Extras : Support <a href="http://editor.md.ipandao.com/examples/toc.html" class="link pui-text-blue">ToC (Table of Contents)</a>, <a href="http://editor.md.ipandao.com/examples/emoji.html" class="link pui-text-blue">Emoji</a>, <a href="http://editor.md.ipandao.com/examples/task-lists.html" class="link pui-text-blue">Task lists</a>, <a href="http://editor.md.ipandao.com/examples/@links.html" class="link pui-text-blue">@Links</a>...;</li>
                                <li>Support <a href="http://editor.md.ipandao.com/examples/katex.html" class="link pui-text-blue">TeX (LaTeX expressions, Based on KaTeX)</a>, <a href="http://editor.md.ipandao.com/examples/flowchart.html" class="link pui-text-blue">Flowchart</a> and <a href="http://editor.md.ipandao.com/examples/sequence-diagram.html" class="link pui-text-blue">Sequence Diagram</a> of Markdown extended syntax;</li>
                                <li>Support identification, interpretation, fliter of the HTML tags;</li>
                                <li>Support AMD/CMD (Require.js &amp; Sea.js) Module Loader, and Custom/define editor plugins;</li>
                                <li>Compatible with all major browsers (IE8+), compatible Zepto.js and iPad;</li>
                                <li>Support Custom theme styles;</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="pui-hr pui-layout-fixed pui-layout-fixed-1200">
            <div class="pui-grid pui-layout pui-layout-fixed pui-layout-fixed-1200 page-content" bis_skin_checked="1">
                <div class="pui-row" bis_skin_checked="1">
                    <div class="pui-grid-xs-12 pui-grid-sm-4 pui-grid-md-4" bis_skin_checked="1">
                        <a name="download"></a>
                        <div class="pui-card pui-card-simple" bis_skin_checked="1">
                            <div class="pui-card-title" bis_skin_checked="1">
                                <h1>Download &amp; install</h1>
                            </div>
                            <div class="pui-card-box" bis_skin_checked="1">
                                <p>Latest version: v1.5.0，Update: 2015-06-09</p>
                                <p><a href="https://github.com/pandao/editor.md/archive/master.zip" class="pui-btn pui-btn-secondary"><i class="fa fa-lg fa-github"></i> Github download</a></p>
                                <br>
                                <p><img src="./Editor.md - resumenpedido para aistudio_files/editor.md.svg"> <img src="./Editor.md - resumenpedido para aistudio_files/editor(1).md.svg"></p>
                                <br>
                                <p>Or NPM install:</p>
                                <p><code>npm install editor.md</code></p>
                                <p><img src="./Editor.md - resumenpedido para aistudio_files/editor(2).md.svg"></p>
                                <p>Or Bower install: </p>
                                <p><code>bower install editor.md</code></p>
                                <p><img src="./Editor.md - resumenpedido para aistudio_files/editor(3).md.svg"></p>
                                <br>
                                <p><strong class="pui-text-md">Change logs: </strong></p>
                                <p><a href="https://github.com/pandao/editor.md/blob/master/CHANGE.md" class="pui-link" target="_blank">CHANGES</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="pui-grid-xs-12 pui-grid-sm-4 pui-grid-md-4" bis_skin_checked="1">                        
                        <a name="dependents"></a>
                        <div class="pui-card pui-card-simple" bis_skin_checked="1">
                            <div class="pui-card-title" bis_skin_checked="1">
                                <h1>Dependents</h1>
                            </div>
                            <div class="pui-card-box" bis_skin_checked="1">
                                <p>Projects :</p>
                                <ul>
                                    <li>
                                        <a href="http://codemirror.net/" title="CodeMirror" target="_blank">CodeMirror</a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/chjj/marked" title="marked" target="_blank">marked</a>
                                    </li>
                                    <li>
                                        <a href="http://jquery.com/" title="jQuery" target="_blank">jQuery</a>
                                    </li>
                                    <li>
                                        <a href="http://fontawesome.io/" title="FontAwesome" target="_blank">FontAwesome</a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/sindresorhus/github-markdown-css" title="github-markdown.css" target="_blank">github-markdown.css</a>
                                    </li>
                                    <li>
                                        <a href="http://khan.github.io/KaTeX/" title="KaTeX" target="_blank">KaTeX</a>
                                    </li>
                                    <li>
                                        <a href="http://raphaeljs.com/" title="Rephael.js" target="_blank">Rephael.js</a>
                                    </li>
                                    <li>
                                        <a href="http://code.google.com/p/google-code-prettify/" title="prettify.js" target="_blank">prettify.js</a>
                                    </li>
                                    <li>
                                        <a href="http://adrai.github.io/flowchart.js/" title="flowchart.js" target="_blank">flowchart.js</a>
                                    </li>
                                    <li>
                                        <a href="http://bramp.github.io/js-sequence-diagrams/" title="sequence-diagram.js" target="_blank">sequence-diagram.js</a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/pandao/prefixes.scss" title="Prefixes.scss" target="_blank">Prefixes.scss</a>
                                    </li>
                                </ul>
                                <br>
                                <p>Development tools :</p>
                                <ul>
                                    <li>
                                        <a href="https://code.visualstudio.com/" title="Visual Studio Code" target="_blank">Visual Studio Code</a>
                                    </li>
                                    <li>
                                        <a href="http://sass-lang.com/" title="Sass/Scss" target="_blank">Sass/Scss</a>
                                    </li>
                                    <li>
                                        <a href="http://gulpjs.com/" title="Gulp.js" target="_blank">Gulp.js</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="pui-grid-xs-12 pui-grid-sm-4 pui-grid-md-4" bis_skin_checked="1">                
                        <a name="license"></a>
                        <div class="pui-card pui-card-simple" bis_skin_checked="1">
                            <div class="pui-card-title" bis_skin_checked="1">
                                <h1>License</h1>
                            </div>
                            <div class="pui-card-box" bis_skin_checked="1">
                                <p>Editor.md follows the <a href="https://github.com/pandao/editor.md/blob/master/LICENSE" class="pui-link" target="_blank">MIT License</a>, Anyone can freely use.</p>
                                <br>
                                <p><a href="https://github.com/pandao/editor.md/issues/new" class="pui-btn pui-btn-secondary" target="_blank" title="Submit bugs or new issues"><i class="fa fa-lg fa-github"></i> Submit bugs or new issues</a></p>
                                <p><img src="./Editor.md - resumenpedido para aistudio_files/editor(4).md.svg"></p>
                                <div class="github-buttons" bis_skin_checked="1">
                                    <p>Fork me on Github :</p>
                                    <p><iframe src="./Editor.md - resumenpedido para aistudio_files/github-btn.html" frameborder="0" scrolling="0" width="160px" height="30px" bis_size="{&quot;x&quot;:1184,&quot;y&quot;:1938,&quot;w&quot;:160,&quot;h&quot;:30,&quot;abs_x&quot;:1184,&quot;abs_y&quot;:1938}" bis_id="fr_meohdo3atqrjkfreo5jle8" bis_depth="0" bis_chainid="1"></iframe></p>
                                    <p><iframe src="./Editor.md - resumenpedido para aistudio_files/github-btn(1).html" frameborder="0" scrolling="0" width="160px" height="30px" bis_size="{&quot;x&quot;:1184,&quot;y&quot;:1975,&quot;w&quot;:160,&quot;h&quot;:30,&quot;abs_x&quot;:1184,&quot;abs_y&quot;:1975}" bis_id="fr_zvjmlha5i2rw75h57m4fpg" bis_depth="0" bis_chainid="2"></iframe></p>
                                    <p><iframe src="./Editor.md - resumenpedido para aistudio_files/github-btn(2).html" frameborder="0" scrolling="0" width="160px" height="30px" bis_size="{&quot;x&quot;:1184,&quot;y&quot;:2013,&quot;w&quot;:160,&quot;h&quot;:30,&quot;abs_x&quot;:1184,&quot;abs_y&quot;:2013}" bis_id="fr_uwtr6sjxuip1rlbgt7chld" bis_depth="0" bis_chainid="3"></iframe>
</p>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
            <hr class="pui-hr pui-layout-fixed pui-layout-fixed-1200">
            <div class="pui-grid pui-layout pui-layout-fixed pui-layout-fixed-1200 page-content" bis_skin_checked="1">
                <div class="pui-row" bis_skin_checked="1">
                    <div class="pui-grid-xs-12" bis_skin_checked="1">
                        <a name="users"></a>
                        <div class="pui-card pui-card-simple" bis_skin_checked="1">
                            <div class="pui-card-title" bis_skin_checked="1">
                                <h1 class="pui-text-center">Users</h1>
                            </div>
                            <div class="pui-card-box" bis_skin_checked="1">
                                <ul class="pui-menu pui-menu-inline case-list">
                                    <li>
                                        <a href="https://www.alipay.com/" target="_blank" title="Alipay" bis_size="{&quot;x&quot;:371,&quot;y&quot;:2404,&quot;w&quot;:292,&quot;h&quot;:82,&quot;abs_x&quot;:371,&quot;abs_y&quot;:2404}">
                                            <img src="./Editor.md - resumenpedido para aistudio_files/alipay.png" alt="Alipay" bis_size="{&quot;x&quot;:417,&quot;y&quot;:2405,&quot;w&quot;:200,&quot;h&quot;:80,&quot;abs_x&quot;:417,&quot;abs_y&quot;:2405}" bis_id="bn_abgzrt5rkzmpmtvlzao8wc">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.alibaba.com/" target="_blank" title="Alibaba" bis_size="{&quot;x&quot;:664,&quot;y&quot;:2404,&quot;w&quot;:292,&quot;h&quot;:82,&quot;abs_x&quot;:664,&quot;abs_y&quot;:2404}">
                                            <img src="./Editor.md - resumenpedido para aistudio_files/alibaba.png" alt="Alibaba" bis_size="{&quot;x&quot;:710,&quot;y&quot;:2405,&quot;w&quot;:200,&quot;h&quot;:80,&quot;abs_x&quot;:710,&quot;abs_y&quot;:2405}" bis_id="bn_wr9oi7a7hhym5fxia2v73o">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.huawei.com/" target="_blank" title="Huawei" bis_size="{&quot;x&quot;:956,&quot;y&quot;:2404,&quot;w&quot;:292,&quot;h&quot;:82,&quot;abs_x&quot;:956,&quot;abs_y&quot;:2404}">
                                            <img src="./Editor.md - resumenpedido para aistudio_files/huawei.png" alt="Huawei" bis_size="{&quot;x&quot;:1002,&quot;y&quot;:2405,&quot;w&quot;:200,&quot;h&quot;:80,&quot;abs_x&quot;:1002,&quot;abs_y&quot;:2405}" bis_id="bn_h18gp6xju4b55fo418bvy6">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://work.weixin.qq.com/" target="_blank" title="WeChat Work" bis_size="{&quot;x&quot;:1249,&quot;y&quot;:2404,&quot;w&quot;:292,&quot;h&quot;:82,&quot;abs_x&quot;:1249,&quot;abs_y&quot;:2404}">
                                            <img src="./Editor.md - resumenpedido para aistudio_files/wechat-work.png" alt="WeChat Work" bis_size="{&quot;x&quot;:1295,&quot;y&quot;:2405,&quot;w&quot;:200,&quot;h&quot;:80,&quot;abs_x&quot;:1295,&quot;abs_y&quot;:2405}" bis_id="bn_srx5f4hy658bvxjucp9kx7">
                                        </a>
                                    </li>
                                </ul>
                                <ul class="pui-menu pui-menu-inline case-list">
                                    <li>
                                        <a href="https://www.jd.com/" target="_blank" title="JD.com" bis_size="{&quot;x&quot;:371,&quot;y&quot;:2503,&quot;w&quot;:292,&quot;h&quot;:82,&quot;abs_x&quot;:371,&quot;abs_y&quot;:2503}">
                                            <img src="./Editor.md - resumenpedido para aistudio_files/jd.png" alt="JD.com" bis_size="{&quot;x&quot;:417,&quot;y&quot;:2504,&quot;w&quot;:200,&quot;h&quot;:80,&quot;abs_x&quot;:417,&quot;abs_y&quot;:2504}" bis_id="bn_s1ogllrg9naudcipugj0qk">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.360.cn/" target="_blank" title="360" bis_size="{&quot;x&quot;:664,&quot;y&quot;:2503,&quot;w&quot;:292,&quot;h&quot;:82,&quot;abs_x&quot;:664,&quot;abs_y&quot;:2503}">
                                            <img src="./Editor.md - resumenpedido para aistudio_files/360.png" alt="360" bis_size="{&quot;x&quot;:710,&quot;y&quot;:2504,&quot;w&quot;:200,&quot;h&quot;:80,&quot;abs_x&quot;:710,&quot;abs_y&quot;:2504}" bis_id="bn_ty3gaglc36ab0pv3p797pd">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.4399.com/" target="_blank" title="4399" bis_size="{&quot;x&quot;:956,&quot;y&quot;:2503,&quot;w&quot;:292,&quot;h&quot;:82,&quot;abs_x&quot;:956,&quot;abs_y&quot;:2503}">
                                            <img src="./Editor.md - resumenpedido para aistudio_files/4399.png" alt="4399" bis_size="{&quot;x&quot;:1002,&quot;y&quot;:2504,&quot;w&quot;:200,&quot;h&quot;:80,&quot;abs_x&quot;:1002,&quot;abs_y&quot;:2504}" bis_id="bn_coqv4qefo5r3695g0s3scv">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.oschina.net/" target="_blank" title="OSChina.net" bis_size="{&quot;x&quot;:1249,&quot;y&quot;:2503,&quot;w&quot;:292,&quot;h&quot;:82,&quot;abs_x&quot;:1249,&quot;abs_y&quot;:2503}">
                                            <img src="./Editor.md - resumenpedido para aistudio_files/oschina.png" alt="OSChina.net" bis_size="{&quot;x&quot;:1295,&quot;y&quot;:2504,&quot;w&quot;:200,&quot;h&quot;:80,&quot;abs_x&quot;:1295,&quot;abs_y&quot;:2504}" bis_id="bn_ssjxmdfqzsyjgpjj3a3tw2">
                                        </a>
                                    </li>
                                </ul>
                                <ul class="pui-menu pui-menu-inline case-list">
                                    <li>
                                        <a href="https://www.youdao.com/" target="_blank" title="Youdao" bis_size="{&quot;x&quot;:371,&quot;y&quot;:2602,&quot;w&quot;:292,&quot;h&quot;:82,&quot;abs_x&quot;:371,&quot;abs_y&quot;:2602}">
                                            <img src="./Editor.md - resumenpedido para aistudio_files/youdao.jpg" alt="Youdao" bis_size="{&quot;x&quot;:417,&quot;y&quot;:2603,&quot;w&quot;:200,&quot;h&quot;:80,&quot;abs_x&quot;:417,&quot;abs_y&quot;:2603}" bis_id="bn_w86i25vmcxwx1u6bwkzfxj">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.yy.com/" target="_blank" title="YY.com" bis_size="{&quot;x&quot;:664,&quot;y&quot;:2602,&quot;w&quot;:292,&quot;h&quot;:82,&quot;abs_x&quot;:664,&quot;abs_y&quot;:2602}">
                                            <img src="./Editor.md - resumenpedido para aistudio_files/yy.jpg" alt="YY.com" bis_size="{&quot;x&quot;:710,&quot;y&quot;:2603,&quot;w&quot;:200,&quot;h&quot;:80,&quot;abs_x&quot;:710,&quot;abs_y&quot;:2603}" bis_id="bn_f3am1gu5bkz0ggqsftnfjh">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.jumei.com/" target="_blank" title="JUMEI" bis_size="{&quot;x&quot;:956,&quot;y&quot;:2602,&quot;w&quot;:292,&quot;h&quot;:82,&quot;abs_x&quot;:956,&quot;abs_y&quot;:2602}">
                                            <img src="./Editor.md - resumenpedido para aistudio_files/jumei.jpg" alt="JUMEI" bis_size="{&quot;x&quot;:1002,&quot;y&quot;:2603,&quot;w&quot;:200,&quot;h&quot;:80,&quot;abs_x&quot;:1002,&quot;abs_y&quot;:2603}" bis_id="bn_v942cdxjo6ityq4i6uzsgb">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.9you.com/" target="_blank" title="9you.com" bis_size="{&quot;x&quot;:1249,&quot;y&quot;:2602,&quot;w&quot;:292,&quot;h&quot;:82,&quot;abs_x&quot;:1249,&quot;abs_y&quot;:2602}">
                                            <img src="./Editor.md - resumenpedido para aistudio_files/9you.jpg" alt="9you.com" bis_size="{&quot;x&quot;:1295,&quot;y&quot;:2603,&quot;w&quot;:200,&quot;h&quot;:80,&quot;abs_x&quot;:1295,&quot;abs_y&quot;:2603}" bis_id="bn_yarlu0z59pod68dugawkxm">
                                        </a>
                                    </li>
                                </ul>
                                <ul class="pui-menu pui-menu-inline case-list">
                                    <li>
                                        <a href="https://www.csdn.net/" target="_blank" title="CSDN" bis_size="{&quot;x&quot;:371,&quot;y&quot;:2701,&quot;w&quot;:292,&quot;h&quot;:82,&quot;abs_x&quot;:371,&quot;abs_y&quot;:2701}">
                                            <img src="./Editor.md - resumenpedido para aistudio_files/csdn.jpg" alt="CSDN" bis_size="{&quot;x&quot;:417,&quot;y&quot;:2702,&quot;w&quot;:200,&quot;h&quot;:80,&quot;abs_x&quot;:417,&quot;abs_y&quot;:2702}" bis_id="bn_d0a3mkm91ztinp24snthvc">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.mi.com/" target="_blank" title="Xiaomi MI.com" bis_size="{&quot;x&quot;:664,&quot;y&quot;:2701,&quot;w&quot;:292,&quot;h&quot;:82,&quot;abs_x&quot;:664,&quot;abs_y&quot;:2701}">
                                            <img src="./Editor.md - resumenpedido para aistudio_files/xiaomi.png" alt="Xiaomi MI.com" bis_size="{&quot;x&quot;:710,&quot;y&quot;:2702,&quot;w&quot;:200,&quot;h&quot;:80,&quot;abs_x&quot;:710,&quot;abs_y&quot;:2702}" bis_id="bn_jlh3oimm4zxqz6ewej67zr">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.meizu.com/" target="_blank" title="MEIZU" bis_size="{&quot;x&quot;:956,&quot;y&quot;:2701,&quot;w&quot;:292,&quot;h&quot;:82,&quot;abs_x&quot;:956,&quot;abs_y&quot;:2701}">
                                            <img src="./Editor.md - resumenpedido para aistudio_files/meizu.png" alt="MEIZU" bis_size="{&quot;x&quot;:1002,&quot;y&quot;:2702,&quot;w&quot;:200,&quot;h&quot;:80,&quot;abs_x&quot;:1002,&quot;abs_y&quot;:2702}" bis_id="bn_r3p7rsy59i8pe5sk9swzwp">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://golangtc.com/" target="_blank" title="Golang Chinese community" bis_size="{&quot;x&quot;:1249,&quot;y&quot;:2701,&quot;w&quot;:292,&quot;h&quot;:82,&quot;abs_x&quot;:1249,&quot;abs_y&quot;:2701}">
                                            <img src="./Editor.md - resumenpedido para aistudio_files/golangtc.jpg" alt="Golang Chinese community" bis_size="{&quot;x&quot;:1295,&quot;y&quot;:2702,&quot;w&quot;:200,&quot;h&quot;:80,&quot;abs_x&quot;:1295,&quot;abs_y&quot;:2702}" bis_id="bn_u0092p1ui3pyet1l79gact">
                                        </a>
                                    </li>
                                </ul>
                                <ul class="pui-menu pui-menu-inline case-list">
                                    <li>
                                        <a href="https://www.nio.cn/" target="_blank" title="NIO" bis_size="{&quot;x&quot;:371,&quot;y&quot;:2800,&quot;w&quot;:292,&quot;h&quot;:82,&quot;abs_x&quot;:371,&quot;abs_y&quot;:2800}">
                                            <img src="./Editor.md - resumenpedido para aistudio_files/nio.png" alt="NIO" bis_size="{&quot;x&quot;:417,&quot;y&quot;:2801,&quot;w&quot;:200,&quot;h&quot;:80,&quot;abs_x&quot;:417,&quot;abs_y&quot;:2801}" bis_id="bn_qj32mz960pe3xsl5l3617n">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="http://edn.egret.com/cn/" target="_blank" title="Egret HTML5 Game Engine" bis_size="{&quot;x&quot;:664,&quot;y&quot;:2800,&quot;w&quot;:292,&quot;h&quot;:82,&quot;abs_x&quot;:664,&quot;abs_y&quot;:2800}">
                                            <img src="./Editor.md - resumenpedido para aistudio_files/egret-engine.jpg" alt="Egret HTML5 Game Engine" bis_size="{&quot;x&quot;:710,&quot;y&quot;:2801,&quot;w&quot;:200,&quot;h&quot;:80,&quot;abs_x&quot;:710,&quot;abs_y&quot;:2801}" bis_id="bn_1lwxr1krm6c7gowti7j1v7">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="http://bbs.pkbigdata.com/" target="_blank" title="DataCastle" bis_size="{&quot;x&quot;:956,&quot;y&quot;:2800,&quot;w&quot;:292,&quot;h&quot;:82,&quot;abs_x&quot;:956,&quot;abs_y&quot;:2800}">
                                            <img src="./Editor.md - resumenpedido para aistudio_files/datacastle.jpg" alt="DataCastle" bis_size="{&quot;x&quot;:1002,&quot;y&quot;:2801,&quot;w&quot;:200,&quot;h&quot;:80,&quot;abs_x&quot;:1002,&quot;abs_y&quot;:2801}" bis_id="bn_xkbp50mwf2enuo7bqsa9oc">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.showdoc.cc/" target="_blank" title="ShowDoc：一个非常适合IT团队的在线API文档、技术文档工具" bis_size="{&quot;x&quot;:1249,&quot;y&quot;:2800,&quot;w&quot;:292,&quot;h&quot;:82,&quot;abs_x&quot;:1249,&quot;abs_y&quot;:2800}">
                                            <img src="./Editor.md - resumenpedido para aistudio_files/showdoc.png" alt="ShowDoc" bis_size="{&quot;x&quot;:1295,&quot;y&quot;:2801,&quot;w&quot;:200,&quot;h&quot;:80,&quot;abs_x&quot;:1295,&quot;abs_y&quot;:2801}" bis_id="bn_2lcis57kde9akwhu2bbnjb">
                                        </a>
                                    </li>     
                                </ul>
                                <br>
                                <p class="pui-text-center"><a href="mailto:editor.md@ipandao.com" class="pui-text-blue"><i class="fa fa-envelope-o"></i> Contact Us:</a> editor.md@ipandao.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="pui-hr pui-layout-fixed pui-layout-fixed-1200">
            <footer class="pui-layout pui-layout-fixed pui-layout-fixed-1200 page-footer pui-clear">
                <h1 class="pui-text-lg pui-right pui-text-center">
                    <p>
                        <img src="./Editor.md - resumenpedido para aistudio_files/editormd-logo-64x64.png">
                        <span class="pui-block pui-text-gray pui-text-normal">Editor.md</span>
                    </p>
                </h1>
                <p>Copyright © 2015-2019 <a href="https://github.com/pandao/editor.md" class="pui-link" target="_blank">Editor.md</a>, <a href="https://github.com/pandao/editor.md/blob/master/LICENSE" class="pui-link" target="_blank">MIT license.</a></p>
                <p>Design &amp; Develop By: <a href="https://github.com/pandao" class="pui-link" target="_blank">Pandao</a>
                 <a href="https://github.com/pandao" target="_blank"><i class="fa fa-github fa-lg"></i></a>
                 <a href="https://twitter.com/ipandao" target="_blank"><i class="fa fa-twitter fa-lg pui-text-blue"></i></a>
                 <a href="http://weibo.com/ipandao" target="_blank"><i class="fa fa-weibo fa-lg pui-text-red"></i></a>&nbsp;&nbsp; 
                 <script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1254310986'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s11.cnzz.com/stat.php%3Fid%3D1254310986%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));</script><span id="cnzz_stat_icon_1254310986"></span><script src="./Editor.md - resumenpedido para aistudio_files/stat.php" type="text/javascript"></script>
                </p>
            </footer>
        </div>
        
        <script src="./Editor.md - resumenpedido para aistudio_files/jquery.min.js.הורדה"></script>

        <!--[if lt IE 9]>
        <script type="text/javascript" src="https://pandao.github.io/dist/js/planeui.patch.ie8.min.js"></script>
        <![endif]-->

        <!--[if lt IE 10]>
        <script type="text/javascript" src="https://pandao.github.io/dist/js/planeui.patch.ie9.min.js"></script>
        <![endif]-->

        <script type="text/javascript" src="./Editor.md - resumenpedido para aistudio_files/planeui.js.הורדה"></script>
        <script src="./Editor.md - resumenpedido para aistudio_files/editormd.min.js.הורדה"></script>   
        <script src="./Editor.md - resumenpedido para aistudio_files/clipboard.min.js.הורדה"></script>
        <script src="./Editor.md - resumenpedido para aistudio_files/en.js.הורדה"></script>
        <script src="./Editor.md - resumenpedido para aistudio_files/index-en.js.הורדה"></script>
    

<i title="Raphaël Colour Picker" style="display: none; color: white;"></i></body></html>