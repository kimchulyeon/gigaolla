import React from "react";
import { NavLink } from "react-router-dom";
import cx from "clsx";

import checklist from "../image/checklist_gray.svg";
import checklistColor from "../image/checklist_white.svg";

function Checklist({
  fixTextColor,
  onMouseOver,
  onMouseOut,
  hoveredIcon,
  navicon,
}) {
  return (
    <NavLink
      to="/"
      className="link"
      onClick={cx("link checklist", {
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
  );
}

export default Checklist;
