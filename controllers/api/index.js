const router = require('express').Router();
const userRoutes = require('./userRoutes');
const searchRoutes = require('./searchRoutes');
const locationRoutes = require('./locationRoutes')

router.use('/users',userRoutes);
router.use('/search', searchRoutes);
router.use('/location', locationRoutes);


module.exports = router;
