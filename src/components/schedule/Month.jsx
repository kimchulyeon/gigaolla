import React from 'react'
import Day from '../../components/schedule/Day'
import styled from 'styled-components'

const Cont = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  margin-top: 10em;
  margin-left: 6em;
  border-radius: 15px;
`

const Calendar = styled.div`
  display: flex;
  width: 86.5%;
  top: 0;
  left: 0;
`
// const

const Month = ({ currentMonth }) => {
  return (
    <Cont>
      {/* <span>월화수목금토일</span> */}
      {currentMonth.map((row, idx) => {
        return (
          <Calendar key={idx}>
            {row.map((day, idx) => {
              return <Day key={idx} day={day} />
            })}
          </Calendar>
        )
      })}
    </Cont>
  )
}

export default Month
