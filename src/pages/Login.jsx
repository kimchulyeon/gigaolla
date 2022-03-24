import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom, isLoggedIn } from "../utils/atoms";
import logo from "../image/ollaedu_logo.svg";
import footerLogo from "../image/eduhash_logo.svg";
import idIcon from "../image/Username.svg";
import idIconDark from "../image/user_dark.svg";
import passwordIcon from "../image/Password.svg";
import passwordIconDark from "../image/lock_dark.svg";
import { signIn } from "../utils/auth";

// 전체 페이지 Wrap
const Background = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
// 로그인 wrap
const Cont = styled.div`
  height: 44.4em;
  background: ${(props) => props.theme.chartBackgroundColor};
  box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.04),
    0px 0px 1px rgba(0, 0, 0, 0.04);
  border-radius: 25px;
  max-width: 34em;
  min-width: 34em;
  max-height: 710px;
  margin: 0 3em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
// 로그인 Inner
const Inner = styled.div`
  min-width: 300px;
  text-align: center;
`;
// Logo Img
const LogoImg = styled.img`
  max-width: 18.75em;
  margin-bottom: 60px;
  width: 100%;
`;
// Login Wrap
const LoginCont = styled.div`
  position: relative;
  max-width: 18.75em;
  height: 12.38em;
`;
// Input Wrap
const InputCont = styled.div`
  + div {
    margin-top: 1.25em;
  }
`;
// Icon
const Icon = styled.img`
  position: absolute;
  margin-left: 0.75em;
  margin-top: 0.75em;
`;
// Input
const Input = styled.input`
  width: 100%;
  height: 2.81rem;
  padding: 0 0 0 3.19em;
  border: 1px solid #545454;
  border-radius: 4px;
  box-sizing: border-box;
  background: ${(props) => props.theme.chartBackgroundColor};
  color: ${(props) => props.theme.chartTitleColor};
  font-size: 0.88em;
  line-height: 1.25rem;
  font-family: "Roboto", sans-serif;
  letter-spacing: 0.13em;
  ::placeholder {
    color: ${(props) => props.theme.inputTextColor};
    text-transform: uppercase;
  }
`;
// Button
const Button = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2.81rem;
  padding: 0;
  color: #fff;
  background-color: #5d5fef;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.24);
  border-radius: 4px;
  font-size: 1em;
  line-height: 1.25em;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  border: none;
`;
const Powered = styled.div`
  padding-top: 91px;
  color: #999999;
  line-height: 22px;
  font-weight: bold;
  font-family: "Noto Sans";
  p {
    margin-bottom: 10px;
  }
`;

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedIn);
  const isDark = useRecoilValue(isDarkAtom);

  const submitHandler = () => {
    try {
      signIn({ userName, password });
      setIsLoggedIn((value) => !value);
      navigate("/", { replace: true });
    } catch (e) {
      alert("Failed to login");
      setUserName("");
      setPassword("");
    }
  };

  return (
    <Background>
      <Cont>
        <Inner>
          <LogoImg src={logo} alt="" />
          <LoginCont>
            <InputCont>
              {isDark ? (
                <Icon src={idIconDark} alt="id" />
              ) : (
                <Icon src={idIcon} alt="id" />
              )}
              <Input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={({ target: { value } }) => {
                  setUserName(value);
                }}
              />
            </InputCont>
            <InputCont>
              {isDark ? (
                <Icon src={passwordIconDark} alt="password" />
              ) : (
                <Icon src={passwordIcon} alt="password" />
              )}
              <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={({ target: { value } }) => {
                  setPassword(value);
                }}
              />
            </InputCont>
            <Button onClick={submitHandler}>login</Button>
          </LoginCont>
          <Powered>
            <p>Powered by</p>
            <img src={footerLogo} alt="footerLogo" />
          </Powered>
        </Inner>
      </Cont>
    </Background>
  );
};

export default Login;
