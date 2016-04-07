# SuperQS [![Build Status](https://img.shields.io/travis/chrisenytc/superqs/master.svg)](http://travis-ci.org/chrisenytc/superqs) [![NPM version](https://img.shields.io/npm/v/superqs.svg)](https://www.npmjs.com/package/superqs) [![NPM Downloads](https://img.shields.io/npm/dt/superqs.svg)](https://www.npmjs.com/package/superqs)

> A powerful querystring parser to use with multidimensional arrays and objects

## Getting Started
Install the module with: `npm install superqs`

```javascript
var qs = require('superqs');

qs.stringify({
	name: 'Christopher',
	born_at: new Date(),
	metadata: { 
		username: 'chrisenytc' 
	}
}); // "name=Christopher&born_at=2015-12-23T20:25:25.782Z&metadata[username]=chrisenytc"

```

## Features
 - Supports multi dimensional arrays and objects 
 - Converts values into their correct data types. 
 - Supports all data types: `strings`, `integers`, `booleans`, `arrays` & `objects`.

## Documentation

#### .parse(body)

How to use this method

```javascript
let qs = require('superqs');

// parse
qs.parse('string=value&date=2015-12-23T23:42:09.248Z&yes=true&no=false&array=1&array=2&object[a]=hello&object[b]=world&object[c][a]=3&object[c][a]=4')

// becomes ->
{
	string: 'value',
	date: Wed Dec 23 2015 21:42:09 GMT-0200 (BRST),
	yes: true,
	no: false,
	array: [1,2],
	object: {
		a: 'hello',
		b: 'world',
		c: {
			a: [3,4]
		}
	}
}
```

#### .stringify(query)

How to use this method

```javascript
let qs = require('superqs');

// stringify
let result = qs.stringify({
	string: 'value',
	date: new Date(),
	yes: true,
	no: false,
	array: [1,2],
	object: {
		a: 'hello',
		b: 'world',
		c: {
			a: [3,4]
		}
	}
});

console.log(result)
// --> string=value&date=2015-12-23T23:42:09.248Z&yes=true&no=false&array=1&array=2&object[a]=hello&object[b]=world&object[c][a]=3&object[c][a]=4
```

## Contributing

Bug reports and pull requests are welcome on GitHub at [https://github.com/chrisenytc/superqs](https://github.com/chrisenytc/superqs). This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

1. Fork it [chrisenytc/superqs](https://github.com/chrisenytc/superqs/fork)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am "Add some feature"`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/chrisenytc/superqs/issues).

## Credits
This is a fork of the project [diet-qs](https://github.com/adamhalasz/diet-qs). Give some respect to him.

## License 

Check [here](LICENSE).
