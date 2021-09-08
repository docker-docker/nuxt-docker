import * as errorHandler from "errorhandler"
import * as express from 'express'
import {Result, ResultCode} from "../common/result";

export default (app) => {
    /**
     * Error Handler. Provides full stack
     */
    const isProd = process.env.NODE_ENV === 'production'
    if (!isProd) {
        app.use(errorHandler());
    }
    /************************************************************************************
     *                               Express Error Handling
     ***********************************************************************************/
    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
        // if (err instanceof ValidateError) {
        //     console.error(`Caught Validation Error for ${req.path}:`, err.fields);
        //     return res.status(422).json({
        //         message: "Validation Failed",
        //         details: err?.fields,
        //     });
        // }
        if (err instanceof Error) {
            const jsonResult = new Result()
            jsonResult.code = ResultCode.CODE_INTERNAL_ERROR
            jsonResult.message = err.message
            jsonResult.data = err.stack || 'no stack defined'
            return res.status(ResultCode.CODE_INTERNAL_ERROR).json(jsonResult);
        }
        next();
    });

}
