const express = require('express');
const router = express.Router();
const { getData } = require('../services/mockApiService');

router.get('/', async(req, res) => {
  try {
    const data = await getData();
    res.status(200).json(data);
  } catch (error) {
    console.error('[error]', error.message);
    res.status(502).json({error: 'No se pudo obtener datos del origen.'});
  }
});

module.exports = router;
