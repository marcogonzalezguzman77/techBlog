const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const commentaryRoutes = require('./commentaryRoutes');
const dashboardcommentaryRoutes = require('./dashboardcommentaryRoutes');

router.use('/users', userRoutes);
router.use('/dashboards', dashboardRoutes);
router.use('/commentaries', commentaryRoutes);
router.use('/dashboardcommentaries', dashboardcommentaryRoutes);

module.exports = router;
