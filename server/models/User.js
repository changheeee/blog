// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const jwt = require('jsonwebtoken');


// const userSchema = mongoose.Schema({
//     name: {
//         type: String,
//         maxlength: 50,
//     },
//     email: {
//         type: String,
//         trim: true, //space 없에줌 ckd gml@naver.com > ckdgml@naver.com
//     },
//     password: {
//         type: String,
//         minlength: 5
//     },
//     lastname: {
//         type: String,
//         maxlength: 50
//     },
//     role: {
//         type: Number,
//         default: 0
//     },
//     image: String,
//     token: {
//         type: String
//     },
//     tokenExp: {
//         type: Number
//     }
// })

// userSchema.pre('save', function (next) {
//     let user = this;

//     if (user.isModified('password')) {
//         // 비밀번호를 암호화 시킨다.
//         bcrypt.genSalt(saltRounds, function (err, salt) {
//             if (err) return next(err)

//             bcrypt.hash(user.password, salt, function (err, hash) {
//                 if (err) return next(err);
//                 user.password = hash;
//                 next()
//             })
//         })
//     } else {
//         next()
//     }

// })

// userSchema.methods.comparePassword = function (plainPassword) {
//     console.log(plainPassword)
//     return new Promise((resolve, reject) => {
//         bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(isMatch)
//             }
//         })
//     })
// }

// userSchema.methods.generateToken = function () {
//     const user = this
//     const token = jwt.sign({ userId: user._id.toHexString() }, "secretToken")

//     user.token = token
//     return user.save()
//         .then(() => token)
// }


// userSchema.statics.findByToken = function (token) {
//     const user = this

//     return new Promise((resolve, reject) => {
//         jwt.verify(token, 'secretToken', (err, decoded) => {
//             if (err) {
//                 reject(err)
//             }

//             user.findOne({ '_id': decoded.userId, 'token': token })
//                 .then(user => {
//                     resolve(user)
//                 })
//                 .catch(err => {
//                     reject(err)
//                 })
//         })
//     })
// }



// const User = mongoose.model('User', userSchema)

// module.exports = { User }


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

// 'secretToken' 값 설정 (임의로 선택한 시크릿 토큰)
const secretToken = 'yourSecretToken';

// 사용자 스키마 정의
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true, // 공백 제거, 예: "ckd gml@naver.com" -> "ckdgml@naver.com"
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// 'save' 이벤트 전(pre)에 비밀번호 암호화
userSchema.pre('save', function (next) {
    let user = this;

    if (user.isModified('password')) {
        // 비밀번호를 암호화
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next()
            })
        })
    } else {
        next()
    }
})

// 비밀번호 비교 메서드
userSchema.methods.comparePassword = function (plainPassword) {
    console.log(plainPassword)
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
            if (err) {
                reject(err)
            } else {
                resolve(isMatch)
            }
        })
    })
}

// JWT 토큰 생성 메서드
userSchema.methods.generateToken = function () {
    const user = this
    const token = jwt.sign({ userId: user._id.toHexString() }, secretToken)

    user.token = token
    return user.save()
        .then(() => token)
}

// JWT 토큰 검증 및 사용자 찾기 메서드
userSchema.statics.findByToken = function (token) {
    const user = this

    return new Promise((resolve, reject) => {
        jwt.verify(token, secretToken, (err, decoded) => {
            if (err) {
                reject(err)
            }

            User.findOne({ '_id': decoded.userId, 'token': token }) // 'User'로 수정
                .then(user => {
                    resolve(user)
                })
                .catch(err => {
                    reject(err)
                })
        })
    })
}

// User 모델 정의
const User = mongoose.model('User', userSchema)

module.exports = { User }
