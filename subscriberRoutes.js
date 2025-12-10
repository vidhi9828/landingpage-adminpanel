const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

// Get all subscribers
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Subscribe
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        email: req.body.email
    });

    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
