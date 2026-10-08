# Mapaches vs. Monos — v0.1.0

Primer prototipo mínimo: elegir uno de tres arbustos. Cada ronda esconde un mapache radiactivo, uno de esporas y un resultado vacío, barajados antes de elegir. Solo se permite una elección por ronda; “Volver a buscar” genera otra.

## Jugar

https://guerrasur.github.io/mapachesvsmonos/

Mobile-first, con ratón o teclado (Tab y Enter). Pixel art original dibujado en Canvas 2D, inspirado en las referencias del repo. Sin dependencias ni compilación.

Las capturas y la ronda actual se guardan en localStorage del dispositivo. La versión está en el encabezado. Se consulta `version.json` al abrir, recuperar el foco, volver a estar online y cada 60 segundos. Una versión nueva se carga automáticamente, después de terminar la animación activa. El botón ↻ permite comprobar manualmente. Todos los recursos de código y estilo llevan la versión en su URL para evitar caché viejo.

## Desarrollo

```sh
python3 -m http.server 8000
```

Abrir http://localhost:8000. Para publicar una versión, actualizar el número en `index.html` (estilos, módulo y etiqueta), `src/app.js` (constante e import), `version.json` y este documento. GitHub Pages publica desde la rama main. Las referencias permanecen en el repositorio.

## Alcance

Solo búsqueda en arbustos y registro mínimo de dos hallazgos para evaluar la mecánica. Los bandos, carnadas, esperas, historia y colección completa quedan para futuras versiones.
