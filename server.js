const express = require('express');
const app = express();

const urlRoutes = require('./src/routes/urlRoutes');
const analyticsRoutes = require('./src/routes/analyticsRoutes');
const authRoutes = require('./src/routes/authRoutes'); // Auth rotaları için

app.use(express.json());

// URL kısaltma ve yönlendirme rotaları
app.use('/', urlRoutes);

// Analytics rotaları (örneğin: /analytics/...)
app.use('/analytics', analyticsRoutes);

// Auth (kayıt, giriş) rotaları (örneğin: /auth/...)
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));


