import React from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';
import { LocaleConsumer } from '../contexts/LocaleContext';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: props.defaultKeyword || ''
    };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  onSubmitHandler(event) {
    event.preventDefault();
    this.props.search(this.state.keyword);
    this.setState({ keyword: '' }); // Clear the keyword after searching
  }

  onKeywordChangeHandler(event) {
    const { value } = event.target;

    this.setState(() => {
      return {
        keyword: value
      };
    });
  }

  render() {

    return (
      <LocaleConsumer>
        {({ locale }) => (
          <form onSubmit={this.onSubmitHandler} className="search-bar">
            <input
              type="text"
              placeholder={locale === 'en' ? 'Search notes by title' : 'Cari catatan berdasarkan judul'}
              value={this.state.keyword}
              onChange={this.onKeywordChangeHandler}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <FiSearch />
            </button>
          </form>
        )}
      </LocaleConsumer>
    );
  }
}

SearchBar.propTypes = {
  search: PropTypes.func.isRequired,
  defaultKeyword: PropTypes.string
};

export default SearchBar;
