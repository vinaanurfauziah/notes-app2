let notes = [
  {
    id: 1,
    title: 'Babel',
    name: 'Dimas Saputra',
    body: 'Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.',
    createdAt: '28 March 2024',
    archived: false,
  },
  {
    id: 2,
    title: 'Functional Component',
    body: 'Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.',
    createdAt: '28 March 2024',
    archived: false,
  },
  {
    id: 3,
    title: 'Modularization',
    body: 'Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.',
    createdAt: '28 March 2024',
    archived: false,
  },
  {
    id: 4,
    title: 'Lifecycle',
    body: 'Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya. ',
    createdAt: '29 March 2024',
    archived: false,
  },
  {
    id: 5,
    title: 'ESM',
    body: 'ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.',
    createdAt: '29 March 2024',
    archived: false,
  },
  {
    id: 6,
    title: 'Module Bundler',
    body: 'Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.',
    createdAt: '29 March 2024',
    archived: false,
  },
];

function getAllNotes() {
  return notes;
}

function getNotes(id) {
  if (!id) {
    return notes;
  }

  const filteredNotes = notes.filter((note) => note.id === id);

  if (!filteredNotes.length) {
    return null;
  }

  return filteredNotes[0];
}

function getActiveNotes(notes) {
  const activeNotes = notes.filter((note) => !note.archived);
  return activeNotes;
}

function getArchivedNotes(notes) {
  const archivedNotes = notes.filter((note) => note.archived);
  return archivedNotes;
}

function archiveNote(id) {
  notes = notes.map((note) => {
    if (note.id === id) {
      return { ...note, archived: true };
    }
    return note;
  });
}

function unarchiveNote(id) {
  notes = notes.map((note) => {
    if (note.id === id) {
      return { ...note, archived: false };
    }

    return note;
  });
}

function editNote({ id, title, body }) {
  const noteToEdit = notes.find((note) => note.id === id);
  noteToEdit.title = title;
  noteToEdit.body = body;

  notes = notes.map((note) => {
    if (note.id === id) {
      return note;
    }
    return note;
  });
}

function searchNotes(keyword) {
  return notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );
}

function addNote(note) {
  notes = [...notes, { id: +new Date(), ...note }];
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
}

export {
  getAllNotes,
  getActiveNotes,
  getArchivedNotes,
  deleteNote,
  editNote,
  getNotes,
  archiveNote,
  searchNotes,
  unarchiveNote,
  addNote,
};
