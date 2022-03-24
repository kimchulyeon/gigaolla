import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import reset from '../image/reset.svg'
import resetDark from '../image/reset_dark.svg'
import calendar from '../image/tab_calendar.svg'
import calendarDark from '../image/tab_calendar_dark.svg'
import { forwardRef } from 'react'
import { ko } from 'date-fns/esm/locale'
import { useRecoilValue } from 'recoil'
import { isDarkAtom } from '../utils/atoms'

const Tab = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 11px;
`
const Button = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  margin-left: 10px;
  background: ${(props) => props.theme.btnBackgroundColor};
  color: ${(props) => props.theme.chartTitleColor};
  border-radius: 8px;
  border: none;
  &.active {
    background: #5d5fef;
    color: #fff;
  }
  &.reset {
    margin-right: 15px;
    margin-left: 0;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const CalendarContainer = styled.div`
  position: relative;
  min-width: 165px;
  max-width: 215px;
  img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 17px;
    z-index: 1;
    width: 24px;
  }
`
const DatePickerWrap = styled.div`
  display: flex;
  padding: 11px 15px 10px 48px;
  box-sizing: border-box;
  border-radius: 8px;
  background: ${(props) => props.theme.btnBackgroundColor};
  color: ${(props) => props.theme.textColor};
  .custom-input {
    font-family: 'Noto Sans';
    font-size: 14px;
    letter-spacing: -0.6px;
  }
  .react-datepicker {
    width: 344px;
    height: 258px;
    border-radius: 25px;
    border: none;
    padding: 24px 0;
    box-sizing: border-box;
    filter: drop-shadow(0px 16px 24px rgba(0, 0, 0, 0.06))
      drop-shadow(0px 2px 6px rgba(0, 0, 0, 0.04)) drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.04));
    .react-datepicker__triangle {
      display: none;
    }
    .react-datepicker__header {
      background-color: #fff;
      border-bottom: none;
      border-radius: 25px;
      padding: 0;
    }
    .react-datepicker__month-container {
      height: 100%;
      #year {
        width: 82px;
        height: 40px;
        background: #f8f7fa;
        border-radius: 8px;
        border: none;
        padding-left: 16px;
        box-sizing: border-box;
        color: #5d5fef;
        font-size: 14px;
      }
      .react-datepicker__month {
        display: flex;
        flex-wrap: wrap;
        .react-datepicker__month-text {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .react-datepicker__month-wrapper {
          flex-basis: 100%;
          display: flex;
          justify-content: space-evenly;
          .react-datepicker__month--in-range {
            background: rgba(93, 95, 239, 0.3);
            color: #000;
          }
          .react-datepicker__month--range-start,
          .react-datepicker__month--range-end,
          .react-datepicker__month-text--keyboard-selected {
            background: #5d5fef;
            color: #fff;
          }
          .react-datepicker__month--disabled {
            background: #fff !important;
            color: #ccc !important;
          }
        }
      }
    }
    &.compare {
      .react-datepicker__month {
        .react-datepicker__month-wrapper {
          .react-datepicker__month--in-range {
            background: #fff;
          }
          .react-datepicker__month--range-start,
          .react-datepicker__month--range-end,
          .react-datepicker__month-text--keyboard-selected {
            background: #5d5fef;
            color: #fff;
          }
        }
      }
    }
  }
`

const ChartTab = ({
  setChartView,
  view,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  maxDate,
  setMaxDate,
  compareStartDate,
  setCompareStartDate,
  compareEndDate,
  setCompareEndDate,
}) => {
  const isDark = useRecoilValue(isDarkAtom)
  const CustomInput = forwardRef(({ value, onClick }, ref) => {
    const compareValue = value.split('-').join(',')
    const lineValue = value.split('-').join('~')
    return (
      <div className="custom-input" onClick={onClick} ref={ref}>
        {view === 'bar' ? value : view === 'compareBar' ? compareValue : lineValue}
      </div>
    )
  })

  const MIN_YEAR = 2021
  const MAX_YEAR = new Date().getFullYear()
  let select = []
  for (let i = 0; i <= MAX_YEAR - MIN_YEAR; i++) {
    const option = 2021 + i
    select.push(option)
  }
  let date = new Date()
  date.setMonth(date.getMonth() - 5)

  return (
    <Tab>
      <Button
        className="reset"
        onClick={() => {
          setChartView('bar')
          setStartDate(date)
          setEndDate(new Date())
          setMaxDate(new Date())
          setCompareStartDate(new Date())
          setCompareEndDate(new Date())
        }}
      >
        {isDark ? <img src={resetDark} alt="resetDark" /> : <img src={reset} alt="reset" />}
      </Button>
      <CalendarContainer>
        {isDark ? (
          <img src={calendarDark} alt="calendarDark" className="navicon" />
        ) : (
          <img src={calendar} alt="calendar" className="navicon" />
        )}

        <DatePickerWrap>
          {view === 'bar' ? (
            <DatePicker
              className="datepicker"
              selected={new Date()}
              dateFormat="yyyy년 MM월 dd일"
              disabled
              customInput={<CustomInput />}
              locale={ko}
            />
          ) : view === 'compareBar' ? (
            <DatePicker
              className="datepicker"
              calendarClassName="compare"
              renderCustomHeader={({ date, changeYear }) => (
                <div>
                  <select
                    value={new Date(date).getFullYear()}
                    name="year"
                    id="year"
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {select.map((option) => (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              selected={compareStartDate}
              startDate={compareStartDate}
              endDate={compareEndDate}
              minDate={new Date('2021/10')}
              maxDate={new Date()}
              dateFormat="yyyy년 MM월"
              showMonthYearPicker
              customInput={<CustomInput />}
              locale={ko}
              selectsRange
              disabledKeyboardNavigation
              onChange={(dates) => {
                const [start, end] = dates
                setCompareStartDate(start)
                setCompareEndDate(end)
              }}
            />
          ) : (
            <DatePicker
              className="datepicker"
              renderCustomHeader={({ date, changeYear }) => (
                <div>
                  <select
                    value={new Date(date).getFullYear()}
                    name="year"
                    id="year"
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {select.map((option) => (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              selected={startDate}
              locale={ko}
              showMonthYearPicker
              startDate={startDate}
              endDate={endDate}
              minDate={new Date('2021/10')}
              maxDate={maxDate}
              dateFormat="yyyy년 MM월"
              customInput={<CustomInput />}
              selectsRange
              disabledKeyboardNavigation
              onChange={(dates) => {
                const [start, end] = dates
                setStartDate(start)
                setEndDate(end)
                let startdate = new Date(start)
                startdate.setMonth(start.getMonth() + 5)
                setMaxDate(startdate)
              }}
            />
          )}
        </DatePickerWrap>
      </CalendarContainer>
      {/* 원하시는 함수 props 로 내려서 쓰시면 됩니다. */}
      <Button
        className={view === 'compareBar' ? 'active' : ''}
        onClick={() => setChartView('compareBar')}
      >
        비교
      </Button>
      <Button className={view === 'line' ? 'active' : ''} onClick={() => setChartView('line')}>
        추이
      </Button>
    </Tab>
  )
}

export default ChartTab
