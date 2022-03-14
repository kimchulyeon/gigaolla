import React from 'react'
import styled from 'styled-components'

import Navigation from '../components/Navigation'
import OverviewCard from '../components/OverviewCard'
import HomeAttendChartWrap from '../components/HomeAttendChartWrap'

const Home = () => {
  // 전체 페이지 Wrap
  const Background = styled.div`
    width: 100%;
  `
  // 네비게이션 제외 내용 Wrap
  const Cont = styled.div`
    margin-top: 7.5em;
    margin-left: 19.69em;
    padding: 0 2.5em;
  `
  // OVERVIEW
  const Title = styled.span`
    display: flex;
    justify-content: flex-start;
    margin: 0 auto 2.5rem;
    width: 82.5rem;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 1.38em;
    line-height: 1.61rem;
    color: #5d5fef;
  `
  // OverviewCard Wrap
  const CardCont = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 9.63em;
  `
  const ChartCont = styled.div`
    max-width: 82.5em;
    height: 37.25em;
    margin: 0 auto;
    margin-bottom: 14em;
  `
  const CardWrap = styled.div`
    width: 82.81em;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 1712px) {
      width: 100%;
    }
  `
  return (
    <Background>
      <Navigation />
      <Cont>
        <Title>OVERVIEW</Title>
        <CardCont>
          <CardWrap>
            <OverviewCard Class={'경찰'} Color={'#21468d'} />
            <OverviewCard Class={'소방'} Color={'#fd4f3a'} />
            <OverviewCard Class={'행정'} Color={'#257e0e'} />
          </CardWrap>
        </CardCont>
        <ChartCont>
          <HomeAttendChartWrap />
        </ChartCont>
      </Cont>
    </Background>
  )
}

export default Home
