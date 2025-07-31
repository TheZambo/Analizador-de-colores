const imageInput = document.getElementById('imageInput');
const preview = document.getElementById('preview');
const canvas = document.getElementById('canvas');
const colorPalette = document.getElementById('colorPalette');
const colorThief = new ColorThief();

imageInput.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    preview.src = e.target.result;
    preview.style.display = 'block';

    preview.onload = function () {
      const numberOfColors = 8;
      const palette = colorThief.getPalette(preview, numberOfColors);
      showPalette(palette);
    };
  };
  reader.readAsDataURL(file);
});

function showPalette(palette) {
  colorPalette.innerHTML = '';
  palette.forEach((color) => {
    const box = document.createElement('div');
    box.className = 'color-box';
    box.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    colorPalette.appendChild(box);
  });
}
