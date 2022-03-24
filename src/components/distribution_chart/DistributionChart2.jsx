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
import { useRecoilValue } from 'recoil'
import { isDarkAtom } from '../../utils/atoms'
import { getLastMonth } from '../../utils/getLastMonth'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// LABEL
const labels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, '100  (점)']

//컴포..
const DistributionChart = () => {
  const isDark = useRecoilValue(isDarkAtom)
  const params = useParams()

  const SERIES = params.subject
  const CLASS = params.number

  const { thisYear, lastMonth } = getLastMonth()
  console.log(SERIES, CLASS)

  const [fireSubjectData, setFireSubjectData] = useState([])
  const [fireAdminSubjectData, setFireAdminSubjectData] = useState([])
  const [fireLawSubjectData, setFireLawSubjectData] = useState([])
  const [fireEngSubjectData, setFireEngSubjectData] = useState([])
  const [fireHistorySubjectData, setFireHistorySubjectData] = useState([])

  useEffect(() => {
    ;(async () => {
      if (!params.number) {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=소방학개론`
        )
        const { result } = await response.json()
        setFireSubjectData(result)
      } else {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=소방학개론&class=${SERIES}&classn=${CLASS}`
        )
        const { result } = await response.json()
        setFireSubjectData(result)
      }
    })()
  }, [thisYear, lastMonth, CLASS, SERIES, params.number])

  useEffect(() => {
    ;(async () => {
      if (!params.number) {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=소방행정법`
        )
        const { result } = await response.json()
        setFireAdminSubjectData(result)
      } else {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=소방행정법&class=${SERIES}&classn=${CLASS}`
        )
        const { result } = await response.json()
        setFireAdminSubjectData(result)
      }
    })()
  }, [thisYear, lastMonth, CLASS, SERIES, params.number])

  useEffect(() => {
    ;(async () => {
      if (!params.number) {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=소방관계법규`
        )
        const { result } = await response.json()
        setFireLawSubjectData(result)
      } else {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=소방관계법규&class=${SERIES}&classn=${CLASS}`
        )
        const { result } = await response.json()
        setFireLawSubjectData(result)
      }
    })()
  }, [thisYear, lastMonth, CLASS, SERIES, params.number])

  useEffect(() => {
    ;(async () => {
      if (!params.number) {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=소방영어`
        )
        const { result } = await response.json()
        setFireEngSubjectData(result)
      } else {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=소방영어&class=${SERIES}&classn=${CLASS}`
        )
        const { result } = await response.json()
        setFireEngSubjectData(result)
      }
    })()
  }, [thisYear, lastMonth, CLASS, SERIES, params.number])

  useEffect(() => {
    ;(async () => {
      if (!params.number) {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=소방한국사`
        )
        const { result } = await response.json()
        setFireHistorySubjectData(result)
      } else {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=소방한국사&class=${SERIES}&classn=${CLASS}`
        )
        const { result } = await response.json()
        setFireHistorySubjectData(result)
      }
    })()
  }, [thisYear, lastMonth, CLASS, SERIES, params.number])

  // OPTION
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          padding: 15,
          usePointStyle: true,
          color: isDark ? '#fff' : '#95a5a6',
          font: {
            size: 20,
            padding: 10,
            // color: 'red',
          },
        },
      },
      tooltop: {
        backgroundColor: '#5D5FEF',
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDark ? '#fff' : '#95a5a6',
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
      y: {
        ticks: {
          color: isDark ? '#fff' : '#95a5a6',
          font: {
            size: 20,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  }

  //리턴..
  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: '소방학개론',
            data: fireSubjectData.map((item) => item.COUNT),
            borderColor: '#FBA869',
            backgroundColor: '#FBA869',
            pointBorderWidth: 4,
          },
          {
            label: '소방행정법',
            data: fireAdminSubjectData.map((item) => item.COUNT),
            borderColor: '#42C366',
            backgroundColor: '#42C366',
            pointBorderWidth: 4,
          },
          {
            label: '소방관계법규',
            data: fireLawSubjectData.map((item) => item.COUNT),
            borderColor: '#70A6E8',
            backgroundColor: '#70A6E8',
            pointBorderWidth: 4,
          },
          {
            label: '소방영어',
            data: fireEngSubjectData.map((item) => item.COUNT),
            borderColor: '#FFDB5C',
            backgroundColor: '#FFDB5C',
            pointBorderWidth: 4,
          },
          {
            label: '소방한국사',
            data: fireHistorySubjectData.map((item) => item.COUNT),
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
