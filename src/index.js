import j6tRoot, * as elements	from './j6t.js';
import * as util 				from './util.js';
import * as validation 			from './validation.js';
import * as logging				from './logger.js';
import * as tags				from './tags.js';

const j6t = new j6tRoot();

Object.assign(j6t, elements, util, validation, logging, { tags } );

if (window) {
	window.j6t = j6t;
}

export default j6t;