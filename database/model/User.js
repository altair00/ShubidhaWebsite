const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'please enter first name'],
        lowercase: true
    },

    last_name: {
        type: String,
        required: [true, 'please enter last name'],
        lowercase: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [isEmail, 'please enter a valid email']
    },
    
    dob: {
        type: Date,
        required: true,
        trim: true
    },

    phone: {
        type: String,
        required: [true, 'please enter a phone number'],
        unique: true

    },

    password: {
        type: String,
        required: [true, 'please enter a password'],
        minlength: [5, 'Minimum password length is 5 characters']

    },

});

// hashing the password
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static method to login user

userSchema.statics.login = async function (email, password){
    const user = await this.findOne( { email });

    if (user){
        const auth = await bcrypt.compare(password, user.password);
        
        if (auth){
            return user;
        }
        throw Error('incorrect password');
    }

    throw Error('incorrect email');

}

const User = mongoose.model('user', userSchema);

module.exports = User;