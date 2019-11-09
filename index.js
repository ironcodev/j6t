import * as templateTags from './tags.js'

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
		this.idPrefix = '_el_';
	}
	generate(id) {
		let doGenerate = false;
		
		if (typeof id != 'string') {
			doGenerate = true;
		} else {
			id = id.trim();
			
			if (id.indexOf(' ') >= 0 || id.replace(this.idPrefix, '') < i) {
				doGenerate = true;
			}
		}
		
		if (doGenerate)
			return `${this.idPrefix}${this.counter++}`
		
		return id;
	}
}

class _j6t {
	get version() {
		return '1.0'
	}
	render(component) {
		let html = '';
		
		html += Component.links.map(x => `<link href="${x.src}" rel="stylesheet" type="text/css"/>\n`).join('');
		html += Component.styles.map(x => `<style type="text/css"/>\n${x}</style>`).join('');
		html += Component.html.join('\n');
		
		$(component.id).html(html);
		
		html += Component.scripts.map(x => `<script src="${x.src}"></script>\n`).join('');
		
		Component.handlers.map(h => {
			if (h.id && $.isFunction(h.handler)) {
				if (h.id[0] != '#') {
					h.id = '#' + h.id;
				}
				
				$(h.id).bind(h.event, h.handler)
			}
		});
	}
}

const j6t = new _j6t();

// --------------------------- Tags (start) -------------------------
class baseTag {
	constructor(props) {
		Object.assign(this, props);
		
		this.tagName = '';
		this.selfClose = false;
	}
	isValidAttribute(attr) {
		return attributes.indexOf(attr) >= 0;
	}
	getAttributes() {
		let result = [];
		
		$.each(this, prop => {
			if (isValidAttribute(prop)) {
				if (prop == 'id') {
					result.splice(0, 0, prop);
				} else {
					result.push(prop);
				}
			}
		});
		
		return result;
	}
	render() {
		if (this.selfClose) {
			return html`<${this.tagName} 
								 ${getAttributes()}
								 ${prop => html`${prop}{this[prop]}`}
						/>`
		} else {
			return html`<${this.tagName} 
								${getAttributes()}
								${prop => html`${prop}{this[prop]}`}
						>${this.text}!${this.html}</${this.tagName}>`
		}
	}
}
class ButtonTag extends baseTag {
	constructor(props) {
		Object.assign(this, props);
		
		this.tagName = 'button';
	}
}
// --------------------------- Tags (start) -------------------------

// --------------------------- Attributes (start) -------------------------
class baseAttribute {
	constructor(props) {
		Object.assign(this, props);
	}
	validate() {
		return this.attributeValue;
	}
	render() {
		return validate() ? ` ${htmlencode(this.attributeName)}="${htmlencode(this.attributeValue)}"`: ''
	}
}
class idAttribute extends baseAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'id';
	}
}
class nameAttribute extends baseAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'name';
	}
}
class titleAttribute extends baseAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'title';
	}
}
class typeAttribute extends baseAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'type';
	}
}
class srcAttribute extends baseAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'src';
	}
}
class altAttribute extends baseAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'alt';
	}
}
class hrefAttribute extends baseAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'href';
	}
}
class valueAttribute extends baseAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'value';
	}
}
class classAttribute extends baseAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'class';
	}
	render() {
		let result = '';
		
		if (this.attributeValue) {
			if ($.isArray(this.attributeValue)) {
				result = ` class="${this.attributeValue.join(' ')}"`
			} else {
				result = ` class="${this.attributeValue.toString()}"`
			}
		}
		
		return result;
	}
}
class styleAttribute extends baseAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'style';
	}
	render() {
		let result = '';
		
		if (this.attributeValue) {
			if ($.isArray(this.attributeValue)) {
				result = ` style="${this.attributeValue.join(';\n')}"`
			} else if ($.isPlainObject(this.attributeValue)){
				let styles = [];
				
				$.each(this.attributeValue, function(styleName, styleValue) {
					if ($.isArray(styleValue)) {
						styleValue = styleValue.join(' ');
					}
					
					styles.push(`${styleName}: ${styleValue};\n`);
				});
				
				result = ` style="${this.attributeValue.join('\n')}"`
			} else {
				result = ` style="${this.attributeValue.toString()}"`
			}
		}
		
		return result;
	}
}

// ========= event handler attributes =========

class eventHandlerAttribute extends baseAttribute {
	constructor(props) {
		super(props);
	}
	render() {
		if (this.owner && $.isFunction(this.attributeValue)) {
			Component.parts.handlers.push({ id: this.owner, event: this.attributeName, handler: this.attributeValue })
		}
		
		return '';
	}
}
class onclickAttribute extends eventHandlerAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'onclick';
	}
}
class ondbclickAttribute extends eventHandlerAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'ondbclick';
	}
}
class onkeydownAttribute extends eventHandlerAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'onkeydown';
	}
}
class onkeyupAttribute extends eventHandlerAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'onkeyup';
	}
}
class onkeypressAttribute extends eventHandlerAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'onkeypress';
	}
}
class onmousedownAttribute extends eventHandlerAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'onmousedown';
	}
}
class onmouseupAttribute extends eventHandlerAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'onmouseup';
	}
}
class onmousemoveAttribute extends eventHandlerAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'onmousemove';
	}
}
class onloadAttribute extends eventHandlerAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'onload';
	}
}
class onsubmitAttribute extends eventHandlerAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'onsubmit';
	}
}
class onfocusAttribute extends eventHandlerAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'onfocus';
	}
}
class onblurAttribute extends eventHandlerAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'onblur';
	}
}
// --------------------------- Attributes ( end ) -------------------------
class Component extends _j6t {
	static page = {
		scripts: [],
		styles: [],
		links: [],
		html: [],
		handlers: []
	};
	constructor(props) {
    	Object.assign(this, props);
		
		this.idProvider = new j6tIdProvider();
		this.id = this.idProvider.generate(this.id);
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
								value = templateTags.htmlEncode(expressions[i]);
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
	render() {
		return '';
	}
	refresh() {
		let html = render();
		
		if (this.id) {
			$(this.id).replaceWith(html);
		}
	}
}

export { j6t, Component }