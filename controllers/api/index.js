const router = require('express').Router();
const dashboardRoutes = require('./dashboardRoutes');
const userRoutes = require('./userRoutes')

router.use('/users', userRoutes)
router.use('/dashboard', dashboardRoutes);

module.exports = router;