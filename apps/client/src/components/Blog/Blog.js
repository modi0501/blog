import { useMutation, useQuery } from '@apollo/react-hooks';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LIGHT_THEME, USER_EMAIL } from '../../constants';
import Comment from '../Comment/Comment';
import CommentInput from '../CommentInput/CommentInput';
import Error from '../Error/Error';
import stylesLight from './Blog.module.css';
import stylesDark from './BlogDark.module.css';
import { ADD_COMMENT, BLOG, LIKE_REMOVE_LIKE } from './graphql';
import BlogLike from '../../thumbs-up.svg';

const Blog = () => {
  const params = useParams();
  const { loading, error, data } = useQuery(BLOG, {
    variables: {
      id: params.id,
    },
  });
  const [addComment, { dataComment, errorComment, loadingComment }] =
    useMutation(ADD_COMMENT);
  const [likeOrRemoveLikePost, { dataLike, errorLike, loadingLike }] =
    useMutation(LIKE_REMOVE_LIKE);

  const localTheme = localStorage.getItem(LIGHT_THEME);
  const styles = localTheme === 'false' ? stylesDark : stylesLight;

  if (loading)
    return (
      <div className={styles.wrapper}>
        <p className={styles.BlogLoading}>Loading...</p>
      </div>
    );
  if (error) return <Error message={error.message} />;
  const blog = data.getBlogById;
  const isAuthorised = data.isAuthorised;
  const likedBy = blog.likedBy;
  let liked = false;
  console.log(likedBy);
  likedBy.forEach((liker) => {
    if (liker.email === localStorage.getItem(USER_EMAIL)) {
      liked = true;
    }
  });

  console.log(liked);

  const onSubmitHandler = (text) => {
    addComment({
      variables: { input: { comment: text, blog: blog._id } },
      refetchQueries: [{ query: BLOG, variables: { id: params.id } }],
    });
  };

  const likeHandler = () => {
    console.log({ id: blog._id, like: liked ? 0 : 1 });
    likeOrRemoveLikePost({
      variables: { id: blog._id, like: liked ? 0 : 1 },
      refetchQueries: [{ query: BLOG, variables: { id: params.id } }],
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const commentsArray = blog.comments.map((comment, index) => (
    <Comment comment={comment} key={index} />
  ));
  return (
    <div className={styles.wrapper}>
      <div className={styles.Blog}>
        <p className={styles.BlogTitle}>{blog.title}</p>
        <p className={styles.BlogAuthor}>By- {blog.author.name}</p>
        <p className={styles.BlogDate}>
          Date-{' '}
          {new Date(blog.createdOn).toLocaleString('en-US', {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            hour12: false,
            minute: '2-digit',
          })}
        </p>
        <pre className={styles.BlogContent}>{blog.content}</pre>
        {isAuthorised && (
          <div>
            <button
              className={
                liked ? styles.BlogRemoveLikeButton : styles.BlogLikeButton
              }
              onClick={likeHandler}
            >
              {/* {liked ? "Remove Like" : "Like"} */}
              <img
                src={BlogLike}
                className={styles.BlogLikeSVG}
                placeholder="Like"
              />
            </button>{' '}
            <p className={styles.BlogLikesHeading}>Likes ({blog.likes})</p>
          </div>

          // <svg src="/home/modi0501/blog/client/src/thu.svg" />
        )}
        {isAuthorised && <CommentInput onSubmitHandler={onSubmitHandler} />}
        <p className={styles.BlogCommentHeading}>
          Comments ({blog.comments.length})
        </p>
        <div>{commentsArray}</div>
      </div>
    </div>
  );
};

export default Blog;
