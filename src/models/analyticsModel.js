
const db = require('../config/database');

exports.saveClick = async ({ url_id, clicked_at, ip_address, user_agent, referer, country, city }) => {
  await db.query(
    `INSERT INTO analytics (url_id, clicked_at, ip_address, user_agent, referer, country, city) 
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [url_id, clicked_at, ip_address, user_agent, referer, country, city]
  );
};

exports.getClicksByUrlId = async (urlId) => {
  const res = await db.query(
    `SELECT * FROM analytics WHERE url_id = $1 ORDER BY clicked_at DESC`,
    [urlId]
  );
  return res.rows;
};
