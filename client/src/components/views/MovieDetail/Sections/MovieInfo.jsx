import React from 'react'
import { Descriptions } from 'antd';


function MovieInfo(props) {
    let { movie } = props;

    // 수익을 세자리 단위로 ,(쉼표) 형식으로 변환하여 표시하는 함수
    const formatRevenue = (revenue) => {
        if (typeof revenue === 'number') {
            return revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            return "N/A";
        }
    };

    return (
        <Descriptions title="영화 정보" bordered>
            <Descriptions.Item label="제목">{movie.title}</Descriptions.Item>
            <Descriptions.Item label="개봉일">{movie.release_date}</Descriptions.Item>
            <Descriptions.Item label="수익">$ {formatRevenue(movie.revenue)}</Descriptions.Item>
            <Descriptions.Item label="상영시간">{movie.runtime}분</Descriptions.Item>
            {/* <Descriptions.Item label="평점" span={2}>
                {movie.vote_average}
            </Descriptions.Item> */}
            <Descriptions.Item label="평점">{movie.vote_average}</Descriptions.Item>
            <Descriptions.Item label="인기도">{movie.popularity}</Descriptions.Item>
        </Descriptions>
    )
}

export default MovieInfo


