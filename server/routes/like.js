const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

const { auth } = require("../middleware/auth");

//=================================
//             Likes DisLikes
//=================================

router.post("/getLikes", async (req, res) => {
    try {
        let variable = {}
        if (req.body.videoId) {
            variable = { videoId: req.body.videoId }
        } else {
            variable = { commentId: req.body.commentId }
        }

        const likes = await Like.find(variable).exec();
        res.status(200).json({ success: true, likes });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post("/getDislikes", async (req, res) => {
    try {
        let variable = {}
        if (req.body.videoId) {
            variable = { videoId: req.body.videoId }
        } else {
            variable = { commentId: req.body.commentId }
        }

        const dislikes = await Dislike.find(variable).exec();
        res.status(200).json({ success: true, dislikes });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post("/upLike", async (req, res) => {
    try {
        let variable = {}
        if (req.body.videoId) {
            variable = { videoId: req.body.videoId, userId: req.body.userId }
        } else {
            variable = { commentId: req.body.commentId, userId: req.body.userId }
        }

        const like = new Like(variable);
        const likeResult = await like.save();

        // In case DisLike Button is already clicked, we need to decrease the dislike by 1 
        const disLikeResult = await Dislike.findOneAndDelete(variable).exec();

        res.status(200).json({ success: true });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
});

router.post("/unLike", async (req, res) => {
    try {
        let variable = {}
        if (req.body.videoId) {
            variable = { videoId: req.body.videoId, userId: req.body.userId }
        } else {
            variable = { commentId: req.body.commentId, userId: req.body.userId }
        }

        const result = await Like.findOneAndDelete(variable).exec();
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
});

router.post("/unDisLike", async (req, res) => {
    try {
        let variable = {}
        if (req.body.videoId) {
            variable = { videoId: req.body.videoId, userId: req.body.userId }
        } else {
            variable = { commentId: req.body.commentId, userId: req.body.userId }
        }

        const result = await Dislike.findOneAndDelete(variable).exec();
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
});

router.post("/upDisLike", async (req, res) => {
    try {
        let variable = {}
        if (req.body.videoId) {
            variable = { videoId: req.body.videoId, userId: req.body.userId }
        } else {
            variable = { commentId: req.body.commentId, userId: req.body.userId }
        }

        const disLike = new Dislike(variable);
        const dislikeResult = await disLike.save();

        // In case Like Button is already clicked, we need to decrease the like by 1 
        const likeResult = await Like.findOneAndDelete(variable).exec();

        res.status(200).json({ success: true });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
});

module.exports = router;
