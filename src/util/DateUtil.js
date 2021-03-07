import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import IsBetween from 'dayjs/plugin/isBetween'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
dayjs.extend(IsBetween)

export const wordDate = function (timestamp) {
  return dayjs(timestamp).fromNow()
}
export const formatDate = function (timestamp) {
  return format(timestamp, 'YYYY-MM-DD')
}
export const formatTime = function (timestamp) {
  return format(timestamp, 'HH:mm:ss')
}
export const formatDateTime = function (timestamp) {
  return format(timestamp, 'YYYY-MM-DD HH:mm:ss')
}
export const isBetween = function (date, first, second) {
  return dayjs(date).isBetween(first, second)
}
export const formatBuildVersion = function () {
  return format(new Date(), 'YYYYMMDDHHmm')
}
export const format = function (timestamp, pattern) {
  return dayjs(timestamp).format(pattern)
}
export const now = function () {
  const _format = function (number) {
    return (number < 10 ? ('0' + number) : number)
  }
  const date = new Date()
  return date.getFullYear() + '-' + _format(date.getMonth() + 1) + '-' + _format(date.getDate())
}
export const parseDate = function (str) { // 将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
  const a = str.split(/[^0-9]/)
  return a.length === 6 ? new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]) : new Date(a[0], a[1] - 1, a[2])
  // return new Date(str)
}
export const ago = function (date) {
  let val
  const units = [{
    max: 2760000,
    value: 60000,
    name: '分钟',
    prev: '一分钟前'
  },
    {
      max: 72000000,
      value: 3600000,
      name: '小时',
      prev: '一小时前'
    },
    {
      max: 518400000,
      value: 86400000,
      name: '天',
      prev: '昨天'
    },
    {
      max: 2419200000,
      value: 604800000,
      name: '星期',
      prev: '上周'
    },
    {
      max: 28512000000,
      value: 2592000000,
      name: '月',
      prev: '上月'
    } // max: 11 months
  ]
  const diff = Math.abs(Date.now() - date.getTime())
  // less than a minute
  if (diff < 60000) {
    return '刚刚'
  }
  for (const i in units) {
    if (diff < units[i].max) {
      const divisor = units[i].value
      val = Math.round(diff / divisor)
      return val <= 1 ? units[i].prev : val + ' ' + units[i].name + '前'
    }
  }
  // 如果是年单位
  const divisor = 31536000000
  val = Math.round(diff / divisor)
  return val <= 1 ? '去年' : val + '年前'
}

export const timeWelcomeWord = function () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}
