/**
 * 根据雪花算法生成对应的uuid
 * @returns {*}
 */
export const snowflakeId = function () {
  const Snowflake = require('better-snowflake')
  const workerId = randomNum(0, 31); const datacenterId = randomNum(0, 31)
  const idWorker = new Snowflake(workerId, datacenterId)
  const uuid = idWorker.nextId()
  return uuid
}
/**
 * 得到最小的和最大的数之间的随机数，包含最小值和最大值
 * @returns {string}
 */
export const randomNum = function (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  const number = Math.floor(Math.random() * (max - min + 1)) + min
  // const number = Math.random() * (max - min) + min  ,不包含最大值，只包含最小值
  return number
}
/**
 * 生成随机len位数字
 */
export const randomNumWithLen = (len, date) => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len || 4)
  if (date) { random = random + Date.now() }
  return random
}
/**
 * 产生唯一的字符串
 * @returns {string}
 */
export const uniqueStr = function () {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}
/**
 * 产生一个uuid
 * @param prefix
 * @return {string}
 */
let unique = 0
export const uuid = function (prefix) {
  const time = Date.now()
  const s = []
  const hexDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < 10; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = ''
  const random = s.join('')
  unique++
  return (prefix ? prefix + '_' : '') + random + unique + String(time)
}
/**
 * 将阿拉伯数字翻译成中文的大写数字
 */
export const numberToChinese = (num) => {
  const AA = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
  const BB = ['', '十', '百', '仟', '萬', '億', '点', '']
  const a = ('' + num).replace(/(^0*)/g, '').split('.')
  let k = 0
  let re = ''
  for (let i = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re
        break
      case 4:
        if (!new RegExp('0{4}//d{' + (a[0].length - i - 1) + '}$')
          .test(a[0])) { re = BB[4] + re }
        break
      case 8:
        re = BB[5] + re
        BB[7] = BB[5]
        k = 0
        break
    }
    if (k % 4 === 2 && a[0].charAt(i + 2) !== 0 && a[0].charAt(i + 1) === 0) { re = AA[0] + re }
    if (a[0].charAt(i) !== 0) { re = AA[a[0].charAt(i)] + BB[k % 4] + re }
    k++
  }

  if (a.length > 1) { // 加上小数部分(如果有小数部分)
    re += BB[6]
    for (let i = 0; i < a[1].length; i++) { re += AA[a[1].charAt(i)] }
  }
  if (re === '一十') { re = '十' }
  // eslint-disable-next-line unicorn/prefer-starts-ends-with
  if (re.match(/^一/) && re.length === 3) { re = re.replace('一', '') }
  return re
}

/**
 * 将数字转换为大写金额
 */
export const changeToChinese = (Num) => {
  // 判断如果传递进来的不是字符的话转换为字符
  if (typeof Num === 'number') {
    // eslint-disable-next-line no-new-wrappers
    Num = new String(Num)
  };
  Num = Num.replace(/,/g, '') // 替换tomoney()中的“,”
  Num = Num.replace(/ /g, '') // 替换tomoney()中的空格
  Num = Num.replace(/￥/g, '') // 替换掉可能出现的￥字符
  if (isNaN(Num)) { // 验证输入的字符是否为数字
    // alert("请检查小写金额是否正确");
    return ''
  };
  // 字符处理完毕后开始转换，采用前后两部分分别转换
  const part = String(Num).split('.')
  // eslint-disable-next-line no-var
  var newchar = ''
  // 小数点前进行转化
  // eslint-disable-next-line no-var
  for (var i = part[0].length - 1; i >= 0; i--) {
    if (part[0].length > 10) {
      return ''
      // 若数量超过拾亿单位，提示
    }
    // eslint-disable-next-line no-var
    var tmpnewchar = ''
    // eslint-disable-next-line no-var
    var perchar = part[0].charAt(i)
    switch (perchar) {
      case '0':
        tmpnewchar = '零' + tmpnewchar
        break
      case '1':
        tmpnewchar = '壹' + tmpnewchar
        break
      case '2':
        tmpnewchar = '贰' + tmpnewchar
        break
      case '3':
        tmpnewchar = '叁' + tmpnewchar
        break
      case '4':
        tmpnewchar = '肆' + tmpnewchar
        break
      case '5':
        tmpnewchar = '伍' + tmpnewchar
        break
      case '6':
        tmpnewchar = '陆' + tmpnewchar
        break
      case '7':
        tmpnewchar = '柒' + tmpnewchar
        break
      case '8':
        tmpnewchar = '捌' + tmpnewchar
        break
      case '9':
        tmpnewchar = '玖' + tmpnewchar
        break
    }
    switch (part[0].length - i - 1) {
      case 0:
        tmpnewchar = tmpnewchar + '元'
        break
      case 1:
        if (perchar !== 0) { tmpnewchar = tmpnewchar + '拾' }
        break
      case 2:
        if (perchar !== 0) { tmpnewchar = tmpnewchar + '佰' }
        break
      case 3:
        if (perchar !== 0) { tmpnewchar = tmpnewchar + '仟' }
        break
      case 4:
        tmpnewchar = tmpnewchar + '万'
        break
      case 5:
        if (perchar !== 0) { tmpnewchar = tmpnewchar + '拾' }
        break
      case 6:
        if (perchar !== 0) { tmpnewchar = tmpnewchar + '佰' }
        break
      case 7:
        if (perchar !== 0) { tmpnewchar = tmpnewchar + '仟' }
        break
      case 8:
        tmpnewchar = tmpnewchar + '亿'
        break
      case 9:
        tmpnewchar = tmpnewchar + '拾'
        break
    }
    // eslint-disable-next-line no-redeclare,no-var
    var newchar = tmpnewchar + newchar
  }
  // 小数点之后进行转化
  if (Num.includes('.')) {
    if (part[1].length > 2) {
      // alert("小数点之后只能保留两位,系统将自动截断");
      part[1] = part[1].substr(0, 2)
    }
    for (i = 0; i < part[1].length; i++) {
      tmpnewchar = ''
      perchar = part[1].charAt(i)
      switch (perchar) {
        case '0':
          tmpnewchar = '零' + tmpnewchar
          break
        case '1':
          tmpnewchar = '壹' + tmpnewchar
          break
        case '2':
          tmpnewchar = '贰' + tmpnewchar
          break
        case '3':
          tmpnewchar = '叁' + tmpnewchar
          break
        case '4':
          tmpnewchar = '肆' + tmpnewchar
          break
        case '5':
          tmpnewchar = '伍' + tmpnewchar
          break
        case '6':
          tmpnewchar = '陆' + tmpnewchar
          break
        case '7':
          tmpnewchar = '柒' + tmpnewchar
          break
        case '8':
          tmpnewchar = '捌' + tmpnewchar
          break
        case '9':
          tmpnewchar = '玖' + tmpnewchar
          break
      }
      if (i === 0) { tmpnewchar = tmpnewchar + '角' }
      if (i === 1) { tmpnewchar = tmpnewchar + '分' }
      newchar = newchar + tmpnewchar
    }
  }
  // 替换所有无用汉字
  while (newchar.search('零零') !== -1) { newchar = newchar.replace('零零', '零') }
  newchar = newchar.replace('零亿', '亿')
  newchar = newchar.replace('亿万', '亿')
  newchar = newchar.replace('零万', '万')
  newchar = newchar.replace('零元', '元')
  newchar = newchar.replace('零角', '')
  newchar = newchar.replace('零分', '')
  if (newchar.charAt(newchar.length - 1) === '元') {
    newchar = newchar + '整'
  }
  return newchar
}
/**
 * 格式化手机号码隐藏
 * @param num
 * @return {Integer|void|string|*}
 */
export const formatMobile = function (num) {
  // 格式化手机号码
  const isMobile = /^1[0-9]{10}$/.test(num)
  if (isMobile) {
    num = num.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
  }
  return num
}
/**
 * 金额显示
 * @param money
 * @return {string}
 */
export const formatMoney = function (money) {
  // 金额格式化
  return parseFloat(money).toFixed(2).toString().split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(
    /\,$/, '').split('').reverse().join('')
}
/**
 * 判断点是否在一个圈里面
 * @param point
 * @param circle
 * @param r
 * @return {boolean}
 */
export const pointInsideCircle = function (point, circle, r) {
  if (r === 0) { return false }
  const dx = circle[0] - point[0]
  const dy = circle[1] - point[1]
  return dx * dx + dy * dy <= r * r
}
