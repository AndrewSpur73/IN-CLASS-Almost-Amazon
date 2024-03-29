import { signOut } from '../utils/auth';
import { getBooks, booksOnSale } from '../api/bookData';
import { showBooks } from '../pages/books';
import { getAuthors, favoriteAuthors } from '../api/authorData';
import { showAuthors } from '../pages/authors';
import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
import { searchStore } from '../api/mergedData';
import { showOrders } from '../pages/orders';
import { getOrders } from '../api/orderData';

// navigation events
const navigationEvents = (uid) => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // TODO: BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', () => {
    booksOnSale(uid).then(showBooks);
  });

  document.querySelector('#favorite-authors').addEventListener('click', () => {
    favoriteAuthors(uid).then(showAuthors);
  });

  // TODO: ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    getBooks(uid).then(showBooks);
  });

  // ALL BOOKS ON LOGO
  document.querySelector('#home').addEventListener('click', () => {
    getBooks(uid).then(showBooks);
  });

  // ALL ORDERS
  document.querySelector('#orders').addEventListener('click', () => {
    getOrders(uid).then(showOrders);
  });

  // FIXME: STUDENTS Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors(uid).then(showAuthors);
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();

    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode === 13) {
      searchStore(searchValue, uid).then(({ books, authors }) => {
        if (books.length > 0 || authors.length > 0) {
          clearDom();
          showAuthors(authors, false);
          showBooks(books, false);
        } else {
          clearDom();
          const domString = '<h1>No Results</h1>';
          renderToDOM('#store', domString);
        }
      });

      document.querySelector('#search').value = '';
    }
  });
};
export default navigationEvents;
