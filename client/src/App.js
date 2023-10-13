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
// import NavBar from './components/views/NavBar/NavBar.jsx';
import NavBar1 from './components/views/NavBar1/NavBar1';
function App() {
  return (
    <>

      <Router>
        <NavBar1 />
        <div style={{ paddingBottom: '50px' }}>
          <Routes>
            <Route path="/" Component={Auth(LandingPage, null)} />
            <Route path="/login" Component={Auth(LoginPage, false)} />
            <Route path="/register" Component={Auth(RegisterPage, false)} />
            <Route path="/movie/:movieId" Component={Auth(MovieDetail, null)} />
            <Route path="/favorite" Component={Auth(FavoritePage, true)} />
            {/* <Route path="/" Component={LandingPage} />
            <Route path="/login" Component={LoginPage} />
            <Route path="/register" Component={RegisterPage} />
            <Route path="/movie/:movieId" Component={MovieDetail} />
            <Route path="/favorite" Component={FavoritePage} /> */}
          </Routes>
        </div>
      </Router>

    </>
  );
}

export default App;
