const router = require('express').Router();
const { Location } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await Location.create({
        ...req.body, 
        user_id: req.session.user_id
    });

    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
});

module.exports = router;