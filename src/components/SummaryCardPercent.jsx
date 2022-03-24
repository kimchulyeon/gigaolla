import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

// 전체 페이지 Wrap
const Cont = styled.div`
  padding: 2.38em 1.19em;
  box-sizing: border-box;
  width: 19.31em;
  height: 7.5em;
  font-family: "Noto Sans KR", sans-serif;
  background: ${(props) => props.theme.backgroundColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  + div {
    margin-left: 1.88em;
  }
`;
// 정렬 Wrap
const TextCont = styled.div`
  + div {
    margin-left: 3em;
  }
`;
//'상위 10%', '하위 100%' Text
const TextName = styled.span`
  font-size: 1.25em;
  line-height: 1.69rem;
  color: #8898aa;
`;
// '00점' Wrap
const TextCountCont = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 1em;
  line-height: 1.38rem;
  color: #999999;
`;
// '00점'의 숫자 Text
const TextNumber = styled.span`
  font-weight: bold;
  font-size: 2em;
  line-height: 2.75rem;
  color: ${(props) => props.theme.textColor};
  margin-right: 0.2em;
`;

//Class page 재학생, 응시생, 응시율... 카드
const SummaryCardPercent = ({ Subject }) => {
  const [topScore, setTopScore] = useState("");
  const [lowScore, setLowScore] = useState("");

  const fetchData = async () => {
    const URL = "https://kimcodi.kr/external_api/dashboard/";
    let today = new Date();
    let year = today.getFullYear();
    let month =
      today.getMonth() + 1 <= 9
        ? "0" + (today.getMonth() + 1)
        : today.getMonth() + 1;

    const topScoreUrl = `${URL}avgOfSeriesTopLowPerByMonth.php?yyyy=${year}&mm=${month}&toplow=top&per=10&series=${Subject}`;
    const lowScoreUrl = `${URL}avgOfSeriesTopLowPerByMonth.php?yyyy=${year}&mm=${month}&toplow=low&per=10&series=${Subject}`;

    await axios.get(topScoreUrl).then((res) => {
      if (res.data.code === "001") {
        setTopScore(res.data.result[0].STUDENT_COUNT);
      } else {
        return;
      }
    });
    await axios.get(lowScoreUrl).then((res) => {
      if (res.data.code === "001") {
        setLowScore(res.data.result[0].STUDENT_COUNT);
      } else {
        return;
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Cont>
      <TextCont>
        <TextName>상위 10%</TextName>
        <TextCountCont>
          <TextNumber>{topScore}</TextNumber>점
        </TextCountCont>
      </TextCont>
      <TextCont>
        <TextName>하위 10%</TextName>
        <TextCountCont>
          <TextNumber>{lowScore}</TextNumber>점
        </TextCountCont>
      </TextCont>
    </Cont>
  );
};

export default SummaryCardPercent;
