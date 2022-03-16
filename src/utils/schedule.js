import dayjs from 'dayjs'

export const getScheduleMonth = (month = dayjs().month()) => {
  // 올 해
  const year = dayjs().year()
  // 월별 첫 날 요일
  const firstDayofMonth = dayjs(new Date(year, month, 1)).day()

  let currentMonthCount = 0 - firstDayofMonth
  const dayMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++
      return dayjs(new Date(year, month, currentMonthCount))
    })
  })
  return dayMatrix
}
