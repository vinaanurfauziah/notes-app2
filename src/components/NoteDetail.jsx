import React from 'react';
import PropTypes from 'prop-types';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FcInternal } from "react-icons/fc";

function NoteDetail({
  id,
  title,
  createdAt,
  body,
  isArchived,
}) {
  return (
    <div>
      <nav className='edit'>
        <ul>
          <li>
            <Link to={`/edit/${id}`}>
              <FiEdit />
            </Link>
          </li>
          <li>
            {isArchived ? (
              <Link to='/archived'>
                <FcInternal />
              </Link>
            ) : (
              <Link to='/archived'>
                <FcInternal />
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <h2>{title}</h2>
      <p className='created-at'>Created At {createdAt}</p>
      <p className='note-body' dangerouslySetInnerHTML={{ __html: body }}></p>
    </div>
  );
}

NoteDetail.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  isArchived: PropTypes.bool,
};

NoteDetail.defaultProps = {
  isArchived: false, // Add a default value for isArchived
};

export default NoteDetail;