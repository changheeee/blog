import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

function RegisterPage(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //서버로 보낼 값들을 state로 갖고 있음
    const [Email, setEmail] = useState("sum666@naver.com");
    const [Name, setName] = useState("min");
    const [Password, setPassword] = useState("1234567");
    const [ConfirmPassword, setConfrimPassword] = useState("1234567");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfrimPasswordHandler = (event) => {
        setConfrimPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        console.log("Email", Email);
        console.log("Name", Name);
        console.log("Password", Password);
        console.log("ConfirmPassword", ConfirmPassword);

        if (Password !== ConfirmPassword) {
            return alert("비밀번호가 일치하지 않습니다.")
        }

        let body = {
            email: Email,
            name: Name,
            password: Password
        }

        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    navigate('/login') //props.history.push('/') 페이지 이동시 사용
                } else {
                    alert('Failed to sign up')
                }
            }) //dispatch: action을 store로 전달(파라미터: 입력받은 데이터(state) )
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

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfrimPasswordHandler} />

                <br />
                <button type="submit">
                    회원 가입
                </button>
            </form>
        </div>
    )
}

export default RegisterPage