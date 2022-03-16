import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import admin from "../image/admin_gray.svg";
import adminColor from "../image/admin_color.svg";

function NavigationAdminmenu({
  fixBackground,
  onClickShowFix,
  onClickSection,
  onMouseOver,
  onMouseOut,
  hoveredIcon,
  openedSection,
  onClicklnb,
  clickTextColor,
}) {
  return (
    <>
      <NavLink
        to="/행정"
        className={clsx("link admin", {
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
          className={clsx("navicon", {
            adminicon: hoveredIcon === "adminmenucolor",
          })}
        />
        <span className="admintext">행정직</span>
      </NavLink>

      <div
        className={clsx("lnbcontainer admin", {
          hidden: openedSection !== "admin",
        })}
      >
        <ul className="lnb">
          <li>
            <NavLink
              className={
                clsx("link admin", {
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
            <NavLink
              className="lnblink"
              to="/행정/1"
              onClick={() => {
                onClicklnb("Aclass1");
              }}
            >
              <p
                className={clsx("lnbtext", {
                  clickde_text: clickTextColor === "Aclass1",
                })}
              >
                1반
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="lnblink"
              to="/행정/2"
              onClick={() => {
                onClicklnb("Aclass2");
              }}
            >
              <p
                className={clsx("lnbtext", {
                  clickde_text: clickTextColor === "Aclass2",
                })}
              >
                2반
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="lnblink"
              to="/행정/3"
              onClick={() => {
                onClicklnb("Aclass3");
              }}
            >
              <p
                className={clsx("lnbtext", {
                  clickde_text: clickTextColor === "Aclass3",
                })}
              >
                3반
              </p>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
export default NavigationAdminmenu;
