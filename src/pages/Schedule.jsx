import styled from 'styled-components'

// STYLED COMPONENT
const Cont = styled.div`
  width: calc(100vw - 286px);
  height: 130em;
  position: absolute;
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
  background-color: aqua;
`
const MemoCard = styled.div`
  height: 28em;
  width: 28em;
  background-color: beige;
  border-radius: 30px;
  background-color: aliceblue;
`

//컴포.
const Schedule = () => {
  return (
    <Cont>
      <CalendarZone>calendar</CalendarZone>
      <MemoZone>
        <MemoCard>투데이</MemoCard>
        <MemoCard>위클리</MemoCard>
        <MemoCard>몬쓸리</MemoCard>
      </MemoZone>
    </Cont>
  )
}

export default Schedule
