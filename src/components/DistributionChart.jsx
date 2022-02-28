import React from "react";
import styled from "styled-components";

import CardTemplate from "./CardTemplate";

const DistributionChart = () => {
  const Cont = styled.div`
    width: 100%;
    height: 100%;
  `;
  const Element = styled.div`
    width: 90%;
    height: 23em;
    margin: 3em auto 0;
    background: #ccc;
  `;
  return (
    <Cont>
      <CardTemplate Element={Element} Name={"점수대별 인원"} Info={"2022-02"} />
    </Cont>
  );
};

export default DistributionChart;