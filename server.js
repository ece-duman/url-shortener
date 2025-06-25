const express = require('express');
const app = express();
const urlRoutes = require('./src/routes/urlRoutes');

// JSON gövdeyi (body) okumak için middleware
app.use(express.json());

// Tüm rotaları ana dizinde kullan
app.use('/', urlRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));

