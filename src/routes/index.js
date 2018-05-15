const express = require('express');
const expressValidator = require('express-joi-validator');
const router = express.Router();
const foodController = require('../controllers');
const validateFood = require('../policies');
const { catchErrors } = require('../helpers');


router.post(
'/createmenu', 
expressValidator(validateFood.validateCreateMenu), 
catchErrors(foodController.createMenu)
);

router.post(
'/notifyslack', 
expressValidator(validateFood.validateFoodIsReady), 
catchErrors(foodController.foodIsReady)
);

module.exports = router;
