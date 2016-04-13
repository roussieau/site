'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var page = require('../models/page.js').page;
var blog = require('../models/blog.js').blog;

router.all('/', function(req, res,next) {
    page.findOne({nom : '/'},function(err, page){
        if(err) return handleError(err);
        res.render('showPage',{
            titre : "Accueil",
            log : req.user,
            section : req.section,
            page : page
        });
    });
});

//Edition de la page d'accueil
router.get('/edit', function(req, res, next){
	if(!req.user || req.user.grade <3){
		res.redirect('/');
	}
    page.findOne({nom : '/'},function(err, page){
        if(err) return handleError(err);
        res.render('editPage',{
            titre : "Edition",
            log : req.user,
            section : req.section,
            page : page
        });
    });
});

router.post('/edit', function(req, res, next){
	if(!req.user || req.user.grade<3){
		res.redirect('/');
	}
    page.findOne({nom: '/' }, function (err, doc){
        doc.titre = req.body.titre;
        doc.body = req.body.contenu;
        doc.save();
        res.redirect('/');
    });

});

//Les sites des sections
router.get('/:nom',function(req, res, next){
	req.section.forEach(function(el){
		if(el.nom == req.params.nom){
			req.sectionId = el._id;
			console.log("Match");
		}
	});
	next();
}, 
function(req, res, next){
	if(req.sectionId){
		blog.find({section : req.sectionId}).limit(10).sort({date : 1}).exec(function(err, blog){
			console.log("test2");
			if(err) console.log(err);
			if(!blog)console.log("ERREUR");
			console.log("voici le blog :"+blog);
			res.render('sectionBlog',{
				titre : "Section",
				section : req.section,
				log : req.user,
				blog : blog,
				id : req.sectionId
			});	
		});
	}
	else {
		next();
	}
});

module.exports = router;
