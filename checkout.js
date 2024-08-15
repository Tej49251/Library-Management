document.addEventListener('DOMContentLoaded', function() {
    const bookSelectEl = document.getElementById('bookSelect');
    const userNameEl = document.getElementById('userName');
    const checkoutButtonEl = document.getElementById('checkoutButton');
    const checkoutMessageEl = document.getElementById('checkoutMessage');
    const checkoutRecordsEl = document.getElementById('checkoutRecords');

    function fetchBooksForCheckout() {
        let url = 'https://apis.ccbp.in/book-store'; // URL for fetching all available books
        let options = {
            method: 'GET'
        };

        fetch(url, options)
            .then(response => response.json())
            .then(jsonData => populateBookSelect(jsonData.books))
            .catch(error => console.error('Error:', error));
    }

    function populateBookSelect(books) {
        bookSelectEl.innerHTML = ''; // Clear previous options
        books.forEach(book => {
            let option = document.createElement('option');
            option.value = book.title;
            option.textContent = book.title;
            bookSelectEl.appendChild(option);
        });
    }

    function addCheckoutRecord(bookTitle, userName) {
        let record = {
            title: bookTitle,
            user: userName,
            date: new Date().toLocaleDateString()
        };

        let records = JSON.parse(localStorage.getItem('checkoutRecords')) || [];
        records.push(record);
        localStorage.setItem('checkoutRecords', JSON.stringify(records));
        displayCheckoutRecords();
    }

    function displayCheckoutRecords() {
        let records = JSON.parse(localStorage.getItem('checkoutRecords')) || [];
        checkoutRecordsEl.innerHTML = '';
        records.forEach(record => {
            let container = document.createElement('div');
            container.className = 'result-item';

            let titleElement = document.createElement('h5');
            titleElement.textContent = `Book: ${record.title}`;

            let userElement = document.createElement('p');
            userElement.textContent = `User: ${record.user}`;

            let dateElement = document.createElement('p');
            dateElement.textContent = `Date: ${record.date}`;

            container.appendChild(titleElement);
            container.appendChild(userElement);
            container.appendChild(dateElement);

            checkoutRecordsEl.appendChild(container);
        });
    }

    checkoutButtonEl.addEventListener('click', function() {
        let selectedBook = bookSelectEl.value;
        let userName = userNameEl.value.trim();

        if (selectedBook && userName) {
            addCheckoutRecord(selectedBook, userName);
            checkoutMessageEl.textContent = 'Book checked out successfully!';
            userNameEl.value = '';
        } else {
            checkoutMessageEl.textContent = 'Please enter all details.';
        }
    });

    fetchBooksForCheckout(); // Populate book select on page load
    displayCheckoutRecords(); // Display existing records
});
