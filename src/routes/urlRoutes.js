const express = require('express');
const router = express.Router();
const { shortenUrl, redirectUrl } = require('../controllers/urlController');

// POST /shorten - URL kısaltma isteği
router.post('/shorten', shortenUrl);

// GET /:code - kısa kodla orijinal URL'ye yönlendirme
router.get('/:code', redirectUrl);

module.exports = router;

