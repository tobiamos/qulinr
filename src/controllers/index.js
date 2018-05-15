const mongoose = require('mongoose');
const { randomBytes } = require('crypto');
const SlackBot = require('slackbots');
const { sendJSONResponse } = require('../helpers');
const Menu = mongoose.model('Menu');
const { channels } = require('../utils');
const { botToken, botName } = require('../config');

const Bot = new SlackBot({
    token: botToken,
    name: 'Qulinr',
});
const params = {
    icon_emoji: ':qulinr:'
};
//https://ibb.co/bBwA1J
//bot.postMessageToChannel('qulinr-app', 'Paul Make Sure you do freedom');
module.exports.createMenu = async (req, res) => {
    const { foodType, foodMenu, timeEstimate } = req.body;
    const menu = new Menu();
    menu.foodType = foodType;
    menu.foodMenu = foodMenu;
    menu.timeEstimate = timeEstimate;
    const token = randomBytes(16).toString('hex')
    menu.token = token;
    await menu.save();
    const data = `
    *${foodType}* 
    *${foodMenu}* 
     would be ready in *${timeEstimate}*`;
    Bot.postMessageToChannel(channels.qulinrapp, data, params);
    sendJSONResponse(res, 200, { data:token, message: 'Food Notification created'} );
};


module.exports.foodIsReady = async ( req, res ) => {
    const { token } = req.body;
    const menu = await Menu.findOne({ token });
    if(!menu) return sendJSONResponse(res, 400, { data: null, message: 'Food Entry Not Found!'});
    data = `${menu.foodType}-${menu.foodMenu} is Ready!`;
    Bot.postMessageToChannel(channels.qulinrapp, data, params);
    sendJSONResponse(res, 200, {data:null, message: 'Food Notification Sent'});
}