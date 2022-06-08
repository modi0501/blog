import stylesLight from './Home.module.css';
import stylesDark from './HomeDark.module.css';
import BlogList from '../BlogList/BlogList';
import React, { useContext, useEffect, useState } from 'react';
import { AUTH_TOKEN, LIGHT_THEME, USER_EMAIL, USER_NAME } from '../../constants';
import { Link } from 'react-router-dom';
import { Search } from '../Search/Search';
import DownSVG from '../../down.svg';
import DownDarkSVG from '../../downDark.svg';

const Home = (props) => {
  const [themeChanged, setThemeChanged] = useState(false);
  const [isAuthorised, setIsAuthorised] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOption, setSearchOption] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      setIsAuthorised(true);
    }
  });
  console.log('========Theme======');
  console.log(props.isLightTheme);

  const styles = props.isLightTheme ? stylesLight : stylesDark;
  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(USER_EMAIL);
    localStorage.removeItem(USER_NAME);
    setIsAuthorised(false);
  };
  const onSearchQueryChangeHandler = (query) => {
    setSearchQuery(query.key);
    setSearchOption(query.option);
  };
  return (
    <div className={styles.Home}>
      <div className={styles.HomeHeading}>
        <h1 className={styles.HomeHeadingText}>WELCOME TO MY BLOG</h1>
        <div className={styles.HomeHeadingSection}>
          {/* <div className={styles.HomeHeadingSearchSection}>
            <input
              type="search"
              className={styles.HomeHeadingSearch}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <br />
            <div className={styles.HomeHeadingSearchSectionOptions}>
              <p>Search in</p>
              <input type="radio" value="title" id="title" />
              <label for="title">Title</label>
              <input type="radio" value="title" id="title" />
              <label for="title">User</label>
              <input type="radio" value="title" id="title" />
              <label for="title">Content</label>
            </div>
          </div> */}
          <button
            className={`${styles.HomeButton} ${styles.SearchButton}`}
            onClick={() => setShowSearch((prev) => !prev)}
          >
            Search
            <img
              src={props.isLightTheme ? DownSVG : DownDarkSVG}
              className={styles.DownSVG}
              placeholder="Like"
            />
          </button>
          <button
            onClick={() => {
              localStorage.setItem(
                LIGHT_THEME,
                localStorage.getItem(LIGHT_THEME) === 'false'
              );
              console.log(localStorage);
              setThemeChanged((prevState) => !prevState);
              props.setIsThemeChanged((prevState) => !prevState);
            }}
            className={styles.HomeButton}
          >
            {props.isLightTheme ? 'Dark Mode' : 'Light Mode'}
          </button>

          {isAuthorised === true && (
            <div className={styles.authorised}>
              <button onClick={logout} className={styles.HomeButton}>
                Logout
              </button>
              <a href="/create">
                <button className={styles.HomeButton}>Create</button>
              </a>
            </div>
          )}
          {isAuthorised === false && (
            <div className={styles.unauthorised}>
              <Link to="/signin" className={styles.HomeButton}>
                Signin
              </Link>
              <Link to="/signup" className={styles.HomeButton}>
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
      {showSearch && (
        <Search onSearchQueryChangeHandler={onSearchQueryChangeHandler} />
      )}
      <BlogList searchQuery={searchQuery} searchOption={searchOption} />
    </div>
  );
};

export default Home;
