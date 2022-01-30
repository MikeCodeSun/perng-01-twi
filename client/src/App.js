import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar1 from "./component/Nav";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import SearchPage from "./page/SearchPage";
import SinglePost from "./page/SinglePost";

export default function App() {
  return (
    <>
      <Router>
        <Navbar1 />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/:id" element={<SinglePost />} />
        </Routes>
      </Router>
    </>
  );
}
