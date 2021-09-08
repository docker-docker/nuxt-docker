import * as cors from 'cors'

const corsOptionsExt = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}
const corsMiddleware = cors(corsOptionsExt)
export default corsMiddleware
