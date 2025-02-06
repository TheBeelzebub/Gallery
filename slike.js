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

    async function createCardRow() {
        for (let i = 0; i < 6; i++)
        {
            const imageUrls = await fetchImageUrls();
            if (imageUrls.length === 0) return;

            const column = columns[i];

            const newCard = document.createElement('div');
            newCard.className = 'card card-fluid border-0';
            newCard.style.width = '100%';

            const newImage = document.createElement('img');
            newImage.src = imageUrls[Math.floor(Math.random() * imageUrls.length)];;
            newImage.addEventListener("click", () => {
                const modalCard = document.createElement('div');
                modalCard.className = 'card card-fluid border-0';
                modalCard.style.width = '50%';
                modalCard.style.position = 'absolute';
                modalCard.style.top = '50%';
                modalCard.style.left = '50%';
                modalCard.style.transform = 'translate(-50%, -50%)';

                const modalImage = document.createElement('img');
                modalImage.src = newImage.src;

                const modalBackdrop = document.querySelector('.modal-backdrop');
                const modal = document.querySelector('.modal');
                const modalInner = modal.querySelector('.modal-inner');

                modalCard.append(modalImage);
                modalInner.append(modalCard);

                document.body.style.overflow = 'hidden';
                modalBackdrop.style.display = 'block';
                modal.style.display = 'block';
            });

            newCard.append(newImage);
            column.append(newCard);
        }
    }

    async function loadMoreCards() {
        for (let i = 0; i < 10; i++)
            await createCardRow();
    }

    let loadingImages = false;
    window.addEventListener('scroll', async () => {
        if (loadingImages)
            return;
        loadingImages = true;

        for (let i = 0; i < 6; i++) {
            let rectangle = columns[i].getBoundingClientRect();

            if (rectangle.bottom <= window.innerHeight + 500) {
                await loadMoreCards();
                break;
            }
        }

        loadingImages = false;
    });

    const modalExitButton = document.querySelector('.modalExitButton');
    modalExitButton.addEventListener("click", () => {
        const modalBackdrop = document.querySelector('.modal-backdrop');
        const modal = document.querySelector('.modal');
        const modalInner = modal.querySelector('.modal-inner');

        modalBackdrop.style.display = 'none';
        modal.style.display = 'none';
        document.body.style.overflow = '';
        modalInner.innerHTML = '';
    });

    for (let i = 0; i < 3; i++) {
        await loadMoreCards();
    }
});
