import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../../Config';
import { useParams } from 'react-router-dom';
import { Row } from 'antd';


import MainImage from '../commons/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite';
import Comments from './Sections/Comments';


function MovieDetail(props) {
    //v6에서는 useParams를 사용해야함
    let { movieId } = useParams();
    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);
    const [CommentLists, setCommentLists] = useState([])

    useEffect(() => {

        console.log(movieId)

        //영화 정보 
        let endPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko-KO`;

        //출연진 정보
        let endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;


        //영화 정보
        fetch(endPointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response);
            });

        //출연진 정보
        fetch(endPointCrew)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setCasts(response.cast);
            });

    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle);
    }

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    return (
        <div>
            {/* Header */}
            <MainImage
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={Movie.title}
                text={Movie.overview}
                tagline={Movie.tagline}
            />


            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>

                {/* 영화정보 */}
                <div>
                    <MovieInfo
                        movie={Movie}
                    />
                </div>
                <br />

                {/* 출연진 보기 */}

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button style={{ marginBottom: '1em' }} onClick={toggleActorView}>출연진 보기</Button>
                </div>

                {ActorToggle &&
                    <Row gutter={[16, 16]} >

                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    image={cast.profile_path ?
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    charactorName={cast.name}
                                />
                            </React.Fragment>
                        ))}

                    </Row>
                }

                {/* Comments */}
                <Comments movieTitle={Movie.original_title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} />
            </div>

        </div>
    )
}

export default MovieDetail