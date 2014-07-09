var _ = require('lodash'),
    arrowKeys = require('./arrowKeys'),
    controlKeys = require('./controlKeys'),
    editKeys = require('./editKeys');


module.exports =  _.merge(arrowKeys, controlKeys, editKeys);