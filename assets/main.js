const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const carousel = $(".carousel");
const carouselInner = $(".carousel-inner");
const carouselNav = $(".carousel-nav");
const nextBtn = $(".next");
const prevBtn = $(".prev");

const items = document.querySelectorAll(".item");
const dotsContainer = document.querySelector(".carousel-dots");
let currentIndex = 0;

// // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function showSlide(index) {
    carouselInner.style.transform = `translateX(-${index * 100}%)`;
}

function setActiveDot(index) {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    showSlide(currentIndex);
    setActiveDot(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(currentIndex);
    setActiveDot(currentIndex);
}

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

items.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
        currentIndex = index;
        showSlide(currentIndex);
        setActiveDot(currentIndex);
    });
    dotsContainer.appendChild(dot);
});

// -----------
// Xử lí Mouse move
if (items.length) {
    var itemWidth = carouselInner.clientWidth;
    var totalWidth = itemWidth * items.length;

    var dotItems = dotsContainer.querySelectorAll(".dot");
    var position = 0;
    var isDrag = false;
    isTransition = false;
    var dragThreshold = itemWidth * 0.2;
    carouselInner.addEventListener("mousedown", function (e) {
        e.preventDefault();
        isDrag = true;
        dragStartX = e.clientX;
    });
    carouselInner.addEventListener("mouseup", function (e) {
        e.preventDefault();
        isDrag = false;
        currentIndex = currentIndex % items.length;
        showSlide(currentIndex);
        // carouselInner.style.translate = `${position}px`;
        isTransition = false;
        setActiveDot(currentIndex);
    });

    carouselInner.addEventListener("mousemove", function (e) {
        e.preventDefault();
        currentIndex = currentIndex % items.length;
        showSlide(currentIndex);
        // carouselInner.style.translate = `${position + dragOffset}px`;
        if (isDrag) {
            carouselInner.style.cursor = "move";
            var dragOffset = e.clientX - dragStartX;
            if (Math.abs(dragOffset) < dragThreshold) {
            } else {
                if (!isTransition) {
                    if (
                        dragOffset < 0 &&
                        Math.abs(position) < totalWidth - itemWidth
                    ) {
                        position -= itemWidth;
                        isTransition = true;
                        currentIndex++;
                    } else if (dragOffset > 0 && position < 0) {
                        position += itemWidth;
                        isTransition = true;
                        currentIndex--;
                    }
                }
            }
        } else {
            carouselInner.style.cursor = "default";
        }
    });
}
// End
showSlide(currentIndex);
setActiveDot(currentIndex);
