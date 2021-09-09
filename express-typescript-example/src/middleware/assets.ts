import cfg from "../config";
import express from "express";

const staticUrlPrefix = cfg.upload.staticUrlPrefix
const staticFileLocation = cfg.upload.location
const staticFileResponse = express.static(staticFileLocation, {index: ['index.html', 'index.htm']})

export default {
    staticUrlPrefix,
    staticFileResponse
}
