// import { response } from "express";
import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';


export default function (SpecificComponent, option, adminRoute = null) {//ex6문법 아무것도 안들어오면 null
    /*
    option
    null => 아무나 출입이 가능한 페이지
    true => 로그인한 유저만 출입 가능
    false => 로그인한 유저 출입 불가능(ex. login페이지)

    adminRoute 어드민유저만 들어가길 원하는 페이지
    */

    function AuthenticationCeck() {
        const navigate = useNavigate();
        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log(response)

                //로그인하지 않은상태
                if (!response.payload.isAuth) {
                    if (option) {
                        navigate('/login')
                    }
                } else {
                    //로그인 한 상태
                    if (adminRoute && !response.payload.isAdmin) {
                        navigate('/')
                    } else {
                        if (option === false) {
                            navigate('/')
                        }
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCeck;
}


