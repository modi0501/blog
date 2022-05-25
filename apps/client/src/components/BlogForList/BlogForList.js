import { Link } from "react-router-dom";
import styles from "./BlogForList.module.css";

const BlogForList = (props) => {
  const { title, author, createdOn, content } = props.blog;
  const index = props.index;
  const id = props.blog._id;

  return (
    <div key={index} className={styles.BlogForList}>
      <p className={styles.BlogForListTitle}>{title}</p>
      <p className={styles.BlogForListAuthor}>By- {author.name}</p>
      <p className={styles.BlogForListDate}>
        Date-{" "}
        {new Date(createdOn).toLocaleString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
          hour: "numeric",
          hour12: false,
          minute: "2-digit",
        })}
      </p>
      <p className={styles.BlogForListContent}>{content.substring(0, 100)}</p>
      <Link to={`blog/${id}`} className={styles.BlogForListReadMore}>
        ....Read More
      </Link>
    </div>
  );
};

export default BlogForList;
