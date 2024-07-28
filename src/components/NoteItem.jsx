import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NoteItemBody from './NoteItemBody';
import DeleteButton from './DeleteButton';
import Parser from 'html-react-parser';

function NoteItem({ title, body, createdAt, id, onDelete }) {
  return (
    <div className='note-item'>
      <div className='note-item__header'>
        <h3 className='note-item__title'>
          <Link to={`/notes/${id}`} className='note-item__link'>{title}</Link>
        </h3>
      </div>
      <NoteItemBody title={title} createdAt={createdAt} body={Parser(body)} />
      <div className='note-item__delete'>
        <DeleteButton id={id} onDelete={onDelete} />
      </div>
    </div>
  );
}

NoteItem.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteItem;
