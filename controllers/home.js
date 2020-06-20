
const config = require('../config/config');
const models = require('../models');

module.exports = {
    get: {
        home: (req, res, next) => {

            models.Course.find({}).lean().then((courses) => {
                
                const hbsObject = {
                    pageTitle: 'Home Page',
                    isLoggedIn: req.cookies[config.cookie] !== undefined,
                    courses,
                    username: ()=>{
                        if(req.user.username){
                            return req.user.username
                        }
                        
                    }
                };
    
                res.render('home.hbs', hbsObject);
            })
            
        }
    },
};