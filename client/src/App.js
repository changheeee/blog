import './App.css';
import React from "react";
import 'antd/dist/antd.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Auth from './hoc/auth'
import MovieDetail from './components/views/MovieDetail/MovieDetail';
import FavoritePage from './components/FavoritePage/FavoritePage';
import NavBar from './components/views/NavBar/NavBar';


function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  const AuthMovieDetail = Auth(MovieDetail, null);
  const AuthFavoritePage = Auth(FavoritePage, true);


  return (
    <>

      <Router>
        <NavBar />
        <div style={{ paddingTop: '70px', paddingBottom: '50px' }}>
          <Routes>
            {/* <Route path="/" Component={Auth(LandingPage, null)} />
            <Route path="/login" Component={Auth(LoginPage, false)} />
            <Route path="/register" Component={Auth(RegisterPage, false)} />
            <Route path="/movie/:movieId" Component={Auth(MovieDetail, null)} />
            <Route path="/favorite" Component={Auth(FavoritePage, true)} /> */}

            {/* 각 페이지 컴포넌트 내부에서 Auth HOC를 호출하도록 변경합니다. */}
            {/* <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/movie/:movieId" element={<MovieDetail />} />
            <Route path="/favorite" element={<FavoritePage />} /> */}

            <Route path="/" element={<AuthLandingPage />} />
            <Route path="/login" element={<AuthLoginPage />} />
            <Route path="/register" element={<AuthRegisterPage />} />
            <Route path="/movie/:movieId" element={<AuthMovieDetail />} />
            <Route path="/favorite" element={<AuthFavoritePage />} />


          </Routes>
        </div>
      </Router>

    </>
  );
}

export default App;
