const models = require('../models')
const jwt = require('../utils/jwt')

module.exports = {
    get: {
        login: (req, res, next) => {
            res.render('login.hbs', { pageTitle: "Login" })
        },
        register: (req, res, next) => {
            res.render('register.hbs', { pageTitle: "Register" })
        },
        logout: (req,res, next)=>{
            res.clearCookie('x-auth-token')
            .redirect('/home/')
        }
    },
    post: {
        login: (req, res, next) => {
            const {username, password}=req.body;
            models.User.findOne({username}).then((user)=>{
                Promise.all([user, user.matchPassword(password)])
                .then(([user,match])=>{
                    if(!match){
                        console.log("Invalid");
                        return
                        
                    }
                    const token = jwt.createToken({ id: user._id })
                    res.cookie('x-auth-token', token)
                    .redirect('/home/')
                })
            })

        },
        register: (req, res, next) => {
            const { username, password, repeatPassword } = req.body;

            models.User.create({ username, password })
                .then((registeredUser) => {

                    const token = jwt.createToken({ id: registeredUser._id })
                    res.cookie('x-auth-token', token)
                        .redirect('/home/')
                })


        }
    }
}