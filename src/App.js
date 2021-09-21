import React from "react";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./views/home";
import Blog from "./views/blog";
import NewBlogPost from "./views/newBlogPost";
import NewAuthor from "./views/newAuthor";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route path="/" exact component={Home} />
      <Route path="/blog/:id" exact component={Blog} />
      <Route path="/newAuthor" exact component={NewAuthor} />
      <Route path="/newBlogPost" exact component={NewBlogPost} />
      <Footer />
    </BrowserRouter>
  );
}

export default App