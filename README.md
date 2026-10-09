# Mapaches vs. Monos — v0.3.0

Prototipo de colección y captura en un mundo nocturno posapocalíptico. La dirección visual usa las referencias nuevas del proyecto: ruinas industriales, vegetación mutante, radiación verde y neón magenta. Fondos y título provistos por el equipo; sprites originales en Canvas. Interfaz oscura y textos breves.

## Jugar

https://guerrasur.github.io/mapachesvsmonos/

1. Elegir Mapaches o Monos.
2. Dejar restos (mapaches) o fruta (monos).
3. Esperar 10 segundos, incluso con la página cerrada.
4. Elegir un arbusto o un árbol. Dos opciones esconden criaturas diferentes y una no tiene nada; se barajan al crear cada ronda.
5. Ver la captura en el archivo de mutantes y empezar otra búsqueda.

Esta versión permite probar ambos bandos desde «Elegir bando», conserva todas las capturas y ofrece carnadas gratuitas. Cambiar al otro bando empieza una nueva búsqueda. Hay cuatro criaturas: Rastro, Micelio, Volt y Zarza. La espera breve es para evaluar el prototipo; todavía no se implementa la espera aleatoria de 5 minutos a 3 horas del juego completo.

## Guardado y actualizaciones

Las capturas, el bando, la ronda y los timestamps de carnada se guardan en localStorage del dispositivo. Al abrir la página se recalcula la espera. El esquema 2 migra las capturas y la ronda válida de v0.1/v0.2 sin duplicarlas. La elección se guarda antes de la animación para que recargar no vuelva a otorgar el mismo hallazgo. Si el navegador bloquea localStorage, el juego funciona durante la sesión y muestra un aviso.

El encabezado muestra la versión. Se consulta `version.json` al abrir, recuperar el foco, volver a estar online y cada 60 segundos. Las versiones nuevas se cargan automáticamente después de la animación activa. El botón ↻ permite comprobar manualmente. Los módulos, estilos y fondos llevan versión en su URL.

## Desarrollo

Sin dependencias ni compilación:

```sh
python3 -m http.server 8000
```

Abrir http://localhost:8000. Controles táctiles o ratón; teclado con Tab y Enter. Si se solicita reducir movimiento, se omite la animación de búsqueda. Hay un fondo de respaldo dibujado por código si las imágenes no cargan.

GitHub Pages publica desde `main`. Para una nueva versión, sincronizar `index.html`, los imports de `src/app.js`, la constante `VERSION`, la URL de arte en `src/render.js`, `version.json` y este documento.

## Dirección de arte

| Color | Uso |
| --- | --- |
| `#020426` | Fondo y contornos |
| `#0F0840` | Paneles y sombras |
| `#097373` | Vegetación y metal |
| `#27F2B9` | Neón y acciones |
| `#D3D93B` | Ojos y radiación |
| `#70E743` | Mutaciones vegetales |
| `#A2237E` | Esporas y acentos |

`assets/night-city.jpg`, `assets/world.jpg` y `assets/title.jpg` contienen el arte enviado para esta actualización. Las primeras referencias también se conservan en la raíz. Los cuatro sprites usan formas, capas y mutaciones propias, no solo cambios de color.

## Próximas fases

El diseño completo prevé más de 100 variantes, rarezas, habilidades, carnadas con probabilidades distintas, múltiples zonas, tutorial, progresión y PWA. Esta entrega se limita a la dirección visual y a probar el ciclo básico de ambos bandos. No hay economía, notificaciones, duelos ni guardado online todavía.
