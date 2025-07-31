const imageInput = document.getElementById('imageInput');
const preview = document.getElementById('preview');
const analyzeBtn = document.getElementById('analyzeBtn');
const colorPalette = document.getElementById('colorPalette');
const colorThief = new ColorThief();

imageInput.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    preview.src = e.target.result;
    preview.style.display = 'block';
    analyzeBtn.style.display = 'inline-block';
  };
  reader.readAsDataURL(file);
});

analyzeBtn.addEventListener('click', function () {
  if (preview.complete && preview.naturalHeight !== 0) {
    const palette = colorThief.getPalette(preview, 8);
    showPalette(palette);
  } else {
    alert('La imagen aún no ha cargado. Intenta nuevamente en unos segundos.');
  }
});

// Función para obtener nombre aproximado del color
function getColorName(r, g, b) {
  const colors = {
    'Negro': [0, 0, 0],
    'Gris oscuro': [64, 64, 64],
    'Gris claro': [192, 192, 192],
    'Blanco': [255, 255, 255],
    'Rojo': [255, 0, 0],
    'Verde': [0, 128, 0],
    'Azul': [0, 0, 255],
    'Amarillo': [255, 255, 0],
    'Cian': [0, 255, 255],
    'Magenta': [255, 0, 255],
    'Naranja': [255, 165, 0],
    'Marrón': [139, 69, 19],
    'Rosa': [255, 192, 203],
    'Púrpura': [128, 0, 128],
    'Verde oliva': [128, 128, 0]
  };

  let closestName = 'Color';
  let minDist = Infinity;
  for (const name in colors) {
    const [cr, cg, cb] = colors[name];
    const dist = Math.sqrt((r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2);
    if (dist < minDist) {
      minDist = dist;
      closestName = name;
    }
  }
  return closestName;
}

function showPalette(palette) {
  colorPalette.innerHTML = '';
  palette.forEach((color) => {
    const name = getColorName(color[0], color[1], color[2]);
    const box = document.createElement('div');
    box.className = 'color-box';
    box.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

    const label = document.createElement('div');
    label.className = 'color-label';
    label.textContent = name;

    const container = document.createElement('div');
    container.className = 'color-item';
    container.appendChild(box);
    container.appendChild(label);

    colorPalette.appendChild(container);
  });
}
