import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { response } from 'express'
import { useNavigate } from 'react-router-dom';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../../Config';
import { Button } from 'antd';

import MainImage from '../commons/MainImage';
import GridCards from '../commons/GridCards';



function LandingPage() {


    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        //인기있는 영화 엔드포인트 지정
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KO&page=1`;

        fetchMovies(endPoint);

    }, [])
    const fetchMovies = (endPoint) => {
        //fetch로 현재 인기있는 영화 가져오기
        fetch(endPoint)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                //setMovies로 가져온 데이터를 배열에 넣기
                setMovies([...Movies, ...response.results]);
                setMainMovieImage(...Movies, response.results[0]);
                setCurrentPage(response.page);
            })
    }

    const loadMoreItems = () => {
        //인기있는 영화 엔드포인트 지정
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KO&page=${CurrentPage + 1}`;
        fetchMovies(endPoint);

    }

    return (
        <div style={{ width: '100%', margin: '0' }}>
            {/* 메인 이미지 */}
            {MainMovieImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.title}
                    text={MainMovieImage.overview}
                    tagline={MainMovieImage.tagline}
                />
            }


            <div style={{ width: '85%', margin: '1rem auto' }}>

                <h2>Movies by latest</h2>
                <hr />

                {/* Movie Grid Cards */}

                <div className='gridWrap' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>

                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                landingPage
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}

                </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={loadMoreItems}>더 보기</Button>
            </div>
        </div>
    )
}

export default LandingPage