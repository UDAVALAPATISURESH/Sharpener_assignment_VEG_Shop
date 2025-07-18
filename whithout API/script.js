function addToShop() {
  const name = document.getElementById("name").value;
  const price = parseInt(document.getElementById("price").value);
  const quantity = parseInt(document.getElementById("quantity").value);

  if (!name || price <= 0 || quantity <= 0) {
    alert("Please enter valid details.");
    return;
  }

  const itemDiv = document.createElement("div");
  itemDiv.className = "item";

  const itemHTML = `
    ${name} RS: ${price} ${quantity}KG 
    <input type="number" placeholder="KG" class="buyQty" style="width: 60px">
    <button onclick="buyItem(this, ${price})">Buy</button>
    <button onclick="deleteItem(this)">delete</button>
  `;

  itemDiv.innerHTML = itemHTML;
  document.getElementById("shopItems").appendChild(itemDiv);

  updateTotal();
}

function deleteItem(btn) {
  const itemDiv = btn.parentElement;
  itemDiv.remove();
  updateTotal();
}

function updateTotal() {
  const items = document.querySelectorAll("#shopItems .item");
  document.getElementById("total").innerText = `Total: ${items.length}`;
}
