const express = require("express");
const { brokerSSE } = require("../controllers/brokerControllers");
const router = express.Router();

// SSE endpoint for clients to connect to
router.post('/accounts/status', 
(req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');  },
    brokerSSE);

module.exports = router;