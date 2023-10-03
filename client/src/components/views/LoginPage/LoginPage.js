// import { axios } from 'axios';
// import { response } from 'express';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

function LoginPage(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //서버로 보낼 값들을 state로 갖고 있음
    const [Email, setEmail] = useState("");//괄호 속에는 초기값, "": 빈칸으로 설정
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        console.log("Email", Email);
        console.log("Password", Password);

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    navigate('/') //props.history.push('/') 페이지 이동시 사용
                } else {
                    alert('Error')
                }
            }) //dispatch: action을 store로 전달(파라미터: 입력받은 데이터(state) )

        // redux 사용으로 해당코드는 action파일로 이동
        // Axios.post('/api/user/login', body)//index.js에 만들어둔 api랑 같은 주소
        //   .then(response => {})
    }
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                {/* 타이핑을 할 때 state를 바꿈(onChagne로) state가 바뀌면 value도 바뀌어서 타이핑이 가능 */}
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage