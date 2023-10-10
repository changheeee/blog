const express = require('express');
const app = express();
const port = 4000;
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key.js');
const { auth } = require('./middleware/auth.js');
const { User } = require('./models/User.js');




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    // useNewUrlParser: true, // 옵션 추가
    // useUnifiedTopology: true, // 옵션 추가
    // useCreateIndex: true, // 옵션 추가1
    // useFindAndModify: false, // 옵션 추가
}).then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('');
});


app.get('/api/hello', (req, res) => {
    res.send('MovieApp입니다.');
})


app.post('/api/users/register', async (req, res) => {
    const user = new User(req.body)

    const result = await user.save().then(() => {
        res.status(200).json({
            success: true
        })
    }).catch((err) => {
        res.json({ success: false, err })
    })
})

// app.post('/login', (req, res) => {

//     // 요청된 이메일이 DB에 있는지 조회
//     User.findOne({ email: req.body.email }, (err, user) => {
//         if (!user) {
//             return res.json({
//                 loginSuccess: false,
//                 message: "제공된 이메일에 해당하는 유저가 없습니다."
//             })
//         }
//         // 해당 이메일이 있다면 비밀번호가 맞는지 확인
//         user.comparePassword(req.body.password, (err, isMatch) => {
//             if (!isMatch)
//                 return res.json({
//                     loginSuccess: false,
//                     message: "비밀번호가 틀렸습니다."
//                 })
//             // 비밀번호 확인되면 토큰 생성
//         })
//     })
// })

app.post('/api/users/login', async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        const isMatch = await user.comparePassword(req.body.password)
        console.log(isMatch)
        if (!isMatch) {
            return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
        }

        const token = await user.generateToken()
        res.cookie("user_auth", token).status(200).json({ loginSuccess: true, userId: user._id })
    } catch (err) {
        return res.status(400).send(err)
    }
})



app.get('/api/users/auth', auth, (req, res) => {

    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? true : false,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, async (req, res) => {
    try {
        await User.findOneAndUpdate(
            { _id: req.user._id },
            { token: '' }
        )

        return res.status(200).send({
            success: true
        })
    } catch (err) {
        return res.json({ success: false, err })
    }
})

app.use('/api/favorite', require('./routes/favorite'));
app.use('/api/users', require('./routes/users'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/like', require('./routes/like'));



app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});