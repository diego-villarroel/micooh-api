const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware: solo acepta get
app.use((req,res,next) => {
  if (req.method !== 'GET') {
    return res.status(405).json({error: 'Method not Allow'});
  }
  next();
});

// Middleware rate limiting 
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  message: {error: 'Too many requests, please try again later.'}
});

app.use(limiter);

// Rutas
app.use('/bancosdesangre', require('./routes/bancosdesangre'));

// 404 para cualquier otra ruta
app.use((req,res) => {
  res.status(404).json({ error: 'Not Found'})
})

module.exports = app;
