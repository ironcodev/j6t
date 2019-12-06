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
}
const isBool		= (x) => typeof x == 'boolean';
// borrowed from jQuery
const isNumeric		= (x) => {
	const type = typeof x;
	
	return ( type === "number" || type === "string" ) && !isNaN( x - parseFloat(x) );
}
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
}

const isPureFunction = (fn) => {
	let result = false;
	
	if (isFunction(fn)) {
		try {
			let caller = fn.caller;
			result = true;
		} catch { }
	}
	
	return result;
}
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
				Object.assign(target, { [key]: {} });
			}
			
			deepAssign(target[key], source[key]);
		} else {
			Object.assign(target, { [key]: source[key] });
		}
	}
  }
  
  return deepAssign(target, ...sources);
}

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
}
const join = function (obj, keySeparator, valueSeparator) {
	return merge(obj, (key, value) => `${key}${keySeparator}${value}`, valueSeparator);
}
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
}

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

const reverseToString = x => x => join(reverse(x), '', '');

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
	
	_char_to_html_entity_map[String.fromCharCode(item[0])] = `&${item[1]};`
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
											result = `&#${code};`
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
   let result = new Array(to - from);
	
   for (let i = from; i < to; i++) {
	 result.push(i)
   }
	
   return result;
}
	
export {
	NotImplementedException	,
	getEl					,
	getEls					,
	
	isEmpty		      		,
	isArray		      		,
	isFunction	      		,
	isObject	  			,
	isEmptyObject	  		,
	isSomeObject	  		,
	isSomeString	  		,
	isDate		      		,
	isBool		      		,
	isPureFunction    		,
	isNumeric		  		,
	isClass           		,
	deepAssign				,
	toStr			  		,
	lastIndexOf				,
	
	left			  		,
	right			  		,
	merge             		,
	join              		,
	unmerge           		,
	apply             		,
	trim              		,
	lower             		,
	upper             		,
	reverse           		,
	reverseToString			,
	capitalize				,
	
	urlEncode         		,
	urlEncodeToString 		,
	urlDecode         		,
	urlDecodeToString		,
	urlEncodeComponent		,
	urlDecodeComponent		,
	
	_char_to_html_entity_map,
	_html_entity_to_char_map,
	_htmlEncode				,
	_htmlDecode				,
	htmlEncodeToString		,
	htmlEncode				,
	htmlDecode				,
	htmlDecodeToString		,
	
	Dec2Bin                 ,
	Dec2Hex                 ,
    Dec2Oct                 ,
	
    Bin2Dec                 ,
    Bin2Hex                 ,
    Bin2Oct                 ,
	
    Oct2Dec                 ,
    Oct2Hex                 ,
    Oct2Bin                 ,
	
    Hex2Dec                 ,
    Hex2Oct                 ,
    Hex2Bin                 ,
	
	range
}