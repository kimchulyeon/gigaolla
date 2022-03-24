import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import qs from "qs";

const URL = "https://kimcodi.kr/external_api/dashboard/";
const TEST_Url = `${URL}numberOfTestedStudentsByMonth.php`;

ChartJS.register(LineElement);

// 이번 달, 이번 년도 구하기
let monthArr = [];
let label = [];

// 월 배열 구하기
const getMonth = () => {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;

  for (let i = 1; i <= 6; i++) {
    month = month < 10 ? `0${month}` : `${month}`;
    monthArr.unshift({ year, month });
    label.unshift(month);
    month--;
    if (month === 0) {
      month = 12;
      year = year - 1;
    }
  }
  return monthArr;
};
getMonth();

const HomeAttendChart3 = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  // OPTION
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          padding: 10,
          usePointStyle: true,
          font: {
            size: 15,
            padding: 10,
          },
        },
      },
      tooltop: {
        backgroundColor: "#5D5FEF",
      },
    },
    scales: {
      x: {
        scaleLabel: {
          display: true,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  };

  const [policeData, setPoliceData] = useState([]);
  const [fireData, setFireData] = useState([]);
  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
    (async () => {
      const subjectData = await Promise.all(
        monthArr.map(async (i) => {
          const res = await fetch(
            `${TEST_Url}?${qs.stringify({
              yyyy: i.year,
              mm: i.month,
            })}&class=경찰`
          );
          return Math.round((await res.json()).result[0].STUDENT_COUNT);
        })
      );
      setPoliceData(subjectData);
    })().catch(console.error);
  }, [monthArr]);

  useEffect(() => {
    (async () => {
      const subjectData = await Promise.all(
        monthArr.map(async (i) => {
          const res = await fetch(
            `${TEST_Url}?${qs.stringify({
              yyyy: i.year,
              mm: i.month,
            })}&class=소방`
          );
          return Math.round((await res.json()).result[0].STUDENT_COUNT);
        })
      );
      setFireData(subjectData);
    })().catch(console.error);
  }, [monthArr]);

  useEffect(() => {
    (async () => {
      const subjectData = await Promise.all(
        monthArr.map(async (i) => {
          const res = await fetch(
            `${TEST_Url}?${qs.stringify({
              yyyy: i.year,
              mm: i.month,
            })}&class=행정`
          );
          return Math.round((await res.json()).result[0].STUDENT_COUNT);
        })
      );
      setAdminData(subjectData);
    })().catch(console.error);
  }, [monthArr]);

  const chartData = {
    labels: label,
    datasets: [
      {
        label: "경찰직",
        data: policeData,
        borderColor: "#21468d",
        backgroundColor: "#21468d",
        pointBorderWidth: 4,
      },
      {
        label: "소방직",
        data: fireData,
        borderColor: "#fd4f3a",
        backgroundColor: "#fd4f3a",
        pointBorderWidth: 4,
      },
      {
        label: "행정직",
        data: adminData,
        borderColor: "#257e0e",
        backgroundColor: "#257e0e",
        pointBorderWidth: 4,
      },
    ],
  };
  return <Line data={chartData} options={options} />;
};
export default HomeAttendChart3;
