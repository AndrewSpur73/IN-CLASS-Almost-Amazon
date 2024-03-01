import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const emptyOrders = () => {
  const domString = '<h1>No Orders</h1>';
  renderToDOM('#order-store', domString);
};

const showOrders = (array) => {
  clearDom();

  const btnString = '<button class="btn btn-success btn-lg mb-4" id="add-order-btn">Add An Order</button>';
  renderToDOM('#add-button', btnString);

  let domString = '';

  if (array.length > 0) {
    array.forEach((item) => {
      domString += `
          <div class="card">
            <div class="card-body" style="height: 180px;">
            <h4>${item.title}</h4>
              <h5 class="card-text">${item.customer_first_name} ${item.customer_last_name} </h5>
              <p class="card-text">${item.notes}</p>
                <hr>
                <i class="btn btn-success" id="view-order-btn--${item.firebaseKey}"><span id="view-order-btn--${item.firebaseKey}" class="fas fa-eye"></span></i>
                <i id="edit-order-btn--${item.firebaseKey}" class="btn btn-info"><span id="edit-order-btn--${item.firebaseKey}" class="fas fa-edit"></span></i>
                <i id="delete-order-btn--${item.firebaseKey}" class="btn btn-danger"><span id="delete-order-btn--${item.firebaseKey}" class="fas fa-trash-alt"></span></i>
            </div>
          </div>`;
      renderToDOM('#order-store', domString);
    });
  } else {
    emptyOrders();
  }
};

export { showOrders, emptyOrders };
