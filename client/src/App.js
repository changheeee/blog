import './App.css';
import React from "react";


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

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" Component={Auth(LandingPage, null)} />
          <Route path="/login" Component={Auth(LoginPage, false)} />
          <Route path="/register" Component={Auth(RegisterPage, false)} />
          <Route path="/movie/:movieId" Component={Auth(MovieDetail, null)} />
          <Route path="/favorite" Component={Auth(FavoritePage, true)} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
