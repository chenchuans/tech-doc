const debounce = (fn, delay) => {
	let timer = null;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(this, args);
		}, delay);
	};
};

const throttle = (fn, delay) => {
	let flag = true;
	return (...args) => {
		if (!flag) return;
		flag = false;
		setTimeout(() => {
			flag = true;
			fn.apply(this, args);
		}, delay);
	};
};

function call(context = window, ...args) {
	const fn = Symbol('fn');
	context[fn] = this;
	const res = context[fn](args);
	delete context[fn];
	return res;
}

function bind(context = window, ...args) {
	const _this = this;
	function F() {
		return _this.apply(this instanceof F ? this : context, args);
	}
	F.prototype = this.prototype;
	return F();
}

function createObject(proto) {
	function F() { };
	F.prototype = proto;
	return new F();
}

function news(fn, args) {
	const instance = Object.create(fn.prototype);
	const res = fn.apply(instance, args);
	return typeof res === 'object' ? res : instance;
}


function deepCopy(object) {
	let target = Array.isArray(object) ? [] : {};
	for (const key in object) {
		if (object.hasOwnProperty(key)) {
			switch (Object.prototype.toString.call(object[key])) {
				case '[object RegExp]':
					target[key] = new RegExp(object[key]);
					break;
				case '[object Date]':
					target[key] = new Date(object[key]);
					break;
				case '[object Object]':
					target[key] = deepCopy(object[key]);
					break;
				case '[object Array]':
					object[key].forEach(item => {
						target[key].push(item);
					});
					break;
				case '[object Function]':
					target[key] = object[key].bind();
					break;
				default:
					target[key] = object[key];
					break;
			}
		}
	}
	return target;
}

class Observer {
	update(value) {
		console.log(333, value)
	}
}
class Subject {
	constructor() {
		this.attack = [];
		this.state = 'eee';
	}
	setState(value) {
		this.state = value;
		this.attack.forEach(o => o.update(value));
	}
	attacks(o) {
		this.attack.push(o);
	}
}

class Event {
	constructor() {
		this.attack = [];
	}
	on(callback) {
		this.attack.push(callback);
	}
	emit(value) {
		this.attack.forEach(fn => fn(value));
	}
}

const xhr = new XMLHttpRequest();
xhr.open(method, url, async);
xhr.send();
xhr.onreadystatechange = function (req, res) {
	if (xhr.readyState === 4) {
		if (xhr.status === 200 || xhr.status === 304) {

		} else {

		}
	}
}

function resolvePromise(promise2, x, resolve, reject) {
	if (promise2 === x) {
		return new TypeError('type error');
	}
	let called;
	if (Object.prototype.toString.call(x) === '[object Function]') {
		try {
			if (typeof x.then === 'function') {
				if (called) return;
				called = true;
				x.then.call(x, y => {
					if (called) return;
					called = true;
					resolvePromise(promise2, y, resolve, reject)
				}, error => {
					if (called) return;
					called = true;
					reject(error);
				});
			} else {
				resolve(x);
			}
		} catch (error) {
			if (called) return;
			called = true;
			reject(error);
		}
	} else {
		resolve(x);
	}
}

class Promise {
	constructor(executor) {
		this.state = 'pending';
		this.value = null;
		this.reason = null;
		this.onResolvedCallbacks = [];
		this.onRejectedCallbacks = [];

		const resolve = value => {
			if (value instanceof Promise) {
				return value.then(resolve, reject);
			}
			if (this.state === 'pending') {
				this.state = 'success';
				this.onResolvedCallbacks.forEach(fn => fn());
				this.value = value;
			}
		}
		const reject = reason => {
			if (this.state === 'pending') {
				this.state = 'fail';
				this.onRejectedCallbacks.forEach(fn => fn());
				this.reason = reason;
			}
		}
		try {
			executor(resolve, reject);
		} catch (error) {
			reject(error);
		}
	}
	then(onResolved, onRejected) {
		onResolved = typeof onResolved === 'function' ? onResolved() : value => value();
		onRejected = typeof onRejected === 'function' ? onRejected() : error => { throw error };
		const promise2 = new Promise((resovle, reject) => {
			if (this.state === 'success') {
				setTimeout(() => {
					try {
						resolvePromise(promise2, onResolved(this.value), resolve, reject);
					} catch (error) {
						reject(error);
					}
				});
			}
			if (this.state === 'fail') {
				setTimeout(() => {
					try {
						resolvePromise(promise2, onRejected(this.reason), resolve, reject);
					} catch (error) {
						reject(error);
					}
				});
			}
			if (this.state === 'pending') {
				this.onResolvedCallbacks.push(() => {
						setTimeout(() => {
							try {
								resolvePromise(promise2, onResolved(this.value), resolve, reject);
							} catch (error) {
								reject(error);
							}
						});
				});
				this.onRejectedCallbacks.push(() => {
						setTimeout(() => {
							try {
								resolvePromise(promise2, onRejected(this.reason), resolve, reject);
							} catch (error) {
								reject(error);
							}
						});
				});
			}
		});
		return promise2;
	}
	catch(errorCallback) {
		return this.then(null, errorCallback);
	}
}

Promise.resovle = function(value) {
	return new Promise((resolve, reject) => {
		resolve(value);
	});
}

Promise.prototype.finally = function(callback) {
	return this.then(data => {
		return Promise.resolve(callback()).then(() => data);
	}, error => {
		return Promise.resolve(callback()).then(() => {throw error});
	});
}


Promise.all = function(values) {
	return new Promise((resolve, reject) => {
		let count = 0;
		let arr = [];
		function processData(key, value) {
			arr[key] = value;
			if (++count === values.length) {
				resolve(arr);
			}
		}
		values.forEach((item, index) => {
			let then = item.then;
			if (typeof then === 'function') {
				then.call(item, y => processData(index, y), error => reject(error));
			} else {
				processData(index, item);
			}
		})
	});
}

Promise.race = function(values) {
	return new Promise((resolve, reject) => {
		values.forEach((item) => {
			if (typeof item.then === 'function') {
				item.then.call(item, y => resolve(y), error => reject(error));
			} else {
				resolve(item);
			}
		})
	});
}

const currying = (fn, arr = []) => {
	let len = arr.length;
	return (...args) => {
		arr = [...arr, ...args];
		if (arr.length > len) {
			return currying(fn, arr);
		} else {
			return fn(...arr);
		}
	}
}

Function.prototype.before = function(callback) {
	return (...args) => {
		this(...args);
		callback();
	}
}

function co(it) {
	return new Promise((resolve, reject) => {
		function next(val) {
			let {value, done} = it.next(val);
			if (done) return resolve(value);
			Promise.resolve(value).then(data => {
				next(data);
			})
		}
		next();
	})
}


function once(fn) {
	let called = false;
	return function() {
		if (!called) {
			called = true;
			fn.apply(this, arguments);
		}
		 
	}
}