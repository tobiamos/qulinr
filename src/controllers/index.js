const mongoose = require('mongoose');
const { randomBytes } = require('crypto');
const timeTable = require('./timetable.json')
const SlackBot = require('slackbots');
const { sendJSONResponse } = require('../helpers');
const Menu = mongoose.model('Menu');
const { channels } = require('../utils');
const { botToken, botName } = require('../config');

//https://imgur.com/AO668Q3 - breakfast

const Bot = new SlackBot({
    token: botToken,
    name: 'Qulinr',
});
const params = {
    icon_emoji: ':qulinr:',
    attachments: [{
        "image_url": "http://gokada.ng/assets/1.jpg",
        "thumb_url": "http://gokada.ng/assets/1.jpg",
        "footer": "Slack API",
        "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
        "ts": 123456789
    }]
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
    const data = 
`*${toTitleCase(foodType)}*  
*${toTitleCase(foodMenu)}* 
would be ready in *${timeEstimate}*`;
    Bot.postMessageToChannel(channels.qulinrapp, data, params);
    sendJSONResponse(res, 200, { data:token, message: 'Food Notification created'} );
};


module.exports.foodIsReady = async ( req, res ) => {
    const { token } = req.body;
    const menu = await Menu.findOne({ token });
    if(!menu) return sendJSONResponse(res, 400, { data: null, message: 'Food Entry Not Found!'});
    data = 
`*${toTitleCase(menu.foodType)}*
 *${toTitleCase(menu.foodMenu)}*
  *is Ready!*`;
    Bot.postMessageToChannel(channels.qulinrapp, data, params);
    sendJSONResponse(res, 200, {data:null, message: 'Food Notification Sent'});
};

module.exports.getFullTimeTable = (req, res) => {
    const fullTimeTable = timeTable;
    if(!fullTimeTable) return sendJSONResponse(res, 404, {data:null, message: 'Time table not found'});
    return sendJSONResponse(res, 200, {data:timeTable, message: 'Timetable found'} );
};

module.exports.getTimeTableByDay = (req, res) => {
    const  { day } = req.params;
    const result = timeTable[day.toLowerCase()];
    if(!result)return sendJSONResponse(res, 404, {data:null, message: `Timetable for ${day} not found`});
    return sendJSONResponse(res, 200, {data:result, message: `Timetable for ${day} fetched!`});

}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}