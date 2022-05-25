import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { AUTH_TOKEN } from "../../constants";
import { useState } from "react";
import styles from "./Comment.module.css";
import { ADD_REPLY, COMMENT_BY_ID, DELETE_COMMENT } from "./graphql";

const Comment = (props) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  let [replies, setReplies] = useState([]);
  const [getCommentById, { loadingReply, errorReply, dataReply }] =
    useLazyQuery(COMMENT_BY_ID);
  const id = props.comment._id;
  const comment = props.comment.comment;
  const date = props.comment.createdAt;
  const user = props.comment.user.name;
  const [addReply, { dataAddReply }] = useMutation(ADD_REPLY, {
    variables: {
      input: {
        comment: replyText,
        parentComment: id,
      },
    },
    onCompleted: (data) => {
      setReplies((prevState) => (replies = [data.addReply, ...prevState]));
    },
  });
  const [deleteComment, { deleteCommentData, deleteCommentError }] =
    useMutation(DELETE_COMMENT);

  const onClickHandler = () => {
    getCommentById({
      variables: {
        id: id,
      },
      onCompleted: (data) => {
        setReplies(data.getCommentById.replies);
      },
    });
    setShowReplies((prevState) => !prevState);
  };

  const replyArray = replies.map((reply, index) => (
    <div className={styles.Reply} key={index}>
      <Comment comment={reply} className={styles.Reply} />
    </div>
  ));

  const replySubmitHandler = () => {
    addReply();
    setShowReplyInput(false);
    setShowReplies(true);
  };

  return (
    <div>
      <div className={styles.Comment}>
        <div className={styles.CommentUserDate}>
          <p className={styles.CommentUser}>{user}</p>
          <p className={styles.CommentDate}>
            {new Date(date).toLocaleString("en-US", {
              month: "long",
              day: "2-digit",
              year: "numeric",
              hour: "numeric",
              hour12: false,
              minute: "2-digit",
            })}
          </p>
        </div>
        <p className={styles.CommentText}>{comment}</p>
      </div>
      <button onClick={onClickHandler} className={styles.CommentViewReplies}>
        {!showReplies ? "View Replies" : "Hide Replies"}
      </button>
      {localStorage.getItem(AUTH_TOKEN) && (
        <button
          onClick={() => setShowReplyInput((prevState) => !prevState)}
          className={styles.CommentViewReplies}
        >
          Add Reply
        </button>
      )}
      {showReplyInput && (
        <div className={styles.CommentShowReply}>
          <input
            type="text"
            placeholder="Add a Reply"
            className={styles.CommentReplyInput}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button
            onClick={replySubmitHandler}
            className={styles.CommentReplyButton}
          >
            Add
          </button>
        </div>
      )}

      {showReplies && replies.length > 0 && <div>{replyArray}</div>}
    </div>
  );
};

export default Comment;
