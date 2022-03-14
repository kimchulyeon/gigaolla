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
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'
import { getLastMonth } from '../../utils/getLastMonth'

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

//컴포..
const DistributionChart = () => {
  const params = useParams()

  const SERIES = params.subject
  const CLASS = params.number

  const { thisYear, lastMonth } = getLastMonth()

  const [adminSubjectData, setAdminSubjectData] = useState([])
  const [adminLawSubjectData, setAdminLawSubjectData] = useState([])
  const [koreanSubjectData, setKoreanSubjectData] = useState([])
  const [historySubjectData, setHistorySubjectData] = useState([])
  const [engSubjectData, setEngSubjectData] = useState([])
  useEffect(() => {
    ;(async () => {
      if (!params.number) {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=행정학`
        )
        const { result } = await response.json()
        setAdminSubjectData(result)
      } else {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=행정학&class=${SERIES}&classn=${CLASS}`
        )
        const { result } = await response.json()
        setAdminSubjectData(result)
      }
    })()
  }, [thisYear, lastMonth, CLASS, SERIES, params.number])

  useEffect(() => {
    ;(async () => {
      if (!params.number) {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=행정법`
        )
        const { result } = await response.json()
        setAdminLawSubjectData(result)
      } else {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=행정법&class=${SERIES}&classn=${CLASS}`
        )
        const { result } = await response.json()
        setAdminLawSubjectData(result)
      }
    })()
  }, [thisYear, lastMonth, CLASS, SERIES, params.number])

  useEffect(() => {
    ;(async () => {
      if (!params.number) {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=국어`
        )
        const { result } = await response.json()
        setKoreanSubjectData(result)
      } else {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=국어&class=${SERIES}&classn=${CLASS}`
        )
        const { result } = await response.json()
        setKoreanSubjectData(result)
      }
    })()
  }, [thisYear, lastMonth, CLASS, SERIES, params.number])

  useEffect(() => {
    ;(async () => {
      if (!params.number) {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=한국사`
        )
        const { result } = await response.json()
        setHistorySubjectData(result)
      } else {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=한국사&class=${SERIES}&classn=${CLASS}`
        )
        const { result } = await response.json()
        setHistorySubjectData(result)
      }
    })()
  }, [thisYear, lastMonth, CLASS, SERIES, params.number])

  useEffect(() => {
    ;(async () => {
      if (!params.number) {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=영어`
        )
        const { result } = await response.json()
        setEngSubjectData(result)
      } else {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=영어&class=${SERIES}&classn=${CLASS}`
        )
        const { result } = await response.json()
        setEngSubjectData(result)
      }
    })()
  }, [thisYear, lastMonth, CLASS, SERIES, params.number])

  //리턴..
  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: '행정학',
            data: adminSubjectData.map((item) => item.COUNT),
            borderColor: '#FBA869',
            backgroundColor: '#FBA869',
            pointBorderWidth: 4,
          },
          {
            label: '행정법',
            data: adminLawSubjectData.map((item) => item.COUNT),
            borderColor: '#42C366',
            backgroundColor: '#42C366',
            pointBorderWidth: 4,
          },
          {
            label: '국어',
            data: koreanSubjectData.map((item) => item.COUNT),
            borderColor: '#70A6E8',
            backgroundColor: '#70A6E8',
            pointBorderWidth: 4,
          },
          {
            label: '한국사',
            data: historySubjectData.map((item) => item.COUNT),
            borderColor: '#FFDB5C',
            backgroundColor: '#FFDB5C',
            pointBorderWidth: 4,
          },
          {
            label: '영어',
            data: engSubjectData.map((item) => item.COUNT),
            borderColor: '#A293FF',
            backgroundColor: '#A293FF',
            pointBorderWidth: 4,
          },
        ],
      }}
      options={options}
    />
  )
}

export default DistributionChart
