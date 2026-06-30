const axios = require('axios');
const NodeCache = require('node-cache');

const cache = new NodeCache({
  stdTTL: parseInt(process.env.CACHE_TTL_SECONDS) || 60
});

const CACHE_KEY = 'bancossangreanimal';

async function getData() {
  const cached = cache.get(CACHE_KEY);
  if (cached) {
    console.log('[cache] HIT');
    return cached;
  }

  console.log('[cache] MISS — consultando MockAPI');
  console.log('[url]', process.env.MOCK_API_URL);
  const response = await axios.get(process.env.MOCK_API_URL);
  cache.set(CACHE_KEY, response.data);
  return response.data;
}

module.exports = { getData };
