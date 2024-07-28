import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import NoteList from '../components/NoteList';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LocaleConsumer } from '../contexts/LocaleContext';
import { getActiveNotes } from '../utils/api';

function SearchPageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get('title');

  function changeSearchParams(keyword) {
    setSearchParams({ title: keyword });
  }

  // Implement an onDelete function here
  function handleNoteDelete() {
    // Perform deletion logic, e.g., call an API to delete a note
  }

  return (
    <SearchPage
      onSearch={changeSearchParams}
      activeKeyword={title || ''}
      onDelete={handleNoteDelete} // Pass the onDelete function
    />
  );
}

function SearchPage({ onSearch, activeKeyword, onDelete }) {
  const [foundNotes, setFoundNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await getActiveNotes(activeKeyword);
        setFoundNotes(data);
      } catch (e) {
        setError(e);
      }

      setLoading(false);
    };

    if (activeKeyword) {
      fetchData();
    } else {
      setFoundNotes([]); 
    }
  }, [activeKeyword]);

  return (
    <LocaleConsumer>
      {({ locale }) => (
        <section className='search-page'>
          <h2>{locale === 'id'? 'Cari Catatan' : 'Search Note'}</h2>
          <SearchBar
            search={onSearch}
            defaultKeyword={activeKeyword}
            className='search-bar'
          />
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}
          <div className='note-list'>
            {/* Pastikan untuk melewatkan prop onDelete ke NoteList */}
            <NoteList notes={foundNotes} onDelete={onDelete} />
          </div>
        </section>
      )}
    </LocaleConsumer>
  );
}

SearchPage.propTypes = {
  activeKeyword: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default SearchPageWrapper;
