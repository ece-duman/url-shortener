const db = require('../config/database');

exports.findByOriginalUrl = async (originalUrl) => {
  const res = await db.query('SELECT * FROM urls WHERE original_url = $1', [originalUrl]);
  return res.rows[0];
};

exports.findByShortCode = async (shortCode) => {
  const res = await db.query('SELECT * FROM urls WHERE short_code = $1', [shortCode]);
  return res.rows[0];
};

exports.save = async ({ originalUrl, shortCode }) => {
  await db.query('INSERT INTO urls (original_url, short_code) VALUES ($1, $2)', [originalUrl, shortCode]);
};

