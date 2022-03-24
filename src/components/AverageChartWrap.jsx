import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CardTemplate from "./CardTemplate";
import AverageChart from "./AverageChart";
import AverageChart2 from "./AverageChart2";
import ChartTab from "./ChartTab";
import Button2 from "./Button";

// 평균점수 Wrap
const Cont = styled.div`
  width: 100%;
  position: relative;
`;

const subjects = {
  경찰: ["경찰학", "형사법", "헌법"],
  행정: ["행정학", "국어", "한국사", "행정법", "영어"],
  소방: ["소방학개론", "소방한국사", "소방영어", "소방관계법규", "소방행정법"],
};

const AverageChartWrap = () => {
  const params = useParams();
  const SUBJECT = params.subject;
  const subject = subjects[SUBJECT];

  let date = new Date();
  date.setMonth(date.getMonth() - 5);
  const [filterSubject, setFilterSubject] = useState(subject[0]);
  const [chartView, setChartView] = useState("bar");
  const [startDate, setStartDate] = useState(date); // 10월
  const [endDate, setEndDate] = useState(new Date()); // 3월
  const [maxDate, setMaxDate] = useState(new Date()); // 최대로 필터 가능한 날짜
  const [compareStartDate, setCompareStartDate] = useState(new Date()); // 일단 현재 날짜
  const [compareEndDate, setCompareEndDate] = useState(new Date()); // 일단 현재 날짜
  const [info, setInfo] = useState(" 전달 대비 응시율");
  const [filterClass, setFilterClass] = useState(subject[0]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!compareStartDate || !compareEndDate) return;
    let startYear = compareStartDate.getFullYear().toString().substr(2); // 달력 선택 년도 2자리(처음)
    let startMonth = compareStartDate.getMonth() + 1; // 달력 선택 월 2자리(처음)
    startMonth = startMonth < 10 ? `0${startMonth}` : startMonth;
    let endYear = compareEndDate.getFullYear().toString().substr(2); // 달력 선택 년도 2자리(끝)
    let endMonth = compareEndDate.getMonth() + 1; // 달력 선택 월 2자리(끝)
    endMonth = endMonth < 10 ? `0${endMonth}` : endMonth;

    setInfo(
      chartView === "compareBar"
        ? ` ${startYear}.${startMonth} 대비 ${endYear}.${endMonth} 평균 총점`
        : " 전달 대비 평균 총점"
    );
  }, [chartView, compareStartDate, compareEndDate]);

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
      {chartView !== "line" ? (
        <CardTemplate
          Element={AverageChart}
          startDate={startDate}
          endDate={endDate}
          compareStartDate={compareStartDate}
          compareEndDate={compareEndDate}
          total={total}
          setTotal={setTotal}
          Name={"평균비교"}
          Count={total + "점"}
          Info={info}
        ></CardTemplate>
      ) : (
        <>
          <Button2
            filterSubject={filterSubject}
            setFilterSubject={setFilterSubject}
            filterClass={filterClass}
            setFilterClass={setFilterClass}
          />
          <CardTemplate
            Element={AverageChart2}
            filterSubject={filterSubject}
            startDate={startDate}
            endDate={endDate}
            compareStartDate={compareStartDate}
            compareEndDate={compareEndDate}
            filterClass={filterClass}
            setFilterClass={setFilterClass}
            Name={"평균추이"}
            Count={total + "점"}
            Info={info}
          ></CardTemplate>
        </>
      )}
    </Cont>
  );
};

export default AverageChartWrap;
