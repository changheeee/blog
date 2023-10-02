const express = require('express');
const app = express();
const port = 4000;
// const bodyParser = require('body-parser');

const config = require('./config/key.js');

const { User } = require('./models/User.js');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    // useNewUrlParser: true, // 옵션 추가
    // useUnifiedTopology: true, // 옵션 추가
    // useCreateIndex: true, // 옵션 추가1
    // useFindAndModify: false, // 옵션 추가
}).then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('즐거운 추석입니다. 10월 2일');
});

app.post('/register', (req, res) => {
    const user = new User(req.body);

    user.save() // 이 부분에서 콜백 함수를 제거하고 프로미스를 반환하도록 수정
        .then(userInfo => {
            return res.status(200).json({
                success: true,
            });
        })
        .catch(err => {
            return res.json({ success: false, err });
        });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});