import React from 'react';
// import ToggleTheme from '../components/ToggleTheme';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { FcHome, FcPlus, FcSearch } from 'react-icons/fc';
import { FcInternal } from 'react-icons/fc';
import { LocaleConsumer } from '../contexts/LocaleContext';
import { ThemeConsumer } from '../contexts/ThemeContext';
import { ThemeProvider } from '../contexts/ThemeContext';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: localStorage.getItem('theme') || 'light',
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newTheme);

          return {
            theme: newTheme,
          };
        });
      },
    };
  }

  componentDidMount() {
    document.documentElement.setAttribute('data-theme', this.state.theme);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute('data-theme', this.state.theme);
    }
  }

  render() {
    return (
      <ThemeProvider value={this.state}>
        <LocaleConsumer>
          {({ locale, toggleLocale }) => (
            <ThemeConsumer>
              {({ theme }) => {
                return (
                  <nav className='navigation'>
                    <ul>
                      <li>
                        <button onClick={toggleLocale}>
                          {locale === 'id' ? 'en' : 'id'}
                        </button>
                      </li>
                      <li>
                        <Link to='/'>
                          <FcHome size={20} color={theme.fontColor} />
                        </Link>
                      </li>
                      <li>
                        <Link to='/add'>
                          <FcPlus size={20} color={theme.fontColor} />
                        </Link>
                      </li>
                      <li>
                        <Link to='/search'>
                          <FcSearch size={20} color={theme.fontColor} />
                        </Link>
                      </li>
                      <li>
                        <Link to='/archived'>
                          <FcInternal size={20} color={theme.fontColor} />
                        </Link>
                      </li>
                      <li>
                        <button onClick={this.props.logout}>
                          {this.props.name}
                          <FiLogOut size={20} color={theme.fontColor} />
                        </button>
                      </li>
                    </ul>
                  </nav>
                );
              }}
            </ThemeConsumer>
          )}
        </LocaleConsumer>
      </ThemeProvider>
    );
  }
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
