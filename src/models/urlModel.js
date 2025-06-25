const db = require('../config/database');

exports.findByOriginalUrl = async (originalUrl) => {
  const res = await db.query('SELECT * FROM urls WHERE original_url = $1', [originalUrl]);
  return res.rows[0];
};

exports.findByShortCode = async (shortCode) => {
  const res = await db.query('SELECT * FROM urls WHERE short_code = $1', [shortCode]);
  return res.rows[0];
};

// Custom alias için sorgu fonksiyonu
exports.findByCustomAlias = async (customAlias) => {
  const res = await db.query('SELECT * FROM urls WHERE custom_alias = $1', [customAlias]);
  return res.rows[0];
};

// save fonksiyonu güncellendi, artık customAlias da kaydediliyor
exports.save = async ({ originalUrl, shortCode, customAlias }) => {
  await db.query(
    'INSERT INTO urls (original_url, short_code, custom_alias) VALUES ($1, $2, $3)',
    [originalUrl, shortCode, customAlias || null]
  );
};


