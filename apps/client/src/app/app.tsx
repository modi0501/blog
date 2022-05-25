import "./app.module.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "../components/Home/Home";
import CreateBlog from "../components/CreateBlog/CreateBlog";
import Blog from "../components/Blog/Blog";
import Signup from "../components/Signup/Signup";
import Signin from "../components/Signin/Signin";
import { isLoggedIn } from "../utils/auth";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="create" element={<CreateBlog />} />
      <Route path="blog/:id" element={<Blog />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
};

export default App;