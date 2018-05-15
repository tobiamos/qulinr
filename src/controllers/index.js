const mongoose = require('mongoose');
const { sendJSONResponse } = require('../helpers');
const Menu = mongoose.model('Menu');
const { channels } = require('../utils');
const { randomBytes } = require('crypto');
const SlackBot = require('slackbots');

const Bot = new SlackBot({
    
})

module.exports.createMenu = async (req, res) => {
    const { foodType, foodMenu, timeEstimate } = req.body;
    const menu = new Menu();
    menu.foodType = foodType;
    menu.foodMenu = foodMenu;
    menu.timeEstimate = timeEstimate;
    const token = randomBytes(16).toString('hex')
    menu.token = token;
    await menu.save();
    sendJSONResponse(res, 200, { data:token, message: 'Food Notification created'} );
};


module.exports.foodIsReady = async ( req, res ) => {
    const { token } = req.body;
    const menu = await Menu.findOne({ token });
    if(!menu) return sendJSONResponse(res, 400, { data: null, message: 'Food Entry Not Found!'});
    

}