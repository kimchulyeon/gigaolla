import styled from 'styled-components'

const Tab = styled.div`
  display: flex;
  justify-content: flex-end;
  /* padding-bottom: 50px; */
`
const Button = styled.button`
  cursor: pointer;
  padding: 4px 20px;
  margin-left: 10px;
  font-size: 16px;
  /* background: ${(props) => props.theme.btnBackgroundColor}; */
  background: ${(props) =>
    props.distributionTotal === true ? props.theme.navbackgroundColor2 : props.theme.tabBackground};

  color: ${(props) => (props.distributionTotal === true ? props.theme.mainBackground : '#000')};
  border-radius: 8px;
  border: none;
  &:active {
    background: #5d5fef;
    color: #fff;
  }
`
const Button2 = styled.button`
  cursor: pointer;
  padding: 4px 20px;
  margin-left: 10px;
  font-size: 16px;
  /* background: ${(props) => props.theme.btnBackgroundColor}; */
  background: ${(props) =>
    props.distributionTotal === false
      ? props.theme.navbackgroundColor2
      : props.theme.tabBackground};

  color: ${(props) => (props.distributionTotal === false ? props.theme.mainBackground : '#000')};
  border-radius: 8px;
  border: none;
  &:active {
    background: #5d5fef;
    color: #fff;
  }
`

const DistributionChartTab = ({ setDistributionTotal, distributionTotal }) => {
  return (
    <Tab>
      {/* 원하시는 함수 props 로 내려서 쓰시면 됩니다. */}
      <Button
        distributionTotal={distributionTotal}
        onClick={() => {
          setDistributionTotal(true)
        }}
      >
        전체
      </Button>
      <Button2
        distributionTotal={distributionTotal}
        onClick={() => {
          setDistributionTotal(false)
        }}
      >
        과목별
      </Button2>
    </Tab>
  )
}

export default DistributionChartTab
