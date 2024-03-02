import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import database from './config/database.js'
import adminRoutes from './routes/admin/index.js'
import userRoutes from './routes/user/index.js'
import crypto from 'crypto'
let app = express();
let PORT = 8000



let server = http.Server(app)

mongoose.connect(database.uri);
mongoose.connection.on('error', (error) => {
  console.error('MongoDB Connection Error:', error);
});
mongoose.Promise = global.Promise;
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization, token");
    next();
});
app.get('/', (req,res) => {
    res.send("Server connected successfully!")
})
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);


server.listen(PORT, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Server started at : ' + PORT);
    }
});

