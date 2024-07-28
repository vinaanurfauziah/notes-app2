import React from 'react';
import PropTypes from 'prop-types';

function NoteItemBody({ title, body, createdAt }) {
  return (
    <div className='note-item__body1'>
      {/* <h3 className='note-item__title'>{title}</h3> */}
      <p className='note-item__createdAt'>{createdAt}</p>
      <p className='note-body'>{body}</p>
    </div>
  );
}

NoteItemBody.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default NoteItemBody;