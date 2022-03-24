import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useParams } from 'react-router-dom'
import StudentListHeader from '../components/student/StudentListHeader'
import StudentListTable from '../components/student/StudentListTable'
import StudentDetail from '../components/student/StudentDetail'
import StudentDetailSkeleton from '../components/student/StudentDetailSkeleton'
import { getLastMonth } from '../utils/getLastMonth'

import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { keyframes } from 'styled-components'

const Cont = styled.div`
  width: calc(100vw - 315px);
  height: 130em;
  margin-left: 19em;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.mainBackground};
`

const UserListContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 90em;
  margin-top: 5em;
`
const UserListContainerLoading = styled.div`
  display: flex;
  justify-content: space-around;
  width: 90em;
  margin-top: 5em;
`
const ListAreaLoading = styled.div`
  width: 40%;
  background: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  box-shadow: 0px 1px 12px rgba(0, 0, 0, 0.3);
  border-radius: 25px;
  margin-top: 30px;
  margin-bottom: 20px;
  padding: 30px 0;
  position: relative;

  &:nth-of-type(1) {
    height: 100vh;
  }
  &:nth-of-type(2) {
    height: 30vh;
  }
  & > * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    transform: translateY(-50%);
  }
`

const ListArea = styled.div`
  width: 100%;
  background: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  box-shadow: 0px 1px 12px rgba(0, 0, 0, 0.3);
  border-radius: 25px;
  margin-top: 30px;
  margin-bottom: 20px;
  padding: 30px 0;

  table {
    border-collapse: collapse;
    width: 95%;
    margin: 0 20px 0;

    th,
    td {
      text-align: center;
      padding: 8px;
    }
    th:nth-of-type(1) {
      padding: 30px 0;
    }
  }
`
const loadingAnimation = keyframes`
  0%{
    opacity: 1;
    transform: scale(0);
  }
  100%{
    opacity: 0;
    transform: scale(3);
  }
`
const Skeleton = styled.div`
  position: absolute;
  left: 15.5em;
  width: 6em;
  height: 6em;
  background-color: #bdc3c7;
  margin-top: 15em;
  /* border-radius: 15px; */
  animation: ${loadingAnimation} 2s cubic-bezier(0.11, 0.93, 0.83, 1.25);
`

//컴포.
const Students = () => {
  const { thisYear, lastMonth } = getLastMonth()
  const { subject, number } = useParams()

  const [canBringData, setCanBringData] = useState(false)
  const [mockData, setMockData] = useState([])
  const [studentDetailInfo, setStudentDetailInfo] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      if (!number) {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/studentInfoOfClassByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&class=${subject}`
        )
        const { result } = await response.json()
        result.map((student) => {
          if (student.당월점수 == 0) {
            student.당월점수 = '-'
            student.과목 = '🔴'
          } else {
            student.과목 = '🔵'
          }
        })
        setMockData(result)
        setIsLoading(false)
      } else {
        const response = await fetch(
          `https://kimcodi.kr/external_api/dashboard/studentInfoOfClassByMonth.php?yyyy=${thisYear}&mm=${lastMonth}&class=${subject}&classn=${number}`
        )
        const { result } = await response.json()
        result.map((student) => {
          if (student.당월점수 == 0) {
            student.당월점수 = '-'
            student.과목 = '🔴'
          } else {
            student.과목 = '🔵'
          }
        })
        setMockData(result)
        setIsLoading(false)
      }
    })()
  }, [thisYear, lastMonth, subject, number])

  const getStudentDetailInfo = (studentData) => {
    setStudentDetailInfo(studentData)
  }

  return (
    <Cont>
      <StudentListHeader number={number} />

      {isLoading ? (
        <UserListContainerLoading>
          <ListAreaLoading>
            {/* <Skeleton /> */}
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          </ListAreaLoading>
          <ListAreaLoading>
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          </ListAreaLoading>
        </UserListContainerLoading>
      ) : (
        <UserListContainer>
          <ListArea>
            <StudentListTable
              mockData={mockData}
              getStudentDetailInfo={getStudentDetailInfo}
              setCanBringData={setCanBringData}
            />
          </ListArea>
          {canBringData ? (
            <StudentDetail studentDetailInfo={studentDetailInfo} />
          ) : (
            <StudentDetailSkeleton />
          )}
          {/* <Outlet /> */}
        </UserListContainer>
      )}
    </Cont>
  )
}

export default Students
