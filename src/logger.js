import { _jQuery } from './dependencies.js'
import * as util from './util.js'

const logType = {
					info		: 'info'		, 	//	normal message
					primary		: 'primary'		,	// important log
					secondary	: 'secondary'	,	// log of secondary importance
					alert		: 'alert'		,	// something detected without the user's hands in it.
					cancel		: 'cancel'		,	// user asked to cancel the operation
					success		: 'success'		,	// informing that something succeeded
					suggest		: 'suggest'		,	// give a suggestion to recover or resolve an issue
					abort		: 'abort'		,	// operation aborted without the user request to cancel it
													// it happened in the midth of the operation due to errors
					trace		: 'trace'		, 	//	log a message with trace line number
					debug		: 'debug'		, 	//	debug message or information, e.g. local variables or parameters
					warning		: 'warning'		, 	//	something detected with user's hands in it
													//	a function called which expected 3 args but received 2 args.
													//		it is not an error though since the function can handle it
													//		and use a default, it's just a warning sign.
					fatal		: 'fatal'		, 	// reporting a high unexpected exception or situation where no further operation can be done
													// like when no window or document object found
					danger		: 'danger'		,	// reporting exceptions
					fail		: 'fail'		,	// reporting after exceptions: we wanted to do something but an exception raised
					error		: 'error'			//	a logical error that code detected.
													//   	e.g. a class expected a callback function to be passed to its constructor
													//		but the given argument is not a function
				}
const logFilter = {
	none: [],
	success: ['success', 'error'],		// success, error
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
}
class BaseLogger {
	constructor(props) {
		_jQuery.extend(this, props);
		
		if (!util.isArray(this.filter)) {
			this.filter = logFilter.none;
		}
		
		this.setting = util.deepAssign({
				'info'		: { color: 'black'		, bold: false, size: null, italic: false, blink: false },
				'primary'	: { color: 'blue'		, bold: false, size: null, italic: false, blink: false },
				'secondary'	: { color: 'gray'		, bold: false, size: null, italic: false, blink: false },
				'alert'		: { color: 'darkorange'	, bold: false, size: null, italic: false, blink: false },
				'cancel'	: { color: 'purple'		, bold: false, size: null, italic: false, blink: false },
				'success'	: { color: 'green'		, bold: false, size: null, italic: false, blink: false },
				'suggest'	: { color: 'magenta'	, bold: false, size: null, italic: false, blink: false },
				'abort'		: { color: 'indigo'		, bold: false, size: null, italic: false, blink: false },
				'trace'		: { color: 'darkcyan'	, bold: false, size: null, italic: false, blink: false },
				'debug'		: { color: 'navy'		, bold: false, size: null, italic: false, blink: false },
				'warning'	: { color: 'brown'		, bold: false, size: null, italic: false, blink: false },
				'fatal'		: { color: 'darkred'	, bold: true , size: null, italic: false, blink: false },
				'danger'	: { color: 'red'		, bold: false, size: null, italic: false, blink: false },
				'fail'		: { color: 'maroon'		, bold: false, size: null, italic: false, blink: false },
				'error'		: { color: 'violet'		, bold: false, size: null, italic: false, blink: false },
			}, (props && props.setting));
	}
	getStyle(type) {
		let _setting = this.setting[type];
		let result = [];
		
		if (_setting) {
			if (_setting.color) {
				result.push(`color: ${_setting.color}`)
			}
			if (_setting.bold) {
				result.push(`font-weight: bold`)
			}
			if (_setting.italic) {
				result.push(`font-style: italic`)
			}
			if (_setting.size) {
				result.push(`font-size: ${_setting.size}`)
			}
		}
		
		return result.join(';')
	}
	_logInternal(log) {
		util.NotImplementedException(`${this.constructor.name}._logInternal()`)
	}
	log(...args) {
		this.logAs('info', ...args)
	}
	logAs(type, ...args) {
		if (args.length) {
			if (util.isEmpty(type) || logFilter.all.indexOf(type) < 0) {
				type = logType.info;
			}
			
			if (this.filter.indexOf(type) >= 0) {
				args.forEach(data => {
					this._logInternal({ type, data, date: new Date()})
				});
			}
			
			if (util.isSomeObject(this.next) && this.next instanceof BaseLogger) {
				this.next.logAs(type, ...args);
			}
		}
	}
	info(...args) 		{ this.logAs('info', ...args)		}
	primary(...args) 	{ this.logAs('primary', ...args)	}
	secondary(...args) 	{ this.logAs('secondary', ...args)	}
	alert(...args) 		{ this.logAs('alert', ...args)		}
	cancel(...args) 	{ this.logAs('cancel', ...args)		}
	success(...args) 	{ this.logAs('success', ...args)	}
	suggest(...args) 	{ this.logAs('suggest', ...args)	}
	abort(...args) 		{ this.logAs('abort', ...args)		}
	trace(...args) 		{ this.logAs('trace', ...args)		}
	debug(...args) 		{ this.logAs('debug', ...args)		}
	warn(...args)		{ this.logAs('warning', ...args)	}
	fatal(...args) 		{ this.logAs('fatal', ...args)		}
	danger(...args) 	{ this.logAs('danger', ...args)		}
	fail(...args) 		{ this.logAs('fail', ...args)		}
	error(...args) 		{ this.logAs('error', ...args)		}
	isValidLog(log) {
		return util.isSomeObject(log) && util.isSomeString(log.type) && util.isDate(log.date);
	}
}

class NullLogger extends BaseLogger {
	constructor(props) {
		super(props)
	}
	_logInternal(log) { }
}

class ConsoleLogger extends BaseLogger {
	constructor(props) {
		super(props);
	}
	_logInternal(log) {
		if (this.isValidLog(log)) {
			let _style = this.getStyle(log.type);
			
			if (_style) {
				console.log(`%c${log.data}`, _style);
			} else {
				console.log(log.data);
			}
		}
	}
}

class StoreLogger extends BaseLogger {
	constructor(props) {
		super(props);
		
		if (!util.isArray(this.store)) {
			this.store = [];
		}
	}
	_logInternal(log) {
		if (this.isValidLog(log)) {
			this.store.push(log);
		}
	}
}
class StringLogger extends StoreLogger {
	constructor(props) {
		super(props);
		
		if (!util.isSomeString(this.logFormat)) {
			this.logFormat = '%date: %data\n';
		}
		if (!util.isSomeString(this.replacer)) {
			this.replacer = '\t';
		}
		if (!util.isSomeString(this.space)) {
			this.space = '   ';
		}
	}
	format(log) {
		return this.isValidLog(log) ?
			this.logFormat.replace(/%date/g, log.date)
			 			  .replace(/%type/g, log.type)
						  .replace(/%data/g, JSON.stringify(log.data, this.replacer, this.space))
						 : '';
	}
	stringify() {
		return this.store.map(log => this.format(log)).join('');
	}
}
class DomLogger extends BaseLogger {
	constructor(props) {
		super(props);
		
		if (!util.isSomeString(this.target)) {
			this.target =  '#logs';
		}
		
		if (!util.isSomeString(this.lineBreak)) {
			this.lineBreak = '<br/>\n';
		}
		if (!util.isSomeString(this.replacer)) {
			this.replacer = '\t';
		}
		if (!util.isSomeString(this.space)) {
			this.space = '   ';
		}
		if (!_jQuery.isFunction(this.onLog)) {
			this.onLog = () => {};
		}
		
		this._target = _jQuery(this.target);
	}
	_logInternal(log) {
		if (this.isValidLog(log)) {
			this.onLog(log)
		}
	}
}
class DomJsonLogger extends DomLogger {
	constructor(props) {
		super(props);
	}
	onLog(log) {
		if (this._target && this._target.length) {
			try {
				this._target.append(JSON.stringify(log, this.replacer, this.space));
			} catch (e) {
				this._target.append(JSON.stringify('error serializing log', this.replacer, this.space));
			}
		}
	}
}
class DomTableLogger extends DomLogger {
	constructor(props) {
		super(props);
		
		if (this._target && this._target.find('thead').length == 0) {
			this._target.append(`
				<thead>
					<th>Date</th>
					<th>Type</th>
					<th>Data</th>
				</thead>
			`)
		}
		if (this._target && this._target.find('tbody').length == 0) {
			this._target.append(`<tbody></thead>`)
		}
	}
	onLog(log) {
		let data = '';
		try {
			if (typeof log.data == 'string' || typeof log.data == 'number') {
				data = log.data
			} else {
				data = util.htmlEncodeToString(JSON.stringify(log.data, this.replacer, this.space))
			}
		} catch (e) {
			data = 'error serializing data'
		}
		if (this._target && this._target.length) {
			this._target.find('tbody').append(`
				<tr>
					<td>${log.date.toLocaleString()}</td>
					<td>${log.type}</td>
					<td>${data}</td>
				</tr>
			`);
		}
	}
}
export {
	logType,
	logFilter,
	BaseLogger,
	NullLogger,
	ConsoleLogger,
	StoreLogger,
	StringLogger,
	DomLogger,
	DomJsonLogger,
	DomTableLogger
}