import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import { deleteNote } from '../utils/api';
import PropTypes from 'prop-types';
import { getActiveNotes } from '../utils/api';
import { LocaleConsumer } from '../contexts/LocaleContext';

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} onDelete={deleteNote} />
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      keyword: props.defaultKeyword || '',
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  async componentDidMount() {
    const { data } = await getActiveNotes();

    this.setState(() => {
      return {
        notes: data.map(note => ({
        ...note,
         createdAt: `Created At ${new Date(note.createdAt).toLocaleString()}`,
        })),
      }
    })
  }
  
  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    this.props.keywordChange(keyword);
  }


  async onDeleteHandler(id) {
    await deleteNote(id);

    // update the contact state from api.js
    const { data  } = await getActiveNotes();
    this.setState(() => {
      return {
        notes: data,
      }
    });
  }

  onAddNoteHandler = ({title, body}) => {
        this.setState(prevState => {
            return {
                notes: [
                    ...prevState.notes,
                    {
                        id: +new Date(),
                        title,
                        body,
                        createdAt: new Date().toLocaleDateString(),
                        archived: false,
                    },
                ],
            }
        })
    }

  render() {
    const notes = this.state.notes.filter((note) => {
      return note.title
        .toLowerCase()
        .includes(this.state.keyword.toLowerCase());
    });

    return (
      <LocaleConsumer>
        {({ locale }) => (
          <section>
            <h2>{locale === 'id' ? 'Daftar Catatan' : 'Notes List'}</h2>
            <NoteList notes={notes} onDelete={this.onDeleteHandler} />
          </section>
        )}
      </LocaleConsumer>
    );
  }
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default HomePageWrapper;
