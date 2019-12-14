(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var elements = _interopRequireWildcard(require("./j6t.js"));

var util = _interopRequireWildcard(require("./util.js"));

var validation = _interopRequireWildcard(require("./validation.js"));

var logging = _interopRequireWildcard(require("./logger.js"));

var tags = _interopRequireWildcard(require("./tags.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var j6t = new elements["default"]();
Object.assign(j6t, elements, util, validation, logging, {
  tags: tags
});

if (window) {
  window.j6t = j6t;
}

var _default = j6t;
exports["default"] = _default;

},{"./j6t.js":2,"./logger.js":4,"./tags.js":5,"./util.js":6,"./validation.js":7}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindElement = exports.styleAttribute = exports.dirAttribute = exports.idAttribute = exports.classAttribute = exports.deferAttribute = exports.asyncAttribute = exports.disabledAttribute = exports.checkedAttribute = exports.selectedAttribute = exports.BooleanAttribute = exports.BaseAttribute = exports.scriptElement = exports.scriptTag = exports.linkElement = exports.linkTag = exports.stylesTag = exports.BaseTag = exports.BaseElement = exports.DynamicComponent = exports.Component = exports.j6tUniversalIdProvider = exports.j6tIdProvider = exports["default"] = void 0;

var templateTags = _interopRequireWildcard(require("./tags.js"));

var util = _interopRequireWildcard(require("./util.js"));

var validation = _interopRequireWildcard(require("./validation.js"));

var _logger = require("./logger.js");

var _jquery = _interopRequireDefault(require("./jquery.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject4() {
  var data = _taggedTemplateLiteral([" @", "", ""]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["<!", "", "", ">\n\t\t\t\t\t\t\t\t", "!", "\n\t\t\t\t\t\t\t   </!", ">"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral([" @", "", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["<!", "", "", "/>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

if (_jquery["default"] == null) {
  throw 'jQuery not present';
}

var tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'b', 'strong', 'i', 'ins', 'pre', 'q', 'small', 'strike', 'font', 'sub', 'summary', 'sup', 'u', 'div', 'span', 'img', 'figure', 'figcaption', 'picture', 'section', 'article', 'header', 'footer', 'table', 'thead', 'th', 'tr', 'td', 'tbody', 'tfoot', 'canvas', 'video', 'audio', 'form', 'button', 'input', 'textarea', 'fieldset', 'kbd', 'label', 'legend', 'select', 'optgroup', 'option', 'ul', 'li', 'dd', 'dl', 'dt', 'ol', 'a', 'abbr', 'acronym', 'link', 'address', 'area', 'aside', 'base', 'basefont', 'bdi', 'blockquote', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'del', 'details', 'dfn', 'dialog', 'dir', 'em', 'embed', 'applet', 'noframes', 'iframe', 'frame', 'frameset', 'hr', 'br', 'main', 'map', 'mark', 'meter', 'map', 'noscript', 'script', 'object', 'output', 'param', 'progress', 'rp', 'rt', 'ruby', 's', 'samp', 'source', 'svg', 'template', 'time', 'track', 'tt', 'var', 'wbr' // 'style' and 'dir'	these tags are ommited since we want their attribute counterparts
// have more priority. for example in <button style${...}>, <div dir${...}>, style and dir
// must be assumed as attributes. 'style' is more prevalent than <style>.
// if we want to force using 'style' or 'dir' as a tag, we can leverage $style${...} or $dir${...}
// or define an explicit styleTag, dirTag class.
];
var attributes = ['accept', 'accept-charset', 'accesskey', 'action', 'align', 'allow', 'alt', 'async', 'autocapitalize', 'autocomplete', 'autofocus', 'autoplay', 'background', 'bgcolor', 'border', 'buffered', 'challenge', 'charset', 'checked', 'cite', 'code', 'codebase', 'color', 'cols', 'colspan', 'content', 'contenteditable', 'contextmenu', 'controls', 'coords', 'crossorigin', 'csp', 'data', 'datetime', 'decoding', 'default', 'defer', 'dir', 'dirname', 'disabled', 'download', 'draggable', 'dropzone', 'enctype', 'enterkeyhint', 'for', 'form', 'formaction', 'formenctype', 'formmethod', 'formnovalidate', 'formtarget', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'http-equiv', 'icon', 'id', 'importance', 'integrity', 'intrinsicsize', 'inputmode', 'ismap', 'itemprop', 'keytype', 'kind', 'label', 'lang', 'language', 'loading', 'list', 'loop', 'low', 'manifest', 'max', 'maxlength', 'minlength', 'media', 'method', 'min', 'multiple', 'muted', 'name', 'novalidate', 'open', 'optimum', 'pattern', 'ping', 'placeholder', 'poster', 'preload', 'radiogroup', 'readonly', 'referrerpolicy', 'rel', 'required', 'reversed', 'rows', 'rowspan', 'sandbox', 'scope', 'scoped', 'selected', 'shape', 'size', 'sizes', 'slot', 'span', 'spellcheck', 'src', 'srcdoc', 'srclang', 'srcset', 'start', 'step', 'summary', 'tabindex', 'target', 'title', 'translate', 'type', 'usemap', 'value', 'width', 'wrap'];
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

var events = ['onabort', 'onafterprint', 'onbeforeprint', 'onbeforeunload', 'onblur', 'oncanplay', 'oncanplaythrough', 'onchange', 'onclick', 'oncontextmenu', 'oncopy', 'oncuechange', 'oncut', 'ondblclick', 'ondrag', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'ondurationchange', 'onemptied', 'onended', 'onerror', 'onfocus', 'onhashchange', 'oninput', 'oninvalid', 'onkeydown', 'onkeypress', 'onkeyup', 'onload', 'onloadeddata', 'onloadedmetadata', 'onloadstart', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onoffline', 'ononline', 'onpagehide', 'onpageshow', 'onpaste', 'onpause', 'onplay', 'onplaying', 'onpopstate', 'onprogress', 'onratechange', 'onreset', 'onresize', 'onscroll', 'onsearch', 'onseeked', 'onseeking', 'onselect', 'onstalled', 'onstorage', 'onsubmit', 'onsuspend', 'ontimeupdate', 'ontoggle', 'onunload', 'onvolumechange', 'onwaiting', 'onwheel'];

var cssAttribute = function cssAttribute(attr) {
  var result = [];
  var i = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = attr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var ch = _step.value;

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
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result.join('');
};

var j6tIdProvider =
/*#__PURE__*/
function () {
  function j6tIdProvider() {
    _classCallCheck(this, j6tIdProvider);
  }

  _createClass(j6tIdProvider, [{
    key: "isValid",
    value: function isValid(id) {
      return validation.isValidDomId(id);
    }
  }, {
    key: "generate",
    value: function generate(id) {
      util.NotImplementedException("".concat(this.constructor.name, ".generate()"));
    }
  }, {
    key: "getState",
    value: function getState() {}
  }, {
    key: "setState",
    value: function setState(arg) {}
  }, {
    key: "restoreState",
    value: function restoreState() {}
  }]);

  return j6tIdProvider;
}();

exports.j6tIdProvider = j6tIdProvider;

var j6tUniversalIdProvider =
/*#__PURE__*/
function (_j6tIdProvider) {
  _inherits(j6tUniversalIdProvider, _j6tIdProvider);

  function j6tUniversalIdProvider(props) {
    var _this;

    _classCallCheck(this, j6tUniversalIdProvider);

    var type = _typeof(props);

    var _props = {};

    switch (type) {
      case 'object':
        _props = props;
        break;

      case 'number':
        _props.counter = props;
        break;

      case 'string':
        _props.idPrefix = props;
        break;
    }

    ;
    _this = _possibleConstructorReturn(this, _getPrototypeOf(j6tUniversalIdProvider).call(this));

    _jquery["default"].extend(_assertThisInitialized(_this), {
      counter: 0,
      preservedCounter: 0,
      idPrefix: '_el_'
    }, _props);

    return _this;
  }

  _createClass(j6tUniversalIdProvider, [{
    key: "generate",
    value: function generate(id) {
      var doGenerate = false;

      if (typeof id != 'string' || !this.isValid(id)) {
        doGenerate = true;
      } else {
        id = id.trim();

        if (id.indexOf(' ') >= 0) {
          doGenerate = true;
        }
      }

      return doGenerate ? "".concat(this.idPrefix).concat(this.counter++) : id;
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.counter;
    }
  }, {
    key: "setState",
    value: function setState(arg) {
      if (util.isNumeric(arg)) {
        this.preservedCounter = this.counter;
        this.counter = parseInt(arg);
      }
    }
  }, {
    key: "restoreState",
    value: function restoreState() {
      this.counter = this.preservedCounter;
    }
  }]);

  return j6tUniversalIdProvider;
}(j6tIdProvider);

exports.j6tUniversalIdProvider = j6tUniversalIdProvider;

var j6tNestedIdProvider =
/*#__PURE__*/
function (_j6tIdProvider2) {
  _inherits(j6tNestedIdProvider, _j6tIdProvider2);

  function j6tNestedIdProvider(props) {
    var _this2;

    _classCallCheck(this, j6tNestedIdProvider);

    var type = _typeof(props);

    var _props = {};

    switch (type) {
      case 'object':
        _props = props;
        break;

      case 'number':
        _props = {
          counter: props
        };
        break;

      case 'string':
        _props = {
          idPrefix: props
        };
        break;
    }

    ;
    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(j6tNestedIdProvider).call(this));

    _jquery["default"].extend(_assertThisInitialized(_this2), {
      counter: 0,
      idPrefix: '_el_'
    }, _props);

    return _this2;
  }

  _createClass(j6tNestedIdProvider, [{
    key: "generate",
    value: function generate(id) {
      var doGenerate = false;

      if (typeof id != 'string' || !this.isValid(id)) {
        doGenerate = true;
      } else {
        id = id.trim();

        if (id.indexOf(' ') >= 0 || id.replace(this.idPrefix, '') < this.counter) {
          doGenerate = true;
        }
      }

      return doGenerate ? "".concat(this.idPrefix).concat(this.counter++) : id;
    }
  }]);

  return j6tNestedIdProvider;
}(j6tIdProvider);

var j6tRoot =
/*#__PURE__*/
function () {
  function j6tRoot() {
    _classCallCheck(this, j6tRoot);
  }

  _createClass(j6tRoot, [{
    key: "render",
    value: function render(component, target) {
      if (component instanceof Component && (0, _jquery["default"])(target).length == 1) {
        var content = [];
        var html = '';
        Component.links.forEach(function (link) {
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
        Component.scripts.forEach(function (script) {
          if (!script.applied) {
            script.element.preRender();
            html = script.element.render();
            content.push(html);
            script.applied = true;
          }
        });
        (0, _jquery["default"])(target).html(content.join('\n'));
        component.bindEvents();
      }
    }
  }, {
    key: "version",
    get: function get() {
      return '1.1.3';
    }
  }]);

  return j6tRoot;
}();

var Component =
/*#__PURE__*/
function () {
  function Component(props) {
    _classCallCheck(this, Component);

    this.props = _jquery["default"].extend({}, util.isSomeObject(props) ? props : {
      arg: props
    });

    if (util.isSomeObject(this.props.parent)) {
      this.parent = this.props.parent;
    }

    if (util.isSomeObject(this.props.logger)) {
      this.logger = this.props.logger;
    }

    if (!(this.logger instanceof _logger.BaseLogger)) {
      if (util.isSomeObject(this.parent) && this.parent.logger instanceof _logger.BaseLogger) {
        this.logger = this.parent.logger;
      } else {
        this.logger = new _logger.NullLogger();
      }
    }

    if (util.isBool(this.props.isRoot)) {
      this.isRoot = this.props.isRoot;
    }

    if (util.isEmpty(this.parent)) {
      if (!this.isRoot) {
        this.logger.warn("warning: no parent specified for this ".concat(this.constructor.name, " instance"));
      }
    }

    var reservedIdProvider;

    if (util.isSomeObject(this.props.idProvider)) {
      this.idProvider = this.props.idProvider;
    }

    if (!util.isSomeObject(this.idProvider) && util.isSomeObject(this.parent) && util.isSomeObject(this.parent.idProvider)) {
      this.logger.secondary("no idProvider specified for this ".concat(this.constructor.name, " instance. Used its parent's idProvider."));
      this.idProvider = this.parent.idProvider;
    }

    if (!(this.idProvider instanceof j6tIdProvider)) {
      this.logger.error("specified IdProvider is not a j6tIdProvider instance");
      this.logger.error("used j6tUniversalIdProvider as fallback");
      reservedIdProvider = new j6tUniversalIdProvider();
      this.idProvider = reservedIdProvider;
    }

    if (util.isSomeString(this.props.id)) {
      this.logger.debug("props.id = ".concat(this.props.id));
      this.id = this.props.id;
    }

    this.id = this.idProvider.generate(this.id);

    if (!util.isSomeString(this.id) || this.id.indexOf(' ') >= 0) {
      this.logger.error("error: current ".concat(this.constructor.name, "'s IdProvider couldn't generate a valid id"));
      this.logger.error("Using a j6tUniversalIdProvider as fallback ...");

      if (!util.isSomeObject(reservedIdProvider)) {
        reservedIdProvider = new j6tUniversalIdProvider();
      }

      this.id = reservedIdProvider.generate(this.id);
    }

    this.logger.secondary("current id = '".concat(this.id, "'"));
    this.logger.debug("props:");

    var __props = _objectSpread({}, props);

    delete __props.logger;
    delete __props.parent;
    delete __props.container;
    delete __props.idProvider;
    this.logger.debug(__props);
    this.idProviderState = null;
    this.ids = [];
    this.lastId = ''; // not used anymore

    this.hasWrapper = util.isBool(this.props.hasWrapper) ? this.props.hasWrapper : false;
    this.lastOwner = null;
    this.children = [];
    this.events = [];
    /*	item structure:
    {
    target: '#xyz',			// selector e.g. '.xyz', 'p', ...
    name: 'click', 			// dbclick, keydown, ...
    handler: function
    }
    */

    this.resources = [];
  }

  _createClass(Component, [{
    key: "generateId",
    value: function generateId(id) {
      return this.idProvider.generate(id);
    }
  }, {
    key: "exec",
    value: function exec(command, value) {
      var result = '';
      this.logger.info("exec('".concat(command, "', value) ..."));
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
  }, {
    key: "validateText",
    value: function validateText(text) {
      return text;
    }
  }, {
    key: "validateHtml",
    value: function validateHtml(html) {
      return html;
    }
  }, {
    key: "parseCssSelector",
    value: function parseCssSelector(selector) {
      var result = '';
      var state = 0;
      var value = '';
      var me = this;
      var arr = [' ', '.', '>', ',', '[', ':', '+', '~', '\t'];
      this.logger.info("parseCssSelector('".concat(selector, "')"));

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
        for (var i = 0; i < selector.length; i++) {
          var ch = selector[i];

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

      this.logger.debug("\t\tresult = '".concat(result, "'"));
      return result;
    }
  }, {
    key: "parse",
    value: function parse(literals) {
      for (var _len = arguments.length, expressions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        expressions[_key - 1] = arguments[_key];
      }

      var me = this;
      var result = [];
      var arr;
      me.logger.info("parse()");
      me.logger.debug("\t\tliterals");
      me.logger.debug(literals);
      me.logger.debug("\t\texpressions");
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
          var obj;
          me.logger.secondary(str);

          var __props = _objectSpread({}, props);

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
          } catch (e) {}

          return obj;
        }

        function _render(x) {
          if (util.isSomeObject(x)) {
            if (!(x instanceof BaseAttribute || x instanceof bindElement)) {
              me.children.push(x);
            }

            if (util.isFunction(x.render)) {
              if (x.idProvider instanceof j6tIdProvider) {
                x.idProviderState = x.idProvider.getState();
                me.logger.debug("\t\tx.idProviderState = ".concat(x.idProviderState));
              }

              if (util.isFunction(x.preRender)) {
                try {
                  x.preRender();
                } catch (e) {
                  me.logger.fail("x.preRender failed!");
                  me.logger.danger(e);
                }
              } else {
                me.logger.secondary("no preRender() found");
              }

              var html;

              try {
                html = x.render();
              } catch (e) {
                me.logger.fail("render failed!");
                me.logger.danger(e);
              }

              if (html) {
                result.push(html);
              } else {
                me.logger.warn("x.render() didn't produce anything.");
              }
            } else {
              me.logger.fail("x didn't have a render() method. odd.");
            }
          } else {
            me.logger.error("x is not an object");
          }
        }

        function _check(str) {
          var result = false;

          try {
            result = eval(str);
          } catch (_unused) {}

          return result;
        }

        var obj;
        var dynamicRender = '';
        var props;

        do {
          if (!validation.isValidId(args.name)) {
            result.push(args.directive + util.htmlEncodeToString(args.name + (args.arg || '').toString()));
            break;
          }

          props = util.isSomeObject(args.arg) ? _objectSpread({}, args.arg) : {
            arg: args.arg
          };

          if (args.name == 'bind') {
            props.container = me;
          } else {
            props.parent = me;
          }

          if (_check("util.isFunction(".concat(args.name, ")"))) {
            obj = _create("new ".concat(args.name, "(props)"), props);
            dynamicRender = args.name;
            break;
          }

          if (_check("util.isFunction(".concat(args.name, "Element)"))) {
            obj = _create("new ".concat(args.name, "Element(props)"), props);
            dynamicRender = "".concat(args.name, "Element");
            break;
          }

          if (_check("util.isFunction(".concat(args.name, "Tag)"))) {
            obj = _create("new ".concat(args.name, "Tag(props)"), props);
            dynamicRender = "".concat(args.name, "Tag");
            break;
          }

          if (_check("util.isFunction(".concat(args.name, "Attribute)"))) {
            var currentIdIsForMe = false;

            if (args.name == 'id') {
              if (util.isSomeString(args.arg) && args.arg[0] == '#') {
                if (args.arg.length > 1) {
                  me.logger.secondary("manual id '".concat(args.arg, "' for current component specified."));
                  currentIdIsForMe = true;
                  args.arg = args.arg.substr(1);
                } else {
                  me.logger.secondary("current component id '".concat(me.id, "' requested."));
                  args.arg = me.id;
                  me.hasWrapper = true;
                }
              } else if (args.arg == '.') {
                me.logger.secondary("current component id '".concat(me.id, "' requested."));
                args.arg = me.id;
              }
            }

            obj = _create("new ".concat(args.name, "Attribute({ attributeName: '").concat(args.name, "', attributeValue: args.arg, container: me })"), null, true);
            dynamicRender = "".concat(args.name, "Attribute");

            if (util.isSomeObject(obj)) {
              if (currentIdIsForMe) {
                me.id = obj.attributeValue;
                me.logger.secondary("current component's id was changed to '".concat(me.id, "'."));
              }
            }

            break;
          }

          if (events.indexOf(args.name) >= 0 || args.directive == '#') {
            if (me.ids.length) {
              me.logger.secondary("event ".concat(args.name, " ").concat(args.directive == '#' ? 'was forced' : ' was found', "."));
              obj = new bindElement({
                event: args.name,
                container: me,
                target: "#".concat(me.ids[me.ids.length - 1]),
                // me.lastId
                handler: args.arg
              });
              break;
            } else {
              me.logger.warn("component ids list is empty. cannot create event '".concat(args.name, "'."));
            }
          }

          if (tags.indexOf(args.name) >= 0) {
            if (args.directive == '^') {
              me.logger.secondary("".concat(args.name, " forced to be evaluated as an attribute."));

              try {
                obj = new BaseAttribute({
                  attributeName: args.name,
                  attributeValue: args.arg,
                  container: me
                });
              } catch (e) {
                me.logger.fail("attribute creation failed!");
                me.logger.danger(e);
              }
            } else {
              me.logger.secondary("".concat(args.name, " evaluated as a tag."));

              try {
                obj = new BaseTag(_objectSpread({
                  tagName: args.name
                }, props));
              } catch (e) {
                me.logger.fail("tag creation failed!");
                me.logger.danger(e);
              }
            }

            break;
          }

          if (args.directive == '$') {
            me.logger.secondary("".concat(args.name, " forced to be evaluated as a tag."));

            try {
              obj = new BaseTag(_objectSpread({
                tagName: args.name
              }, props));
            } catch (e) {
              me.logger.fail("tag creation failed!");
              me.logger.danger(e);
            }
          } else {
            me.logger.secondary("".concat(args.name, " evaluated as an attribute."));

            try {
              obj = new BaseAttribute({
                attributeName: args.name,
                attributeValue: args.arg,
                container: me
              });
            } catch (e) {
              me.logger.fail("attribute creation failed!");
              me.logger.danger(e);
            }
          }
        } while (false);

        if (!util.isSomeObject(obj) && util.isSomeString(dynamicRender)) {
          me.logger.secondary("using DynamicComponent to invoke ".concat(args.name, " ..."));
          obj = _create("new DynamicComponent(props)", props);

          if (util.isSomeObject(obj)) {
            eval("obj.render = ".concat(dynamicRender));
          } else {
            me.logger.fail("creating DynamicComponent failed!");
          }
        }

        if (util.isSomeObject(obj) && !util.isSomeObject(obj.props)) {
          obj.props = {};
        }

        _render(obj);
      }

      function _evaluateExpression(index, callExpression) {
        var _result = '';
        var _value = expressions[index];

        if (util.isFunction(_value)) {
          if (callExpression) {
            if (util.isArray(arr)) {
              _result = [];
              arr.forEach(function (a, i) {
                var row = '';

                try {
                  row = _value(a, i, me);
                } catch (e) {
                  me.logger.fail("calling interpolation expression ".concat(index, " function for array item ").concat(i, " failed."));
                  me.logger.danger(e);
                }

                if (row) {
                  _result.push(row);
                }
              });
              arr = null;
              _result = _result.join('');
            } else {
              for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                args[_key2 - 2] = arguments[_key2];
              }

              var _args = [me].concat(args);

              try {
                _result = _value.apply(null, _args);
              } catch (e) {
                me.logger.fail("calling interpolation expression ".concat(index, " function failed."));
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

      var i = 0;

      while (i < literals.length) {
        var literal = literals[i];

        if (i < literals.length - 1) {
          var lastWhitespaceIndex = -1;
          var starIndex = -1;
          var literalBeforeWhitespace = '';
          var literalAfterWhitespace = '';
          var firstCh = '';
          var lastCh = '';
          var name = '';
          var command = '';
          var value = void 0;
          lastWhitespaceIndex = literal ? util.lastIndexOf(literal, [' ', '\t', '\n']) : -1;
          literalBeforeWhitespace = lastWhitespaceIndex >= 0 ? literal.substr(0, lastWhitespaceIndex + 1) : '';
          literalAfterWhitespace = lastWhitespaceIndex >= 0 ? literal.substr(lastWhitespaceIndex + 1) : literal;
          firstCh = literalAfterWhitespace ? literalAfterWhitespace[0] : '';
          lastCh = literalAfterWhitespace ? literalAfterWhitespace[literalAfterWhitespace.length - 1] : '';

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
            command = starIndex >= 0 ? name.substr(starIndex + 1) : '';
          }

          if (lastCh && literal.length > 1) {
            result.push(literal.substr(0, literal.length - 1));
          }

          switch (lastCh) {
            case '!':
              value = _evaluateExpression(i, true);

              if (value) {
                result.push(value);
              }

              break;

            case '#':
              value = _evaluateExpression(i, true);

              if (value == '#' || value == '.') {
                me.logger.secondary("writing current component's id: '".concat(me.id, "'"));
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
                  (function () {
                    var _value = value; // 	we need to postpone reading me.ids[value] because ids[] are set by id${}
                    //	and id${} might be called after #${}

                    result.push(function () {
                      return '#' + (me.ids[_value] || '');
                    });
                  })();
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

              i++; // this is necessary since we have read the next expression ahead of current expression

              break;

            default:
              if (command) {
                result.push(util.left(literal, literal.length - command.length - 1));
                value = _evaluateExpression(i, command[command.length - 1] != '*', command);
                var execResult = void 0;

                try {
                  execResult = this.exec(command, value);
                } catch (e) {
                  me.logger.fail("exec() failed for command ".concat(command, "."));
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

      for (var _i = 0; _i < result.length; _i++) {
        if (util.isFunction(result[_i])) {
          result[_i] = result[_i]();
        }
      }

      if (!me.hasWrapper) {
        me.logger.warn("component ".concat(this.constructor.name, " has no wrapper. default wrapper was added."));
        result.splice(0, 0, "<div id=\"".concat(me.id, "\">"));
        result.push("</div>");
      }

      return result.join('');
    }
  }, {
    key: "preRender",
    value: function preRender() {
      var me = this;
      this.children = [];
      this.ids = [];
    }
  }, {
    key: "render",
    value: function render() {
      return '';
    }
  }, {
    key: "refresh",
    value: function refresh() {
      var me = this;
      me.logger.info("refresh()");
      var count = (0, _jquery["default"])('#' + this.id).length;

      if (count == 1) {
        var isj6tIdProvider = this.idProvider instanceof j6tIdProvider;

        if (isj6tIdProvider) {
          try {
            this.idProvider.setState(this.idProviderState);
          } catch (e) {
            me.logger.fail("idProvider.setState() failed.");
            me.logger.danger(e);
          }
        }

        try {
          this.preRender();
        } catch (e) {
          me.logger.fail("preRender() failed.");
          me.logger.danger(e);
          me.logger.warn("component is an inconsistent state. resolve issue immediately.");
        }

        var html;

        try {
          html = this.render();
        } catch (e) {
          me.logger.fail("refresh() failed.");
          me.logger.danger(e);
        }

        if (isj6tIdProvider) {
          try {
            this.idProvider.restoreState();
          } catch (e) {
            me.logger.fail("idProvider.restoreState() failed.");
            me.logger.danger(e);
          }
        }

        (0, _jquery["default"])('#' + this.id).replaceWith(html);
        this.bindEvents();
      } else {
        if (count == 0) {
          me.logger.abort("component with id '".concat(this.id, "' was not found in the DOM. refresh() aborted.'"));
        } else {
          me.logger.abort("more than one component with id '".concat(this.id, "' was found in the DOM. refresh() aborted.'"));
        }
      }
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var me = this;
      this.children.forEach(function (child, i) {
        if (util.isFunction(child.bindEvents)) {
          child.bindEvents();
        }
      });
      this.events.forEach(function (e, i) {
        if ((0, _jquery["default"])(e.target).length) {
          (0, _jquery["default"])(e.target).bind(e.name, e.handler);
        } else {
          me.logger.warn("event target '".concat(e.target, "' does not exist in the DOM. event binding skipped."));
        }
      });
    }
  }]);

  return Component;
}();

exports.Component = Component;
Component.links = [];
/*	structure
{
element: a linkTag instance
applied: bool	whether this link was added to page or not
}
*/

Component.scripts = [];
/*	structure
{
element: an scriptTag instance
applied: bool	whether this script was added to page or not
}
*/

Component.imports = []; // --------------------------- Tags (start) -------------------------

var DynamicComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(DynamicComponent, _Component);

  function DynamicComponent(props) {
    _classCallCheck(this, DynamicComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(DynamicComponent).call(this, props));
  }

  return DynamicComponent;
}(Component);

exports.DynamicComponent = DynamicComponent;

var BaseElement =
/*#__PURE__*/
function () {
  function BaseElement(props) {
    _classCallCheck(this, BaseElement);

    _jquery["default"].extend(this, util.isSomeObject(props) ? props : {});

    if (!(this.logger instanceof _logger.BaseLogger)) {
      if (util.isSomeObject(this.parent) && this.parent.logger instanceof _logger.BaseLogger) {
        this.logger = this.parent.logger;
      } else if (util.isSomeObject(this.container) && this.container.logger instanceof _logger.BaseLogger) {
        this.logger = this.container.logger;
      } else {
        this.logger = new _logger.NullLogger();
      }
    }
  }

  _createClass(BaseElement, [{
    key: "render",
    value: function render() {
      util.NotImplementedException("".concat(this.constructor.name, ".render()"));
    }
  }]);

  return BaseElement;
}();

exports.BaseElement = BaseElement;

var BaseTag =
/*#__PURE__*/
function (_Component2) {
  _inherits(BaseTag, _Component2);

  function BaseTag(props) {
    var _this3;

    _classCallCheck(this, BaseTag);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(BaseTag).call(this, props));
    /* structure:
    {
    tagName: string,
    selfClose: bool
    }
    */

    if (util.isSomeString(props)) {
      _this3.tagName = props;
    }

    _this3.selfClose = util.isBool(_this3.props.selfClose) ? _this3.props.selfClose : false; //this.lastId = this.id; we don't support me.lastId any more because it is problematic
    // instead we add me.id to me.ids

    _this3.ids.push(me.id);

    _this3.lastOwner = _assertThisInitialized(_this3);

    if (!util.isEmpty(_this3.props.arg)) {
      _this3.props.html = _this3.arg;
    }

    _this3.logger.secondary("BaseTag.ctor(): tagName = ".concat(_this3.tagName));

    _this3.logger.debug(_this3.props);

    return _this3;
  }

  _createClass(BaseTag, [{
    key: "isValid",
    value: function isValid() {
      return validation.isValidTag(this.tagName);
    }
  }, {
    key: "getExcludedAttributes",
    value: function getExcludedAttributes() {
      return ['tagname', 'selfclose', 'isroot', 'logger', 'parent', 'arg', 'idprovider', 'haswrapper'];
    }
  }, {
    key: "getAttributes",
    value: function getAttributes() {
      var result = [];
      var excludes = this.getExcludedAttributes();
      var me = this;

      _jquery["default"].each(this.props, function (prop) {
        if (util.isSomeString(prop) && !util.isNumeric(prop)) {
          var _prop = prop.toLowerCase();

          if (validation.isValidAttributeName(prop) && excludes.indexOf(_prop) < 0) {
            result.push(prop);
          }
        }
      });

      me.logger.secondary("getAttributes(): final properties count = ".concat(result.length));
      me.logger.debug(result);
      return result;
    }
  }, {
    key: "preRender",
    value: function preRender() {
      _get(_getPrototypeOf(BaseTag.prototype), "preRender", this).call(this);

      this.ids.push(this.id);
    }
  }, {
    key: "render",
    value: function render() {
      var me = this;

      if (this.isValid()) {
        if (me.selfClose) {
          return me.parse(_templateObject(), me.tagName, me.getAttributes(), function (prop) {
            return me.parse(_templateObject2(), prop, me.props[prop]);
          });
        } else {
          return me.parse(_templateObject3(), me.tagName, me.getAttributes(), function (prop) {
            return me.parse(_templateObject4(), prop, me.props[prop]);
          }, me.validateText(me.props.text), me.validateHtml(me.props.html), me.tagName);
        }
      } else {
        me.logger.abort("tag ".concat(this.constructor.name, " isn't valid. render aborted."));
        return '';
      }
    }
  }]);

  return BaseTag;
}(Component);

exports.BaseTag = BaseTag;

var stylesTag =
/*#__PURE__*/
function (_BaseTag) {
  _inherits(stylesTag, _BaseTag);

  function stylesTag(props) {
    _classCallCheck(this, stylesTag);

    var _props = util.isSomeObject(props) ? props : {};

    _props.tagName = 'style';

    if (util.isArray(props)) {
      _props.html = props.join('\n');
    } else if (typeof props == 'string') {
      _props.html = props;
    } // $$$$$$$$$$$$$$ POTENTIAL XSS $$$$$$$$$$$$$
    // _props.html must be validated to contain valid css style rules and nothing else.
    // $$$$$$$$$$$$$$ POTENTIAL XSS $$$$$$$$$$$$$


    return _possibleConstructorReturn(this, _getPrototypeOf(stylesTag).call(this, _props));
  }

  return stylesTag;
}(BaseTag);

exports.stylesTag = stylesTag;

var linkTag =
/*#__PURE__*/
function (_BaseTag2) {
  _inherits(linkTag, _BaseTag2);

  function linkTag(props) {
    var _this4;

    _classCallCheck(this, linkTag);

    var _props = util.isSomeObject(props) ? props : {};

    _props.tagName = 'link';
    _props.selfClose = true;

    if (util.isSomeString(props)) {
      _props.href = props;
    }

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(linkTag).call(this, _props)); // make sure href, rel, type in this.props are string

    _this4.props.href = util.isSomeString(_this4.props.href) ? _this4.props.href : '';
    _this4.props.rel = util.isSomeString(_this4.props.rel) ? _this4.props.rel : '';
    _this4.props.type = util.isSomeString(_this4.props.type) ? _this4.props.type : '';

    if (util.left(_this4.props.href, 4).toLowerCase() == '.css') {
      if (util.isEmpty(_this4.props.rel)) {
        _this4.props.rel = 'stylesheet';
      }

      if (util.isEmpty(_this4.props.type)) {
        _this4.props.type = 'text/css';
      }
    }

    return _this4;
  }

  return linkTag;
}(BaseTag);

exports.linkTag = linkTag;

var linkElement =
/*#__PURE__*/
function () {
  function linkElement(props) {
    _classCallCheck(this, linkElement);

    if (util.isArray(props)) {
      props.forEach(function (x) {
        var element = new linkTag(x);
        var href = element.props.href.toLowerCase();

        if (util.isSomeString(href)) {
          if (Component.links.find(function (e) {
            return e.element.props.href.toLowerCase() == href;
          }) == undefined) {
            Component.links.push({
              applied: false,
              element: element
            });
          }
        }
      });
    } else {
      var element = new linkTag(props);
      var href = element.props.href.toLowerCase();

      if (util.isSomeString(href)) {
        if (Component.links.find(function (e) {
          return e.element.props.href.toLowerCase() == href;
        }) == undefined) {
          Component.links.push({
            applied: false,
            element: element
          });
        }
      }
    }
  }

  _createClass(linkElement, [{
    key: "render",
    value: function render() {
      return '';
    }
  }]);

  return linkElement;
}();

exports.linkElement = linkElement;

var scriptTag =
/*#__PURE__*/
function (_BaseTag3) {
  _inherits(scriptTag, _BaseTag3);

  function scriptTag(props) {
    var _this5;

    _classCallCheck(this, scriptTag);

    var _props = util.isSomeObject(props) ? props : {};

    _props.tagName = 'script';

    if (util.isSomeString(props)) {
      _props.src = props;
    }

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(scriptTag).call(this, _props)); // make sure src, type in this.props are string

    _this5.props.src = util.isSomeString(_this5.props.src) ? _this5.props.src : '';
    _this5.props.type = util.isSomeString(_this5.props.type) ? _this5.props.type : '';

    if (util.left(_this5.props.src, 3).toLowerCase() == '.js') {
      if (util.isEmpty(_this5.props.type)) {
        _this5.props.type = 'text/javascript';
      }
    } else if (util.left(_this5.props.src, 5).toLowerCase() == '.json') {
      if (util.isEmpty(_this5.props.type)) {
        _this5.props.type = 'application/json';
      }
    }

    return _this5;
  }

  return scriptTag;
}(BaseTag);

exports.scriptTag = scriptTag;

var scriptElement =
/*#__PURE__*/
function () {
  function scriptElement(props) {
    _classCallCheck(this, scriptElement);

    if (util.isArray(props)) {
      props.forEach(function (x) {
        var element = new scriptTag(x);
        var src = element.props.src.toLowerCase();

        if (util.isSomeString(src)) {
          if (Component.scripts.find(function (e) {
            return e.element.props.src.toLowerCase() == src;
          }) == undefined) {
            Component.scripts.push({
              applied: false,
              element: element
            });
          }
        }
      });
    } else {
      var element = new scriptTag(props);
      var src = element.props.toLowerCase();

      if (util.isSomeString(src)) {
        if (Component.scripts.find(function (e) {
          return e.element.props.src.toLowerCase() == src;
        }) == undefined) {
          Component.scripts.push({
            applied: false,
            element: element
          });
        }
      }
    }
  }

  _createClass(scriptElement, [{
    key: "render",
    value: function render() {
      return '';
    }
  }]);

  return scriptElement;
}(); // --------------------------- Tags ( end ) -------------------------
// --------------------------- Attributes (start) -------------------------


exports.scriptElement = scriptElement;

var BaseAttribute =
/*#__PURE__*/
function (_BaseElement) {
  _inherits(BaseAttribute, _BaseElement);

  function BaseAttribute(props) {
    _classCallCheck(this, BaseAttribute);

    var _props = util.isSomeObject(props) ? props : {
      attributeName: '',
      attributeValue: props
    };

    return _possibleConstructorReturn(this, _getPrototypeOf(BaseAttribute).call(this, _props));
  }

  _createClass(BaseAttribute, [{
    key: "validateValue",
    value: function validateValue(value) {
      return !util.isEmpty(value);
    }
  }, {
    key: "encodeValue",
    value: function encodeValue(value) {
      return util.htmlEncodeToString(value);
    }
  }, {
    key: "isValid",
    value: function isValid() {
      return validation.isValidAttributeName(this.attributeName) && (this.validateValue(this.attributeValue) || this.standAlone);
    }
  }, {
    key: "render",
    value: function render() {
      var result = '';

      if (this.isValid()) {
        if (this.standAlone) {
          if (this.attributeValue === true || !util.isEmpty(this.attributeValue) && this.attributeValue != false) {
            result = " ".concat(this.attributeName);
          }
        } else {
          if (!util.isEmpty(this.attributeValue)) {
            result = " ".concat(this.attributeName, "=\"").concat(this.encodeValue(this.attributeValue), "\"");
          }
        }
      }

      return result;
    }
  }]);

  return BaseAttribute;
}(BaseElement);

exports.BaseAttribute = BaseAttribute;

var BooleanAttribute =
/*#__PURE__*/
function (_BaseAttribute) {
  _inherits(BooleanAttribute, _BaseAttribute);

  function BooleanAttribute(props) {
    var _this6;

    _classCallCheck(this, BooleanAttribute);

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(BooleanAttribute).call(this, props));
    _this6.standAlone = true;
    return _this6;
  }

  return BooleanAttribute;
}(BaseAttribute);

exports.BooleanAttribute = BooleanAttribute;

var selectedAttribute =
/*#__PURE__*/
function (_BooleanAttribute) {
  _inherits(selectedAttribute, _BooleanAttribute);

  function selectedAttribute(props) {
    var _this7;

    _classCallCheck(this, selectedAttribute);

    _this7 = _possibleConstructorReturn(this, _getPrototypeOf(selectedAttribute).call(this, props));
    _this7.attributeName = 'selected';
    return _this7;
  }

  return selectedAttribute;
}(BooleanAttribute);

exports.selectedAttribute = selectedAttribute;

var checkedAttribute =
/*#__PURE__*/
function (_BooleanAttribute2) {
  _inherits(checkedAttribute, _BooleanAttribute2);

  function checkedAttribute() {
    var _this8;

    _classCallCheck(this, checkedAttribute);

    _this8 = _possibleConstructorReturn(this, _getPrototypeOf(checkedAttribute).call(this, props));
    _this8.attributeName = 'checked';
    return _this8;
  }

  return checkedAttribute;
}(BooleanAttribute);

exports.checkedAttribute = checkedAttribute;

var disabledAttribute =
/*#__PURE__*/
function (_BooleanAttribute3) {
  _inherits(disabledAttribute, _BooleanAttribute3);

  function disabledAttribute() {
    var _this9;

    _classCallCheck(this, disabledAttribute);

    _this9 = _possibleConstructorReturn(this, _getPrototypeOf(disabledAttribute).call(this, props));
    _this9.attributeName = 'disabled';
    return _this9;
  }

  return disabledAttribute;
}(BooleanAttribute);

exports.disabledAttribute = disabledAttribute;

var asyncAttribute =
/*#__PURE__*/
function (_BooleanAttribute4) {
  _inherits(asyncAttribute, _BooleanAttribute4);

  function asyncAttribute() {
    var _this10;

    _classCallCheck(this, asyncAttribute);

    _this10 = _possibleConstructorReturn(this, _getPrototypeOf(asyncAttribute).call(this, props));
    _this10.attributeName = 'async';
    return _this10;
  }

  return asyncAttribute;
}(BooleanAttribute);

exports.asyncAttribute = asyncAttribute;

var deferAttribute =
/*#__PURE__*/
function (_BooleanAttribute5) {
  _inherits(deferAttribute, _BooleanAttribute5);

  function deferAttribute() {
    var _this11;

    _classCallCheck(this, deferAttribute);

    _this11 = _possibleConstructorReturn(this, _getPrototypeOf(deferAttribute).call(this, props));
    _this11.attributeName = 'defer';
    return _this11;
  }

  return deferAttribute;
}(BooleanAttribute);

exports.deferAttribute = deferAttribute;

var classAttribute =
/*#__PURE__*/
function (_BaseAttribute2) {
  _inherits(classAttribute, _BaseAttribute2);

  function classAttribute(props) {
    var _this12;

    _classCallCheck(this, classAttribute);

    _this12 = _possibleConstructorReturn(this, _getPrototypeOf(classAttribute).call(this, props));

    if (util.isArray(props)) {
      _this12.attributeValue = props.join(' ');
    }

    _this12.attributeName = 'class';
    return _this12;
  }

  return classAttribute;
}(BaseAttribute);

exports.classAttribute = classAttribute;

var idAttribute =
/*#__PURE__*/
function (_BaseAttribute3) {
  _inherits(idAttribute, _BaseAttribute3);

  function idAttribute(props) {
    var _this13;

    _classCallCheck(this, idAttribute);

    _this13 = _possibleConstructorReturn(this, _getPrototypeOf(idAttribute).call(this, props));
    _this13.attributeName = 'id';

    if (util.isEmpty(_this13.attributeValue)) {
      _this13.attributeValue = '';
    }

    if (util.isSomeObject(_this13.container)) {
      var givenId = _this13.attributeValue;
      _this13.attributeValue = _this13.container.idProvider.generate(givenId);

      if (util.isNumeric(givenId)) {
        _this13.container.ids[givenId] = _this13.attributeValue;
      }
    }

    return _this13;
  }

  return idAttribute;
}(BaseAttribute);

exports.idAttribute = idAttribute;

var dirAttribute =
/*#__PURE__*/
function (_BaseAttribute4) {
  _inherits(dirAttribute, _BaseAttribute4);

  function dirAttribute(props) {
    var _this14;

    _classCallCheck(this, dirAttribute);

    _this14 = _possibleConstructorReturn(this, _getPrototypeOf(dirAttribute).call(this, props));
    _this14.attributeName = 'dir';

    if (['rtl', 'ltr'].indexOf(util.toStr(_this14.attributeValue)) < 0) {
      _this14.attributeValue = '';
    }

    return _this14;
  }

  return dirAttribute;
}(BaseAttribute);

exports.dirAttribute = dirAttribute;

var styleAttribute =
/*#__PURE__*/
function (_BaseAttribute5) {
  _inherits(styleAttribute, _BaseAttribute5);

  function styleAttribute(props) {
    var _this15;

    _classCallCheck(this, styleAttribute);

    _this15 = _possibleConstructorReturn(this, _getPrototypeOf(styleAttribute).call(this, props));
    _this15.attributeName = 'style';
    return _this15;
  }

  _createClass(styleAttribute, [{
    key: "populate",
    value: function populate(styles) {
      var _this16 = this;

      var result = [];

      if (util.isArray(styles)) {
        styles.forEach(function (style) {
          if (util.isSomeString(style)) {
            style = style.trim();
            result.push(style[style.length - 1] == ';' ? style.substr(0, style.length - 1) : style);
          } else if (util.isSomeObject(style)) {
            var _styles = _this16.populate(style);

            if (util.isSomeString(_styles)) {
              result.push(_styles);
            }
          }
        });
      } else if (util.isSomeObject(styles)) {
        _jquery["default"].each(styles, function (name, value) {
          var _value = '';

          if (util.isArray(value)) {
            _value = value.join(' ');
          } else if (util.isFunction(value)) {
            _value = value();
          } else {
            _value = util.toStr(value);
          } // $$$$$$$$$$$$$$ POTENTIAL XSS $$$$$$$$$$$$$
          // name and _value must be validated to be valid css name/value
          // $$$$$$$$$$$$$$ POTENTIAL XSS $$$$$$$$$$$$$


          result.push("".concat(cssAttribute(name), ": ").concat(_value));
        });
      } else {
        if (util.isSomeString(styles)) {
          result.push(styles);
        }
      }

      result = result.join('; ').trim();
      return result;
    }
  }, {
    key: "render",
    value: function render() {
      var result = '';

      if (this.isValid()) {
        result = this.populate(this.attributeValue);

        if (!util.isEmpty(result)) {
          // $$$$$$$$$$$$$$ POTENTIAL XSS $$$$$$$$$$$$$
          // result must be validated to contain valid css style rules and nothing else.
          // $$$$$$$$$$$$$$ POTENTIAL XSS $$$$$$$$$$$$$
          // we can't use htmlencode on rsult because css styles may contain
          // characters like >, < which are valid in CSS but will be encoded by htmlencode()
          // and produce faulty css.
          result = " style=\"".concat(result, "\"");
        }
      }

      return result;
    }
  }]);

  return styleAttribute;
}(BaseAttribute);

exports.styleAttribute = styleAttribute;

var bindElement =
/*#__PURE__*/
function (_BaseElement2) {
  _inherits(bindElement, _BaseElement2);

  function bindElement(props) {
    var _this17;

    _classCallCheck(this, bindElement);

    _this17 = _possibleConstructorReturn(this, _getPrototypeOf(bindElement).call(this, props));
    /* structure:
    {
    event: string,				// click, dbclick, ...
    container: Component		// an object who is requesting binding this event
    target: string (css query)	// a css query that targets elements to whom binding should be performed
    handler: Function 			// event handler
    }
    */

    _this17.event = (util.isSomeString(_this17.event) ? _this17.event : '').toLowerCase();

    if (_this17.event.length >= 2 && _this17.event.substr(0, 2) == 'on') {
      _this17.event = _this17.event.substr(2);
    }

    return _this17;
  }

  _createClass(bindElement, [{
    key: "render",
    value: function render() {
      var _this18 = this;

      this.logger.debug("event: '".concat(this.event, "', target: '").concat(this.target, "', container: '").concat(util.isSomeObject(this.container) ? 'ok' : 'error', "'"));

      if (validation.isValidEvent(this.event) && util.isSomeString(this.target) && util.isFunction(this.handler) && util.isSomeObject(this.container) && util.isArray(this.container.events)) {
        var e = this.container.events.find(function (e) {
          return e.name == _this18.event && e.target == _this18.target && e.handler == _this18.handler;
        });

        if (e == undefined) {
          this.container.events.push({
            target: this.container.parseCssSelector(this.target),
            name: this.event,
            handler: this.handler
          });
        } else {
          this.logger.error("the same event and handler already bound for the same element");
        }
      }

      return '';
    }
  }]);

  return bindElement;
}(BaseElement); // --------------------------- Attributes ( end ) -------------------------


exports.bindElement = bindElement;
var _default = j6tRoot;
exports["default"] = _default;

},{"./jquery.js":3,"./logger.js":4,"./tags.js":5,"./util.js":6,"./validation.js":7}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jQuery = window && window.jQuery;

var _default = _jQuery;
exports["default"] = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DomTableLogger = exports.DomJsonLogger = exports.DomLogger = exports.StringLogger = exports.StoreLogger = exports.ConsoleLogger = exports.NullLogger = exports.BaseLogger = exports.logFilter = exports.logType = void 0;

var _jquery = _interopRequireDefault(require("./jquery.js"));

var util = _interopRequireWildcard(require("./util.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var logType = {
  info: 'info',
  //	normal message
  primary: 'primary',
  // important log
  secondary: 'secondary',
  // log of secondary importance
  alert: 'alert',
  // something detected without the user's hands in it.
  cancel: 'cancel',
  // user asked to cancel the operation
  success: 'success',
  // informing that something succeeded
  suggest: 'suggest',
  // give a suggestion to recover or resolve an issue
  abort: 'abort',
  // operation aborted without the user request to cancel it
  // it happened in the midth of the operation due to errors
  trace: 'trace',
  //	log a message with trace line number
  debug: 'debug',
  //	debug message or information, e.g. local variables or parameters
  warning: 'warning',
  //	something detected with user's hands in it
  //	a function called which expected 3 args but received 2 args.
  //		it is not an error though since the function can handle it
  //		and use a default, it's just a warning sign.
  fatal: 'fatal',
  // reporting a high unexpected exception or situation where no further operation can be done
  // like when no window or document object found
  danger: 'danger',
  // reporting exceptions
  fail: 'fail',
  // reporting after exceptions: we wanted to do something but an exception raised
  error: 'error' //	a logical error that code detected.
  //   	e.g. a class expected a callback function to be passed to its constructor
  //		but the given argument is not a function

};
exports.logType = logType;
var logFilter = {
  none: [],
  success: ['success', 'error'],
  // success, error
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
exports.logFilter = logFilter;

var BaseLogger =
/*#__PURE__*/
function () {
  function BaseLogger(props) {
    _classCallCheck(this, BaseLogger);

    _jquery["default"].extend(this, props);

    if (!util.isArray(this.filter)) {
      this.filter = logFilter.none;
    }

    this.setting = util.deepAssign({
      'info': {
        color: 'black',
        bold: false,
        size: null,
        italic: false,
        blink: false
      },
      'primary': {
        color: 'blue',
        bold: false,
        size: null,
        italic: false,
        blink: false
      },
      'secondary': {
        color: 'gray',
        bold: false,
        size: null,
        italic: false,
        blink: false
      },
      'alert': {
        color: 'darkorange',
        bold: false,
        size: null,
        italic: false,
        blink: false
      },
      'cancel': {
        color: 'purple',
        bold: false,
        size: null,
        italic: false,
        blink: false
      },
      'success': {
        color: 'green',
        bold: false,
        size: null,
        italic: false,
        blink: false
      },
      'suggest': {
        color: 'magenta',
        bold: false,
        size: null,
        italic: false,
        blink: false
      },
      'abort': {
        color: 'indigo',
        bold: false,
        size: null,
        italic: false,
        blink: false
      },
      'trace': {
        color: 'darkcyan',
        bold: false,
        size: null,
        italic: false,
        blink: false
      },
      'debug': {
        color: 'navy',
        bold: false,
        size: null,
        italic: false,
        blink: false
      },
      'warning': {
        color: 'brown',
        bold: false,
        size: null,
        italic: false,
        blink: false
      },
      'fatal': {
        color: 'darkred',
        bold: true,
        size: null,
        italic: false,
        blink: false
      },
      'danger': {
        color: 'red',
        bold: false,
        size: null,
        italic: false,
        blink: false
      },
      'fail': {
        color: 'maroon',
        bold: false,
        size: null,
        italic: false,
        blink: false
      },
      'error': {
        color: 'violet',
        bold: false,
        size: null,
        italic: false,
        blink: false
      }
    }, props && props.setting);
  }

  _createClass(BaseLogger, [{
    key: "getStyle",
    value: function getStyle(type) {
      var _setting = this.setting[type];
      var result = [];

      if (_setting) {
        if (_setting.color) {
          result.push("color: ".concat(_setting.color));
        }

        if (_setting.bold) {
          result.push("font-weight: bold");
        }

        if (_setting.italic) {
          result.push("font-style: italic");
        }

        if (_setting.size) {
          result.push("font-size: ".concat(_setting.size));
        }
      }

      return result.join(';');
    }
  }, {
    key: "_logInternal",
    value: function _logInternal(log) {
      util.NotImplementedException("".concat(this.constructor.name, "._logInternal()"));
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.logAs.apply(this, ['info'].concat(args));
    }
  }, {
    key: "logAs",
    value: function logAs(type) {
      var _this = this;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (args.length) {
        if (util.isEmpty(type) || logFilter.all.indexOf(type) < 0) {
          type = logType.info;
        }

        if (this.filter.indexOf(type) >= 0) {
          args.forEach(function (data) {
            _this._logInternal({
              type: type,
              data: data,
              date: new Date()
            });
          });
        }

        if (util.isSomeObject(this.next) && this.next instanceof BaseLogger) {
          var _this$next;

          (_this$next = this.next).logAs.apply(_this$next, [type].concat(args));
        }
      }
    }
  }, {
    key: "info",
    value: function info() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this.logAs.apply(this, ['info'].concat(args));
    }
  }, {
    key: "primary",
    value: function primary() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this.logAs.apply(this, ['primary'].concat(args));
    }
  }, {
    key: "secondary",
    value: function secondary() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      this.logAs.apply(this, ['secondary'].concat(args));
    }
  }, {
    key: "alert",
    value: function alert() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      this.logAs.apply(this, ['alert'].concat(args));
    }
  }, {
    key: "cancel",
    value: function cancel() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      this.logAs.apply(this, ['cancel'].concat(args));
    }
  }, {
    key: "success",
    value: function success() {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      this.logAs.apply(this, ['success'].concat(args));
    }
  }, {
    key: "suggest",
    value: function suggest() {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      this.logAs.apply(this, ['suggest'].concat(args));
    }
  }, {
    key: "abort",
    value: function abort() {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      this.logAs.apply(this, ['abort'].concat(args));
    }
  }, {
    key: "trace",
    value: function trace() {
      for (var _len11 = arguments.length, args = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        args[_key11] = arguments[_key11];
      }

      this.logAs.apply(this, ['trace'].concat(args));
    }
  }, {
    key: "debug",
    value: function debug() {
      for (var _len12 = arguments.length, args = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        args[_key12] = arguments[_key12];
      }

      this.logAs.apply(this, ['debug'].concat(args));
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len13 = arguments.length, args = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
        args[_key13] = arguments[_key13];
      }

      this.logAs.apply(this, ['warning'].concat(args));
    }
  }, {
    key: "fatal",
    value: function fatal() {
      for (var _len14 = arguments.length, args = new Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
        args[_key14] = arguments[_key14];
      }

      this.logAs.apply(this, ['fatal'].concat(args));
    }
  }, {
    key: "danger",
    value: function danger() {
      for (var _len15 = arguments.length, args = new Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
        args[_key15] = arguments[_key15];
      }

      this.logAs.apply(this, ['danger'].concat(args));
    }
  }, {
    key: "fail",
    value: function fail() {
      for (var _len16 = arguments.length, args = new Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
        args[_key16] = arguments[_key16];
      }

      this.logAs.apply(this, ['fail'].concat(args));
    }
  }, {
    key: "error",
    value: function error() {
      for (var _len17 = arguments.length, args = new Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
        args[_key17] = arguments[_key17];
      }

      this.logAs.apply(this, ['error'].concat(args));
    }
  }, {
    key: "isValidLog",
    value: function isValidLog(log) {
      return util.isSomeObject(log) && util.isSomeString(log.type) && util.isDate(log.date);
    }
  }]);

  return BaseLogger;
}();

exports.BaseLogger = BaseLogger;

var NullLogger =
/*#__PURE__*/
function (_BaseLogger) {
  _inherits(NullLogger, _BaseLogger);

  function NullLogger(props) {
    _classCallCheck(this, NullLogger);

    return _possibleConstructorReturn(this, _getPrototypeOf(NullLogger).call(this, props));
  }

  _createClass(NullLogger, [{
    key: "_logInternal",
    value: function _logInternal(log) {}
  }]);

  return NullLogger;
}(BaseLogger);

exports.NullLogger = NullLogger;

var ConsoleLogger =
/*#__PURE__*/
function (_BaseLogger2) {
  _inherits(ConsoleLogger, _BaseLogger2);

  function ConsoleLogger(props) {
    _classCallCheck(this, ConsoleLogger);

    return _possibleConstructorReturn(this, _getPrototypeOf(ConsoleLogger).call(this, props));
  }

  _createClass(ConsoleLogger, [{
    key: "_logInternal",
    value: function _logInternal(log) {
      if (this.isValidLog(log)) {
        var _style = this.getStyle(log.type);

        if (_style) {
          console.log("%c".concat(log.data), _style);
        } else {
          console.log(log.data);
        }
      }
    }
  }]);

  return ConsoleLogger;
}(BaseLogger);

exports.ConsoleLogger = ConsoleLogger;

var StoreLogger =
/*#__PURE__*/
function (_BaseLogger3) {
  _inherits(StoreLogger, _BaseLogger3);

  function StoreLogger(props) {
    var _this2;

    _classCallCheck(this, StoreLogger);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(StoreLogger).call(this, props));

    if (!util.isArray(_this2.store)) {
      _this2.store = [];
    }

    return _this2;
  }

  _createClass(StoreLogger, [{
    key: "_logInternal",
    value: function _logInternal(log) {
      if (this.isValidLog(log)) {
        this.store.push(log);
      }
    }
  }]);

  return StoreLogger;
}(BaseLogger);

exports.StoreLogger = StoreLogger;

var StringLogger =
/*#__PURE__*/
function (_StoreLogger) {
  _inherits(StringLogger, _StoreLogger);

  function StringLogger(props) {
    var _this3;

    _classCallCheck(this, StringLogger);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(StringLogger).call(this, props));

    if (!util.isSomeString(_this3.logFormat)) {
      _this3.logFormat = '%date: %data\n';
    }

    if (!util.isSomeString(_this3.replacer)) {
      _this3.replacer = '\t';
    }

    if (!util.isSomeString(_this3.space)) {
      _this3.space = '   ';
    }

    return _this3;
  }

  _createClass(StringLogger, [{
    key: "format",
    value: function format(log) {
      return this.isValidLog(log) ? this.logFormat.replace(/%date/g, log.date).replace(/%type/g, log.type).replace(/%data/g, JSON.stringify(log.data, this.replacer, this.space)) : '';
    }
  }, {
    key: "stringify",
    value: function stringify() {
      var _this4 = this;

      return this.store.map(function (log) {
        return _this4.format(log);
      }).join('');
    }
  }]);

  return StringLogger;
}(StoreLogger);

exports.StringLogger = StringLogger;

var DomLogger =
/*#__PURE__*/
function (_BaseLogger4) {
  _inherits(DomLogger, _BaseLogger4);

  function DomLogger(props) {
    var _this5;

    _classCallCheck(this, DomLogger);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(DomLogger).call(this, props));

    if (!util.isSomeString(_this5.target)) {
      _this5.target = '#logs';
    }

    if (!util.isSomeString(_this5.lineBreak)) {
      _this5.lineBreak = '<br/>\n';
    }

    if (!util.isSomeString(_this5.replacer)) {
      _this5.replacer = '\t';
    }

    if (!util.isSomeString(_this5.space)) {
      _this5.space = '   ';
    }

    if (!_jquery["default"].isFunction(_this5.onLog)) {
      _this5.onLog = function () {};
    }

    _this5._target = (0, _jquery["default"])(_this5.target);
    return _this5;
  }

  _createClass(DomLogger, [{
    key: "_logInternal",
    value: function _logInternal(log) {
      if (this.isValidLog(log)) {
        this.onLog(log);
      }
    }
  }]);

  return DomLogger;
}(BaseLogger);

exports.DomLogger = DomLogger;

var DomJsonLogger =
/*#__PURE__*/
function (_DomLogger) {
  _inherits(DomJsonLogger, _DomLogger);

  function DomJsonLogger(props) {
    _classCallCheck(this, DomJsonLogger);

    return _possibleConstructorReturn(this, _getPrototypeOf(DomJsonLogger).call(this, props));
  }

  _createClass(DomJsonLogger, [{
    key: "onLog",
    value: function onLog(log) {
      if (this._target && this._target.length) {
        try {
          this._target.append(JSON.stringify(log, this.replacer, this.space));
        } catch (e) {
          this._target.append(JSON.stringify('error serializing log', this.replacer, this.space));
        }
      }
    }
  }]);

  return DomJsonLogger;
}(DomLogger);

exports.DomJsonLogger = DomJsonLogger;

var DomTableLogger =
/*#__PURE__*/
function (_DomLogger2) {
  _inherits(DomTableLogger, _DomLogger2);

  function DomTableLogger(props) {
    var _this6;

    _classCallCheck(this, DomTableLogger);

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(DomTableLogger).call(this, props));

    if (_this6._target && _this6._target.find('thead').length == 0) {
      _this6._target.append("\n\t\t\t\t<thead>\n\t\t\t\t\t<th>Date</th>\n\t\t\t\t\t<th>Type</th>\n\t\t\t\t\t<th>Data</th>\n\t\t\t\t</thead>\n\t\t\t");
    }

    if (_this6._target && _this6._target.find('tbody').length == 0) {
      _this6._target.append("<tbody></thead>");
    }

    return _this6;
  }

  _createClass(DomTableLogger, [{
    key: "onLog",
    value: function onLog(log) {
      var data = '';

      try {
        if (typeof log.data == 'string' || typeof log.data == 'number') {
          data = log.data;
        } else {
          data = util.htmlEncodeToString(JSON.stringify(log.data, this.replacer, this.space));
        }
      } catch (e) {
        data = 'error serializing data';
      }

      if (this._target && this._target.length) {
        this._target.find('tbody').append("\n\t\t\t\t<tr>\n\t\t\t\t\t<td>".concat(log.date.toLocaleString(), "</td>\n\t\t\t\t\t<td>").concat(log.type, "</td>\n\t\t\t\t\t<td>").concat(data, "</td>\n\t\t\t\t</tr>\n\t\t\t"));
      }
    }
  }]);

  return DomTableLogger;
}(DomLogger);

exports.DomTableLogger = DomTableLogger;

},{"./jquery.js":3,"./util.js":6}],5:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var util = _interopRequireWildcard(require("./util.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function tagHelper(literals, expressions, fnLiteral, fnExpression) {
  var result = [];

  for (var i = 0; i < literals.length; i++) {
    result.push(fnLiteral(literals[i]));

    if (i < literals.length - 1) {
      result.push(fnExpression(expressions[i]));
    }
  }

  return result.join('');
}

function lower(literals) {
  for (var _len = arguments.length, expressions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    expressions[_key - 1] = arguments[_key];
  }

  return tagHelper(literals, expressions, function (x) {
    return x;
  }, function (x) {
    return util.lower(x);
  });
}

function upper(literals) {
  for (var _len2 = arguments.length, expressions = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    expressions[_key2 - 1] = arguments[_key2];
  }

  return tagHelper(literals, expressions, function (x) {
    return x;
  }, function (x) {
    return util.upper(x);
  });
}

function urlEncode(literals) {
  for (var _len3 = arguments.length, expressions = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    expressions[_key3 - 1] = arguments[_key3];
  }

  return tagHelper(literals, expressions, function (x) {
    return util.urlEncodeToString(typeof x == 'string' ? x.trim() : x);
  }, function (x) {
    return util.urlEncodeToString(x);
  });
}

function urlDecode(literals) {
  for (var _len4 = arguments.length, expressions = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    expressions[_key4 - 1] = arguments[_key4];
  }

  return tagHelper(literals, expressions, function (x) {
    return util.urlDecodeToString(x);
  }, function (x) {
    return util.urlDecodeToString(x);
  });
}

function reverse(literals) {
  for (var _len5 = arguments.length, expressions = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    expressions[_key5 - 1] = arguments[_key5];
  }

  return tagHelper(literals, expressions, function (x) {
    return x;
  }, function (x) {
    return util.reverse(x);
  });
}

function htmlEncode(literals) {
  for (var _len6 = arguments.length, expressions = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
    expressions[_key6 - 1] = arguments[_key6];
  }

  return tagHelper(literals, expressions, function (x) {
    return x;
  }, function (x) {
    return util.htmlEncodeToString(x);
  });
}

function htmlDecode(literals) {
  for (var _len7 = arguments.length, expressions = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
    expressions[_key7 - 1] = arguments[_key7];
  }

  return tagHelper(literals, expressions, function (x) {
    return x;
  }, function (x) {
    return util.htmlDecodeToString(x);
  });
}

var _default = {
  tagHelper: tagHelper,
  lower: lower,
  upper: upper,
  urlEncode: urlEncode,
  urlDecode: urlDecode,
  reverse: reverse,
  htmlEncode: htmlEncode,
  htmlDecode: htmlDecode
};
exports["default"] = _default;

},{"./util.js":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.range = exports.Hex2Bin = exports.Hex2Oct = exports.Hex2Dec = exports.Oct2Bin = exports.Oct2Hex = exports.Oct2Dec = exports.Bin2Oct = exports.Bin2Hex = exports.Bin2Dec = exports.Dec2Oct = exports.Dec2Hex = exports.Dec2Bin = exports.htmlDecodeToString = exports.htmlDecode = exports.htmlEncode = exports.htmlEncodeToString = exports._htmlDecode = exports._htmlEncode = exports._html_entity_to_char_map = exports._char_to_html_entity_map = exports.urlDecodeComponent = exports.urlEncodeComponent = exports.urlDecodeToString = exports.urlDecode = exports.urlEncodeToString = exports.urlEncode = exports.capitalize = exports.reverseToString = exports.reverse = exports.upper = exports.lower = exports.trim = exports.apply = exports.unmerge = exports.join = exports.merge = exports.right = exports.left = exports.lastIndexOf = exports.toStr = exports.deepAssign = exports.isClass = exports.isNumeric = exports.isPureFunction = exports.isBool = exports.isDate = exports.isSomeString = exports.isSomeObject = exports.isEmptyObject = exports.isObject = exports.isFunction = exports.isArray = exports.isEmpty = exports.getEls = exports.getEl = exports.NotImplementedException = void 0;

var _jquery = _interopRequireDefault(require("./jquery.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var getEl = function getEl(x) {
  return document && document.querySelector ? document.querySelector(x) : undefined;
};

exports.getEl = getEl;

var getEls = function getEls(x) {
  return document && document.querySelectorAll ? document.querySelectorAll(x) : undefined;
};

exports.getEls = getEls;

var toStr = function toStr(x) {
  return (x || '').toString();
};

exports.toStr = toStr;

var isEmpty = function isEmpty(x) {
  return x == null || typeof x == 'string' && x.trim() == '';
};

exports.isEmpty = isEmpty;
var isArray = Array.isArray;
exports.isArray = isArray;

var isFunction = function isFunction(x) {
  return typeof x == 'function' && typeof x.nodeType !== 'number';
};

exports.isFunction = isFunction;

var isObject = function isObject(x) {
  return _typeof(x) == 'object' && !isArray(x);
};

exports.isObject = isObject;

var isEmptyObject = function isEmptyObject(x) {
  return x != null && isObject(x) && Object.keys(x).length == 0;
};

exports.isEmptyObject = isEmptyObject;

var isSomeObject = function isSomeObject(x) {
  return x != null && isObject(x) && Object.keys(x).length > 0;
};

exports.isSomeObject = isSomeObject;

var isSomeString = function isSomeString(x) {
  return typeof x == 'string' && x.trim() != '';
};

exports.isSomeString = isSomeString;

var isDate = function isDate(x) {
  return x instanceof Date;
};

exports.isDate = isDate;

var lastIndexOf = function lastIndexOf(str, arg) {
  var result = -1;

  if (isSomeString(str)) {
    if (isSomeString(arg)) {
      result = str.lastIndexOf(arg);
    } else if (isArray(arg)) {
      for (var i = str.length - 1; i >= 0; i--) {
        if (arg.indexOf(str[i]) >= 0) {
          result = i;
          break;
        }
      }
    }
  }

  return result;
};

exports.lastIndexOf = lastIndexOf;

var isBool = function isBool(x) {
  return typeof x == 'boolean';
}; // borrowed from jQuery


exports.isBool = isBool;

var isNumeric = function isNumeric(x) {
  var type = _typeof(x);

  return (type === "number" || type === "string") && !isNaN(x - parseFloat(x));
};

exports.isNumeric = isNumeric;

var left = function left(x, n) {
  return isSomeString(x) && isNumeric(n) && n > 0 ? x.substr(0, n) : '';
};

exports.left = left;

var right = function right(x, n) {
  return isSomeString(x) && isNumeric(n) && n > 0 ? x.substr(x.length - n) : '';
};

exports.right = right;

var Dec2Bin = function Dec2Bin(x) {
  return parseInt(toStr(x)).toString(2);
};

exports.Dec2Bin = Dec2Bin;

var Dec2Hex = function Dec2Hex(x) {
  return parseInt(toStr(x)).toString(16);
};

exports.Dec2Hex = Dec2Hex;

var Dec2Oct = function Dec2Oct(x) {
  return parseInt(toStr(x)).toString(8);
};

exports.Dec2Oct = Dec2Oct;

var Bin2Dec = function Bin2Dec(x) {
  return parseInt(toStr(x), 2);
};

exports.Bin2Dec = Bin2Dec;

var Bin2Hex = function Bin2Hex(x) {
  return parseInt(toStr(x), 2).toString(16);
};

exports.Bin2Hex = Bin2Hex;

var Bin2Oct = function Bin2Oct(x) {
  return parseInt(toStr(x), 2).toString(8);
};

exports.Bin2Oct = Bin2Oct;

var Oct2Dec = function Oct2Dec(x) {
  return parseInt(toStr(x), 8);
};

exports.Oct2Dec = Oct2Dec;

var Oct2Hex = function Oct2Hex(x) {
  return parseInt(toStr(x), 8).toString(16);
};

exports.Oct2Hex = Oct2Hex;

var Oct2Bin = function Oct2Bin(x) {
  return parseInt(toStr(x), 8).toString(2);
};

exports.Oct2Bin = Oct2Bin;

var Hex2Dec = function Hex2Dec(x) {
  return parseInt(toStr(x), 16);
};

exports.Hex2Dec = Hex2Dec;

var Hex2Oct = function Hex2Oct(x) {
  return parseInt(toStr(x), 16).toString(8);
};

exports.Hex2Oct = Hex2Oct;

var Hex2Bin = function Hex2Bin(x) {
  return parseInt(toStr(x), 16).toString(2);
};

exports.Hex2Bin = Hex2Bin;

var NotImplementedException = function NotImplementedException(x) {
  if (x) {
    throw "".concat(x || x.name, " is not implemented");
  } else {
    throw 'Not Imlemented Exception';
  }
};
/* warning: the following function may not work correctly in all browsers, situations and scenarios
			because function.caller is deprecated based on ECMAScript standard.
			this function is not used anywhere in j6t.
*/


exports.NotImplementedException = NotImplementedException;

var isPureFunction = function isPureFunction(fn) {
  var result = false;

  if (isFunction(fn)) {
    try {
      var caller = fn.caller;
      result = true;
    } catch (_unused) {}
  }

  return result;
};
/* warning: the following function may not work correctly in all browsers, situations and scenarios
			because it is based on the deprecated isPureFunction().
			this function is not used anywhere in j6t.
*/


exports.isPureFunction = isPureFunction;

var isClass = function isClass(x) {
  return !isPureFunction(x) && x.prototype != undefined;
};

exports.isClass = isClass;

var deepAssign = function deepAssign(target) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  // source: https://stackoverflow.com/questions/38345937/object-assign-vs-extend
  if (!sources.length) {
    return target;
  }

  var source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (var key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          _jquery["default"].extend(target, _defineProperty({}, key, {}));
        }

        deepAssign(target[key], source[key]);
      } else {
        _jquery["default"].extend(target, _defineProperty({}, key, source[key]));
      }
    }
  }

  return deepAssign.apply(void 0, [target].concat(sources));
};

exports.deepAssign = deepAssign;

var merge = function merge(obj, fn, valueSeparator) {
  if (isEmpty(obj)) {
    return '';
  } else if (isArray(obj)) {
    return obj.map(function (item, i) {
      return fn(i, obj[i]);
    }).join(valueSeparator);
  } else if (!isSomeObject(obj)) {
    return toStr(obj);
  } else {
    return Object.keys(obj).map(function (key) {
      return fn(key, obj[key]);
    }).join(valueSeparator);
  }
};

exports.merge = merge;

var join = function join(obj, keySeparator, valueSeparator) {
  return merge(obj, function (key, value) {
    return "".concat(key).concat(keySeparator).concat(value);
  }, valueSeparator);
};

exports.join = join;

var unmerge = function unmerge(str, keySeparator, valueSeparator) {
  var result = {};
  var arr = toStr(str).split(valueSeparator);
  arr.forEach(function (item) {
    var parts = item.split(keySeparator);

    if (parts[0]) {
      result[parts[0]] = parts.length > 0 ? parts[1] : undefined;
    }
  });
  return result;
};

exports.unmerge = unmerge;

var apply = function apply(x, fnProcess, fnFinalize) {
  var result;

  if (!isFunction(fnFinalize)) {
    fnFinalize = function fnFinalize(x) {
      return x;
    };
  }

  if (isEmpty(x)) {
    result = '';
  } else if (isArray(x)) {
    result = x.map(function (item, i) {
      return fnProcess(x, i, item);
    });
  } else if (isSomeObject(x)) {
    Object.keys(x).filter(function (key) {
      return typeof x[key] == 'string';
    }).forEach(function (key) {
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

exports.apply = apply;

var trim = function trim(x) {
  return apply(x, function (o, key, value) {
    var result;

    if (key != null) {
      result = o[key] = toStr(value).trim();
    } else {
      result = o = toStr(value).trim();
    }

    return result;
  });
};

exports.trim = trim;

var lower = function lower(x) {
  return apply(x, function (o, key, value) {
    var result;

    if (key != null) {
      result = o[key] = toStr(value).toLowerCase();
    } else {
      result = o = toStr(value).toLowerCase();
    }

    return result;
  });
};

exports.lower = lower;

var upper = function upper(x) {
  return apply(x, function (o, key, value) {
    var result;

    if (key != null) {
      result = o[key] = toStr(value).toUpperCase();
    } else {
      result = o = toStr(value).toUpperCase();
    }

    return result;
  });
};

exports.upper = upper;

var reverse = function reverse(x) {
  return apply(x, function (o, key, value) {
    var result;

    if (key != null) {
      result = o[key] = toStr(value).split('').reverse().join('');
    } else {
      result = o = toStr(value).split('').reverse().join('');
    }

    return result;
  });
};

exports.reverse = reverse;

var reverseToString = function reverseToString(x) {
  return join(reverse(x), '', '');
};

exports.reverseToString = reverseToString;

var capitalize = function capitalize(x) {
  return apply(x, function (o, key, value) {
    var result;
    var arr = toStr(value).split(' ');

    var _result = arr.map(function (part) {
      var r = '';

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
};

exports.capitalize = capitalize;

var urlEncode = function urlEncode(x) {
  return apply(x, function (o, key, value) {
    var result;

    if (key != null) {
      result = o[typeof key == 'string' ? encodeURI(key) : key] = encodeURI(value);
    } else {
      result = o = encodeURI(value);
    }

    return result;
  });
};

exports.urlEncode = urlEncode;

var urlEncodeToString = function urlEncodeToString(x) {
  var keySeparator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '=';
  var valueSeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ',';
  return join(urlEncode(x), keySeparator, valueSeparator);
};

exports.urlEncodeToString = urlEncodeToString;

var urlDecode = function urlDecode(x) {
  return apply(x, function (o, key, value) {
    var result;

    if (key != null) {
      result = o[typeof key == 'string' ? decodeURI(key) : key] = decodeURI(value);
    } else {
      result = o = decodeURI(value);
    }

    return result;
  });
};

exports.urlDecode = urlDecode;

var urlDecodeToString = function urlDecodeToString(x) {
  var keySeparator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '=';
  var valueSeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ',';
  return join(urlDecode(x), keySeparator, valueSeparator);
};

exports.urlDecodeToString = urlDecodeToString;

var urlEncodeComponent = function urlEncodeComponent(x) {
  return apply(x, function (o, key, value) {
    var result;

    if (key != null) {
      result = o[typeof key == 'string' ? encodeURIComponent(key) : key] = encodeURIComponent(value);
    } else {
      result = o = encodeURIComponent(value);
    }

    return result;
  });
};

exports.urlEncodeComponent = urlEncodeComponent;

var urlDecodeComponent = function urlDecodeComponent(x) {
  return apply(x, function (o, key, value) {
    var result;

    if (key != null) {
      result = o[typeof key == 'string' ? decodeURIComponent(key) : key] = decodeURIComponent(value);
    } else {
      result = o = decodeURIComponent(value);
    }

    return result;
  });
};

exports.urlDecodeComponent = urlDecodeComponent;
var _html_entity = [[38, 'amp'], [60, 'lt'], [62, 'gt'], [160, 'nbsp'], [161, 'iexcl'], [162, 'cent'], [163, 'pound'], [164, 'curren'], [165, 'yen'], [166, 'brvbar'], [167, 'sect'], [168, 'uml'], [169, 'copy'], [170, 'ordf'], [171, 'laquo'], [172, 'not'], [173, 'shy'], [174, 'reg'], [175, 'macr'], [176, 'deg'], [177, 'plusmn'], [178, 'sup2'], [179, 'sup3'], [180, 'acute'], [181, 'micro'], [182, 'para'], [184, 'cedil'], [185, 'sup1'], [186, 'ordm'], [187, 'raquo'], [188, 'frac14'], [189, 'frac12'], [190, 'frac34'], [191, 'iquest'], [192, 'agrave'], [193, 'aacute'], [194, 'acirc'], [195, 'atilde'], [196, 'auml'], [197, 'aring'], [198, 'aelig'], [199, 'ccedil'], [200, 'egrave'], [201, 'eacute'], [202, 'ecirc'], [203, 'euml'], [204, 'igrave'], [205, 'iacute'], [206, 'icirc'], [207, 'iuml'], [208, 'eth'], [209, 'ntilde'], [210, 'ograve'], [211, 'oacute'], [212, 'ocirc'], [213, 'otilde'], [214, 'ouml'], [215, 'times'], [216, 'oslash'], [217, 'ugrave'], [218, 'uacute'], [219, 'ucirc'], [220, 'uuml'], [221, 'yacute'], [222, 'thorn'], [223, 'szlig'], [224, 'agrave'], [225, 'aacute'], [226, 'acirc'], [227, 'atilde'], [228, 'auml'], [229, 'aring'], [230, 'aelig'], [231, 'ccedil'], [232, 'egrave'], [233, 'eacute'], [234, 'ecirc'], [235, 'euml'], [236, 'igrave'], [237, 'iacute'], [238, 'icirc'], [239, 'iuml'], [240, 'eth'], [241, 'ntilde'], [242, 'ograve'], [243, 'oacute'], [244, 'ocirc'], [245, 'otilde'], [246, 'ouml'], [247, 'divide'], [248, 'oslash'], [249, 'ugrave'], [250, 'uacute'], [251, 'ucirc'], [252, 'uuml'], [253, 'yacute'], [254, 'thorn'], [255, 'yuml'], [8704, 'forall'], [8706, 'part'], [8707, 'exist'], [8709, 'empty'], [8711, 'nabla'], [8712, 'isin'], [8713, 'notin'], [8715, 'ni'], [8719, 'prod'], [8721, 'sum'], [8722, 'minus'], [8727, 'lowast'], [8730, 'radic'], [8733, 'prop'], [8734, 'infin'], [8736, 'ang'], [8743, 'and'], [8744, 'or'], [8745, 'cap'], [8746, 'cup'], [8747, 'int'], [8756, 'there4'], [8764, 'sim'], [8773, 'cong'], [8776, 'asymp'], [8800, 'ne'], [8801, 'equiv'], [8804, 'le'], [8805, 'ge'], [8834, 'sub'], [8835, 'sup'], [8836, 'nsub'], [8838, 'sube'], [8839, 'supe'], [8853, 'oplus'], [8855, 'otimes'], [8869, 'perp'], [8901, 'sdot'], [913, 'alpha'], [914, 'beta'], [915, 'gamma'], [916, 'delta'], [917, 'epsilon'], [918, 'zeta'], [919, 'eta'], [920, 'theta'], [921, 'iota'], [922, 'kappa'], [923, 'lambda'], [924, 'mu'], [925, 'nu'], [926, 'xi'], [927, 'omicron'], [928, 'pi'], [929, 'rho'], [931, 'sigma'], [932, 'tau'], [933, 'upsilon'], [934, 'phi'], [935, 'chi'], [936, 'psi'], [937, 'omega'], [945, 'alpha'], [946, 'beta'], [947, 'gamma'], [948, 'delta'], [949, 'epsilon'], [950, 'zeta'], [951, 'eta'], [952, 'theta'], [953, 'iota'], [954, 'kappa'], [955, 'lambda'], [956, 'mu'], [957, 'nu'], [958, 'xi'], [959, 'omicron'], [960, 'pi'], [961, 'rho'], [962, 'sigmaf'], [963, 'sigma'], [964, 'tau'], [965, 'upsilon'], [966, 'phi'], [967, 'chi'], [968, 'psi'], [969, 'omega'], [977, 'thetasym'], [978, 'upsih'], [982, 'piv'], [338, 'oelig'], [339, 'oelig'], [352, 'scaron'], [353, 'scaron'], [376, 'yuml'], [402, 'fnof'], [710, 'circ'], [732, 'tilde'], [8194, 'ensp'], [8195, 'emsp'], [8201, 'thinsp'], [8204, 'zwnj'], [8205, 'zwj'], [8206, 'lrm'], [8207, 'rlm'], [8211, 'ndash'], [8212, 'mdash'], [8216, 'lsquo'], [8217, 'rsquo'], [8218, 'sbquo'], [8220, 'ldquo'], [8221, 'rdquo'], [8222, 'bdquo'], [8224, 'dagger'], [8225, 'dagger'], [8226, 'bull'], [8230, 'hellip'], [8240, 'permil'], [8242, 'prime'], [8243, 'prime'], [8249, 'lsaquo'], [8250, 'rsaquo'], [8254, 'oline'], [8364, 'euro'], [8482, 'trade'], [8592, 'larr'], [8593, 'uarr'], [8594, 'rarr'], [8595, 'darr'], [8596, 'harr'], [8629, 'crarr'], [8968, 'lceil'], [8969, 'rceil'], [8970, 'lfloor'], [8971, 'rfloor'], [9674, 'loz'], [9824, 'spades'], [9827, 'clubs'], [9829, 'hearts'], [9830, 'diams']];
var _char_to_html_entity_map = {};
/*
for (let i = 32; i < 160; i++) {
	if (i != 38 && i != 60 && i != 62) {
		_char_to_html_entity_map[String.fromCharCode(i)] = `&#${i};`
	}
}
*/

exports._char_to_html_entity_map = _char_to_html_entity_map;

for (var i = 0; i < _html_entity.length; i++) {
  var item = _html_entity[i];
  _char_to_html_entity_map[String.fromCharCode(item[0])] = "&".concat(item[1], ";");
}

var _html_entity_to_char_map = {};
exports._html_entity_to_char_map = _html_entity_to_char_map;

for (var _i = 0; _i < _html_entity.length; _i++) {
  var _item = _html_entity[_i];
  _html_entity_to_char_map[_item[1]] = String.fromCharCode(_item[0]);
}

var _htmlEncode = function _htmlEncode(x) {
  var result = [];
  var s = toStr(x);

  for (var _i2 = 0; _i2 < s.length; _i2++) {
    var ch = _char_to_html_entity_map[s[_i2]];
    result.push(ch ? ch : s[_i2]);
  }

  return result.join('');
};

exports._htmlEncode = _htmlEncode;

var _htmlDecode = function _htmlDecode(x) {
  return toStr(x).replace(/&#?\w+;/g, function (he) {
    var result = '';
    var isNum = false;
    var code = '';

    for (var _i3 = 1; _i3 < he.length - 1; _i3++) {
      if (he[_i3] == '#') {
        isNum = true;
        continue;
      }

      code += he[_i3];
    }

    if (!isNum) {
      code = code.toLowerCase();
    }

    if (isNum) {
      result = String.fromCharCode(parseInt(code));
    } else {
      result = _html_entity_to_char_map[code];

      if (!result) {
        result = "&#".concat(code, ";");
      }
    }

    return result;
  });
};

exports._htmlDecode = _htmlDecode;

var htmlEncode = function htmlEncode(x) {
  return apply(x, function (o, key, value) {
    var result;

    if (key != null) {
      result = o[key] = _htmlEncode(value);
    } else {
      result = o = _htmlEncode(value);
    }

    return result;
  });
};

exports.htmlEncode = htmlEncode;

var htmlEncodeToString = function htmlEncodeToString(x) {
  return join(htmlEncode(x), '', '');
};

exports.htmlEncodeToString = htmlEncodeToString;

var htmlDecode = function htmlDecode(x) {
  return apply(x, function (o, key, value) {
    var result;

    if (key != null) {
      result = o[key] = _htmlDecode(value);
    } else {
      result = o = _htmlDecode(value);
    }

    return result;
  });
};

exports.htmlDecode = htmlDecode;

var htmlDecodeToString = function htmlDecodeToString(x) {
  return join(htmlDecode(x), '', '');
};

exports.htmlDecodeToString = htmlDecodeToString;

var range = function range(from, to) {
  var result = [];

  for (var _i4 = from; _i4 < to; _i4++) {
    result.push(_i4);
  }

  return result;
};

exports.range = range;

},{"./jquery.js":3}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidId = exports.isValidDomId = exports.isValidEvent = exports.isValudURI = exports.isValidAttributeName = exports.isValidTag = void 0;

var _util = require("./util.js");

var isValidTag = function isValidTag(tag) {
  return (0, _util.isSomeString)(tag) && /^[a-zA-Z][a-zA-Z0-9-_]*$/.test(tag);
};

exports.isValidTag = isValidTag;

var isValidAttributeName = function isValidAttributeName(attr) {
  return (0, _util.isSomeString)(attr) && /^[a-zA-Z][a-zA-Z0-9-_]*$/.test(attr);
};

exports.isValidAttributeName = isValidAttributeName;

var isValudURI = function isValudURI(uri) {
  return (0, _util.isSomeString)(uri) && /^(http|https):\/\/[a-zA-Z0-9-_\.]$/.test(uri);
};

exports.isValudURI = isValudURI;

var isValidEvent = function isValidEvent(e) {
  return (0, _util.isSomeString)(e) && /^\w+$/.test(e);
};

exports.isValidEvent = isValidEvent;

var isValidDomId = function isValidDomId(e) {
  return (0, _util.isSomeString)(e) && /^\w(\w|-|:|\.)*$/.test(e);
};

exports.isValidDomId = isValidDomId;

var isValidId = function isValidId(e) {
  return (0, _util.isSomeString)(e) && /^[a-zA-Z]\w*$/.test(e);
};

exports.isValidId = isValidId;

},{"./util.js":6}]},{},[1]);
