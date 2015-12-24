/*
 * superqs
 * https://github.com/chrisenytc/superqs
 *
 * Copyright (c) 2015, Christopher EnyTC
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Module Dependencies
 */

var sugar = require('sugar');

/**
@class SuperQS
 */

/**
 * Private Methods
 */

function isset(object){
	return (object != 'undefined' && object != undefined && object != null && object != "" && typeof(object) != 'undefined') ? true : false ;
}

function isDate(date) {
    return ( (new Date(date) !== 'Invalid Date' && !isNaN(new Date(date)) ));
}

function stringifyTraverse(subject, level, key) {
	var result = '';
	for (var prop in subject) {
		var parent_appendix = key ? key : '';
		var parent_appendix = level > 1 && level < 2 ? '['+key+']' : parent_appendix;
		var child_appendix = level > 0 ? '['+prop+']' : prop ;
		var appendix = parent_appendix + child_appendix;
		var value = subject[prop];
	    if (Object.isObject(value)) {
	        result += stringifyTraverse(value, level + 1, appendix);
	    } else if (Array.isArray(value)) {
	    	for(var i = 0; i < value.length; i++){
	    		result += appendix+'='+stringifyValue(value[i])+'&';
	    	}
	    } else {
	        result += appendix +'='+ stringifyValue(value) + '&';
	    }
	}
	return result;
}

function toValue(value) {
	if(value == 'true'){ 
		value = true; 	// boolean true
	} else if (value == 'false') {
		value = false; 	// boolean false
	} else if (isset(value) && !isNaN(value)) {
		value = +value; // number
	} else if (isDate(value)) {
		value = new Date(value);
	}
	return value;
}

function stringifyValue(value) {
	if(value === true){ 
		value = 'true'; // boolean true
	} else if (value === false) {
		value = 'false'; // boolean false
	} else if (value instanceof Date) {
		value = value.toISOString(); // iso date
	} else if (isset(value) && !isNaN(value)) {
		value = +value; // number
	}
	return value;
}

function traverse(subject, key, value) {
	
	if(key.indexOf('[') != -1){	
		var split = key.split('[');
		var INT_SUBJECT = subject;
		if(isNaN(split[1].split(']')[0])){
			for(var i = 0; i < split.length; i++){
				var section = split[i].indexOf(']') ? split[i].split(']')[0] : split[i] ;
				
				if(i < split.length-1){
					if(!INT_SUBJECT[section]) INT_SUBJECT[section] = {};
				} else {
					if(INT_SUBJECT[section]) {
						INT_SUBJECT[section] = [INT_SUBJECT[section]];
						INT_SUBJECT[section].push(toValue(value))
					} else {
						INT_SUBJECT[section] = toValue(value);
					}
				}
				INT_SUBJECT = INT_SUBJECT[section];
			}
			subject = INT_SUBJECT;
		} else {
			var parent = split[0];
			var section = split[1].indexOf(']') ? split[1].split(']')[0] : split[1] ;
			if(typeof INT_SUBJECT[parent] != 'object') INT_SUBJECT[parent] = [];
			INT_SUBJECT[parent].push(toValue(value));
			subject = INT_SUBJECT;
		}
	} else if (subject[key]) {
		if(typeof subject[key] != 'object') subject[key] = [subject[key]];
		subject[key].push(toValue(value));
	} else {
		subject[key] = toValue(value);
	}
	return subject;
}

/*
 * Public Methods
 */

/**
 * Method responsible for parse a querystring
 *
 * @example
 *
 *     superqs.parse('name=Christopher&username=chrisenytc');
 *
 * @method parse
 * @param {String} body A querystring
 * @return {Mixed} Returns a object or array
 */

exports.parse = function(body) {
	var result = {};
	body = body.toString().replace(/\+/gi,' ');
	var split = body.split(/\&/gi);
	split.forEach(function(string){
		var split = string.split('=');
		var key = decodeURIComponent(split[0]);
		var value = decodeURIComponent(split[1]);
		traverse(result, key, value, split.length);
	});
	return result;
};

/**
 * Method responsible for stringify a array or object
 *
 * @example
 *
 *     superqs.stringify({ name: 'Christopher', username: 'chrisenytc' });
 *
 * @method parse
 * @param {Mixed} query A array or object
 * @return {Mixed} Returns a object or array
 */

exports.stringify = function(query) {
	var result = stringifyTraverse(query, 0);
	result = result.substr(0, result.length-1);
	return result;
};
