const { Router } = require('express');
const { getStatistics } = require('../models/statistics');

const router = Router();

router.get('/', async (request, response) => {
  try {
    const statistics = await getStatistics();
    return response.json(statistics);
  } catch (error) {
    console.error(error);
    return response.status(404).end('Error');
  }
});

module.exports = router;
