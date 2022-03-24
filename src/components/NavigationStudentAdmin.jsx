import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import studentAdminlist from "../image/studentAdminlist_gray.svg";
import studentAdminlistColor from "../image/studentAdminlist_white.svg";

function NavigationStudentAdmin({
  fixTextColor,
  onMouseOver,
  onMouseOut,
  hoveredIcon,
}) {
  return (
    <NavLink
      to="/경찰/students"
      className="link"
      onClick={clsx("link studentAdminlist", {
        studentAdminmenu: fixTextColor === "studentAdminmenu",
      })} // <NavigationCalendar navicon={navicon} />
      onMouseOver={() => onMouseOver("studentAdminmenucolor")}
      onMouseOut={() => onMouseOut("studentAdminmenucolor")}
    >
      <img
        src={
          fixTextColor === "studentAdminmenu" ||
          hoveredIcon === "studentAdminmenucolor"
            ? studentAdminlistColor
            : studentAdminlist
        }
        alt="studentAdminlist"
        className={clsx("navicon", {
          studentAdminlisticon: hoveredIcon === "studentAdminmenucolor",
        })}
      />
      <span
        className={
          fixTextColor === "studentAdminmenu"
            ? "studentAdminlistText white"
            : "studentAdminlistText"
        }
      >
        학생관리
      </span>
    </NavLink>
  );
}

export default NavigationStudentAdmin;
