import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`
const InfoContainer = styled.div`
  /* border: 1px solid blue; */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  span:nth-of-type(1) {
    color: grey;
  }
  span:nth-of-type(2) {
    font-size: 20px;
    font-weight: 900;
  }

  span {
    margin-bottom: 9px;
  }
  span:last-child {
    margin-bottom: 0;
  }

  &:nth-of-type(3) {
    span:nth-of-type(2) {
      color: red;
    }
  }
`

const StudentDetailContent = ({ student }) => {
  return (
    <Content>
      <InfoContainer>
        <span>반</span>
        <span>{student.class}</span>
      </InfoContainer>
      <InfoContainer>
        <span>순위</span>
        <span>{student.rank}</span>
      </InfoContainer>
      <InfoContainer>
        <span>점수</span>
        <span>{student.currentMonthScore}</span>
      </InfoContainer>
      <InfoContainer>
        <span>당월 목표</span>
        <span>{student.currentMonthGoal}</span>
      </InfoContainer>
      <InfoContainer>
        <span>달성도</span>
        <span>{student.achieve}</span>
      </InfoContainer>
      <InfoContainer>
        <span>익월목표</span>
        <span>{student.nextMonthGoal}</span>
      </InfoContainer>
    </Content>
  )
}

export default StudentDetailContent
