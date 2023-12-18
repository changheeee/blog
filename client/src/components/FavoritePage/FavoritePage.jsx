import React, { useState, useEffect } from "react";
import "./favorite.css";

import Axios from "axios";
import { Button, Popover } from "antd";
import { IMAGE_BASE_URL } from "../../Config";

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);
  useEffect(() => {
    fetchFavoredMovie();
  }, []);

  const fetchFavoredMovie = () => {
    Axios.post("/api/favorite/getFavoritedMovie", {
      userFrom: localStorage.getItem("userId"),
    }).then((response) => {
      if (response.data.success) {
        setFavorites(response.data.favorites);
      } else {
        alert("영화정보를 가져오는데 실패했습니다.");
      }
    });
  };

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    };

    Axios.post("/api/favorite/removeFromFavorite", variables).then(
      (response) => {
        if (response.data.success) {
          fetchFavoredMovie();
        } else {
          alert("리스트 삭제를 실패했습니다.");
        }
      }
    );
  };

  const renderCards =
    Favorites.length > 0 ? (
      Favorites.map((favorite, index) => {
        const content = (
          <div>
            {favorite.moviePost ? (
              <div>
                <a href={`/movie/${favorite.movieId}`}>
                  <img
                    src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}
                    alt={favorite.movieTitle}
                  />
                </a>
              </div>
            ) : (
              "no image"
            )}
          </div>
        );

        return (
          <tr key={index}>
            <Popover
              content={content}
              title={`${favorite.movieTitle} `}
              placement="bottomLeft"
            >
              <td>{favorite.movieTitle}</td>
            </Popover>

            <td>{favorite.movieRunTime} 분</td>
            <td>
              <Button
                onClick={() =>
                  onClickDelete(favorite.movieId, favorite.userFrom)
                }
              >
                삭제
              </Button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="3">북마크한 영화가 없습니다</td>
      </tr>
    );

  return (
    <div style={{ width: "85%", margin: "0 auto", paddingTop: "100px" }}>
      <h2> 북마크한 영화 </h2>
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>상영 시간</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
