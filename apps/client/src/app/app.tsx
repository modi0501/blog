import './app.module.css';
import stylesLight from './appLight.module.css';
import stylesDark from './appDark.module.css';
import { Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Home from '../components/Home/Home';
import CreateBlog from '../components/CreateBlog/CreateBlog';
import Blog from '../components/Blog/Blog';
import Signup from '../components/Signup/Signup';
import Signin from '../components/Signin/Signin';
import { isLoggedIn } from '../utils/auth';
import { LIGHT_THEME } from '../constants';

const App = () => {
  const [isThemeChanged, setIsThemeChanged] = useState(false);

  const localTheme = localStorage.getItem(LIGHT_THEME);
  const styles = localTheme === 'false' ? stylesDark : stylesLight;
  return (
    <div
      // className={`${localTheme === 'false' ? styles['dark'] : styles['light']}`}
      className={styles['theme']}
    >
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setIsThemeChanged={setIsThemeChanged}
              isLightTheme={!(localTheme === 'false')}
            />
          }
        />
        <Route path="create" element={<CreateBlog />} />
        <Route path="blog/:id" element={<Blog />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
      {/* </ToggleTheme.Provider> */}
    </div>
  );
};

export default App;
