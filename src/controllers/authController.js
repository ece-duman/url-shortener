const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel'); // Kullanıcı sorguları için

// Kayıt işlemi
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Kullanıcı adı daha önce alınmış mı kontrol et
    const existingUser = await userModel.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Kullanıcı adı zaten alınmış' });
    }

    // Şifreyi hash'le
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Yeni kullanıcı oluştur
    const newUser = await userModel.create({ username, email, passwordHash });

    res.status(201).json({ message: 'Kayıt başarılı', userId: newUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// Giriş işlemi
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kullanıcıyı bul
    const user = await userModel.findByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Kullanıcı bulunamadı' });
    }

    // Şifreyi kontrol et
    const isMatch = await bcrypt.compare(password, user.password_hash); // **user.passwordHash değil, user.password_hash olmalı**
    if (!isMatch) {
      return res.status(401).json({ error: 'Hatalı şifre' });
    }

    // JWT token oluştur
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Token'ı gönder
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};


