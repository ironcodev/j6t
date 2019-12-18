import * as templateTags			from './tags.js'
import * as util 					from './util.js'
import * as validation 				from './validation.js'
import { BaseLogger, NullLogger } 	from './logger.js'
import _jQuery 						from './jquery.js'

if (_jQuery == null) {
	throw 'jQuery not present'
}

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
				 // 'style' and 'dir'	these tags are ommited since we want their attribute counterparts
				 // have more priority. for example in <button style${...}>, <div dir${...}>, style and dir
				 // must be assumed as attributes. 'style' is more prevalent than <style>.
				 // if we want to force using 'style' or 'dir' as a tag, we can leverage $style${...} or $dir${...}
				 // or define an explicit styleTag, dirTag class.
			];
const attributes = [
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
			id${0}		=> generate id for last and store at 0		(me.lastId, me.ids[0])
			id${1}		=> generate id for last and store at 1		(me.lastId, me.ids[1])
			id${''}		=> generate id for last and store at last	(me.lastId)

			#${'#'}		=> get my id	(me.id)
			#${'.'}		=> get my id	(me.id) alternative
			#${0}		=> get ids[0]	(me.ids[0])
			#${1}		=> get ids[1]	(me.ids[1])
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
}

class j6tIdProvider {
	isValid(id) {
		return validation.isValidDomId(id);
	}
	generate(id) { util.NotImplementedException(`${this.constructor.name}.generate()`) }
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
		};
		
		super();
		
		_jQuery.extend(this, {
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
		if (util.isNumeric(arg)) {
			this.preservedCounter = this.counter;
			this.counter = parseInt(arg);
		}
	}
	restoreState() {
		this.counter = this.preservedCounter;
	}
}
class j6tNestedIdProvider extends j6tIdProvider {
	constructor(props) {
		let type = typeof props;
		let _props = {};
		
		switch (type) {
			case 'object': _props = props; break;
			case 'number': _props = { counter: props }; break;
			case 'string': _props = { idPrefix: props }; break;
		};
		
		super();
		
		_jQuery.extend(this, {
			counter: 0,
			idPrefix: '_el_'
		}, _props);
	}
	generate(id) {
		let doGenerate = false;
		
		if (typeof id != 'string' || !this.isValid(id)) {
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

class j6tRoot {
	get version() {
		return '1.2.0'
	}
	render(component, target) {
		if (component instanceof(Component) && _jQuery(target).length == 1) {
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
			
			component.idProviderState = component.idProvider.getState();
			
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
			
			_jQuery(target).html(content.join('\n'));
			
			component.postRender();
			component.bindEvents();
		}
	}
}

class Component {
	constructor(props) {
		this.props = _jQuery.extend({}, (util.isSomeObject(props) ? props: { arg: props }));
		
		if (util.isSomeObject(this.props.parent)) {
			this.parent = this.props.parent;
		}
		
		if (util.isSomeObject(this.props.logger)) {
			this.logger = this.props.logger;
		}
		
		if (!(this.logger instanceof(BaseLogger))) {
			if (util.isSomeObject(this.parent) && this.parent.logger instanceof(BaseLogger)) {
				this.logger = this.parent.logger;
			} else {
				this.logger = new NullLogger();
			}
		}
		
		if (util.isBool(this.props.isRoot)) {
			this.isRoot = this.props.isRoot;
		}
		
		if (util.isEmpty(this.parent)) {
			if (!this.isRoot) {
				this.logger.warn(`warning: no parent specified for this ${this.constructor.name} instance`);
			}
		}
		
		let reservedIdProvider;
		
		if (util.isSomeObject(this.props.idProvider)) {
			this.idProvider = this.props.idProvider;
		}
		
		if (!util.isSomeObject(this.idProvider) && util.isSomeObject(this.parent) && util.isSomeObject(this.parent.idProvider)) {
			this.logger.secondary(`no idProvider specified for this ${this.constructor.name} instance. Used its parent's idProvider.`);
			
			this.idProvider = this.parent.idProvider;
		}
		
		if (!(this.idProvider instanceof(j6tIdProvider))) {
			this.logger.error(`specified IdProvider is not a j6tIdProvider instance`);
			this.logger.error(`used j6tUniversalIdProvider as fallback`);
			
			reservedIdProvider = new j6tUniversalIdProvider();
			
			this.idProvider = reservedIdProvider;
		}
		
		if (util.isSomeString(this.props.id)) {
			this.logger.debug(`props.id = ${this.props.id}`);
			
			this.id = this.props.id;
		}
		
		this.id = this.idProvider.generate(this.id);
		
		if (!util.isSomeString(this.id) || this.id.indexOf(' ') >= 0) {
			this.logger.error(`error: current ${this.constructor.name}'s IdProvider couldn't generate a valid id`);
			this.logger.error(`Using a j6tUniversalIdProvider as fallback ...`);
			
			if (!util.isSomeObject(reservedIdProvider)) {
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
		
		this.idProviderState = null;
		this.ids = [];
		this.lastId = '';	// not used anymore
		this.hasWrapper = util.isBool(this.props.hasWrapper) ? this.props.hasWrapper: false;
		this.lastOwner = null;
		this.children = [];
		this.events = [];		/*	item structure:
									{
										target: '#xyz',			// selector e.g. '.xyz', 'p', ...
										name: 'click', 			// dbclick, keydown, ...
										handler: function
									}
								*/
		this.resources = [];
		this.parseLevel = 0;
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
				result = util.Dec2Bin(value);
				break;
			case 'x':
				result = util.Dec2Hex(value);
				break;
			case 'o':
				result = util.Dec2Oct(value);
				break;
				
			case 'bd':
				result = util.Bin2Dec(value);
				break;
			case 'bx':
				result = util.Bin2Hex(value);
				break;
			case 'bo':
				result = util.Bin2Oct(value);
				break;
				
			case 'od':
				result = util.Oct2Dec(value);
				break;
			case 'ox':
				result = util.Oct2Hex(value);
				break;
			case 'ob':
				result = util.Oct2Bin(value);
				break;
			
			case 'xd':
				result = util.Hex2Dec(value);
				break;
			case 'xo':
				result = util.Hex2Oct(value);
				break;
			case 'xb':
				result = util.Hex2Bin(value);
				break;
				
			case 'urlencode':
				result = util.urlEncodeToString(value);
				break;
			case 'urldecode':
				result = util.urlDecodeToString(value);
				break;
			case 'htmldecode':
				result = util.htmlDecode(value);
				break;
			case 'upper':
				result = util.upper(value);
				break;
			case 'lower':
				result = util.lower(value);
				break;
			case 'capitalize':
				result = util.capitalize(value);
				break;
			case 'reverse':
				result = util.reverseToString(value);
				break;
			case 'trim':
				result = util.trim(value);
				break;
			default:
				result = '*' + command + util.htmlEncodeToString(value);
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
				if (util.isNumeric(value)) {
					result += me.ids[parseInt(value)] + (ended ? '' : ch);
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
		
		if (util.isSomeString(selector)) {
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
		
		me.parseLevel++;
		
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
					obj = eval(str);
					
					if (!ignoreOwner) {
						me.lastOwner = obj;
					}
				} catch (e) { }
				
				return obj;
			}
			
			function _render(x) {
				if (util.isSomeObject(x)) {
					if (!(x instanceof(BaseAttribute) || x instanceof(bindElement))) {
						me.children.push(x);
					}
					
					if (util.isFunction(x.render)) {
						if (x.idProvider instanceof j6tIdProvider) {
							x.idProviderState = x.idProvider.getState();
							
							me.logger.debug(`		x.idProviderState = ${x.idProviderState}`);
						}
						
						if (util.isFunction(x.preRender)) {
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
					result = eval(str);
				} catch {}
				
				return result;
			}
			
			let obj;
			let dynamicRender = '';
			let props;
			
			do {
				if (!validation.isValidId(args.name)) {
					result.push(args.directive + util.htmlEncodeToString(args.name + (args.arg || '').toString()));
					
					break;
				}
				
				props = util.isSomeObject(args.arg) ? { ...args.arg } : { arg: args.arg };
				
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
						if (util.isSomeString(args.arg) && args.arg[0] == '#') {
							if (args.arg.length > 1) {
								me.logger.secondary(`manual id '${args.arg}' for current component specified.`);
								
								currentIdIsForMe = true;
								args.arg = args.arg.substr(1);
							} else {
								me.logger.secondary(`current component id '${me.id}' requested.`);
								
								args.arg = me.id;
								me.hasWrapper = true;
							}
						} else if (args.arg == '.') {
							me.logger.secondary(`current component id '${me.id}' requested.`);
							
							args.arg = me.id;
						}
					}
					
					obj = _create(`new ${args.name}Attribute({ attributeName: '${args.name}', attributeValue: args.arg, container: me })`, null, true);
					
					dynamicRender = `${args.name}Attribute`;
					
					if (util.isSomeObject(obj)) {
						if (currentIdIsForMe) {
							me.id = obj.attributeValue;
							
							me.logger.secondary(`current component's id was changed to '${me.id}'.`);
						}
					}
					
					break;
				}
				
				if ((events.indexOf(args.name) >= 0 || args.directive == '#')) {
					if (me.ids.length) {
						me.logger.secondary(`event ${args.name} ${(args.directive == '#'?'was forced':' was found')}.`);
						
						obj = new bindElement({
							event: args.name,
							container: me,
							target: `#${me.ids[me.ids.length - 1]}`,	// me.lastId
							handler: args.arg
						});
					
						break;
					} else {
						me.logger.warn(`component ids list is empty. cannot create event '${args.name}'.`);
					}
				}
				
				if (tags.indexOf(args.name) >= 0) {
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
			
			if (!util.isSomeObject(obj) && util.isSomeString(dynamicRender)) {
				me.logger.secondary(`using DynamicComponent to invoke ${args.name} ...`);
				
				obj = _create(`new DynamicComponent(props)`, props);
				
				if (util.isSomeObject(obj)) {
					eval(`obj.render = ${dynamicRender}`);
				} else {
					me.logger.fail(`creating DynamicComponent failed!`);
				}
			}
			
			if (util.isSomeObject(obj) && !util.isSomeObject(obj.props)) {
				obj.props = {};
			}
			
			_render(obj);
		}
		function _evaluateExpression(index, callExpression, ...args) {
			let _result = '';
			let _value = expressions[index];
			
			if (util.isFunction(_value)) {
				if (callExpression) {
					if (util.isArray(arr)) {
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
			} else if (util.isArray(_value)) {
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
				
				lastWhitespaceIndex = literal ? util.lastIndexOf(literal, [' ', '\t', '\n']): -1;
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
							in this case me.ids[me.ids.length - 1] will refer to an inocrrect id
						else if (typeof value == 'string' && value.trim() == '') {
							let _lastId = me.ids[me.ids.length - 1]; // me.lastId;
							result.push(() => '#' + _lastId);
						}
						*/
						else if (util.isNumeric(value)) {
							let _value = value;				// 	we need to postpone reading me.ids[value] because ids[] are set by id${}
															//	and id${} might be called after #${}
							result.push(() => '#' + (me.ids[_value] || ''));
						} else {
							result.push('#' + util.htmlEncodeToString(value));
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
								result.push(util.urlDecodeToString(value));
								break;
							case '%':
								result.push(util.urlEncodeToString(value));
								break;
							case '.':
								result.push(util.htmlDecode(value));
								break;
							case '=':
								result.push(util.upper(value));
								break;
							case '-':
								result.push(util.lower(value));
								break;
							case '~':
								result.push(util.capitalize(value));
								break;
							case '/':
								result.push(util.reverseToString(value));
								break;
							case '|':
								result.push(util.trim(value));
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
							result.push(util.left(literal, literal.length - command.length - 1));
							
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
						} else if (validation.isValidId(name)) {
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
							result.push(util.htmlEncodeToString(value));
						}
						
						break;
				}
			} else {
				result.push(literal);
			}
			
			i++;
		}

		for (let i = 0; i < result.length; i++) {
			if (util.isFunction(result[i])) {
				result[i] = result[i]();
			}
		}
		
		if (!me.hasWrapper && me.parseLevel == 1) {
			me.logger.warn(`component ${this.constructor.name} has no wrapper. default wrapper was added.`);
			
			result.splice(0, 0, `<div id="${me.id}">`);
			result.push(`</div>`);
		}
		
		me.parseLevel--;
		
		return result.join('');
	}
	preRender() {
		const me = this;
		
		this.children = [];
		this.ids = [];
		this.events = [];
	}
	postRender() {
	}
	render() {
		return '';
	}
	refresh() {
		const me = this;
		
		me.logger.info(`refresh()`);
		
		const count = _jQuery('#' + this.id).length;
		
		if (count == 1) {
			const isj6tIdProvider = this.idProvider instanceof j6tIdProvider;
			
			if (isj6tIdProvider) {
				try {
					this.idProvider.setState(this.idProviderState);
				} catch (e) {
					me.logger.fail(`idProvider.setState() failed.`);
					me.logger.danger(e);
				}
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
			
			_jQuery('#' + this.id).replaceWith(html);
			
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
		
		this.children.forEach((child, i) => {
			if (util.isFunction(child.bindEvents)) {
				child.bindEvents();
			}
		});
		
		this.events.forEach((e, i) => {
			if (_jQuery(e.target).length) {
				_jQuery(e.target).bind(e.name, e.handler);
			} else {
				me.logger.warn(`event target '${e.target}' does not exist in the DOM. event binding skipped.`);
			}
		});
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
		_jQuery.extend(this, util.isSomeObject(props) ? props : {});
		
		if (!(this.logger instanceof(BaseLogger))) {
			if (util.isSomeObject(this.parent) && this.parent.logger instanceof(BaseLogger)) {
				this.logger = this.parent.logger;
			} else if (util.isSomeObject(this.container) && this.container.logger instanceof(BaseLogger)) {
				this.logger = this.container.logger;
			} else {
				this.logger = new NullLogger();
			}
		}
	}
	render() {
		util.NotImplementedException(`${this.constructor.name}.render()`)
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
		
		if (util.isSomeString(props)) {
			this.tagName = props;
		}
		
		this.selfClose = util.isBool(this.props.selfClose) ? this.props.selfClose: false;
		
		//this.lastId = this.id; we don't support me.lastId any more because it is problematic
		// instead we add me.id to me.ids
		this.ids.push(me.id);
		this.lastOwner = this;
		
		if (!util.isEmpty(this.props.arg)) {
			this.props.html = this.arg
		}
		
		this.logger.secondary(`BaseTag.ctor(): tagName = ${this.tagName}`);
		this.logger.debug(this.props);
	}
	isValid() {
		return validation.isValidTag(this.tagName);
	}
	getExcludedAttributes() {
		return ['tagname', 'selfclose', 'isroot', 'logger', 'parent', 'arg', 'idprovider', 'haswrapper'];
	}
	getAttributes() {
		let result = [];
		let excludes = this.getExcludedAttributes();
		let me = this;
		
		_jQuery.each(this.props, prop => {
			if (util.isSomeString(prop) && !util.isNumeric(prop)) {
				let _prop = prop.toLowerCase();
				
				if (validation.isValidAttributeName(prop) && excludes.indexOf(_prop) < 0) {
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
		
		this.ids.push(this.id);
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
		let _props = util.isSomeObject(props) ? props: {};
		
		_props.tagName = 'style';
		
		if (util.isArray(props)) {
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
		let _props = util.isSomeObject(props) ? props: {};
		
		_props.tagName = 'link';
		_props.selfClose = true;
		
		if (util.isSomeString(props)) {
			_props.href = props;
		}
		
		super(_props);
		
		// make sure href, rel, type in this.props are string
		this.props.href = util.isSomeString(this.props.href) ? this.props.href : '';
		this.props.rel = util.isSomeString(this.props.rel) ? this.props.rel : '';
		this.props.type = util.isSomeString(this.props.type) ? this.props.type : '';
		
		if (util.left(this.props.href, 4).toLowerCase() == '.css') {
			if (util.isEmpty(this.props.rel)) {
				this.props.rel = 'stylesheet';
			}
			if (util.isEmpty(this.props.type)) {
				this.props.type = 'text/css';
			}
		}
	}
}
class linkElement {
	constructor(props) {
		if (util.isArray(props)) {
			props.forEach(x => {
				const element = new linkTag(x);
				const href = element.props.href.toLowerCase();
				
				if (util.isSomeString(href)) {
					if (Component.links.find(e => e.element.props.href.toLowerCase() == href) == undefined) {
						Component.links.push({ applied: false, element })
					}
				}
			});
		} else {
			const element = new linkTag(props);
			const href = element.props.href.toLowerCase();
			
			if (util.isSomeString(href)) {
				if (Component.links.find(e => e.element.props.href.toLowerCase() == href) == undefined) {
					Component.links.push({ applied: false, element })
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
		let _props = util.isSomeObject(props) ? props: {};
		
		_props.tagName = 'script';
		
		if (util.isSomeString(props)) {
			_props.src = props;
		}
		
		super(_props);
		
		// make sure src, type in this.props are string
		this.props.src = util.isSomeString(this.props.src) ? this.props.src : '';
		this.props.type = util.isSomeString(this.props.type) ? this.props.type : '';
		
		if (util.left(this.props.src, 3).toLowerCase() == '.js') {
			if (util.isEmpty(this.props.type)) {
				this.props.type = 'text/javascript';
			}
		} else if (util.left(this.props.src, 5).toLowerCase() == '.json') {
			if (util.isEmpty(this.props.type)) {
				this.props.type = 'application/json';
			}
		}
	}
}
class scriptElement {
	constructor(props) {
		if (util.isArray(props)) {
			props.forEach(x => {
				const element = new scriptTag(x);
				const src = element.props.src.toLowerCase();
				
				if (util.isSomeString(src)) {
					if (Component.scripts.find(e => e.element.props.src.toLowerCase() == src) == undefined) {
						Component.scripts.push({ applied: false, element })
					}
				}
			});
		} else {
			const element = new scriptTag(props);
			const src = element.props.toLowerCase();
			
			if (util.isSomeString(src)) {
				if (Component.scripts.find(e => e.element.props.src.toLowerCase() == src) == undefined) {
					Component.scripts.push({ applied: false, element })
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
		const _props = util.isSomeObject(props) ? props: { attributeName: '', attributeValue: props };
		
		super(_props);
	}
	validateValue(value) {
		return !util.isEmpty(value);
	}
	encodeValue(value) {
		return util.htmlEncodeToString(value);
	}
	isValid() {
		return validation.isValidAttributeName(this.attributeName) && (this.validateValue(this.attributeValue) || this.standAlone);
	}
	render() {
		let result = '';
		
		if (this.isValid()) {
			if (this.standAlone) {
				if (this.attributeValue === true || (!util.isEmpty(this.attributeValue) && this.attributeValue != false)) {
					 result = ` ${this.attributeName}`
				}
			} else {
				if (!util.isEmpty(this.attributeValue)) {
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
	constructor() {
		super(props);
		
		this.attributeName = 'checked';
	}
}
class disabledAttribute extends BooleanAttribute {
	constructor() {
		super(props);
		
		this.attributeName = 'disabled';
	}
}
class asyncAttribute extends BooleanAttribute {
	constructor() {
		super(props);
		
		this.attributeName = 'async';
	}
}
class deferAttribute extends BooleanAttribute {
	constructor() {
		super(props);
		
		this.attributeName = 'defer';
	}
}
class classAttribute extends BaseAttribute {
	constructor(props) {
		super(props);
		
		if (util.isArray(props)) {
			this.attributeValue = props.join(' ');
		}
		
		this.attributeName = 'class';
	}
}
class idAttribute extends BaseAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'id';
		
		if (util.isEmpty(this.attributeValue)) {
			this.attributeValue = '';
		}
		
		if (util.isSomeObject(this.container)) {
			let givenId = this.attributeValue;
			
			this.attributeValue = this.container.idProvider.generate(givenId);
			
			if (util.isNumeric(givenId)) {
				this.container.ids[givenId] = this.attributeValue;
			}
		}
	}
}
class dirAttribute extends BaseAttribute {
	constructor(props) {
		super(props);
		
		this.attributeName = 'dir';
		
		if (['rtl', 'ltr'].indexOf(util.toStr(this.attributeValue)) < 0) {
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
		
		if (util.isArray(styles)) {
			styles.forEach(style => {
				if (util.isSomeString(style)) {
					style = style.trim();
					
					result.push((style[style.length - 1] == ';' ? style.substr(0, style.length - 1): style));
				} else if (util.isSomeObject(style)) {
					let _styles = this.populate(style);
					
					if (util.isSomeString(_styles)) {
						result.push(_styles);
					}
				}
			});
		} else if (util.isSomeObject(styles)){
			_jQuery.each(styles, function(name, value) {
				let _value = '';
				
				if (util.isArray(value)) {
					_value = value.join(' ');
				} else if (util.isFunction(value)) {
					_value = value();
				} else {
					_value = util.toStr(value);
				}
				
				// $$$$$$$$$$$$$$ POTENTIAL XSS $$$$$$$$$$$$$
				// name and _value must be validated to be valid css name/value
				// $$$$$$$$$$$$$$ POTENTIAL XSS $$$$$$$$$$$$$
				
				result.push(`${cssAttribute(name)}: ${_value}`);
			});
		} else {
			if (util.isSomeString(styles)) {
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
			
			if (!util.isEmpty(result)) {
				// $$$$$$$$$$$$$$ POTENTIAL XSS $$$$$$$$$$$$$
				// result must be validated to contain valid css style rules and nothing else.
				// $$$$$$$$$$$$$$ POTENTIAL XSS $$$$$$$$$$$$$
				
				// we can't use htmlencode on rsult because css styles may contain
				// characters like >, < which are valid in CSS but will be encoded by htmlencode()
				// and produce faulty css.
				
				result = ` style="${result}"`
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
		
		this.event = (util.isSomeString(this.event) ? this.event: '').toLowerCase();
		
		if (this.event.length >= 2 && this.event.substr(0, 2) == 'on') {
			this.event = this.event.substr(2);
		}
	}
	render() {
		this.logger.debug(`event: '${this.event}', target: '${this.target}', container: '${(util.isSomeObject(this.container) ? 'ok': 'error')}'`);
		
		if (validation.isValidEvent(this.event)
			&& util.isSomeString(this.target)
			&& util.isFunction(this.handler)
			&& util.isSomeObject(this.container)
			&& util.isArray(this.container.events)) {
				
			let e = this.container.events.find(e => e.name == this.event
													&& e.target == this.target
													&& e.handler == this.handler);
			
			if (e == undefined) {
				this.container.events.push({
					target: this.container.parseCssSelector(this.target),
					name: this.event,
					handler: this.handler
				});
			} else {
				this.logger.error(`the same event and handler already bound for the same element`);
			}
		}
		
		return '';
	}
}

// --------------------------- Attributes ( end ) -------------------------

export default j6tRoot;
export {
	j6tIdProvider,
	j6tUniversalIdProvider,
	/*j6tNestedIdProvider,*/	// this id provider is not implemented yet.
	Component,
	DynamicComponent,
	BaseElement,
	BaseTag,
	stylesTag,
	linkTag,
	linkElement,
	scriptTag,
	scriptElement,
	BaseAttribute,
	BooleanAttribute,
	selectedAttribute,
	checkedAttribute,
	disabledAttribute,
	asyncAttribute,
	deferAttribute,
	classAttribute,
	idAttribute,
	dirAttribute,
	styleAttribute,
	bindElement
}
