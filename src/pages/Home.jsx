import React from "react";
import styled from "styled-components";

// import Navigation from '../components/Navigation'
import OverviewCard from "../components/OverviewCard";
import HomeAttendChartWrap from "../components/HomeAttendChartWrap";
import { Link } from "react-router-dom";

const Background = styled.div`
  width: 100%;
`;
// 네비게이션 제외 내용 Wrap
const Cont = styled.div`
  margin-top: 7.5em;
  margin-left: 19.69em;
  padding: 0 2.5em;
`;
const PageRound = styled.div`
  position: fixed;
  background: ${(props) => props.theme.navbackgroundColor};
  width: 1.88em;
  height: 100%;
  top: 0;
  left: 19.69em;
  ::after {
    position: fixed;
    content: "";
    width: 1.88em;
    height: 100%;
    background: ${(props) => props.theme.mainBackground};
    border-radius: 20px 0 0 20px;
  }
`;

// OVERVIEW
const Title = styled.span`
  display: flex;
  justify-content: flex-start;
  margin: 0 auto 2.5rem;
  width: 82.5rem;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 1.38em;
  line-height: 1.61rem;
  color: #5d5fef;
`;
// OverviewCard Wrap
const CardCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 9.63em;
`;
const ChartCont = styled.div`
  max-width: 82.5em;
  height: 37.25em;
  margin: 0 auto;
  margin-bottom: 14em;
`;
const CardWrap = styled.div`
  width: 82.81em;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1712px) {
    width: 100%;
  }

  & > a {
    text-decoration: none;
    color: ${(props) => props.theme.textColor};
    display: block;
    position: relative;
    box-sizing: border-box;
    width: 31.82%;
    height: 0;
    padding-bottom: 31.82%;
    background: ${(props) => props.theme.chartBackgroundColor};
    border-radius: 25px;
    box-shadow: 0px 17px 26px rgba(0, 0, 0, 0.06),
      0px 2px 6.5px rgba(0, 0, 0, 0.04), 0px 0px 1.09208px rgba(0, 0, 0, 0.04);
    @media screen and (max-width: 1712px) {
      font-size: 0.9346vw;
    }
  }
`;

const Home = () => {
  return (
    <Background>
      {/* <Navigation /> */}
      <Cont>
        <PageRound />
        <Title>OVERVIEW</Title>
        <CardCont>
          <CardWrap>
            <Link to="/경찰/students">
              <OverviewCard Class={"경찰"} Color={"#21468d"} />
            </Link>
            <Link to="/소방/students">
              <OverviewCard Class={"소방"} Color={"#fd4f3a"} />
            </Link>
            <Link to="/행정/students">
              <OverviewCard Class={"행정"} Color={"#257e0e"} />
            </Link>
          </CardWrap>
        </CardCont>
        <ChartCont>
          <HomeAttendChartWrap />
        </ChartCont>
      </Cont>
    </Background>
  );
};

export default Home;
