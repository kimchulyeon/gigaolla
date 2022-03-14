import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getLastMonth } from '../../utils/getLastMonth'
import CardTemplate from '../CardTemplate'
import DistributionCardTemplate from './DistributionCardTemplate'
import DistributionChart from './DistributionChart'
import DistributionChart2 from './DistributionChart2'
import DistributionChart3 from './DistributionChart3'

const Cont = styled.div`
  width: 100%;
`

const DistributionChartWrap = () => {
  //점수대별 인원 Wrap
  const params = useParams()
  const SUBJECT = params.subject

  const { thisYear, lastMonth } = getLastMonth()

  // let CHART_COMPONENT

  // switch (SUBJECT) {
  //   case '경찰':
  //     CHART_COMPONENT = DistributionChart
  //     break
  //   case '소방':
  //     CHART_COMPONENT = DistributionChart2
  //     break
  //   case '행정':
  //     CHART_COMPONENT = DistributionChart3
  //     break
  //   default:
  //     CHART_COMPONENT = DistributionChart
  // }

  if (SUBJECT === '경찰') {
    return (
      <Cont>
        <DistributionCardTemplate
          Element={DistributionChart}
          Name="점수대별 인원"
          year={thisYear}
          month={lastMonth}
          // distributionTotal={distributionTotal}
        />
      </Cont>
    )
  }

  if (SUBJECT === '소방') {
    return (
      <Cont>
        <DistributionCardTemplate
          Element={DistributionChart2}
          Name="점수대별 인원"
          year={thisYear}
          month={lastMonth}
          // distributionTotal={distributionTotal}
        />
      </Cont>
    )
  }
  if (SUBJECT === '행정') {
    return (
      <Cont>
        <DistributionCardTemplate
          Element={DistributionChart3}
          Name="점수대별 인원"
          year={thisYear}
          month={lastMonth}
          // distributionTotal={distributionTotal}
        />
      </Cont>
    )
  }

  // const Element = styled.div`
  //   width: 90%;
  //   height: 23em;
  //   margin: 3em auto 0;
  //   background: #ccc;
  // `
}

export default DistributionChartWrap
