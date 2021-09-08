import logger from "../utils/logger"
import {FileUpload} from "../entities/FileUpload"
import {getManager} from "typeorm";
import idGenerator from "../utils/id-generator";

const fileService = {
    upload: async (data: object) => {
        logger.info('Saving uploaded file data: %s', JSON.stringify(data))
        const fileUpload = new FileUpload()
        fileUpload.id = idGenerator.nextId().toString()
        fileUpload.fileToken=idGenerator.nextId().toString()
        await getManager().save(fileUpload)
        return fileUpload
    },
    deleteFile: (data) => {
        logger.info('Deleting file data: %s', JSON.stringify(data))
    },
    getFilesByToken: (token) => {
    }
}
export default fileService
