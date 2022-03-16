import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const BlueRedBall = styled.div`
  width: 1em;
  height: 1em;
  background-color: ${(props) => (props.takeTest === true ? 'white' : 'red')};
  border: 1px solid grey;
  border-radius: 50%;
  display: inline-block;
`

const StudentListRow = styled.tr`
  cursor: pointer;

  /* border-radius: 20px; */

  &:hover {
    background: linear-gradient(0deg, rgba(93, 95, 239, 0.2), rgba(93, 95, 239, 0.2)), #ffffff;
  }
`

const StudentListItem = ({ data, getStudentDetailInfo, setCanBringData }) => {
  // 응시여부 파란색 빨간색 예시
  const [takeTest, setTakeTest] = useState(true)
  const { subject, number } = useParams()
  console.log(subject, number)

  // 반별 전체 URL 구분
  let detailDatas
  if (!number) {
    detailDatas = {
      name: data.회원명,
      userId: data.회원아이디,
      rate: data.증감,
      class: data.배정반,
      rank: data.전체순위,
      currentMonthScore: data.당월점수,
      currentMonthGoal: data.당월목표,
      achieve: data.달성도,
      nextMonthGoal: data.익월목표,
    }
  } else {
    detailDatas = {
      name: data.회원명,
      userId: data.회원아이디,
      rate: data.증감,
      class: data.배정반,
      rank: data.반별순위,
      currentMonthScore: data.당월점수,
      currentMonthGoal: data.당월목표,
      achieve: data.달성도,
      nextMonthGoal: data.익월목표,
    }
  }

  const onClickListRow = () => {
    getStudentDetailInfo(detailDatas)
    setCanBringData(true)
  }

  return (
    <StudentListRow onClick={onClickListRow}>
      <td>
        <BlueRedBall takeTest={takeTest}></BlueRedBall>
      </td>
      <td>{data.배정반}</td>
      <td>{data.당월점수}</td>
      <td>{data.회원명}</td>
      {number ? <td>{data.반별순위}</td> : <td>{data.전체순위}</td>}
    </StudentListRow>
  )
}

export default StudentListItem
