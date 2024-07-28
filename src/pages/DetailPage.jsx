import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NoteDetail from '../components/NoteDetail';
import { getNote } from '../utils/api';

function DetailPage() {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { error, data } = await getNote(id);
        if (!error) {
          setNote(data);
        } else {
          console.error("Error fetching note");
        }
      } catch (error) {
        console.error("Error fetching note", error);
      }
    };

    fetchNote();

    return () => {
    };
  }, [id]);

  if (!note) {
    return <p>Loading...</p>;
  }

  if (note === null) {
    return <p>Note is not found!</p>;
  }

  // Convert the id to a number before passing it to NoteDetail
  const noteId = parseInt(note.id, 10);

  return (
    <section>
      <NoteDetail
        id={noteId}
        title={note.title}
        createdAt={new Date(note.createdAt).toLocaleString()}
        body={note.body.replace(/\n/g, '<br/>')}
        isArchived={note.isArchived}
      />
    </section>
  );
}

export default DetailPage;