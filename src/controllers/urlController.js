
const validUrl = require('valid-url');
const { generateShortCode } = require('../utils/shortCodeGenerator');
const urlModel = require('../models/urlModel');

exports.shortenUrl = (req, res) => {
  const { originalUrl } = req.body;

  // URL geçerlilik kontrolü
  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json({ error: 'Geçersiz URL' });
  }

  // Daha önce aynı URL kısaltılmışsa onu döndür
  const existingEntry = urlModel.findByOriginalUrl(originalUrl);
  if (existingEntry) {
    return res.json({ shortUrl: `${req.headers.host}/${existingEntry.shortCode}` });
  }

  // Yeni kısa kod oluştur
  const shortCode = generateShortCode();

  // Veriyi kaydet
  urlModel.save({ originalUrl, shortCode });

  res.json({ shortUrl: `${req.headers.host}/${shortCode}` });
};

exports.redirectUrl = (req, res) => {
  const { code } = req.params;

  // Kısa koda karşılık gelen URL'yi bul
  const urlEntry = urlModel.findByShortCode(code);

  if (urlEntry) {
    // Yönlendir
    return res.redirect(urlEntry.originalUrl);
  } else {
    return res.status(404).json({ error: 'URL bulunamadı' });
  }
};
