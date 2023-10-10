import './App.css';
import React from "react";
import 'antd/dist/antd.css';


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage.jsx'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Auth from './hoc/auth.js'
import MovieDetail from './components/views/MovieDetail/MovieDetail';
import FavoritePage from './components/FavoritePage/FavoritePage';
import NavBar from './components/views/NavBar/NavBar.jsx';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <div style={{ marginTop: '70px', paddingBottom: '50px' }}>
          <Routes>
            <Route path="/" Component={Auth(LandingPage, null)} />
            <Route path="/login" Component={Auth(LoginPage, false)} />
            <Route path="/register" Component={Auth(RegisterPage, false)} />
            <Route path="/movie/:movieId" Component={Auth(MovieDetail, null)} />
            <Route path="/favorite" Component={Auth(FavoritePage, true)} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
