document.addEventListener('DOMContentLoaded', () => {
    const columns = [
        document.getElementById('column1'),
        document.getElementById('column2'),
        document.getElementById('column3'),
        document.getElementById('column4'),
        document.getElementById('column5'),
        document.getElementById('column6')
    ];

    function createCard(columnIndex) {
        const column = columns[columnIndex];

        const newCard = document.createElement('div');
        newCard.className = 'card card-fluid';
        newCard.style.width = '100%';


        const newImage = document.createElement('img');
        newImage.src = 'images/' + Math.round(Math.random() * 6) + '.jpg';
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

    function loadMoreCards(index) {
        for (let i = 0; i < 10; i++)
            createCard(index);
    }

    window.addEventListener('scroll', () => {
        for (let i = 0; i < 6; i++) {
            let rectangle = columns[i].getBoundingClientRect();

            if (rectangle.bottom <= window.innerHeight + 500)
                for (let j = 0; j < 6; j++)
                    loadMoreCards(j);
        }
    });

    const modalExitButton = document.querySelector('.modalExitButton');
    modalExitButton.addEventListener("click", () => {
        const modal = document.querySelector('.modal');
        const modalInner = modal.querySelector('.modal-inner');

        modal.style.display = 'none';

        modalInner.innerHTML = '';
    });

    for (let i = 0; i < 6; i++)
        for (let j = 0; j < 3; j++)
            loadMoreCards(i);
});