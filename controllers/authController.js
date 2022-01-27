const User = require('../database/model/User');

const handleErrors = (err) => {
    //console.log(err.message, err.code);

    let errors = { email: '', password: '', phone: '' };

    // incorrect email for login

    if (err.message === 'incorrect email'){
        errors.email = 'That email is not registered';
    }

    // incorrect password for login

    if (err.message === 'incorrect password'){
        errors.password = 'That password is incorrect';
    }

    // duplicate error code
    if (err.code === 11000){
        const field = Object.keys(err.keyValue)[0]

    //  console.log(field);
        if (field === 'email'){
            errors[field] = "This email has already been used";
        } 
        if (field === 'phone'){
            errors[field] = "This phone number has already been used";
        }

        return errors;
    } 

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(properties => {
           errors[properties.path] = properties.message;  
        })
    }

    return errors;
}

module.exports.signup_get = (req, res)=>{
    res.render('signup');
}

module.exports.login_get = (req, res)=>{
    res.render('login');
}

module.exports.signup_post = async (req, res)=>{
    const { first_name, last_name, email, dob, phone, password } = req.body;

    try{
        const user = await User.create({  first_name, last_name, email, dob, phone, password });
        req.session.userID = user._id;
        res.status(201).json({ user: user._id }); //means successfully added the user in the db
    }catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req, res)=>{
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        req.session.userID = user._id;
        res.status(200).json({ user: user._id });

    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });

    }
}

module.exports.logout_post = (req, res) => {
    req.session.destroy( err => {
        if (err){
            return res.redirect('/');
        }

        res.clearCookie(process.env.SESS_NAME);
        res.redirect('/login');
    });

}

