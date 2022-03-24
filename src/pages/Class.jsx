import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

// import Navigation from '../components/Navigation'
import SummaryCard from '../components/SummaryCard'
import AttendChartWrap from '../components/AttendChartWrap'
import MaxScoreWrap from '../components/MaxScoreWrap'
import AverageChartWrap from '../components/AverageChartWrap'
import DistributionChartWrap from '../components/distribution_chart/DistributionChartWrap'
import DistributionChartTab from '../components/distribution_chart/DistributionChartTap'
import SortBySubjectWrap from '../components/distribution_chart/SortBySubjectWrap'
import { useParams, Link } from 'react-router-dom'
import SummaryCardPercent from '../components/SummaryCardPercent'
import { getLastMonth } from '../utils/getLastMonth'

// 전체 페이지 Wrap
const Background = styled.div`
  width: 100%;
`
// 네비게이션 제외 내용 Wrap
const Cont = styled.div`
  margin-bottom: 7.63em;
  margin-left: 19.69em;
  padding: 0 2.5em;

  a {
    text-decoration: none;
  }
`
const PageRound = styled.div`
  position: fixed;
  background: ${(props) => props.theme.navbackgroundColor};
  width: 1.88em;
  height: 100%;
  top: 0;
  left: 19.69em;
  ::after {
    position: fixed;
    content: '';
    width: 1.88em;
    height: 100%;
    background: ${(props) => props.theme.mainBackground};
    border-radius: 20px 0 0 20px;
  }
`
// 상단 '00직, 목표 점수 달성도가~' 전체 wrap

// MessageText 가운데 정렬을 위한 wrap
const Message = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
// '00직, 목표 점수 달성도가~' text
const MessageText = styled.span`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: bold;
  font-size: 2em;
  color: #fff;
  line-height: 2.75rem;
`
// 재학생, 응시생, 응시율, 상위 카드 wrap
const SummaryCardCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3.75em;
`
// 차트 wrap
const ChartCont = styled.div`
  position: relative;
  max-width: 82.5em;
  margin: 0 auto;
  padding-top: 5em;
`
// 차트 Title
const ChartName = styled.div`
  font-weight: bold;
  font-size: 1.63em;
  line-height: 2.19rem;
  margin-bottom: 3.13rem;
`
const DistributionChartName = styled(ChartName)`
  margin-bottom: 1rem;
`
// 점수지표 차트 wrap
const Chart2 = styled.div`
  display: flex;
`

const Class = () => {
  // 점수대별 인원 전체 / 과목별 버튼
  const [distributionTotal, setDistributionTotal] = useState(true)
  const [achieveStudent, setAchieveStudent] = useState(0)
  const [achieveCompareStudent, setAchieveCompareStudent] = useState(0)
  const [achieveIncrement, setAchieveIncrement] = useState(0)
  const { subject, number } = useParams()
  const { thisYear, lastMonth } = getLastMonth()

  useEffect(() => {
    const fetchData = async () => {
      let compareMonth = Number(lastMonth) === 1 ? 12 : Number(lastMonth) - 1
      compareMonth = compareMonth < 10 ? `0${compareMonth}` : compareMonth
      let compareYear = compareMonth === 12 ? thisYear - 1 : thisYear
      const URL = `https://kimcodi.kr/external_api/dashboard/studentInfoOfClassByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&class=${subject}`
      const COMPARE_URL = `https://kimcodi.kr/external_api/dashboard/studentInfoOfClassByMonth.php?yyyy=${compareYear}&mm=${compareMonth}&class=${subject}`
      let fetchUrl = ''
      let fetchCompareUrl = ''
      if (!number) {
        fetchUrl = URL
        fetchCompareUrl = COMPARE_URL
      } else {
        fetchUrl = `${URL}&classn=${number}`
        fetchCompareUrl = `${COMPARE_URL}&classn=${number}`
      }

      const urls = [fetchUrl, fetchCompareUrl]
      const promise = await Promise.all(
        urls.map(async (url) => {
          const response = await fetch(url)
          const { result } = await response.json()
          return result
        })
      )

      const [achieve, compareAchieve] = await Promise.all(
        promise.map(async (student) => {
          let arr = []
          student.map(async (res) => {
            let achieve = await Number(res.달성도.split('%')[0])
            if (achieve >= 90) {
              await arr.push(achieve)
            }
          })
          return await arr
        })
      )

      const achieveCount = achieve.length
      const achieveCompareCount = compareAchieve.length
      const increment = achieveCount - achieveCompareCount

      setAchieveStudent(achieveCount)
      setAchieveCompareStudent(achieveCompareCount)
      setAchieveIncrement(increment)
    }

    fetchData()
  }, [
    subject,
    number,
    lastMonth,
    thisYear,
    achieveStudent,
    achieveCompareStudent,
    achieveIncrement,
  ])

  let subjectColor
  switch (subject) {
    case '경찰':
      subjectColor = '#21468d'
      break
    case '소방':
      subjectColor = '#fd4f3a'
      break
    case '행정':
      subjectColor = '#257e0e'
      break
    default:
      subjectColor = '#5d5fef'
  }

  const MessageCont = styled.div`
    width: 82.81em;
    height: 5em;
    margin: 7.5em auto 0;
    background: ${(props) => props.subjectColor};
    /* background-color: #21468d; */
    border-radius: 16px;
  `

  // 상단 공지 색깔 변경
  return (
    <Background>
      {/* <Navigation /> */}
      <Cont>
        <PageRound />
        <MessageCont subjectColor={subjectColor}>
          {/* <MessageCont> */}
          <Message>
            <MessageText>
              {subject}직 {number ? `${number}반` : ''}, 목표 점수 달성도가 90%가 넘은 학생은{' '}
              {achieveStudent}명이며 저번 시험 대비 {achieveIncrement}명 올랐습니다.
            </MessageText>
          </Message>
        </MessageCont>
        {number ? (
          <Link to={`/${subject}/${number}/students`}>
            <SummaryCardCont>
              <SummaryCard Title={'재학생'} Subject={subject} Number={number} />
              <SummaryCard Title={'응시생'} Subject={subject} Number={number} />
              <SummaryCard Title={'응시율'} Subject={subject} Number={number} />
              <SummaryCard Title={'반등수'} Subject={subject} Number={number} />
            </SummaryCardCont>
          </Link>
        ) : (
          <Link to={`/${subject}/students`}>
            <SummaryCardCont>
              <SummaryCard Title={'재학생'} Subject={subject} />
              <SummaryCard Title={'응시생'} Subject={subject} />
              <SummaryCard Title={'응시율'} Subject={subject} />
              <SummaryCardPercent Subject={subject} />
            </SummaryCardCont>
          </Link>
        )}
        <ChartCont>
          <ChartName>응시지표</ChartName>
          <AttendChartWrap />
        </ChartCont>
        <ChartCont>
          <ChartName>점수지표</ChartName>
          <Chart2>
            <MaxScoreWrap />
            <AverageChartWrap />
          </Chart2>
        </ChartCont>
        <ChartCont>
          <DistributionChartName>
            <span>점수대별 인원수</span>
            <DistributionChartTab
              setDistributionTotal={setDistributionTotal}
              distributionTotal={distributionTotal}
            />
          </DistributionChartName>
          {distributionTotal ? <DistributionChartWrap /> : <SortBySubjectWrap />}
        </ChartCont>
      </Cont>
    </Background>
  )
}

export default Class
