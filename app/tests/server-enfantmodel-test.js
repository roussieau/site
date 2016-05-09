'use strict';

var should = require('should');
var mongoose = require('mongoose');
var enfant = require('../models/enfant.js').enfant;
var section = require('../models/section.js').section;

var testEnfant, testSection;
var date = Date.now();
var query;

describe('Enfant model unit tests:', function() {
	beforeEach(function() {
		testSection = new section({
			nom : 'test6'
		});
		testSection.save();

		testEnfant = new enfant({
			nom : 'test1',
			prenom : 'test2',
			totem : 'test3',
			sexe : 'test4',
			date : date,
			section : testSection.id,
			commentaire : 'test5'
		});
	});

	describe('Save', function() {
		it('should be able to be saved', function() {
			testEnfant.save(function(err) {
				should.not.exist(err);
			});
		});

		it('should require name values', function() {
			testEnfant.nom = '';
			testEnfant.prenom = '';
			testEnfant.save(function(err) {
				should.exist(err);
			});
		});

		it('should require base values', function() {
			testEnfant.sexe = '';
			testEnfant.date = null;
			testEnfant.save(function(err) {
				should.exist(err);
			});
		});

		it('should require section value', function() {
			testEnfant.section = null;
			testEnfant.save(function(err) {
				should.exist(err);
			});
		});

		it('should not require other values', function() {
			testEnfant.totem = '';
			testEnfant.save(function(err) {
				should.not.exist(err);
			});
		});
	});

	describe('Get', function() {
		it('should be found', function(done) {
			testEnfant.save();
			query = enfant.findOne({nom: 'test1'});
			query.exec(function(err, enfantFound) {
				if (err) console.log(err);
				should.not.exist(err);
				done();
			});
		});

		it('should have the same values', function(done) {
			testEnfant.save();
			query = enfant.findOne({nom: 'test1'});
			query.exec(function(err, enfantFound) {
				if (err) console.log(err);
				should.equal(enfantFound.nom, 'test1');
				should.equal(enfantFound.prenom, 'test2');
				should.equal(enfantFound.totem, 'test3');
				should.equal(enfantFound.sexe, 'test4');
				should.equal(enfantFound.date.getTime(), date);
				should.equal(enfantFound.commentaire, 'test5');
				query = section.findById(enfantFound.section);
				query.exec(function(err, sectionFound) {
					if (err) console.log(err);
					should.equal(sectionFound.nom, 'test6');
					done();
				});
			});
		});

		it('should have default values', function(done) {
			testEnfant.save();
			query = enfant.findOne({nom: 'test1'});
			query.exec(function(err, enfantFound) {
				if (err) console.log(err);
				should.equal(enfantFound.statut, 1);
				done();
			});
		});
	})

	afterEach(function() {
		testEnfant.remove();
		testSection.remove();
	});
});