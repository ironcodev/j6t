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
   return tagHelper(literals, expressions, x => x, x => x.toLowerCase());
}
function upper(literals, ...expressions) {
   return tagHelper(literals, expressions , x => x, x => x.toUpperCase());
}
function urlEncode(literals, ...expressions) {
   return tagHelper(literals, expressions, x => x.replace(/\s/g, "").toLowerCase(), x => encodeURI(x));
} 
function reverse(literals, ...expressions) {
   return tagHelper(literals, expressions , x => x, x => x.toString().split("").reverse().join(""));
}
const htmlencode = h =>
   (h || '').toString()
			.replace(/&/g, '&amp;')
			.replace(/>/g, '&gt;')
			.replace(/</g, '&lt;')
			.replace(/\s/g, '&nbsp;')
			.replace(/"/g, '&quot;');
			
function htmlEncode(literals, ...expressions) {
	return tagHelper(literals, expressions , x => x, x => htmlencode(x));
}

export {
	tagHelper,
	lower,
	upper,
	reverse,
	urlEncode,
	htmlEncode,
	htmlencode
}