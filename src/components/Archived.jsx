import React from 'react';
import { Link } from 'react-router-dom';
import { BiArchiveOut } from 'react-icons/bi';
import { getNotes, unarchiveNote } from '../utils/local-data';

function Archived() {
  const archivedNotes = getNotes().filter((note) => note.archived);

  const unarchiveHandler = (id) => {
    unarchiveNote(id);
  };

  return (
    <div>
      <h2>Archived Notes</h2>
      {archivedNotes.length > 0 ? (
        archivedNotes.map((note) => (
          <div key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
            <p>{note.createdAt}</p>
            <button onClick={() => unarchiveHandler(note.id)}>
              Unarchive <BiArchiveOut />
            </button>
          </div>
        ))
      ) : (
        <p>No archived notes</p>
      )}
      <Link to='/'>Back to Home</Link>
    </div>
  );
}

export default Archived;
