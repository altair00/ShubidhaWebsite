const { Router } = require('express');
const authController = require('../controllers/authController');
const User = require('../database/model/User');

const router = Router();

// middleware manual functions

const redirectLogin = (req, res, next) => {
    if (!req.session.userID){
        res.redirect('/login');
    } else {
        next();
    }
}

const redirectDash = (req, res, next) => {
    if (req.session.userID){
        res.redirect('/dashboard');
    } else {
        next();
    }
}

router.get('/signup', redirectDash, authController.signup_get);
router.post('/signup', redirectDash, authController.signup_post);
router.get('/login', redirectDash, authController.login_get);
router.post('/login', redirectDash, authController.login_post);


router.post('/logout', redirectLogin, authController.logout_post);


router.get('/dashboard', redirectLogin, async (req, res) => {

    const { userID } = req.session;

    try {
        const user = await User.findOne( { _id: userID });
    
    res.send(`
        <h1>Dashboard</h1>
        <ul>
            <li>Name: ${user.first_name}</li>
            <li>Email: ${user.email}</li>
        </ul>

        <form method='post' action='/logout'>
            <button>Logout</button>
        </form>
    `)
    } catch (err){
        console.log(err);
    }


});



module.exports = router;

