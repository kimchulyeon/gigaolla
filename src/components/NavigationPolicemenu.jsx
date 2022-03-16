import React from "react";
import { NavLink } from "react-router-dom";
import cx from "clsx";

import police from "../image/police_gray.svg";
import policeColor from "../image/police_color.svg";

function NavigationPolicemenu({
  fixBackground,
  onClickShowFix,
  navicon,
  onClickSection,
  onMouseOver,
  onMouseOut,
  hoveredIcon,
  openedSection,
  clickTextColor,
  onClicklnb,
}) {
  return (
    <>
      <NavLink
        to="/경찰"
        className={cx("link police", {
          activeBg: fixBackground === "policemenu",
        })}
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
            fixBackground === "policemenu" || hoveredIcon === "policemenucolor"
              ? policeColor
              : police
          }
          alt="menu"
          className={navicon}
        />
        <span className="policetext">경찰직</span>
      </NavLink>

      <div
        className={cx("lnbcontainer police", {
          hidden: openedSection !== "police",
        })}
      >
        <ul className="lnb">
          <li>
            <NavLink
              className={
                cx("link police", {
                  activeBg: fixBackground === "policemenu",
                })
                  ? "lnblink fontWhite"
                  : "lnblink"
              }
              to="/경찰"
            >
              <p
                className={cx("lnbtext", {
                  clickde_text: fixBackground === "policemenu",
                })}
                onClicklnb={() => {
                  onClicklnb("Pclass0");
                }}
              >
                전체
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="lnblink"
              to="/경찰/1"
              onClicklnb={() => {
                onClicklnb("Pclass1");
              }}
            >
              <p
                className={cx("lnbtext", {
                  clickde_text: clickTextColor === "Pclass1",
                })}
              >
                1반
              </p>
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
    </>
  );
}

export default NavigationPolicemenu;
