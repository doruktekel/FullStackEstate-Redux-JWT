import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Header from "./components/Header";
import axios from "axios";
import PrivateRoute from "./components/PrivateRoute";
import CreateList from "./pages/CreateList";
import Lists from "./pages/Lists";
import UpdateList from "./pages/UpdateList";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "https://fullstack-estate.onrender.com";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/list/:id" element={<Listing />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/createlist" element={<CreateList />} />
          <Route path="/updatelist/:id" element={<UpdateList />} />
          <Route path="/lists" element={<Lists />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
