const express = require('express');
const mongoose = require("mongoose");
const path = require('path')
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);



app.use(cors());

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    });
});

const conn = "mongodb+srv://admin:admin@cluster0-pxsfz.mongodb.net/db_techblue?retryWrites=true";
mongoose.connect(conn,
    { useNewUrlParser: true }
);


app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true } ));


app.use(require('./routes'));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
server.listen(process.env.PORT || 3333);