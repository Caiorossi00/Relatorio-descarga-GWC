document.getElementById("addNote").addEventListener("click", addNote);

let notes = [];
let noteId = 1;

function loadNotes() {
  const storedNotes = JSON.parse(localStorage.getItem("notes"));
  if (storedNotes) {
    notes = storedNotes;
    noteId = notes.length ? Math.max(...notes.map((note) => note.id)) + 1 : 1;
    renderNotes();
  }
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function addNote() {
  const note = {
    id: noteId,
    cliente: "",
    motorista: "",
    pesoEntrada: "",
    pesoTara: "",
    anotacoes: "",
  };

  notes.push(note);
  noteId++;
  saveNotes();
  renderNotes();
}

function editNote(id, field, value) {
  const note = notes.find((note) => note.id === id);
  if (note) {
    note[field] = value;
    saveNotes();
    renderNotes();
  }
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  renderNotes();
}

function renderNotes() {
  const notesList = document.getElementById("notesList");
  notesList.innerHTML = "";

  notes.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");

    noteElement.innerHTML = `
      <div>
        <strong><h1>Nota #${note.id}</h1></strong>
      </div>
      <div>
        <input 
          type="text" 
          value="${note.cliente}" 
          placeholder="Cliente" 
          onchange="editNote(${note.id}, 'cliente', this.value)" 
        />
      </div>
      <div>
        <input 
          type="text" 
          value="${note.motorista}" 
          placeholder="Motorista" 
          onchange="editNote(${note.id}, 'motorista', this.value)" 
        />
      </div>
      <div>
        <input 
          type="number" 
          value="${note.pesoEntrada}" 
          placeholder="Peso de Entrada" 
          onchange="editNote(${note.id}, 'pesoEntrada', this.value)" 
        />
      </div>
      <div>
        <input 
          type="number" 
          value="${note.pesoTara}" 
          placeholder="Peso de Tara" 
          onchange="editNote(${note.id}, 'pesoTara', this.value)" 
        />
      </div>
      <div>
        <input 
          type="text" 
          value="${note.anotacoes}" 
          placeholder="Anotações" 
          onchange="editNote(${note.id}, 'anotacoes', this.value)" 
        />
      </div>
      <button onclick="deleteNote(${note.id})">Excluir</button>
    `;

    notesList.appendChild(noteElement);
  });
}

loadNotes();
