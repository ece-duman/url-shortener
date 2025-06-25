
const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Tıklama kaydı oluşturmak için POST endpoint
router.post('/clicks', analyticsController.recordClick);

// Belirli URL için tıklama istatistiklerini getirmek için GET endpoint
router.get('/clicks/:url_id', analyticsController.getClicksByUrlId);

module.exports = router;
