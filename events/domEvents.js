import { getAuthors, getSingleAuthor } from '../api/authorData';
import { deleteBook, getBooks, getSingleBook } from '../api/bookData';
import { deleteAuthorBooksRelationship, getAuthorDetails, getBookDetails } from '../api/mergedData';
import { getOrders, deleteOrder } from '../api/orderData';
import addAuthorForm from '../components/forms/addAuthorForm';
import addBookForm from '../components/forms/addBookForm';
import addOrderForm from '../components/forms/addOrderForm';
import { showAuthors } from '../pages/authors';
import { showBooks } from '../pages/books';
import { showOrders } from '../pages/orders';
import viewAuthor from '../pages/viewAuthor';
import viewBook from '../pages/viewBook';

const domEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // TODO: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      const [, firebaseKey] = e.target.id.split('--');

      deleteBook(firebaseKey).then(() => {
        getBooks(uid).then(showBooks);
      });
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm(uid);
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      getSingleBook(firebaseKey).then((bookObj) => addBookForm(uid, bookObj));
    }

    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      getBookDetails(firebaseKey).then(viewBook);
    }

    // Click Event for AuthorBooks
    if (e.target.id.includes('view-author-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      getAuthorDetails(firebaseKey).then(viewAuthor);
    }

    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');

        deleteAuthorBooksRelationship(firebaseKey).then(() => {
          getAuthors(uid).then(showAuthors);
        });
      }
    }

    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      const [, firebaseKey] = e.target.id.split('--');

      getSingleAuthor(firebaseKey).then((authorObj) => addAuthorForm(authorObj));
    }

    // CLICK EVENT FOR SHOWING FORM FOR ADDING AN Order
    if (e.target.id.includes('add-order-btn')) {
      addOrderForm(uid);
    }

    // ADD CLICK EVENT FOR EDITING AN Order

    // ADD CLICK EVENT FOR DELETING AN Order
    if (e.target.id.includes('delete-order-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      deleteOrder(firebaseKey).then(() => {
        getOrders(uid).then(showOrders);
      });
    }
  });
};

export default domEvents;
