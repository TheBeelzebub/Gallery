document.addEventListener('DOMContentLoaded', async () => {
    const columns = [
        document.getElementById('column1'),
        document.getElementById('column2'),
        document.getElementById('column3'),
        document.getElementById('column4'),
        document.getElementById('column5'),
        document.getElementById('column6')
    ];

    async function fetchImageUrls() {
        try {
            const response = await fetch('http://gallery/images.php'); // Replace with your API URL
            const data = await response.json();
            return data.images; // Assuming the API returns { "images": ["url1", "url2", ...] }
        } catch (error) {
            console.error('Error fetching images:', error);
            return [];
        }
    }

    async function createCard(columnIndex) {
        const column = columns[columnIndex];

        const imageUrls = await fetchImageUrls();
        if (imageUrls.length === 0) return;

        const newCard = document.createElement('div');
        newCard.className = 'card card-fluid';
        newCard.style.width = '100%';

        const newImage = document.createElement('img');
        newImage.src = imageUrls[0];
        newImage.addEventListener("click", () => {
            const modalImage = document.createElement('img');
            modalImage.src = newImage.src;

            const modal = document.querySelector('.modal');
            const modalInner = modal.querySelector('.modal-inner');

            modalInner.append(modalImage);
            modalImage.style.position = 'fixed';
            modalImage.style.top = '50%';
            modalImage.style.left = '50%';
            modalImage.style.transform = 'translate(-50%, -50%)';

            modal.style.display = 'block';
        });

        newCard.append(newImage);
        column.append(newCard);
    }

    async function loadMoreCards(index) {
        for (let i = 0; i < 10; i++)
            await createCard(index);
    }

    window.addEventListener('scroll', async () => {
        for (let i = 0; i < 6; i++) {
            let rectangle = columns[i].getBoundingClientRect();

            if (rectangle.bottom <= window.innerHeight + 500) {
                for (let j = 0; j < 6; j++) {
                    await loadMoreCards(j);
                }
            }
        }
    });

    const modalExitButton = document.querySelector('.modalExitButton');
    modalExitButton.addEventListener("click", () => {
        const modal = document.querySelector('.modal');
        const modalInner = modal.querySelector('.modal-inner');

        modal.style.display = 'none';
        modalInner.innerHTML = '';
    });

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
            await loadMoreCards(i);
        }
    }
});
