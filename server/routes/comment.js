const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");
const { auth } = require("../middleware/auth");

router.post("/saveComment", auth, async (req, res) => {
    const comment = new Comment(req.body)

    try {
        await comment.save();
        const result = await Comment.find({ '_id': comment._id }).populate('writer').exec();
        return res.status(200).json({ success: true, result });
    } catch (err) {
        console.log(err);
        return res.json({ success: false, err });
    }
});

router.post("/getComments", async (req, res) => {
    try {
        const comments = await Comment.find({ "postId": req.body.movieId }).populate('writer').exec();
        return res.status(200).json({ success: true, comments })
    } catch (err) {
        return res.staus(400), send(err)
    }
});

module.exports = router;
