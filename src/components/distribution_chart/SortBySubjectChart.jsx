import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { getLastMonth } from '../../utils/getLastMonth'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { isDarkAtom } from '../../utils/atoms'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// LABEL
const labels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, '100 (점)']

const SortBySubjectChart = ({ subject, color }) => {
  const [data, setData] = useState([])
  const isDark = useRecoilValue(isDarkAtom)

  const { thisYear, lastMonth } = getLastMonth()
  const params = useParams()
  const SERIES = params.subject // 경찰, 소방, 행정
  const CLASS = params.number // 1, 2, ...

  // OPTION
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          padding: 10,
          usePointStyle: true,
          color: isDark ? '#fff' : '#545454',
          font: {
            size: 15,
            padding: 10,
          },
        },
      },
      // tooltop: {
      //   backgroundColor: '#5D5FEF',
      // },
    },
    scales: {
      xAxes: {
        ticks: {
          color: () => {
            return isDark ? '#fff' : '#545454'
          },
          font: {
            size: 20,
          },
        },
        scaleLabel: {
          display: true,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      yAxes: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: () => {
            return isDark ? '#fff' : '#545454'
          },
          font: {
            size: 20,
          },
        },
      },
    },
  }

  // useEffect(() => {
  //   ;(async () => {
  //     const response = await fetch(
  //       `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?${qs.stringify(
  //         {
  //           yyyy: thisYear,
  //           mm: lastMonth,
  //           subject: subject,
  //           ...(params.number ? { class: SERIES, classn: CLASS } : null),
  //         }
  //       )}`
  //     )
  //     const { result } = await response.json()
  //     console.log(result)
  //     setData(result)
  //   })()
  // }, [])
  useEffect(() => {
    ;(async () => {
      if (!params.number) {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=${subject}`
        )
        const { result } = await response.json()
        setData(result)
      } else {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=${subject}&class=${SERIES}&classn=${CLASS}`
        )
        const { result } = await response.json()
        setData(result)
      }
    })()
  }, [thisYear, lastMonth, CLASS, SERIES, params.number, subject])

  return (
    <Bar
      data={{
        labels,
        datasets: {
          label: subject,
          data: data.map((item) => item),
          borderColor: color,
          backgroundColor: color,
          pointBorderWidth: 4,
        },
      }}
      options={options}
    />
  )
}

export default SortBySubjectChart
