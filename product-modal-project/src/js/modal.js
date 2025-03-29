document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('product-modal');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const closeModalButton = document.getElementById('close-modal');

    // Function to open the modal and display the product details
    function openModal(imageSrc, description) {
        modalImage.src = imageSrc;
        modalDescription.textContent = description;
        modal.style.display = 'block';
    }

    // Function to close the modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Event listener for closing the modal
    closeModalButton.addEventListener('click', closeModal);

    // Event listener for clicking outside the modal to close it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Expose the openModal function to be used in script.js
    window.openProductModal = openModal;
});