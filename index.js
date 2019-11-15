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
				'main', 'map', 'mark', 'meter', 'map', 'noscript', 'script', 'object', 'output', 'param', 'progress', 
				'rp', 'rt', 'ruby', 's', 'samp', 'source', 'svg', 'template', 'time', 'track', 'tt', 'var', 'wbr'
			];
const attributes =
	[
		'accept', 'accept-charset', 'accesskey', 'action', 'align', 'allow', 'alt',
		'async', 'autocapitalize', 'autocomplete', 'autofocus', 'autoplay',
		'background', 'bgcolor', 'border', 'buffered', 'challenge', 'charset',
		'checked', 'cite', 'code', 'codebase', 'color', 'cols', 'colspan',
		'content', 'contenteditable', 'contextmenu', 'controls', 'coords',
		'crossorigin', 'csp', 'data', 'datetime', 'decoding', 'default',
		'defer', 'dir', 'dirname', 'disabled', 'download', 'draggable',
		'dropzone', 'enctype', 'enterkeyhint', 'for', 'form', 'formaction',
		'formenctype', 'formmethod', 'formnovalidate', 'formtarget', 'headers',
		'height', 'hidden', 'high', 'href', 'hreflang', 'http-equiv', 'icon', 'id', 
		'importance', 'integrity', 'intrinsicsize', 'inputmode', 'ismap',
		'itemprop', 'keytype', 'kind', 'label', 'lang', 'language', 'loading',
		'list', 'loop', 'low', 'manifest', 'max', 'maxlength', 'minlength',
		'media', 'method', 'min', 'multiple', 'muted', 'name', 'novalidate',
		'open', 'optimum', 'pattern', 'ping', 'placeholder', 'poster', 'preload',
		'radiogroup', 'readonly', 'referrerpolicy', 'rel', 'required', 'reversed',
		'rows', 'rowspan', 'sandbox', 'scope', 'scoped', 'selected', 'shape',
		'size', 'sizes', 'slot', 'span', 'spellcheck', 'src', 'srcdoc', 'srclang',
		'srcset', 'start', 'step', 'summary', 'tabindex', 'target', 'title',
		'translate', 'type', 'usemap', 'value', 'width', 'wrap'
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
	
	when detecting a /xxx/${value} here is our rules:
		1. is there a function/class named xxxTag ?
				instantiate from the function/class. xxx is assumed case-sensitive.
		2. is there a function/class named xxxAttribute ?
				instantiate from the function/class. xxx is assumed case-sensitive.
		3. is xxx == 'dir' ? instantiate from baseAttribute({ attributeName: 'dir'})
		4. is xxx == 'style' ? instantiate from styleAttribute
		5. is xxx == 'class' ? instantiate from classAttribute
		6. is there an event named xxx? instantiate from eventHandlerAttribute({ event: xxx })
		7. is there a tag named xxx? instantiate from baseTag({ tagName: xxx}). xxx is assumed case-insensitive.
		8. instantiate from baseAttribute({ attributeName: xxx })
		
		in order to use xxx as an attribute where xxx is already found in tags (like summary, span, ...)
		the user requires to use ^/xxx/${value} to explicitly indicate that he is using an attribute.
			e.g.  <input ^form${'my-form'} />
		
		'dir' is an exception and is always assumed as an attribute. if the user decides
		to use it a tag he should define a class named dirTag so that j6t uses it first.
		
		'style' is also an exception. we can't assume any priority between attribute and tag
		since style is so common both as an attribute and a tag. we gave more priority to attribute
		eventually and removed 'style' from tags list. instead defined a 'stylesTag' class
		so that the user is able to use 'style' as a tag. the extra 's' in 'styles' is removed
		internally in stylesTag class.
		
		
	special characters:
		#xxx${handler}		manual event handler (assume xxx as an event handler. use eventHandlerAttribute)
		+xxx${handler}		attach event handler
		-xxx${handler}		detach event handler
		+#xxx${handler}		attach manual event handler
		-#xxx${handler}		detach manual event handler
		^xxx${value}		assume xxx as an attribute (use baseAttribute class)
		!${value}			do not htmlencode value
		${x}@xx${value}		dynamic command execution. assume x to complete xx as a command.
							full command is xxx as if xxx${value} is specified. xx is optional.
		*xxx${value}		reserved
		$${value}			reserved
		$xxx${value}		reserved
		:xxx${value}		reserved
		%${value}			urlDecode(value)
		&${value}			urlEncode(value)
		~${value}			Capitalize(value)
		^${value}			toUpperCase(value)
		v${value}			toLowerCase(value)
		=${value}			reserved
		
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
	isValidTag(tag) {
		return /^[a-zA-Z][a-zA-Z0-9-_:]*$/.test(tag);
	}
	isValid() {
		return isValidTag(this.tagName);
	}
	isValidAttribute(attr) {
		return typeof attr == 'string' && attr.trim() != '' && /^[a-zA-Z][a-zA-Z0-9-_]*$/.test(attr);
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
		if (isValid()) {
			if (this.selfClose) {
				return html`<${this.tagName} ${getAttributes()}
									 ${prop => html`${prop}@${this[prop]}`}
							/>`
			} else {
				return html`<${this.tagName} ${getAttributes()}
									${prop => html`${prop}@${this[prop]}`}
							>${this.text}!${this.html}</${this.tagName}>`
			}
		} else {
			return '';
		}
	}
}
class stylesTag extends baseTag {
	constructor(props) {
		super(props);
		
		this.tagName = 'style';
	}
	isValid() {
		return true;
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
		super($.extend(
					{},
					(typeof props == 'object' ? props: {}),
					{ attributeName: 'class' }
				));
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
		super($.extend(
					{},
					(typeof props == 'object' ? props: {}),
					{ attributeName: 'style' }
				));
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
		if (	   !isEmpty(this.eventName)
				&& typeof this.eventName == 'string'
				&& this.owner
				&& this.owner.id
				&& $.isFunction(this.attributeValue)) {
			let _event = this.owner.events.find(x => x.name.toLowerCase() == this.eventName.toLowerCase());
			
			if (_event == undefined) {
				if (this.bind != '-') {
					this.owner.events.push({
						id: this.owner.id,
						name: this.eventName,
						handlers: [ { handler: this.attributeValue, bind: '+', applied: false } ]
					});
				}
			} else {
				let handlerIndex = _event.handlers.findIndex(fn => this.attributeValue);
				
				if (_event.handlers.length == 0 && this.bind != '-') {
					_event.handlers.push({ handler: this.attributeValue, bind: '+', applied: false });
				} else if (handlerIndex < 0) {
					if (this.bind == '+') {
						_event.handlers.push({ handler: this.attributeValue, bind: '+', applied: false });
					}
				} else {
					if (this.bind == '-') {
						_event.handlers[handlerIndex].bind = '-';
						_event.handlers[handlerIndex].applied = false;
					}
				}
			}
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
		
		return result.join('\n');
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