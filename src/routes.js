const express = require('express');
const routes = express.Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');
// GET/ POST/ DELETE/ PUT

routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);


routes.post(
    "/boxes/:id/files", 
    multer(multerConfig).single("file"),
    FileController.store
);

module.exports = routes;