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
	];
const events = [
		'onmousedown', 'onmouseup', 'onmouseover', 'onmouseout', 'onmousemove', 'onmouseenter', 'onmouseleave',
		'onclick', 'ondbclick', 'onkeydown', 'onkeyup', 'onkeypress', 'onscroll', 'onload', 'onunload', 'onresize',
		'onchange', 'onselect', 'onfocus', 'onblur', 'onfocusin', 'onfocusout', 'onerror', 'onsubmit', 
	];
const isEmpty = x => x == null || (typeof x == 'string' && x.trim() == '');

class j6tIdProvider {
	constructor(props) {
		let type = typeof props;
		let _props = {};
		
		switch (type) {
			case 'object': _props = props; break;
			case 'number': _props = { counter: props }; break;
			case 'string': _props = { idPrefix: props }; break;
		};
		
		$.extend(this, {
			counter: 0,
			idPrefix: '_el_'
		}, _props);
	}
	generate(id) {
		let doGenerate = false;
		
		if (typeof id != 'string') {
			doGenerate = true;
		} else {
			id = id.trim();
			
			if (id.indexOf(' ') >= 0 || id.replace(this.idPrefix, '') < this.counter) {
				doGenerate = true;
			}
		}
		
		return doGenerate? `${this.idPrefix}${this.counter++}`: id;
	}
}

class _j6t {
	get version() {
		return '1.0'
	}
	render(component) {
		let html = '';
		
		html += component.links.map(x => `<link href="${x.src}" rel="stylesheet" type="text/css"/>\n`).join('');
		html += component.styles.map(x => `<style type="text/css"/>\n${x}</style>`).join('');
		html += component.html.join('\n');
		
		$(component.id).html(html);
		
		html += component.scripts.map(x => `<script src="${x.src}"></script>\n`).join('');
		
		component.handlers.map(h => {
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
class baseTag extends Component {
	constructor(props) {
		let type = typeof props;
		let _props = {};
		
		switch (type) {
			case 'object': _props = props; break;
			case 'string': _props = { tagName: props }; break;
		};
		
		Object.assign(this, {
			tagName: '',
			selfClose: false
		}, _props);
	}
	isValidAttribute(attr) {
		return typeof attr == 'string' && attr.trim() != '' && /[a-zA-Z]/.test(attr[0]);
	}
	getAttributes() {
		let result = [];
		
		$.each(this, prop => {
			if (isValidAttribute(prop)) {
				if (prop.toLowerCase() == 'id') {
					result.splice(0, 0, 'id');
				} else {
					result.push(prop);
				}
			}
		});
		
		return result;
	}
	render() {
		if (this.selfClose) {
			return html`<${this.tagName} ${getAttributes()}
								 ${prop => html`${prop}@{this[prop]}`}
						/>`
		} else {
			return html`<${this.tagName} ${getAttributes()}
								${prop => html`${prop}@{this[prop]}`}
						>${this.text}!${this.html}</${this.tagName}>`
		}
	}
}
// --------------------------- Tags (start) -------------------------

// --------------------------- Attributes (start) -------------------------
class baseAttribute {
	constructor(props) {
		Object.assign(this, (typeof props == 'object' ? props: {}));
	}
	validate() {
		return !isEmpty(this.attributeValue);
	}
	render() {
		return validate() ? ` ${htmlencode(this.attributeName)}="${htmlencode(this.attributeValue)}"`: ''
	}
}
class classAttribute extends baseAttribute {
	constructor(props) {
		super($.extend(props, { attributeName: 'class' }));
	}
	render() {
		let result = '';
		
		if (validate()) {
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
		super($.extend(props, { attributeName: 'style' }));
	}
	populate(styles) {
		let result = [];
		
		if ($.isArray(styles)) {
			styles.forEach(style => {
				if (!isEmpty(style) {
					if (typeof style == 'string') {
						style = style.trim();
						
						result.push((style[style.length - 1] == ';' ? style.substr(0, style.length - 1): style));
					} else {
						if ($.isPlainObject(style)) {
							let _styles = populate(style);
							
							if (!isEmpty(_styles)) {
								result.push(_styles);
							}
						}
					}
				}
			});
		} else if (typeof styles == 'object'){
			$.each(styles, function(name, value) {
				if ($.isArray(value)) {
					value = value.join(' ');
				}
				
				result.push(`${name}: ${value}`);
			});
		} else {
			if (!isEmpty(styles)) {
				result.push(styles.toString());
			}
		}
		
		result = result.join(';');
		
		return result;
	}
	render() {
		let result = '';
		
		if (validate()) {
			result = populate(this.attributeValue);
			
			if (!isEmpty(result)) {
				result = ` style="${result}"`
			}
		}
		
		return result;
	}
}

// ========= event handler attributes =========

class eventHandlerAttribute {
	constructor(props) {
		$.extend(this, props);
	}
	render() {
		if (this.owner && $.isFunction(this.attributeValue)) {
			this.handlers.push({ id: this.owner, event: this.eventName, handler: this.attributeValue })
		}
		
		return '';
	}
}

// --------------------------- Attributes ( end ) -------------------------
class Component extends _j6t {
	constructor(props) {
    	Object.assign(this, {
			idProvider: new j6tIdProvider()
		}, (typeof props == 'object' ? props: {}));
		
		if (isEmpty(this.idProvider) || typeof this.idProvider != 'object' || !$.isFunction(this.idProvider.generate)) {
			this.idProvider = new j6tIdProvider();
		}
		
		this.id = this.idProvider.generate(this.id);
		
		this.styles = [];
		this.scripts = [];
		this.links = [];
		this.handlers = [];
		this.imports = [];
		this.html = [];
		this.events = [];
		this.resources = [];
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