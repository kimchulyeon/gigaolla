import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Chart as ChartJS, LineElement } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'
import qs from 'qs'

const subjects = {
  경찰: ['경찰학', '형사법', '헌법'],
  행정: ['행정학', '국어', '한국사', '행정법', '영어'],
  소방: ['소방학개론', '소방한국사', '소방영어', '소방관계법규', '소방행정법'],
}

const Cont = styled.div`
  width: 100%;
  margin-top: 64px;
`

const SUBJECT_URL = `https://kimcodi.kr/external_api/dashboard/avgOfSubjectByMonth.php`

ChartJS.register(LineElement)

// 이번 달, 이번 년도 구하기
let monthArr = []
let label = []

// 월 배열 구하기
const getMonth = () => {
  const date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1

  for (let i = 1; i <= 6; i++) {
    month = month < 10 ? `0${month}` : `${month}`
    monthArr.unshift({ year, month })
    label.unshift(month)
    month--
    if (month === 0) {
      month = 12
      year = year - 1
    }
  }
  return monthArr
}
getMonth()

function AverageChart2({
  filterSubject,
  compareStartDate,
  compareEndDate,
  setFilterClass,
  filterClass,
}) {
  const params = useParams()
  const SUBJECT = params.subject
  const subject = subjects[SUBJECT]
  const [currentSubjectdata, setCurrentSubjectData] = useState([])
  const subjectWithColor = []
  const borderColor = ['#FBA869', '#42C366', '#70A6E8', '#FFDB5C', '#A293FF']

  function subjectAddColor(subjectName, subjectColor) {
    let willReturn = {
      subjectName: subjectName,
      subjectColor: subjectColor,
    }
    return willReturn
  }

  function runSubjectAddColor() {
    for (let i = 0; i < subject.length; i++) {
      subjectWithColor.push(subjectAddColor(subject[i], borderColor[i]))
    }
  }

  function getColor(filterClass) {
    runSubjectAddColor()
    for (let i = 0; i < subject.length; i++) {
      if (filterClass === subjectWithColor[i].subjectName) {
        return subjectWithColor[i].subjectColor
      }
    }
  }

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
    ]
    return { YearMonth }
  }

  // 과목별 평균
  useEffect(() => {
    ;(async () => {
      const subjectData = await Promise.all(
        monthArr.map(async (i) => {
          const res = await fetch(
            `${SUBJECT_URL}?${qs.stringify({
              yyyy: i.year,
              mm: i.month,
              subject: filterSubject,
            })}`
          )
          return Math.round((await res.json()).result[0].AVG)
        })
      )
      runSubjectAddColor()
      setCurrentSubjectData(subjectData)
    })().catch(console.error)
  }, [monthArr, filterSubject])

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        labels: {
          usePointStyle: true,
        },
      },
    },
    scales: {
      xAxes: {
        grid: {
          display: false,
        },
      },
    },
  }

  const chartData2 = {
    labels: label, // 각 월이 나와야 함
    datasets: [
      {
        data: currentSubjectdata, // 각 월에 맞는 데이터
        borderColor: getColor(filterClass),
      },
    ],
  }

  return (
    <>
      <Cont>
        <Line options={lineOptions} data={chartData2} />
      </Cont>
    </>
  )
}

export default AverageChart2
