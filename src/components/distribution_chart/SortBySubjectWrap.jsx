import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getLastMonth } from '../../utils/getLastMonth'
import SortBySubjectTemplate from './SortbySubjectTemplate'
import TestBar from './TestBar'

const Cont = styled.div`
  /* padding: 2.19em; */
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  font-family: 'Noto Sans KR', sans-serif;
  background: #fff;
  border-radius: 25px;
  display: inline-flex;
  justify-content: center;
  /* grid-template-columns: repeat(3, 1fr); */
  /* justify-content: center;
  align-items: center; */
  /* flex-wrap: wrap; */
  /* box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.04),
    0px 0px 1px rgba(0, 0, 0, 0.04); */

  & > * {
    /* flex: 1;
    gap: 10px; */
    /* grid: repeat(1, 1em); */
    flex-wrap: wrap;
  }
`

const SUBJECTS_MAP = {
  // 각 과별로 가지고 있는 과목의 종류를 보관하는 전역 변수입니다.
  경찰: ['경찰학', '형사법', '헌법'],
  소방: ['소방학개론', '소방행정법', '소방관계법규', '소방영어', '소방한국사'],
  행정: ['행정학', '행정법', '국어', '한국사', '영어'],
}
const COLOR = ['#FBA869', '#42C366', '#70A6E8', '#FFDB5C', '#A293FF']

//컴포.
const SortBySubjectWrap = () => {
  const params = useParams()
  const SUBJECT = params.subject

  const { thisYear, lastMonth } = getLastMonth()

  console.log(SUBJECTS_MAP[SUBJECT])

  return (
    <Cont>
      {/* {SUBJECTS_MAP[SUBJECT].map((subject, idx) => {
        return (
          <SortBySubjectChart
            key={SUBJECTS_MAP[subject][idx]}
            subject={subject}
            color={COLOR[idx]}
          />
        )
      })} */}
      <Cont>
        {SUBJECTS_MAP[SUBJECT].map((subject, idx) => {
          return (
            <SortBySubjectTemplate
              Element={TestBar}
              Name={subject}
              year={thisYear}
              month={lastMonth}
              color={COLOR[idx]}
            />
          )
        })}
      </Cont>
    </Cont>
  )
  // if (SUBJECT === '경찰') {
  //   return (
  //     <Cont>
  //       {SUBJECTS_MAP[SUBJECT].map((subjects) => {
  //         return <SortBySubjectChart subjects={subjects} />
  //       })}
  //     </Cont>
  //   )
  // }

  // if (SUBJECT === '소방') {
  //   return (
  //     <Cont>
  //       <CardTemplate
  //         Element={DistributionChart}
  //         Name="점수대별 인원"
  //         year={thisYear}
  //         month={lastMonth}
  //       />
  //     </Cont>
  //   )
  // }
  // if (SUBJECT === '행정') {
  //   return (
  //     <Cont>
  //       <CardTemplate
  //         Element={DistributionChart}
  //         Name="점수대별 인원"
  //         year={thisYear}
  //         month={lastMonth}
  //       />
  //     </Cont>
  //   )
  // }
}

export default SortBySubjectWrap
