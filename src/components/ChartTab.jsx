import styled from "styled-components";
import DatePicker from "react-datepicker";
import reset from "../image/reset.svg";
import calendar from "../image/calendar.svg";
import { forwardRef } from "react";
import { ko } from "date-fns/esm/locale";

const ChartTab = ({
  setChartView,
  view,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const Tab = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 11px;
    button {
      cursor: pointer;
      padding: 10px 20px;
      margin-left: 10px;
      background: #f4f4f4;
      border-radius: 8px;
      border: none;
      &.active {
        background: #5d5fef;
        color: #fff;
      }
    }
    .reset {
      margin-right: 15px;
      margin-left: 0;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .calendarcontainer {
      position: relative;
      min-width: 165px;
      max-width: 215px;
      .datepicker-wrap {
        display: flex;
        background: #f4f4f4;
        padding: 11px 15px 10px 48px;
        box-sizing: border-box;
        border-radius: 8px;
        .custom-input {
          font-family: "Noto Sans";
          font-size: 14px;
          letter-spacing: -0.6px;
        }
      }
      img {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 17px;
        z-index: 1;
        width: 24px;
      }
    }
  `;
  const CustomInput = forwardRef(({ value, onClick }, ref) => {
    const compareValue = value.split("-").join(",");
    const lineValue = value.split("-").join("~");
    return (
      <div className="custom-input" onClick={onClick} ref={ref}>
        {view === "bar"
          ? value
          : view === "compareBar"
          ? compareValue
          : lineValue}
      </div>
    );
  });

  return (
    <Tab>
      <button className="reset" onClick={() => setChartView("bar")}>
        <img src={reset} alt="reset" />
      </button>
      <div className="calendarcontainer">
        <img src={calendar} alt="calendar" className="navicon" />
        <div className="datepicker-wrap">
          {view === "bar" ? (
            <DatePicker
              className="datepicker"
              selected={new Date()}
              dateFormat="yyyy년 MM월 dd일"
              disabled
              customInput={<CustomInput />}
              locale={ko}
            />
          ) : (
            <DatePicker
              className="datepicker"
              selected={startDate}
              onChange={(dates) => {
                const [start, end] = dates;
                setStartDate(start);
                setEndDate(end);
              }}
              startDate={startDate}
              endDate={endDate}
              minDate={new Date("2021/10")}
              maxDate={new Date()}
              dateFormat="yyyy년 MM월"
              showMonthYearPicker
              customInput={<CustomInput />}
              shouldCloseOnSelect={false}
              locale={ko}
              selectsRange
            />
          )}
        </div>
      </div>
      {/* 원하시는 함수 props 로 내려서 쓰시면 됩니다. */}
      <button
        className={view === "compareBar" ? "active" : ""}
        onClick={() => setChartView("compareBar")}
      >
        비교
      </button>
      <button
        className={view === "line" ? "active" : ""}
        onClick={() => setChartView("line")}
      >
        추이
      </button>
    </Tab>
  );
};

export default ChartTab;
