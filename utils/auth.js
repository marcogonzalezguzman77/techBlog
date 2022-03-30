const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  console.log('inside withAuth')
  if (!req.session.logged_in) {
    console.log('inside redirect');
    res.redirect('login');
  } else {
    next();
  }
};

module.exports = withAuth;
