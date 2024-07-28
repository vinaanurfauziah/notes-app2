import React from 'react';
import PropTypes from 'prop-types';
import { LocaleConsumer } from '../contexts/LocaleContext';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      createdAt: '', 
      body: '',
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    this.setState({ title: event.target.value });
  }

  onBodyChangeEventHandler(event) {
    this.setState({ body: event.target.value });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;
    this.setState({ createdAt: formattedDate }, () => {
      this.props.addNote(this.state);
      this.setState({
        title: '',
        createdAt: '',
        body: ''
      });
    });
  }

  render() {
    return (
      <LocaleConsumer>
        {({ locale }) => (
          <form className='note-input' onSubmit={this.onSubmitEventHandler}>
            <input
              type='text'
              placeholder={locale === 'id' ? 'Judul' : 'Title'}
              value={this.state.title}
              onChange={this.onTitleChangeEventHandler}
              style={{
                border: '1px solid black',
                padding: '10px',
                marginBottom: '10px',
                fontSize: '18px',
                width: '100%'
              }}
            />
            <textarea
              type='text'
              placeholder={locale === 'id' ? 'Isi' : 'Body'}
              value={this.state.body}
              onChange={this.onBodyChangeEventHandler}
              style={{
                border: '1px solid black',
                padding: '10px',
                marginBottom: '10px',
                fontSize: '18px',
                width: '100%',
                height: '200px'
              }}
            />
            <button type='submit' style={{
              width: '100%',
              padding: '10px',
              fontSize: '18px',
              backgroundColor: '#4caf50',
              color: 'white'
            }}>{locale === 'id' ? 'Tambah' : 'Add'}</button>
          </form>
        )}
      </LocaleConsumer>
    );
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
