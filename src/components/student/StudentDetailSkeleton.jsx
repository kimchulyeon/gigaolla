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
  }
  .id {
    margin-top: 6px;
  }
  .title {
    margin-top: 23px;
    font-size: 13px;
  }
  .rate {
    margin-top: 20px;
    font-size: 25px;
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

const StudentDetailSkeleton = () => {
  return (
    <ListArea>
      <Header>
        <div className="name">이름</div>
        <div className="id">아이디</div>
        <div className="title">증감</div>
        <div className="rate">-%</div>
      </Header>

      <Content>
        <InfoContainer>
          <span>반</span>
          <span>-</span>
        </InfoContainer>
        <InfoContainer>
          <span>순위</span>
          <span>-</span>
        </InfoContainer>
        <InfoContainer>
          <span>점수</span>
          <span>-</span>
        </InfoContainer>
        <InfoContainer>
          <span>당월 목표</span>
          <span>-</span>
        </InfoContainer>
        <InfoContainer>
          <span>달성도</span>
          <span>-</span>
        </InfoContainer>
        <InfoContainer>
          <span>익월목표</span>
          <span>-</span>
        </InfoContainer>
      </Content>
    </ListArea>
  )
}

export default StudentDetailSkeleton
