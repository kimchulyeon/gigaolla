import React from "react";
import styled from "styled-components";

import MaxScore from "./MaxScore";
import CardTemplate from "./CardTemplate";

// 당월 최고 점수
const MaxScoreChartWrap = () => {
  // 당월 최고 점수 Wrap
  const Cont = styled.div`
    margin-top: 47px;
    width: 24.25em;
    height: 43.56em;
    margin-right: 5.31em;
  `;
  return (
    <Cont>
      {/* 카드 테두리 Components */}
      <CardTemplate Element={MaxScore} Name={"당월 최고 점수"} />
    </Cont>
  );
};

export default MaxScoreChartWrap;
