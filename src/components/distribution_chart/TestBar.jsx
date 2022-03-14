import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'
import { getLastMonth } from '../../utils/getLastMonth'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// LABEL
const labels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, '100  (점)']

const { thisYear, lastMonth } = getLastMonth()

// 컴포.
const TestBar = ({ Name, color }) => {
  const { subject, number } = useParams()
  const [subjectData, setSubjectData] = useState([])

  // FETCT
  useEffect(() => {
    ;(async () => {
      if (!number) {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=${Name}`
        )
        const { result } = await response.json()
        setSubjectData(result)
      } else {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=${Name}&class=${subject}&classn=${number}`
        )
        const { result } = await response.json()
        setSubjectData(result)
      }
    })()
  }, [Name, number, subject])

  // 그래프 데이터
  const data = {
    labels,
    datasets: [
      {
        label: Name,
        data: subjectData.map((item) => item.COUNT),
        backgroundColor: color,
      },
    ],
  }
  // 그래프 옵션
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        usePointStyle: false,
        backgroundColor: '#5D5FEF',
        xAlign: 'center',
        yAlign: 'bottom',
        padding: {
          top: 9,
          bottom: 9,
          left: 15,
          right: 15,
        },
        callbacks: {
          label: (item) => {
            const score = item.parsed.y + '명'
            return score
          },
        },
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
        ticks: {
          display: false,
        },
      },
    },
    barPercentage: 0.7,
  }

  return <Bar options={options} data={data} />
}

export default TestBar
