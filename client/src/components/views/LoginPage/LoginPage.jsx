import { axios } from "axios";
// import { response } from 'express';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignWrap = styled.div`
  width: 100%;
  margin-top: 3rem;
  /* height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .formContainer {
    min-width: 400px;
    display: flex;
    align-items: center;
    flex-direction: column;
    /* overflow: hidden; */
    /* border: 1px solid red; */
  }

  .formContainer > h2 {
    align-self: center;
    font-size: 2rem;
    font-weight: 700;
    color: #262626;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    label {
      margin-top: 0.5rem;
    }
    input {
      width: 100%;
      height: 40px;
      font-size: 0.875rem;
      border: 1px solid #ccc;
      padding-left: 0.5rem;
      border-radius: 0.5rem;
      color: #000;
    }
    .submit_btn {
      cursor: pointer;
      width: 100%;
      height: 40px;
      background-color: #84c5fb;
      color: #fefefe;
      border: none;
      border-radius: 0.5rem;
      font-size: 1.125rem;
      letter-spacing: -0.04rem;
      font-weight: 600;

      &:hover {
        background-color: #40a9ff;
      }
    }
  }
`;

function LoginPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //서버로 보낼 값들을 state로 갖고 있음
  const [Email, setEmail] = useState(""); //괄호 속에는 초기값, "": 빈칸으로 설정
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // console.log("Email", Email);
    // console.log("Password", Password);

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate("/"); //props.history.push('/') 페이지 이동시 사용
      } else {
        alert("Error");
      }
    }); //dispatch: action을 store로 전달(파라미터: 입력받은 데이터(state) )

    // redux 사용으로 해당코드는 action파일로 이동
    // Axios.post('/api/user/login', body)//index.js에 만들어둔 api랑 같은 주소
    //   .then(response => {})
  };
  return (
    <SignWrap>
      <div className="formContainer">
        <h2>로그인</h2>
        <form onSubmit={onSubmitHandler}>
          <label>이메일</label>
          <input
            type="email"
            value={Email}
            placeholder="이메일을 입력하세요"
            onChange={onEmailHandler}
          />
          {/* 타이핑을 할 때 state를 바꿈(onChagne로) state가 바뀌면 value도 바뀌어서 타이핑이 가능 */}
          <label>비밀번호</label>
          <input
            type="password"
            value={Password}
            placeholder="비밀번호를 입력하세요"
            onChange={onPasswordHandler}
          />
          <br />
          <button className="submit_btn" type="submit">
            로그인
          </button>
        </form>
      </div>
    </SignWrap>
  );
}

export default LoginPage;
