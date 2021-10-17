import path from 'path'
// TODO path issue here
const isProd = process.env.NODE_ENV === 'production'
const dbPath = isProd ? path.resolve(__dirname, '..', 'data.db') : path.resolve(__dirname, '..', 'data.db')

export default { dbPath }
