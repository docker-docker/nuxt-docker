import 'reflect-metadata'
import path from 'path'
import { Connection, ConnectionOptions, createConnection } from 'typeorm'
import cfg from '../config'
import logger from './logger'

const entitiesPath = [path.join(__dirname, '..', 'entities', '**', '*{.ts,.js}')]
const sqliteOrmOptions: ConnectionOptions = {
  name: 'default',
  type: 'sqlite',
  database: cfg.db.database,
  entities: entitiesPath,
  synchronize: false,
  logging: true
}
// const mysqlOrmOptions: ConnectionOptions = {
//   name: 'default',
//   type: 'mysql',
//   timezone: 'local',
//   connectTimeout: cfg.db.connectTimeout,
//   supportBigNumbers: true,
//   bigNumberStrings: true,
//   // data config
//   host: cfg.db.host,
//   port: cfg.db.port,
//   username: cfg.db.user,
//   password: cfg.db.password,
//   database: cfg.db.database,
//   // orm config
//   entities: entitiesPath,
//   synchronize: false,
//   logging: false
// }

class Database {
  public connection: Connection;

  constructor () {
    this.connectToDB()
  }

  private async connectToDB () {
    try {
      const conn = await createConnection(sqliteOrmOptions)
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
