const clearDom = () => {
  document.querySelector('#author-store').innerHTML = '';
  document.querySelector('#book-store').innerHTML = '';
  document.querySelector('#order-store').innerHTML = '';
  document.querySelector('#store').innerHTML = '';
  document.querySelector('#add-button').innerHTML = '';
  document.querySelector('#form-container').innerHTML = '';
  document.querySelector('#view').innerHTML = '';
};

export default clearDom;
