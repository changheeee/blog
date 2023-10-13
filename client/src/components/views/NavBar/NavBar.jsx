import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { Button } from 'antd';

const NavWrap = styled.div`
    position: fixed;
    top:0;
    left:0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 70px;
    z-index: 9999;

    background-color: #fefefe;
    border-bottom: 1px solid #ccc;
        box-shadow: 0 10px 10px #5555552c;

    .navIn{
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    }

    .userFnc{
    }
`


function NavBar() {

    const navigate = useNavigate();


    const onClickHandler = () => {
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
        <NavWrap>
            <div className='navIn'>
                <div>
                    <a href="/" style={{ fontSize: '1.5em' }}><span>MOVIE</span> <strong>APP</strong></a>
                    <a href="/favorite" style={{ marginLeft: '100px' }}>Favorite</a>
                </div>
                <div className='userFnc'>
                    <a href="/login">로그인</a>
                    <a href="/register">회원가입</a>
                    <Button onClick={onClickHandler}>로그아웃</Button>
                </div>
            </div>


        </NavWrap>
    )
}

export default NavBar;