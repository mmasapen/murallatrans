# Murallatrans — reconstrucción estática

Proyecto responsive en HTML, CSS y JavaScript inspirado en la estructura y contenidos públicos de Murallatrans.

## Archivos principales

- `index.html` — estructura y contenido.
- `styles.css` — diseño responsive, animaciones y componentes.
- `script.js` — selector ES/CA, menú móvil, hero de vídeo, navegación activa, animaciones y formulario.
- `MANUAL_PERSONALIZACION.md` — guía detallada para personalizar HTML, CSS, JavaScript, idiomas y hero.
- `assets/murallatrans-logo.png` — logotipo.
- `assets/hero-video.mp4` — vídeo local del hero.
- `assets/hero-video-poster.jpg` — imagen de espera del vídeo.

## Hero de vídeo

El primer apartado utiliza un vídeo de fondo local en loop, silenciado y adaptado a toda la pantalla. Incluye un botón accesible para pausar y reanudar la reproducción y respeta la preferencia `prefers-reduced-motion` del usuario.

Para cambiar el vídeo, sustituye `assets/hero-video.mp4` por otro MP4 H.264 manteniendo el mismo nombre. El manual explica también cómo cambiar el encuadre, la oscuridad del overlay y el comportamiento de reproducción.

## Uso

Abre `index.html` en un navegador o sirve la carpeta con cualquier servidor estático, por ejemplo:

```bash
python -m http.server 8080
```

Después abre `http://localhost:8080`.

## Notas

- El selector ES / CA funciona sin recargar y guarda la preferencia en `localStorage`.
- El formulario es una demostración estática: valida campos y prepara un correo mediante `mailto:`. Para envío real hay que conectarlo a un backend o servicio de formularios.
- El mapa usa un `iframe` de Google Maps y necesita conexión a Internet para cargarse.
- Los enlaces legales apuntan a las páginas públicas actuales de Murallatrans.
