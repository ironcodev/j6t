import * as tags from './tags.js'

const tags = [	'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
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
				'main', 'map', 'mark', 'meter', 'map', 'noscript', 'script', 'style', 'object', 'output', 'param', 'progress', 
				'rp', 'rt', 'ruby', 's', 'samp', 'source', 'svg', 'template', 'time', 'track', 'tt', 'var', 'wbr'
			];
const attributes =
	[
		'id', 'name', 'type',
	]
class j6tIdProvider {
	constructor() {
		this.counter = 0;
	}
	generate(id) {
		if (!id || id.replace('__el__', '') < i)
			return `__el__${this.counter++}`
		
		return id;
	}
}

class _j6t {
	constructor() {
		this.scripts = [];
		this.styles = [];
		this.links = [];
		this.html = [];
		this.handlers = [];
	}
	get version() {
		return '1.0'
	}
	html(literals, ...expressions) {
		let result = [];
		let value;
		let arr;

		literals.forEach((literal, i) => {
			if (i < literals.length - 1) {
				let ch = literal ? literal[literal.length - 1]: literal;
				let spaceIndex = literal ? literal.lastIndexOf(' '): -1;
				let name = spaceIndex >= 0 ? literal.substr(spaceIndex + 1) : '';
				
				if (!/^\w+$/g.test(name)) {
					name = '';
					spaceIndex = -1;
				}
				
				let literalRest = spaceIndex >= 0 ? literal.substr(0, spaceIndex) : literal;
				
				switch (ch)
				{
					case '!':
						result.push(literalRest.substr(0, literalRest.length - 1));
						value = expressions[i];
						break;
					case '@':
						result.push(literalRest.substr(0, literalRest.length - 1));
						arr = expressions[i];
						break;
					default:
						let exp = expressions[i];
						
						result.push(literalRest);
			  
						if (typeof exp != "function") {
							if ($.isPlainObject(exp)) {
								if (name) {
									if (eval(`typeof ${name}`) == "function") {
										let obj = eval(`new ${name}(exp)`)
										
										if ($.isFunction(obj.render)) {
											this.html.push(obj.render())
										}
									} else {
										switch (name) {
											case 'script':
												break;
											case 'link':
												break;
											case 'style':
												break;
											case 'class':
												break;
										}
									}
								}
							} else if ($.isArray(exp)){
								arr = exp;
							} else {
								value = tags.htmlEncode(expressions[i]);
							}
						} else {
							value = expressions[i];
						}
						break;
				}

				if (value) {
					if (typeof value == "function") {
						if (!arr) {
							result.push(value());
						} else {
							arr.forEach((a, i) => {
								result.push(value(a, i))
							});
							arr = null;
						}
					} else {
						result.push(value);
					}
					value = null;
				}
			} else {
				result.push(literal);
			}
		});

		result = result.join('');
		
		this.html.push(result);
		
		return result;
	}
	render(node) {
		let html = '';
		
		html += this.links.map(x => `<link href="${x.src}" rel="stylesheet" type="text/css"/>\n`).join('');
		html += this.styles.map(x => `<style type="text/css"/>\n${x}</style>`).join('');
		html += this.html.join('\n');
		
		$(node).html(html);
		
		html += this.scripts.map(x => `<script src="${x.src}"></script>\n`).join('');
		
		this.handlers.map(h => $(h.id).bind(h.event, h.handler));
	}
}

const j6t = new _j6t();

class Component extends _j6t {
	constructor(props) {
    	Object.assign(this, props);
		
		this.idProvider = new j6tIdProvider();
    }
}

export { j6t, Component }