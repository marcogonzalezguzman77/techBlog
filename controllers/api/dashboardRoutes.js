const router = require('express').Router();
const { Dashboard } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newDashboard = await Dashboard.create({
      ...req.body,
      user_id: req.session.user_id,    
    });

    res.status(200).json(newDashboard);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dashboardData = await Dashboard.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,        
      },
    });

    if (!dashboardData) {
      res.status(404).json({ message: 'No dashboard found with this id!' });
      return;
    }

    const sessioData = { user_id: req.session.user_id }

    res.status(200).json(sessioData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const updateDashboard = await Dashboard.update({
      ...req.body,      
    },
    {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,        
      },
    }
    
    );

    const sessioData = { user_id: req.session.user_id }

    res.status(200).json(sessioData);
  } catch (err) {
    res.status(400).json(err);
  }
});




module.exports = router;
