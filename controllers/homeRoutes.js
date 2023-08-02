const router = require('express').Router();
const { Project, User, Location } = require('../models');
const withAuth = require('../utils/auth');


router.get("/", (req, res) => {
  res.render("homepage", {
    logged_in: req.session.logged_in
  })
})

router.get("/profile", withAuth, async (req, res) => {
  const locationData = await Location.findAll({
    where: { user_id: req.session.user_id }
  })
  const location = locationData.map(loc => loc.get({ plain: true }))
  res.render("profile", {
    location,
    logged_in: req.session.logged_in,username: req.session.username
  })
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});
module.exports = router;


