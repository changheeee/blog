const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', async (req, res) => {
    try {
        const info = await Favorite.find({ "movieId": req.body.movieId });
        res.status(200).json({ success: true, favoriteNumber: info.length });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/favorited', async (req, res) => {
    try {
        const info = await Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom });
        let result = false;
        if (info.length !== 0) {
            result = true;
        }
        res.status(200).json({ success: true, favorited: result });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/removeFromFavorite', async (req, res) => {
    try {
        const doc = await Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        res.status(200).json({ success: true, doc })
    } catch (err) {
        return res.status(400).send(err)
    }
})

router.post('/addToFavorite', async (req, res) => {

    const favorite = new Favorite(req.body)

    try {
        await favorite.save()
        return res.status(200).json({ success: true })
    } catch (err) {
        return res.status(400).send(err)
    }

})

router.post('/getFavoritedMovie', async (req, res) => {

    try {
        const favorites = await Favorite.find({ 'userFrom': req.body.userFrom })
        return res.status(200).json({ success: true, favorites })
    } catch (err) {
        return res.staus(400), send(err)
    }

})

module.exports = router;
