import React from 'react';
import { addNote } from '../utils/api';
import NoteInput from '../components/NoteInput';
import { useNavigate } from 'react-router-dom';
import { LocaleConsumer } from '../contexts/LocaleContext';

function AddPage() {
  const navigate = useNavigate();

  async function onAddNoteHandler(note) {
    await addNote(note);
    navigate('/');
  }

  return (
    <LocaleConsumer>
      {({ locale }) => (
        <section>
          <h2>{locale === 'id' ? 'Tambah catatan' : 'Add Note'}</h2>
          <NoteInput addNote={onAddNoteHandler} />
        </section>
      )}
    </LocaleConsumer>
  );
  
}

export default AddPage;
