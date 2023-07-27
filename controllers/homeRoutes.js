const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');


router.get("/", (req,res)=> {
  res.render("homepage", {
    logged_in: req.session.logged_in
  })
})

router.get("/profile", withAuth, async (req,res)=> {
  const userData = await User.findByPk(req.session.user_id, {
    attributes: {exclude: ['password']},
    include: [{ model: Location}]
  })

  const user = userData.get({plain: true})
  res.render("profile", {
    ...user,
    logged_in: req.session.logged_in
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


