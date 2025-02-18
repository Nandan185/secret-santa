const express = require('express');
const router = express.Router();
const { generateSecretSantaCSV } = require('../controllers/secretSantaController');

router.post('/assign', generateSecretSantaCSV);

module.exports = router;
