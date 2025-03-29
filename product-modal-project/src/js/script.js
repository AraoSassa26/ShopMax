// src/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    const productImages = document.querySelectorAll('.product-image');
    const modal = document.getElementById('product-modal');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const closeModalButton = document.getElementById('close-modal');

    productImages.forEach(image => {
        image.addEventListener('click', () => {
            const imageSrc = image.getAttribute('data-image-src');
            const imageDescription = image.getAttribute('data-description');

            modalImage.src = imageSrc;
            modalDescription.textContent = imageDescription;
            modal.style.display = 'block';
        });
    });

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});