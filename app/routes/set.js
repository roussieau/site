'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var section = require('../models/section.js').section;
var error = require('../../error.js');

//On va charger les différentes sections, pour les mettre dans le menu
router.get('/',function(req, res, next){
    section.find().sort({nom : 1}).exec(function(err, section){
        if(err) error(res, err);
        res.json(section);
    });
});

module.exports = router;
