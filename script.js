const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");
const colorPalette = document.getElementById("colorPalette");
const colorThief = new ColorThief();

imageInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    const reader = new FileReader();

    reader.onload = function (e) {
      img.src = e.target.result;
      imagePreview.innerHTML = "";
      imagePreview.appendChild(img);

      img.onload = function () {
        const colors = colorThief.getPalette(img, 6); // 6 colores
        displayColors(colors);
      };
    };

    reader.readAsDataURL(file);
  }
});

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(x =>
    x.toString(16).padStart(2, '0')
  ).join('');
}

function displayColors(colors) {
  colorPalette.innerHTML = "";

  colors.forEach(color => {
    const [r, g, b] = color;
    const hex = rgbToHex(r, g, b);
    const div = document.createElement("div");
    div.className = "color-box";
    div.style.backgroundColor = hex;
    div.title = hex;
    div.textContent = hex;
    
    div.addEventListener("click", () => {
      navigator.clipboard.writeText(hex);
    });

    colorPalette.appendChild(div);
  });
}
