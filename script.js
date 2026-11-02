const suppliers = [
  {id:"SUP-1001", name:"Northstar Office", category:"Stationery", region:"Gaborone", status:"Active", amount:1250},
  {id:"SUP-1002", name:"Kgetsi Digital", category:"IT Services", region:"Francistown", status:"Active", amount:4800},
  {id:"SUP-1003", name:"Metsi Cleaning", category:"Facilities", region:"Gaborone", status:"Pending", amount:2100},
  {id:"SUP-1004", name:"Blue Acacia Print", category:"Printing", region:"Maun", status:"Active", amount:950},
  {id:"SUP-1005", name:"Tsholofelo Supplies", category:"Stationery", region:"Francistown", status:"Active", amount:1675},
  {id:"SUP-1006", name:"Delta Network Care", category:"IT Services", region:"Gaborone", status:"Review", amount:3200},
  {id:"SUP-1007", name:"Kgori Maintenance", category:"Facilities", region:"Maun", status:"Active", amount:2750},
  {id:"SUP-1008", name:"Pula Printworks", category:"Printing", region:"Gaborone", status:"Pending", amount:1400}
];

const money = value => new Intl.NumberFormat("en-BW", {
  minimumFractionDigits: 2, maximumFractionDigits: 2
}).format(value);

const tbody = document.getElementById("supplierRows");
suppliers.forEach(record => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${record.id}</td>
    <td>${record.name}</td>
    <td>${record.category}</td>
    <td>${record.region}</td>
    <td><span class="pill ${record.status === "Active" ? "complete" : record.status === "Review" ? "progress" : "pending"}">${record.status}</span></td>
    <td class="numeric">${money(record.amount)}</td>`;
  tbody.appendChild(row);
});

document.getElementById("recordCount").textContent = `${suppliers.length} records`;

const grouped = {};
suppliers.forEach(record => {
  if (!grouped[record.category]) grouped[record.category] = {count:0,total:0};
  grouped[record.category].count += 1;
  grouped[record.category].total += record.amount;
});
const summary = document.getElementById("categorySummary");
Object.entries(grouped).forEach(([category, data]) => {
  const card = document.createElement("div");
  card.className = "summary-item";
  card.innerHTML = `<small>${category}</small><b>${money(data.total)}</b><span>${data.count} records</span>`;
  summary.appendChild(card);
});

document.getElementById("year").textContent = new Date().getFullYear();

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});
