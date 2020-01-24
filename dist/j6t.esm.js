import _jQuery__default from 'jquery';

const jq = _jQuery__default;

const getEl			= (x) => document && document.querySelector ? document.querySelector(x) : undefined;
const getEls		= (x) => document && document.querySelectorAll ? document.querySelectorAll(x) : undefined;
const toStr			= (x) => (x || '').toString();
const isEmpty		= (x) => x == null || (typeof x == 'string' && x.trim() == '');
const isArray		= Array.isArray;
const isFunction	= (x) => typeof x == 'function' && typeof x.nodeType !== 'number';
const isObject		= (x) => typeof x == 'object' && !isArray(x);
const isEmptyObject	= (x) => x != null && isObject(x) && Object.keys(x).length == 0;
const isSomeObject	= (x) => x != null && isObject(x) && Object.keys(x).length > 0;
const isSomeString	= (x) => typeof x == 'string' && x.trim() != '';
const isDate		= (x) => x instanceof Date;
const lastIndexOf	= function (str, arg) {
	let result = -1;
	
	if (isSomeString(str)) {
		if (isSomeString(arg)) {
			result = str.lastIndexOf(arg);
		} else if (isArray(arg)) {
			for (let i = str.length - 1; i >= 0; i--) {
				if (arg.indexOf(str[i]) >= 0) {
					result = i;
					break;
				}
			}
		}
	}
	
	return result;
};
const isBool		= (x) => typeof x == 'boolean';
// borrowed from jQuery
const isNumeric		= (x) => {
	const type = typeof x;
	
	return ( type === "number" || type === "string" ) && !isNaN( x - parseFloat(x) );
};
const left			= (x, n) => isSomeString(x) && isNumeric(n) && n > 0 ? x.substr(0, n): '';
const right			= (x, n) => isSomeString(x) && isNumeric(n) && n > 0 ? x.substr(x.length - n): '';

const Dec2Bin		= (x) => parseInt(toStr(x)).toString(2);
const Dec2Hex		= (x) => parseInt(toStr(x)).toString(16);
const Dec2Oct		= (x) => parseInt(toStr(x)).toString(8);

const Bin2Dec		= (x) => parseInt(toStr(x), 2);
const Bin2Hex		= (x) => parseInt(toStr(x), 2).toString(16);
const Bin2Oct		= (x) => parseInt(toStr(x), 2).toString(8);

const Oct2Dec		= (x) => parseInt(toStr(x), 8);
const Oct2Hex		= (x) => parseInt(toStr(x), 8).toString(16);
const Oct2Bin		= (x) => parseInt(toStr(x), 8).toString(2);

const Hex2Dec		= (x) => parseInt(toStr(x), 16);
const Hex2Oct		= (x) => parseInt(toStr(x), 16).toString(8);
const Hex2Bin		= (x) => parseInt(toStr(x), 16).toString(2);

const NotImplementedException = function (x) {
	if (x) {
		throw `${(x || x.name)} is not implemented`
	} else {
		throw 'Not Imlemented Exception'
	}
};

/* warning: the following function may not work correctly in all browsers, situations and scenarios
			because function.caller is deprecated based on ECMAScript standard.
			this function is not used anywhere in j6t.
*/
const isPureFunction = (fn) => {
	let result = false;
	
	if (isFunction(fn)) {
		try {
			let caller = fn.caller;
			result = true;
		} catch { }
	}
	
	return result;
};
/* warning: the following function may not work correctly in all browsers, situations and scenarios
			because it is based on the deprecated isPureFunction().
			this function is not used anywhere in j6t.
*/
const isClass = x => !isPureFunction(x) && x.prototype != undefined;
const deepAssign = function (target, ...sources) {	// source: https://stackoverflow.com/questions/38345937/object-assign-vs-extend
  if (!sources.length) {
	  return target;
  }
  
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
	for (const key in source) {
		if (isObject(source[key])) {
			if (!target[key]) {
				jq.extend(target, { [key]: {} });
			}
			
			deepAssign(target[key], source[key]);
		} else {
			jq.extend(target, { [key]: source[key] });
		}
	}
  }
  
  return deepAssign(target, ...sources);
};

const merge = function (obj, fn, valueSeparator) {
	if (isEmpty(obj)) {
		return '';
	} else if (isArray(obj)) {
		return obj.map((item, i) => fn(i, obj[i])).join(valueSeparator);
	} else if (!isSomeObject(obj)) {
		return toStr(obj);
	} else {
		return Object.keys(obj).map(key => fn(key, obj[key])).join(valueSeparator);
	}
};
const join = function (obj, keySeparator, valueSeparator) {
	return merge(obj, (key, value) => `${key}${keySeparator}${value}`, valueSeparator);
};
const unmerge = function (str, keySeparator, valueSeparator) {
	let result = {};
	const arr = toStr(str).split(valueSeparator);
	
	arr.forEach(item => {
		const parts = item.split(keySeparator);
		
		if (parts[0]) {
			result[parts[0]] = parts.length > 0 ? parts[1]: undefined;
		}
	});
	
	return result;
};

const apply = (x, fnProcess, fnFinalize) => {
		let result;
		
		if (!isFunction(fnFinalize)) {
			fnFinalize = x => x;
		}
		if (isEmpty(x)) {
			result = '';
		} else if (isArray(x)) {
			result = x.map((item, i) => fnProcess(x, i, item));
		} else if (isSomeObject(x)) {
			Object.keys(x).filter(key => typeof x[key] == 'string')
						  .forEach(key => {
								fnProcess(x, key, x[key]);
						  });
			result = x;
		} else if (isFunction(x)) {
			result = fnProcess(null, null, toStr(x()));
		} else {
			result = fnProcess(null, null, toStr(x));
		}
		
		return fnFinalize(result);
	};
const trim = x => apply(x, (o, key, value) => {
	let result;
	
	if (key != null) {
		result = o[key] = toStr(value).trim();
	} else {
		result = o = toStr(value).trim();
	}
	
	return result;
});
	
const lower = x => apply(x, (o, key, value) => {
	let result;
	
	if (key != null) {
		result = o[key] = toStr(value).toLowerCase();
	} else {
		result = o = toStr(value).toLowerCase();
	}
	
	return result;
});
	
const upper = x => apply(x, (o, key, value) => {
	let result;
	
	if (key != null) {
		result = o[key] = toStr(value).toUpperCase();
	} else {
		result = o = toStr(value).toUpperCase();
	}
	
	return result;
});
	
const reverse = x => apply(x, (o, key, value) => {
	let result;
	
	if (key != null) {
		result = o[key] = toStr(value).split('').reverse().join('');
	} else {
		result = o = toStr(value).split('').reverse().join('');
	}
	
	return result;
});

const reverseToString = x => join(reverse(x), '', '');

const capitalize = x => apply(x, (o, key, value) => {
	let result;
	let arr = toStr(value).split(' ');
	let _result = arr.map(part => {
		let r = '';
		
		if (part) {
			r = part[0].toUpperCase() + part.substr(1);
		}
		
		return r;
	}).join(' ');
	
	if (key != null) {
		result = o[key] = _result;
	} else {
		result = o = _result;
	}
	
	return result;
});
	
const urlEncode = x => apply(x, (o, key, value) => {
	let result;
	
	if (key != null) {
		result = o[typeof key == 'string' ? encodeURI(key): key] = encodeURI(value);
	} else {
		result = o = encodeURI(value);
	}
	
	return result;
});
	
const urlEncodeToString = (x, keySeparator = '=', valueSeparator = ',') => join(urlEncode(x), keySeparator, valueSeparator);
	
const urlDecode = x => apply(x, (o, key, value) => {
	let result;
	
	if (key != null) {
		result = o[typeof key == 'string' ? decodeURI(key): key] = decodeURI(value);
	} else {
		result = o = decodeURI(value);
	}
	
	return result;
});

const urlDecodeToString = (x, keySeparator = '=', valueSeparator = ',') => join(urlDecode(x), keySeparator, valueSeparator);

const urlEncodeComponent = x => apply(x, (o, key, value) => {
	let result;
	
	if (key != null) {
		result = o[typeof key == 'string' ? encodeURIComponent(key): key] = encodeURIComponent(value);
	} else {
		result = o = encodeURIComponent(value);
	}
	
	return result;
});
	
const urlDecodeComponent = x => apply(x, (o, key, value) => {
	let result;
	
	if (key != null) {
		result = o[typeof key == 'string' ? decodeURIComponent(key): key] = decodeURIComponent(value);
	} else {
		result = o = decodeURIComponent(value);
	}
	
	return result;
});

const _html_entity = [
[38, 'amp'],
[60, 'lt'],
[62, 'gt'],
[160,'nbsp'],
[161,'iexcl'],
[162,'cent'],
[163,'pound'],
[164,'curren'],
[165,'yen'],
[166,'brvbar'],
[167,'sect'],
[168,'uml'],
[169,'copy'],
[170,'ordf'],
[171,'laquo'],
[172,'not'],
[173,'shy'],
[174,'reg'],
[175,'macr'],
[176,'deg'],
[177,'plusmn'],
[178,'sup2'],
[179,'sup3'],
[180,'acute'],
[181,'micro'],
[182,'para'],
[184,'cedil'],
[185,'sup1'],
[186,'ordm'],
[187,'raquo'],
[188,'frac14'],
[189,'frac12'],
[190,'frac34'],
[191,'iquest'],
[192,'agrave'],
[193,'aacute'],
[194,'acirc'],
[195,'atilde'],
[196,'auml'],
[197,'aring'],
[198,'aelig'],
[199,'ccedil'],
[200,'egrave'],
[201,'eacute'],
[202,'ecirc'],
[203,'euml'],
[204,'igrave'],
[205,'iacute'],
[206,'icirc'],
[207,'iuml'],
[208,'eth'],
[209,'ntilde'],
[210,'ograve'],
[211,'oacute'],
[212,'ocirc'],
[213,'otilde'],
[214,'ouml'],
[215,'times'],
[216,'oslash'],
[217,'ugrave'],
[218,'uacute'],
[219,'ucirc'],
[220,'uuml'],
[221,'yacute'],
[222,'thorn'],
[223,'szlig'],
[224,'agrave'],
[225,'aacute'],
[226,'acirc'],
[227,'atilde'],
[228,'auml'],
[229,'aring'],
[230,'aelig'],
[231,'ccedil'],
[232,'egrave'],
[233,'eacute'],
[234,'ecirc'],
[235,'euml'],
[236,'igrave'],
[237,'iacute'],
[238,'icirc'],
[239,'iuml'],
[240,'eth'],
[241,'ntilde'],
[242,'ograve'],
[243,'oacute'],
[244,'ocirc'],
[245,'otilde'],
[246,'ouml'],
[247,'divide'],
[248,'oslash'],
[249,'ugrave'],
[250,'uacute'],
[251,'ucirc'],
[252,'uuml'],
[253,'yacute'],
[254,'thorn'],
[255,'yuml'],
[8704,'forall'],
[8706,'part'],
[8707,'exist'],
[8709,'empty'],
[8711,'nabla'],
[8712,'isin'],
[8713,'notin'],
[8715,'ni'],
[8719,'prod'],
[8721,'sum'],
[8722,'minus'],
[8727,'lowast'],
[8730,'radic'],
[8733,'prop'],
[8734,'infin'],
[8736,'ang'],
[8743,'and'],
[8744,'or'],
[8745,'cap'],
[8746,'cup'],
[8747,'int'],
[8756,'there4'],
[8764,'sim'],
[8773,'cong'],
[8776,'asymp'],
[8800,'ne'],
[8801,'equiv'],
[8804,'le'],
[8805,'ge'],
[8834,'sub'],
[8835,'sup'],
[8836,'nsub'],
[8838,'sube'],
[8839,'supe'],
[8853,'oplus'],
[8855,'otimes'],
[8869,'perp'],
[8901,'sdot'],
[913,'alpha'],
[914,'beta'],
[915,'gamma'],
[916,'delta'],
[917,'epsilon'],
[918,'zeta'],
[919,'eta'],
[920,'theta'],
[921,'iota'],
[922,'kappa'],
[923,'lambda'],
[924,'mu'],
[925,'nu'],
[926,'xi'],
[927,'omicron'],
[928,'pi'],
[929,'rho'],
[931,'sigma'],
[932,'tau'],
[933,'upsilon'],
[934,'phi'],
[935,'chi'],
[936,'psi'],
[937,'omega'],
[945,'alpha'],
[946,'beta'],
[947,'gamma'],
[948,'delta'],
[949,'epsilon'],
[950,'zeta'],
[951,'eta'],
[952,'theta'],
[953,'iota'],
[954,'kappa'],
[955,'lambda'],
[956,'mu'],
[957,'nu'],
[958,'xi'],
[959,'omicron'],
[960,'pi'],
[961,'rho'],
[962,'sigmaf'],
[963,'sigma'],
[964,'tau'],
[965,'upsilon'],
[966,'phi'],
[967,'chi'],
[968,'psi'],
[969,'omega'],
[977,'thetasym'],
[978,'upsih'],
[982,'piv'],
[338,'oelig'],
[339,'oelig'],
[352,'scaron'],
[353,'scaron'],
[376,'yuml'],
[402,'fnof'],
[710,'circ'],
[732,'tilde'],
[8194,'ensp'],
[8195,'emsp'],
[8201,'thinsp'],
[8204,'zwnj'],
[8205,'zwj'],
[8206,'lrm'],
[8207,'rlm'],
[8211,'ndash'],
[8212,'mdash'],
[8216,'lsquo'],
[8217,'rsquo'],
[8218,'sbquo'],
[8220,'ldquo'],
[8221,'rdquo'],
[8222,'bdquo'],
[8224,'dagger'],
[8225,'dagger'],
[8226,'bull'],
[8230,'hellip'],
[8240,'permil'],
[8242,'prime'],
[8243,'prime'],
[8249,'lsaquo'],
[8250,'rsaquo'],
[8254,'oline'],
[8364,'euro'],
[8482,'trade'],
[8592,'larr'],
[8593,'uarr'],
[8594,'rarr'],
[8595,'darr'],
[8596,'harr'],
[8629,'crarr'],
[8968,'lceil'],
[8969,'rceil'],
[8970,'lfloor'],
[8971,'rfloor'],
[9674,'loz'],
[9824,'spades'],
[9827,'clubs'],
[9829,'hearts'],
[9830,'diams']
];

let _char_to_html_entity_map = {};

/*
for (let i = 32; i < 160; i++) {
	if (i != 38 && i != 60 && i != 62) {
		_char_to_html_entity_map[String.fromCharCode(i)] = `&#${i};`
	}
}
*/

for (let i = 0; i < _html_entity.length; i++) {
	let item = _html_entity[i];
	
	_char_to_html_entity_map[String.fromCharCode(item[0])] = `&${item[1]};`;
}

let _html_entity_to_char_map = {};

for (let i = 0; i < _html_entity.length; i++) {
	let item = _html_entity[i];
	
	_html_entity_to_char_map[item[1]] = String.fromCharCode(item[0]);
}

const _htmlEncode = x => {
	let result = [];
	let s = toStr(x);
	
	for (let i = 0; i < s.length; i++) {
		let ch = _char_to_html_entity_map[s[i]];
		
		result.push(ch ? ch: s[i]);
	}
	
	return result.join('');
};
								
const _htmlDecode = x => toStr(x)
								.replace(/&#?\w+;/g, he => {
									let result = '';
									let isNum = false;
									let code = '';
									
									for (let i = 1; i < he.length - 1; i++) {
										if (he[i] == '#') {
											isNum = true;
											continue;
										}
										
										code += he[i];
									}
									
									if (!isNum) {
										code = code.toLowerCase();
									}
									
									if (isNum) {
										result =  String.fromCharCode(parseInt(code));
									} else {
										result = _html_entity_to_char_map[code];
										
										if (!result) {
											result = `&#${code};`;
										}
									}
									
									return result;
								});

const htmlEncode = x => apply(x, (o, key, value) => {
	let result;
	
	if (key != null) {
		result = o[key] = _htmlEncode(value);
	} else {
		result = o = _htmlEncode(value);
	}
	
	return result;
});

const htmlEncodeToString = x => join(htmlEncode(x), '', '');

const htmlDecode = x => apply(x, (o, key, value) => {
	let result;
	
	if (key != null) {
		result = o[key] = _htmlDecode(value);
	} else {
		result = o = _htmlDecode(value);
	}
	
	return result;
});

const htmlDecodeToString = x => join(htmlDecode(x), '', '');

const range = (from, to) => {
   let result = [];
	
   for (let i = from; i < to; i++) {
	 result.push(i);
   }
	
   return result;
};

var util = /*#__PURE__*/Object.freeze({
	__proto__: null,
	NotImplementedException: NotImplementedException,
	getEl: getEl,
	getEls: getEls,
	isEmpty: isEmpty,
	isArray: isArray,
	isFunction: isFunction,
	isObject: isObject,
	isEmptyObject: isEmptyObject,
	isSomeObject: isSomeObject,
	isSomeString: isSomeString,
	isDate: isDate,
	isBool: isBool,
	isPureFunction: isPureFunction,
	isNumeric: isNumeric,
	isClass: isClass,
	deepAssign: deepAssign,
	toStr: toStr,
	lastIndexOf: lastIndexOf,
	left: left,
	right: right,
	merge: merge,
	join: join,
	unmerge: unmerge,
	apply: apply,
	trim: trim,
	lower: lower,
	upper: upper,
	reverse: reverse,
	reverseToString: reverseToString,
	capitalize: capitalize,
	urlEncode: urlEncode,
	urlEncodeToString: urlEncodeToString,
	urlDecode: urlDecode,
	urlDecodeToString: urlDecodeToString,
	urlEncodeComponent: urlEncodeComponent,
	urlDecodeComponent: urlDecodeComponent,
	_char_to_html_entity_map: _char_to_html_entity_map,
	_html_entity_to_char_map: _html_entity_to_char_map,
	_htmlEncode: _htmlEncode,
	_htmlDecode: _htmlDecode,
	htmlEncodeToString: htmlEncodeToString,
	htmlEncode: htmlEncode,
	htmlDecode: htmlDecode,
	htmlDecodeToString: htmlDecodeToString,
	Dec2Bin: Dec2Bin,
	Dec2Hex: Dec2Hex,
	Dec2Oct: Dec2Oct,
	Bin2Dec: Bin2Dec,
	Bin2Hex: Bin2Hex,
	Bin2Oct: Bin2Oct,
	Oct2Dec: Oct2Dec,
	Oct2Hex: Oct2Hex,
	Oct2Bin: Oct2Bin,
	Hex2Dec: Hex2Dec,
	Hex2Oct: Hex2Oct,
	Hex2Bin: Hex2Bin,
	range: range
});

function tagHelper(literals, expressions, fnLiteral, fnExpression) {
   let result = [];
   
   for (let i = 0; i < literals.length; i++) {
      result.push(fnLiteral(literals[i]));

      if (i < literals.length - 1) {
         result.push(fnExpression(expressions[i]));
      }
   }

   return result.join('');
}
function lower$1(literals, ...expressions) {
   return tagHelper(literals, expressions, x => x, x => lower(x));
}
function upper$1(literals, ...expressions) {
   return tagHelper(literals, expressions , x => x, x => upper(x));
}
function urlEncode$1(literals, ...expressions) {
   return tagHelper(literals, expressions, x => urlEncodeToString((typeof x == 'string' ? x.trim() : x)), x => urlEncodeToString(x));
} 
function urlDecode$1(literals, ...expressions) {
   return tagHelper(literals, expressions, x => urlDecodeToString(x), x => urlDecodeToString(x));
}
function reverse$1(literals, ...expressions) {
   return tagHelper(literals, expressions , x => x, x => reverse(x));
}
function htmlEncode$1(literals, ...expressions) {
	return tagHelper(literals, expressions , x => x, x => htmlEncodeToString(x));
}
function htmlDecode$1(literals, ...expressions) {
	return tagHelper(literals, expressions , x => x, x => htmlDecodeToString(x));
}

var tags = {
	tagHelper,
	lower: lower$1,
	upper: upper$1,
	urlEncode: urlEncode$1,
	urlDecode: urlDecode$1,
	reverse: reverse$1,
	htmlEncode: htmlEncode$1,
	htmlDecode: htmlDecode$1
};

var tags$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': tags
});

const isValidTag			= (tag) => isSomeString(tag) && /^[a-zA-Z][a-zA-Z0-9-_]*$/.test(tag);
const isValidAttributeName	= (attr) => isSomeString(attr) && /^[a-zA-Z][a-zA-Z0-9-_]*$/.test(attr);
const isValudURI			= (uri) => isSomeString(uri) && /^(http|https):\/\/[a-zA-Z0-9-_\.]$/.test(uri);
const isValidEvent			= (e) => isSomeString(e) && /^\w+$/.test(e);
const isValidDomId			= (e) => isSomeString(e) && /^\w(\w|-|:|\.)*$/.test(e);
const isValidId				= (e) => isSomeString(e) && /^[a-zA-Z]\w*$/.test(e);

var validation = /*#__PURE__*/Object.freeze({
	__proto__: null,
	isValidTag: isValidTag,
	isValidAttributeName: isValidAttributeName,
	isValudURI: isValudURI,
	isValidEvent: isValidEvent,
	isValidDomId: isValidDomId,
	isValidId: isValidId
});

const logType = {
					info		: 'info'		, 	//	normal message
					primary		: 'primary'		,	// important log
					secondary	: 'secondary'	,	// log of secondary importance
					alert		: 'alert'		,	// something detected without the user's hands in it.
					cancel		: 'cancel'		,	// user asked to cancel the operation
					success		: 'success'		,	// informing that something succeeded
					suggest		: 'suggest'		,	// give a suggestion to recover or resolve an issue
					abort		: 'abort'		,	// operation aborted without the user request to cancel it
													// it happened in the midth of the operation due to errors
					trace		: 'trace'		, 	//	log a message with trace line number
					debug		: 'debug'		, 	//	debug message or information, e.g. local variables or parameters
					warning		: 'warning'		, 	//	something detected with user's hands in it
													//	a function called which expected 3 args but received 2 args.
													//		it is not an error though since the function can handle it
													//		and use a default, it's just a warning sign.
					fatal		: 'fatal'		, 	// reporting a high unexpected exception or situation where no further operation can be done
													// like when no window or document object found
					danger		: 'danger'		,	// reporting exceptions
					fail		: 'fail'		,	// reporting after exceptions: we wanted to do something but an exception raised
					error		: 'error'			//	a logical error that code detected.
													//   	e.g. a class expected a callback function to be passed to its constructor
													//		but the given argument is not a function
				};
const logFilter = {
	none: [],
	success: ['success', 'error'],		// success, error
					// 		we just want to see whether system is healthy or not
	info: ['info', 'primary', 'secondary', 'alert', 'cancel', 'success', 'suggest', 'abort'],
					//		we want to see the details of the log to see how the system operates and works
	debug: ['primary', 'alert', 'abort', 'cancel', 'fatal', 'danger', 'fail', 'error', 'trace', 'suggest'],
					// 		we wan to debug some erro or issue, only important logs are minded for us
	warning: ['warning', 'alert', 'suggest'],
					//		our focus is on warnings, alerts, suggestions
	error: ['fatal', 'danger', 'fail', 'error', 'suggest'],
					//		we want to see only the errors to go right to the issues
	all: ['info', 'primary', 'secondary', 'alert', 'cancel', 'success', 'suggest', 'abort', 'trace', 'debug', 'warning', 'fatal', 'danger', 'fail', 'error']
};
class BaseLogger {
	constructor(props) {
		jq.extend(this, props);
		
		if (!isArray(this.filter)) {
			this.filter = logFilter.none;
		}
		
		this.setting = deepAssign({
				'info'		: { color: 'black'		, bold: false, size: null, italic: false, blink: false },
				'primary'	: { color: 'blue'		, bold: false, size: null, italic: false, blink: false },
				'secondary'	: { color: 'gray'		, bold: false, size: null, italic: false, blink: false },
				'alert'		: { color: 'darkorange'	, bold: false, size: null, italic: false, blink: false },
				'cancel'	: { color: 'purple'		, bold: false, size: null, italic: false, blink: false },
				'success'	: { color: 'green'		, bold: false, size: null, italic: false, blink: false },
				'suggest'	: { color: 'magenta'	, bold: false, size: null, italic: false, blink: false },
				'abort'		: { color: 'indigo'		, bold: false, size: null, italic: false, blink: false },
				'trace'		: { color: 'darkcyan'	, bold: false, size: null, italic: false, blink: false },
				'debug'		: { color: 'navy'		, bold: false, size: null, italic: false, blink: false },
				'warning'	: { color: 'brown'		, bold: false, size: null, italic: false, blink: false },
				'fatal'		: { color: 'darkred'	, bold: true , size: null, italic: false, blink: false },
				'danger'	: { color: 'red'		, bold: false, size: null, italic: false, blink: false },
				'fail'		: { color: 'maroon'		, bold: false, size: null, italic: false, blink: false },
				'error'		: { color: 'violet'		, bold: false, size: null, italic: false, blink: false },
			}, (props && props.setting));
	}
	getStyle(type) {
		let _setting = this.setting[type];
		let result = [];
		
		if (_setting) {
			if (_setting.color) {
				result.push(`color: ${_setting.color}`);
			}
			if (_setting.bold) {
				result.push(`font-weight: bold`);
			}
			if (_setting.italic) {
				result.push(`font-style: italic`);
			}
			if (_setting.size) {
				result.push(`font-size: ${_setting.size}`);
			}
		}
		
		return result.join(';')
	}
	_logInternal(log) {
		NotImplementedException(`${this.constructor.name}._logInternal()`);
	}
	log(...args) {
		this.logAs('info', ...args);
	}
	logAs(type, ...args) {
		if (args.length) {
			if (isEmpty(type) || logFilter.all.indexOf(type) < 0) {
				type = logType.info;
			}
			
			if (this.filter.indexOf(type) >= 0) {
				args.forEach(data => {
					this._logInternal({ type, data, date: new Date()});
				});
			}
			
			if (isSomeObject(this.next) && this.next instanceof BaseLogger) {
				this.next.logAs(type, ...args);
			}
		}
	}
	info(...args) 		{ this.logAs('info', ...args);		}
	primary(...args) 	{ this.logAs('primary', ...args);	}
	secondary(...args) 	{ this.logAs('secondary', ...args);	}
	alert(...args) 		{ this.logAs('alert', ...args);		}
	cancel(...args) 	{ this.logAs('cancel', ...args);		}
	success(...args) 	{ this.logAs('success', ...args);	}
	suggest(...args) 	{ this.logAs('suggest', ...args);	}
	abort(...args) 		{ this.logAs('abort', ...args);		}
	trace(...args) 		{ this.logAs('trace', ...args);		}
	debug(...args) 		{ this.logAs('debug', ...args);		}
	warn(...args)		{ this.logAs('warning', ...args);	}
	fatal(...args) 		{ this.logAs('fatal', ...args);		}
	danger(...args) 	{ this.logAs('danger', ...args);		}
	fail(...args) 		{ this.logAs('fail', ...args);		}
	error(...args) 		{ this.logAs('error', ...args);		}
	isValidLog(log) {
		return isSomeObject(log) && isSomeString(log.type) && isDate(log.date);
	}
}

class NullLogger extends BaseLogger {
	constructor(props) {
		super(props);
	}
	_logInternal(log) { }
}

class ConsoleLogger extends BaseLogger {
	constructor(props) {
		super(props);
	}
	_logInternal(log) {
		if (this.isValidLog(log)) {
			let _style = this.getStyle(log.type);
			
			if (_style) {
				console.log(`%c${log.data}`, _style);
			} else {
				console.log(log.data);
			}
		}
	}
}

class StoreLogger extends BaseLogger {
	constructor(props) {
		super(props);
		
		if (!isArray(this.store)) {
			this.store = [];
		}
	}
	_logInternal(log) {
		if (this.isValidLog(log)) {
			this.store.push(log);
		}
	}
}
class StringLogger extends StoreLogger {
	constructor(props) {
		super(props);
		
		if (!isSomeString(this.logFormat)) {
			this.logFormat = '%date: %data\n';
		}
		if (!isSomeString(this.replacer)) {
			this.replacer = '\t';
		}
		if (!isSomeString(this.space)) {
			this.space = '   ';
		}
	}
	format(log) {
		return this.isValidLog(log) ?
			this.logFormat.replace(/%date/g, log.date)
			 			  .replace(/%type/g, log.type)
						  .replace(/%data/g, JSON.stringify(log.data, this.replacer, this.space))
						 : '';
	}
	stringify() {
		return this.store.map(log => this.format(log)).join('');
	}
}
class DomLogger extends BaseLogger {
	constructor(props) {
		super(props);
		
		if (!isSomeString(this.target)) {
			this.target =  '#logs';
		}
		
		if (!isSomeString(this.lineBreak)) {
			this.lineBreak = '<br/>\n';
		}
		if (!isSomeString(this.replacer)) {
			this.replacer = '\t';
		}
		if (!isSomeString(this.space)) {
			this.space = '   ';
		}
		if (!jq.isFunction(this.onLog)) {
			this.onLog = () => {};
		}
		
		this._target = jq(this.target);
	}
	_logInternal(log) {
		if (this.isValidLog(log)) {
			this.onLog(log);
		}
	}
}
class DomJsonLogger extends DomLogger {
	constructor(props) {
		super(props);
	}
	onLog(log) {
		if (this._target && this._target.length) {
			try {
				this._target.append(JSON.stringify(log, this.replacer, this.space));
			} catch (e) {
				this._target.append(JSON.stringify('error serializing log', this.replacer, this.space));
			}
		}
	}
}
class DomTableLogger extends DomLogger {
	constructor(props) {
		super(props);
		
		if (this._target && this._target.find('thead').length == 0) {
			this._target.append(`
				<thead>
					<th>Date</th>
					<th>Type</th>
					<th>Data</th>
				</thead>
			`);
		}
		if (this._target && this._target.find('tbody').length == 0) {
			this._target.append(`<tbody></thead>`);
		}
	}
	onLog(log) {
		let data = '';
		try {
			if (typeof log.data == 'string' || typeof log.data == 'number') {
				data = log.data;
			} else {
				data = htmlEncodeToString(JSON.stringify(log.data, this.replacer, this.space));
			}
		} catch (e) {
			data = 'error serializing data';
		}
		if (this._target && this._target.length) {
			this._target.find('tbody').append(`
				<tr>
					<td>${log.date.toLocaleString()}</td>
					<td>${log.type}</td>
					<td>${data}</td>
				</tr>
			`);
		}
	}
}

var logging = /*#__PURE__*/Object.freeze({
	__proto__: null,
	logType: logType,
	logFilter: logFilter,
	BaseLogger: BaseLogger,
	NullLogger: NullLogger,
	ConsoleLogger: ConsoleLogger,
	StoreLogger: StoreLogger,
	StringLogger: StringLogger,
	DomLogger: DomLogger,
	DomJsonLogger: DomJsonLogger,
	DomTableLogger: DomTableLogger
});

if (jq == null) {
	throw 'jQuery not present'
}

const tags$2 = [	'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
				'p', 'b', 'strong', 'i', 'ins', 'pre', 'q', 'small', 'strike', 'font', 'sub', 'summary', 'sup', 'u', 
				'div', 'span',
				'img', 'figure', 'figcaption', 'picture', 'section', 'article', 'header', 'footer',
				'table', 'thead', 'th', 'tr', 'td', 'tbody', 'tfoot',
				'canvas', 'video', 'audio',
				'form', 'button', 'input', 'textarea', 'fieldset', 'kbd', 'label', 'legend', 'select', 'optgroup', 'option', 
				'ul', 'li', 'dd', 'dl', 'dt', 'ol', 
				'a', 'abbr', 'acronym', 'link',
				'address', 'area', 'aside', 'base', 'basefont', 'bdi', 'blockquote', 'caption', 'center',
				'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'del', 'details', 'dfn',
				'dialog', 'dir', 'em', 'embed', 'applet', 'noframes', 'iframe', 'frame', 'frameset', 'hr', 'br', 
				'main', 'map', 'mark', 'meter', 'map', 'noscript', 'script', 'object', 'output', 'param', 'progress', 
				'rp', 'rt', 'ruby', 's', 'samp', 'source', 'svg', 'template', 'time', 'track', 'tt', 'var', 'wbr'
				 // 'style' and 'dir'	these tags are ommited since we want their attribute counterparts
				 // have more priority. for example in <button style${...}>, <div dir${...}>, style and dir
				 // must be assumed as attributes. 'style' is more prevalent than <style>.
				 // if we want to force using 'style' or 'dir' as a tag, we can leverage $style${...} or $dir${...}
				 // or define an explicit styleTag, dirTag class.
			];
/*
	attributes that there's a tag with their name in HTML:
		summary: <table>
		span: <col>, <colgroup>
		form: input elements
		label: <optgroup>, <option>, <track>
		cite: <blockquote>, <del>, <ins>, <q>
		code: <applet>
		data: <object>
		dir: 'ltr', 'rtl'
	
	when detecting a xxx${value} here is our rules:
		0. is there a function/class named xxxClass or xxxElement && xxx has a render() method ?
				instantiate from the function/class and pass value to its ctor. xxx is assumed case-sensitive.
		1. is there a function/class named xxxTag ?
				instantiate from the function/class and pass value to its ctor. xxx is assumed case-sensitive.
		2. is there a function/class named xxxAttribute ?
				instantiate from the function/class and pass value to its ctor. xxx is assumed case-sensitive.
			
		4. is xxx == 'dir' ? instantiate from BaseAttribute({ attributeName: 'dir'})
		5. is xxx == 'style' ? instantiate from styleAttribute
		6. is xxx == 'class' ? instantiate from classAttribute
		7. is there an event named xxx in events array? instantiate from eventHandlerAttribute({ event: xxx })
		8. is there a tag named xxx? instantiate from BaseTag($.extend({ tagName: xxx}, value)). xxx is assumed case-insensitive.
		9. instantiate from BaseAttribute({ attributeName: xxx }). xxx is assumed case-insensitive.
		
		in order to use xxx as an attribute where xxx is already found in tags (like summary, span, ...)
		the user requires to use ^xxx${value} to explicitly indicate that he is using an attribute.
			e.g.  <input ^form${'my-form'} />
		
		'dir' is an exception and is always assumed as an attribute. if the user decides
		to use it as a tag he should define a class named dirTag or dirClass or uses $dir${...}
		
		'style' is also an exception. we can't assume any priority between attribute and tag
		since 'style' is so common both as an attribute and as a tag. we gave more priority to attribute
		eventually and removed 'style' from tags list. instead we defined a 'stylesTag' class
		so that the user is able to use 'styles' as a tag. the extra 's' in 'styles' is removed
		internally in stylesTag class. there's also an option to use $style${args} to force 'style' as a tag
		
		
	special characters:
		#xxx${handler}		manual event handler (assume xxx as an event name that is not listed in events array. use eventHandlerAttribute)
		^xxx${value}		assume xxx as an attribute (use BaseAttribute class)	e.g.	^style${args}
		@${xxx}${value}		dynamic name execution. assume xxx as a name as if xxx${value} is specified.
		$xxx${value}		assume xxx as a tag (use BaseTag class) 				e.g.	$asp-text${args}
		//...${value}		comment: ignore the text after // and next expression
		
		 ${x}	htmlEncode
		!${x}	no html encode
		%${x}	urlencode
		&${x}	urldecode
		#${x}	htmldeocde
		~${x}	capitalize
		=${x}	upper
		-${x}	lower
		$${x}	?
		,${x}	?
		;${x}	?
		*${x}	command
		+${x}	?
		/${x}	reverse
		|${x}	trim
		.${x}	lastId	e.g. .${0}, .${''}
		:${x}	?
		>${x}	?
		<${x}	?
		
		*b${}	dec2bin
		*x${}	dec2hex
		*o${}	dec2oct
		
		*bd${}	bin2dec		*bd${1101}	=> 13
		*bx${}	bin2hex		*bx${1101}	=> c
		*bo${}	bin2oct		*bx${1101}	=> 15
		
		*od${}	oct2dec		*od${15}	=> 13
		*ox${}	oct2hex		*ox${15}	=> c
		*ob${}	oct2bin		*ob${15}	=> 1101
		
		*xd${}	hex2dec		*xd${'1c'}	=> 29
		*xo${}	hex2oct		*xo${'1c'}	=> 35
		*xb${}	hex2bin		*xb${'1c'}	=> 11101
		
		id${...}, #${...} rules:
			id${'#a'}	=> set id for me (me.id)
			id${'#'}	=> generate id for me	(me.id)	alternate
			id${0}		=> generate id for last and store at 0		(me.lastId, me._ids[0])
			id${1}		=> generate id for last and store at 1		(me.lastId, me._ids[1])
			id${''}		=> generate id for last and store at last	(me.lastId)

			#${'#'}		=> get my id	(me.id)
			#${'.'}		=> get my id	(me.id) alternative
			#${0}		=> get _ids[0]	(me._ids[0])
			#${1}		=> get _ids[1]	(me._ids[1])
			#${''}		=> get last id	(me.lastId)
*/

const events = [
		'onabort',
		'onafterprint',
		'onbeforeprint',
		'onbeforeunload',
		'onblur',
		'oncanplay',
		'oncanplaythrough',
		'onchange',
		'onclick',
		'oncontextmenu',
		'oncopy',
		'oncuechange',
		'oncut',
		'ondblclick',
		'ondrag',
		'ondragend',
		'ondragenter',
		'ondragleave',
		'ondragover',
		'ondragstart',
		'ondrop',
		'ondurationchange',
		'onemptied',
		'onended',
		'onerror',
		'onfocus',
		'onhashchange',
		'oninput',
		'oninvalid',
		'onkeydown',
		'onkeypress',
		'onkeyup',
		'onload',
		'onloadeddata',
		'onloadedmetadata',
		'onloadstart',
		'onmousedown',
		'onmousemove',
		'onmouseout',
		'onmouseover',
		'onmouseup',
		'onmousewheel',
		'onoffline',
		'ononline',
		'onpagehide',
		'onpageshow',
		'onpaste',
		'onpause',
		'onplay',
		'onplaying',
		'onpopstate',
		'onprogress',
		'onratechange',
		'onreset',
		'onresize',
		'onscroll',
		'onsearch',
		'onseeked',
		'onseeking',
		'onselect',
		'onstalled',
		'onstorage',
		'onsubmit',
		'onsuspend',
		'ontimeupdate',
		'ontoggle',
		'onunload',
		'onvolumechange',
		'onwaiting',
		'onwheel'
	];

const cssAttribute = attr => {
	let result = [];
	let i = 0;
	
	for (let ch of attr) {
		if (/[A-Z]/.test(ch)) {
			if (i == 0) {
				result.push(ch.toLowerCase());
			} else {
				result.push('-' + ch.toLowerCase());
			}
		} else {
			result.push(ch);
		}
		
		i++;
	}
	
	return result.join('');
};

class j6tIdProvider {
	isValid(id) {
		return isValidDomId(id);
	}
	generate(id) { NotImplementedException(`${this.constructor.name}.generate()`); }
	getState() { }
	setState(arg) { }
	restoreState() { }
}

class j6tUniversalIdProvider extends j6tIdProvider {
	constructor(props) {
		let type = typeof props;
		let _props = {};
		
		switch (type) {
			case 'object': _props = props; break;
			case 'number': _props.counter = props; break;
			case 'string': _props.idPrefix = props; break;
		}		
		super();
		
		jq.extend(this, {
			counter: 0,
			preservedCounter: 0,
			idPrefix: '_el_'
		}, _props);
	}
	generate(id) {
		let doGenerate = false;
		
		if (typeof id != 'string' || !this.isValid(id)) {
			doGenerate = true;
		} else {
			id = id.trim();
			
			if (id.indexOf(' ') >= 0) {
				doGenerate = true;
			}
		}
		
		return doGenerate? `${this.idPrefix}${this.counter++}`: id;
	}
	getState() {
		return this.counter;
	}
	setState(arg) {
		if (isNumeric(arg)) {
			this.preservedCounter = this.counter;
			this.counter = parseInt(arg);
		}
	}
	restoreState() {
		this.counter = this.preservedCounter;
	}
}

class j6tRoot {
	get version() {
		return '1.3.5'
	}
	render(component, target) {
		if (component instanceof(Component) && jq(target).length == 1) {
			let content = [];
			let html = '';
			
			Component.links.forEach(link => {
				if (!link.applied) {
					link.element.preRender();
					html = link.element.render();
					content.push(html);
					link.applied = true;
				}
			});
			
			component._idProviderState = component.idProvider.getState();
			
			component.preRender();
			
			html = component.render();
			
			content.push(html);
			
			Component.scripts.forEach(script => {
				if (!script.applied) {
					script.element.preRender();
					html = script.element.render();
					content.push(html);
					script.applied = true;
				}
			});
			
			jq(target).html(content.join('\n'));
			
			component.postRender();
			component.bindEvents();
		}
	}
}

class Component {
	constructor(props) {
		this.props = jq.extend({}, (isSomeObject(props) ? props: { arg: props }));
		
		if (isSomeObject(this.props.parent)) {
			this.parent = this.props.parent;
		}
		
		if (isSomeObject(this.props.logger)) {
			this.logger = this.props.logger;
		}
		
		if (!(this.logger instanceof(BaseLogger))) {
			if (isSomeObject(this.parent) && this.parent.logger instanceof(BaseLogger)) {
				this.logger = this.parent.logger;
			} else {
				this.logger = new NullLogger();
			}
		}
		
		if (isBool(this.props.isRoot)) {
			this.isRoot = this.props.isRoot;
		}
		
		if (isEmpty(this.parent)) {
			if (!this.isRoot) {
				this.logger.warn(`warning: no parent specified for this ${this.constructor.name} instance`);
			}
		}
		
		let reservedIdProvider;
		
		if (isSomeObject(this.props.idProvider)) {
			this.idProvider = this.props.idProvider;
		}
		
		if (!isSomeObject(this.idProvider) && isSomeObject(this.parent) && isSomeObject(this.parent.idProvider)) {
			this.logger.secondary(`no idProvider specified for this ${this.constructor.name} instance. Used its parent's idProvider.`);
			
			this.idProvider = this.parent.idProvider;
		}
		
		if (!(this.idProvider instanceof(j6tIdProvider))) {
			this.logger.error(`specified IdProvider is not a j6tIdProvider instance`);
			this.logger.error(`used j6tUniversalIdProvider as fallback`);
			
			reservedIdProvider = new j6tUniversalIdProvider();
			
			this.idProvider = reservedIdProvider;
		}
		
		if (isSomeString(this.props.id)) {
			this.logger.debug(`props.id = ${this.props.id}`);
			
			this.id = this.props.id;
		}
		
		this.id = this.idProvider.generate(this.id);
		
		if (!isSomeString(this.id) || this.id.indexOf(' ') >= 0) {
			this.logger.error(`error: current ${this.constructor.name}'s IdProvider couldn't generate a valid id`);
			this.logger.error(`Using a j6tUniversalIdProvider as fallback ...`);
			
			if (!isSomeObject(reservedIdProvider)) {
				reservedIdProvider = new j6tUniversalIdProvider();
			}
			
			this.id = reservedIdProvider.generate(this.id);
		}
		
		this.logger.secondary(`current id = '${this.id}'`);
		this.logger.debug(`props:`);
		
		let __props = {...props};
		
		delete __props.logger;
		delete __props.parent;
		delete __props.container;
		delete __props.idProvider;
		
		this.logger.debug(__props);
		
		this._idProviderState = null;
		this._ids = [];
		this.lastId = '';	// not used anymore
		this._hasWrapper = isBool(this.props.hasWrapper) ? this.props.hasWrapper: false;
		this._lastOwner = null;
		this._children = [];
		this.__events = [];		// copy of _events which is not reset when refreshing, so that
								// the component is able to restore some event properties such as 'bound'
		this._events = [];		/*	item structure:
									{
										target: '#xyz',			// selector e.g. '.xyz', 'p', ...
										name: 'click', 			// dbclick, keydown, ...
										handler: function
									}
								*/
		this._resources = [];
		this._parseLevel = 0;
    }
	get children() {
		return this._children;
	}
	generateId(id) {
		return this.idProvider.generate(id);
	}
	exec(command, value) {
		let result = '';
		
		this.logger.info(`exec('${command}', value) ...`);
		this.logger.debug(value);
		
		switch (command) {
			case 'b':
				result = Dec2Bin(value);
				break;
			case 'x':
				result = Dec2Hex(value);
				break;
			case 'o':
				result = Dec2Oct(value);
				break;
				
			case 'bd':
				result = Bin2Dec(value);
				break;
			case 'bx':
				result = Bin2Hex(value);
				break;
			case 'bo':
				result = Bin2Oct(value);
				break;
				
			case 'od':
				result = Oct2Dec(value);
				break;
			case 'ox':
				result = Oct2Hex(value);
				break;
			case 'ob':
				result = Oct2Bin(value);
				break;
			
			case 'xd':
				result = Hex2Dec(value);
				break;
			case 'xo':
				result = Hex2Oct(value);
				break;
			case 'xb':
				result = Hex2Bin(value);
				break;
				
			case 'urlencode':
				result = urlEncodeToString(value);
				break;
			case 'urldecode':
				result = urlDecodeToString(value);
				break;
			case 'htmldecode':
				result = htmlDecode(value);
				break;
			case 'upper':
				result = upper(value);
				break;
			case 'lower':
				result = lower(value);
				break;
			case 'capitalize':
				result = capitalize(value);
				break;
			case 'reverse':
				result = reverseToString(value);
				break;
			case 'trim':
				result = trim(value);
				break;
			default:
				result = '*' + command + htmlEncodeToString(value);
				break;
		}
		
		return result;
	}
	validateText(text) {
		return text;
	}
	validateHtml(html) {
		return html;
	}
	parseCssSelector(selector) {
		let result = '';
		let state = 0;
		let value = '';
		let me = this;
		const arr = [' ', '.', '>', ',', '[', ':', '+', '~', '\t'];
		
		this.logger.info(`parseCssSelector('${selector}')`);
		
		function state1(ch, ended) {
			if (arr.indexOf(ch) >= 0) {
				if (isNumeric(value)) {
					result += me._ids[parseInt(value)] + (ended ? '' : ch);
					value = '';
				} else {
					if (value == '#' || value == '') {
						result += me.id + (ended ? '' : ch);
					} else {
						result += value + (ended ? '' : ch);
					}
				}
				state = 0;
			} else {
				if (ended) {
					result += value;
				} else {
					value += ch;
				}
			}
		}
		
		if (isSomeString(selector)) {
			for (let i = 0; i < selector.length; i++) {
				const ch = selector[i];
				
				switch (state) {
					case 0:
						if (ch == '#') {
							result += ch;
							value = '';
							state = 1;
						} else {
							result += ch;
						}
						break;
					case 1:
						state1(ch, false);
						
						break;
				}
			}
			
			if (state == 1) {
				state1('.', true);
			}
		}
		
		this.logger.debug(`		result = '${result}'`);
		
		return result;
	}
	parse(literals, ...expressions) {
		const me = this;
		
		me._parseLevel++;
		
		let result = [];
		let arr;
		
		me.logger.info(`parse()`);
		me.logger.debug(`		literals`);
		me.logger.debug(literals);
		me.logger.debug(`		expressions`);
		me.logger.debug(expressions);
		
		function _evalName(args) {
			/*
				args: {
					name: 'name',
					arg: anything,
					directive: ''	// ^, #
				}
			*/
			function _create(str, props, ignoreOwner) {
				let obj;
				
				me.logger.secondary(str);
				
				let __props = {...props};
		
				delete __props.logger;
				delete __props.parent;
				delete __props.container;
				delete __props.idProvider;
				
				me.logger.debug(__props);
				
				try {
					const _eval = eval;
					
					obj = eval(str);
					
					if (!ignoreOwner) {
						me._lastOwner = obj;
					}
				} catch (e) {
					me.logger.fail(e);
				}
				
				return obj;
			}
			
			function _render(x) {
				if (isSomeObject(x)) {
					if (!(x instanceof(BaseAttribute) || x instanceof(bindElement))) {
						me._children.push(x);
					}
					
					if (isFunction(x.render)) {
						if (x.idProvider instanceof j6tIdProvider) {
							x._idProviderState = x.idProvider.getState();
							
							me.logger.debug(`		x._idProviderState = ${x._idProviderState}`);
						}
						
						if (isFunction(x.preRender)) {
							try {
								x.preRender();
							} catch (e) {
								me.logger.fail(`x.preRender failed!`);
								me.logger.danger(e);
							}
						} else {
							me.logger.secondary(`no preRender() found`);
						}
						
						let html;
						
						try {
							html = x.render();
						} catch (e) {
							me.logger.fail(`render failed!`);
							me.logger.danger(e);
						}
						
						if (html) {
							result.push(html);
						} else {
							me.logger.warn(`x.render() didn't produce anything.`);
						}
					} else {
						me.logger.fail(`x didn't have a render() method. odd.`);
					}
				} else {
					me.logger.error(`x is not an object`);
				}
			}
			
			function _check(str) {
				let result = false;
				
				try {
					const _eval = eval;
					
					result = eval(str);
				} catch {}
				
				return result;
			}
			
			let obj;
			let dynamicRender = '';
			let props;
			
			do {
				if (!isValidId(args.name)) {
					result.push(args.directive + htmlEncodeToString(args.name + (args.arg || '').toString()));
					
					break;
				}
				
				props = isSomeObject(args.arg) ? { ...args.arg } : { arg: args.arg };
				
				if (args.name == 'bind') {
					props.container = me;
				} else {
					props.parent = me;
				}
				
				if (_check(`util.isFunction(${args.name})`)) {
					obj = _create(`new ${args.name}(props)`, props);
					
					dynamicRender = args.name;
					
					break;
				}
				if (_check(`util.isFunction(${args.name}Element)`)) {
					obj = _create(`new ${args.name}Element(props)`, props);
					
					dynamicRender = `${args.name}Element`;
					
					break;
				}
				
				if (_check(`util.isFunction(${args.name}Tag)`)) {
					obj = _create(`new ${args.name}Tag(props)`, props);
					
					dynamicRender = `${args.name}Tag`;
					
					break;
				}
				
				if (_check(`util.isFunction(${args.name}Attribute)`)) {
					let currentIdIsForMe = false;
					
					if (args.name == 'id') {
						if (isSomeString(args.arg) && args.arg[0] == '#') {
							if (args.arg.length > 1) {
								me.logger.secondary(`manual id '${args.arg}' for current component specified.`);
								
								currentIdIsForMe = true;
								args.arg = args.arg.substr(1);
							} else {
								me.logger.secondary(`current component id '${me.id}' requested.`);
								
								args.arg = me.id;
								me._hasWrapper = true;
							}
						} else if (args.arg == '.') {
							me.logger.secondary(`current component id '${me.id}' requested.`);
							
							args.arg = me.id;
						}
					}
					
					obj = _create(`new ${args.name}Attribute({ attributeName: '${args.name}', attributeValue: args.arg, container: me })`, null, true);
					
					dynamicRender = `${args.name}Attribute`;
					
					if (isSomeObject(obj)) {
						if (currentIdIsForMe) {
							me.id = obj.attributeValue;
							
							me.logger.secondary(`current component's id was changed to '${me.id}'.`);
						}
					}
					
					break;
				}
				
				if ((events.indexOf(args.name) >= 0 || args.directive == '#')) {
					if (me._ids.length) {
						me.logger.secondary(`event ${args.name} ${(args.directive == '#'?'was forced':' was found')}.`);
						
						obj = new bindElement({
							event: args.name,
							container: me,
							target: `#${me._ids[me._ids.length - 1]}`,	// me.lastId
							handler: args.arg
						});
					
						break;
					} else {
						me.logger.warn(`component _ids list is empty. cannot create event '${args.name}'.`);
					}
				}
				
				if (tags$2.indexOf(args.name) >= 0) {
					if (args.directive == '^') {
						me.logger.secondary(`${args.name} forced to be evaluated as an attribute.`);
						
						try {
							obj = new BaseAttribute({ attributeName: args.name, attributeValue: args.arg, container: me });
						} catch (e) {
							me.logger.fail(`attribute creation failed!`);
							me.logger.danger(e);
						}
					} else {
						me.logger.secondary(`${args.name} evaluated as a tag.`);
						
						try {
							obj = new BaseTag({ tagName: args.name, ...props });
						} catch (e) {
							me.logger.fail(`tag creation failed!`);
							me.logger.danger(e);
						}
					}
					
					break;
				}
				
				if (args.directive == '$') {
					me.logger.secondary(`${args.name} forced to be evaluated as a tag.`);
					
					try {
						obj = new BaseTag({ tagName: args.name, ...props });
					} catch (e) {
						me.logger.fail(`tag creation failed!`);
						me.logger.danger(e);
					}
				} else {
					me.logger.secondary(`${args.name} evaluated as an attribute.`);
					
					try {
						obj = new BaseAttribute({ attributeName: args.name, attributeValue: args.arg, container: me });
					} catch (e) {
						me.logger.fail(`attribute creation failed!`);
						me.logger.danger(e);
					}
				}
			} while (false);
			
			if (!isSomeObject(obj) && isSomeString(dynamicRender)) {
				me.logger.secondary(`using DynamicComponent to invoke ${args.name} ...`);
				
				obj = _create(`new DynamicComponent(props)`, props);
				
				if (isSomeObject(obj)) {
					
					eval(`obj.render = ${dynamicRender}`);
				} else {
					me.logger.fail(`creating DynamicComponent failed!`);
				}
			}
			
			if (isSomeObject(obj) && !isSomeObject(obj.props)) {
				obj.props = {};
			}
			
			_render(obj);
		}
		function _evaluateExpression(index, callExpression, ...args) {
			let _result = '';
			let _value = expressions[index];
			
			if (isFunction(_value)) {
				if (callExpression) {
					if (isArray(arr)) {
						_result = [];
						
						arr.forEach((a, i) => {
							let row = '';
							
							try {
								row = _value(a, i, me);
							} catch (e) {
								me.logger.fail(`calling interpolation expression ${index} function for array item ${i} failed.`);
								me.logger.danger(e);
							}
							
							if (row) {
								_result.push(row);
							}
						});
						
						arr = null;
						
						_result = _result.join('');
					} else {
						let _args = [ me, ...args ];
						
						try {
							_result = _value.apply(null, _args);
						} catch (e) {
							me.logger.fail(`calling interpolation expression ${index} function failed.`);
							me.logger.danger(e);
						}
					}
				} else {
					_result = _value;
				}
			} else if (isArray(_value)) {
				arr = _value;
			} else {
				_result = _value;
			}
			
			return _result;
		}
		
		let i = 0;
		
		while (i < literals.length) {
			let literal = literals[i];
			
			if (i < literals.length - 1) {
				let lastWhitespaceIndex = -1;
				let starIndex = -1;
				let literalBeforeWhitespace = '';
				let literalAfterWhitespace = '';
				let firstCh = '';
				let lastCh = '';
				let name = '';
				let command = '';
				let value;
				
				lastWhitespaceIndex = literal ? lastIndexOf(literal, [' ', '\t', '\n']): -1;
				literalBeforeWhitespace = lastWhitespaceIndex >= 0 ? literal.substr(0, lastWhitespaceIndex + 1) : '';
				literalAfterWhitespace = lastWhitespaceIndex >= 0 ? literal.substr(lastWhitespaceIndex + 1) : literal;
				firstCh = literalAfterWhitespace ? literalAfterWhitespace[0]: '';
				lastCh = literalAfterWhitespace ? literalAfterWhitespace[literalAfterWhitespace.length - 1]: '';
				
				if (['#', '^', '$'].indexOf(firstCh) < 0) {
														/* currently we only support #, ^ and $, but in the future we may
															extend j6tRoot and support other charcaters to start a name command.
														   
														   #xxx${args}	manual event		e.g. #ontimeout${myHandler}
														   ^xxx${args}	explicit attribute	e.g. ^label${'lblFoo'}
														   $xxx${args}	explicit tag		e.g. $style${'body { font: Tahoma }'}
														   *xxx${args}	exec command
														   
														   possible future extensions:
														   
														   @xxx${args}	reserved
														   +xxx${args}	reserved
														   -xxx${args}	reserved
														   :xxx${args}	reserved
														   /xxx${args}	reserved
														   &xxx${args}	reserved
														   !xxx${args}	reserved
														   %xxx${args}	reserved
														*/
					firstCh = '';
				}
				
				if (lastCh == '@') {
					if (i < expressions.length - 1 && literals[i + 1] == '') {
						name = _evaluateExpression(i, true);
					} else {
						lastCh = '';
					}
				}
				
				if (lastCh && ['@', '!', '#'].indexOf(lastCh) < 0) {
					lastCh = '';
				}
				
				if (lastCh == '') {
					name = firstCh ? literalAfterWhitespace.substr(1) : literalAfterWhitespace.substr(0);
					
					starIndex = name.lastIndexOf('*');
					
					command = starIndex >= 0 ? name.substr(starIndex + 1): '';
				}

				if (lastCh && literal.length > 1) {
					result.push(literal.substr(0, literal.length - 1));
				}
				
				switch (lastCh)
				{
					case '!':
						value = _evaluateExpression(i, true);
						
						if (value) {
							result.push(value);
						}
						
						break;
					case '#':
						value = _evaluateExpression(i, true);
						
						if (value == '#' || value == '.') {
							me.logger.secondary(`writing current component's id: '${me.id}'`);
							
							result.push('#' + me.id);
						}
						/*	we cannot support the following value because #{} might be called before id${}
							in this case me._ids[me._ids.length - 1] will refer to an inocrrect id
						else if (typeof value == 'string' && value.trim() == '') {
							let _lastId = me._ids[me._ids.length - 1]; // me.lastId;
							result.push(() => '#' + _lastId);
						}
						*/
						else if (isNumeric(value)) {
							let _value = value;				// 	we need to postpone reading me._ids[value] because _ids[] are set by id${}
															//	and id${} might be called after #${}
							result.push(() => '#' + (me._ids[_value] || ''));
						} else {
							result.push('#' + htmlEncodeToString(value));
						}
						
						break;
					case '@':
						if (['&', '%', '.', '=', '-', '~', '/', '|'].indexOf(name) >= 0) {
							value = _evaluateExpression(i + 1, true);
						} else {
							value = _evaluateExpression(i + 1, false);
						}
						
						switch (name) {
							case '&':
								result.push(urlDecodeToString(value));
								break;
							case '%':
								result.push(urlEncodeToString(value));
								break;
							case '.':
								result.push(htmlDecode(value));
								break;
							case '=':
								result.push(upper(value));
								break;
							case '-':
								result.push(lower(value));
								break;
							case '~':
								result.push(capitalize(value));
								break;
							case '/':
								result.push(reverseToString(value));
								break;
							case '|':
								result.push(trim(value));
								break;
							default:
								_evalName({
									name: name,
									arg: value,
									directive: ''
								});
								
								break;
						}
						
						i++;	// this is necessary since we have read the next expression ahead of current expression
						
						break;
					default:
						if (command) {
							result.push(left(literal, literal.length - command.length - 1));
							
							value = _evaluateExpression(i, command[command.length - 1] != '*', command);
							
							let execResult;
							
							try {
								execResult = this.exec(command, value);
							} catch (e) {
								me.logger.fail(`exec() failed for command ${command}.`);
								me.logger.danger(e);
							}
							
							if (execResult) {
								result.push(execResult);
							}
						} else if (isValidId(name)) {
							result.push(literalBeforeWhitespace);
							
							value = _evaluateExpression(i, false);
							
							_evalName({
								name: name,
								arg: value,
								directive: firstCh
							});
						} else {
							value = _evaluateExpression(i, true);
							
							result.push(literal);
							result.push(htmlEncodeToString(value));
						}
						
						break;
				}
			} else {
				result.push(literal);
			}
			
			i++;
		}

		for (let i = 0; i < result.length; i++) {
			if (isFunction(result[i])) {
				result[i] = result[i]();
			}
		}
		
		if (!me._hasWrapper && me._parseLevel == 1) {
			me.logger.warn(`component ${this.constructor.name} has no wrapper. default wrapper was added.`);
			
			result.splice(0, 0, `<div id="${me.id}">`);
			result.push(`</div>`);
		}
		
		me._parseLevel--;
		
		return result.join('');
	}
	preRender() {
		
		this._children = [];
		this._ids = [];
		this._events = [];
	}
	postRender() {
	}
	render() {
		return '';
	}
	refresh(props) {
		const me = this;
		
		me.logger.info(`refresh()`);
		me.logger.debug(props);
		
		const count = jq('#' + this.id).length;
		
		if (count == 1) {
			const isj6tIdProvider = this.idProvider instanceof j6tIdProvider;
			
			if (isj6tIdProvider) {
				try {
					this.idProvider.setState(this._idProviderState);
				} catch (e) {
					me.logger.fail(`idProvider.setState() failed.`);
					me.logger.danger(e);
				}
			}
			
			if (isSomeObject(props)) {
				jq.extend(this.props, props);
			}
			
			try {
				this.preRender();
			} catch (e) {
				me.logger.fail(`preRender() failed.`);
				me.logger.danger(e);
				me.logger.warn(`component is an inconsistent state. resolve issue immediately.`);
			}
			
			let html;
			
			try {
				html = this.render();
			} catch (e) {
				me.logger.fail(`refresh() failed.`);
				me.logger.danger(e);
			}
			
			if (isj6tIdProvider) {
				try {
					this.idProvider.restoreState();
				} catch (e) {
					me.logger.fail(`idProvider.restoreState() failed.`);
					me.logger.danger(e);
				}
			}
			
			jq('#' + this.id).replaceWith(html);
			
			try {
				this.postRender();
			} catch (e) {
				me.logger.fail(`postRender() failed.`);
				me.logger.danger(e);
			}
			
			this.bindEvents();
		} else {
			if (count == 0) {
				me.logger.abort(`component with id '${this.id}' was not found in the DOM. refresh() aborted.'`);
			} else {
				me.logger.abort(`more than one component with id '${this.id}' was found in the DOM. refresh() aborted.'`);
			}
		}
	}
	bindEvents() {
		const me = this;
		
		this._children.forEach((child, i) => {
			if (isFunction(child.bindEvents)) {
				child.bindEvents();
			}
		});
		
		for (let i = 0; i < this._events.length; i++) {
			let e = this._events[i];
			
			if (jq(e.target).length) {
				if (typeof e.rebind == 'undefined') {
					jq(e.target).bind(e.name, e.handler);
				} else {
					const index = this.__events.findIndex(evt => evt.name == e.name
															&& evt.target == e.target
															&& evt._handler == e.handler.toString());
					if (index >= 0) {
						if (!this.__events[index].bound) {
							jq(e.target).bind(e.name, e.handler);
							
							this.__events[index].bound = true;
						}
					} else {
						me.logger.warn(`event '${e.name}' for ${e.target} was not found in __events!`);
						
						jq(e.target).bind(e.name, e.handler);
					}
				}
			} else {
				me.logger.warn(`event target '${e.target}' does not exist in the DOM. event binding skipped.`);
			}
		}
	}
}

Component.links = [];	/*	structure
							{
								element: a linkTag instance
								applied: bool	whether this link was added to page or not
							}
						*/
Component.scripts = [];	/*	structure
							{
								element: an scriptTag instance
								applied: bool	whether this script was added to page or not
							}
						*/
Component.imports = [];

// --------------------------- Tags (start) -------------------------
class DynamicComponent extends Component {
	constructor(props) {
		super(props);
	}
}
class BaseElement {
	constructor(props) {
		jq.extend(this, isSomeObject(props) ? props : {});
		
		if (!(this.logger instanceof(BaseLogger))) {
			if (isSomeObject(this.parent) && this.parent.logger instanceof(BaseLogger)) {
				this.logger = this.parent.logger;
			} else if (isSomeObject(this.container) && this.container.logger instanceof(BaseLogger)) {
				this.logger = this.container.logger;
			} else {
				this.logger = new NullLogger();
			}
		}
	}
	render() {
		NotImplementedException(`${this.constructor.name}.render()`);
	}
}
class BaseTag extends Component {
	constructor(props) {
		super(props);	/* structure:
						{
								tagName: string,
								selfClose: bool
						}
						*/
		
		if (isSomeString(props)) {
			this.tagName = props;
		}
		
		this.selfClose = isBool(this.props.selfClose) ? this.props.selfClose: false;
		
		//this.lastId = this.id; we don't support me.lastId any more because it is problematic
		// instead we add me.id to me._ids
		this._ids.push(me.id);
		this._lastOwner = this;
		
		if (!isEmpty(this.props.arg)) {
			this.props.html = this.arg;
		}
		
		this.logger.secondary(`BaseTag.ctor(): tagName = ${this.tagName}`);
		this.logger.debug(this.props);
	}
	isValid() {
		return isValidTag(this.tagName);
	}
	getExcludedAttributes() {
		return ['tagname', 'selfclose', 'isroot', 'logger', 'parent', 'arg', 'idprovider', 'haswrapper'];
	}
	getAttributes() {
		let result = [];
		let excludes = this.getExcludedAttributes();
		let me = this;
		
		jq.each(this.props, prop => {
			if (isSomeString(prop) && !isNumeric(prop)) {
				let _prop = prop.toLowerCase();
				
				if (isValidAttributeName(prop) && excludes.indexOf(_prop) < 0) {
					result.push(prop);
				}
			}
		});
		
		me.logger.secondary(`getAttributes(): final properties count = ${result.length}`);
		me.logger.debug(result);
		
		return result;
	}
	preRender() {
		super.preRender();
		
		this._ids.push(this.id);
	}
	render() {
		let me = this;
		
		if (this.isValid()) {
			
			if (me.selfClose) {
				return me.parse`<!${me.tagName}${me.getAttributes()}${prop => me.parse` @${prop}${me.props[prop]}`}/>`
			} else {
				return me.parse`<!${me.tagName}${me.getAttributes()}${prop => me.parse` @${prop}${me.props[prop]}`}>
								${me.validateText(me.props.text)}!${me.validateHtml(me.props.html)}
							   </!${me.tagName}>`
			}
		} else {
			me.logger.abort(`tag ${this.constructor.name} isn't valid. render aborted.`);
			
			return '';
		}
	}
}
class stylesTag extends BaseTag {
	constructor(props) {
		let _props = isSomeObject(props) ? props: {};
		
		_props.tagName = 'style';
		
		if (isArray(props)) {
			_props.html = props.join('\n');
		} else if (typeof props == 'string') {
			_props.html = props;
		}
		
		// $$$$$$$$$$$$$$ POTENTIAL XSS $$$$$$$$$$$$$
		// _props.html must be validated to contain valid css style rules and nothing else.
		// $$$$$$$$$$$$$$ POTENTIAL XSS $$$$$$$$$$$$$
		
		super(_props);
	}
}
class linkTag extends BaseTag {
	constructor(props) {
		let _props = isSomeObject(props) ? props: {};
		
		_props.tagName = 'link';
		_props.selfClose = true;
		
		if (isSomeString(props)) {
			_props.href = props;
		}
		
		super(_props);
		
		// make sure href, rel, type in this.props are string
		this.props.href = isSomeString(this.props.href) ? this.props.href : '';
		this.props.rel = isSomeString(this.props.rel) ? this.props.rel : '';
		this.props.type = isSomeString(this.props.type) ? this.props.type : '';
		
		if (left(this.props.href, 4).toLowerCase() == '.css') {
			if (isEmpty(this.props.rel)) {
				this.props.rel = 'stylesheet';
			}
			if (isEmpty(this.props.type)) {
				this.props.type = 'text/css';
			}
		}
	}
}
class linkElement {
	constructor(props) {
		if (isArray(props)) {
			props.forEach(x => {
				const element = new linkTag(x);
				const href = element.props.href.toLowerCase();
				
				if (isSomeString(href)) {
					if (Component.links.find(e => e.element.props.href.toLowerCase() == href) == undefined) {
						Component.links.push({ applied: false, element });
					}
				}
			});
		} else {
			const element = new linkTag(props);
			const href = element.props.href.toLowerCase();
			
			if (isSomeString(href)) {
				if (Component.links.find(e => e.element.props.href.toLowerCase() == href) == undefined) {
					Component.links.push({ applied: false, element });
				}
			}
		}
	}
	render() {
		return '';
	}
}
class scriptTag extends BaseTag {
	constructor(props) {
		let _props = isSomeObject(props) ? props: {};
		
		_props.tagName = 'script';
		
		if (isSomeString(props)) {
			_props.src = props;
		}
		
		super(_props);
		
		// make sure src, type in this.props are string
		this.props.src = isSomeString(this.props.src) ? this.props.src : '';
		this.props.type = isSomeString(this.props.type) ? this.props.type : '';
		
		if (left(this.props.src, 3).toLowerCase() == '.js') {
			if (isEmpty(this.props.type)) {
				this.props.type = 'text/javascript';
			}
		} else if (left(this.props.src, 5).toLowerCase() == '.json') {
			if (isEmpty(this.props.type)) {
				this.props.type = 'application/json';
			}
		}
	}
}
class scriptElement {
	constructor(props) {
		if (isArray(props)) {
			props.forEach(x => {
				const element = new scriptTag(x);
				const src = element.props.src.toLowerCase();
				
				if (isSomeString(src)) {
					if (Component.scripts.find(e => e.element.props.src.toLowerCase() == src) == undefined) {
						Component.scripts.push({ applied: false, element });
					}
				}
			});
		} else {
			const element = new scriptTag(props);
			const src = element.props.toLowerCase();
			
			if (isSomeString(src)) {
				if (Component.scripts.find(e => e.element.props.src.toLowerCase() == src) == undefined) {
					Component.scripts.push({ applied: false, element });
				}
			}
		}
	}
	render() {
		return '';
	}
}

// --------------------------- Tags ( end ) -------------------------

// --------------------------- Attributes (start) -------------------------
class BaseAttribute extends BaseElement {
	constructor(props) {
		const _props = isSomeObject(props) ? props: { attributeName: '', attributeValue: props };
		
		super(_props);
	}
	validateValue(value) {
		return !isEmpty(value);
	}
	encodeValue(value) {
		return htmlEncodeToString(value);
	}
	isValid() {
		return isValidAttributeName(this.attributeName) && (this.validateValue(this.attributeValue) || this.standAlone);
	}
	render() {
		let result = '';
		
		if (this.isValid()) {
			if (this.standAlone) {
				if (this.attributeValue === true || (!isEmpty(this.attributeValue) && this.attributeValue != false)) {
					 result = ` ${this.attributeName}`;
				}
			} else {
				if (!isEmpty(this.attributeValue)) {
					result = ` ${this.attributeName}="${this.encodeValue(this.attributeValue)}"`;
				}
			}
		}
		
		return result;
	}
}
class BooleanAttribute extends BaseAttribute {
	constructor(props) {
		super(props);
		
		this.standAlone = true;
	}
}
class selectedAttribute extends BooleanAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'selected';
	}
}
class checkedAttribute extends BooleanAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'checked';
	}
}
class disabledAttribute extends BooleanAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'disabled';
	}
}
class asyncAttribute extends BooleanAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'async';
	}
}
class deferAttribute extends BooleanAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'defer';
	}
}
class classAttribute extends BaseAttribute {
	constructor(props) {
		super(props);
		
		if (isArray(props)) {
			this.attributeValue = props.join(' ');
		}
		
		this.attributeName = 'class';
	}
}
class idAttribute extends BaseAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'id';
		
		if (isEmpty(this.attributeValue)) {
			this.attributeValue = '';
		}
		
		if (isSomeObject(this.container)) {
			let givenId = this.attributeValue;
			
			this.attributeValue = this.container.idProvider.generate(givenId);
			
			if (isNumeric(givenId)) {
				this.container._ids[givenId] = this.attributeValue;
			}
		}
	}
}
class dirAttribute extends BaseAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'dir';
		
		if (['rtl', 'ltr'].indexOf(toStr(this.attributeValue)) < 0) {
			this.attributeValue = '';
		}
	}
}
class styleAttribute extends BaseAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'style';
	}
	populate(styles) {
		let result = [];
		
		if (isArray(styles)) {
			styles.forEach(style => {
				if (isSomeString(style)) {
					style = style.trim();
					
					result.push((style[style.length - 1] == ';' ? style.substr(0, style.length - 1): style));
				} else if (isSomeObject(style)) {
					let _styles = this.populate(style);
					
					if (isSomeString(_styles)) {
						result.push(_styles);
					}
				}
			});
		} else if (isSomeObject(styles)){
			jq.each(styles, function(name, value) {
				let _value = '';
				
				if (isArray(value)) {
					_value = value.join(' ');
				} else if (isFunction(value)) {
					_value = value();
				} else {
					_value = toStr(value);
				}
				
				// $$$$$$$$$$$$$$ POTENTIAL XSS $$$$$$$$$$$$$
				// name and _value must be validated to be valid css name/value
				// $$$$$$$$$$$$$$ POTENTIAL XSS $$$$$$$$$$$$$
				
				result.push(`${cssAttribute(name)}: ${_value}`);
			});
		} else {
			if (isSomeString(styles)) {
				result.push(styles);
			}
		}
		
		result = (result.join('; ')).trim();
		
		return result;
	}
	render() {
		let result = '';
		
		if (this.isValid()) {
			result = this.populate(this.attributeValue);
			
			if (!isEmpty(result)) {
				// $$$$$$$$$$$$$$ POTENTIAL XSS $$$$$$$$$$$$$
				// result must be validated to contain valid css style rules and nothing else.
				// $$$$$$$$$$$$$$ POTENTIAL XSS $$$$$$$$$$$$$
				
				// we can't use htmlencode on rsult because css styles may contain
				// characters like >, < which are valid in CSS but will be encoded by htmlencode()
				// and produce faulty css.
				
				result = ` style="${result}"`;
			}
		}
		
		return result;
	}
}

class bindElement extends BaseElement {
	constructor(props) {
		super(props);	/* structure:
							{
								event: string,				// click, dbclick, ...
								container: Component		// an object who is requesting binding this event
								target: string (css query)	// a css query that targets elements to whom binding should be performed
								handler: Function 			// event handler
							}
						*/
		
		this.event = (isSomeString(this.event) ? this.event: '').toLowerCase();
		
		if (this.event.length >= 2 && this.event.substr(0, 2) == 'on') {
			this.event = this.event.substr(2);
		}
	}
	render() {
		this.logger.debug(`event: '${this.event}', target: '${this.target}', container: '${(isSomeObject(this.container) ? 'ok': 'error')}'`);
		
		if (isValidEvent(this.event)
			&& isSomeString(this.target)
			&& isFunction(this.handler)
			&& isSomeObject(this.container)
			&& isArray(this.container._events)) {
				
			let e = this.container._events.find(evt => evt.name == this.event
													&& evt.target == this.target
													&& evt._handler == this.handler.toString());
			
			if (e == undefined) {
				e = {
					target: this.container.parseCssSelector(this.target),
					name: this.event,
					_handler: this.handler.toString(),
					handler: this.handler,
					rebind: this.rebind,
					bound: false
				};
				
				this.container._events.push(e);
				
				let _e = this.container.__events.find(evt => evt.name == this.event
														  && evt.target == this.target
														  && evt._handler == this.handler.toString());
				if (_e == undefined) {
					this.container.__events.push({
						target: this.target,
						name: this.event,
						_handler: this.handler.toString(),
						rebind: this.rebind,
						bound: false
					});
				}
			} else {
				this.logger.error(`the same event and handler already bound for the same element`);
			}
		}
		
		return '';
	}
}

var elements = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': j6tRoot,
	j6tIdProvider: j6tIdProvider,
	j6tUniversalIdProvider: j6tUniversalIdProvider,
	Component: Component,
	DynamicComponent: DynamicComponent,
	BaseElement: BaseElement,
	BaseTag: BaseTag,
	stylesTag: stylesTag,
	linkTag: linkTag,
	linkElement: linkElement,
	scriptTag: scriptTag,
	scriptElement: scriptElement,
	BaseAttribute: BaseAttribute,
	BooleanAttribute: BooleanAttribute,
	selectedAttribute: selectedAttribute,
	checkedAttribute: checkedAttribute,
	disabledAttribute: disabledAttribute,
	asyncAttribute: asyncAttribute,
	deferAttribute: deferAttribute,
	classAttribute: classAttribute,
	idAttribute: idAttribute,
	dirAttribute: dirAttribute,
	styleAttribute: styleAttribute,
	bindElement: bindElement
});

const j6t = new j6tRoot();

Object.assign(j6t, elements, util, validation, logging, { tags: tags$1 } );

if (window) {
	window.j6t = j6t;
}

export default j6t;
