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

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join('');
}

function showPalette(palette) {
  colorPalette.innerHTML = '';
  palette.forEach((color) => {
    const hex = rgbToHex(color[0], color[1], color[2]);
    const box = document.createElement('div');
    box.className = 'color-box';
    box.style.backgroundColor = hex;

    const label = document.createElement('div');
    label.className = 'color-label';
    label.textContent = hex;

    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copiar';
    copyBtn.className = 'copy-btn';
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(hex);
      copyBtn.textContent = '¡Copiado!';
      setTimeout(() => (copyBtn.textContent = 'Copiar'), 1500);
    };

    const container = document.createElement('div');
    container.className = 'color-item';
    container.appendChild(box);
    container.appendChild(label);
    container.appendChild(copyBtn);

    colorPalette.appendChild(container);
  });
}
