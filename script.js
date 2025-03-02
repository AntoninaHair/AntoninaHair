document.querySelector(".menu-btn").addEventListener("click", function() {
    let menu = document.querySelector(".menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// Смена темы
document.querySelector(".theme-btn").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

// Загрузка фото в галерею
const fileInput = document.getElementById("fileInput");
const galleryContainer = document.getElementById("gallery-container");

// Восстанавливаем сохраненные фото
window.onload = function() {
    let savedImages = JSON.parse(localStorage.getItem("gallery")) || [];
    savedImages.forEach(imgSrc => addImageToGallery(imgSrc));
};

fileInput.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            addImageToGallery(e.target.result);
            saveImage(e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

function addImageToGallery(src) {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("gallery-img");
    galleryContainer.appendChild(img);
}

// Сохранение изображений в localStorage
function saveImage(src) {
    let savedImages = JSON.parse(localStorage.getItem("gallery")) || [];
    savedImages.push(src);
    localStorage.setItem("gallery", JSON.stringify(savedImages));
}

// Смена фона
document.querySelector(".change-bg").addEventListener("click", function() {
    const backgrounds = [
        "url('background1.jpg')",
        "url('background2.jpg')",
        "url('background3.jpg')"
    ];
    let currentBg = localStorage.getItem("background") || "url('background1.jpg')";
    let nextBg = backgrounds[(backgrounds.indexOf(currentBg) + 1) % backgrounds.length];
    document.body.style.backgroundImage = nextBg;
    localStorage.setItem("background", nextBg);
});

// Восстанавливаем фон при загрузке
document.body.style.backgroundImage = localStorage.getItem("background") || "url('background1.jpg')";