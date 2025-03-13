import data from "./data.js";

function getStatusClass(status) {
  switch (status) {
    case "sim":
      return "sim";
    case "parcial":
      return "parcial";
    case "nao":
      return "nao";
    default:
      return "";
  }
}

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
    <p>Produto</p>
    <p>Nome do Cliente</p>
    <p>Nome do Motorista</p>
    <p>Peso Líquido</p>
    <p>Placa</p>
    <p>NF</p>
    <p>Romaneio</p>
    <p>Data</p>
  `;
}

function renderReport() {
  const reportDiv = document.getElementById("report");
  data.forEach((item) => {
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

// Renderiza os títulos e os itens da lista
renderHeadlines();
renderReport();
