import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import NavigationCalender from "../components/NavigationCalendar";
import NavigationPolicemenu from "../components/NavigationPolicemenu";
import NavigationFiremenu from "../components/NavigationFiremenu";
import NavigationAdminmenu from "../components/NavigationAdminmenu";
import NavigationChecklist from "../components/NavigationChecklist";
// icon link
import logo from "../image/ollalogo.svg";
import menu from "../image/menu_gray.svg";
import menuColor from "../image/menu_color.svg";
import clsx from "clsx";

function Navigation() {
  // 서브 네비게이션 (다른 직렬을 선택하면 열려있는 직렬서브 네비 닫힘)
  //직렬별 lnb menu className = "hidden" (display="none")
  // clsx classnames
  const [openedSection, setOpenedSetion] = useState("");
  const onClickSection = (job) => {
    setOpenedSetion(job);
  };
  if (openedSection === "police") {
  } else if (openedSection === "fire") {
  } else if (openedSection === "admin") {
  }

  // 클릭시 gnb background css 고정 className = "activeBg" 추가
  //  fixBackground === "직렬" 선택시 아이콘 color 변경 고정
  const [fixBackground, setFixBackground] = useState("");
  const [fixTextColor, setFixTextColor] = useState("");
  const onClickShowFix = (kategorie) => {
    setFixBackground(kategorie);
    setFixTextColor(kategorie);
  };
  if (fixBackground === "allmenu") {
  } else if (fixBackground === "policemenu") {
  } else if (fixBackground === "firemenu") {
  } else if (fixBackground === "adminmenu") {
  } else if (fixTextColor === "checklistmenu") {
  }

  // icon color hover
  const [hoveredIcon, sethoveredIcon] = useState("");
  const onMouseOver = (coloricon) => {
    sethoveredIcon(coloricon);
  };
  const onMouseOut = (coloricon) => {
    sethoveredIcon(!coloricon);
  };
  if (hoveredIcon === "allmenucolor") {
  } else if (hoveredIcon === "policemenucolor") {
  } else if (hoveredIcon === "firemenucolor") {
  } else if (hoveredIcon === "adminmenucolor") {
  } else if (hoveredIcon === "checklistmenucolor") {
  }

  // lnb menu click시 text color 변경
  const [clickTextColor, setClickTextColor] = useState("");
  const onClicklnb = (classtext) => {
    setClickTextColor(classtext);
  };
  if (clickTextColor === "Pclass0") {
  } else if (clickTextColor === "Pclass1") {
  } else if (clickTextColor === "Pclass2") {
  } else if (clickTextColor === "Pclass3") {
  } else if (clickTextColor === "Pclass5") {
  }
  if (clickTextColor === "Fclass0") {
  } else if (clickTextColor === "Fclass1") {
  } else if (clickTextColor === "Fclass2") {
  } else if (clickTextColor === "Fclass3") {
  }
  if (clickTextColor === "Aclass0") {
  } else if (clickTextColor === "Aclass1") {
  } else if (clickTextColor === "Aclass2") {
  } else if (clickTextColor === "Aclass3") {
  }
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
                  className={clsx("link allmenu", {
                    activeBg: fixBackground === "allmenu",
                  })}
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
                    className={clsx("navicon", {
                      allmenuicon: hoveredIcon === "allmenucolor",
                    })}
                  />
                  <span className="menutext">전체개요</span>
                </NavLink>
              </li>
              {/* 전체개요 끝 */}
              {/* 경찰직렬 메뉴 */}
              <li className="gnb">
                <NavigationPolicemenu
                  fixBackground={fixBackground}
                  onClickShowFix={onClickShowFix}
                  onClickSection={onClickSection}
                  onMouseOver={onMouseOver}
                  onMouseOut={onMouseOut}
                  hoveredIcon={hoveredIcon}
                  openedSection={openedSection}
                  onClicklnb={onClicklnb}
                  clickTextColor={clickTextColor}
                />
              </li>
              {/* 소방직렬 메뉴 */}
              <li className="gnb">
                <NavigationFiremenu
                  fixBackground={fixBackground}
                  onClickShowFix={onClickShowFix}
                  onClickSection={onClickSection}
                  onMouseOver={onMouseOver}
                  onMouseOut={onMouseOut}
                  hoveredIcon={hoveredIcon}
                  openedSection={openedSection}
                  onClicklnb={onClicklnb}
                  clickTextColor={clickTextColor}
                />
              </li>
              {/* 행정직렬 메뉴 */}
              <li className="gnb">
                <NavigationAdminmenu
                  fixBackground={fixBackground}
                  onClickShowFix={onClickShowFix}
                  onClickSection={onClickSection}
                  onMouseOver={onMouseOver}
                  onMouseOut={onMouseOut}
                  hoveredIcon={hoveredIcon}
                  openedSection={openedSection}
                  onClicklnb={onClicklnb}
                  clickTextColor={clickTextColor}
                />
              </li>
              <MidLine />
            </ul>
            {/* 일정관리 */}
            <div className="checklistContainer">
              <NavigationChecklist
                fixTextColor={fixTextColor}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                hoveredIcon={hoveredIcon}
              />
              <NavigationCalender />
            </div>
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
            p {
              position: relative;
              display: block;
              padding: 0 3px;
              width: 75%;
              height: 80px;
              line-height: 40px;
              text-align: center;
            }
          }
        }
        // 직렬 선택시 직렬 서브메뉴 '전체' font color 변경
        .clickde_text {
          color: #fff;
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
  }
`;

// 네비게이션 중앙 라인
const MidLine = styled.div`
  width: 220px;
  height: 1px;
  margin: 10px 47px 10px 18px;
  border-top: 1px solid #c4c4c4;
`;
