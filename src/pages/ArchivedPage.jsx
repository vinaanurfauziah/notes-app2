import React from 'react';
import {
  getAllNotes,
  getArchivedNotes,
  unarchiveNote,
  deleteNote,
} from '../utils/local-data';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import PropTypes from 'prop-types';
import { LocaleConsumer } from '../contexts/LocaleContext';

function ArchivedWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword');

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <ArchivedPage defaultKeyword={keyword} keywordChange={changeSearchParams} onDelete={deleteNote} />
  );
}

class ArchivedPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getAllNotes(),
      searchInput: props.defaultKeyword || '',
    };
  }

  onUnArchiveHandler = (id) => {
    unarchiveNote(id);
    this.setState(() => {
      return {
        notes: getAllNotes(),
      };
    });
  };

  onDeleteNoteHandler = (id) => {
    deleteNote(id);
    this.setState(() => {
      return {
        notes: getAllNotes(),
      };
    });
  };

  onSearchHandler = (input) => {
    this.setState({ searchInput: input });

    this.props.keywordChange(input);
  };

  render() {
    const filteredNotes = this.state.notes.filter((note) =>
      note.title.toLowerCase().includes(this.state.searchInput.toLowerCase())
    );
    const filteredActive = getArchivedNotes(filteredNotes);
    return (
      <LocaleConsumer>
        {({ locale }) => (
          <div>
            <div className='note-container'>
              <h2>{locale === 'id' ? 'Catatan Arsip' : 'Archived Notes'}</h2>
            </div>
            <NoteList
              notes={filteredActive}
              onDelete={this.onDeleteNoteHandler}
              onArchive={this.onUnArchiveHandler}
            />
          </div>
        )}
      </LocaleConsumer>
    );
  }
}

ArchivedPage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ArchivedWrapper;
