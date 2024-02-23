// for merged promises

import { getAuthorBooks, getSingleAuthor } from './authorData';
import { getSingleBook } from './bookData';

// TODO: Get data for viewBook
const getBookDetails = async (firebaseKey) => {
  const bookObject = await getSingleBook(firebaseKey);
  const authorObject = await getSingleAuthor(bookObject.author_id);

  return { ...bookObject, authorObject };
};

const getAuthorDetails = async (firebaseKey) => {
  console.warn(firebaseKey);
  const authorObject = await getSingleAuthor(firebaseKey);
  const authorBooks = await getAuthorBooks(firebaseKey);
  console.warn(authorBooks);
  return { ...authorObject, books: authorBooks };
};

export { getBookDetails, getAuthorDetails };
