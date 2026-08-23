# Manual de personalización — Murallatrans

Este manual explica cómo modificar la reconstrucción de la web de Murallatrans sin necesidad de frameworks. El proyecto usa **HTML, CSS y JavaScript puro** y está preparado para funcionar en castellano y catalán.

---

## 1. Estructura del proyecto

```text
murallatrans-reconstruida/
├── index.html
├── styles.css
├── script.js
├── README.md
├── MANUAL_PERSONALIZACION.md
└── assets/
    ├── murallatrans-logo.png
    ├── hero-video.mp4
    └── hero-video-poster.jpg
```

### ¿Qué modifica cada archivo?

- **`index.html`**: estructura de la web: cabecera, hero, empresa, servicios, contacto, formulario y footer.
- **`styles.css`**: diseño visual: colores, tamaños, espacios, tipografías, responsive, botones, tarjetas y hero.
- **`script.js`**: comportamiento: idiomas ES/CA, menú móvil, vídeo, animaciones al hacer scroll, navegación activa y formulario.
- **`assets/hero-video.mp4`**: vídeo que aparece como fondo del primer apartado.
- **`assets/hero-video-poster.jpg`**: imagen que se muestra mientras carga el vídeo o si el navegador todavía no lo ha reproducido.

---

## 2. Cómo abrir y probar la web

Puedes abrir `index.html` directamente, pero para trabajar cómodamente es mejor usar un servidor local.

Desde la carpeta del proyecto:

```bash
python -m http.server 8080
```

Después abre:

```text
http://localhost:8080
```

Cuando cambies CSS o JavaScript y no veas el cambio, haz una recarga forzada del navegador:

- Windows/Linux: `Ctrl + F5`
- macOS: `Cmd + Shift + R`

---

# PARTE A — MODIFICAR EL HERO CON VÍDEO

## 3. Cambiar el vídeo de fondo

El vídeo está definido en `index.html` dentro del primer apartado:

```html
<video
  class="hero-video-bg"
  id="hero-video"
  autoplay
  muted
  loop
  playsinline
  preload="metadata"
  poster="assets/hero-video-poster.jpg"
>
  <source src="assets/hero-video.mp4" type="video/mp4" />
</video>
```

La forma más sencilla de sustituirlo es:

1. Prepara tu vídeo en formato MP4.
2. Llámalo `hero-video.mp4`.
3. Sustituye el archivo que hay en `assets/hero-video.mp4`.
4. Mantén el mismo nombre y no tendrás que modificar código.

### Recomendaciones para el vídeo

- Formato recomendado: **MP4 / H.264**.
- Relación de aspecto recomendada: **16:9**.
- Resolución habitual: 1920×1080 o 1280×720.
- Duración recomendada para un loop: entre 6 y 20 segundos.
- Evita archivos excesivamente pesados. Para una web corporativa intenta mantenerlo, si es posible, por debajo de 5–10 MB.
- Evita incluir audio. El vídeo del hero está silenciado porque los navegadores normalmente bloquean el autoplay con sonido.

Si quieres utilizar otro nombre:

```html
<source src="assets/mi-video-camiones.mp4" type="video/mp4" />
```

---

## 4. Cambiar la imagen de espera del vídeo

La imagen de espera está aquí:

```html
poster="assets/hero-video-poster.jpg"
```

Puedes reemplazar `hero-video-poster.jpg` por una captura del vídeo o por cualquier imagen corporativa.

Por ejemplo:

```html
poster="assets/flota-murallatrans.jpg"
```

---

## 5. Hacer el hero más oscuro o más claro

En `styles.css`, busca:

```css
.hero-video-overlay {
```

Actualmente hay dos degradados oscuros superpuestos al vídeo para asegurar que los textos sean legibles.

Ejemplo simplificado:

```css
.hero-video-overlay {
  background:
    linear-gradient(90deg, rgba(7,9,11,.88), rgba(7,9,11,.34)),
    linear-gradient(0deg, rgba(7,9,11,.58), rgba(7,9,11,.08));
}
```

El último valor de `rgba()` es la opacidad.

- `.90` = muy oscuro.
- `.60` = oscuro medio.
- `.30` = más transparente.
- `.00` = sin oscurecimiento.

Si el vídeo tiene mucho detalle y cuesta leer el texto, aumenta estos valores.

---

## 6. Reencuadrar el vídeo

En `styles.css`:

```css
.hero-video-bg {
  object-fit: cover;
  object-position: center center;
}
```

Puedes mover el foco visual.

### Mostrar más la zona izquierda

```css
object-position: 30% center;
```

### Mostrar más la zona derecha

```css
object-position: 70% center;
```

### Mostrar más la parte superior

```css
object-position: center 30%;
```

En móvil ya existe un ajuste específico:

```css
.hero-video-bg {
  object-position: 58% center;
}
```

Ese valor se encuentra dentro del bloque `@media (max-width: 760px)`.

---

## 7. Cambiar la altura del hero

Busca:

```css
.hero.hero-video {
  min-height: 100svh;
}
```

`100svh` significa aproximadamente la altura completa de la pantalla.

Ejemplos:

```css
min-height: 90svh;
```

Hero algo más corto.

```css
min-height: 110svh;
```

Hero más alto.

---

## 8. Pausar y reanudar el vídeo

El botón ya está incluido en `index.html`:

```html
<button class="hero-video-toggle" ...>
```

Su comportamiento está controlado en `script.js` mediante:

```js
heroVideoToggle.addEventListener('click', async () => {
```

No necesitas modificar nada para que funcione.

El botón cambia automáticamente entre:

- Pausar vídeo / Pausar vídeo.
- Reproducir vídeo / Reproduir vídeo.

según el idioma seleccionado.

### Hacer que el vídeo empiece pausado

Elimina `autoplay` en `index.html`:

```html
<video class="hero-video-bg" id="hero-video" muted loop playsinline ...>
```

El JavaScript detectará que está pausado y el botón aparecerá en modo “Reproducir”.

### Desactivar por completo el botón

En `styles.css`:

```css
.hero-video-toggle {
  display: none;
}
```

---

## 9. Accesibilidad y movimiento reducido

El JavaScript comprueba automáticamente:

```js
window.matchMedia('(prefers-reduced-motion: reduce)')
```

Si el usuario ha configurado su sistema operativo para reducir animaciones, el vídeo se pausa automáticamente.

Es recomendable mantener este comportamiento.

---

# PARTE B — MODIFICAR TEXTOS Y CONTENIDO

## 10. Cambiar los textos de la web

La web tiene dos capas de texto:

1. El contenido base de `index.html`.
2. Las traducciones que están en `script.js`.

**Importante:** si un elemento tiene `data-i18n`, JavaScript sustituye el texto del HTML al cargar la página. Por eso, para cambios permanentes, debes actualizar las traducciones de `script.js`.

Ejemplo del HTML:

```html
<p data-i18n="hero.slogan">
  75 años trabajando para que mañana sea mañana
</p>
```

En `script.js`, versión española:

```js
'hero.slogan': '75 años trabajando para que mañana sea mañana',
```

Versión catalana:

```js
'hero.slogan': '75 anys treballant perquè demà sigui demà',
```

### Regla recomendada

Cuando cambies un texto traducible:

1. Modifica la versión española en `translations.es`.
2. Modifica la versión catalana en `translations.ca`.
3. Opcionalmente actualiza también el texto base del `index.html` para que sea coherente si JavaScript no carga.

---

## 11. Cambiar el título principal del hero

El texto `Murallatrans` no está traducido y está directamente en `index.html`:

```html
<h1>Murallatrans</h1>
```

Puedes sustituirlo directamente.

---

## 12. Cambiar los botones del hero

HTML:

```html
<a class="btn btn-primary" href="#servicios" data-i18n="hero.servicesCta">
  Descubre nuestros servicios
</a>
```

Para cambiar el texto, edita estas claves en `script.js`:

```js
'hero.servicesCta': 'Descubre nuestros servicios',
'hero.contactCta': 'Contacta con nosotros',
```

Para cambiar a dónde lleva el botón:

```html
href="#servicios"
```

Ejemplos:

```html
href="#contacto"
```

```html
href="https://ejemplo.com"
```

Si es un enlace externo puedes añadir:

```html
target="_blank" rel="noopener"
```

---

## 13. Cambiar las cifras destacadas del hero

En `index.html`:

```html
<div><strong>1948</strong><span data-i18n="hero.since">Desde</span></div>
<div><strong>24 h</strong><span data-i18n="hero.delivery">Distribución paletizada nacional</span></div>
<div><strong>Europa</strong><span data-i18n="hero.coverage">Cobertura internacional</span></div>
```

Los valores `1948`, `24 h` y `Europa` se cambian directamente en HTML.

Los textos pequeños se cambian en `script.js` porque son traducibles.

---

# PARTE C — PERSONALIZAR EL CSS

## 14. Colores principales de toda la web

Al principio de `styles.css` encontrarás:

```css
:root {
  --bg: #ffffff;
  --soft: #f5f5f3;
  --ink: #151719;
  --muted: #686c72;
  --dark: #111315;
  --red: #e31b23;
  --red-dark: #bd1118;
  --container: 1180px;
  --radius: 18px;
}
```

Estas variables controlan gran parte del diseño.

### Cambiar el rojo corporativo

```css
--red: #e31b23;
```

Por ejemplo:

```css
--red: #c8102e;
```

También conviene actualizar:

```css
--red-dark: #a40d25;
```

---

## 15. Cambiar el ancho máximo de la web

```css
--container: 1180px;
```

Más ancho:

```css
--container: 1320px;
```

Más compacto:

```css
--container: 1080px;
```

---

## 16. Cambiar el redondeado de tarjetas y bloques

```css
--radius: 18px;
```

Diseño más recto:

```css
--radius: 6px;
```

Diseño más redondeado:

```css
--radius: 28px;
```

---

## 17. Cambiar la tipografía

En `body`:

```css
font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
```

Puedes utilizar otra tipografía del sistema, por ejemplo:

```css
font-family: Arial, sans-serif;
```

Si quieres usar Google Fonts o una fuente corporativa externa necesitarás cargarla antes en el `<head>` de `index.html`.

---

## 18. Cambiar el tamaño del logo

Escritorio:

```css
.brand img {
  width: 238px;
}
```

Tablet:

```css
.brand img {
  width: 210px;
}
```

Móvil:

```css
.brand img {
  width: 165px;
}
```

Estos valores están repartidos entre el CSS general y los bloques responsive.

---

## 19. Cambiar el tamaño de los títulos

El título del hero utiliza:

```css
.hero-copy h1 {
  font-size: clamp(4.5rem, 9vw, 8.8rem);
}
```

`clamp(mínimo, adaptable, máximo)` permite que el texto sea responsive.

Ejemplo más pequeño:

```css
font-size: clamp(3.5rem, 7vw, 7rem);
```

---

## 20. Cambiar el espacio vertical de todas las secciones

```css
.section {
  padding: 112px 0;
}
```

Más compacto:

```css
padding: 80px 0;
```

Más espacioso:

```css
padding: 140px 0;
```

En móvil ya hay un valor distinto:

```css
.section {
  padding: 82px 0;
}
```

---

## 21. Botones

Estilo base:

```css
.btn {
  min-height: 50px;
  padding: 13px 21px;
  border-radius: 999px;
}
```

`999px` crea el efecto de píldora.

Para botones menos redondos:

```css
border-radius: 8px;
```

Botón principal:

```css
.btn-primary {
  background: var(--red);
  color: #fff;
}
```

---

## 22. Quitar la franja animada inferior del hero

La franja roja del hero usa:

```css
.hero-marquee
```

Para ocultarla:

```css
.hero-marquee {
  display: none;
}
```

Si la eliminas, puedes acercar el botón de pausa al borde inferior modificando:

```css
.hero-video-toggle {
  bottom: 22px;
}
```

---

# PARTE D — RESPONSIVE

## 23. Breakpoints utilizados

La web tiene tres puntos principales:

```css
@media (max-width: 1120px)
```

Tablet / pantallas medianas.

```css
@media (max-width: 760px)
```

Móviles.

```css
@media (max-width: 470px)
```

Móviles pequeños.

Si quieres modificar exclusivamente el aspecto móvil, hazlo dentro de estos bloques y evita cambiar innecesariamente los estilos de escritorio.

---

## 24. Ocultar un elemento solo en móvil

Ejemplo:

```css
@media (max-width: 760px) {
  .mi-elemento {
    display: none;
  }
}
```

---

## 25. Cambiar un grid de 3 columnas a una columna

En escritorio:

```css
.mi-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

En móvil:

```css
@media (max-width: 760px) {
  .mi-grid {
    grid-template-columns: 1fr;
  }
}
```

Este patrón ya está utilizado en varias secciones del proyecto.

---

# PARTE E — PERSONALIZAR JAVASCRIPT

## 26. Estructura principal de `script.js`

El archivo tiene estas partes:

1. `translations` — textos ES y CA.
2. Selección de elementos del DOM.
3. Cambio de idioma.
4. Control del vídeo del hero.
5. Menú móvil.
6. Animaciones `reveal`.
7. Navegación activa al hacer scroll.
8. Cabecera y botón volver arriba.
9. Año automático del footer.
10. Formulario de contacto.

---

## 27. Cambiar el idioma por defecto

Actualmente:

```js
let currentLanguage = localStorage.getItem('murallatrans-language') || 'es';
```

El idioma inicial es español.

Para que el idioma predeterminado sea catalán:

```js
let currentLanguage = localStorage.getItem('murallatrans-language') || 'ca';
```

La preferencia elegida por el visitante se guarda en `localStorage`.

---

## 28. Añadir un nuevo texto traducible

### Paso 1 — HTML

```html
<h3 data-i18n="custom.title">Mi título</h3>
```

### Paso 2 — Español en `script.js`

Dentro de `translations.es`:

```js
'custom.title': 'Mi título',
```

### Paso 3 — Catalán

Dentro de `translations.ca`:

```js
'custom.title': 'El meu títol',
```

No hace falta añadir más JavaScript. La función `applyLanguage()` lo detecta automáticamente.

---

## 29. Textos que contienen HTML

Para textos que contienen enlaces se usa:

```html
data-i18n-html="form.privacy"
```

En este caso JavaScript utiliza `innerHTML` en vez de `textContent`.

Utiliza `data-i18n-html` solo cuando realmente necesites etiquetas HTML dentro de la traducción.

---

## 30. Modificar el comportamiento del vídeo

Variables principales:

```js
const heroVideo = document.querySelector('#hero-video');
const heroVideoToggle = document.querySelector('.hero-video-toggle');
```

El estado se comprueba con:

```js
heroVideo.paused
```

Pausar manualmente desde JavaScript:

```js
heroVideo.pause();
```

Reproducir:

```js
heroVideo.play();
```

No es recomendable activar sonido automáticamente: muchos navegadores bloquearían el autoplay.

---

## 31. Animaciones al aparecer en pantalla

Los elementos que tienen:

```html
class="reveal"
```

empiezan ocultos y aparecen cuando entran en el viewport.

JavaScript usa `IntersectionObserver`:

```js
const revealObserver = new IntersectionObserver(...)
```

Puedes cambiar la sensibilidad aquí:

```js
{ threshold: 0.12, rootMargin: '0px 0px -40px' }
```

Un `threshold` más alto hace que el elemento tenga que estar más visible antes de animarse.

---

## 32. Quitar la animación de un elemento

Solo elimina la clase:

```html
reveal
```

Por ejemplo:

```html
<div class="contact-copy">
```

En vez de:

```html
<div class="contact-copy reveal">
```

---

## 33. Menú móvil

El botón hamburguesa utiliza:

```js
function setMenu(open)
```

Se abre y se cierra cambiando:

- `aria-expanded`
- la clase `.open`
- el atributo `hidden` del menú móvil.

No necesitas duplicar lógica si solo quieres cambiar colores o tamaños: haz esos cambios en CSS.

---

## 34. Navegación activa al hacer scroll

La lista actual es:

```js
const sections = ['inicio', 'empresa', 'servicios', 'contacto']
```

Si añades una nueva sección al menú, por ejemplo:

```html
<section id="flota">
```

añádela también:

```js
const sections = ['inicio', 'empresa', 'servicios', 'flota', 'contacto']
```

Y añade el enlace correspondiente al menú de escritorio y móvil:

```html
<a href="#flota">Flota</a>
```

---

# PARTE F — AÑADIR O QUITAR APARTADOS

## 35. Añadir una nueva sección

Ejemplo básico antes de `#contacto`:

```html
<section class="section section-light" id="flota">
  <div class="container">
    <div class="section-heading reveal">
      <span class="eyebrow">Flota</span>
      <h2>Nuestra flota</h2>
      <p>Descripción de la flota.</p>
    </div>
  </div>
</section>
```

Después puedes crear estilos específicos:

```css
#flota {
  background: #f5f5f3;
}
```

Si aparecerá en el menú y quieres que se active al hacer scroll, recuerda actualizar el array `sections` de JavaScript.

---

## 36. Eliminar una sección

Puedes borrar el bloque `<section>...</section>` correspondiente en `index.html`.

Si esa sección está enlazada en el menú:

1. Borra el enlace del menú de escritorio.
2. Borra el enlace del menú móvil.
3. Elimina su ID del array `sections` de `script.js`.

---

# PARTE G — FORMULARIO

## 37. Cómo funciona el formulario actual

La web es estática y no tiene servidor propio.

Al enviar el formulario, JavaScript genera:

```text
mailto:murallatrans@murallatrans.com
```

Esto abre el programa de correo del usuario con los datos preparados.

El código está al final de `script.js`.

---

## 38. Cambiar el correo destinatario

Busca en `script.js`:

```js
const mailto = `mailto:murallatrans@murallatrans.com?...`;
```

Y sustituye la dirección.

También conviene modificar todos los enlaces de correo que hay en `index.html`.

---

## 39. Convertir el formulario en un envío real

Necesitarás conectarlo a una de estas opciones:

- un backend propio en PHP, Node.js, Python, etc.;
- un endpoint de tu CMS;
- un servicio externo de formularios.

En ese caso habría que sustituir el código `mailto:` por una petición `fetch()` al servidor.

---

# PARTE H — CAMBIOS RÁPIDOS HABITUALES

## 40. Quiero cambiar solo el color rojo

`styles.css`:

```css
:root {
  --red: TU_COLOR;
  --red-dark: TU_COLOR_OSCURO;
}
```

---

## 41. Quiero que el hero sea más oscuro

Aumenta la opacidad de `.hero-video-overlay`.

Por ejemplo cambia:

```css
rgba(7,9,11,.72)
```

por:

```css
rgba(7,9,11,.86)
```

---

## 42. Quiero que se vea más vídeo y menos sombreado

Haz lo contrario:

```css
rgba(7,9,11,.45)
```

---

## 43. Quiero mover el texto del hero más hacia arriba

Reduce el `padding-top` o cambia la alineación del hero.

Actualmente:

```css
.hero.hero-video {
  display: flex;
  align-items: center;
}
```

Para colocar el contenido arriba:

```css
align-items: flex-start;
```

Y ajusta `padding-top`.

---

## 44. Quiero cambiar la velocidad de la marquesina roja

Busca:

```css
.hero-marquee div {
  animation: marquee 25s linear infinite;
}
```

Más rápido:

```css
animation: marquee 15s linear infinite;
```

Más lento:

```css
animation: marquee 40s linear infinite;
```

---

## 45. Quiero cambiar los enlaces del menú

En `index.html` existen dos menús:

- `.desktop-nav`
- `#mobile-menu`

Mantén ambos sincronizados.

Ejemplo:

```html
<a href="#servicios">Servicios</a>
```

El `href` debe coincidir exactamente con el `id` de la sección:

```html
<section id="servicios">
```

---

# PARTE I — CONSEJOS DE MANTENIMIENTO

## 46. Haz copias antes de cambios grandes

Antes de modificar una sección completa, duplica la carpeta o usa Git.

Ejemplo:

```bash
git init
git add .
git commit -m "Versión inicial"
```

Después podrás comparar y recuperar versiones anteriores.

---

## 47. No cambies muchas cosas a la vez

Flujo recomendado:

1. Cambia una cosa.
2. Guarda.
3. Recarga la web.
4. Comprueba escritorio.
5. Comprueba móvil.
6. Continúa con el siguiente cambio.

Así es mucho más fácil detectar qué modificación ha provocado un problema.

---

## 48. Comprueba siempre ambos idiomas

Después de cambiar contenido:

1. Abre la web en ES.
2. Comprueba todos los textos modificados.
3. Cambia a CA.
4. Comprueba la traducción y que no haya textos demasiado largos para el diseño.

---

## 49. Comprueba estas anchuras

Como mínimo:

- 1440 px — escritorio.
- 1024 px — portátil/tablet horizontal.
- 768 px — tablet.
- 390 px — móvil típico.
- 320 px — móvil estrecho.

---

## 50. Resumen de los puntos más importantes

Si solo quieres recordar cinco cosas:

1. **Contenido/estructura:** `index.html`.
2. **Colores/tamaños/responsive:** `styles.css`.
3. **Idiomas y comportamiento:** `script.js`.
4. **Vídeo del hero:** sustituye `assets/hero-video.mp4`.
5. Si un texto tiene `data-i18n`, **modifica también las traducciones de `script.js`**, porque JavaScript sustituye el texto del HTML al cargar.

---

## Archivos relacionados con el hero

Para localizar rápidamente todo lo que afecta al nuevo hero busca estas expresiones:

### `index.html`

```text
hero-video
hero-video-toggle
hero-marquee
```

### `styles.css`

```text
HERO CON VIDEO DE FONDO
.hero.hero-video
.hero-video-bg
.hero-video-overlay
.hero-video-toggle
```

### `script.js`

```text
hero.pauseVideo
hero.playVideo
heroVideo
updateHeroVideoButton
```

Con esas búsquedas puedes encontrar prácticamente toda la configuración del hero sin recorrer los archivos completos.
