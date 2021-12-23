const { Router } = require('express');
const accommodationController = require('../controllers/accommodationController');

const router = Router();

router.get('/accommodation', accommodationController.accommodation);

module.exports = router;