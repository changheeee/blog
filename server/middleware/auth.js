// const { User } = require('../models/User')

// let auth = async (req, res, next) => {
//     try {
//         // 클라이언트 쿠키에서 토큰 가져옴
//         let token = req.cookies.user_auth
//         // 토큰을 복호화 후 유저 찾음
//         const user = await User.findByToken(token);
//         if (!user) {
//             return res.json({ isAuth: false, error: true });
//         }

//         req.token = token;
//         req.user = user;
//         next()
//     } catch (err) {
//         throw err
//     }
// };

// module.exports = { auth }

const { User } = require('../models/User');

const auth = async (req, res, next) => {
    try {
        // 클라이언트 쿠키에서 토큰 가져옴
        const token = req.cookies.user_auth;

        if (!token) {
            return res.json({ isAuth: false, error: true });
        }

        // 토큰을 검증하고 사용자를 찾음
        const user = await User.findByToken(token);
        if (!user) {
            return res.json({ isAuth: false, error: true });
        }

        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        throw err;
    }
};

module.exports = { auth };
