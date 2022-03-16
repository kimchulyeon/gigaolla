import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
// icon link
import logo from "../image/ollalogo.svg";
import menu from "../image/menu_gray.svg";
import menuColor from "../image/menu_color.svg";
import police from "../image/police_gray.svg";
import policeColor from "../image/police_color.svg";
import fire from "../image/fire_gray.svg";
import fireColor from "../image/fire_color.svg";
import admin from "../image/admin_gray.svg";
import adminColor from "../image/admin_color.svg";
import checklist from "../image/checklist_gray.svg";
import checklistColor from "../image/checklist_white.svg";
import calendar from "../image/calendar.svg";
// calender
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// 서브 네비게이션
// (다른 직렬을 선택하면 열려있는 직렬서브 네비 닫힘)
function Navigation() {
  const [openedSection, setOpenedSetion] = useState("");
  const onClickSection = (job) => {
    setOpenedSetion(job);
  };
  //직렬별 lnb menu className = "hidden" (display="none")
  let policelnb = "lnbcontainer police hidden";
  let firelnb = "lnbcontainer fire hidden";
  let adminlnb = "lnbcontainer admin hidden";
  if (openedSection === "police") {
    policelnb = "lnbcontainer police";
  } else if (openedSection === "fire") {
    firelnb = "lnbcontainer fire";
  } else if (openedSection === "admin") {
    adminlnb = "lnbcontainer admin";
  }

  // 클릭시 gnb background css 고정 className = "activeBg" 추가
  //  fixBackground === "직렬" 선택시 아이콘 color 변경 고정
  const [fixBackground, setFixBackground] = useState("");
  const [fixTextColor, setFixTextColor] = useState("");
  const onClickShowFix = (kategorie) => {
    setFixBackground(kategorie);
    setFixTextColor(kategorie);
  };
  let policemenu = "link police";
  let firemenu = "link fire";
  let adminmenu = "link admin";
  let allmenu = "link allmenu";
  let checklistmenu = "link checklist";
  if (fixBackground === "allmenu") {
    allmenu += " activeBg";
  } else if (fixBackground === "policemenu") {
    policemenu += " activeBg";
  } else if (fixBackground === "firemenu") {
    firemenu += " activeBg";
  } else if (fixBackground === "adminmenu") {
    adminmenu += " activeBg";
  } else if (fixTextColor === "checklistmenu") {
    checklistmenu += " listtextcolor";
  }

  // icon color hover
  const [hoveredIcon, sethoveredIcon] = useState("");
  const onMouseOver = (coloricon) => {
    sethoveredIcon(coloricon);
  };
  const onMouseOut = (coloricon) => {
    sethoveredIcon(!coloricon);
  };
  let navicon = "navicon";
  if (hoveredIcon === "allmenucolor") {
    navicon += " allmenuicon";
  } else if (hoveredIcon === "policemenucolor") {
    navicon += " policeicon";
  } else if (hoveredIcon === "firemenucolor") {
    navicon += " fireicon";
  } else if (hoveredIcon === "adminmenucolor") {
    navicon += " adminicon";
  } else if (hoveredIcon === "checklistmenucolor") {
    navicon += " checklisticon";
  }

  // lnb menu click시 text color 변경 고정
  const [clickTextColor, setClickTextColor] = useState("");
  const onClicklnb = (textColor) => {
    setClickTextColor(textColor);
  };
  let lnbtextColor = "lnbtext";
  if (clickTextColor === "classnumber") {
    lnbtextColor += " clickde_text";
  }

  // 일정관리 라이브러리
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <StyledNavigation>
        <div className="container">
          <div className="navgation">
            <div className="logobox">
              <img src={logo} alt="logo" className="logo" />
            </div>
            <ul>
              {/* 전체개요 */}
              <li className="gnb">
                <NavLink
                  to="/"
                  className={allmenu}
                  onClick={() => {
                    onClickShowFix("allmenu");
                  }}
                  onMouseOver={() => {
                    onMouseOver("allmenucolor");
                  }}
                  onMouseOut={() => {
                    onMouseOut("allmenucolor");
                  }}
                >
                  <img
                    src={
                      fixBackground === "allmenu" ||
                      hoveredIcon === "allmenucolor"
                        ? menuColor
                        : menu
                    }
                    alt="menu"
                    className={navicon}
                  />
                  <span className="menutext">전체개요</span>
                </NavLink>
              </li>
              {/* 전체개요 끝 */}
              {/* 경찰직렬 메뉴 */}
              <li className="gnb">
                <NavLink
                  to="/경찰"
                  className={policemenu}
                  onClick={() => {
                    onClickSection("police");
                    onClickShowFix("policemenu");
                  }}
                  onMouseOver={() => {
                    onMouseOver("policemenucolor");
                  }}
                  onMouseOut={() => {
                    onMouseOut("policemenucolor");
                  }}
                >
                  <img
                    src={
                      fixBackground === "policemenu" ||
                      hoveredIcon === "policemenucolor"
                        ? policeColor
                        : police
                    }
                    alt="menu"
                    className={navicon}
                  />
                  <span className="policetext">경찰직</span>
                </NavLink>
                {/* 경찰 lnb */}
                <div className={policelnb}>
                  <ul className="lnb">
                    <li>
                      <NavLink
                        className={policemenu ? "lnblink fontWhite" : "lnblink"}
                        to="/경찰"
                      >
                        <p>전체</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="lnblink" to="/경찰/1">
                        <p>1반</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="lnblink" to="/경찰/2">
                        <p>2반</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="lnblink" to="/경찰/3">
                        <p>3반</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="lnblink" to="/경찰/5">
                        <p>5반</p>
                      </NavLink>
                    </li>
                  </ul>
                </div>
                {/* 경찰 lnb 끝 */}
              </li>
              {/* 경찰직렬 메뉴끝 */}
              {/* 소방직렬 메뉴 */}
              <li className="gnb">
                <NavLink
                  to="/소방"
                  className={firemenu}
                  onClick={() => {
                    onClickSection("fire");
                    onClickShowFix("firemenu");
                  }}
                  onMouseOver={() => {
                    onMouseOver("firemenucolor");
                  }}
                  onMouseOut={() => {
                    onMouseOut("firemenucolor");
                  }}
                >
                  <img
                    src={
                      fixBackground === "firemenu" ||
                      hoveredIcon === "firemenucolor"
                        ? fireColor
                        : fire
                    }
                    alt="menu"
                    className={navicon}
                  />
                  <span className="firetext">소방직</span>
                </NavLink>
                {/* 소방 lnb */}
                <div className={firelnb}>
                  <ul className="lnb">
                    <li>
                      <NavLink
                        className={firemenu ? "lnblink fontWhite" : "lnblink "}
                        to="/소방"
                      >
                        <p>전체</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="lnblink" to="/소방/1">
                        <p>1반</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="lnblink" to="/소방/2">
                        <p>2반</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="lnblink" to="/소방/3">
                        <p>3반</p>
                      </NavLink>
                    </li>
                  </ul>
                </div>
                {/* 소방 lnb 끝 */}
              </li>
              {/* 소방직렬 메뉴끔 */}
              {/* 행정직렬 메뉴끔 */}
              <li className="gnb">
                <NavLink
                  to="/행정"
                  className={adminmenu}
                  onClick={() => {
                    onClickSection("admin");
                    onClickShowFix("adminmenu");
                  }}
                  onMouseOver={() => {
                    onMouseOver("adminmenucolor");
                  }}
                  onMouseOut={() => {
                    onMouseOut("adminmenucolor");
                  }}
                >
                  <img
                    src={
                      fixBackground === "adminmenu" ||
                      hoveredIcon === "adminmenucolor"
                        ? adminColor
                        : admin
                    }
                    alt="menu"
                    className={navicon}
                  />
                  <span className="admintext">행정직</span>
                </NavLink>
                {/* 행정 lnb */}
                <div className={adminlnb}>
                  <ul className="lnb">
                    <li>
                      <NavLink
                        className={adminmenu ? "lnblink fontWhite" : "lnblink "}
                        to="/행정"
                      >
                        <p>전체</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="lnblink" to="/행정/1">
                        <p>1반</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="lnblink" to="/행정/2">
                        <p>2반</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="lnblink" to="/행정/3">
                        <p>3반</p>
                      </NavLink>
                    </li>
                  </ul>
                </div>
                {/* 행정 lnb 끝 */}
              </li>
              {/* 행정직렬 메뉴끔 */}
              <MidLine />
            </ul>
            {/* 일정관리 */}
            <div className="checklistContainer">
              <NavLink
                to="/schedule"
                className="link"
                onClick={checklistmenu}
                onMouseOver={() => onMouseOver("checklistmenucolor")}
                onMouseOut={() => onMouseOut("checklistmenucolor")}
              >
                <img
                  src={
                    fixTextColor === "checklistmenu" ||
                    hoveredIcon === "checklistmenucolor"
                      ? checklistColor
                      : checklist
                  }
                  alt="checklist"
                  className={navicon}
                />
                <span
                  className={
                    fixTextColor === "checklistmenu"
                      ? "checklistText white"
                      : "checklistText"
                  }
                >
                  일정관리
                </span>
              </NavLink>
            </div>
            {/* 일정관리 끝 */}
            {/* 달력 */}
            <div className="calendarcontiner">
              <img src={calendar} alt="menu" className={navicon} />
              <DatePicker
                className="datepicker"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <div className="todolist">
                <p>
                  <span className="time">08:00 AM</span>경찰직 모의고사
                </p>
                <p>
                  <span className="time">10:30 AM</span>관리자 회의
                </p>
              </div>
            </div>
            {/* 달력 끝 */}
          </div>
        </div>
      </StyledNavigation>
    </div>
  );
}

export default Navigation;

const StyledNavigation = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  /* min-height: 100vh; */
  overflow-x: hidden;

  .container {
    position: relative;
    width: 100%;
  }
  .navgation {
    position: fixed;
    width: 286px;
    height: 100%;
    background: #5d5fef;
    border-left: 29px solid #5d5fef;
    overflow: hidden;
    font-weight: 500;
    font-size: 22px;
    .logo {
      width: 191px;
      height: 45px;
      margin: 62px 0 91px 33px;
    }
    ul {
      li {
        position: relative;
        width: 100%;
        list-style: none;
        .link {
          width: 286px;
          display: flex;
          text-decoration: none;
          color: #c7c7c7;
          &:hover {
            background: #fff;
            border-top-left-radius: 30px;
            border-bottom-left-radius: 30px;
          }
          .menutext {
            &:hover {
              color: #5d5fef;
            }
          }
          .policetext {
            &:hover {
              color: #161aec;
            }
          }
          .firetext {
            &:hover {
              color: #fd4f3a;
            }
          }
          .admintext {
            &:hover {
              color: #257e0e;
            }
          }
          &:hover span::before {
            content: "";
            position: absolute;
            right: -85px;
            top: -50px;
            width: 50px;
            height: 50px;
            background: transparent;
            border-radius: 50%;
            box-shadow: 35px 35px 0 10px #fff;
          }
          &:hover span::after {
            content: "";
            position: absolute;
            left: 155px;
            bottom: -50px;
            width: 50px;
            height: 50px;
            background: transparent;
            border-radius: 50%;
            box-shadow: 35px -35px 0 10px #fff;
          }

          img,
          .navicon {
            display: block;
            min-width: 26px;
            padding: 25px;
            height: 32px;
            :last-child {
              height: 28px;
            }
          }
          span {
            position: relative;
            display: block;
            padding: 0 3px;
            width: 40%;
            height: 80px;
            line-height: 80px;
            text-align: center;
          }
        }
        /* active 클릭시 gnb background, fontcolor css 고정*/
        .activeBg {
          width: 100%;
          background: #fff;
          border-top-left-radius: 30px;
          border-bottom-left-radius: 30px;
          span::before {
            content: "";
            position: absolute;
            right: -85px;
            top: -50px;
            width: 50px;
            height: 50px;
            background: transparent;
            border-radius: 50%;
            box-shadow: 35px 35px 0 10px #fff;
          }
          span::after {
            content: "";
            position: absolute;
            left: 155px;
            bottom: -50px;
            width: 50px;
            height: 50px;
            background: transparent;
            border-radius: 50%;
            box-shadow: 35px -35px 0 10px #fff;
          }
          .menutext {
            color: #5d5fef;
          }
          .policetext {
            color: #161aec;
          }
          .firetext {
            color: #fd4f3a;
          }
          .admintext {
            color: #257e0e;
          }
          .lnb:first-child {
            color: #fff;
          }
        }
      }
      // 서브 메뉴 css
      .lnbcontainer {
        width: 315px;
        height: 100%;
        background: #5d5fef;
        /* overflow: hidden; */
        font-weight: 400;
        font-size: 18px;
        li {
          list-style: none;
          background: #5d5fef;
          .lnblink {
            display: block;
            width: 100%;
            height: 40px;
            margin: 20px;
            display: flex;
            line-height: 40px;
            font-size: 18px;
            text-decoration: none;
            color: #c7c7c7;
            p:hover:nth-child(n + 2) {
              font-weight: 700;
              color: #fff;
            }
            p {
              position: relative;
              display: block;
              padding: 0 3px;
              width: 75%;
              height: 80px;
              line-height: 40px;
              text-align: center;
              .clickde_text {
                color: #fff;
              }
            }
          }
          // 직렬 선택시 직렬 서브메뉴 '전체' font color 변경
          .fontWhite {
            color: #fff;
          }
        }
        &.hidden {
          display: none;
        }
      }
    }

    .checklistContainer {
      width: 285px;
      height: 80px;
      font-weight: 500;
      font-size: 20px;
      .link {
        position: relative;
        width: 100%;
        display: flex;
        text-decoration: none;
        color: #c7c7c7;
        img {
          width: 28px;
          padding: 25px;
          margin-left: 3px;
        }
        span {
          display: block;
          padding: 0 3px;
          width: 40%;
          height: 80px;
          line-height: 74px;
          text-align: center;
          &:hover {
            color: #fff;
          }
        }
        .white {
          color: #fff;
        }
      }
    }
    .calendarcontiner {
      position: relative;
      /* display: block; */
      top: 30px;
      left: 19px;
      border-radius: solid 1px red;
      .datepicker {
        width: 220px;
        height: 58px;
        background: #f0f7ff;
        border: none;
        border-radius: 11px;
        font-size: 20px;
        text-align: center;
        &:focus {
          outline: none;
        }
      }
      img {
        position: absolute;
        top: 14px;
        left: 10px;
        z-index: 1;
      }
      .todolist {
        display: block;
        width: 225px;
        margin-top: 22px;
        font-size: 16px;
        color: #fff;
        p {
          margin-bottom: 17px;
          font-weight: 500;
          span {
            font-size: 13px;
            color: #dadada;
            font-weight: 400;
            margin: 0 15px 0 15px;
          }
        }
      }
    }
  }
`;

// 네비게이션 중앙 라인
const MidLine = styled.div`
  width: 220px;
  height: 1px;
  margin: 10px 47px 30px 18px;
  border-top: 1px solid #c4c4c4;
`;
