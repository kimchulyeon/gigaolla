import React, { useEffect, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import axios from "axios";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../utils/atoms";

const Cont = styled.div`
  width: 90%;
  height: 23em;
  margin: 3em auto;
  canvas {
    max-height: 100% !important;
  }
`;

const AttendChart = ({
  chartView,
  startDate,
  endDate,
  compareStartDate,
  compareEndDate,
  setCompareAttendPercent,
}) => {
  const [totalStudentArr, setTotalStudentArr] = useState([]);
  const [testedStudentArr, setTestedStudentArr] = useState([]);
  const [labels, setLabels] = useState([]);
  const [barPercentage, setBarPercentage] = useState(0.5);
  const { subject, number } = useParams();
  const isDark = useRecoilValue(isDarkAtom);

  const getProgressYearMonth = () => {
    const total_months =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());
    let year = endDate.getFullYear();
    let month = endDate.getMonth() + 1;
    let YearMonth = [];
    for (let i = 0; i <= total_months; i++) {
      YearMonth.unshift({ year, month });
      month--;
      if (month === 0) {
        month = 12;
        year = year - 1;
      }
    }
    return { YearMonth };
  };

  const getCompareYearMonth = () => {
    const YearMonth = [
      {
        year: compareStartDate.getFullYear(),
        month: compareStartDate.getMonth() + 1,
      },
      {
        year: compareEndDate.getFullYear(),
        month: compareEndDate.getMonth() + 1,
      },
    ];
    return { YearMonth };
  };

  const getYearMonth = () => {
    const date = new Date();
    const nowYear = date.getFullYear();
    const nowMonth = date.getMonth() + 1;
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let YearMonth = [];
    for (let i = 1; i <= 6; i++) {
      YearMonth.unshift({ year, month });
      month--;
      if (month === 0) {
        month = 12;
        year = year - 1;
      }
    }
    return { nowYear, nowMonth, YearMonth };
  };

  const getStudentData = async (
    subject,
    number,
    year = getYearMonth().nowYear,
    month = getYearMonth().nowMonth
  ) => {
    month = month < 10 ? `0${month}` : month;

    const BASE_URL = "https://kimcodi.kr/external_api/dashboard/";
    const SUC_CODE = "001";

    const totalUrl =
      number === undefined
        ? `${BASE_URL}numberOfTotalStudentsByMonth.php?yyyy=${year}&mm=${month}&class=${subject}`
        : `${BASE_URL}numberOfTotalStudentsByMonth.php?yyyy=${year}&mm=${month}&class=${subject}&classn=${number}`;
    const testedUrl =
      number === undefined
        ? `${BASE_URL}numberOfTestedStudentsByMonth.php?yyyy=${year}&mm=${month}&class=${subject}`
        : `${BASE_URL}numberOfTestedStudentsByMonth.php?yyyy=${year}&mm=${month}&class=${subject}&classn=${number}`;

    let totalStudent = await axios.get(totalUrl);
    totalStudent =
      totalStudent.data.code === SUC_CODE
        ? totalStudent.data.result[0].STUDENT_COUNT
        : 0;

    let testedStudent = await axios.get(testedUrl);
    testedStudent =
      testedStudent.data.code === SUC_CODE
        ? testedStudent.data.result[0].STUDENT_COUNT
        : 0;

    // 응시율
    let attendPercent = await ((testedStudent / totalStudent) * 100).toFixed(1);

    return { totalStudent, testedStudent, attendPercent };
  };

  const fetchData = async () => {
    const { YearMonth } =
      chartView !== "compareBar" ? getYearMonth() : getCompareYearMonth();

    const {
      totalStudentData,
      testedStudentData,
      attendPercentData,
      chartLabelData,
    } = await YearMonth.reduce(
      async (_acc, cur) => {
        const { totalStudent, testedStudent, attendPercent } =
          await getStudentData(subject, number, cur.year, cur.month);
        const acc = await _acc;
        const monthLabel = cur.month < 10 ? `0${cur.month}` : cur.month;
        const attendPercentLabel = attendPercent + "%";
        acc["totalStudentData"].push(totalStudent);
        acc["testedStudentData"].push(testedStudent);
        acc["attendPercentData"].push(attendPercent);
        acc["chartLabelData"].push([monthLabel, attendPercentLabel]);
        return acc;
      },
      {
        totalStudentData: [],
        testedStudentData: [],
        attendPercentData: [],
        chartLabelData: [],
      }
    );
    const arrIndex = attendPercentData.length;
    let compareAttend =
      attendPercentData[arrIndex - 1] - attendPercentData[arrIndex - 2];
    compareAttend = compareAttend >= 0 ? `+ ${compareAttend}` : compareAttend;
    setCompareAttendPercent(compareAttend);
    setTotalStudentArr(totalStudentData);
    setTestedStudentArr(testedStudentData);
    setLabels(chartLabelData);
    setBarPercentage(chartView === "compareBar" ? 0.2 : 0.5);
    return;
  };

  useEffect(() => {
    const fetchData = async () => {
      const { YearMonth } =
        chartView === "bar"
          ? getYearMonth()
          : chartView === "compareBar"
          ? getCompareYearMonth()
          : getProgressYearMonth();

      const {
        totalStudentData,
        testedStudentData,
        attendPercentData,
        chartLabelData,
      } = await YearMonth.reduce(
        async (_acc, cur) => {
          const { totalStudent, testedStudent, attendPercent } =
            await getStudentData(subject, number, cur.year, cur.month);
          const acc = await _acc;
          const month = cur.month < 10 ? `0${cur.month}` : cur.month;
          const dateLabel = `${cur.year}.${month}`;
          const attendPercentLabel = attendPercent + "%";
          acc["totalStudentData"].push(totalStudent);
          acc["testedStudentData"].push(testedStudent);
          acc["attendPercentData"].push(attendPercent);
          acc["chartLabelData"].push([dateLabel, attendPercentLabel]);
          return acc;
        },
        {
          totalStudentData: [],
          testedStudentData: [],
          attendPercentData: [],
          chartLabelData: [],
        }
      );
      const arrIndex = attendPercentData.length;
      let compareAttend =
        attendPercentData[arrIndex - 1] - attendPercentData[arrIndex - 2];
      compareAttend = compareAttend.toFixed(1);
      compareAttend = compareAttend >= 0 ? `+ ${compareAttend}` : compareAttend;
      unstable_batchedUpdates(() => {
        setCompareAttendPercent(compareAttend);
        setTotalStudentArr(totalStudentData);
        setTestedStudentArr(testedStudentData);
        setLabels(chartLabelData);
        setBarPercentage(chartView === "compareBar" ? 0.2 : 0.5);
      });
      return;
    };
    fetchData();
  }, [
    subject,
    number,
    chartView,
    startDate,
    endDate,
    compareStartDate,
    compareEndDate,
  ]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  );

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        align: "end",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          color: () => {
            return isDark ? "#fff" : "#121212";
          },
          font: {
            size: 20,
          },
        },
      },
      tooltip: {
        backgroundColor: "#5D5FEF",
        xAlign: "center",
        yAlign: "bottom",
        padding: {
          top: 9,
          bottom: 9,
          left: 15,
          right: 15,
        },
        callbacks: {
          title: (context) => {
            let title = "";
            title = context.formattedValue;
            return title;
          },
        },
      },
    },
    layout: {
      padding: {
        top: 30,
      },
    },
    scales: {
      xAxes: {
        ticks: {
          color: () => {
            return isDark ? "#fff" : "#545454";
          },
          font: {
            size: 20,
            lineHeight: 2.2,
          },
        },
        grid: {
          display: false,
        },
      },
      yAxes: {
        grid: {
          borderDash: [10],
          borderColor: "#C7C7C7",
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "재학생",
        barPercentage: barPercentage,
        categoryPercentage: 0.5,
        data: totalStudentArr,
        backgroundColor: "#8898AA",
        borderColor: "#8898AA",
      },
      {
        label: "응시생",
        barPercentage: barPercentage,
        categoryPercentage: 0.5,
        data: testedStudentArr,
        backgroundColor: "#5D5FEF",
        borderColor: "#5D5FEF",
      },
    ],
  };

  return (
    <Cont>
      {chartView !== "line" ? (
        <Bar options={barOptions} data={chartData} />
      ) : (
        <Line options={barOptions} data={chartData} />
      )}
    </Cont>
  );
};

export default AttendChart;
