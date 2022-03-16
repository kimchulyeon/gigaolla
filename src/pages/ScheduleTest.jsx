import React, { useState } from 'react'
import styled from 'styled-components'

import CalendarHeader from '../components/schedule/CalendarHeader'
import Month from '../components/schedule/Month'

import { getScheduleMonth } from '../utils/schedule'

// STYLED COMPONENT
const Cont = styled.div`
  width: calc(100vw - 286px);
  height: 120em;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`
const CalendarZone = styled.div`
  width: 90em;
  height: 70em;
  /* margin-top: -24em; */
  margin-bottom: 6em;
  border-radius: 20px;
  box-shadow: 0px 8px 18px rgba(0, 0, 0, 0.3);
`
const MemoZone = styled.div`
  width: 90em;
  height: 30em;
  background-color: aqua;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const MemoCard = styled.div`
  height: 28em;
  width: 28em;
  background-color: beige;
  border-radius: 30px;
`

//컴포.
const Schedule = () => {
  const [currentMonth, setCurrentMonth] = useState(getScheduleMonth())

  return (
    <Cont>
      <CalendarZone>
        {/* 날짜 */}
        <CalendarHeader />
        {/* 달력 */}
        <Month currentMonth={currentMonth} />
      </CalendarZone>
      <MemoZone>
        <MemoCard>투데이</MemoCard>
        <MemoCard>위클리</MemoCard>
        <MemoCard>몬쓸리</MemoCard>
      </MemoZone>
    </Cont>
  )
}

export default Schedule
