import React, { useState } from "react";
import styled from "styled-components";

import HomeAttendChart from "./HomeAttendChart";
import HomeAttendChart2 from "./HomeAttendChart2";
import HomeAttendChart3 from "./HomeAttendChart3";
import CardTemplate from "./CardTemplate";

const HomeAttendChartWrap = () => {
  const [on, setOn] = useState("attend");

  // 응시율 Wrap
  const Cont = styled.div`
    width: 100%;
  `;
  const Tab = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 1em;
  `;
  const TabTitleLabel = styled.button`
    padding: 10px 20px;
    margin-left: 10px;
    border: none;
    background: ${(props) => props.theme.btnBackgroundColor};
    color: ${(props) =>
      props.value === on ? "#FF3E00" : props.theme.chartTitleColor};
    border-radius: 8px;
    cursor: pointer;
    &.active {
      background: #5d5fef;
      color: #fff;
    }
  `;

  return (
    <Cont>
      <Tab>
        <TabTitleLabel
          onClick={() => setOn("attend")}
          className={on === "attend" ? "active" : ""}
        >
          응시율
        </TabTitleLabel>
        <TabTitleLabel
          onClick={() => setOn("total")}
          className={on === "total" ? "active" : ""}
        >
          재학생
        </TabTitleLabel>
        <TabTitleLabel
          onClick={() => setOn("test")}
          className={on === "test" ? "active" : ""}
        >
          응시생
        </TabTitleLabel>
      </Tab>
      {on !== "attend" ? (
        on === "total" ? (
          <CardTemplate
            Element={HomeAttendChart2}
            Name={"재학생"}
            Info={" 최근 6개월"}
          />
        ) : (
          <CardTemplate
            Element={HomeAttendChart3}
            Name={"응시생"}
            Info={" 최근 6개월"}
          />
        )
      ) : (
        <CardTemplate
          Element={HomeAttendChart}
          Name={"응시율"}
          Info={" 최근 6개월"}
        />
      )}
    </Cont>
  );
};

export default HomeAttendChartWrap;
