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

    for (let i = 0; i < 6; i++)
        for (let j = 0; j < 3; j++)
            loadMoreCards(i);
});