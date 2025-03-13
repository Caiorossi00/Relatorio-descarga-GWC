import data from "./assets/data/data.js";

let currentSortColumn = null;
let isAscending = true;

function toggleNotes(event) {
  const entry = event.target.closest(".entry");
  const notes = entry.querySelector(".notes");
  const toggleButton = entry.querySelector(".toggle-notes");

  const isVisible = notes.style.display === "block";

  document
    .querySelectorAll(".notes")
    .forEach((n) => (n.style.display = "none"));
  document
    .querySelectorAll(".toggle-notes")
    .forEach((t) => t.classList.remove("active"));

  if (!isVisible) {
    notes.style.display = "block";
    toggleButton.classList.add("active");
  }
}

function renderHeadlines() {
  const headlinesDiv = document.getElementById("headlines");
  headlinesDiv.innerHTML = `
    <p data-column="produto">Produto</p>
    <p data-column="cliente">Nome do Cliente</p>
    <p data-column="motorista">Nome do Motorista</p>
    <p data-column="peso_liquido">Peso</p>
    <p data-column="placa">Placa</p>
    <p data-column="nf">NF</p>
    <p data-column="romaneio">Romaneio</p>
    <p data-column="data_descarga">Data</p>
  `;

  headlinesDiv.querySelectorAll("p").forEach((headline) => {
    headline.addEventListener("click", () => {
      const column = headline.getAttribute("data-column");

      if (currentSortColumn === column) {
        isAscending = !isAscending;
      } else {
        currentSortColumn = column;
        isAscending = true;
      }

      sortData(column, isAscending);
      renderReport();
    });
  });
}

function sortData(column, ascending) {
  data.sort((a, b) => {
    if (a[column] < b[column]) return ascending ? -1 : 1;
    if (a[column] > b[column]) return ascending ? 1 : -1;
    return 0;
  });
}

function filterData(searchTerm) {
  return data.filter((item) => {
    return (
      item.cliente.toLowerCase().includes(searchTerm) ||
      item.motorista.toLowerCase().includes(searchTerm) ||
      item.produto.toLowerCase().includes(searchTerm) ||
      item.placa.toLowerCase().includes(searchTerm) ||
      item.nf.toLowerCase().includes(searchTerm) ||
      item.romaneio.toLowerCase().includes(searchTerm) ||
      item.data_descarga.toLowerCase().includes(searchTerm)
    );
  });
}

function renderReport(filteredData = data) {
  const reportDiv = document.getElementById("report");
  reportDiv.innerHTML = "";

  filteredData.forEach((item) => {
    const entry = document.createElement("div");
    entry.classList.add("entry");
    entry.innerHTML = `
      <p>${item.produto}</p>
      <p>${item.cliente}</p>
      <p>${item.motorista}</p>
      <p>${item.peso_liquido}</p>
      <p>${item.placa}</p>
      <p>${item.nf}</p>
      <p>${item.romaneio}</p>
      <p>${item.data_descarga}</p>
      <p>
          <span class="toggle-notes">▼</span>
      </p>
      <div class="notes">
        <ul>
          ${item.notas.map((nota) => `<li>${nota}</li>`).join("")}
        </ul>
      </div> 
    `;

    const toggleButton = entry.querySelector(".toggle-notes");
    toggleButton.addEventListener("click", toggleNotes);

    reportDiv.appendChild(entry);
  });
}

document.getElementById("search").addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const filteredData = filterData(searchTerm);
  renderReport(filteredData);
});

renderHeadlines();
renderReport();
