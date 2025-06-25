const express = require('express');
const app = express();
const urlRoutes = require('./src/routes/urlRoutes');
const analyticsRoutes = require('./src/routes/analyticsRoutes'); // Yeni eklenen

app.use(express.json());

// URL kısaltma ve yönlendirme rotaları
app.use('/', urlRoutes);

// Analytics rotaları (örneğin: /analytics/...)
app.use('/analytics', analyticsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));

