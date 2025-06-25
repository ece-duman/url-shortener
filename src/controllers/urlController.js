const validUrl = require('valid-url');
const { generateShortCode } = require('../utils/shortCodeGenerator');
const urlModel = require('../models/urlModel');

exports.shortenUrl = async (req, res) => {
  try {
    const { originalUrl, customAlias } = req.body;

    // URL geçerlilik kontrolü
    if (!validUrl.isUri(originalUrl)) {
      return res.status(400).json({ error: 'Geçersiz URL' });
    }

    // Eğer customAlias varsa önce bu alias'ın kullanılıp kullanılmadığını kontrol et
    if (customAlias) {
      const existingAlias = await urlModel.findByCustomAlias(customAlias);
      if (existingAlias) {
        return res.status(400).json({ error: 'Bu özel alias zaten kullanılıyor' });
      }
    }

    // Daha önce aynı URL kısaltılmışsa onu döndür (customAlias verilirse bu kontrolü atlayabiliriz)
    if (!customAlias) {
      const existingEntry = await urlModel.findByOriginalUrl(originalUrl);
      if (existingEntry) {
        const host = `${req.protocol}://${req.headers.host}`;
        return res.json({ shortUrl: `${host}/${existingEntry.short_code}` });
      }
    }

    // Yeni kısa kod oluştur (customAlias varsa onu kullan)
    const shortCode = customAlias || generateShortCode();

    // Veriyi kaydet
    await urlModel.save({ originalUrl, shortCode, customAlias });

    const host = `${req.protocol}://${req.headers.host}`;
    res.json({ shortUrl: `${host}/${shortCode}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const { code } = req.params;

    // Kısa koda karşılık gelen URL'yi bul
    const urlEntry = await urlModel.findByShortCode(code);

    if (urlEntry) {
      // Yönlendir
      return res.redirect(urlEntry.original_url);
    } else {
      return res.status(404).json({ error: 'URL bulunamadı' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};


