import React, { useState } from "react";
import calendar from "../image/calendar.svg";
import styled from "styled-components";
// calender
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function NavigationCalendar({ navicon }) {
  // 일정관리 라이브러리
  const [startDate, setStartDate] = useState(new Date());

  return (
    <NavigationCalender>
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
    </NavigationCalender>
  );
}

const NavigationCalender = styled.div`
  .calendarcontiner {
    position: relative;
    display: block;
    top: 10px;
    left: 15px;
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
      left: 12px;
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
`;
