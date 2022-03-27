const router = require('express').Router();
const { User, Dashboard, Commentaries, DashboardCommentaries } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all dashboards and JOIN with user data
    const dashboardData = await Dashboard.findAll({
      include: [
        {
          model: User,
          attributes: ['name','email'],
        },
      ],
    });
    //To verify in Insomnia
    //res.status(200).json(dashboardData);

    // Serialize data so the template can read it
    const dashboards = dashboardData.map((dashboard) => dashboard.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      dashboards, 
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      nameUser: req.session.nameUser,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard/:id', async (req, res) => {
  try {
    const dashboardData = await Dashboard.findByPk(req.params.id, {
      //include: [{ model: Commentaries, through: DashboardCommentaries, as: 'commentaries_dashboard_detail' }]
       include: [
        {
          model: User,
          attributes: ['name'],         
        },
        { 
          model: Commentaries, through: DashboardCommentaries, as: 'commentaries_dashboard_detail',
                   
            include:[{
             model: User,
            }]
            
        },
        
      ],
    });

    //To verify in Insomnia
    //res.status(200).json(dashboardData);

    //console.log('dashboardData ',dashboardData);
    const dashboard = dashboardData.get({ plain: true });
    //console.log('dashboards ',dashboards);

    res.render('dashboard', {
      ...dashboard,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      nameUser: req.session.nameUser,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});






router.get('/mydashboard/:id', async (req, res) => {
  try {
    // Get all dashboards and JOIN with user data
    const dashboardData = await Dashboard.findAll({
      where: { user_id: req.params.id },
      include: [
        {
          model: User,
          attributes: ['name','email'],
        },
      ],
    });
    //To verify in Insomnia
    //res.status(200).json(dashboardData);

    // Serialize data so the template can read it
    const dashboards = dashboardData.map((dashboard) => dashboard.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('mydashboard', { 
      dashboards, 
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      nameUser: req.session.nameUser,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/mydashboardv1/:id', async (req, res) => {
  try {
    const dashboardData = await Dashboard.findAll({        
        where: { user_id: req.params.id },       
        include: [
          {
            model: User,
            attributes: ['name','email'],            
          },
          { 
            model: Commentaries, through: DashboardCommentaries, as: 'commentaries_dashboard_detail',
                     
              include:[{
               model: User,
              }]
              
          },          
        ],

      
  });

    //To verify in Insomnia
    //res.status(200).json(dashboardData);

    // Serialize data so the template can read it
    const dashboards = dashboardData.map((dashboard) => dashboard.get({ plain: true }));

    res.render('mydashboard', {
      ...dashboards,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      nameUser: req.session.nameUser,
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});











// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
