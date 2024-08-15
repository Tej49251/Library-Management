document.addEventListener('DOMContentLoaded', function() {
    const booksListEl = document.getElementById('booksList');

    function fetchBooks() {
        let url = 'https://apis.ccbp.in/book-store'; // URL for fetching all available books
        let options = {
            method: 'GET'
        };

        fetch(url, options)
            .then(response => response.json())
            .then(jsonData => {
                if (jsonData.books) {
                    renderBooks(jsonData.books);
                } else {
                    console.error('Unexpected response structure:', jsonData);
                }
            })
            .catch(error => console.error('Error:', error));
    }

    function renderBooks(books) {
        booksListEl.innerHTML = ''; // Clear previous results
        if (Array.isArray(books)) {
            books.forEach(book => {
                let container = document.createElement('div');
                container.className = 'result-item';

                let imgElement = document.createElement('img');
                imgElement.src = book.imageLink;
                imgElement.alt = book.title;

                let titleElement = document.createElement('h5');
                titleElement.textContent = book.title;

                let authorElement = document.createElement('p');
                authorElement.textContent = `Author: ${book.author}`;

                container.appendChild(imgElement);
                container.appendChild(titleElement);
                container.appendChild(authorElement);

                booksListEl.appendChild(container);
            });
        } else {
            console.error('Books data is not an array:', books);
        }
    }

    fetchBooks(); // Fetch and display books on page load
});
