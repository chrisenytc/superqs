/*
 * superqs
 * https://github.com/chrisenytc/superqs
 *
 * Copyright (c) 2015, Christopher EnyTC
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai');
var expect = chai.expect;

var qs = require('../lib/superqs.js');

describe('SuperQS module', function() {
	var parsed;
	var querystring = 'string=value&date=2015-12-23T23:42:09.248Z&yes=true&no=false&array=1&array=2&object[a]=hello&object[b]=world&object[c][a]=3&object[c][a]=4';

    describe('.parse()', function() {
		before(function() {
			parsed = qs.parse(querystring);
		});

        it("should have property 'string' as 'value'", function() {
            expect(parsed).to.have.property('string').and.eql('value');
        });

		it("should have property 'date' and be a date", function() {
            expect(parsed).to.have.property('date').and.instanceof(Date);
        });

		it("should have property 'yes' as true", function() {
            expect(parsed).to.have.property('yes').and.eql(true);
        });

		it("should have property 'no' as false", function() {
            expect(parsed).to.have.property('no').and.eql(false);
        });

		it("should have property 'array' as [1,2]", function() {
            expect(parsed).to.have.property('array').and.eql([1,2]);
        });

		it("should have property 'object' and be a multidimensional object", function() {
            expect(parsed).to.have.property('object');
			expect(parsed.object).to.have.property('a').and.eql('hello');
			expect(parsed.object).to.have.property('b').and.eql('world');
			expect(parsed.object).to.have.property('c');
			expect(parsed.object.c).to.have.property('a').and.eql([3,4]);
        });
    });

	describe('.stringify()', function() {
		it('should have the same querystring from parsed body', function() {
			expect(qs.stringify(parsed)).to.eql(querystring);
		});
	});
});
