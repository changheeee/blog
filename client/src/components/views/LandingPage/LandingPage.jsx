import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from 'react-router-dom';
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../../Config";
import { Button, Carousel } from "antd";

import MainImage from "../commons/MainImage";
import GridCards from "../commons/GridCards";
import styled from "styled-components";

const CarouselWrapper = styled(Carousel)`
  > .slick-dots li {
    bottom: 10px;
  }
  > .slick-dots li button {
    margin: 0 1px;
    width: 10px;
    height: 10px;
    border-radius: 100%;
  }
  > .slick-dots li.slick-active button {
    width: 10px;
    height: 10px;
    // background: red;
  }
`;

function LandingPage() {
  useEffect(() => {
    axios.get("api/hello").then((response) => console.log(response.data));
  }, []);

  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState([]); // MainMovieImage를 배열로 초기화
  const [CurrentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KO&page=1`;
    fetchMovies(endPoint);
  }, []);

  const fetchMovies = (endPoint) => {
    fetch(endPoint)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovies([...Movies, ...response.results]);
        setMainMovieImage([...MainMovieImage, ...response.results]); // MainMovieImage를 업데이트
        setCurrentPage(response.page);
      });
  };

  const loadMoreItems = () => {
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KO&page=${CurrentPage +
      1}`;
    fetchMovies(endPoint);
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      <CarouselWrapper autoplay autoplaySpeed={4000}>
        {MainMovieImage.slice(0, 5).map((main, index) => (
          <MainImage
            key={index}
            image={`${IMAGE_BASE_URL}w1280${main.backdrop_path}`}
            title={main.title}
            text={main.overview}
            tagline={main.tagline}
          />
        ))}
      </CarouselWrapper>
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Movies by latest</h2>
        <hr />
        <div
          className="gridWrap"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCards
                  landingPage
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                  movieNameKo={movie.title}
                />
              </React.Fragment>
            ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={loadMoreItems}>더 보기</Button>
      </div>
    </div>
  );
}

export default LandingPage;
