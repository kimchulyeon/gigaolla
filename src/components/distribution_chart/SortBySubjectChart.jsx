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
import { qs } from 'qs'
import { getLastMonth } from '../../utils/getLastMonth'
import { useParams } from 'react-router-dom'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

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
        font: {
          size: 15,
          padding: 10,
        },
      },
    },
    tooltop: {
      backgroundColor: '#5D5FEF',
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
}

// LABEL
const labels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, '100 (점)']

const SortBySubjectChart = ({ subject }) => {
  const [data, setData] = useState([])

  const { thisYear, lastMonth } = getLastMonth()
  const params = useParams()
  const SERIES = params.subject // 경찰, 소방, 행정
  const CLASS = params.number // 1, 2, ...

  useEffect(() => {
    ;(async () => {
      const response = await fetch(
        `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?${qs.stringify(
          {
            yyyy: thisYear,
            mm: lastMonth,
            subject: subject,
            ...(params.number ? { class: SERIES, classn: CLASS } : null),
          }
        )}`
      )
      const { result } = await response.json()
      setData(result)
    })()
  }, [])

  return (
    <Bar
      data={{
        labels,
        datasets: {
          label: subject,
          data: data.map((item) => item.COUNT),
          borderColor: '#FBA869',
          backgroundColor: '#FBA869',
          pointBorderWidth: 4,
        },
      }}
      options={options}
    />
  )
}

export default SortBySubjectChart
