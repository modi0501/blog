import { useState } from "react";
import styles from "./CommentInput.module.css";

const CommentInput = (props) => {
  const [text, setText] = useState("");
  const onSubmitHandler = props.onSubmitHandler;
  return (
    <div className={styles.CommentInput}>
      <textarea
        placeholder="Add a comment"
        onChange={(e) => setText(e.target.value)}
        rows="2"
        cols="500"
        className={styles.CommentInputContent}
        minLength="1"
      ></textarea>
      <button
        onClick={() => {
          onSubmitHandler(text);
        }}
        className={styles.CommentInputButton}
      >
        Comment
      </button>
    </div>
  );
};

export default CommentInput;
