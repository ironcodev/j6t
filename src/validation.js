import { isSomeString } from './util.js';

const isValidTag			= (tag) => isSomeString(tag) && /^[a-zA-Z][a-zA-Z0-9-_]*$/.test(tag);
const isValidAttributeName	= (attr) => isSomeString(attr) && /^[a-zA-Z][a-zA-Z0-9-_]*$/.test(attr);
const isValudURI			= (uri) => isSomeString(uri) && /^(http|https):\/\/[a-zA-Z0-9-_\.]$/.test(uri);
const isValidEvent			= (e) => isSomeString(e) && /^\w+$/.test(e);
const isValidDomId			= (e) => isSomeString(e) && /^\w(\w|-|:|\.)*$/.test(e);
const isValidId				= (e) => isSomeString(e) && /^[a-zA-Z]\w*$/.test(e);

export {
	isValidTag,
	isValidAttributeName,
	isValudURI,
	isValidEvent,
	isValidDomId,
	isValidId
}