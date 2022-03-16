import React from "react";
import { NavLink } from "react-router-dom";
import cx from "clsx";

import fire from "../image/fire_gray.svg";
import fireColor from "../image/fire_color.svg";

function NavigationFiremenu({
  fixBackground,
  onClickShowFix,
  navicon,
  onClickSection,
  onMouseOver,
  onMouseOut,
  hoveredIcon,
  openedSection,
}) {
  return (
    <>
      <NavLink
        to="/소방"
        className={cx("link fire", {
          activeBg: fixBackground === "firemenu",
        })}
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
            fixBackground === "firemenu" || hoveredIcon === "firemenucolor"
              ? fireColor
              : fire
          }
          alt="menu"
          className={navicon}
        />
        <span className="firetext">소방직</span>
      </NavLink>

      <div
        className={cx("lnbcontainer fire", {
          hidden: openedSection !== "fire",
        })}
      >
        <ul className="lnb">
          <li>
            <NavLink
              className={
                cx("link fire", {
                  activeBg: fixBackground === "firemenu",
                })
                  ? "lnblink fontWhite"
                  : "lnblink "
              }
              to="/소방"
            >
              <p className="clickde_text">전체</p>
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
    </>
  );
}

export default NavigationFiremenu;
