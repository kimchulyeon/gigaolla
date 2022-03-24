import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import PoliceIcon from '../image/PoliceIcon.jsx'
import FireIcon from '../image/FireIcon.jsx'
import AdminIcon from '../image/AdminIcon.jsx'

const OverviewCard = ({ Class, Color }) => {
  const [loading, setLoading] = useState(false)
  const [totalStudent, setTotalStudent] = useState('')
  const [lastTotalStudent, setLastTotalStudent] = useState('')
  const [attendStudent, setAttendStudent] = useState('')
  const [lastAttendStudent, setLastAttendStudent] = useState('')
  const [totalScore, setTotalScore] = useState('')
  const [lastTotalScore, setLastTotalScore] = useState('')
  const [topTotalScore, setTopTotalScore] = useState('')
  const [losTotalScore, setLowTotalScore] = useState('')

  const fetchData = async () => {
    const URL = 'https://kimcodi.kr/external_api/dashboard/'
    let today = new Date()
    let year = today.getFullYear()
    // let lastMonth =
    //   today.getMonth() + 1 !== 0
    //     ? today.getMonth() <= 9
    //       ? "0" + today.getMonth()
    //       : today.getMonth()
    //     : 12;
    // let month =
    //   today.getMonth() + 1 <= 9
    //     ? "0" + (today.getMonth() + 1)
    //     : today.getMonth() + 1;
    let lastMonth = '01'
    let month = '02'

    const totalUrl = `${URL}numberOfTotalStudentsByMonth.php?yyyy=${year}&mm=${month}&class=${Class}`
    const LastTotalUrl = `${URL}numberOfTotalStudentsByMonth.php?yyyy=${
      lastMonth !== 12 ? year : year - 1
    }&mm=${lastMonth}&class=${Class}`
    const attendedUrl = `${URL}numberOfTestedStudentsByMonth.php?yyyy=${year}&mm=${month}&class=${Class}`
    const LastAttendedUrl = `${URL}numberOfTestedStudentsByMonth.php?yyyy=${
      lastMonth !== 12 ? year : year - 1
    }&mm=${lastMonth}&class=${Class}`
    const scoreUrl = `${URL}avgOfSeriesByMonth.php?%20yyyy=${year}&mm=${month}&series=${Class}`
    const lastScoreUrl = `${URL}avgOfSeriesByMonth.php?%20yyyy=${
      lastMonth !== 12 ? year : year - 1
    }&mm=${lastMonth}&series=${Class}`
    const topScoreUrl = `${URL}avgOfSeriesTopLowPerByMonth.php?yyyy=${year}&mm=${month}&toplow=top&per=10&series=${Class}`
    const lowScoreUrl = `${URL}avgOfSeriesTopLowPerByMonth.php?yyyy=${year}&mm=${month}&toplow=low&per=10&series=${Class}`

    await Promise.all([
      axios.get(totalUrl).then((res) => {
        if (res.data.code === '001') {
          setTotalStudent(res.data.result[0].STUDENT_COUNT)
        } else {
          return
        }
      }),
      axios.get(LastTotalUrl).then((res) => {
        if (res.data.code === '001') {
          setLastTotalStudent(res.data.result[0].STUDENT_COUNT)
        } else {
          return
        }
      }),

      axios.get(attendedUrl).then((res) => {
        if (res.data.code === '001') {
          setAttendStudent(res.data.result[0].STUDENT_COUNT)
        } else {
          return
        }
      }),
      axios.get(LastAttendedUrl).then((res) => {
        if (res.data.code === '001') {
          setLastAttendStudent(res.data.result[0].STUDENT_COUNT)
        } else {
          return
        }
      }),

      axios.get(scoreUrl).then((res) => {
        if (res.data.code === '001') {
          setTotalScore(Math.round(res.data.result[0].AVG))
        } else {
          return
        }
      }),

      axios.get(lastScoreUrl).then((res) => {
        if (res.data.code === '001') {
          setLastTotalScore(Math.round(res.data.result[0].AVG))
        } else {
          return
        }
      }),

      axios.get(topScoreUrl).then((res) => {
        if (res.data.code === '001') {
          setTopTotalScore(Math.round(res.data.result[0].AVG))
        } else {
          return
        }
      }),

      axios.get(lowScoreUrl).then((res) => {
        if (res.data.code === '001') {
          setLowTotalScore(Math.round(res.data.result[0].AVG))
        } else {
          return
        }
      }),
    ])
  }
  let totalMinusLast = Math.floor(parseInt(totalStudent) - parseInt(lastTotalStudent))
  let attendMinusLast = Math.floor(parseInt(attendStudent) - parseInt(lastAttendStudent))
  let lastTestRate = Math.floor((parseInt(lastAttendStudent) / parseInt(lastTotalStudent)) * 100)
  let TestRate = Math.floor((parseInt(attendStudent) / parseInt(totalStudent)) * 100)
  let TestRateMinusLast = Math.floor(parseInt(TestRate) - parseInt(lastTestRate))
  let TestMinusLast = Math.floor(parseInt(totalScore) - parseInt(lastTotalScore))
  let TestIncrease = Math.floor((parseInt(totalScore) / parseInt(lastTotalScore)) * 100)
  TestIncrease =
    String(TestIncrease) !== 'NaN'
      ? String(TestIncrease) === 'Infinity'
        ? totalScore
        : TestIncrease
      : '0'
  TestRate =
    String(TestRate) !== 'NaN' ? (String(TestRate) === 'Infinity' ? attendStudent : TestRate) : '0'

  useEffect(() => {
    fetchData()
  }, [])

  const Cont = styled.div`
    padding: 1.56em;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  `
  const ClassName = styled.span`
    font-size: 2.13em;
    font-weight: bold;
    color: ${Color};
  `
  const IconCont = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 1.63em;
    right: 1.69em;
    width: 3em;
    height: 3em;
    background-color: ${Color};
    border-radius: 2em;
  `
  const Icon = styled.div`
    width: 2em;
  `
  const StudentCounterCont = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-top: 3.44em;
    height: 7.94em;
  `
  const StudentCounter = styled.div`
    position: relative;
    + div {
      margin-left: 1.44em;
      padding-left: 1.4em;
    }
  `
  const Student = styled.span`
    display: block;
    color: #696969;
    font-size: 0.88em;
    line-height: 1.36em;
  `
  const Line = styled.div`
    position: absolute;
    width: 100%;
    height: 60%;
    left: 0;
    bottom: 0;
    border-left: 1px solid #c4c4c4;
  `
  const Counter = styled.span`
    display: flex;
    align-items: flex-end;
    margin-top: 1.88em;
    font-size: 1.25em;
  `
  const Number = styled.span`
    display: inline-block;
    font-size: 1.9em;
    font-weight: bold;
    margin-right: 0.1em;
    line-height: 0.79em;
  `
  const Increase = styled.span`
    display: block;
    font-size: 0.75em;
    margin-top: 0.83em;
    text-align: right;
    line-height: 1.36em;
  `
  const TotalCount = styled.span`
    color: ${totalMinusLast !== 0 ? (totalMinusLast > 0 ? '#2dce89' : '#fb4646') : '#000'};
  `
  const AttendCount = styled.span`
    color: ${attendMinusLast !== 0 ? (attendMinusLast > 0 ? '#2dce89' : '#fb4646') : '#000'};
  `

  const Chart = styled.div`
    margin-top: 1.13em;
    width: 5.94em;
    height: 5.94em;
    transform: rotate(90deg);
    background: conic-gradient(${Color} 0% ${TestRate}%, #c4c4c4 0% 100%);
    border-radius: 3em;
    display: flex;
    ::after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      content: '';
      width: 4em;
      height: 4em;
      background: ${(props) => props.theme.chartBackgroundColor};
      border-radius: 3em;
    }
  `
  const ChartScoreCont = styled.div`
    position: absolute;
    width: 40%;
    top: 3.73em;
    right: 1.55em;
  `
  const ChartSCount = styled.span`
    color: ${TestRateMinusLast !== 0 ? (TestRateMinusLast > 0 ? '#2dce89' : '#fb4646') : '#000'};
  `

  const ScoreAllCont = styled.div`
    position: absolute;
    width: 87%;
    display: flex;
    bottom: 3.25em;
    justify-content: space-between;
  `
  const ScoreCont = styled.div`
    position: relative;
    display: block;
  `
  const ScoreName = styled.span`
    display: block;
    text-align: center;
    width: 100%;
    color: #696969;
    font-size: 0.88em;
    line-height: 2.14em;
    margin-bottom: 0.36em;
  `
  const Score = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 0.88em;
    line-height: 2.14em;
  `
  const ScoreNumber = styled.span`
    font-size: 1.57em;
    font-weight: bold;
    line-height: 0.73em;
    margin-right: 0.18em;
  `
  const ScoreIncrease = styled.span`
    display: block;
    position: absolute;
    text-align: center;
    width: 100%;
    font-size: 0.75em;
    line-height: 1.33em;
    margin-top: 0.2em;
    color: ${TestMinusLast !== 0 ? (TestMinusLast > 0 ? '#2dce89' : '#fb4646') : '#000'};
  `
  return (
    <>
      <Cont>
        <ClassName>{Class}직</ClassName>
        <IconCont>
          <Icon>
            {Class !== '경찰' ? (
              Class === '소방' ? (
                <FireIcon color="white" />
              ) : (
                <AdminIcon color="white" />
              )
            ) : (
              <PoliceIcon color="white" />
            )}
          </Icon>
        </IconCont>
        <StudentCounterCont>
          <StudentCounter>
            <Student>재학생</Student>
            <Counter>
              <Number>{totalStudent}</Number>명
            </Counter>
            <Increase>
              <TotalCount>
                {totalMinusLast !== 0
                  ? totalMinusLast > 0
                    ? `+${totalMinusLast}명`
                    : `${totalMinusLast}명`
                  : '-'}
              </TotalCount>
            </Increase>
          </StudentCounter>
          <StudentCounter>
            <Line></Line>
            <Student>응시생</Student>
            <Counter>
              <Number>{attendStudent}</Number>명
            </Counter>
            <Increase>
              <AttendCount>
                {attendMinusLast !== 0
                  ? attendMinusLast > 0
                    ? `+${attendMinusLast}명`
                    : `${attendMinusLast}명`
                  : '-'}
              </AttendCount>
            </Increase>
          </StudentCounter>
          <StudentCounter>
            <Student>응시율</Student>
            <Chart></Chart>
            <ChartScoreCont>
              <ScoreCont>
                <Score>
                  <ScoreNumber>{TestRate}</ScoreNumber>%
                </Score>
                <ScoreIncrease>
                  <ChartSCount>
                    {TestRateMinusLast !== 0
                      ? TestRateMinusLast > 0
                        ? `+${TestRateMinusLast}%`
                        : `${TestRateMinusLast}%`
                      : '-'}
                  </ChartSCount>
                </ScoreIncrease>
              </ScoreCont>
            </ChartScoreCont>
          </StudentCounter>
        </StudentCounterCont>
        <ScoreAllCont>
          <ScoreCont>
            <ScoreName>평균점수</ScoreName>
            <Score>
              <ScoreNumber>{totalScore}</ScoreNumber>점
            </Score>
            <ScoreIncrease>
              {TestMinusLast !== 0
                ? TestMinusLast > 0
                  ? `+${TestMinusLast}점`
                  : `${TestMinusLast}점`
                : '-'}
            </ScoreIncrease>
          </ScoreCont>
          <ScoreCont>
            <ScoreName>점수향상</ScoreName>
            <Score>
              <ScoreNumber>
                {TestIncrease !== '0'
                  ? TestIncrease > 0
                    ? `+${TestIncrease}`
                    : `${TestIncrease}`
                  : '0'}
              </ScoreNumber>
              %
            </Score>
          </ScoreCont>
          <ScoreCont>
            <ScoreName>상위10%</ScoreName>
            <Score>
              <ScoreNumber>{topTotalScore}</ScoreNumber>점
            </Score>
          </ScoreCont>
          <ScoreCont>
            <ScoreName>하위10%</ScoreName>
            <Score>
              <ScoreNumber>{losTotalScore}</ScoreNumber>점
            </Score>
          </ScoreCont>
        </ScoreAllCont>
      </Cont>
    </>
  )
}

export default OverviewCard
