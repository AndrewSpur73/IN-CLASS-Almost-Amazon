// for merged promises

import {
  deleteSingleAuthor, getAuthorBooks, getAuthors, getSingleAuthor
} from './authorData';
import { deleteBook, getBooks, getSingleBook } from './bookData';

// TODO: Get data for viewBook
const getBookDetails = async (firebaseKey) => {
  const bookObject = await getSingleBook(firebaseKey);
  const authorObject = await getSingleAuthor(bookObject.author_id);

  return { ...bookObject, authorObject };
};

const getAuthorDetails = async (firebaseKey) => {
  const authorObject = await getSingleAuthor(firebaseKey);
  const authorBooks = await getAuthorBooks(firebaseKey);

  return { ...authorObject, books: authorBooks };
};

const deleteAuthorBooksRelationship = async (authorFirebaseKey) => {
  const authorBooks = await getAuthorBooks(authorFirebaseKey);
  const deleteBookPromises = await authorBooks.map((abObj) => deleteBook(abObj.firebaseKey));

  await Promise.all(deleteBookPromises).then(() => deleteSingleAuthor(authorFirebaseKey));
};

// TODO: STRETCH...SEARCH BOOKS
const searchStore = async (searchValue, uid) => {
  const allBooks = await getBooks(uid);
  const allAuthors = await getAuthors(uid);
  const filteredBooks = await allBooks.filter((book) => (
    book.title.toLowerCase().includes(searchValue)
    || book.description.toLowerCase().includes(searchValue)
    || book.price.includes(parseInt(searchValue, 10))
  ));

  const filteredAuthors = await allAuthors.filter((author) => (
    author.first_name.toLowerCase().includes(searchValue)
    || author.last_name.toLowerCase().includes(searchValue)
    || author.email.toLowerCase().includes(searchValue)
  ));

  return { authors: filteredAuthors, books: filteredBooks };
};

export {
  getBookDetails, getAuthorDetails, deleteAuthorBooksRelationship, searchStore
};
