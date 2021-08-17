const express = require('express');

const router = express.Router();

router.use(require('./candidtaeRoutes'));

module.exports = router;