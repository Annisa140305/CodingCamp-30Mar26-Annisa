const form = document.getElementById("form");
const list = document.getElementById("list");
const balance = document.getElementById("balance");

let transactions = JSON.parse(localStorage.getItem("data")) || [];

let chart;

// ADD DATA
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;

  if (!name || !amount || !category) {
    alert("Isi semua field!");
    return;
  }

  const item = {
    id: Date.now(),
    name: name,
    amount: Number(amount),
    category: category
  };

  transactions.push(item);
  saveData();
  render();
  form.reset();
});

// RENDER
function render() {
  list.innerHTML = "";

  let total = 0;
  let food = 0, transport = 0, fun = 0;

  transactions.forEach(item => {
    total += item.amount;

    if (item.category === "Food") food += item.amount;
    if (item.category === "Transport") transport += item.amount;
    if (item.category === "Fun") fun += item.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - Rp ${item.amount}
      <button class="delete" onclick="deleteItem(${item.id})">X</button>
    `;
    list.appendChild(li);
  });

  balance.innerText = total;

  updateChart(food, transport, fun);
}

// DELETE
function deleteItem(id) {
  transactions = transactions.filter(item => item.id !== id);
  saveData();
  render();
}

// SAVE
function saveData() {
  localStorage.setItem("data", JSON.stringify(transactions));
}

// CHART
function updateChart(food, transport, fun) {
  const ctx = document.getElementById("chart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Food", "Transport", "Fun"],
      datasets: [{
        data: [food, transport, fun]
      }]
    }
  });
}

// INIT
render();