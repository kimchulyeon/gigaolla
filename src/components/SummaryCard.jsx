import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

//Class page 재학생, 응시생, 응시율... 카드
const SummaryCard = ({ Title, Subject, Number }) => {
  const [count, setCount] = useState("");
  const [lastCount, setLastCount] = useState("");
  const [attendLastCount, setAttendLastCount] = useState("");
  const [lastAttendLastCount, setLastAttendLastCount] = useState("");
  // const [countList, setCountList] = useState([]);

  const fetchData = async () => {
    const URL = "https://kimcodi.kr/external_api/dashboard/";
    // const SCOREURL = `${URL}avgOfSeriesByMonth.php?%20yyyy=${year}&mm=${month}`;
    let today = new Date();
    let year = today.getFullYear();
    // let lastMonth =
    //   today.getMonth() + 1 !== 0
    //     ? today.getMonth() <= 9
    //       ? "0" + today.getMonth()
    //       : today.getMonth()
    //     : 12;
    // let month =
    //   today.getMonth() + 1 <= 9
    //     ? "0" + (today.getMonth() + 1)
    //     : today.getMonth() + 1;
    let lastMonth = "01";
    let month = "02";

    let NowUrl;
    let LastUrl;
    let AttendLastUrl;
    let LastAttendLastUrl;
    switch (Title) {
      case "재학생":
        NowUrl =
          Number === undefined
            ? `${URL}numberOfTotalStudentsByMonth.php?yyyy=${year}&mm=${month}&class=${Subject}`
            : `${URL}numberOfTotalStudentsByMonth.php?yyyy=${year}&mm=${month}&class=${Subject}&classn=${Number}`;
        LastUrl =
          Number === undefined
            ? `${URL}numberOfTotalStudentsByMonth.php?yyyy=${
                lastMonth !== 12 ? year : year - 1
              }&mm=${lastMonth}&class=${Subject}`
            : `${URL}numberOfTotalStudentsByMonth.php?yyyy=${
                lastMonth !== 12 ? year : year - 1
              }&mm=${lastMonth}&class=${Subject}&classn=${Number}`;
        break;
      case "응시생":
        NowUrl =
          Number === undefined
            ? `${URL}numberOfTestedStudentsByMonth.php?yyyy=${year}&mm=${month}&class=${Subject}`
            : `${URL}numberOfTestedStudentsByMonth.php?yyyy=${year}&mm=${month}&class=${Subject}&classn=${Number}`;
        LastUrl =
          Number === undefined
            ? `${URL}numberOfTestedStudentsByMonth.php?yyyy=${
                lastMonth !== 12 ? year : year - 1
              }&mm=${lastMonth}&class=${Subject}`
            : `${URL}numberOfTestedStudentsByMonth.php?yyyy=${
                lastMonth !== 12 ? year : year - 1
              }&mm=${lastMonth}&class=${Subject}&classn=${Number}`;
        break;
      case "응시율":
        NowUrl =
          Number === undefined
            ? `${URL}numberOfTotalStudentsByMonth.php?yyyy=${year}&mm=${month}&class=${Subject}`
            : `${URL}numberOfTotalStudentsByMonth.php?yyyy=${year}&mm=${month}&class=${Subject}&classn=${Number}`;
        LastUrl =
          Number === undefined
            ? `${URL}numberOfTotalStudentsByMonth.php?yyyy=${
                lastMonth !== 12 ? year : year - 1
              }&mm=${lastMonth}&class=${Subject}`
            : `${URL}numberOfTotalStudentsByMonth.php?yyyy=${
                lastMonth !== 12 ? year : year - 1
              }&mm=${lastMonth}&class=${Subject}&classn=${Number}`;
        AttendLastUrl =
          Number === undefined
            ? `${URL}numberOfTestedStudentsByMonth.php?yyyy=${year}&mm=${month}&class=${Subject}`
            : `${URL}numberOfTestedStudentsByMonth.php?yyyy=${year}&mm=${month}&class=${Subject}&classn=${Number}`;
        LastAttendLastUrl =
          Number === undefined
            ? `${URL}numberOfTestedStudentsByMonth.php?yyyy=${
                lastMonth !== 12 ? year : year - 1
              }&mm=${lastMonth}&class=${Subject}`
            : `${URL}numberOfTestedStudentsByMonth.php?yyyy=${
                lastMonth !== 12 ? year : year - 1
              }&mm=${lastMonth}&class=${Subject}&classn=${Number}`;
        break;
      default:
      // 반등수 작업의 흔적...
      // switch (Subject) {
      //   case "경찰":
      //     setCount(5);
      //     for(let i = 1; i < count; i++){
      //       await axios.get(`${SCOREURL}&classn=${Number}`).then((res) => {
      //         if (res.data.code === "001") {
      //           setCount(res.data.result[0].STUDENT_COUNT);
      //         } else {
      //           return;
      //         }
      //       });
      //     }
      //     break;
      //   default:
      //     setCount(3);
      // }
    }

    await axios.get(NowUrl).then((res) => {
      if (res.data.code === "001") {
        setCount(res.data.result[0].STUDENT_COUNT);
      } else {
        return;
      }
    });
    await axios.get(LastUrl).then((res) => {
      if (res.data.code === "001") {
        setLastCount(res.data.result[0].STUDENT_COUNT);
      } else {
        return;
      }
    });
    await axios.get(AttendLastUrl).then((res) => {
      if (res.data.code === "001") {
        setAttendLastCount(res.data.result[0].STUDENT_COUNT);
      } else {
        return;
      }
    });
    await axios.get(LastAttendLastUrl).then((res) => {
      if (res.data.code === "001") {
        setLastAttendLastCount(res.data.result[0].STUDENT_COUNT);
      } else {
        return;
      }
    });
  };

  let CountMinusLast = Math.floor(parseInt(count) - parseInt(lastCount));
  let TestRate = Math.floor(
    (parseInt(attendLastCount) / parseInt(count)) * 100
  );
  let lastTestRate = Math.floor(
    (parseInt(lastAttendLastCount) / parseInt(lastCount)) * 100
  );
  TestRate =
    String(TestRate) !== "NaN"
      ? String(TestRate) === "Infinity"
        ? count
        : TestRate
      : "0";
  lastTestRate =
    String(lastTestRate) !== "NaN"
      ? String(lastTestRate) === "Infinity"
        ? lastCount
        : lastTestRate
      : "0";
  let TestRateMinusLast = Math.floor(
    parseInt(TestRate) - parseInt(lastTestRate)
  );

  useEffect(() => {
    fetchData();
  }, [Subject, Number]);

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
    + div {
      margin-left: 1.88em;
    }
  `;
  // 정렬 Wrap
  const TextCont = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    @media screen and (max-width: 1712px) {
      font-size: 0.9346vw;
    }
  `;
  //'재학생', '응시생', '응시율'... Text
  const TextName = styled.span`
    white-space: nowrap;
    font-size: 1.25em;
    line-height: 1.69rem;
    color: #8898aa;
  `;
  // '00명', '+0명' Wrap
  const TextCountCont = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
  `;
  // '00명' Wrap
  const TextCount = styled.div`
    display: flex;
    align-items: center;
    font-size: 1em;
    line-height: 1.38rem;
    color: #999999;
  `;
  // '00명'의 숫자 Text
  const TextNumber = styled.span`
    font-weight: bold;
    font-size: 2em;
    line-height: 2.75rem;
    color: ${(props) => props.theme.textColor};
    margin-right: 0.2em;
  `;
  // '+3명' Text
  const TextIncrease = styled.span`
    font-weight: bold;
    font-size: 0.94em;
    line-height: 1.25rem;
    color: ${Title !== "응시율"
      ? CountMinusLast >= 0
        ? "#2dce89"
        : "#fb4646"
      : TestRateMinusLast >= 0
      ? "#2dce89"
      : "#fb4646"};
    margin: 0 0 0 1.25rem;
  `;

  return (
    <Cont>
      <TextCont>
        <TextName>{Title}</TextName>
        <TextCountCont>
          <TextCount>
            <TextNumber>{Title !== "응시율" ? count : TestRate}</TextNumber>
            {Title !== "반등수" ? (Title !== "응시율" ? "명" : "%") : null}
          </TextCount>
          <TextIncrease>
            {Title !== "반등수"
              ? Title !== "응시율"
                ? CountMinusLast !== 0
                  ? CountMinusLast > 0
                    ? `+${CountMinusLast}명`
                    : `${CountMinusLast}명`
                  : "-"
                : TestRateMinusLast > 0
                ? `+${TestRateMinusLast}%`
                : `${TestRateMinusLast}%`
              : null}
          </TextIncrease>
        </TextCountCont>
      </TextCont>
    </Cont>
  );
};

export default SummaryCard;
