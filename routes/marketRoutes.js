const express = require("express");
const marketPrice = require("../controllers/currectMarketPrice");
const userAccountDetails = require("../controllers/userAccount");
const userholdings = require("../controllers/userHoldings");
const router = express.Router();


router.get('/market/:symbol', marketPrice);
router.get('/account', userAccountDetails);
router.get('/holdings', userholdings);


module.exports = router;