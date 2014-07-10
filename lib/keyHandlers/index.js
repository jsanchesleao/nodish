var _ = require('lodash'),
    arrowKeys = require('./arrowKeys'),
    controlKeys = require('./controlKeys'),
    editKeys = require('./editKeys'),
    autocomplete = require('./autocomplete');


module.exports =  _.merge(arrowKeys, controlKeys, editKeys, autocomplete);