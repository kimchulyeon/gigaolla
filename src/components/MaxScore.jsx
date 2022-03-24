import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import qs from 'qs'
import { useRecoilValue } from 'recoil'
import { isDarkAtom } from '../utils/atoms'

// 당월 최고 점수 Wrap
const Cont = styled.div`
  width: 100%;
  height: 35.5em;
  margin: 3em auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
`
const TextCont = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  color: #32325d;
`
const Text = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25em;
  line-height: 1.69rem;
  color: ${(props) => props.theme.chartTitleColor};
  + span {
    margin-top: 3.75rem;
  }
`
const Score = styled.span`
  font-weight: bold;
  font-size: 1.5em;
  line-height: 2.06rem;
  margin-left: 2.56rem;
`

const year = new Date().getFullYear() // 현재 년도
const month = String(new Date().getMonth()).padStart(2, '0') // 현재 월

// api
const MAXSCORE_URL = `https://kimcodi.kr/external_api/dashboard/topInfoOfSubjectByMonth.php`
const subjects = {
  경찰: ['경찰학', '형사법', '헌법'],
  행정: ['행정학', '국어', '한국사', '행정법', '영어'],
  소방: ['소방학개론', '소방한국사', '소방영어', '소방관계법규', '소방행정법'],
}

// 당월 최고 점수 내용
const MaxScore = () => {
  const params = useParams()
  const SUBJECT = params.subject
  const subject = subjects[SUBJECT]
  const [maxScore, setMaxScore] = useState([])
  const isDark = useRecoilValue(isDarkAtom)

  let total = 0
  let score = []

  useEffect(() => {
    ;(async () => {
      const maxScoreData = await Promise.all(
        subject.map(async (i) => {
          const res = await fetch(
            `${MAXSCORE_URL}?${qs.stringify({
              yyyy: year,
              mm: month,
              subject: i,
            })}`
          )
          return Math.round((await res.json()).result[0].SCORE)
        })
      )
      setMaxScore(maxScoreData)
    })().catch(console.error)
  }, [])

  function makeSubjectScoreArr(subjectName, subjectScore) {
    let willReturn = {
      subjectName: subjectName,
      subjectScore: subjectScore,
    }
    return willReturn
  }

  for (let i = 0; i < subject.length; i++) {
    score.push(makeSubjectScoreArr(subject[i], maxScore[i]))
  }

  for (let i = 0; i < maxScore.length; i++) {
    total = maxScore[i] + total
  }

  return (
    <Cont>
      <TextCont>
        <Text>
          총점
          <Score>{total}</Score>
        </Text>
        {score.map((i) => {
          let datas = (
            <Text>
              {i.subjectName}
              <Score>{i.subjectScore}</Score>
            </Text>
          )
          return datas
        })}
      </TextCont>
    </Cont>
  )
}

export default MaxScore
