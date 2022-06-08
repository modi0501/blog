import React, { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import stylesLight from './CreateBlog.module.css';
import stylesDark from './CreateBlogDark.module.css';
import Error from '../Error/Error';
import { AUTH_TOKEN, LIGHT_THEME } from '../../constants';
import { CREATE_BLOG } from './graphql';

const CreateBlog = (props) => {
  const [formState, setFormState] = useState({
    title: '',
    content: '',
  });
  const navigate = useNavigate();
  const localTheme = localStorage.getItem(LIGHT_THEME);
  const styles = localTheme === 'false' ? stylesDark : stylesLight;
  useEffect(() => {
    if (!localStorage.getItem(AUTH_TOKEN)) navigate('/');
  });
  const [createBlog, { data, error, loading }] = useMutation(CREATE_BLOG, {
    variables: {
      input: formState,
    },
    errorPolicy: 'all',
    onCompleted: ({ createBlog }) => {
      navigate('/');
    },
  });
  return (
    <div className={styles.wrapper}>
      <div className={styles.CreateBlog}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createBlog();
          }}
          className={styles.CreateBlogForm}
        >
          {error && <Error message={error.message} />}
          <p>Create a Post</p>
          <input
            type="text"
            placeholder="Enter a title"
            onChange={(e) =>
              setFormState((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
            required
            className={styles.CreateBlogFormTitle}
          />
          <br />
          <textarea
            placeholder="Write something"
            onChange={(e) =>
              setFormState((prevState) => ({
                ...prevState,
                content: e.target.value,
              }))
            }
            rows="15"
            cols="500"
            className={styles.CreateBlogFormContent}
            minLength="100"
          ></textarea>
          <br />
          <button className={styles.CreateBlogFormButton}>Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
