//const { split } = require('lodash');
const userModel = require('./../Models/userModel')
const {decode} = require('./../auth')

const {createAccessToken} = require('./../auth')

let userProfile = [];
//let userStatus;
//let userEmail;

var adminStatus = function searchAdmin(){       
    for(var i=0; i<userProfile.length; i++) {
        if(userProfile[i].isAdmin == true) {
            return true;
        }
        else{
            return false;
        }
    }
}
module.exports = {adminStatus};

module.exports.userRegistration = (reqBody, res) => {

    //console.log(reqBody)
    let newUser = new userModel({
        firstName: reqBody.firstName,
        lastName: reqBody.lastName,
        userName: reqBody.userName,
        email: reqBody.email,
        password: reqBody.password
    })
    return newUser.save().then((result, error) =>{
        if(error){
            return res.status(404).send(error)
        }
        else{
            return res.status(200).send(result)
        }
    })
}



module.exports.setAdmin = (reqBody, reqHeaders) => {
    let userData = decode(reqHeaders.authorization);
    if(userData.isAdmin === true){
        let updateAdminStatus = {isAdmin: true}
        return userModel.findOneAndUpdate({email: reqBody.email }, updateAdminStatus, {new: true}).then(result => {
            return 'Successfully changed the admin status'
        });
    }
    else{
        return 'We apologize, only admin can change the admin status'
    }
}

module.exports.userLogin = (reqBody) => {
    return userModel.findOne({email: reqBody.email, password: reqBody.password}).then(result => {
        if(result !== null){
            userProfile.pop();
            userProfile.push(result);
            //console.log(result)
            //console.log(userProfile);
            const token = createAccessToken(result);
            return {message: "you are now logged in", result, token}
            
        }
        else{
            return {message: 'You are not registered',result, userProfile}
        }
       
    })
}

module.exports.userDetails = (req, res) => {
    let id = userProfile[0]._id
    return userModel.findOne({_id: id}).then(result => {
        if(result !== null){
            return res.status(200).send(result)
        }
        else{
            return 'No Data'
        }
    })
}

module.exports.userProfiles = (req, res) =>{
    return userModel.find({}).then(result => {
        return res.send(result)
    })
}

