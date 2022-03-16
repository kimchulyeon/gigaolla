import React from 'react'
import styled from 'styled-components'

const ListArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 40em;
  height: 25em;
  box-shadow: 0px 1px 12px rgba(0, 0, 0, 0.3);
  border-radius: 25px;
  background-color: ${(props) => props.theme.backgroundColor};
  /* height: 90%; */
  margin-top: 30px;
  margin-left: 5em;
  padding: 30px 0;
`

const Header = styled.header`
  /* border: 1px solid black; */
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .name {
    font-size: 25px;
    font-weight: bold;
    color: ${(props) => props.theme.textColor};
  }
  .id {
    margin-top: 6px;
    color: ${(props) => props.theme.textColor};
  }
  .title {
    margin-top: 23px;
    font-size: 13px;
    color: ${(props) => props.theme.textColor};
  }
  .rate {
    margin-top: 20px;
    font-size: 25px;
    color: ${(props) => props.theme.textColor};
  }
`

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 25px;
`
const InfoContainer = styled.div`
  /* border: 1px solid blue; */
  padding: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;

  span:nth-of-type(1) {
    color: grey;
  }
  span:nth-of-type(2) {
    font-size: 20px;
    font-weight: 900;
    color: ${(props) => props.theme.textColor};
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

const StudentDetail = ({ studentDetailInfo }) => {
  return (
    <ListArea>
      <Header>
        <div className="name">{studentDetailInfo.name}</div>
        <div className="id">{studentDetailInfo.userId}</div>
        <div className="title">증감</div>
        <div className="rate">{studentDetailInfo.rate}%</div>
      </Header>

      <Content>
        <InfoContainer>
          <span>반</span>
          <span>{studentDetailInfo.class}</span>
        </InfoContainer>
        <InfoContainer>
          <span>순위</span>
          <span>{studentDetailInfo.rank}</span>
        </InfoContainer>
        <InfoContainer>
          <span>점수</span>
          <span>{studentDetailInfo.currentMonthScore}</span>
        </InfoContainer>
        <InfoContainer>
          <span>당월 목표</span>
          <span>{studentDetailInfo.currentMonthGoal}</span>
        </InfoContainer>
        <InfoContainer>
          <span>달성도</span>
          <span>{studentDetailInfo.achieve}</span>
        </InfoContainer>
        <InfoContainer>
          <span>익월목표</span>
          <span>{studentDetailInfo.nextMonthGoal}</span>
        </InfoContainer>
      </Content>
    </ListArea>
  )
}

export default StudentDetail
