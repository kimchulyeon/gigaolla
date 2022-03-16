import React from "react";
import { NavLink } from "react-router-dom";
import cx from "clsx";

import admin from "../image/admin_gray.svg";
import adminColor from "../image/admin_color.svg";

function NavigationAdminmenu({
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
        to="/행정"
        className={cx("link admin", {
          activeBg: fixBackground === "adminmenu",
        })}
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
            fixBackground === "adminmenu" || hoveredIcon === "adminmenucolor"
              ? adminColor
              : admin
          }
          alt="menu"
          className={navicon}
        />
        <span className="admintext">행정직</span>
      </NavLink>

      <div
        className={cx("lnbcontainer admin", {
          hidden: openedSection !== "admin",
        })}
      >
        <ul className="lnb">
          <li>
            <NavLink
              className={
                cx("link admin", {
                  activeBg: fixBackground === "adminmenu",
                })
                  ? "lnblink fontWhite"
                  : "lnblink "
              }
              to="/행정"
            >
              <p className="clickde_text">전체</p>
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
    </>
  );
}
export default NavigationAdminmenu;
