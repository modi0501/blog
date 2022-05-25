import React from "react";
import { useQuery } from "@apollo/react-hooks";
import BlogForList from "../BlogForList/BlogForList";
import styles from "./BlogList.module.css";
import { BLOG_LIST } from "./graphql";
import Error from "../Error/Error";

const BlogList = (props) => {
  const { loading, error, data } = useQuery(BLOG_LIST);
  const searchQuery = props.searchQuery;
  const searchOption = props.searchOption;

  if (loading) return <p className={styles.BlogListLoading}>Loading...</p>;
  if (error) return <Error message={error.message} />;

  let blogArray;
  const blogsFetched = data.getAllBlogs.filter((blog) => {
    console.log(blog.title, searchQuery);
    if(searchOption !== '') {
      if(searchOption === 'author')
      return blog[searchOption].name.toUpperCase().includes(searchQuery.toUpperCase());
      return blog[searchOption].toUpperCase().includes(searchQuery.toUpperCase());
    }

    return (
      blog.title.toUpperCase().includes(searchQuery.toUpperCase()) ||
      blog.author.name.toUpperCase().includes(searchQuery.toUpperCase()) ||
      blog.content.toUpperCase().includes(searchQuery.toUpperCase())
    );
  });
  blogArray = blogsFetched.map((blog, index) => {
    return (
      <div key={index}>
        <BlogForList blog={blog} index={index} />
      </div>
    );
  });
  return <div className={styles.BlogListArray}>{blogArray}</div>;
};

export default BlogList;
