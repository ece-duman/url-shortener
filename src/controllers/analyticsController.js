
const analyticsModel = require('../models/analyticsModel');

// Yeni tıklama kaydı oluşturma
exports.recordClick = async (req, res) => {
  try {
    const { url_id, ip_address, user_agent, referer, country, city } = req.body;

    if (!url_id) {
      return res.status(400).json({ error: 'url_id zorunludur' });
    }

    await analyticsModel.saveClick({
      url_id,
      clicked_at: new Date(),
      ip_address,
      user_agent,
      referer,
      country,
      city,
    });

    res.status(201).json({ message: 'Tıklama kaydı başarıyla oluşturuldu' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// Belirli URL için tıklama istatistiklerini getir
exports.getClicksByUrlId = async (req, res) => {
  try {
    const { url_id } = req.params;

    if (!url_id) {
      return res.status(400).json({ error: 'url_id zorunludur' });
    }

    const clicks = await analyticsModel.getClicksByUrlId(url_id);

    res.json(clicks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};
