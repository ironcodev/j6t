import * as templateTags			from './tags.js'
import * as util 					from './util.js'
import * as validation 				from './validation.js'
import { BaseLogger, NullLogger } 	from './logger.js'
import jQuery 						from './jquery.js'

if (jQuery == null) {
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
				 // 'style' and 'dir'	these tags are ommited since we want them to have more priority as attributes <button style${...}>, <div dir${...}>
				 // in order to force using 'style' or 'dir' as a tag, the user can leverage $style${...} or $dir${...} or define an explicit styleTag, dirTag class
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
		if (xxx contains '-', ':' or '.', replace them with ''.
		
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
*/
/*
	examples:
	<a href${'google.com'}>
		literals:
			0: <a href
			1: ''
		expressions:
			0: 'google.com'

	<a ${'href'}@${'google.com'}
		literals:
			0: <a 
			1: ''
			2: ''
		expressions:
			0: 'href'
			1: 'google.com'

	test @${24}
		literals:
			0: test @
			1: ''
		expressions:
			0: 24

	test hello@${24}
		literals:
			0: test hello@
			1: ''
		expressions:
			0: 24

	name= ${'ali'} ${'omrani'}
		literals:
			0: name= 
			1: ''
			2: ''
		expressions:
			0: 'ali'
			1: 'omrani'

	test !${'<>'}
		literals:
			0: test !
			1: ''
		expressions:
			0: <>

	test hi!${'<>'}
		literals:
			0: test hi!
			1: ''
		expressions:
			0: <>

	test @${'cmd1'} ${'arg1'}
		literals:
			0: test @
			1: ' '
			2: ''
		expressions:
			0: 'cmd1'
			1: 'arg1'

	test @${'cmd1'}${'arg1'}
		literals:
			0: test @
			1: ''
			2: ''
		expressions:
			0: 'cmd1'
			1: 'arg1'

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
		
		jQuery.extend(this, {
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
			
			if (id.indexOf(' ') >= 0) {
				doGenerate = true;
			}
		}
		
		return doGenerate? `${this.idPrefix}${this.counter++}`: id;
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
		
		jQuery.extend(this, {
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
		return '1.0'
	}
	render(component, target) {
		if (component instanceof(Component) && jQuery(target).length == 1) {
			let content = [];
			let html = '';
			
			Component.links.forEach(link => {
				if (!link.applied) {
					html = link.element.render();
					content.push(html);
					link.applied = true;
				}
			});
			
			html = component.render();
			
			content.push(html);
			
			Component.scripts.forEach(script => {
				if (!script.applied) {
					html = script.element.render();
					content.push(html);
					script.applied = true;
				}
			});
			
			jQuery(target).html(content.join('\n'));
			
			component.bindEvents();
		}
	}
}

class Component {
	constructor(props) {
		Object.assign(this, (util.isSomeObject(props) ? props: { arg: props }));
		
		if (!(this.logger instanceof(BaseLogger))) {
			if (util.isSomeObject(this.parent) && this.parent.logger instanceof(BaseLogger)) {
				this.logger = this.parent.logger;
			} else {
				this.logger = new NullLogger();
			}
		}
		
		if (util.isEmpty(this.parent)) {
			if (!this.isRoot) {
				this.logger.warn(`warning: no parent specified for this ${this.constructor.name} instance`);
			}
		}
		
		let reservedIdProvider;
		
		if (!util.isSomeObject(this.idProvider) && util.isSomeObject(this.parent) && util.isSomeObject(this.parent.idProvider)) {
			this.idProvider = this.parent.idProvider;
		}
		
		if (!(this.idProvider instanceof(j6tIdProvider))) {
			this.logger.warn(`warning: specified IdProvider is not a j6tIdProvider instance`);
			this.logger.warn(`used j6tUniversalIdProvider as fallback`);
			
			reservedIdProvider = new j6tUniversalIdProvider();
			
			this.idProvider = reservedIdProvider;
		}
		
		this.id = this.idProvider.generate(this.id);
		
		if (!util.isSomeString(this.id) || this.id.indexOf(' ') >= 0) {
			this.logger.warn(`warning: current ${this.constructor.name}'s IdProvider couldn't generate a valid id`);
			this.logger.warn(`current ${this.constructor.name}'s id was generated by a j6tUniversalIdProvider as fallback`);
			
			if (!util.isSomeObject(reservedIdProvider)) {
				reservedIdProvider = new j6tUniversalIdProvider();
			}
			
			this.id = reservedIdProvider.generate(this.id);
		}
		
		this.lastId = '';
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
    }
	generateId(id) {
		return this.idProvider.generate(id);
	}
	exec(command, value) {
		let result = '';
		
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
	parse(literals, ...expressions) {
		const me = this;
		let result = [];
		let arr;
		
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
				
				try {
					obj = eval(str);
					
					if (!ignoreOwner) {
						me.lastOwner = obj;
					}
				} catch (e) {
					me.logger.danger(e);
					me.logger.error(`creating object ${str} failed!`);
				}
				
				return obj;
			}
			
			function _render(x) {
				if (util.isSomeObject(x)) {
					if (!(x instanceof(BaseAttribute))) {
						me.children.push(x);
					}
					
					if (util.isFunction(x.render)) {
						const html = x.render();
							
						if (html) {
							result.push(html);
						}
					}
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
			
			do {
				if (!validation.isValidId(args.name)) {
					result.push(args.directive + util.htmlEncodeToString(args.name + args.arg));
					
					break;
				}
				
				let props = util.isSomeObject(args.arg) ? { ...args.arg } : { arg: args.arg };
				
				if (args.name == 'bind') {
					props.container = me;
				} else {
					props.parent = me;
				}
				
				if (_check(`util.isFunction(${args.name})`)) {
					obj = _create(`new ${args.name}(props)`, props);
					
					break;
				}
				if (_check(`util.isFunction(${args.name}Element)`)) {
					obj = _create(`new ${args.name}Element(props)`, props);
					
					break;
				}
				
				if (_check(`util.isFunction(${args.name}Tag)`)) {
					obj = _create(`new ${args.name}Tag(props)`, props);
					
					break;
				}
				
				if (_check(`util.isFunction(${args.name}Attribute)`)) {
					let currentIdIsForMe = false;
					
					if (args.name == 'id') {
						if (util.isSomeString(args.arg) && args.arg[0] == '#') {
							if (args.arg.length > 1) {
								currentIdIsForMe = true;
								args.arg = args.arg.substr(1);
							} else {
								args.arg = me.id;
							}
						} else {
							if (args.arg == 0) {
								args.arg = me.id;
							}
						}
					}
					
					obj = _create(`new ${args.name}Attribute({ attributeName: '${args.name}', attributeValue: args.arg, container: me })`, null, true);
					
					if (currentIdIsForMe) {
						me.id = obj.attributeValue;
					}
					
					break;
				}
				
				if (events.indexOf(args.name) >= 0 || args.directive == '#') {
					obj = new bindElement({
						event: args.name,
						container: me,
						target: `#${me.lastId}`,
						handler: args.arg
					});
					
					break;
				}
				
				if (tags.indexOf(args.name) >= 0) {
					if (args.directive == '^') {
						obj = new BaseAttribute({ attributeName: args.name, attributeValue: args.arg, container: me });
					} else {
						obj = new BaseTag({ tagName: args.name, ...props });
					}
					
					break;
				}
				
				if (args.directive == '$') {
					obj = new BaseTag({ tagName: args.name, ...props });
				} else {
					obj = new BaseAttribute({ attributeName: args.name, attributeValue: args.arg, container: me });
				}
			} while (false);
			
			_render(obj);
		}
		function _evaluateExpression(index, callExpression, ...args) {
			let _result = '';
			let _value = expressions[index];
			
			if (util.isFunction(_value)) {
				if (callExpression) {
					try {
						if (util.isArray(arr)) {
							_result = [];
							arr.forEach((a, i) => {
								let row = _value(a, i, me);
								
								_result.push(row);
							});
							arr = null;
							_result = _result.join('');
						} else {
							let _args = [ me, ...args ];
							
							_result = _value.apply(null, _args);
						}
					} catch (err) {
						me.logger.danger(err);
						me.logger.fail(`calling interpolation expression ${index} function failed.`);
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
		
		me.children = [];
		
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
				
				if (['#', '^', '$', '*'].indexOf(firstCh) < 0) {
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
						
						result.push(value);
						break;
					case '#':
						value = _evaluateExpression(i, true);
						
						if (value == 0) {
							result.push('#' + me.id);
						} else {
							result.push('#' + me.lastId);
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
							
							let execResult = exec(command, value);
							
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

		return result.join('');
	}
	render() {
		util.NotImplementedException(`${this.constructor.name}.render()`)
	}
	refresh() {
		if (jQuery('#' + this.id).length == 1) {
			const html = this.render();
			
			jQuery('#' + this.id).replaceWith(html);
			
			this.bindEvents();
		}
	}
	bindEvents() {
		this.children.forEach(child => {
			if (util.isFunction(child.bindEvents)) {
				child.bindEvents();
			}
		});
		
		this.events.forEach(e => {
			if (jQuery(e.target).length) {
				jQuery(e.target).bind(e.name, e.handler);
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
		
		if (!util.isFunction(this._render)) {
			this._render = function(){ return '' }
		}
	}
	render() {
		return this._render(this);
	}
}
class BaseElement {
	constructor(props) {
		Object.assign(this, util.isSomeObject(props) ? props : {});
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
		
		if (!util.isSomeString(this.tagName) && util.isSomeString(props)) {
			this.tagName = props;
		}
		
		if (!util.isBool(this.selfClose)) {
			this.selfClose = false;
		}
		
		this.lastId = this.id;
		this.lastOwner = this;
		
		if (!util.isEmpty(this.arg)) {
			this.html = this.arg
		}
	}
	isValid() {
		return validation.isValidTag(this.tagName);
	}
	getExcludedAttributes() {
		return ['tagname', 'selfclose', 'lastid', 'lastowner', 'children', 'events', 'resources', 'html', 'text', 'logger', 'parent', 'arg', 'idprovider'];
	}
	getAttributes() {
		let result = [];
		let excludes = this.getExcludedAttributes();
		
		jQuery.each(this, prop => {
			if (util.isSomeString(prop) && !util.isNumeric(prop)) {
				let _prop = prop.toLowerCase();
				
				if (validation.isValidAttributeName(prop) && excludes.indexOf(_prop) < 0) {
					result.push(prop);
				}
			}
		});
		
		return result;
	}
	render() {
		if (this.isValid()) {
			let me = this;
			
			if (this.selfClose) {
				return me.parse`<!${me.tagName}${me.getAttributes()}${prop => me.parse` @${prop}${me[prop]}`}/>`
			} else {
				return me.parse`<!${me.tagName}${me.getAttributes()}${prop => me.parse` @${prop}${me[prop]}`}>
								${me.validateText(me.text)}!${me.validateHtml(me.html)}
							   </!${me.tagName}>`
			}
		} else {
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
		
		this.href = util.isSomeString(this.href) ? this.href : '';
		
		if (util.left(this.href, 4).toLowerCase() == '.css') {
			if (util.isEmpty(this.rel)) {
				this.rel = 'stylesheet';
			}
			if (util.isEmpty(this.type)) {
				this.type = 'text/css';
			}
		}
	}
}
class linkElement {
	constructor(props) {
		if (util.isArray(props)) {
			props.forEach(x => {
				const element = new linkTag(x);
				const href = element.href.toLowerCase();
				
				if (util.isSomeString(href)) {
					if (Component.links.find(e => e.element.href.toLowerCase() == href) == undefined) {
						Component.links.push({ applied: false, element })
					}
				}
			});
		} else {
			const element = new linkTag(props);
			const href = element.href.toLowerCase();
			
			if (util.isSomeString(href)) {
				if (Component.links.find(e => e.element.href.toLowerCase() == href) == undefined) {
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
		
		this.src = util.isSomeString(this.src) ? this.src : '';
		
		if (util.left(this.src, 3).toLowerCase() == '.js') {
			if (util.isEmpty(this.type)) {
				this.type = 'text/javascript';
			}
		} else if (util.left(this.src, 5).toLowerCase() == '.json') {
			if (util.isEmpty(this.type)) {
				this.type = 'application/json';
			}
		}
	}
}
class scriptElement {
	constructor(props) {
		if (util.isArray(props)) {
			props.forEach(x => {
				const element = new scriptTag(x);
				const src = element.src.toLowerCase();
				
				if (util.isSomeString(src)) {
					if (Component.scripts.find(e => e.element.src.toLowerCase() == src) == undefined) {
						Component.scripts.push({ applied: false, element })
					}
				}
			});
		} else {
			const element = new scriptTag(props);
			const src = element.toLowerCase();
			
			if (util.isSomeString(src)) {
				if (Component.scripts.find(e => e.element.src.toLowerCase() == src) == undefined) {
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
			this.container.lastId = this.attributeValue = this.container.idProvider.generate(this.attributeValue);
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
			jQuery.each(styles, function(name, value) {
				let _value = '';
				
				if (util.isArray(value)) {
					_value = value.join(' ');
				} else if (util.isFunction(value)) {
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
					target: this.target,
					name: this.event,
					handler: this.handler
				});
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
	j6tNestedIdProvider,
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
