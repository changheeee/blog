import React from 'react'
import { Descriptions } from 'antd';


function MovieInfo(props) {
    let { movie } = props;

    // const addComma = (x) => {
    //     x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // }

    return (
        <Descriptions title="영화 정보" bordered>
            <Descriptions.Item label="제목">{movie.title}</Descriptions.Item>
            <Descriptions.Item label="개봉일">{movie.release_date}</Descriptions.Item>
            <Descriptions.Item label="수익">{movie.revenue}</Descriptions.Item>
            <Descriptions.Item label="runtime">{movie.runtime}분</Descriptions.Item>
            <Descriptions.Item label="평점" span={2}>
                {movie.vote_average}
            </Descriptions.Item>
            <Descriptions.Item label="vote_count">{movie.vote_count}</Descriptions.Item>
            <Descriptions.Item label="status">{movie.status}</Descriptions.Item>
            <Descriptions.Item label="popularity">{movie.popularity}</Descriptions.Item>
        </Descriptions>
    )
}

export default MovieInfo


