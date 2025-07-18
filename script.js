const API = "https://crudcrud.com/api/bd12d3fd3e704915a2a8047f47aba737/MyShopData"
const form = document.getElementById("itemForm");
const itemList = document.getElementById("itemList");
const totalDiv = document.getElementById("total");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const quantity = parseInt(document.getElementById("quantity").value);

  const item = { name, price, quantity };

  axios.post(API, item)
    .then(() => {
      form.reset();
      fetchItems();
    })
    .catch(console.error);
});

function fetchItems() {
  axios.get(API)
    .then((res) => {
      itemList.innerHTML = "";
      res.data.forEach(displayItem);
      totalDiv.innerText = `Total Items: ${res.data.length}`;
    })
    .catch(console.error);
}

function displayItem(item) {
  const div = document.createElement("div");
  div.className = "item";

  div.innerHTML = `
    ${item.name} - RS: ${item.price} - ${item.quantity}KG 
    <input type="number" placeholder="KG" style="width: 50px;">
    <button onclick="buyItem('${item._id}', ${item.price}, this)">Buy</button>
    <button onclick="deleteItem('${item._id}')">Delete</button>
  `;

  itemList.appendChild(div);
}

function buyItem(id, price, inputElement) {
  const qty = parseInt(inputElement.previousElementSibling.value);
  if (qty <= 0) return alert("Enter valid quantity to buy");

  axios.get(`${API}/${id}`)
    .then((res) => {
      const item = res.data;
      if (item.quantity >= qty) {
        const updated = { ...item, quantity: item.quantity - qty };
        delete updated._id;
        return axios.put(`${API}/${id}`, updated);
      } else {
        alert("Not enough quantity!");
      }
    })
    .then(fetchItems)
    .catch(console.error);
}

function deleteItem(id) {
  axios.delete(`${API}/${id}`)
    .then(fetchItems)
    .catch(console.error);
}


fetchItems();