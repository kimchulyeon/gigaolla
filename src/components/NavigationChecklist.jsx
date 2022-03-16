import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import checklist from "../image/checklist_gray.svg";
import checklistColor from "../image/checklist_white.svg";

function Checklist({ fixTextColor, onMouseOver, onMouseOut, hoveredIcon }) {
  return (
    <NavLink
      to="/"
      className="link"
      onClick={clsx("link checklist", {
        listtextcolor: fixTextColor === "checklistmenu",
      })} // <NavigationCalendar navicon={navicon} />
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
        className={clsx("navicon", {
          checklisticon: hoveredIcon === "checklistmenucolor",
        })}
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
  );
}

export default Checklist;
