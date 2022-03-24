import React from "react";
import { Reset } from "styled-reset";
import { Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Class from "../src/pages/Class";
import { defaultTheme, darkTheme } from "./utils/theme";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom, isLoggedIn } from "./utils/atoms";
import Navigation from "./components/Navigation";
import PrivateRoute from "./lib/PrivateRoute";
import Students from "./pages/Students";
import StudentDetail from "./components/student/StudentDetail";
import logoutDark from "./image/logout.svg";
import logoutDefault from "./image/logout_color.svg";
import lightmode from "./image/Lightmode.svg";
import darkmode from "./image/Darkmode.svg";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{
    background-color: ${(props) => props.theme.mainBackground};
  }
`;

const Darkmode = styled.button`
  width: 3em;
  height: 3em;
  position: absolute;
  top: 40px;
  right: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  z-index: 1;
  background: #ffffff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.1);
  & > * {
    font-size: 2em;
    cursor: pointer;
    position: absolute;
  }
`;
const LogoutBtn = styled.button`
  width: 10em;
  height: 3em;
  position: absolute;
  top: 40px;
  right: 107px;
  border: none;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.ollaTextColor};
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.1);
  img {
    padding-right: 10px;
  }
  box-sizing: border-box;
`;
const HiddenNavigation = styled.div`
  &.hidden {
    display: none;
  }
`;

function App() {
  // RECOIL : 다크모드
  const isDark = useRecoilValue(isDarkAtom);
  const setIsDark = useSetRecoilState(isDarkAtom);
  const changeTheme = () => {
    setIsDark((prev) => !prev);
  };
  // RECOIL : 로그인, 로그아웃
  const isLogged = useRecoilValue(isLoggedIn);
  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };

  return (
    <div className="App">
      <ThemeProvider theme={isDark ? darkTheme : defaultTheme}>
        <Reset />
        <GlobalStyle />
        <HiddenNavigation className={isLogged ? "" : "hidden"}>
          <Navigation />
        </HiddenNavigation>
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/:subject" element={<PrivateRoute />}>
            <Route path="/:subject" element={<Class />}>
              <Route path="" />
              <Route path=":number" />
            </Route>
          </Route>
          <Route path="/:subject/students" element={<PrivateRoute />}>
            <Route path="/:subject/students" element={<Students />} />
          </Route>
          <Route path="/:subject/:number/students" element={<PrivateRoute />}>
            <Route path="/:subject/:number/students" element={<Students />}>
              <Route path=":name" element={<StudentDetail />} />
            </Route>
          </Route>
          <Route path="/:subject/students" element={<PrivateRoute />}>
            <Route path="/:subject/students" element={<Students />} />
          </Route>
        </Routes>
        {/* 다크모드버튼 */}
        {isLogged ? (
          <LogoutBtn onClick={logoutHandler}>
            {isDark ? (
              <img src={logoutDark} alt="logoutDark" />
            ) : (
              <img src={logoutDefault} alt="logoutDefault" />
            )}
            Logout
          </LogoutBtn>
        ) : (
          ""
        )}
        <Darkmode onClick={changeTheme}>
          {isDark ? (
            <img src={lightmode} alt="lightmode" />
          ) : (
            <img src={darkmode} alt="darkmode" />
          )}
        </Darkmode>
      </ThemeProvider>
    </div>
  );
}
export default App;
