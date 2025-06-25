const db = require('../config/database');

exports.findByUsername = async (username) => {
  const res = await db.query('SELECT * FROM users WHERE username = $1', [username]);
  return res.rows[0];
};

exports.create = async ({ username, email, passwordHash }) => {
  const res = await db.query(
    'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
    [username, email, passwordHash]
  );
  return res.rows[0];
};



