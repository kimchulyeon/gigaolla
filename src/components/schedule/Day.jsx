import React from 'react'
import styled from 'styled-components'

const CalendarItem = styled.div`
  background-color: #fff;
  width: 11em;
  height: 11em;
  border: 1px solid #bdc3c7;

  header {
    display: flex;
    flex-direction: column;
    /* align-items: center; */

    p {
      font-size: 0.938em;
      padding: 1em;
    }
  }
`

const Day = ({ day }) => {
  return (
    <>
      {/* {day.format('ddd').toUpperCase()} */}
      <CalendarItem>
        <header>
          <p>{day.format('DD')}</p>
        </header>
      </CalendarItem>
    </>
  )
}

export default Day
