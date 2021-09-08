import * as winston from "winston"
import 'winston-daily-rotate-file'
import * as path from "path"

import cfg from '../config'

const logPath = path.normalize(cfg.logs)
const isProd = process.env.NODE_ENV === 'production'
const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, {message: info.stack})
    }
    return info
})
// 参考文档: https://github.com/winstonjs/logform
const consoleLoggerFormat = winston.format.combine(
    enumerateErrorFormat(),
    winston.format.colorize({all: true}),
    winston.format.errors({stack: true}),
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.printf((info) => {
        return `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`
    })
)
const fileLoggerFormat = winston.format.combine(enumerateErrorFormat(),
    winston.format.uncolorize({message: false, raw: false}),
    winston.format.errors({stack: true}),
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.printf((info) => {
        return `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`
    })
)
const logger = winston.createLogger({
    exitOnError: false,
    handleExceptions: true
});
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
    maxSize: '10m', // 10MB
    maxFiles: '1d'
})
// override the transports
if (!isProd) {
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

export default logger
