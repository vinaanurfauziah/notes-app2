import React from 'react'
import PropTypes from 'prop-types'

function ArchiveButton({id, archived, onArchive}) {
    return (
        <button
            className="note-item__archive-button"
            onClick={() => onArchive(id)}>
            {archived ? 'Pindahkan' : 'Arsipkan'}
        </button>
    )
}

ArchiveButton.propTypes = {
    id: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    onArchive: PropTypes.func.isRequired,
}

export default ArchiveButton