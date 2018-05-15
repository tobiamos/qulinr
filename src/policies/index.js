const joi = require('joi');

module.exports.validateCreateMenu = {
    body: {
        foodType: joi.string().required(),
        foodMenu: joi.string().required(),
        timeEstimate: joi.string().required(),
    }
};

module.exports.validateFoodIsReady  = {
    body: {
        token: joi.string().required(),
    }
}