import React, { useEffect } from 'react'
import axios from 'axios'
// import { response } from 'express'
import { useNavigate } from 'react-router-dom';

function LandingPage() {

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('api/hello')//서버측으로 주는 엔드포인트, 서버측 index.js에 get라우터 구현
            .then(response => console.log(response.data))
    }, [])

    const onClickHandelr = () => {
        axios.get('/api/users/logout')
            .then(response => {
                if (response.data.success) {
                    navigate('/login')
                } else {
                    //실패
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>

            <button onClick={onClickHandelr}>로그아웃</button>
            LandingPage</div>
    )
}

export default LandingPage