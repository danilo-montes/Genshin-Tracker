const express  = require('express'),
      router   = express.Router(),
      passport = require('passport'),
      mongoose = require('mongoose'),
      User     = mongoose.model('User');

// login and register from initial template

// REGISTER
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    
    User.register(new User({username}), password, (err, user) => {
        if (err) {
          res.render('register', {error:'Your registration information is not valid'});
        } else {
          passport.authenticate('local')(req, res, function() {
            res.redirect('/');
          });
        }
    });
});


// LOGIN
router.get('/login', (req, res) => {
    res.render('login');
});
  
router.post('/login', async (req, res, next) => {
    
    passport.authenticate('local', (err, user) => {
        if (user) {
            req.logIn(user, (err) => {
                res.redirect('/');
            });
        } else {
            res.render('login', {error: 'Your username or password is incorrect.'})
        }
    })(req, res, next);
});


// LOGOUT   
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;