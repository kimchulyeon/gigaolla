import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AttendChart from "./AttendChart";
import CardTemplate from "./CardTemplate";
import ChartTab from "./ChartTab";

const AttendChartWrap = () => {
  const [chartView, setChartView] = useState("bar");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [compareAttendPercent, setCompareAttendPercent] = useState(0);
  const [info, setInfo] = useState(" 전달 대비 응시율");

  useEffect(() => {
    let startYear = startDate.getFullYear().toString().substr(2);
    let startMonth = startDate.getMonth() + 1;
    startMonth = startMonth < 10 ? `0${startMonth}` : startMonth;
    let endYear = endDate.getFullYear().toString().substr(2);
    let endMonth = endDate.getMonth() + 1;
    endMonth = endMonth < 10 ? `0${endMonth}` : endMonth;

    setInfo(
      chartView === "compareBar"
        ? ` ${startYear}.${startMonth} 대비 ${endYear}.${endMonth} 응시율`
        : " 전달 대비 응시율"
    );
  }, [chartView, startDate, endDate]);
  // 응시율 Wrap
  const Cont = styled.div`
    width: 100%;
  `;
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
        setCompareAttendPercent={setCompareAttendPercent}
      />
    </Cont>
  );
};

export default AttendChartWrap;
