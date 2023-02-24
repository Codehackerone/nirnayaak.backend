const User = require('../models/user.model')

const getLoginPage = (req, res) => {
    res.render('index.ejs')
}

const postLogin = (req, res) => {
   
    let check = req.body.type;

    if(check == 'login'){
        User.findOne({email: req.body.email})
        .then((data) => {
            if(!data){
                res.send('User not found')
            }else{
                console.log(data);
                res.send('logged in')
            }
        })
    }else{
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
            })
            
            user.save(function (err, user) {
            if (err) { return res.send(err) }
            res.status(201).json(user)
            })
    }
}


module.exports = {
    getLoginPage,
    postLogin
}