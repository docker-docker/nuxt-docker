const path = require('path')
const winston = require('winston')
require('winston-daily-rotate-file')
const cfg = require('../config')
const isDev = process.env.NODE_ENV === 'development'
const logPath = path.normalize(cfg.logs)
const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack })
  }
  return info
})

// 参考文档: https://github.com/winstonjs/logform
const consoleLoggerFormat = winston.format.combine(enumerateErrorFormat(),
  winston.format.colorize({ all: true }),
  winston.format.errors({ stack: true }),
  winston.format.timestamp(),
  winston.format.splat(),
  winston.format.printf((info) => {
    return `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`
  })
)
const fileLoggerFormat = winston.format.combine(enumerateErrorFormat(),
  winston.format.uncolorize({ message: false, raw: false }),
  winston.format.errors({ stack: true }),
  winston.format.timestamp(),
  winston.format.splat(),
  winston.format.printf((info) => {
    return `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`
  })
)
const logger = winston.createLogger({
  json: false,
  exitOnError: false,
  handleExceptions: true
})
const consoleTransport = new winston.transports.Console({
  level: 'debug',
  format: consoleLoggerFormat,
  handleExceptions: true
})
const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
  level: 'info',
  format: fileLoggerFormat,
  filename: '%DATE%.log',
  dirname: `${logPath}`,
  handleExceptions: true,
  humanReadableUnhandledException: true,
  maxsize: '10m', // 10MB
  maxFiles: '1d'
})
// override the transports
if (isDev) {
  winston.addColors({
    info: 'bold blue',
    warn: 'italic yellow',
    error: 'bold red',
    debug: 'green'
  })
  logger.add(consoleTransport)
  logger.add(dailyRotateFileTransport)
} else {
  logger.add(dailyRotateFileTransport)
}
module.exports = logger
// below code is used for morgan
// module.exports.stream = {
//   write (message, encoding) {
//     logger.info(message)
//   }
// }
