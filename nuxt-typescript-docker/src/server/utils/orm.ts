import 'reflect-metadata'
import { Connection, ConnectionOptions, createConnection } from 'typeorm'
import cfg from '../config'
import logger from './logger'

const entitiesPath = '../entities/*.ts'
const ormOptions: ConnectionOptions = {
  name: 'default',
  type: 'mysql',
  timezone: 'local',
  connectTimeout: cfg.db.connectTimeout,
  supportBigNumbers: true,
  bigNumberStrings: true,
  // data config
  host: cfg.db.host,
  port: cfg.db.port,
  username: cfg.db.user,
  password: cfg.db.password,
  database: cfg.db.database,
  // orm config
  entities: [entitiesPath],
  synchronize: false,
  logging: false
}

class Database {
  public connection: Connection;

  constructor () {
    this.connectToDB()
  }

  private async connectToDB () {
    try {
      const conn = await createConnection(ormOptions)
      this.connection = conn
      logger.info(`Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`)
    } catch (err) {
      logger.error(`Database connection failed, errors: ${err}`)
    }
    return undefined
  }
}

const db = new Database()
export default db
