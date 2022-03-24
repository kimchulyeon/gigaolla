import { red } from '@mui/material/colors'
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

// var qs = require('qs')

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// LABEL
const labels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, '100 (점)']
// const SUBJECTS_MAP = {
//   // 각 과별로 가지고 있는 과목의 종류를 보관하는 전역 변수입니다.
//   경찰: ['경찰학', '형사법', '헌법'],
//   소방: ['소방학개론', '소방행정법', '소방관계법규', '소방영어', '소방한국사'],
//   행정: ['행정학', '행정법', '국어', '한국사', '영어'],
// }

//컴포..
const DistributionChart = ({ distributionTotal }) => {
  const params = useParams()
  const isDark = useRecoilValue(isDarkAtom)

  const SERIES = params.subject // 경찰, 소방, 행정
  const CLASS = params.number // 1, 2, ...
  // const subjects = SUBJECTS_MAP[SERIES] // 해당하는 과의 과목 목록을 가져옵니다. SERIES = 경찰
  // const COLOR = ['#FBA869', '#42C366', '#70A6E8', '#FFDB5C', '#A293FF']

  const { thisYear, lastMonth } = getLastMonth()
  console.log(typeof lastMonth)
  const [policeSubjectData, setPoliceSubjectData] = useState([])
  const [criminalSubjectData, setCriminalSubjectData] = useState([])
  const [lawSubjectData, setLawSubjectData] = useState([])

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
  // const [data, setData] = useState([])

  // useEffect(() => {
  //   ;(async () => {
  //     const dataset = []
  //     await Promise.all(
  //       // Async function 여러 개 실행
  //       subjects.map(async (i) => {
  //         // 과목 정보마다 루프를 돕니다.
  //         const response = await fetch(
  //           `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?${qs.stringify(
  //             {
  //               yyyy: thisYear,
  //               mm: lastMonth,
  //               subject: i, // 각 과목
  //               class: SERIES,
  //               ...(params.number ? { classn: CLASS } : null),
  //             }
  //           )}`
  //         )
  //         const { result } = await response.json()
  //         dataset.push(result)
  //       })
  //     )
  //     setData(dataset)
  //   })().catch(console.error)
  // }, [])
  // console.log(data)

  useEffect(() => {
    ;(async () => {
      if (!params.number) {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=경찰학`
        )
        const { result } = await response.json()
        setPoliceSubjectData(result)
      } else {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=경찰학&class=${SERIES}&classn=${CLASS}`
        )
        const { result } = await response.json()
        setPoliceSubjectData(result)
      }
    })()
  }, [thisYear, lastMonth, CLASS, SERIES, params.number])

  useEffect(() => {
    ;(async () => {
      if (!params.number) {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=형사법`
        )
        const { result } = await response.json()
        setCriminalSubjectData(result)
      } else {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=형사법&class=${SERIES}&classn=${CLASS}`
        )
        const { result } = await response.json()
        setCriminalSubjectData(result)
      }
    })()
  }, [thisYear, lastMonth, CLASS, SERIES, params.number])

  useEffect(() => {
    ;(async () => {
      if (!params.number) {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=헌법`
        )
        const { result } = await response.json()
        setLawSubjectData(result)
      } else {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&subject=헌법&class=${SERIES}&classn=${CLASS}`
        )
        const { result } = await response.json()
        setLawSubjectData(result)
      }
    })()
  }, [thisYear, lastMonth, CLASS, SERIES, params.number])

  // useEffect(() => {
  //   ;(async () => {
  //     const response = await fetch(
  //       `https://kimcodi.kr/external_api/dashboard/distributionOfStudentScoreByMonth.php?${qs.stringify(
  //         {
  //           yyyy: thisYear,
  //           mm: lastMonth,
  //           subject: '헌법',
  //           ...(params.number ? { class: SERIES, classn: CLASS } : null),
  //         }
  //       )}`
  //     )
  //     const { result } = await response.json()
  //     setLawSubjectData(result)
  //   })()
  // }, [])

  //리턴..
  return (
    <Line
      data={{
        labels,

        datasets: [
          {
            label: '경찰학',
            data: policeSubjectData.map((item) => item.COUNT),
            borderColor: '#FBA869',
            backgroundColor: '#FBA869',
            pointBorderWidth: 4,
          },
          {
            label: '형사법',
            data: criminalSubjectData.map((item) => item.COUNT),
            borderColor: '#42C366',
            backgroundColor: '#42C366',
            pointBorderWidth: 4,
          },
          {
            label: '헌법',
            data: lawSubjectData.map((item) => item.COUNT),
            borderColor: '#70A6E8',
            backgroundColor: '#70A6E8',
            pointBorderWidth: 4,
          },
        ],
      }}
      options={options}
    />
  )
}

export default DistributionChart
