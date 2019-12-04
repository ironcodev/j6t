import * as util from './util.js';

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
function lower(literals, ...expressions) {
   return tagHelper(literals, expressions, x => x, x => util.lower(x));
}
function upper(literals, ...expressions) {
   return tagHelper(literals, expressions , x => x, x => util.upper(x));
}
function urlEncode(literals, ...expressions) {
   return tagHelper(literals, expressions, x => util.urlEncodeToString((typeof x == 'string' ? x.trim() : x)), x => util.urlEncodeToString(x));
} 
function urlDecode(literals, ...expressions) {
   return tagHelper(literals, expressions, x => util.urlDecodeToString(x), x => util.urlDecodeToString(x));
}
function reverse(literals, ...expressions) {
   return tagHelper(literals, expressions , x => x, x => util.reverse(x));
}
function htmlEncode(literals, ...expressions) {
	return tagHelper(literals, expressions , x => x, x => util.htmlEncodeToString(x));
}
function htmlDecode(literals, ...expressions) {
	return tagHelper(literals, expressions , x => x, x => util.htmlDecodeToString(x));
}

export default {
	tagHelper,
	lower,
	upper,
	urlEncode,
	urlDecode,
	reverse,
	htmlEncode,
	htmlDecode
}