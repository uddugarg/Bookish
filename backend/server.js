const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');


const config = require('./config/key');

const connect = mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/user', require('./routes/user'));
app.use('/api/product', require('./routes/product'));

app.use('/uploads', express.static('uploads'));

if (process.env.NODE_ENV === "production") {
    app.use(express.static('amazon-clone/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'amazon-clone', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server's Running on ${port}`);
});
