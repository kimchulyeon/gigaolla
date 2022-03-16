import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AttendChart from "./AttendChart";
import CardTemplate from "./CardTemplate";
import ChartTab from "./ChartTab";

// 응시율 Wrap
const Cont = styled.div`
  width: 100%;
`;

const AttendChartWrap = () => {
  let date = new Date();
  date.setMonth(date.getMonth() - 5);
  const [chartView, setChartView] = useState("bar");
  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());
  const [compareStartDate, setCompareStartDate] = useState(new Date());
  const [compareEndDate, setCompareEndDate] = useState(new Date());
  const [compareAttendPercent, setCompareAttendPercent] = useState(0);
  const [info, setInfo] = useState(" 전달 대비 이번달 응시율");

  useEffect(() => {
    if (!compareStartDate || !compareEndDate) return;
    let startYear = compareStartDate.getFullYear().toString().substr(2);
    let startMonth = compareStartDate.getMonth() + 1;
    startMonth = startMonth < 10 ? `0${startMonth}` : startMonth;
    let endYear = compareEndDate.getFullYear().toString().substr(2);
    let endMonth = compareEndDate.getMonth() + 1;
    endMonth = endMonth < 10 ? `0${endMonth}` : endMonth;

    setInfo(
      chartView === "compareBar"
        ? ` ${startYear}.${startMonth} 대비 ${endYear}.${endMonth} 응시율`
        : " 전달 대비 이번달 응시율"
    );
  }, [chartView, compareStartDate, compareEndDate]);

  // Element 대신 Chart를 넣어주시면 됩니다. MaxScore 참조
  return (
    <Cont>
      <ChartTab
        setChartView={setChartView}
        view={chartView}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        maxDate={maxDate}
        setMaxDate={setMaxDate}
        compareStartDate={compareStartDate}
        setCompareStartDate={setCompareStartDate}
        compareEndDate={compareEndDate}
        setCompareEndDate={setCompareEndDate}
      />
      {/* 카드 테두리 Components */}
      <CardTemplate
        Element={AttendChart}
        Name={"응시율"}
        Count={compareAttendPercent + "%"}
        Info={info}
        chartView={chartView}
        startDate={startDate}
        endDate={endDate}
        compareStartDate={compareStartDate}
        compareEndDate={compareEndDate}
        setCompareAttendPercent={setCompareAttendPercent}
      />
    </Cont>
  );
};

export default AttendChartWrap;
