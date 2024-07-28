import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';

function NoteList({ notes, onDelete }) {
  return (
    <div className='note-list'>
      {notes.length > 0 ? (
        notes.map((note) => (
          <NoteItem
            key={note.id}
            id={note.id}
            onDelete={() => onDelete(note.id)}
            {...note}
          />
        ))
      ) : (
        <p>Tidak ada catatan</p>
      )}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteList;
