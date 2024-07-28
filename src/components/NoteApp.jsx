import React, { Component } from 'react';
import ToggleTheme from '../components/ToggleTheme';
import { ThemeProvider } from '../contexts/ThemeContext';
import { Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import HomePage from '../pages/HomePage';
import AddPage from '../pages/AddPage';
import DetailPage from '../pages/DetailPage';
import SearchPage from '../pages/SearchPage';
import ArchivedPage from '../pages/ArchivedPage';
import FailedPage from '../pages/FailedPage' 
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import { getUserLogged, putAccessToken } from '../utils/api';
import { LocaleProvider } from '../contexts/LocaleContext';

class NoteApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      loading: false,
      localeContext: {
        locale: 'id',
        toggleLocale: () => {
          this.setState((prevState) => {
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: prevState.localeContext.locale === 'id' ? 'en' : 'id'
              }
            }
          })
        }
      },
      theme: localStorage.getItem('theme') || 'light',
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newTheme);
          return {
            theme: newTheme
          };
        });
      }
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.getActiveNotes = this.getActiveNotes.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute('data-theme', this.state.theme);
    }
  }

  async componentDidMount() {
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false
      };
    });
    document.documentElement.setAttribute('data-theme', this.state.theme);
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null
      }
    });
    putAccessToken('');
  }

  async getActiveNotes() {
    this.setState({ loading: true });
    const response = await fetchWithToken(`${BASE_URL}/notes`);
    const responseJson = await response.json();
    this.setState({ loading: false });
    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
    return { error: false, data: responseJson.data };
  }

  render () {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <LocaleProvider value={this.state.localeContext}>
        <ThemeProvider value={this.state}>
          <div className='note-app'>
          <ToggleTheme />
          <header className='note-app__header'>
            <h1>Aplikasi Note</h1>
          </header>
          <main>
            <Routes>
            <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
              <Route path="/register"element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>       
      </LocaleProvider>
      )
    }

    return (
      <LocaleProvider value={this.state.localeContext}>
      <ThemeProvider value={this.state}>
        <div className="note-app">
        <ToggleTheme />

        <header className='note-app__header'>
        <h1>{this.state.localeContext.locale === 'id' ? 'Aplikasi catatan' : 'Notes App'}</h1>
          <Navigation logout={this.onLogout} name={this.state.authedUser.name} />
        </header>

        {this.state.loading && <div>Loading...</div>}

        <main>
          <Routes>
            <Route path="/" element={<HomePage getNotes={this.getActiveNotes} />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/archived" element={<ArchivedPage />} />
            <Route path="/notes/:id" element={<DetailPage />} />
            <Route path="/*" element={<FailedPage />} />
          </Routes>
        </main>
      </div>
      </ThemeProvider>      
      </LocaleProvider>     
    );
  }
}

export default NoteApp;