#!/usr/bin/env node
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __moduleCache = /* @__PURE__ */ new WeakMap;
var __toCommonJS = (from) => {
  var entry = __moduleCache.get(from), desc;
  if (entry)
    return entry;
  entry = __defProp({}, "__esModule", { value: true });
  if (from && typeof from === "object" || typeof from === "function")
    __getOwnPropNames(from).map((key) => !__hasOwnProp.call(entry, key) && __defProp(entry, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    }));
  __moduleCache.set(from, entry);
  return entry;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// node_modules/commander/lib/error.js
var require_error = __commonJS((exports) => {
  class CommanderError extends Error {
    constructor(exitCode, code, message) {
      super(message);
      Error.captureStackTrace(this, this.constructor);
      this.name = this.constructor.name;
      this.code = code;
      this.exitCode = exitCode;
      this.nestedError = undefined;
    }
  }

  class InvalidArgumentError extends CommanderError {
    constructor(message) {
      super(1, "commander.invalidArgument", message);
      Error.captureStackTrace(this, this.constructor);
      this.name = this.constructor.name;
    }
  }
  exports.CommanderError = CommanderError;
  exports.InvalidArgumentError = InvalidArgumentError;
});

// node_modules/commander/lib/argument.js
var require_argument = __commonJS((exports) => {
  var { InvalidArgumentError } = require_error();

  class Argument {
    constructor(name, description) {
      this.description = description || "";
      this.variadic = false;
      this.parseArg = undefined;
      this.defaultValue = undefined;
      this.defaultValueDescription = undefined;
      this.argChoices = undefined;
      switch (name[0]) {
        case "<":
          this.required = true;
          this._name = name.slice(1, -1);
          break;
        case "[":
          this.required = false;
          this._name = name.slice(1, -1);
          break;
        default:
          this.required = true;
          this._name = name;
          break;
      }
      if (this._name.endsWith("...")) {
        this.variadic = true;
        this._name = this._name.slice(0, -3);
      }
    }
    name() {
      return this._name;
    }
    _collectValue(value, previous) {
      if (previous === this.defaultValue || !Array.isArray(previous)) {
        return [value];
      }
      previous.push(value);
      return previous;
    }
    default(value, description) {
      this.defaultValue = value;
      this.defaultValueDescription = description;
      return this;
    }
    argParser(fn) {
      this.parseArg = fn;
      return this;
    }
    choices(values) {
      this.argChoices = values.slice();
      this.parseArg = (arg, previous) => {
        if (!this.argChoices.includes(arg)) {
          throw new InvalidArgumentError(`Allowed choices are ${this.argChoices.join(", ")}.`);
        }
        if (this.variadic) {
          return this._collectValue(arg, previous);
        }
        return arg;
      };
      return this;
    }
    argRequired() {
      this.required = true;
      return this;
    }
    argOptional() {
      this.required = false;
      return this;
    }
  }
  function humanReadableArgName(arg) {
    const nameOutput = arg.name() + (arg.variadic === true ? "..." : "");
    return arg.required ? "<" + nameOutput + ">" : "[" + nameOutput + "]";
  }
  exports.Argument = Argument;
  exports.humanReadableArgName = humanReadableArgName;
});

// node:events
var exports_events = {};
__export(exports_events, {
  setMaxListeners: () => setMaxListeners2,
  once: () => once2,
  listenerCount: () => listenerCount2,
  init: () => EventEmitter,
  getMaxListeners: () => getMaxListeners2,
  getEventListeners: () => getEventListeners,
  default: () => events_default,
  captureRejectionSymbol: () => captureRejectionSymbol,
  addAbortListener: () => addAbortListener,
  EventEmitter: () => EventEmitter
});
function emitError(emitter, args) {
  var { _events: events } = emitter;
  if (args[0] ??= new Error("Unhandled error."), !events)
    throw args[0];
  var errorMonitor = events[kErrorMonitor];
  if (errorMonitor)
    for (var handler of ArrayPrototypeSlice.call(errorMonitor))
      handler.apply(emitter, args);
  var handlers = events.error;
  if (!handlers)
    throw args[0];
  for (var handler of ArrayPrototypeSlice.call(handlers))
    handler.apply(emitter, args);
  return true;
}
function addCatch(emitter, promise, type, args) {
  promise.then(undefined, function(err) {
    queueMicrotask(() => emitUnhandledRejectionOrErr(emitter, err, type, args));
  });
}
function emitUnhandledRejectionOrErr(emitter, err, type, args) {
  if (typeof emitter[kRejection] === "function")
    emitter[kRejection](err, type, ...args);
  else
    try {
      emitter[kCapture] = false, emitter.emit("error", err);
    } finally {
      emitter[kCapture] = true;
    }
}
function overflowWarning(emitter, type, handlers) {
  handlers.warned = true;
  let warn = new Error(`Possible EventEmitter memory leak detected. ${handlers.length} ${String(type)} listeners added to [${emitter.constructor.name}]. Use emitter.setMaxListeners() to increase limit`);
  warn.name = "MaxListenersExceededWarning", warn.emitter = emitter, warn.type = type, warn.count = handlers.length, console.warn(warn);
}
function onceWrapper(type, listener, ...args) {
  this.removeListener(type, listener), listener.apply(this, args);
}
function once2(emitter, type, options) {
  var signal = options?.signal;
  if (validateAbortSignal(signal, "options.signal"), signal?.aborted)
    throw new AbortError(undefined, { cause: signal?.reason });
  let { resolve, reject, promise } = $newPromiseCapability(Promise), errorListener = (err) => {
    if (emitter.removeListener(type, resolver), signal != null)
      eventTargetAgnosticRemoveListener(signal, "abort", abortListener);
    reject(err);
  }, resolver = (...args) => {
    if (typeof emitter.removeListener === "function")
      emitter.removeListener("error", errorListener);
    if (signal != null)
      eventTargetAgnosticRemoveListener(signal, "abort", abortListener);
    resolve(args);
  };
  if (eventTargetAgnosticAddListener(emitter, type, resolver, { once: true }), type !== "error" && typeof emitter.once === "function")
    emitter.once("error", errorListener);
  function abortListener() {
    eventTargetAgnosticRemoveListener(emitter, type, resolver), eventTargetAgnosticRemoveListener(emitter, "error", errorListener), reject(new AbortError(undefined, { cause: signal?.reason }));
  }
  if (signal != null)
    eventTargetAgnosticAddListener(signal, "abort", abortListener, { once: true });
  return promise;
}
function getEventListeners(emitter, type) {
  return emitter.listeners(type);
}
function setMaxListeners2(n, ...eventTargets) {
  validateNumber(n, "setMaxListeners", 0);
  var length;
  if (eventTargets && (length = eventTargets.length))
    for (let i = 0;i < length; i++)
      eventTargets[i].setMaxListeners(n);
  else
    defaultMaxListeners = n;
}
function listenerCount2(emitter, type) {
  return emitter.listenerCount(type);
}
function eventTargetAgnosticRemoveListener(emitter, name, listener, flags) {
  if (typeof emitter.removeListener === "function")
    emitter.removeListener(name, listener);
  else
    emitter.removeEventListener(name, listener, flags);
}
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === "function")
    if (flags.once)
      emitter.once(name, listener);
    else
      emitter.on(name, listener);
  else
    emitter.addEventListener(name, listener, flags);
}
function ERR_INVALID_ARG_TYPE(name, type, value) {
  let err = new TypeError(`The "${name}" argument must be of type ${type}. Received ${value}`);
  return err.code = "ERR_INVALID_ARG_TYPE", err;
}
function ERR_OUT_OF_RANGE(name, range2, value) {
  let err = new RangeError(`The "${name}" argument is out of range. It must be ${range2}. Received ${value}`);
  return err.code = "ERR_OUT_OF_RANGE", err;
}
function validateAbortSignal(signal, name) {
  if (signal !== undefined && (signal === null || typeof signal !== "object" || !("aborted" in signal)))
    throw ERR_INVALID_ARG_TYPE(name, "AbortSignal", signal);
}
function validateNumber(value, name, min, max) {
  if (typeof value !== "number")
    throw ERR_INVALID_ARG_TYPE(name, "number", value);
  if (min != null && value < min || max != null && value > max || (min != null || max != null) && Number.isNaN(value))
    throw ERR_OUT_OF_RANGE(name, `${min != null ? `>= ${min}` : ""}${min != null && max != null ? " && " : ""}${max != null ? `<= ${max}` : ""}`, value);
}
function checkListener(listener) {
  if (typeof listener !== "function")
    throw new TypeError("The listener must be a function");
}
function validateBoolean(value, name) {
  if (typeof value !== "boolean")
    throw ERR_INVALID_ARG_TYPE(name, "boolean", value);
}
function getMaxListeners2(emitterOrTarget) {
  return emitterOrTarget?._maxListeners ?? defaultMaxListeners;
}
function addAbortListener(signal, listener) {
  if (signal === undefined)
    throw ERR_INVALID_ARG_TYPE("signal", "AbortSignal", signal);
  if (validateAbortSignal(signal, "signal"), typeof listener !== "function")
    throw ERR_INVALID_ARG_TYPE("listener", "function", listener);
  let removeEventListener;
  if (signal.aborted)
    queueMicrotask(() => listener());
  else
    signal.addEventListener("abort", listener, { __proto__: null, once: true }), removeEventListener = () => {
      signal.removeEventListener("abort", listener);
    };
  return { __proto__: null, [Symbol.dispose]() {
    removeEventListener?.();
  } };
}
var SymbolFor, kCapture, kErrorMonitor, kMaxEventTargetListeners, kMaxEventTargetListenersWarned, kRejection, captureRejectionSymbol, ArrayPrototypeSlice, defaultMaxListeners = 10, EventEmitter = function EventEmitter2(opts) {
  if (this._events === undefined || this._events === this.__proto__._events)
    this._events = { __proto__: null }, this._eventsCount = 0;
  if (this._maxListeners ??= undefined, this[kCapture] = opts?.captureRejections ? Boolean(opts?.captureRejections) : EventEmitterPrototype[kCapture])
    this.emit = emitWithRejectionCapture;
}, EventEmitterPrototype, emitWithoutRejectionCapture = function emit(type, ...args) {
  if (type === "error")
    return emitError(this, args);
  var { _events: events } = this;
  if (events === undefined)
    return false;
  var handlers = events[type];
  if (handlers === undefined)
    return false;
  let maybeClonedHandlers = handlers.length > 1 ? handlers.slice() : handlers;
  for (let i = 0, { length } = maybeClonedHandlers;i < length; i++) {
    let handler = maybeClonedHandlers[i];
    switch (args.length) {
      case 0:
        handler.call(this);
        break;
      case 1:
        handler.call(this, args[0]);
        break;
      case 2:
        handler.call(this, args[0], args[1]);
        break;
      case 3:
        handler.call(this, args[0], args[1], args[2]);
        break;
      default:
        handler.apply(this, args);
        break;
    }
  }
  return true;
}, emitWithRejectionCapture = function emit2(type, ...args) {
  if (type === "error")
    return emitError(this, args);
  var { _events: events } = this;
  if (events === undefined)
    return false;
  var handlers = events[type];
  if (handlers === undefined)
    return false;
  let maybeClonedHandlers = handlers.length > 1 ? handlers.slice() : handlers;
  for (let i = 0, { length } = maybeClonedHandlers;i < length; i++) {
    let handler = maybeClonedHandlers[i], result;
    switch (args.length) {
      case 0:
        result = handler.call(this);
        break;
      case 1:
        result = handler.call(this, args[0]);
        break;
      case 2:
        result = handler.call(this, args[0], args[1]);
        break;
      case 3:
        result = handler.call(this, args[0], args[1], args[2]);
        break;
      default:
        result = handler.apply(this, args);
        break;
    }
    if (result !== undefined && typeof result?.then === "function" && result.then === Promise.prototype.then)
      addCatch(this, result, type, args);
  }
  return true;
}, AbortError, events_default;
var init_events = __esm(() => {
  SymbolFor = Symbol.for;
  kCapture = Symbol("kCapture");
  kErrorMonitor = SymbolFor("events.errorMonitor");
  kMaxEventTargetListeners = Symbol("events.maxEventTargetListeners");
  kMaxEventTargetListenersWarned = Symbol("events.maxEventTargetListenersWarned");
  kRejection = SymbolFor("nodejs.rejection");
  captureRejectionSymbol = SymbolFor("nodejs.rejection");
  ArrayPrototypeSlice = Array.prototype.slice;
  EventEmitterPrototype = EventEmitter.prototype = {};
  EventEmitterPrototype._events = undefined;
  EventEmitterPrototype._eventsCount = 0;
  EventEmitterPrototype._maxListeners = undefined;
  EventEmitterPrototype.setMaxListeners = function setMaxListeners(n) {
    return validateNumber(n, "setMaxListeners", 0), this._maxListeners = n, this;
  };
  EventEmitterPrototype.constructor = EventEmitter;
  EventEmitterPrototype.getMaxListeners = function getMaxListeners() {
    return this?._maxListeners ?? defaultMaxListeners;
  };
  EventEmitterPrototype.emit = emitWithoutRejectionCapture;
  EventEmitterPrototype.addListener = function addListener(type, fn) {
    checkListener(fn);
    var events = this._events;
    if (!events)
      events = this._events = { __proto__: null }, this._eventsCount = 0;
    else if (events.newListener)
      this.emit("newListener", type, fn.listener ?? fn);
    var handlers = events[type];
    if (!handlers)
      events[type] = [fn], this._eventsCount++;
    else {
      handlers.push(fn);
      var m = this._maxListeners ?? defaultMaxListeners;
      if (m > 0 && handlers.length > m && !handlers.warned)
        overflowWarning(this, type, handlers);
    }
    return this;
  };
  EventEmitterPrototype.on = EventEmitterPrototype.addListener;
  EventEmitterPrototype.prependListener = function prependListener(type, fn) {
    checkListener(fn);
    var events = this._events;
    if (!events)
      events = this._events = { __proto__: null }, this._eventsCount = 0;
    else if (events.newListener)
      this.emit("newListener", type, fn.listener ?? fn);
    var handlers = events[type];
    if (!handlers)
      events[type] = [fn], this._eventsCount++;
    else {
      handlers.unshift(fn);
      var m = this._maxListeners ?? defaultMaxListeners;
      if (m > 0 && handlers.length > m && !handlers.warned)
        overflowWarning(this, type, handlers);
    }
    return this;
  };
  EventEmitterPrototype.once = function once(type, fn) {
    checkListener(fn);
    let bound = onceWrapper.bind(this, type, fn);
    return bound.listener = fn, this.addListener(type, bound), this;
  };
  EventEmitterPrototype.prependOnceListener = function prependOnceListener(type, fn) {
    checkListener(fn);
    let bound = onceWrapper.bind(this, type, fn);
    return bound.listener = fn, this.prependListener(type, bound), this;
  };
  EventEmitterPrototype.removeListener = function removeListener(type, fn) {
    checkListener(fn);
    var { _events: events } = this;
    if (!events)
      return this;
    var handlers = events[type];
    if (!handlers)
      return this;
    var length = handlers.length;
    let position = -1;
    for (let i = length - 1;i >= 0; i--)
      if (handlers[i] === fn || handlers[i].listener === fn) {
        position = i;
        break;
      }
    if (position < 0)
      return this;
    if (position === 0)
      handlers.shift();
    else
      handlers.splice(position, 1);
    if (handlers.length === 0)
      delete events[type], this._eventsCount--;
    return this;
  };
  EventEmitterPrototype.off = EventEmitterPrototype.removeListener;
  EventEmitterPrototype.removeAllListeners = function removeAllListeners(type) {
    var { _events: events } = this;
    if (type && events) {
      if (events[type])
        delete events[type], this._eventsCount--;
    } else
      this._events = { __proto__: null };
    return this;
  };
  EventEmitterPrototype.listeners = function listeners(type) {
    var { _events: events } = this;
    if (!events)
      return [];
    var handlers = events[type];
    if (!handlers)
      return [];
    return handlers.map((x) => x.listener ?? x);
  };
  EventEmitterPrototype.rawListeners = function rawListeners(type) {
    var { _events } = this;
    if (!_events)
      return [];
    var handlers = _events[type];
    if (!handlers)
      return [];
    return handlers.slice();
  };
  EventEmitterPrototype.listenerCount = function listenerCount(type) {
    var { _events: events } = this;
    if (!events)
      return 0;
    return events[type]?.length ?? 0;
  };
  EventEmitterPrototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
  };
  EventEmitterPrototype[kCapture] = false;
  AbortError = class AbortError extends Error {
    constructor(message = "The operation was aborted", options = undefined) {
      if (options !== undefined && typeof options !== "object")
        throw ERR_INVALID_ARG_TYPE("options", "Object", options);
      super(message, options);
      this.code = "ABORT_ERR", this.name = "AbortError";
    }
  };
  Object.defineProperties(EventEmitter, { captureRejections: { get() {
    return EventEmitterPrototype[kCapture];
  }, set(value) {
    validateBoolean(value, "EventEmitter.captureRejections"), EventEmitterPrototype[kCapture] = value;
  }, enumerable: true }, defaultMaxListeners: { enumerable: true, get: () => {
    return defaultMaxListeners;
  }, set: (arg) => {
    validateNumber(arg, "defaultMaxListeners", 0), defaultMaxListeners = arg;
  } }, kMaxEventTargetListeners: { value: kMaxEventTargetListeners, enumerable: false, configurable: false, writable: false }, kMaxEventTargetListenersWarned: { value: kMaxEventTargetListenersWarned, enumerable: false, configurable: false, writable: false } });
  Object.assign(EventEmitter, { once: once2, getEventListeners, getMaxListeners: getMaxListeners2, setMaxListeners: setMaxListeners2, EventEmitter, usingDomains: false, captureRejectionSymbol, errorMonitor: kErrorMonitor, addAbortListener, init: EventEmitter, listenerCount: listenerCount2 });
  events_default = EventEmitter;
});

// node:path
var exports_path = {};
__export(exports_path, {
  sep: () => sep,
  resolve: () => resolve,
  relative: () => relative,
  posix: () => posix,
  parse: () => parse,
  normalize: () => normalize,
  join: () => join,
  isAbsolute: () => isAbsolute,
  format: () => format,
  extname: () => extname,
  dirname: () => dirname,
  delimiter: () => delimiter,
  default: () => path_default,
  basename: () => basename,
  _makeLong: () => _makeLong
});
function assertPath(path) {
  if (typeof path !== "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(path));
}
function normalizeStringPosix(path, allowAboveRoot) {
  var res = "", lastSegmentLength = 0, lastSlash = -1, dots = 0, code;
  for (var i = 0;i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47)
      break;
    else
      code = 47;
    if (code === 47) {
      if (lastSlash === i - 1 || dots === 1)
        ;
      else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1)
                res = "", lastSegmentLength = 0;
              else
                res = res.slice(0, lastSlashIndex), lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
              lastSlash = i, dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = "", lastSegmentLength = 0, lastSlash = i, dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += "/..";
          else
            res = "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += "/" + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i, dots = 0;
    } else if (code === 46 && dots !== -1)
      ++dots;
    else
      dots = -1;
  }
  return res;
}
function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root, base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
  if (!dir)
    return base;
  if (dir === pathObject.root)
    return dir + base;
  return dir + sep + base;
}
function resolve() {
  var resolvedPath = "", resolvedAbsolute = false, cwd;
  for (var i = arguments.length - 1;i >= -1 && !resolvedAbsolute; i--) {
    var path;
    if (i >= 0)
      path = arguments[i];
    else {
      if (cwd === undefined)
        cwd = process.cwd();
      path = cwd;
    }
    if (assertPath(path), path.length === 0)
      continue;
    resolvedPath = path + "/" + resolvedPath, resolvedAbsolute = path.charCodeAt(0) === 47;
  }
  if (resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute), resolvedAbsolute)
    if (resolvedPath.length > 0)
      return "/" + resolvedPath;
    else
      return "/";
  else if (resolvedPath.length > 0)
    return resolvedPath;
  else
    return ".";
}
function normalize(path) {
  if (assertPath(path), path.length === 0)
    return ".";
  var isAbsolute = path.charCodeAt(0) === 47, trailingSeparator = path.charCodeAt(path.length - 1) === 47;
  if (path = normalizeStringPosix(path, !isAbsolute), path.length === 0 && !isAbsolute)
    path = ".";
  if (path.length > 0 && trailingSeparator)
    path += "/";
  if (isAbsolute)
    return "/" + path;
  return path;
}
function isAbsolute(path) {
  return assertPath(path), path.length > 0 && path.charCodeAt(0) === 47;
}
function join() {
  if (arguments.length === 0)
    return ".";
  var joined;
  for (var i = 0;i < arguments.length; ++i) {
    var arg = arguments[i];
    if (assertPath(arg), arg.length > 0)
      if (joined === undefined)
        joined = arg;
      else
        joined += "/" + arg;
  }
  if (joined === undefined)
    return ".";
  return normalize(joined);
}
function relative(from, to) {
  if (assertPath(from), assertPath(to), from === to)
    return "";
  if (from = resolve(from), to = resolve(to), from === to)
    return "";
  var fromStart = 1;
  for (;fromStart < from.length; ++fromStart)
    if (from.charCodeAt(fromStart) !== 47)
      break;
  var fromEnd = from.length, fromLen = fromEnd - fromStart, toStart = 1;
  for (;toStart < to.length; ++toStart)
    if (to.charCodeAt(toStart) !== 47)
      break;
  var toEnd = to.length, toLen = toEnd - toStart, length = fromLen < toLen ? fromLen : toLen, lastCommonSep = -1, i = 0;
  for (;i <= length; ++i) {
    if (i === length) {
      if (toLen > length) {
        if (to.charCodeAt(toStart + i) === 47)
          return to.slice(toStart + i + 1);
        else if (i === 0)
          return to.slice(toStart + i);
      } else if (fromLen > length) {
        if (from.charCodeAt(fromStart + i) === 47)
          lastCommonSep = i;
        else if (i === 0)
          lastCommonSep = 0;
      }
      break;
    }
    var fromCode = from.charCodeAt(fromStart + i), toCode = to.charCodeAt(toStart + i);
    if (fromCode !== toCode)
      break;
    else if (fromCode === 47)
      lastCommonSep = i;
  }
  var out = "";
  for (i = fromStart + lastCommonSep + 1;i <= fromEnd; ++i)
    if (i === fromEnd || from.charCodeAt(i) === 47)
      if (out.length === 0)
        out += "..";
      else
        out += "/..";
  if (out.length > 0)
    return out + to.slice(toStart + lastCommonSep);
  else {
    if (toStart += lastCommonSep, to.charCodeAt(toStart) === 47)
      ++toStart;
    return to.slice(toStart);
  }
}
function _makeLong(path) {
  return path;
}
function dirname(path) {
  if (assertPath(path), path.length === 0)
    return ".";
  var code = path.charCodeAt(0), hasRoot = code === 47, end = -1, matchedSlash = true;
  for (var i = path.length - 1;i >= 1; --i)
    if (code = path.charCodeAt(i), code === 47) {
      if (!matchedSlash) {
        end = i;
        break;
      }
    } else
      matchedSlash = false;
  if (end === -1)
    return hasRoot ? "/" : ".";
  if (hasRoot && end === 1)
    return "//";
  return path.slice(0, end);
}
function basename(path, ext) {
  if (ext !== undefined && typeof ext !== "string")
    throw new TypeError('"ext" argument must be a string');
  assertPath(path);
  var start = 0, end = -1, matchedSlash = true, i;
  if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
    if (ext.length === path.length && ext === path)
      return "";
    var extIdx = ext.length - 1, firstNonSlashEnd = -1;
    for (i = path.length - 1;i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47) {
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else {
        if (firstNonSlashEnd === -1)
          matchedSlash = false, firstNonSlashEnd = i + 1;
        if (extIdx >= 0)
          if (code === ext.charCodeAt(extIdx)) {
            if (--extIdx === -1)
              end = i;
          } else
            extIdx = -1, end = firstNonSlashEnd;
      }
    }
    if (start === end)
      end = firstNonSlashEnd;
    else if (end === -1)
      end = path.length;
    return path.slice(start, end);
  } else {
    for (i = path.length - 1;i >= 0; --i)
      if (path.charCodeAt(i) === 47) {
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1)
        matchedSlash = false, end = i + 1;
    if (end === -1)
      return "";
    return path.slice(start, end);
  }
}
function extname(path) {
  assertPath(path);
  var startDot = -1, startPart = 0, end = -1, matchedSlash = true, preDotState = 0;
  for (var i = path.length - 1;i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1)
      matchedSlash = false, end = i + 1;
    if (code === 46) {
      if (startDot === -1)
        startDot = i;
      else if (preDotState !== 1)
        preDotState = 1;
    } else if (startDot !== -1)
      preDotState = -1;
  }
  if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)
    return "";
  return path.slice(startDot, end);
}
function format(pathObject) {
  if (pathObject === null || typeof pathObject !== "object")
    throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
  return _format("/", pathObject);
}
function parse(path) {
  assertPath(path);
  var ret = { root: "", dir: "", base: "", ext: "", name: "" };
  if (path.length === 0)
    return ret;
  var code = path.charCodeAt(0), isAbsolute2 = code === 47, start;
  if (isAbsolute2)
    ret.root = "/", start = 1;
  else
    start = 0;
  var startDot = -1, startPart = 0, end = -1, matchedSlash = true, i = path.length - 1, preDotState = 0;
  for (;i >= start; --i) {
    if (code = path.charCodeAt(i), code === 47) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1)
      matchedSlash = false, end = i + 1;
    if (code === 46) {
      if (startDot === -1)
        startDot = i;
      else if (preDotState !== 1)
        preDotState = 1;
    } else if (startDot !== -1)
      preDotState = -1;
  }
  if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    if (end !== -1)
      if (startPart === 0 && isAbsolute2)
        ret.base = ret.name = path.slice(1, end);
      else
        ret.base = ret.name = path.slice(startPart, end);
  } else {
    if (startPart === 0 && isAbsolute2)
      ret.name = path.slice(1, startDot), ret.base = path.slice(1, end);
    else
      ret.name = path.slice(startPart, startDot), ret.base = path.slice(startPart, end);
    ret.ext = path.slice(startDot, end);
  }
  if (startPart > 0)
    ret.dir = path.slice(0, startPart - 1);
  else if (isAbsolute2)
    ret.dir = "/";
  return ret;
}
var sep = "/", delimiter = ":", posix, path_default;
var init_path = __esm(() => {
  posix = ((p) => (p.posix = p, p))({ resolve, normalize, isAbsolute, join, relative, _makeLong, dirname, basename, extname, format, parse, sep, delimiter, win32: null, posix: null });
  path_default = posix;
});

// node:process
var exports_process = {};
__export(exports_process, {
  versions: () => versions,
  version: () => version,
  umask: () => umask,
  title: () => title,
  removeListener: () => removeListener2,
  removeAllListeners: () => removeAllListeners2,
  prependOnceListener: () => prependOnceListener2,
  prependListener: () => prependListener2,
  once: () => once3,
  on: () => on,
  off: () => off,
  nextTick: () => nextTick,
  listeners: () => listeners2,
  env: () => env,
  emit: () => emit3,
  cwd: () => cwd,
  chdir: () => chdir,
  browser: () => browser,
  binding: () => binding,
  argv: () => argv,
  addListener: () => addListener2
});
function cleanUpNextTick() {
  if (!draining || !currentQueue)
    return;
  if (draining = false, currentQueue.length)
    queue = currentQueue.concat(queue);
  else
    queueIndex = -1;
  if (queue.length)
    drainQueue();
}
function drainQueue() {
  if (draining)
    return;
  var timeout = setTimeout(cleanUpNextTick, 0);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue, queue = [];
    while (++queueIndex < len)
      if (currentQueue) {
        var item = currentQueue[queueIndex];
        item.fun.apply(null, item.array);
      }
    queueIndex = -1, len = queue.length;
  }
  currentQueue = null, draining = false, clearTimeout(timeout, 0);
}
function nextTick(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var i = 1;i < arguments.length; i++)
      args[i - 1] = arguments[i];
  if (queue.push({ fun, args }), queue.length === 1 && !draining)
    setTimeout(drainQueue, 0);
}
function noop() {}
var queue, draining = false, currentQueue, queueIndex = -1, title = "browser", browser = true, env, argv, version = "", versions, on, addListener2, once3, off, removeListener2, removeAllListeners2, emit3, prependListener2, prependOnceListener2, listeners2 = function(name) {
  return [];
}, binding = function(name) {
  throw new Error("process.binding is not supported in browser polyfill");
}, cwd = function() {
  return "/";
}, chdir = function(dir) {
  throw new Error("process.chdir is not supported in browser polyfill");
}, umask = function() {
  return 0;
};
var init_process = __esm(() => {
  queue = [];
  env = {};
  argv = [];
  versions = {};
  on = noop;
  addListener2 = noop;
  once3 = noop;
  off = noop;
  removeListener2 = noop;
  removeAllListeners2 = noop;
  emit3 = noop;
  prependListener2 = noop;
  prependOnceListener2 = noop;
});

// node_modules/commander/lib/help.js
var require_help = __commonJS((exports) => {
  var { humanReadableArgName } = require_argument();

  class Help {
    constructor() {
      this.helpWidth = undefined;
      this.minWidthToWrap = 40;
      this.sortSubcommands = false;
      this.sortOptions = false;
      this.showGlobalOptions = false;
    }
    prepareContext(contextOptions) {
      this.helpWidth = this.helpWidth ?? contextOptions.helpWidth ?? 80;
    }
    visibleCommands(cmd) {
      const visibleCommands = cmd.commands.filter((cmd2) => !cmd2._hidden);
      const helpCommand = cmd._getHelpCommand();
      if (helpCommand && !helpCommand._hidden) {
        visibleCommands.push(helpCommand);
      }
      if (this.sortSubcommands) {
        visibleCommands.sort((a, b) => {
          return a.name().localeCompare(b.name());
        });
      }
      return visibleCommands;
    }
    compareOptions(a, b) {
      const getSortKey = (option) => {
        return option.short ? option.short.replace(/^-/, "") : option.long.replace(/^--/, "");
      };
      return getSortKey(a).localeCompare(getSortKey(b));
    }
    visibleOptions(cmd) {
      const visibleOptions = cmd.options.filter((option) => !option.hidden);
      const helpOption = cmd._getHelpOption();
      if (helpOption && !helpOption.hidden) {
        const removeShort = helpOption.short && cmd._findOption(helpOption.short);
        const removeLong = helpOption.long && cmd._findOption(helpOption.long);
        if (!removeShort && !removeLong) {
          visibleOptions.push(helpOption);
        } else if (helpOption.long && !removeLong) {
          visibleOptions.push(cmd.createOption(helpOption.long, helpOption.description));
        } else if (helpOption.short && !removeShort) {
          visibleOptions.push(cmd.createOption(helpOption.short, helpOption.description));
        }
      }
      if (this.sortOptions) {
        visibleOptions.sort(this.compareOptions);
      }
      return visibleOptions;
    }
    visibleGlobalOptions(cmd) {
      if (!this.showGlobalOptions)
        return [];
      const globalOptions = [];
      for (let ancestorCmd = cmd.parent;ancestorCmd; ancestorCmd = ancestorCmd.parent) {
        const visibleOptions = ancestorCmd.options.filter((option) => !option.hidden);
        globalOptions.push(...visibleOptions);
      }
      if (this.sortOptions) {
        globalOptions.sort(this.compareOptions);
      }
      return globalOptions;
    }
    visibleArguments(cmd) {
      if (cmd._argsDescription) {
        cmd.registeredArguments.forEach((argument) => {
          argument.description = argument.description || cmd._argsDescription[argument.name()] || "";
        });
      }
      if (cmd.registeredArguments.find((argument) => argument.description)) {
        return cmd.registeredArguments;
      }
      return [];
    }
    subcommandTerm(cmd) {
      const args = cmd.registeredArguments.map((arg) => humanReadableArgName(arg)).join(" ");
      return cmd._name + (cmd._aliases[0] ? "|" + cmd._aliases[0] : "") + (cmd.options.length ? " [options]" : "") + (args ? " " + args : "");
    }
    optionTerm(option) {
      return option.flags;
    }
    argumentTerm(argument) {
      return argument.name();
    }
    longestSubcommandTermLength(cmd, helper) {
      return helper.visibleCommands(cmd).reduce((max, command) => {
        return Math.max(max, this.displayWidth(helper.styleSubcommandTerm(helper.subcommandTerm(command))));
      }, 0);
    }
    longestOptionTermLength(cmd, helper) {
      return helper.visibleOptions(cmd).reduce((max, option) => {
        return Math.max(max, this.displayWidth(helper.styleOptionTerm(helper.optionTerm(option))));
      }, 0);
    }
    longestGlobalOptionTermLength(cmd, helper) {
      return helper.visibleGlobalOptions(cmd).reduce((max, option) => {
        return Math.max(max, this.displayWidth(helper.styleOptionTerm(helper.optionTerm(option))));
      }, 0);
    }
    longestArgumentTermLength(cmd, helper) {
      return helper.visibleArguments(cmd).reduce((max, argument) => {
        return Math.max(max, this.displayWidth(helper.styleArgumentTerm(helper.argumentTerm(argument))));
      }, 0);
    }
    commandUsage(cmd) {
      let cmdName = cmd._name;
      if (cmd._aliases[0]) {
        cmdName = cmdName + "|" + cmd._aliases[0];
      }
      let ancestorCmdNames = "";
      for (let ancestorCmd = cmd.parent;ancestorCmd; ancestorCmd = ancestorCmd.parent) {
        ancestorCmdNames = ancestorCmd.name() + " " + ancestorCmdNames;
      }
      return ancestorCmdNames + cmdName + " " + cmd.usage();
    }
    commandDescription(cmd) {
      return cmd.description();
    }
    subcommandDescription(cmd) {
      return cmd.summary() || cmd.description();
    }
    optionDescription(option) {
      const extraInfo = [];
      if (option.argChoices) {
        extraInfo.push(`choices: ${option.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`);
      }
      if (option.defaultValue !== undefined) {
        const showDefault = option.required || option.optional || option.isBoolean() && typeof option.defaultValue === "boolean";
        if (showDefault) {
          extraInfo.push(`default: ${option.defaultValueDescription || JSON.stringify(option.defaultValue)}`);
        }
      }
      if (option.presetArg !== undefined && option.optional) {
        extraInfo.push(`preset: ${JSON.stringify(option.presetArg)}`);
      }
      if (option.envVar !== undefined) {
        extraInfo.push(`env: ${option.envVar}`);
      }
      if (extraInfo.length > 0) {
        const extraDescription = `(${extraInfo.join(", ")})`;
        if (option.description) {
          return `${option.description} ${extraDescription}`;
        }
        return extraDescription;
      }
      return option.description;
    }
    argumentDescription(argument) {
      const extraInfo = [];
      if (argument.argChoices) {
        extraInfo.push(`choices: ${argument.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`);
      }
      if (argument.defaultValue !== undefined) {
        extraInfo.push(`default: ${argument.defaultValueDescription || JSON.stringify(argument.defaultValue)}`);
      }
      if (extraInfo.length > 0) {
        const extraDescription = `(${extraInfo.join(", ")})`;
        if (argument.description) {
          return `${argument.description} ${extraDescription}`;
        }
        return extraDescription;
      }
      return argument.description;
    }
    formatItemList(heading, items, helper) {
      if (items.length === 0)
        return [];
      return [helper.styleTitle(heading), ...items, ""];
    }
    groupItems(unsortedItems, visibleItems, getGroup) {
      const result = new Map;
      unsortedItems.forEach((item) => {
        const group = getGroup(item);
        if (!result.has(group))
          result.set(group, []);
      });
      visibleItems.forEach((item) => {
        const group = getGroup(item);
        if (!result.has(group)) {
          result.set(group, []);
        }
        result.get(group).push(item);
      });
      return result;
    }
    formatHelp(cmd, helper) {
      const termWidth = helper.padWidth(cmd, helper);
      const helpWidth = helper.helpWidth ?? 80;
      function callFormatItem(term, description) {
        return helper.formatItem(term, termWidth, description, helper);
      }
      let output = [
        `${helper.styleTitle("Usage:")} ${helper.styleUsage(helper.commandUsage(cmd))}`,
        ""
      ];
      const commandDescription = helper.commandDescription(cmd);
      if (commandDescription.length > 0) {
        output = output.concat([
          helper.boxWrap(helper.styleCommandDescription(commandDescription), helpWidth),
          ""
        ]);
      }
      const argumentList = helper.visibleArguments(cmd).map((argument) => {
        return callFormatItem(helper.styleArgumentTerm(helper.argumentTerm(argument)), helper.styleArgumentDescription(helper.argumentDescription(argument)));
      });
      output = output.concat(this.formatItemList("Arguments:", argumentList, helper));
      const optionGroups = this.groupItems(cmd.options, helper.visibleOptions(cmd), (option) => option.helpGroupHeading ?? "Options:");
      optionGroups.forEach((options, group) => {
        const optionList = options.map((option) => {
          return callFormatItem(helper.styleOptionTerm(helper.optionTerm(option)), helper.styleOptionDescription(helper.optionDescription(option)));
        });
        output = output.concat(this.formatItemList(group, optionList, helper));
      });
      if (helper.showGlobalOptions) {
        const globalOptionList = helper.visibleGlobalOptions(cmd).map((option) => {
          return callFormatItem(helper.styleOptionTerm(helper.optionTerm(option)), helper.styleOptionDescription(helper.optionDescription(option)));
        });
        output = output.concat(this.formatItemList("Global Options:", globalOptionList, helper));
      }
      const commandGroups = this.groupItems(cmd.commands, helper.visibleCommands(cmd), (sub) => sub.helpGroup() || "Commands:");
      commandGroups.forEach((commands, group) => {
        const commandList = commands.map((sub) => {
          return callFormatItem(helper.styleSubcommandTerm(helper.subcommandTerm(sub)), helper.styleSubcommandDescription(helper.subcommandDescription(sub)));
        });
        output = output.concat(this.formatItemList(group, commandList, helper));
      });
      return output.join(`
`);
    }
    displayWidth(str) {
      return stripColor(str).length;
    }
    styleTitle(str) {
      return str;
    }
    styleUsage(str) {
      return str.split(" ").map((word) => {
        if (word === "[options]")
          return this.styleOptionText(word);
        if (word === "[command]")
          return this.styleSubcommandText(word);
        if (word[0] === "[" || word[0] === "<")
          return this.styleArgumentText(word);
        return this.styleCommandText(word);
      }).join(" ");
    }
    styleCommandDescription(str) {
      return this.styleDescriptionText(str);
    }
    styleOptionDescription(str) {
      return this.styleDescriptionText(str);
    }
    styleSubcommandDescription(str) {
      return this.styleDescriptionText(str);
    }
    styleArgumentDescription(str) {
      return this.styleDescriptionText(str);
    }
    styleDescriptionText(str) {
      return str;
    }
    styleOptionTerm(str) {
      return this.styleOptionText(str);
    }
    styleSubcommandTerm(str) {
      return str.split(" ").map((word) => {
        if (word === "[options]")
          return this.styleOptionText(word);
        if (word[0] === "[" || word[0] === "<")
          return this.styleArgumentText(word);
        return this.styleSubcommandText(word);
      }).join(" ");
    }
    styleArgumentTerm(str) {
      return this.styleArgumentText(str);
    }
    styleOptionText(str) {
      return str;
    }
    styleArgumentText(str) {
      return str;
    }
    styleSubcommandText(str) {
      return str;
    }
    styleCommandText(str) {
      return str;
    }
    padWidth(cmd, helper) {
      return Math.max(helper.longestOptionTermLength(cmd, helper), helper.longestGlobalOptionTermLength(cmd, helper), helper.longestSubcommandTermLength(cmd, helper), helper.longestArgumentTermLength(cmd, helper));
    }
    preformatted(str) {
      return /\n[^\S\r\n]/.test(str);
    }
    formatItem(term, termWidth, description, helper) {
      const itemIndent = 2;
      const itemIndentStr = " ".repeat(itemIndent);
      if (!description)
        return itemIndentStr + term;
      const paddedTerm = term.padEnd(termWidth + term.length - helper.displayWidth(term));
      const spacerWidth = 2;
      const helpWidth = this.helpWidth ?? 80;
      const remainingWidth = helpWidth - termWidth - spacerWidth - itemIndent;
      let formattedDescription;
      if (remainingWidth < this.minWidthToWrap || helper.preformatted(description)) {
        formattedDescription = description;
      } else {
        const wrappedDescription = helper.boxWrap(description, remainingWidth);
        formattedDescription = wrappedDescription.replace(/\n/g, `
` + " ".repeat(termWidth + spacerWidth));
      }
      return itemIndentStr + paddedTerm + " ".repeat(spacerWidth) + formattedDescription.replace(/\n/g, `
${itemIndentStr}`);
    }
    boxWrap(str, width) {
      if (width < this.minWidthToWrap)
        return str;
      const rawLines = str.split(/\r\n|\n/);
      const chunkPattern = /[\s]*[^\s]+/g;
      const wrappedLines = [];
      rawLines.forEach((line) => {
        const chunks = line.match(chunkPattern);
        if (chunks === null) {
          wrappedLines.push("");
          return;
        }
        let sumChunks = [chunks.shift()];
        let sumWidth = this.displayWidth(sumChunks[0]);
        chunks.forEach((chunk) => {
          const visibleWidth = this.displayWidth(chunk);
          if (sumWidth + visibleWidth <= width) {
            sumChunks.push(chunk);
            sumWidth += visibleWidth;
            return;
          }
          wrappedLines.push(sumChunks.join(""));
          const nextChunk = chunk.trimStart();
          sumChunks = [nextChunk];
          sumWidth = this.displayWidth(nextChunk);
        });
        wrappedLines.push(sumChunks.join(""));
      });
      return wrappedLines.join(`
`);
    }
  }
  function stripColor(str) {
    const sgrPattern = /\x1b\[\d*(;\d*)*m/g;
    return str.replace(sgrPattern, "");
  }
  exports.Help = Help;
  exports.stripColor = stripColor;
});

// node_modules/commander/lib/option.js
var require_option = __commonJS((exports) => {
  var { InvalidArgumentError } = require_error();

  class Option {
    constructor(flags, description) {
      this.flags = flags;
      this.description = description || "";
      this.required = flags.includes("<");
      this.optional = flags.includes("[");
      this.variadic = /\w\.\.\.[>\]]$/.test(flags);
      this.mandatory = false;
      const optionFlags = splitOptionFlags(flags);
      this.short = optionFlags.shortFlag;
      this.long = optionFlags.longFlag;
      this.negate = false;
      if (this.long) {
        this.negate = this.long.startsWith("--no-");
      }
      this.defaultValue = undefined;
      this.defaultValueDescription = undefined;
      this.presetArg = undefined;
      this.envVar = undefined;
      this.parseArg = undefined;
      this.hidden = false;
      this.argChoices = undefined;
      this.conflictsWith = [];
      this.implied = undefined;
      this.helpGroupHeading = undefined;
    }
    default(value, description) {
      this.defaultValue = value;
      this.defaultValueDescription = description;
      return this;
    }
    preset(arg) {
      this.presetArg = arg;
      return this;
    }
    conflicts(names) {
      this.conflictsWith = this.conflictsWith.concat(names);
      return this;
    }
    implies(impliedOptionValues) {
      let newImplied = impliedOptionValues;
      if (typeof impliedOptionValues === "string") {
        newImplied = { [impliedOptionValues]: true };
      }
      this.implied = Object.assign(this.implied || {}, newImplied);
      return this;
    }
    env(name) {
      this.envVar = name;
      return this;
    }
    argParser(fn) {
      this.parseArg = fn;
      return this;
    }
    makeOptionMandatory(mandatory = true) {
      this.mandatory = !!mandatory;
      return this;
    }
    hideHelp(hide = true) {
      this.hidden = !!hide;
      return this;
    }
    _collectValue(value, previous) {
      if (previous === this.defaultValue || !Array.isArray(previous)) {
        return [value];
      }
      previous.push(value);
      return previous;
    }
    choices(values) {
      this.argChoices = values.slice();
      this.parseArg = (arg, previous) => {
        if (!this.argChoices.includes(arg)) {
          throw new InvalidArgumentError(`Allowed choices are ${this.argChoices.join(", ")}.`);
        }
        if (this.variadic) {
          return this._collectValue(arg, previous);
        }
        return arg;
      };
      return this;
    }
    name() {
      if (this.long) {
        return this.long.replace(/^--/, "");
      }
      return this.short.replace(/^-/, "");
    }
    attributeName() {
      if (this.negate) {
        return camelcase(this.name().replace(/^no-/, ""));
      }
      return camelcase(this.name());
    }
    helpGroup(heading) {
      this.helpGroupHeading = heading;
      return this;
    }
    is(arg) {
      return this.short === arg || this.long === arg;
    }
    isBoolean() {
      return !this.required && !this.optional && !this.negate;
    }
  }

  class DualOptions {
    constructor(options) {
      this.positiveOptions = new Map;
      this.negativeOptions = new Map;
      this.dualOptions = new Set;
      options.forEach((option) => {
        if (option.negate) {
          this.negativeOptions.set(option.attributeName(), option);
        } else {
          this.positiveOptions.set(option.attributeName(), option);
        }
      });
      this.negativeOptions.forEach((value, key) => {
        if (this.positiveOptions.has(key)) {
          this.dualOptions.add(key);
        }
      });
    }
    valueFromOption(value, option) {
      const optionKey = option.attributeName();
      if (!this.dualOptions.has(optionKey))
        return true;
      const preset = this.negativeOptions.get(optionKey).presetArg;
      const negativeValue = preset !== undefined ? preset : false;
      return option.negate === (negativeValue === value);
    }
  }
  function camelcase(str) {
    return str.split("-").reduce((str2, word) => {
      return str2 + word[0].toUpperCase() + word.slice(1);
    });
  }
  function splitOptionFlags(flags) {
    let shortFlag;
    let longFlag;
    const shortFlagExp = /^-[^-]$/;
    const longFlagExp = /^--[^-]/;
    const flagParts = flags.split(/[ |,]+/).concat("guard");
    if (shortFlagExp.test(flagParts[0]))
      shortFlag = flagParts.shift();
    if (longFlagExp.test(flagParts[0]))
      longFlag = flagParts.shift();
    if (!shortFlag && shortFlagExp.test(flagParts[0]))
      shortFlag = flagParts.shift();
    if (!shortFlag && longFlagExp.test(flagParts[0])) {
      shortFlag = longFlag;
      longFlag = flagParts.shift();
    }
    if (flagParts[0].startsWith("-")) {
      const unsupportedFlag = flagParts[0];
      const baseError = `option creation failed due to '${unsupportedFlag}' in option flags '${flags}'`;
      if (/^-[^-][^-]/.test(unsupportedFlag))
        throw new Error(`${baseError}
- a short flag is a single dash and a single character
  - either use a single dash and a single character (for a short flag)
  - or use a double dash for a long option (and can have two, like '--ws, --workspace')`);
      if (shortFlagExp.test(unsupportedFlag))
        throw new Error(`${baseError}
- too many short flags`);
      if (longFlagExp.test(unsupportedFlag))
        throw new Error(`${baseError}
- too many long flags`);
      throw new Error(`${baseError}
- unrecognised flag format`);
    }
    if (shortFlag === undefined && longFlag === undefined)
      throw new Error(`option creation failed due to no flags found in '${flags}'.`);
    return { shortFlag, longFlag };
  }
  exports.Option = Option;
  exports.DualOptions = DualOptions;
});

// node_modules/commander/lib/suggestSimilar.js
var require_suggestSimilar = __commonJS((exports) => {
  var maxDistance = 3;
  function editDistance(a, b) {
    if (Math.abs(a.length - b.length) > maxDistance)
      return Math.max(a.length, b.length);
    const d = [];
    for (let i = 0;i <= a.length; i++) {
      d[i] = [i];
    }
    for (let j = 0;j <= b.length; j++) {
      d[0][j] = j;
    }
    for (let j = 1;j <= b.length; j++) {
      for (let i = 1;i <= a.length; i++) {
        let cost = 1;
        if (a[i - 1] === b[j - 1]) {
          cost = 0;
        } else {
          cost = 1;
        }
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
        }
      }
    }
    return d[a.length][b.length];
  }
  function suggestSimilar(word, candidates) {
    if (!candidates || candidates.length === 0)
      return "";
    candidates = Array.from(new Set(candidates));
    const searchingOptions = word.startsWith("--");
    if (searchingOptions) {
      word = word.slice(2);
      candidates = candidates.map((candidate) => candidate.slice(2));
    }
    let similar = [];
    let bestDistance = maxDistance;
    const minSimilarity = 0.4;
    candidates.forEach((candidate) => {
      if (candidate.length <= 1)
        return;
      const distance = editDistance(word, candidate);
      const length = Math.max(word.length, candidate.length);
      const similarity = (length - distance) / length;
      if (similarity > minSimilarity) {
        if (distance < bestDistance) {
          bestDistance = distance;
          similar = [candidate];
        } else if (distance === bestDistance) {
          similar.push(candidate);
        }
      }
    });
    similar.sort((a, b) => a.localeCompare(b));
    if (searchingOptions) {
      similar = similar.map((candidate) => `--${candidate}`);
    }
    if (similar.length > 1) {
      return `
(Did you mean one of ${similar.join(", ")}?)`;
    }
    if (similar.length === 1) {
      return `
(Did you mean ${similar[0]}?)`;
    }
    return "";
  }
  exports.suggestSimilar = suggestSimilar;
});

// node_modules/commander/lib/command.js
var require_command = __commonJS((exports) => {
  var EventEmitter3 = (init_events(), __toCommonJS(exports_events)).EventEmitter;
  var childProcess = (() => ({}));
  var path = (init_path(), __toCommonJS(exports_path));
  var fs = (() => ({}));
  var process2 = (init_process(), __toCommonJS(exports_process));
  var { Argument, humanReadableArgName } = require_argument();
  var { CommanderError } = require_error();
  var { Help, stripColor } = require_help();
  var { Option, DualOptions } = require_option();
  var { suggestSimilar } = require_suggestSimilar();

  class Command extends EventEmitter3 {
    constructor(name) {
      super();
      this.commands = [];
      this.options = [];
      this.parent = null;
      this._allowUnknownOption = false;
      this._allowExcessArguments = false;
      this.registeredArguments = [];
      this._args = this.registeredArguments;
      this.args = [];
      this.rawArgs = [];
      this.processedArgs = [];
      this._scriptPath = null;
      this._name = name || "";
      this._optionValues = {};
      this._optionValueSources = {};
      this._storeOptionsAsProperties = false;
      this._actionHandler = null;
      this._executableHandler = false;
      this._executableFile = null;
      this._executableDir = null;
      this._defaultCommandName = null;
      this._exitCallback = null;
      this._aliases = [];
      this._combineFlagAndOptionalValue = true;
      this._description = "";
      this._summary = "";
      this._argsDescription = undefined;
      this._enablePositionalOptions = false;
      this._passThroughOptions = false;
      this._lifeCycleHooks = {};
      this._showHelpAfterError = false;
      this._showSuggestionAfterError = true;
      this._savedState = null;
      this._outputConfiguration = {
        writeOut: (str) => process2.stdout.write(str),
        writeErr: (str) => process2.stderr.write(str),
        outputError: (str, write) => write(str),
        getOutHelpWidth: () => process2.stdout.isTTY ? process2.stdout.columns : undefined,
        getErrHelpWidth: () => process2.stderr.isTTY ? process2.stderr.columns : undefined,
        getOutHasColors: () => useColor() ?? (process2.stdout.isTTY && process2.stdout.hasColors?.()),
        getErrHasColors: () => useColor() ?? (process2.stderr.isTTY && process2.stderr.hasColors?.()),
        stripColor: (str) => stripColor(str)
      };
      this._hidden = false;
      this._helpOption = undefined;
      this._addImplicitHelpCommand = undefined;
      this._helpCommand = undefined;
      this._helpConfiguration = {};
      this._helpGroupHeading = undefined;
      this._defaultCommandGroup = undefined;
      this._defaultOptionGroup = undefined;
    }
    copyInheritedSettings(sourceCommand) {
      this._outputConfiguration = sourceCommand._outputConfiguration;
      this._helpOption = sourceCommand._helpOption;
      this._helpCommand = sourceCommand._helpCommand;
      this._helpConfiguration = sourceCommand._helpConfiguration;
      this._exitCallback = sourceCommand._exitCallback;
      this._storeOptionsAsProperties = sourceCommand._storeOptionsAsProperties;
      this._combineFlagAndOptionalValue = sourceCommand._combineFlagAndOptionalValue;
      this._allowExcessArguments = sourceCommand._allowExcessArguments;
      this._enablePositionalOptions = sourceCommand._enablePositionalOptions;
      this._showHelpAfterError = sourceCommand._showHelpAfterError;
      this._showSuggestionAfterError = sourceCommand._showSuggestionAfterError;
      return this;
    }
    _getCommandAndAncestors() {
      const result = [];
      for (let command = this;command; command = command.parent) {
        result.push(command);
      }
      return result;
    }
    command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
      let desc = actionOptsOrExecDesc;
      let opts = execOpts;
      if (typeof desc === "object" && desc !== null) {
        opts = desc;
        desc = null;
      }
      opts = opts || {};
      const [, name, args] = nameAndArgs.match(/([^ ]+) *(.*)/);
      const cmd = this.createCommand(name);
      if (desc) {
        cmd.description(desc);
        cmd._executableHandler = true;
      }
      if (opts.isDefault)
        this._defaultCommandName = cmd._name;
      cmd._hidden = !!(opts.noHelp || opts.hidden);
      cmd._executableFile = opts.executableFile || null;
      if (args)
        cmd.arguments(args);
      this._registerCommand(cmd);
      cmd.parent = this;
      cmd.copyInheritedSettings(this);
      if (desc)
        return this;
      return cmd;
    }
    createCommand(name) {
      return new Command(name);
    }
    createHelp() {
      return Object.assign(new Help, this.configureHelp());
    }
    configureHelp(configuration) {
      if (configuration === undefined)
        return this._helpConfiguration;
      this._helpConfiguration = configuration;
      return this;
    }
    configureOutput(configuration) {
      if (configuration === undefined)
        return this._outputConfiguration;
      this._outputConfiguration = {
        ...this._outputConfiguration,
        ...configuration
      };
      return this;
    }
    showHelpAfterError(displayHelp = true) {
      if (typeof displayHelp !== "string")
        displayHelp = !!displayHelp;
      this._showHelpAfterError = displayHelp;
      return this;
    }
    showSuggestionAfterError(displaySuggestion = true) {
      this._showSuggestionAfterError = !!displaySuggestion;
      return this;
    }
    addCommand(cmd, opts) {
      if (!cmd._name) {
        throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);
      }
      opts = opts || {};
      if (opts.isDefault)
        this._defaultCommandName = cmd._name;
      if (opts.noHelp || opts.hidden)
        cmd._hidden = true;
      this._registerCommand(cmd);
      cmd.parent = this;
      cmd._checkForBrokenPassThrough();
      return this;
    }
    createArgument(name, description) {
      return new Argument(name, description);
    }
    argument(name, description, parseArg, defaultValue) {
      const argument = this.createArgument(name, description);
      if (typeof parseArg === "function") {
        argument.default(defaultValue).argParser(parseArg);
      } else {
        argument.default(parseArg);
      }
      this.addArgument(argument);
      return this;
    }
    arguments(names) {
      names.trim().split(/ +/).forEach((detail) => {
        this.argument(detail);
      });
      return this;
    }
    addArgument(argument) {
      const previousArgument = this.registeredArguments.slice(-1)[0];
      if (previousArgument?.variadic) {
        throw new Error(`only the last argument can be variadic '${previousArgument.name()}'`);
      }
      if (argument.required && argument.defaultValue !== undefined && argument.parseArg === undefined) {
        throw new Error(`a default value for a required argument is never used: '${argument.name()}'`);
      }
      this.registeredArguments.push(argument);
      return this;
    }
    helpCommand(enableOrNameAndArgs, description) {
      if (typeof enableOrNameAndArgs === "boolean") {
        this._addImplicitHelpCommand = enableOrNameAndArgs;
        if (enableOrNameAndArgs && this._defaultCommandGroup) {
          this._initCommandGroup(this._getHelpCommand());
        }
        return this;
      }
      const nameAndArgs = enableOrNameAndArgs ?? "help [command]";
      const [, helpName, helpArgs] = nameAndArgs.match(/([^ ]+) *(.*)/);
      const helpDescription = description ?? "display help for command";
      const helpCommand = this.createCommand(helpName);
      helpCommand.helpOption(false);
      if (helpArgs)
        helpCommand.arguments(helpArgs);
      if (helpDescription)
        helpCommand.description(helpDescription);
      this._addImplicitHelpCommand = true;
      this._helpCommand = helpCommand;
      if (enableOrNameAndArgs || description)
        this._initCommandGroup(helpCommand);
      return this;
    }
    addHelpCommand(helpCommand, deprecatedDescription) {
      if (typeof helpCommand !== "object") {
        this.helpCommand(helpCommand, deprecatedDescription);
        return this;
      }
      this._addImplicitHelpCommand = true;
      this._helpCommand = helpCommand;
      this._initCommandGroup(helpCommand);
      return this;
    }
    _getHelpCommand() {
      const hasImplicitHelpCommand = this._addImplicitHelpCommand ?? (this.commands.length && !this._actionHandler && !this._findCommand("help"));
      if (hasImplicitHelpCommand) {
        if (this._helpCommand === undefined) {
          this.helpCommand(undefined, undefined);
        }
        return this._helpCommand;
      }
      return null;
    }
    hook(event, listener) {
      const allowedValues = ["preSubcommand", "preAction", "postAction"];
      if (!allowedValues.includes(event)) {
        throw new Error(`Unexpected value for event passed to hook : '${event}'.
Expecting one of '${allowedValues.join("', '")}'`);
      }
      if (this._lifeCycleHooks[event]) {
        this._lifeCycleHooks[event].push(listener);
      } else {
        this._lifeCycleHooks[event] = [listener];
      }
      return this;
    }
    exitOverride(fn) {
      if (fn) {
        this._exitCallback = fn;
      } else {
        this._exitCallback = (err) => {
          if (err.code !== "commander.executeSubCommandAsync") {
            throw err;
          } else {}
        };
      }
      return this;
    }
    _exit(exitCode, code, message) {
      if (this._exitCallback) {
        this._exitCallback(new CommanderError(exitCode, code, message));
      }
      process2.exit(exitCode);
    }
    action(fn) {
      const listener = (args) => {
        const expectedArgsCount = this.registeredArguments.length;
        const actionArgs = args.slice(0, expectedArgsCount);
        if (this._storeOptionsAsProperties) {
          actionArgs[expectedArgsCount] = this;
        } else {
          actionArgs[expectedArgsCount] = this.opts();
        }
        actionArgs.push(this);
        return fn.apply(this, actionArgs);
      };
      this._actionHandler = listener;
      return this;
    }
    createOption(flags, description) {
      return new Option(flags, description);
    }
    _callParseArg(target, value, previous, invalidArgumentMessage) {
      try {
        return target.parseArg(value, previous);
      } catch (err) {
        if (err.code === "commander.invalidArgument") {
          const message = `${invalidArgumentMessage} ${err.message}`;
          this.error(message, { exitCode: err.exitCode, code: err.code });
        }
        throw err;
      }
    }
    _registerOption(option) {
      const matchingOption = option.short && this._findOption(option.short) || option.long && this._findOption(option.long);
      if (matchingOption) {
        const matchingFlag = option.long && this._findOption(option.long) ? option.long : option.short;
        throw new Error(`Cannot add option '${option.flags}'${this._name && ` to command '${this._name}'`} due to conflicting flag '${matchingFlag}'
-  already used by option '${matchingOption.flags}'`);
      }
      this._initOptionGroup(option);
      this.options.push(option);
    }
    _registerCommand(command) {
      const knownBy = (cmd) => {
        return [cmd.name()].concat(cmd.aliases());
      };
      const alreadyUsed = knownBy(command).find((name) => this._findCommand(name));
      if (alreadyUsed) {
        const existingCmd = knownBy(this._findCommand(alreadyUsed)).join("|");
        const newCmd = knownBy(command).join("|");
        throw new Error(`cannot add command '${newCmd}' as already have command '${existingCmd}'`);
      }
      this._initCommandGroup(command);
      this.commands.push(command);
    }
    addOption(option) {
      this._registerOption(option);
      const oname = option.name();
      const name = option.attributeName();
      if (option.negate) {
        const positiveLongFlag = option.long.replace(/^--no-/, "--");
        if (!this._findOption(positiveLongFlag)) {
          this.setOptionValueWithSource(name, option.defaultValue === undefined ? true : option.defaultValue, "default");
        }
      } else if (option.defaultValue !== undefined) {
        this.setOptionValueWithSource(name, option.defaultValue, "default");
      }
      const handleOptionValue = (val, invalidValueMessage, valueSource) => {
        if (val == null && option.presetArg !== undefined) {
          val = option.presetArg;
        }
        const oldValue = this.getOptionValue(name);
        if (val !== null && option.parseArg) {
          val = this._callParseArg(option, val, oldValue, invalidValueMessage);
        } else if (val !== null && option.variadic) {
          val = option._collectValue(val, oldValue);
        }
        if (val == null) {
          if (option.negate) {
            val = false;
          } else if (option.isBoolean() || option.optional) {
            val = true;
          } else {
            val = "";
          }
        }
        this.setOptionValueWithSource(name, val, valueSource);
      };
      this.on("option:" + oname, (val) => {
        const invalidValueMessage = `error: option '${option.flags}' argument '${val}' is invalid.`;
        handleOptionValue(val, invalidValueMessage, "cli");
      });
      if (option.envVar) {
        this.on("optionEnv:" + oname, (val) => {
          const invalidValueMessage = `error: option '${option.flags}' value '${val}' from env '${option.envVar}' is invalid.`;
          handleOptionValue(val, invalidValueMessage, "env");
        });
      }
      return this;
    }
    _optionEx(config, flags, description, fn, defaultValue) {
      if (typeof flags === "object" && flags instanceof Option) {
        throw new Error("To add an Option object use addOption() instead of option() or requiredOption()");
      }
      const option = this.createOption(flags, description);
      option.makeOptionMandatory(!!config.mandatory);
      if (typeof fn === "function") {
        option.default(defaultValue).argParser(fn);
      } else if (fn instanceof RegExp) {
        const regex = fn;
        fn = (val, def) => {
          const m = regex.exec(val);
          return m ? m[0] : def;
        };
        option.default(defaultValue).argParser(fn);
      } else {
        option.default(fn);
      }
      return this.addOption(option);
    }
    option(flags, description, parseArg, defaultValue) {
      return this._optionEx({}, flags, description, parseArg, defaultValue);
    }
    requiredOption(flags, description, parseArg, defaultValue) {
      return this._optionEx({ mandatory: true }, flags, description, parseArg, defaultValue);
    }
    combineFlagAndOptionalValue(combine = true) {
      this._combineFlagAndOptionalValue = !!combine;
      return this;
    }
    allowUnknownOption(allowUnknown = true) {
      this._allowUnknownOption = !!allowUnknown;
      return this;
    }
    allowExcessArguments(allowExcess = true) {
      this._allowExcessArguments = !!allowExcess;
      return this;
    }
    enablePositionalOptions(positional = true) {
      this._enablePositionalOptions = !!positional;
      return this;
    }
    passThroughOptions(passThrough = true) {
      this._passThroughOptions = !!passThrough;
      this._checkForBrokenPassThrough();
      return this;
    }
    _checkForBrokenPassThrough() {
      if (this.parent && this._passThroughOptions && !this.parent._enablePositionalOptions) {
        throw new Error(`passThroughOptions cannot be used for '${this._name}' without turning on enablePositionalOptions for parent command(s)`);
      }
    }
    storeOptionsAsProperties(storeAsProperties = true) {
      if (this.options.length) {
        throw new Error("call .storeOptionsAsProperties() before adding options");
      }
      if (Object.keys(this._optionValues).length) {
        throw new Error("call .storeOptionsAsProperties() before setting option values");
      }
      this._storeOptionsAsProperties = !!storeAsProperties;
      return this;
    }
    getOptionValue(key) {
      if (this._storeOptionsAsProperties) {
        return this[key];
      }
      return this._optionValues[key];
    }
    setOptionValue(key, value) {
      return this.setOptionValueWithSource(key, value, undefined);
    }
    setOptionValueWithSource(key, value, source) {
      if (this._storeOptionsAsProperties) {
        this[key] = value;
      } else {
        this._optionValues[key] = value;
      }
      this._optionValueSources[key] = source;
      return this;
    }
    getOptionValueSource(key) {
      return this._optionValueSources[key];
    }
    getOptionValueSourceWithGlobals(key) {
      let source;
      this._getCommandAndAncestors().forEach((cmd) => {
        if (cmd.getOptionValueSource(key) !== undefined) {
          source = cmd.getOptionValueSource(key);
        }
      });
      return source;
    }
    _prepareUserArgs(argv2, parseOptions) {
      if (argv2 !== undefined && !Array.isArray(argv2)) {
        throw new Error("first parameter to parse must be array or undefined");
      }
      parseOptions = parseOptions || {};
      if (argv2 === undefined && parseOptions.from === undefined) {
        if (process2.versions?.electron) {
          parseOptions.from = "electron";
        }
        const execArgv = process2.execArgv ?? [];
        if (execArgv.includes("-e") || execArgv.includes("--eval") || execArgv.includes("-p") || execArgv.includes("--print")) {
          parseOptions.from = "eval";
        }
      }
      if (argv2 === undefined) {
        argv2 = process2.argv;
      }
      this.rawArgs = argv2.slice();
      let userArgs;
      switch (parseOptions.from) {
        case undefined:
        case "node":
          this._scriptPath = argv2[1];
          userArgs = argv2.slice(2);
          break;
        case "electron":
          if (process2.defaultApp) {
            this._scriptPath = argv2[1];
            userArgs = argv2.slice(2);
          } else {
            userArgs = argv2.slice(1);
          }
          break;
        case "user":
          userArgs = argv2.slice(0);
          break;
        case "eval":
          userArgs = argv2.slice(1);
          break;
        default:
          throw new Error(`unexpected parse option { from: '${parseOptions.from}' }`);
      }
      if (!this._name && this._scriptPath)
        this.nameFromFilename(this._scriptPath);
      this._name = this._name || "program";
      return userArgs;
    }
    parse(argv2, parseOptions) {
      this._prepareForParse();
      const userArgs = this._prepareUserArgs(argv2, parseOptions);
      this._parseCommand([], userArgs);
      return this;
    }
    async parseAsync(argv2, parseOptions) {
      this._prepareForParse();
      const userArgs = this._prepareUserArgs(argv2, parseOptions);
      await this._parseCommand([], userArgs);
      return this;
    }
    _prepareForParse() {
      if (this._savedState === null) {
        this.saveStateBeforeParse();
      } else {
        this.restoreStateBeforeParse();
      }
    }
    saveStateBeforeParse() {
      this._savedState = {
        _name: this._name,
        _optionValues: { ...this._optionValues },
        _optionValueSources: { ...this._optionValueSources }
      };
    }
    restoreStateBeforeParse() {
      if (this._storeOptionsAsProperties)
        throw new Error(`Can not call parse again when storeOptionsAsProperties is true.
- either make a new Command for each call to parse, or stop storing options as properties`);
      this._name = this._savedState._name;
      this._scriptPath = null;
      this.rawArgs = [];
      this._optionValues = { ...this._savedState._optionValues };
      this._optionValueSources = { ...this._savedState._optionValueSources };
      this.args = [];
      this.processedArgs = [];
    }
    _checkForMissingExecutable(executableFile, executableDir, subcommandName) {
      if (fs.existsSync(executableFile))
        return;
      const executableDirMessage = executableDir ? `searched for local subcommand relative to directory '${executableDir}'` : "no directory for search for local subcommand, use .executableDir() to supply a custom directory";
      const executableMissing = `'${executableFile}' does not exist
 - if '${subcommandName}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${executableDirMessage}`;
      throw new Error(executableMissing);
    }
    _executeSubCommand(subcommand, args) {
      args = args.slice();
      let launchWithNode = false;
      const sourceExt = [".js", ".ts", ".tsx", ".mjs", ".cjs"];
      function findFile(baseDir, baseName) {
        const localBin = path.resolve(baseDir, baseName);
        if (fs.existsSync(localBin))
          return localBin;
        if (sourceExt.includes(path.extname(baseName)))
          return;
        const foundExt = sourceExt.find((ext) => fs.existsSync(`${localBin}${ext}`));
        if (foundExt)
          return `${localBin}${foundExt}`;
        return;
      }
      this._checkForMissingMandatoryOptions();
      this._checkForConflictingOptions();
      let executableFile = subcommand._executableFile || `${this._name}-${subcommand._name}`;
      let executableDir = this._executableDir || "";
      if (this._scriptPath) {
        let resolvedScriptPath;
        try {
          resolvedScriptPath = fs.realpathSync(this._scriptPath);
        } catch {
          resolvedScriptPath = this._scriptPath;
        }
        executableDir = path.resolve(path.dirname(resolvedScriptPath), executableDir);
      }
      if (executableDir) {
        let localFile = findFile(executableDir, executableFile);
        if (!localFile && !subcommand._executableFile && this._scriptPath) {
          const legacyName = path.basename(this._scriptPath, path.extname(this._scriptPath));
          if (legacyName !== this._name) {
            localFile = findFile(executableDir, `${legacyName}-${subcommand._name}`);
          }
        }
        executableFile = localFile || executableFile;
      }
      launchWithNode = sourceExt.includes(path.extname(executableFile));
      let proc;
      if (process2.platform !== "win32") {
        if (launchWithNode) {
          args.unshift(executableFile);
          args = incrementNodeInspectorPort(process2.execArgv).concat(args);
          proc = childProcess.spawn(process2.argv[0], args, { stdio: "inherit" });
        } else {
          proc = childProcess.spawn(executableFile, args, { stdio: "inherit" });
        }
      } else {
        this._checkForMissingExecutable(executableFile, executableDir, subcommand._name);
        args.unshift(executableFile);
        args = incrementNodeInspectorPort(process2.execArgv).concat(args);
        proc = childProcess.spawn(process2.execPath, args, { stdio: "inherit" });
      }
      if (!proc.killed) {
        const signals = ["SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP"];
        signals.forEach((signal) => {
          process2.on(signal, () => {
            if (proc.killed === false && proc.exitCode === null) {
              proc.kill(signal);
            }
          });
        });
      }
      const exitCallback = this._exitCallback;
      proc.on("close", (code) => {
        code = code ?? 1;
        if (!exitCallback) {
          process2.exit(code);
        } else {
          exitCallback(new CommanderError(code, "commander.executeSubCommandAsync", "(close)"));
        }
      });
      proc.on("error", (err) => {
        if (err.code === "ENOENT") {
          this._checkForMissingExecutable(executableFile, executableDir, subcommand._name);
        } else if (err.code === "EACCES") {
          throw new Error(`'${executableFile}' not executable`);
        }
        if (!exitCallback) {
          process2.exit(1);
        } else {
          const wrappedError = new CommanderError(1, "commander.executeSubCommandAsync", "(error)");
          wrappedError.nestedError = err;
          exitCallback(wrappedError);
        }
      });
      this.runningCommand = proc;
    }
    _dispatchSubcommand(commandName, operands, unknown) {
      const subCommand = this._findCommand(commandName);
      if (!subCommand)
        this.help({ error: true });
      subCommand._prepareForParse();
      let promiseChain;
      promiseChain = this._chainOrCallSubCommandHook(promiseChain, subCommand, "preSubcommand");
      promiseChain = this._chainOrCall(promiseChain, () => {
        if (subCommand._executableHandler) {
          this._executeSubCommand(subCommand, operands.concat(unknown));
        } else {
          return subCommand._parseCommand(operands, unknown);
        }
      });
      return promiseChain;
    }
    _dispatchHelpCommand(subcommandName) {
      if (!subcommandName) {
        this.help();
      }
      const subCommand = this._findCommand(subcommandName);
      if (subCommand && !subCommand._executableHandler) {
        subCommand.help();
      }
      return this._dispatchSubcommand(subcommandName, [], [this._getHelpOption()?.long ?? this._getHelpOption()?.short ?? "--help"]);
    }
    _checkNumberOfArguments() {
      this.registeredArguments.forEach((arg, i) => {
        if (arg.required && this.args[i] == null) {
          this.missingArgument(arg.name());
        }
      });
      if (this.registeredArguments.length > 0 && this.registeredArguments[this.registeredArguments.length - 1].variadic) {
        return;
      }
      if (this.args.length > this.registeredArguments.length) {
        this._excessArguments(this.args);
      }
    }
    _processArguments() {
      const myParseArg = (argument, value, previous) => {
        let parsedValue = value;
        if (value !== null && argument.parseArg) {
          const invalidValueMessage = `error: command-argument value '${value}' is invalid for argument '${argument.name()}'.`;
          parsedValue = this._callParseArg(argument, value, previous, invalidValueMessage);
        }
        return parsedValue;
      };
      this._checkNumberOfArguments();
      const processedArgs = [];
      this.registeredArguments.forEach((declaredArg, index) => {
        let value = declaredArg.defaultValue;
        if (declaredArg.variadic) {
          if (index < this.args.length) {
            value = this.args.slice(index);
            if (declaredArg.parseArg) {
              value = value.reduce((processed, v) => {
                return myParseArg(declaredArg, v, processed);
              }, declaredArg.defaultValue);
            }
          } else if (value === undefined) {
            value = [];
          }
        } else if (index < this.args.length) {
          value = this.args[index];
          if (declaredArg.parseArg) {
            value = myParseArg(declaredArg, value, declaredArg.defaultValue);
          }
        }
        processedArgs[index] = value;
      });
      this.processedArgs = processedArgs;
    }
    _chainOrCall(promise, fn) {
      if (promise?.then && typeof promise.then === "function") {
        return promise.then(() => fn());
      }
      return fn();
    }
    _chainOrCallHooks(promise, event) {
      let result = promise;
      const hooks = [];
      this._getCommandAndAncestors().reverse().filter((cmd) => cmd._lifeCycleHooks[event] !== undefined).forEach((hookedCommand) => {
        hookedCommand._lifeCycleHooks[event].forEach((callback) => {
          hooks.push({ hookedCommand, callback });
        });
      });
      if (event === "postAction") {
        hooks.reverse();
      }
      hooks.forEach((hookDetail) => {
        result = this._chainOrCall(result, () => {
          return hookDetail.callback(hookDetail.hookedCommand, this);
        });
      });
      return result;
    }
    _chainOrCallSubCommandHook(promise, subCommand, event) {
      let result = promise;
      if (this._lifeCycleHooks[event] !== undefined) {
        this._lifeCycleHooks[event].forEach((hook) => {
          result = this._chainOrCall(result, () => {
            return hook(this, subCommand);
          });
        });
      }
      return result;
    }
    _parseCommand(operands, unknown) {
      const parsed = this.parseOptions(unknown);
      this._parseOptionsEnv();
      this._parseOptionsImplied();
      operands = operands.concat(parsed.operands);
      unknown = parsed.unknown;
      this.args = operands.concat(unknown);
      if (operands && this._findCommand(operands[0])) {
        return this._dispatchSubcommand(operands[0], operands.slice(1), unknown);
      }
      if (this._getHelpCommand() && operands[0] === this._getHelpCommand().name()) {
        return this._dispatchHelpCommand(operands[1]);
      }
      if (this._defaultCommandName) {
        this._outputHelpIfRequested(unknown);
        return this._dispatchSubcommand(this._defaultCommandName, operands, unknown);
      }
      if (this.commands.length && this.args.length === 0 && !this._actionHandler && !this._defaultCommandName) {
        this.help({ error: true });
      }
      this._outputHelpIfRequested(parsed.unknown);
      this._checkForMissingMandatoryOptions();
      this._checkForConflictingOptions();
      const checkForUnknownOptions = () => {
        if (parsed.unknown.length > 0) {
          this.unknownOption(parsed.unknown[0]);
        }
      };
      const commandEvent = `command:${this.name()}`;
      if (this._actionHandler) {
        checkForUnknownOptions();
        this._processArguments();
        let promiseChain;
        promiseChain = this._chainOrCallHooks(promiseChain, "preAction");
        promiseChain = this._chainOrCall(promiseChain, () => this._actionHandler(this.processedArgs));
        if (this.parent) {
          promiseChain = this._chainOrCall(promiseChain, () => {
            this.parent.emit(commandEvent, operands, unknown);
          });
        }
        promiseChain = this._chainOrCallHooks(promiseChain, "postAction");
        return promiseChain;
      }
      if (this.parent?.listenerCount(commandEvent)) {
        checkForUnknownOptions();
        this._processArguments();
        this.parent.emit(commandEvent, operands, unknown);
      } else if (operands.length) {
        if (this._findCommand("*")) {
          return this._dispatchSubcommand("*", operands, unknown);
        }
        if (this.listenerCount("command:*")) {
          this.emit("command:*", operands, unknown);
        } else if (this.commands.length) {
          this.unknownCommand();
        } else {
          checkForUnknownOptions();
          this._processArguments();
        }
      } else if (this.commands.length) {
        checkForUnknownOptions();
        this.help({ error: true });
      } else {
        checkForUnknownOptions();
        this._processArguments();
      }
    }
    _findCommand(name) {
      if (!name)
        return;
      return this.commands.find((cmd) => cmd._name === name || cmd._aliases.includes(name));
    }
    _findOption(arg) {
      return this.options.find((option) => option.is(arg));
    }
    _checkForMissingMandatoryOptions() {
      this._getCommandAndAncestors().forEach((cmd) => {
        cmd.options.forEach((anOption) => {
          if (anOption.mandatory && cmd.getOptionValue(anOption.attributeName()) === undefined) {
            cmd.missingMandatoryOptionValue(anOption);
          }
        });
      });
    }
    _checkForConflictingLocalOptions() {
      const definedNonDefaultOptions = this.options.filter((option) => {
        const optionKey = option.attributeName();
        if (this.getOptionValue(optionKey) === undefined) {
          return false;
        }
        return this.getOptionValueSource(optionKey) !== "default";
      });
      const optionsWithConflicting = definedNonDefaultOptions.filter((option) => option.conflictsWith.length > 0);
      optionsWithConflicting.forEach((option) => {
        const conflictingAndDefined = definedNonDefaultOptions.find((defined) => option.conflictsWith.includes(defined.attributeName()));
        if (conflictingAndDefined) {
          this._conflictingOption(option, conflictingAndDefined);
        }
      });
    }
    _checkForConflictingOptions() {
      this._getCommandAndAncestors().forEach((cmd) => {
        cmd._checkForConflictingLocalOptions();
      });
    }
    parseOptions(args) {
      const operands = [];
      const unknown = [];
      let dest = operands;
      function maybeOption(arg) {
        return arg.length > 1 && arg[0] === "-";
      }
      const negativeNumberArg = (arg) => {
        if (!/^-(\d+|\d*\.\d+)(e[+-]?\d+)?$/.test(arg))
          return false;
        return !this._getCommandAndAncestors().some((cmd) => cmd.options.map((opt) => opt.short).some((short) => /^-\d$/.test(short)));
      };
      let activeVariadicOption = null;
      let activeGroup = null;
      let i = 0;
      while (i < args.length || activeGroup) {
        const arg = activeGroup ?? args[i++];
        activeGroup = null;
        if (arg === "--") {
          if (dest === unknown)
            dest.push(arg);
          dest.push(...args.slice(i));
          break;
        }
        if (activeVariadicOption && (!maybeOption(arg) || negativeNumberArg(arg))) {
          this.emit(`option:${activeVariadicOption.name()}`, arg);
          continue;
        }
        activeVariadicOption = null;
        if (maybeOption(arg)) {
          const option = this._findOption(arg);
          if (option) {
            if (option.required) {
              const value = args[i++];
              if (value === undefined)
                this.optionMissingArgument(option);
              this.emit(`option:${option.name()}`, value);
            } else if (option.optional) {
              let value = null;
              if (i < args.length && (!maybeOption(args[i]) || negativeNumberArg(args[i]))) {
                value = args[i++];
              }
              this.emit(`option:${option.name()}`, value);
            } else {
              this.emit(`option:${option.name()}`);
            }
            activeVariadicOption = option.variadic ? option : null;
            continue;
          }
        }
        if (arg.length > 2 && arg[0] === "-" && arg[1] !== "-") {
          const option = this._findOption(`-${arg[1]}`);
          if (option) {
            if (option.required || option.optional && this._combineFlagAndOptionalValue) {
              this.emit(`option:${option.name()}`, arg.slice(2));
            } else {
              this.emit(`option:${option.name()}`);
              activeGroup = `-${arg.slice(2)}`;
            }
            continue;
          }
        }
        if (/^--[^=]+=/.test(arg)) {
          const index = arg.indexOf("=");
          const option = this._findOption(arg.slice(0, index));
          if (option && (option.required || option.optional)) {
            this.emit(`option:${option.name()}`, arg.slice(index + 1));
            continue;
          }
        }
        if (dest === operands && maybeOption(arg) && !(this.commands.length === 0 && negativeNumberArg(arg))) {
          dest = unknown;
        }
        if ((this._enablePositionalOptions || this._passThroughOptions) && operands.length === 0 && unknown.length === 0) {
          if (this._findCommand(arg)) {
            operands.push(arg);
            unknown.push(...args.slice(i));
            break;
          } else if (this._getHelpCommand() && arg === this._getHelpCommand().name()) {
            operands.push(arg, ...args.slice(i));
            break;
          } else if (this._defaultCommandName) {
            unknown.push(arg, ...args.slice(i));
            break;
          }
        }
        if (this._passThroughOptions) {
          dest.push(arg, ...args.slice(i));
          break;
        }
        dest.push(arg);
      }
      return { operands, unknown };
    }
    opts() {
      if (this._storeOptionsAsProperties) {
        const result = {};
        const len = this.options.length;
        for (let i = 0;i < len; i++) {
          const key = this.options[i].attributeName();
          result[key] = key === this._versionOptionName ? this._version : this[key];
        }
        return result;
      }
      return this._optionValues;
    }
    optsWithGlobals() {
      return this._getCommandAndAncestors().reduce((combinedOptions, cmd) => Object.assign(combinedOptions, cmd.opts()), {});
    }
    error(message, errorOptions) {
      this._outputConfiguration.outputError(`${message}
`, this._outputConfiguration.writeErr);
      if (typeof this._showHelpAfterError === "string") {
        this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`);
      } else if (this._showHelpAfterError) {
        this._outputConfiguration.writeErr(`
`);
        this.outputHelp({ error: true });
      }
      const config = errorOptions || {};
      const exitCode = config.exitCode || 1;
      const code = config.code || "commander.error";
      this._exit(exitCode, code, message);
    }
    _parseOptionsEnv() {
      this.options.forEach((option) => {
        if (option.envVar && option.envVar in process2.env) {
          const optionKey = option.attributeName();
          if (this.getOptionValue(optionKey) === undefined || ["default", "config", "env"].includes(this.getOptionValueSource(optionKey))) {
            if (option.required || option.optional) {
              this.emit(`optionEnv:${option.name()}`, process2.env[option.envVar]);
            } else {
              this.emit(`optionEnv:${option.name()}`);
            }
          }
        }
      });
    }
    _parseOptionsImplied() {
      const dualHelper = new DualOptions(this.options);
      const hasCustomOptionValue = (optionKey) => {
        return this.getOptionValue(optionKey) !== undefined && !["default", "implied"].includes(this.getOptionValueSource(optionKey));
      };
      this.options.filter((option) => option.implied !== undefined && hasCustomOptionValue(option.attributeName()) && dualHelper.valueFromOption(this.getOptionValue(option.attributeName()), option)).forEach((option) => {
        Object.keys(option.implied).filter((impliedKey) => !hasCustomOptionValue(impliedKey)).forEach((impliedKey) => {
          this.setOptionValueWithSource(impliedKey, option.implied[impliedKey], "implied");
        });
      });
    }
    missingArgument(name) {
      const message = `error: missing required argument '${name}'`;
      this.error(message, { code: "commander.missingArgument" });
    }
    optionMissingArgument(option) {
      const message = `error: option '${option.flags}' argument missing`;
      this.error(message, { code: "commander.optionMissingArgument" });
    }
    missingMandatoryOptionValue(option) {
      const message = `error: required option '${option.flags}' not specified`;
      this.error(message, { code: "commander.missingMandatoryOptionValue" });
    }
    _conflictingOption(option, conflictingOption) {
      const findBestOptionFromValue = (option2) => {
        const optionKey = option2.attributeName();
        const optionValue = this.getOptionValue(optionKey);
        const negativeOption = this.options.find((target) => target.negate && optionKey === target.attributeName());
        const positiveOption = this.options.find((target) => !target.negate && optionKey === target.attributeName());
        if (negativeOption && (negativeOption.presetArg === undefined && optionValue === false || negativeOption.presetArg !== undefined && optionValue === negativeOption.presetArg)) {
          return negativeOption;
        }
        return positiveOption || option2;
      };
      const getErrorMessage = (option2) => {
        const bestOption = findBestOptionFromValue(option2);
        const optionKey = bestOption.attributeName();
        const source = this.getOptionValueSource(optionKey);
        if (source === "env") {
          return `environment variable '${bestOption.envVar}'`;
        }
        return `option '${bestOption.flags}'`;
      };
      const message = `error: ${getErrorMessage(option)} cannot be used with ${getErrorMessage(conflictingOption)}`;
      this.error(message, { code: "commander.conflictingOption" });
    }
    unknownOption(flag) {
      if (this._allowUnknownOption)
        return;
      let suggestion = "";
      if (flag.startsWith("--") && this._showSuggestionAfterError) {
        let candidateFlags = [];
        let command = this;
        do {
          const moreFlags = command.createHelp().visibleOptions(command).filter((option) => option.long).map((option) => option.long);
          candidateFlags = candidateFlags.concat(moreFlags);
          command = command.parent;
        } while (command && !command._enablePositionalOptions);
        suggestion = suggestSimilar(flag, candidateFlags);
      }
      const message = `error: unknown option '${flag}'${suggestion}`;
      this.error(message, { code: "commander.unknownOption" });
    }
    _excessArguments(receivedArgs) {
      if (this._allowExcessArguments)
        return;
      const expected = this.registeredArguments.length;
      const s = expected === 1 ? "" : "s";
      const forSubcommand = this.parent ? ` for '${this.name()}'` : "";
      const message = `error: too many arguments${forSubcommand}. Expected ${expected} argument${s} but got ${receivedArgs.length}.`;
      this.error(message, { code: "commander.excessArguments" });
    }
    unknownCommand() {
      const unknownName = this.args[0];
      let suggestion = "";
      if (this._showSuggestionAfterError) {
        const candidateNames = [];
        this.createHelp().visibleCommands(this).forEach((command) => {
          candidateNames.push(command.name());
          if (command.alias())
            candidateNames.push(command.alias());
        });
        suggestion = suggestSimilar(unknownName, candidateNames);
      }
      const message = `error: unknown command '${unknownName}'${suggestion}`;
      this.error(message, { code: "commander.unknownCommand" });
    }
    version(str, flags, description) {
      if (str === undefined)
        return this._version;
      this._version = str;
      flags = flags || "-V, --version";
      description = description || "output the version number";
      const versionOption = this.createOption(flags, description);
      this._versionOptionName = versionOption.attributeName();
      this._registerOption(versionOption);
      this.on("option:" + versionOption.name(), () => {
        this._outputConfiguration.writeOut(`${str}
`);
        this._exit(0, "commander.version", str);
      });
      return this;
    }
    description(str, argsDescription) {
      if (str === undefined && argsDescription === undefined)
        return this._description;
      this._description = str;
      if (argsDescription) {
        this._argsDescription = argsDescription;
      }
      return this;
    }
    summary(str) {
      if (str === undefined)
        return this._summary;
      this._summary = str;
      return this;
    }
    alias(alias) {
      if (alias === undefined)
        return this._aliases[0];
      let command = this;
      if (this.commands.length !== 0 && this.commands[this.commands.length - 1]._executableHandler) {
        command = this.commands[this.commands.length - 1];
      }
      if (alias === command._name)
        throw new Error("Command alias can't be the same as its name");
      const matchingCommand = this.parent?._findCommand(alias);
      if (matchingCommand) {
        const existingCmd = [matchingCommand.name()].concat(matchingCommand.aliases()).join("|");
        throw new Error(`cannot add alias '${alias}' to command '${this.name()}' as already have command '${existingCmd}'`);
      }
      command._aliases.push(alias);
      return this;
    }
    aliases(aliases) {
      if (aliases === undefined)
        return this._aliases;
      aliases.forEach((alias) => this.alias(alias));
      return this;
    }
    usage(str) {
      if (str === undefined) {
        if (this._usage)
          return this._usage;
        const args = this.registeredArguments.map((arg) => {
          return humanReadableArgName(arg);
        });
        return [].concat(this.options.length || this._helpOption !== null ? "[options]" : [], this.commands.length ? "[command]" : [], this.registeredArguments.length ? args : []).join(" ");
      }
      this._usage = str;
      return this;
    }
    name(str) {
      if (str === undefined)
        return this._name;
      this._name = str;
      return this;
    }
    helpGroup(heading) {
      if (heading === undefined)
        return this._helpGroupHeading ?? "";
      this._helpGroupHeading = heading;
      return this;
    }
    commandsGroup(heading) {
      if (heading === undefined)
        return this._defaultCommandGroup ?? "";
      this._defaultCommandGroup = heading;
      return this;
    }
    optionsGroup(heading) {
      if (heading === undefined)
        return this._defaultOptionGroup ?? "";
      this._defaultOptionGroup = heading;
      return this;
    }
    _initOptionGroup(option) {
      if (this._defaultOptionGroup && !option.helpGroupHeading)
        option.helpGroup(this._defaultOptionGroup);
    }
    _initCommandGroup(cmd) {
      if (this._defaultCommandGroup && !cmd.helpGroup())
        cmd.helpGroup(this._defaultCommandGroup);
    }
    nameFromFilename(filename) {
      this._name = path.basename(filename, path.extname(filename));
      return this;
    }
    executableDir(path2) {
      if (path2 === undefined)
        return this._executableDir;
      this._executableDir = path2;
      return this;
    }
    helpInformation(contextOptions) {
      const helper = this.createHelp();
      const context = this._getOutputContext(contextOptions);
      helper.prepareContext({
        error: context.error,
        helpWidth: context.helpWidth,
        outputHasColors: context.hasColors
      });
      const text = helper.formatHelp(this, helper);
      if (context.hasColors)
        return text;
      return this._outputConfiguration.stripColor(text);
    }
    _getOutputContext(contextOptions) {
      contextOptions = contextOptions || {};
      const error = !!contextOptions.error;
      let baseWrite;
      let hasColors;
      let helpWidth;
      if (error) {
        baseWrite = (str) => this._outputConfiguration.writeErr(str);
        hasColors = this._outputConfiguration.getErrHasColors();
        helpWidth = this._outputConfiguration.getErrHelpWidth();
      } else {
        baseWrite = (str) => this._outputConfiguration.writeOut(str);
        hasColors = this._outputConfiguration.getOutHasColors();
        helpWidth = this._outputConfiguration.getOutHelpWidth();
      }
      const write = (str) => {
        if (!hasColors)
          str = this._outputConfiguration.stripColor(str);
        return baseWrite(str);
      };
      return { error, write, hasColors, helpWidth };
    }
    outputHelp(contextOptions) {
      let deprecatedCallback;
      if (typeof contextOptions === "function") {
        deprecatedCallback = contextOptions;
        contextOptions = undefined;
      }
      const outputContext = this._getOutputContext(contextOptions);
      const eventContext = {
        error: outputContext.error,
        write: outputContext.write,
        command: this
      };
      this._getCommandAndAncestors().reverse().forEach((command) => command.emit("beforeAllHelp", eventContext));
      this.emit("beforeHelp", eventContext);
      let helpInformation = this.helpInformation({ error: outputContext.error });
      if (deprecatedCallback) {
        helpInformation = deprecatedCallback(helpInformation);
        if (typeof helpInformation !== "string" && !Buffer.isBuffer(helpInformation)) {
          throw new Error("outputHelp callback must return a string or a Buffer");
        }
      }
      outputContext.write(helpInformation);
      if (this._getHelpOption()?.long) {
        this.emit(this._getHelpOption().long);
      }
      this.emit("afterHelp", eventContext);
      this._getCommandAndAncestors().forEach((command) => command.emit("afterAllHelp", eventContext));
    }
    helpOption(flags, description) {
      if (typeof flags === "boolean") {
        if (flags) {
          if (this._helpOption === null)
            this._helpOption = undefined;
          if (this._defaultOptionGroup) {
            this._initOptionGroup(this._getHelpOption());
          }
        } else {
          this._helpOption = null;
        }
        return this;
      }
      this._helpOption = this.createOption(flags ?? "-h, --help", description ?? "display help for command");
      if (flags || description)
        this._initOptionGroup(this._helpOption);
      return this;
    }
    _getHelpOption() {
      if (this._helpOption === undefined) {
        this.helpOption(undefined, undefined);
      }
      return this._helpOption;
    }
    addHelpOption(option) {
      this._helpOption = option;
      this._initOptionGroup(option);
      return this;
    }
    help(contextOptions) {
      this.outputHelp(contextOptions);
      let exitCode = Number(process2.exitCode ?? 0);
      if (exitCode === 0 && contextOptions && typeof contextOptions !== "function" && contextOptions.error) {
        exitCode = 1;
      }
      this._exit(exitCode, "commander.help", "(outputHelp)");
    }
    addHelpText(position, text) {
      const allowedValues = ["beforeAll", "before", "after", "afterAll"];
      if (!allowedValues.includes(position)) {
        throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${allowedValues.join("', '")}'`);
      }
      const helpEvent = `${position}Help`;
      this.on(helpEvent, (context) => {
        let helpStr;
        if (typeof text === "function") {
          helpStr = text({ error: context.error, command: context.command });
        } else {
          helpStr = text;
        }
        if (helpStr) {
          context.write(`${helpStr}
`);
        }
      });
      return this;
    }
    _outputHelpIfRequested(args) {
      const helpOption = this._getHelpOption();
      const helpRequested = helpOption && args.find((arg) => helpOption.is(arg));
      if (helpRequested) {
        this.outputHelp();
        this._exit(0, "commander.helpDisplayed", "(outputHelp)");
      }
    }
  }
  function incrementNodeInspectorPort(args) {
    return args.map((arg) => {
      if (!arg.startsWith("--inspect")) {
        return arg;
      }
      let debugOption;
      let debugHost = "127.0.0.1";
      let debugPort = "9229";
      let match;
      if ((match = arg.match(/^(--inspect(-brk)?)$/)) !== null) {
        debugOption = match[1];
      } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null) {
        debugOption = match[1];
        if (/^\d+$/.test(match[3])) {
          debugPort = match[3];
        } else {
          debugHost = match[3];
        }
      } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
        debugOption = match[1];
        debugHost = match[3];
        debugPort = match[4];
      }
      if (debugOption && debugPort !== "0") {
        return `${debugOption}=${debugHost}:${parseInt(debugPort) + 1}`;
      }
      return arg;
    });
  }
  function useColor() {
    if (process2.env.NO_COLOR || process2.env.FORCE_COLOR === "0" || process2.env.FORCE_COLOR === "false")
      return false;
    if (process2.env.FORCE_COLOR || process2.env.CLICOLOR_FORCE !== undefined)
      return true;
    return;
  }
  exports.Command = Command;
  exports.useColor = useColor;
});

// node_modules/commander/index.js
var require_commander = __commonJS((exports) => {
  var { Argument } = require_argument();
  var { Command } = require_command();
  var { CommanderError, InvalidArgumentError } = require_error();
  var { Help } = require_help();
  var { Option } = require_option();
  exports.program = new Command;
  exports.createCommand = (name) => new Command(name);
  exports.createOption = (flags, description) => new Option(flags, description);
  exports.createArgument = (name, description) => new Argument(name, description);
  exports.Command = Command;
  exports.Option = Option;
  exports.Argument = Argument;
  exports.Help = Help;
  exports.CommanderError = CommanderError;
  exports.InvalidArgumentError = InvalidArgumentError;
  exports.InvalidOptionArgumentError = InvalidArgumentError;
});

// src/data/got-long-words.json
var got_long_words_default = [
  "abandon",
  "abandoned",
  "abed",
  "abel",
  "able",
  "aboard",
  "above",
  "abruptly",
  "absence",
  "accept",
  "accepted",
  "account",
  "accused",
  "ache",
  "ached",
  "acolytes",
  "acorn",
  "across",
  "act",
  "actually",
  "addam",
  "added",
  "admiral",
  "admit",
  "admitted",
  "aegon",
  "aemon",
  "aenys",
  "aeron",
  "aerys",
  "afire",
  "afoot",
  "afraid",
  "after",
  "afternoon",
  "afterward",
  "again",
  "against",
  "age",
  "aged",
  "aggo",
  "ago",
  "agony",
  "agree",
  "agreed",
  "ahead",
  "air",
  "alayne",
  "ale",
  "alester",
  "alike",
  "alive",
  "alla",
  "alleras",
  "alley",
  "alleys",
  "alliance",
  "alliser",
  "allow",
  "allowed",
  "almost",
  "alone",
  "along",
  "aloud",
  "already",
  "also",
  "always",
  "alyn",
  "alys",
  "alysanne",
  "amidst",
  "among",
  "amongst",
  "amory",
  "amused",
  "amusing",
  "ancient",
  "andals",
  "anger",
  "angrily",
  "angry",
  "anguy",
  "animal",
  "animals",
  "ankle",
  "announced",
  "another",
  "answer",
  "answered",
  "answers",
  "antlers",
  "anxious",
  "anxiously",
  "anymore",
  "anyone",
  "anything",
  "anyway",
  "anywhere",
  "apart",
  "appear",
  "appeared",
  "apple",
  "apples",
  "approach",
  "arakh",
  "arbor",
  "arch",
  "arched",
  "archer",
  "archers",
  "aren",
  "areo",
  "argued",
  "arianne",
  "arm",
  "armed",
  "armies",
  "armor",
  "armored",
  "armorer",
  "armory",
  "arms",
  "army",
  "arnolf",
  "around",
  "arrived",
  "arrow",
  "arrows",
  "arry",
  "arryn",
  "arse",
  "arstan",
  "arthur",
  "arya",
  "arys",
  "ash",
  "asha",
  "ashamed",
  "ashes",
  "ashore",
  "aside",
  "ask",
  "asked",
  "asking",
  "asks",
  "asleep",
  "assembled",
  "asshai",
  "assured",
  "astapor",
  "astapori",
  "ate",
  "atop",
  "attack",
  "attacked",
  "attempt",
  "attend",
  "attended",
  "attention",
  "auburn",
  "audience",
  "aunt",
  "aurane",
  "aurochs",
  "autumn",
  "avoid",
  "awaited",
  "awaits",
  "awake",
  "aware",
  "away",
  "awkward",
  "awkwardly",
  "axe",
  "axell",
  "axes",
  "aye",
  "babe",
  "babes",
  "baby",
  "backed",
  "backs",
  "backward",
  "bacon",
  "bad",
  "badge",
  "badly",
  "baelish",
  "baelor",
  "bag",
  "bailey",
  "baked",
  "balance",
  "bald",
  "balerion",
  "balls",
  "balon",
  "band",
  "bank",
  "banks",
  "banner",
  "bannermen",
  "banners",
  "bar",
  "baratheon",
  "barber",
  "bard",
  "bare",
  "bared",
  "barefoot",
  "bark",
  "barked",
  "barking",
  "barley",
  "barracks",
  "barred",
  "barrel",
  "barrels",
  "barristan",
  "barrow",
  "barrowton",
  "bars",
  "base",
  "baseborn",
  "basket",
  "bastard",
  "bastards",
  "bath",
  "bathe",
  "bathed",
  "battle",
  "battles",
  "bay",
  "beans",
  "bear",
  "beard",
  "bearded",
  "bearing",
  "bears",
  "beast",
  "beasts",
  "beat",
  "beaten",
  "beating",
  "beautiful",
  "beauty",
  "became",
  "because",
  "beckoned",
  "become",
  "bed",
  "bedded",
  "bedding",
  "beds",
  "beef",
  "beer",
  "before",
  "beg",
  "began",
  "beggar",
  "begged",
  "begging",
  "begin",
  "beginning",
  "begun",
  "behind",
  "behold",
  "being",
  "believe",
  "believed",
  "bell",
  "bellies",
  "bellowed",
  "bells",
  "belly",
  "belong",
  "belonged",
  "belongs",
  "beloved",
  "below",
  "belt",
  "belwas",
  "ben",
  "bench",
  "benches",
  "bend",
  "beneath",
  "benjen",
  "bent",
  "beric",
  "beside",
  "besides",
  "best",
  "bet",
  "betha",
  "betray",
  "betrayed",
  "betrothed",
  "better",
  "between",
  "beyond",
  "bid",
  "big",
  "bigger",
  "biggest",
  "bind",
  "bird",
  "birds",
  "birth",
  "bit",
  "bite",
  "biter",
  "biting",
  "bits",
  "bitter",
  "bitterly",
  "black",
  "blackened",
  "blackfish",
  "blackwood",
  "blade",
  "blades",
  "blame",
  "blanket",
  "blankets",
  "blaze",
  "bleak",
  "bleed",
  "bleeding",
  "bless",
  "blessed",
  "blew",
  "blind",
  "blink",
  "blinked",
  "blisters",
  "block",
  "blond",
  "blood",
  "bloody",
  "blount",
  "blow",
  "blowing",
  "blows",
  "blue",
  "blunt",
  "blurted",
  "boar",
  "boast",
  "boasted",
  "boat",
  "boats",
  "bobbed",
  "bodice",
  "bodies",
  "body",
  "boil",
  "boiled",
  "boiling",
  "bold",
  "bolt",
  "bolton",
  "bone",
  "bones",
  "bony",
  "book",
  "books",
  "boom",
  "boomed",
  "boot",
  "boots",
  "bore",
  "bored",
  "born",
  "borne",
  "boros",
  "both",
  "bother",
  "botley",
  "bottom",
  "bought",
  "bound",
  "bow",
  "bowed",
  "bowels",
  "bowen",
  "bowl",
  "bowmen",
  "bows",
  "box",
  "boy",
  "boys",
  "braavos",
  "braavosi",
  "bracken",
  "braid",
  "bran",
  "branch",
  "branches",
  "brandon",
  "brass",
  "brave",
  "brax",
  "brazen",
  "brazier",
  "bread",
  "break",
  "breakfast",
  "breaking",
  "breast",
  "breasts",
  "breath",
  "breathe",
  "breathing",
  "breeches",
  "brick",
  "bricks",
  "bride",
  "bridge",
  "briefly",
  "brienne",
  "bright",
  "bring",
  "bringing",
  "brings",
  "broad",
  "broke",
  "broken",
  "bronn",
  "bronze",
  "brooding",
  "broth",
  "brothel",
  "brothels",
  "brother",
  "brothers",
  "brought",
  "brow",
  "brown",
  "bruises",
  "brune",
  "brusco",
  "brush",
  "brushed",
  "brutal",
  "brynden",
  "bucket",
  "bugger",
  "build",
  "builder",
  "builders",
  "building",
  "buildings",
  "built",
  "bull",
  "bulwer",
  "buried",
  "burn",
  "burned",
  "burning",
  "burns",
  "burnt",
  "burst",
  "bury",
  "business",
  "butcher",
  "butchered",
  "butt",
  "butter",
  "buy",
  "bywater",
  "cabin",
  "cage",
  "cailin",
  "cakes",
  "call",
  "called",
  "calling",
  "calls",
  "calm",
  "came",
  "camp",
  "camps",
  "canal",
  "canals",
  "candle",
  "candles",
  "cannot",
  "canvas",
  "cape",
  "captain",
  "captains",
  "captive",
  "captives",
  "captured",
  "carcass",
  "care",
  "cared",
  "careful",
  "carefully",
  "caron",
  "carpet",
  "carried",
  "carrots",
  "carry",
  "carrying",
  "cart",
  "carts",
  "carved",
  "case",
  "cask",
  "casks",
  "cassel",
  "cast",
  "castellan",
  "casterly",
  "castle",
  "castles",
  "cat",
  "catch",
  "catelyn",
  "cats",
  "caught",
  "cause",
  "causeway",
  "cave",
  "ceiling",
  "cell",
  "cellar",
  "cellars",
  "cells",
  "center",
  "centuries",
  "cersei",
  "certain",
  "certainly",
  "certainty",
  "cerwyn",
  "chain",
  "chained",
  "chainmail",
  "chains",
  "chair",
  "chairs",
  "chamber",
  "chambers",
  "champion",
  "champions",
  "chance",
  "change",
  "changed",
  "chaos",
  "charge",
  "charged",
  "charred",
  "chase",
  "chased",
  "chasing",
  "chataya",
  "cheek",
  "cheeks",
  "cheese",
  "chest",
  "chestnut",
  "chests",
  "chett",
  "chewed",
  "chewing",
  "chicken",
  "chief",
  "child",
  "children",
  "chill",
  "chilly",
  "chin",
  "choice",
  "choke",
  "choked",
  "choking",
  "choose",
  "choosing",
  "chose",
  "chosen",
  "chuckled",
  "chunk",
  "chunks",
  "cinnamon",
  "circle",
  "circled",
  "circling",
  "citadel",
  "cities",
  "city",
  "clad",
  "claim",
  "claimed",
  "claims",
  "clams",
  "clans",
  "clansmen",
  "clapped",
  "clasped",
  "clatter",
  "claw",
  "claws",
  "clean",
  "clear",
  "cleared",
  "clegane",
  "clenched",
  "cleon",
  "cleos",
  "clever",
  "cliff",
  "climb",
  "climbed",
  "climbing",
  "clinging",
  "cloak",
  "cloaked",
  "cloaks",
  "close",
  "closed",
  "closely",
  "closer",
  "closing",
  "cloth",
  "clothes",
  "clothing",
  "cloud",
  "clouds",
  "clumsy",
  "clung",
  "clutched",
  "clutching",
  "clydas",
  "coals",
  "coarse",
  "coast",
  "cock",
  "cocked",
  "cog",
  "coiled",
  "coin",
  "coins",
  "cold",
  "colder",
  "colemon",
  "collapsed",
  "collar",
  "color",
  "colored",
  "colors",
  "column",
  "combat",
  "come",
  "comely",
  "comes",
  "comet",
  "comfort",
  "coming",
  "command",
  "commanded",
  "commander",
  "commands",
  "common",
  "companies",
  "companion",
  "company",
  "compared",
  "complain",
  "concealed",
  "concern",
  "concerned",
  "confess",
  "confessed",
  "confused",
  "confusion",
  "conqueror",
  "conquest",
  "consent",
  "consider",
  "contempt",
  "content",
  "continue",
  "continued",
  "convinced",
  "cook",
  "cooked",
  "cooks",
  "cool",
  "copper",
  "corbray",
  "corn",
  "corner",
  "corpse",
  "corpses",
  "corrected",
  "cortnay",
  "cost",
  "cotter",
  "coughed",
  "coughing",
  "couldn",
  "council",
  "counsel",
  "counselor",
  "count",
  "counted",
  "counting",
  "courage",
  "course",
  "courser",
  "court",
  "courteous",
  "courtesy",
  "cousin",
  "cousins",
  "cover",
  "covered",
  "cow",
  "coward",
  "crabb",
  "crabs",
  "crack",
  "cracked",
  "crackling",
  "crag",
  "crakehall",
  "cramped",
  "crane",
  "crash",
  "crashed",
  "crashing",
  "craster",
  "craven",
  "crawl",
  "crawled",
  "crawling",
  "cream",
  "creature",
  "creatures",
  "creeping",
  "creighton",
  "crept",
  "crescent",
  "cressen",
  "crew",
  "cried",
  "cries",
  "crime",
  "crimes",
  "crimson",
  "cripple",
  "crippled",
  "crisp",
  "crone",
  "crooked",
  "cross",
  "crossbow",
  "crossed",
  "crossing",
  "crow",
  "crowd",
  "crowded",
  "crown",
  "crowned",
  "crowns",
  "crows",
  "crude",
  "cruel",
  "crumbling",
  "crunch",
  "crushed",
  "crust",
  "cry",
  "crying",
  "crypts",
  "crystal",
  "cunning",
  "cup",
  "cupped",
  "cups",
  "curious",
  "curled",
  "curls",
  "current",
  "curse",
  "cursed",
  "curses",
  "cursing",
  "curtain",
  "curtains",
  "curved",
  "cushions",
  "custom",
  "cut",
  "cuts",
  "cutting",
  "cyvasse",
  "daario",
  "daenerys",
  "daeron",
  "dagger",
  "daggers",
  "dagmer",
  "dais",
  "dalla",
  "damn",
  "damned",
  "damon",
  "damp",
  "damphair",
  "dance",
  "danced",
  "dancer",
  "dancing",
  "danger",
  "dangerous",
  "dangling",
  "dany",
  "dare",
  "dared",
  "dareon",
  "dark",
  "darkened",
  "darker",
  "darkness",
  "darry",
  "darted",
  "daughter",
  "daughters",
  "daven",
  "davos",
  "dawn",
  "daxos",
  "day",
  "dayne",
  "days",
  "dead",
  "deadly",
  "deaf",
  "deal",
  "dear",
  "death",
  "deaths",
  "debt",
  "debts",
  "decide",
  "decided",
  "deck",
  "decks",
  "declared",
  "decreed",
  "deeds",
  "deep",
  "deeper",
  "deeply",
  "deepwood",
  "deer",
  "defeat",
  "defeated",
  "defend",
  "defenders",
  "delicate",
  "delight",
  "deliver",
  "delivered",
  "demanded",
  "demon",
  "den",
  "denied",
  "deny",
  "denys",
  "depart",
  "departed",
  "descended",
  "descent",
  "deserted",
  "deserved",
  "desire",
  "desmond",
  "despair",
  "desperate",
  "despite",
  "devan",
  "dick",
  "didn",
  "die",
  "died",
  "dies",
  "different",
  "difficult",
  "digging",
  "dim",
  "dipped",
  "direwolf",
  "dirk",
  "dirt",
  "dirty",
  "dish",
  "dismay",
  "dismissed",
  "distance",
  "distant",
  "divided",
  "dizzy",
  "docks",
  "does",
  "doesn",
  "dog",
  "dogs",
  "doing",
  "dolorous",
  "dome",
  "don",
  "donal",
  "done",
  "donned",
  "donnel",
  "dontos",
  "doom",
  "doomed",
  "door",
  "doors",
  "doran",
  "doreah",
  "dorne",
  "dornish",
  "dothrak",
  "dothraki",
  "double",
  "doublet",
  "doubt",
  "doubtless",
  "doubts",
  "dozen",
  "drag",
  "dragged",
  "dragging",
  "dragon",
  "dragons",
  "drank",
  "draped",
  "draw",
  "drawing",
  "drawn",
  "dread",
  "dreadfort",
  "dream",
  "dreamed",
  "dreaming",
  "dreams",
  "dreamt",
  "dress",
  "dressed",
  "drew",
  "dried",
  "drifted",
  "drifting",
  "drifts",
  "driftwood",
  "drink",
  "drinking",
  "dripped",
  "dripping",
  "drive",
  "driven",
  "driving",
  "drogo",
  "drogon",
  "drop",
  "dropped",
  "drove",
  "drown",
  "drowned",
  "drowning",
  "drum",
  "drums",
  "drunk",
  "drunken",
  "dry",
  "duck",
  "due",
  "dug",
  "dull",
  "dung",
  "dungeon",
  "dungeons",
  "during",
  "dusk",
  "dusky",
  "dust",
  "dustin",
  "dusty",
  "duties",
  "duty",
  "duur",
  "dwarf",
  "dwarfs",
  "dwindled",
  "dying",
  "dywen",
  "each",
  "eager",
  "eagerly",
  "eagle",
  "ear",
  "early",
  "earned",
  "ears",
  "earth",
  "ease",
  "eased",
  "easier",
  "easily",
  "east",
  "eastern",
  "eastwatch",
  "easy",
  "eat",
  "eaten",
  "eating",
  "echoed",
  "echoing",
  "edd",
  "eddard",
  "edge",
  "edged",
  "edmure",
  "edric",
  "edwyn",
  "eel",
  "effort",
  "egg",
  "eggs",
  "eight",
  "eighteen",
  "eighty",
  "either",
  "elbow",
  "elder",
  "eldest",
  "elephants",
  "eleven",
  "elia",
  "elinor",
  "elk",
  "ellaria",
  "else",
  "elsewhere",
  "elsewise",
  "embers",
  "embrace",
  "emerge",
  "emerged",
  "emmett",
  "emmon",
  "empty",
  "end",
  "ended",
  "endless",
  "ends",
  "enemies",
  "enemy",
  "enjoy",
  "enjoyed",
  "enough",
  "enter",
  "entered",
  "entirely",
  "entrails",
  "entrance",
  "envoy",
  "equal",
  "erik",
  "escape",
  "escaped",
  "escort",
  "escorted",
  "estermont",
  "eunuch",
  "eunuchs",
  "euron",
  "even",
  "evenfall",
  "evening",
  "ever",
  "every",
  "everyone",
  "evil",
  "except",
  "exchange",
  "exchanged",
  "excuse",
  "exhausted",
  "exile",
  "expect",
  "expected",
  "explained",
  "eye",
  "eyed",
  "eyes",
  "eyrie",
  "face",
  "faced",
  "faces",
  "faded",
  "fail",
  "failed",
  "failing",
  "faint",
  "faintly",
  "fair",
  "faith",
  "faithful",
  "falcon",
  "fall",
  "fallen",
  "falling",
  "falls",
  "false",
  "falyse",
  "familiar",
  "family",
  "famous",
  "far",
  "farce",
  "farewell",
  "farring",
  "farther",
  "fashion",
  "fast",
  "fastened",
  "faster",
  "fat",
  "fate",
  "father",
  "fathered",
  "fathers",
  "fault",
  "favor",
  "favored",
  "favorite",
  "fealty",
  "fear",
  "feared",
  "fearful",
  "fearless",
  "fears",
  "fearsome",
  "feast",
  "feasted",
  "feasts",
  "feathers",
  "features",
  "fed",
  "feeble",
  "feed",
  "feeding",
  "feel",
  "feeling",
  "feels",
  "feet",
  "fell",
  "fellow",
  "fellows",
  "felt",
  "female",
  "fetch",
  "fever",
  "few",
  "fewer",
  "field",
  "fields",
  "fierce",
  "fiercely",
  "fiery",
  "fifteen",
  "fifth",
  "fifty",
  "fight",
  "fighter",
  "fighters",
  "fighting",
  "fill",
  "filled",
  "filling",
  "filthy",
  "final",
  "finally",
  "find",
  "finding",
  "fine",
  "finest",
  "finger",
  "fingers",
  "finish",
  "finished",
  "fire",
  "fires",
  "firmly",
  "first",
  "fish",
  "fishing",
  "fist",
  "fists",
  "fit",
  "fitting",
  "five",
  "fixed",
  "flagon",
  "flame",
  "flames",
  "flaming",
  "flap",
  "flapped",
  "flapping",
  "flashed",
  "flashing",
  "flat",
  "flayed",
  "flea",
  "fled",
  "flee",
  "fleet",
  "flesh",
  "flew",
  "flicked",
  "flies",
  "flight",
  "flint",
  "floated",
  "floating",
  "floor",
  "floors",
  "florent",
  "florian",
  "flow",
  "flowed",
  "flower",
  "flowers",
  "flowing",
  "flung",
  "flushed",
  "fly",
  "flying",
  "foe",
  "foes",
  "fog",
  "folded",
  "folk",
  "follow",
  "followed",
  "followers",
  "following",
  "folly",
  "fond",
  "food",
  "fool",
  "foolish",
  "fools",
  "foot",
  "footsteps",
  "force",
  "forced",
  "ford",
  "forehead",
  "forel",
  "forest",
  "forever",
  "forge",
  "forged",
  "forget",
  "forgive",
  "forgot",
  "forgotten",
  "fork",
  "form",
  "formed",
  "former",
  "formerly",
  "forth",
  "fortnight",
  "fortunate",
  "forty",
  "forward",
  "fossoway",
  "fought",
  "foul",
  "found",
  "four",
  "fourteen",
  "fourth",
  "fox",
  "frail",
  "free",
  "freed",
  "freedmen",
  "freedom",
  "freely",
  "freeze",
  "fresh",
  "frey",
  "freys",
  "fried",
  "friend",
  "friends",
  "frighten",
  "frog",
  "front",
  "frowned",
  "frowning",
  "froze",
  "frozen",
  "fruit",
  "full",
  "fumbled",
  "funny",
  "fur",
  "furious",
  "furs",
  "further",
  "fury",
  "future",
  "galbart",
  "gallant",
  "gallery",
  "galley",
  "galleys",
  "gallop",
  "galloped",
  "game",
  "gaoler",
  "gaped",
  "garb",
  "garbed",
  "garden",
  "gardens",
  "gared",
  "gargoyles",
  "garin",
  "garlan",
  "garrison",
  "garron",
  "garrons",
  "garth",
  "gash",
  "gasp",
  "gasped",
  "gate",
  "gatehouse",
  "gates",
  "gather",
  "gathered",
  "gathering",
  "gaunt",
  "gave",
  "gaze",
  "gazed",
  "gazing",
  "gelding",
  "gendry",
  "generous",
  "genna",
  "gentle",
  "gently",
  "gerold",
  "gerris",
  "gesture",
  "gestured",
  "gets",
  "getting",
  "ghar",
  "ghis",
  "ghiscari",
  "ghost",
  "ghosts",
  "giant",
  "giants",
  "gift",
  "gifts",
  "giggled",
  "gilded",
  "gilly",
  "girl",
  "girls",
  "give",
  "given",
  "gives",
  "giving",
  "glad",
  "gladly",
  "glance",
  "glanced",
  "glare",
  "glass",
  "gleamed",
  "glimmered",
  "glimpse",
  "glimpsed",
  "glittered",
  "gloom",
  "gloomy",
  "glory",
  "glove",
  "gloved",
  "glover",
  "gloves",
  "glow",
  "glowing",
  "gnarled",
  "goat",
  "goats",
  "goblet",
  "god",
  "godry",
  "gods",
  "godswood",
  "goes",
  "going",
  "gold",
  "golden",
  "gone",
  "good",
  "goods",
  "goose",
  "got",
  "gotten",
  "gown",
  "grab",
  "grabbed",
  "grace",
  "graces",
  "grand",
  "grandson",
  "grandsons",
  "granite",
  "grant",
  "granted",
  "grasp",
  "grasped",
  "grass",
  "grateful",
  "grave",
  "grazdan",
  "grease",
  "greasy",
  "great",
  "greater",
  "greatest",
  "greatjon",
  "green",
  "greeted",
  "gregor",
  "grenn",
  "grew",
  "grey",
  "greyjoy",
  "grief",
  "grievous",
  "griff",
  "griffin",
  "grim",
  "grimaced",
  "grin",
  "grinned",
  "grinning",
  "grip",
  "groleo",
  "grotesque",
  "ground",
  "grove",
  "grow",
  "growing",
  "growled",
  "grown",
  "grows",
  "grumbled",
  "grunt",
  "grunted",
  "guard",
  "guarded",
  "guards",
  "guardsman",
  "guardsmen",
  "guess",
  "guest",
  "guests",
  "guilt",
  "guilty",
  "gulltown",
  "gust",
  "gut",
  "gyles",
  "hacked",
  "hadn",
  "hair",
  "haired",
  "hairs",
  "hairy",
  "hal",
  "halder",
  "haldon",
  "half",
  "halfhand",
  "halfway",
  "hall",
  "halls",
  "hallyne",
  "halt",
  "ham",
  "hammer",
  "hammered",
  "hand",
  "handed",
  "handful",
  "handmaids",
  "hands",
  "handsome",
  "hang",
  "hanged",
  "hanging",
  "happen",
  "happened",
  "happening",
  "happens",
  "happily",
  "happy",
  "harbor",
  "hard",
  "harder",
  "hardhome",
  "hardly",
  "harlaw",
  "harm",
  "harma",
  "harmed",
  "harp",
  "harpy",
  "harren",
  "harrenhal",
  "harry",
  "harsh",
  "harvest",
  "harwin",
  "harys",
  "has",
  "haste",
  "hat",
  "hate",
  "hated",
  "haunted",
  "haven",
  "having",
  "hawk",
  "head",
  "headed",
  "heads",
  "headsman",
  "heal",
  "healer",
  "healing",
  "healthy",
  "hear",
  "heard",
  "hearing",
  "hears",
  "heart",
  "heartbeat",
  "hearth",
  "hearts",
  "heat",
  "heavier",
  "heavily",
  "heavy",
  "hedge",
  "heed",
  "heel",
  "heels",
  "heh",
  "height",
  "heir",
  "heirs",
  "held",
  "hell",
  "hells",
  "helm",
  "helms",
  "help",
  "helped",
  "helping",
  "helpless",
  "herald",
  "hero",
  "heroes",
  "hers",
  "herself",
  "hesitated",
  "hid",
  "hidden",
  "hide",
  "hideous",
  "hides",
  "hiding",
  "high",
  "highborn",
  "higher",
  "hightower",
  "hill",
  "hills",
  "hilt",
  "himself",
  "hinges",
  "hint",
  "hip",
  "hips",
  "hire",
  "hired",
  "hissed",
  "history",
  "hit",
  "hizdahr",
  "hllor",
  "hoat",
  "hobb",
  "hobber",
  "hodor",
  "hold",
  "holdfast",
  "holdfasts",
  "holding",
  "holds",
  "hole",
  "holes",
  "holiness",
  "hollow",
  "holly",
  "holy",
  "home",
  "homely",
  "homes",
  "honest",
  "honey",
  "honor",
  "honorable",
  "honored",
  "honors",
  "hood",
  "hooded",
  "hook",
  "hooves",
  "hope",
  "hoped",
  "hopes",
  "hoping",
  "hopped",
  "horas",
  "horizon",
  "horn",
  "horns",
  "hornwood",
  "horror",
  "horse",
  "horses",
  "host",
  "hostage",
  "hostages",
  "hosteen",
  "hoster",
  "hot",
  "hotah",
  "hound",
  "hounds",
  "hour",
  "hours",
  "house",
  "household",
  "houses",
  "hovels",
  "however",
  "howl",
  "howled",
  "howling",
  "huddled",
  "huge",
  "hugged",
  "hugor",
  "hull",
  "human",
  "humble",
  "hunched",
  "hundred",
  "hundreds",
  "hung",
  "hunger",
  "hungry",
  "hunt",
  "hunted",
  "hunter",
  "hunting",
  "huntsman",
  "hurried",
  "hurry",
  "hurt",
  "husband",
  "hushed",
  "hyle",
  "ice",
  "icy",
  "idea",
  "ignore",
  "ignored",
  "ill",
  "illyrio",
  "ilyn",
  "imagine",
  "immense",
  "imp",
  "important",
  "inch",
  "inches",
  "inclined",
  "indeed",
  "informed",
  "ink",
  "inn",
  "inner",
  "innkeep",
  "innocence",
  "innocent",
  "inside",
  "insist",
  "insisted",
  "instant",
  "instead",
  "intend",
  "intended",
  "intent",
  "interest",
  "iron",
  "ironborn",
  "ironmen",
  "irri",
  "island",
  "islands",
  "isle",
  "isles",
  "isn",
  "itself",
  "ivory",
  "jacelyn",
  "jack",
  "jade",
  "jaehaerys",
  "jagged",
  "jaime",
  "janos",
  "jape",
  "japes",
  "jaqen",
  "jared",
  "jaremy",
  "jarl",
  "jars",
  "jason",
  "jaw",
  "jaws",
  "jerked",
  "jerkin",
  "jest",
  "jeweled",
  "jewels",
  "jeyne",
  "jhiqui",
  "jhogo",
  "joff",
  "joffrey",
  "join",
  "joined",
  "jojen",
  "jon",
  "jonos",
  "jorah",
  "jory",
  "journey",
  "joust",
  "joy",
  "judge",
  "judged",
  "judgment",
  "juice",
  "jumped",
  "justice",
  "justin",
  "karhold",
  "karstark",
  "karstarks",
  "keep",
  "keeping",
  "keeps",
  "kept",
  "kettle",
  "kevan",
  "key",
  "keys",
  "khal",
  "khalasar",
  "khaleesi",
  "khrazz",
  "kick",
  "kicked",
  "kicking",
  "kill",
  "killed",
  "killer",
  "killing",
  "kin",
  "kind",
  "kindly",
  "kindness",
  "king",
  "kingdom",
  "kingdoms",
  "kings",
  "kingsmoot",
  "kingsroad",
  "kingswood",
  "kinslayer",
  "kiss",
  "kissed",
  "kisses",
  "kissing",
  "kitchen",
  "kitchens",
  "knee",
  "kneel",
  "kneeling",
  "knees",
  "knelt",
  "knew",
  "knife",
  "knight",
  "knights",
  "knives",
  "knock",
  "knocked",
  "knocking",
  "knowing",
  "knowledge",
  "known",
  "knows",
  "kraken",
  "kraznys",
  "kyra",
  "lace",
  "laced",
  "lack",
  "lacked",
  "lad",
  "ladder",
  "ladies",
  "lads",
  "lady",
  "laid",
  "lake",
  "lakes",
  "lamb",
  "lame",
  "lamp",
  "lance",
  "lancel",
  "lances",
  "land",
  "landed",
  "landing",
  "lands",
  "lannister",
  "lantern",
  "lap",
  "large",
  "larger",
  "largest",
  "lark",
  "lash",
  "lashed",
  "last",
  "late",
  "later",
  "laugh",
  "laughed",
  "laughing",
  "laughter",
  "law",
  "laws",
  "lay",
  "layers",
  "lazy",
  "lead",
  "leader",
  "leading",
  "leaf",
  "leagues",
  "lean",
  "leaned",
  "leaning",
  "leaping",
  "leapt",
  "learn",
  "learned",
  "least",
  "leather",
  "leathers",
  "leave",
  "leaves",
  "leaving",
  "led",
  "leeches",
  "left",
  "leg",
  "legged",
  "legs",
  "lem",
  "lemon",
  "lemore",
  "length",
  "leo",
  "less",
  "lesser",
  "lesson",
  "lest",
  "let",
  "letter",
  "letters",
  "letting",
  "level",
  "leyton",
  "liar",
  "lick",
  "licked",
  "liddle",
  "lie",
  "lied",
  "liege",
  "lies",
  "life",
  "lift",
  "lifted",
  "lifting",
  "light",
  "lightly",
  "lightning",
  "lights",
  "liked",
  "likely",
  "likeness",
  "likes",
  "limb",
  "limbs",
  "limp",
  "line",
  "lined",
  "linen",
  "lines",
  "linger",
  "lingered",
  "links",
  "lion",
  "lions",
  "lip",
  "lips",
  "list",
  "listen",
  "listened",
  "listening",
  "lists",
  "lit",
  "litter",
  "little",
  "live",
  "lived",
  "lives",
  "living",
  "lock",
  "locke",
  "locked",
  "log",
  "logs",
  "lollys",
  "lommy",
  "lonely",
  "long",
  "longaxe",
  "longbow",
  "longclaw",
  "longer",
  "longships",
  "longsword",
  "look",
  "looked",
  "looking",
  "looks",
  "loomed",
  "looming",
  "loose",
  "loosed",
  "loraq",
  "loras",
  "lorch",
  "lord",
  "lordling",
  "lordlings",
  "lords",
  "lordship",
  "lordsport",
  "lorren",
  "lose",
  "losing",
  "loss",
  "lost",
  "lot",
  "lothar",
  "lothor",
  "loud",
  "louder",
  "loudly",
  "love",
  "loved",
  "lovely",
  "lover",
  "loves",
  "low",
  "lower",
  "lowered",
  "loyal",
  "loyalty",
  "lucas",
  "luck",
  "lucky",
  "lurched",
  "lust",
  "luwin",
  "lyanna",
  "lying",
  "lyn",
  "lyonel",
  "lys",
  "lysa",
  "lysene",
  "lyseni",
  "mace",
  "mad",
  "made",
  "madness",
  "maege",
  "maegi",
  "maegor",
  "maester",
  "maesters",
  "magic",
  "magister",
  "magnar",
  "maid",
  "maiden",
  "maidens",
  "maids",
  "mail",
  "mailed",
  "maimed",
  "main",
  "make",
  "makes",
  "making",
  "male",
  "mallister",
  "mammoth",
  "mammoths",
  "managed",
  "mance",
  "mander",
  "manderly",
  "mandon",
  "mane",
  "manhood",
  "manner",
  "manse",
  "mantle",
  "many",
  "map",
  "maps",
  "marble",
  "marbrand",
  "march",
  "marched",
  "marches",
  "marching",
  "mare",
  "margaery",
  "marillion",
  "mark",
  "marked",
  "market",
  "marks",
  "marq",
  "marriage",
  "married",
  "marry",
  "marsh",
  "martell",
  "martyn",
  "marwyn",
  "marya",
  "mask",
  "massey",
  "massive",
  "mast",
  "master",
  "masters",
  "match",
  "mathis",
  "matter",
  "mattered",
  "matters",
  "may",
  "maybe",
  "mayhaps",
  "maz",
  "mead",
  "meal",
  "meals",
  "mean",
  "meaning",
  "means",
  "meant",
  "meat",
  "meera",
  "meereen",
  "meet",
  "meeting",
  "megga",
  "melt",
  "melted",
  "melting",
  "member",
  "memory",
  "men",
  "mention",
  "merchant",
  "merchants",
  "mercy",
  "mere",
  "meribald",
  "meris",
  "merrett",
  "merry",
  "meryn",
  "message",
  "messages",
  "met",
  "metal",
  "midday",
  "middle",
  "midnight",
  "midst",
  "might",
  "mighty",
  "mikken",
  "mile",
  "miles",
  "milk",
  "milkwater",
  "mill",
  "mind",
  "mine",
  "mirri",
  "miss",
  "missandei",
  "missed",
  "missing",
  "mist",
  "mistake",
  "mistaken",
  "mists",
  "moat",
  "mob",
  "mock",
  "mocked",
  "mockery",
  "mocking",
  "modest",
  "mole",
  "mollen",
  "moment",
  "moments",
  "monkey",
  "monster",
  "monsters",
  "monstrous",
  "mood",
  "moon",
  "moonlight",
  "moqorro",
  "mord",
  "mordane",
  "mormont",
  "morning",
  "morrow",
  "mors",
  "mortal",
  "moss",
  "most",
  "mostly",
  "mother",
  "mothers",
  "motion",
  "motley",
  "motte",
  "mount",
  "mountain",
  "mountains",
  "mounted",
  "mounts",
  "mourning",
  "mouse",
  "mouth",
  "mouths",
  "move",
  "moved",
  "moving",
  "much",
  "mud",
  "muddy",
  "muffled",
  "mule",
  "mules",
  "mulled",
  "mully",
  "mummer",
  "mummers",
  "murder",
  "murdered",
  "murmured",
  "muscle",
  "muscles",
  "mused",
  "mushrooms",
  "music",
  "must",
  "mustache",
  "muttered",
  "muttering",
  "mutton",
  "mya",
  "mycah",
  "myr",
  "myranda",
  "myrcella",
  "myrish",
  "myself",
  "naharis",
  "nails",
  "naked",
  "name",
  "named",
  "names",
  "nan",
  "narrow",
  "narrowed",
  "natural",
  "nature",
  "naught",
  "near",
  "nearby",
  "nearest",
  "neck",
  "ned",
  "need",
  "needed",
  "needle",
  "needles",
  "needs",
  "neither",
  "nephew",
  "nervous",
  "nervously",
  "nest",
  "nestor",
  "net",
  "never",
  "new",
  "news",
  "next",
  "nice",
  "niece",
  "night",
  "nightfort",
  "nights",
  "nimble",
  "nine",
  "ninety",
  "nipple",
  "nipples",
  "noble",
  "nod",
  "nodded",
  "noise",
  "noisily",
  "none",
  "nor",
  "norrey",
  "north",
  "northern",
  "northman",
  "northmen",
  "nose",
  "nostrils",
  "note",
  "noted",
  "nothing",
  "notice",
  "noticed",
  "notion",
  "nowhere",
  "noye",
  "number",
  "numbers",
  "nuncle",
  "nurse",
  "nute",
  "nym",
  "nymeria",
  "oaf",
  "oak",
  "oaken",
  "oakheart",
  "oars",
  "oarsman",
  "oarsmen",
  "oath",
  "oaths",
  "obara",
  "oberyn",
  "obey",
  "objected",
  "observed",
  "odd",
  "off",
  "offer",
  "offered",
  "offering",
  "office",
  "officers",
  "oft",
  "often",
  "oil",
  "oiled",
  "old",
  "older",
  "oldest",
  "oldtown",
  "olenna",
  "once",
  "ones",
  "onion",
  "onions",
  "onto",
  "onyx",
  "open",
  "opened",
  "opening",
  "orange",
  "order",
  "ordered",
  "orders",
  "ornate",
  "orphan",
  "orton",
  "osfryd",
  "osha",
  "osmund",
  "osney",
  "othell",
  "other",
  "others",
  "otherwise",
  "ought",
  "our",
  "ours",
  "outer",
  "outlaw",
  "outlaws",
  "outriders",
  "outside",
  "overhead",
  "owe",
  "owen",
  "own",
  "owned",
  "pace",
  "paced",
  "pack",
  "packed",
  "padded",
  "page",
  "pages",
  "paid",
  "pail",
  "pain",
  "paint",
  "painted",
  "pair",
  "palace",
  "pale",
  "palfrey",
  "palm",
  "paper",
  "papers",
  "parchment",
  "pardon",
  "pardons",
  "part",
  "parted",
  "parts",
  "party",
  "pass",
  "passage",
  "passed",
  "passing",
  "past",
  "patches",
  "patchface",
  "pate",
  "path",
  "patience",
  "patient",
  "patrek",
  "paul",
  "paused",
  "pavilion",
  "paxter",
  "pay",
  "paying",
  "payne",
  "pays",
  "peace",
  "peaceful",
  "peach",
  "pearls",
  "peck",
  "peeled",
  "peered",
  "peering",
  "penny",
  "penrose",
  "pentos",
  "people",
  "pepper",
  "perchance",
  "perched",
  "perfect",
  "perhaps",
  "perished",
  "permit",
  "permitted",
  "person",
  "pet",
  "petyr",
  "pia",
  "pick",
  "picked",
  "picking",
  "pie",
  "piece",
  "pieces",
  "pies",
  "pig",
  "pigeon",
  "pigs",
  "pile",
  "piled",
  "pillars",
  "pillow",
  "pinched",
  "pine",
  "pines",
  "pink",
  "pinned",
  "pious",
  "piper",
  "pirate",
  "pirates",
  "piss",
  "pit",
  "pitch",
  "pits",
  "pity",
  "place",
  "placed",
  "places",
  "plain",
  "plainly",
  "plan",
  "plank",
  "planned",
  "plans",
  "plant",
  "planted",
  "plate",
  "platter",
  "play",
  "played",
  "playing",
  "plaza",
  "pleaded",
  "pleasant",
  "please",
  "pleased",
  "pleasure",
  "pledge",
  "pledged",
  "plucked",
  "plumm",
  "plump",
  "plunder",
  "plunged",
  "pod",
  "podrick",
  "point",
  "pointed",
  "pointing",
  "points",
  "poison",
  "poisoned",
  "poked",
  "pole",
  "poles",
  "polished",
  "politely",
  "polliver",
  "pommel",
  "pool",
  "poole",
  "pools",
  "poor",
  "poppy",
  "pork",
  "porridge",
  "port",
  "possible",
  "posted",
  "postern",
  "pot",
  "pots",
  "pounding",
  "pour",
  "poured",
  "pouring",
  "power",
  "powerful",
  "pox",
  "practice",
  "praise",
  "pray",
  "prayed",
  "prayer",
  "prayers",
  "praying",
  "precious",
  "pree",
  "prefer",
  "preferred",
  "prepared",
  "presence",
  "present",
  "presented",
  "press",
  "pressed",
  "pressing",
  "presume",
  "pretend",
  "pretty",
  "prey",
  "price",
  "pride",
  "priest",
  "priestess",
  "priests",
  "prince",
  "princes",
  "princess",
  "prisoner",
  "prisoners",
  "private",
  "privy",
  "prize",
  "probably",
  "promise",
  "promised",
  "promises",
  "proof",
  "proper",
  "prophecy",
  "prospect",
  "protect",
  "protected",
  "protector",
  "protested",
  "proud",
  "prove",
  "proved",
  "provided",
  "prow",
  "pull",
  "pulled",
  "pulling",
  "punched",
  "pup",
  "pure",
  "purple",
  "purpose",
  "purse",
  "push",
  "pushed",
  "pushing",
  "put",
  "putting",
  "pyat",
  "pycelle",
  "pyke",
  "pylos",
  "pyp",
  "pyramid",
  "pyramids",
  "pyre",
  "qarl",
  "qarth",
  "qartheen",
  "qhorin",
  "qotho",
  "quarrel",
  "quarrels",
  "quarter",
  "quarters",
  "queen",
  "queens",
  "queer",
  "quentyn",
  "question",
  "questions",
  "quick",
  "quicker",
  "quickly",
  "quiet",
  "quietly",
  "quill",
  "quite",
  "quiver",
  "qyburn",
  "rabbit",
  "raced",
  "racing",
  "radiance",
  "raff",
  "rage",
  "ragged",
  "rags",
  "raiders",
  "rail",
  "rain",
  "rainbow",
  "rains",
  "raise",
  "raised",
  "raising",
  "rakharo",
  "ralf",
  "ram",
  "ramparts",
  "ramsay",
  "ran",
  "randyll",
  "rang",
  "ranger",
  "rangers",
  "ranging",
  "rank",
  "ranks",
  "ransom",
  "rare",
  "rat",
  "rather",
  "rats",
  "rattle",
  "rattled",
  "rattling",
  "raven",
  "ravens",
  "raw",
  "rayder",
  "raymun",
  "razor",
  "reach",
  "reached",
  "reaching",
  "read",
  "reading",
  "ready",
  "real",
  "realize",
  "realized",
  "really",
  "realm",
  "rear",
  "reared",
  "reason",
  "reasons",
  "rebellion",
  "recall",
  "recalled",
  "received",
  "red",
  "reddened",
  "redfort",
  "redwyne",
  "reed",
  "reeds",
  "reek",
  "reflected",
  "refuge",
  "refuse",
  "refused",
  "regarded",
  "regent",
  "reign",
  "reined",
  "reins",
  "release",
  "relief",
  "relieved",
  "remain",
  "remained",
  "remains",
  "remember",
  "remind",
  "reminded",
  "remnants",
  "remove",
  "removed",
  "renly",
  "repeated",
  "replaced",
  "replied",
  "reply",
  "report",
  "reported",
  "reports",
  "require",
  "required",
  "requires",
  "rescue",
  "respect",
  "rest",
  "rested",
  "restless",
  "restore",
  "resumed",
  "return",
  "returned",
  "returning",
  "returns",
  "reward",
  "reznak",
  "rhaegal",
  "rhaegar",
  "rhaenys",
  "rhoyne",
  "ribs",
  "rich",
  "rickard",
  "rickon",
  "rid",
  "ridden",
  "ride",
  "rider",
  "riders",
  "rides",
  "ridge",
  "riding",
  "right",
  "rightful",
  "rights",
  "ring",
  "ringing",
  "ringmail",
  "rings",
  "rip",
  "ripe",
  "ripped",
  "ripping",
  "rippling",
  "rise",
  "rising",
  "risk",
  "river",
  "riverrun",
  "rivers",
  "road",
  "roads",
  "roar",
  "roared",
  "roaring",
  "roast",
  "roasted",
  "robar",
  "robb",
  "robe",
  "robert",
  "robes",
  "robett",
  "robin",
  "rock",
  "rocks",
  "rode",
  "rodrik",
  "roll",
  "rolled",
  "rolling",
  "ronnet",
  "roof",
  "roofs",
  "rookery",
  "room",
  "rooms",
  "roose",
  "root",
  "roots",
  "rope",
  "ropes",
  "rorge",
  "rosby",
  "rose",
  "roses",
  "roslin",
  "rot",
  "rotted",
  "rotten",
  "rotting",
  "rough",
  "roughspun",
  "round",
  "rounded",
  "row",
  "rowan",
  "rows",
  "royal",
  "royce",
  "rubbed",
  "rubies",
  "ruby",
  "ruddy",
  "ruin",
  "ruined",
  "ruins",
  "rule",
  "ruled",
  "rules",
  "run",
  "running",
  "runs",
  "rush",
  "rushed",
  "rushes",
  "rushing",
  "rust",
  "rusted",
  "rustling",
  "ryman",
  "ryswell",
  "saan",
  "sack",
  "sacred",
  "sacrifice",
  "sad",
  "saddle",
  "sadly",
  "safe",
  "safely",
  "safer",
  "safety",
  "sail",
  "sailed",
  "sailing",
  "sailor",
  "sailors",
  "sails",
  "sake",
  "salladhor",
  "salt",
  "saltpans",
  "salty",
  "sam",
  "same",
  "samwell",
  "sand",
  "sandals",
  "sandor",
  "sands",
  "sang",
  "sank",
  "sansa",
  "sat",
  "satin",
  "sausage",
  "savage",
  "savages",
  "save",
  "saved",
  "saw",
  "say",
  "saying",
  "says",
  "scabbard",
  "scales",
  "scar",
  "scarce",
  "scarcely",
  "scared",
  "scarlet",
  "scarred",
  "scars",
  "scattered",
  "scent",
  "scorched",
  "score",
  "scouts",
  "scowled",
  "scrambled",
  "scrape",
  "scraped",
  "scratched",
  "scrawny",
  "scream",
  "screamed",
  "screaming",
  "screams",
  "scrolls",
  "scrubbed",
  "sea",
  "seagard",
  "seal",
  "sealed",
  "seals",
  "search",
  "searched",
  "searching",
  "seas",
  "seasoned",
  "seastone",
  "seat",
  "seated",
  "seaworth",
  "second",
  "secret",
  "secrets",
  "seed",
  "seeing",
  "seek",
  "seem",
  "seemed",
  "seems",
  "seen",
  "sees",
  "seize",
  "seized",
  "seldom",
  "sell",
  "selling",
  "sellsword",
  "selmy",
  "selyse",
  "send",
  "sending",
  "sends",
  "seneschal",
  "sense",
  "sent",
  "sentinels",
  "sentries",
  "sept",
  "septa",
  "septon",
  "septons",
  "ser",
  "serjeant",
  "servant",
  "servants",
  "serve",
  "served",
  "serves",
  "service",
  "serving",
  "set",
  "setting",
  "settle",
  "settled",
  "seven",
  "seventeen",
  "seventy",
  "several",
  "sewn",
  "shade",
  "shadow",
  "shadowcat",
  "shadows",
  "shae",
  "shaft",
  "shafts",
  "shagga",
  "shaggy",
  "shaggydog",
  "shagwell",
  "shake",
  "shaking",
  "shall",
  "shallow",
  "shame",
  "shamed",
  "shape",
  "shaped",
  "shapes",
  "share",
  "shared",
  "sharp",
  "sharpened",
  "sharply",
  "shattered",
  "shaved",
  "shavepate",
  "sheath",
  "sheathed",
  "shed",
  "sheep",
  "sheet",
  "shell",
  "shelter",
  "shield",
  "shields",
  "shift",
  "shifted",
  "shifting",
  "shimmered",
  "shining",
  "shiny",
  "ship",
  "ships",
  "shireen",
  "shirt",
  "shiver",
  "shivered",
  "shivering",
  "shock",
  "shocked",
  "shone",
  "shook",
  "shops",
  "shore",
  "shores",
  "short",
  "shorter",
  "shot",
  "should",
  "shoulder",
  "shoulders",
  "shouldn",
  "shout",
  "shouted",
  "shouting",
  "shouts",
  "shove",
  "shoved",
  "shoving",
  "show",
  "showed",
  "showing",
  "shown",
  "shriek",
  "shrieked",
  "shrieking",
  "shrug",
  "shrugged",
  "shuddered",
  "shuffled",
  "shut",
  "shutters",
  "shy",
  "siblings",
  "sick",
  "sickly",
  "side",
  "sides",
  "sideways",
  "siege",
  "sighed",
  "sight",
  "sigil",
  "sign",
  "signed",
  "signs",
  "silence",
  "silent",
  "silently",
  "silk",
  "silken",
  "silks",
  "silly",
  "silver",
  "silvery",
  "simple",
  "simply",
  "sin",
  "since",
  "sing",
  "singer",
  "singers",
  "singing",
  "single",
  "sins",
  "sip",
  "sipped",
  "sire",
  "sister",
  "sisters",
  "sit",
  "sits",
  "sitting",
  "six",
  "sixteen",
  "sixty",
  "size",
  "skahaz",
  "skill",
  "skin",
  "skinned",
  "skinny",
  "skins",
  "skirling",
  "skirts",
  "skull",
  "skulls",
  "sky",
  "slain",
  "slammed",
  "slap",
  "slapped",
  "slash",
  "slashed",
  "slashing",
  "slate",
  "slaughter",
  "slave",
  "slaver",
  "slavers",
  "slaves",
  "slay",
  "slayer",
  "sleep",
  "sleeping",
  "sleeve",
  "sleeves",
  "slender",
  "slept",
  "slew",
  "slice",
  "slick",
  "slid",
  "sliding",
  "slight",
  "slim",
  "slip",
  "slipped",
  "slipping",
  "slit",
  "slope",
  "slow",
  "slowly",
  "slung",
  "sly",
  "slynt",
  "small",
  "smaller",
  "smallfolk",
  "smallwood",
  "smash",
  "smashed",
  "smell",
  "smelled",
  "smelling",
  "smells",
  "smile",
  "smiled",
  "smiles",
  "smiling",
  "smith",
  "smoke",
  "smoking",
  "smooth",
  "smuggler",
  "snake",
  "snakes",
  "snapped",
  "snapping",
  "snarling",
  "snatched",
  "sniffed",
  "sniffing",
  "snorted",
  "snow",
  "snows",
  "snowy",
  "soaked",
  "sobbed",
  "sobbing",
  "sodden",
  "soft",
  "softly",
  "soil",
  "soiled",
  "solar",
  "sold",
  "soldier",
  "soldiers",
  "solemn",
  "solemnly",
  "solid",
  "somehow",
  "someone",
  "something",
  "sometimes",
  "somewhat",
  "somewhere",
  "son",
  "song",
  "songs",
  "sons",
  "soon",
  "sooner",
  "sorcery",
  "sore",
  "sorry",
  "sort",
  "sorts",
  "sought",
  "soul",
  "sound",
  "sounded",
  "sounds",
  "soup",
  "sour",
  "south",
  "southron",
  "sow",
  "spare",
  "spared",
  "sparrow",
  "sparrows",
  "spat",
  "speak",
  "speaking",
  "speaks",
  "spear",
  "spearmen",
  "spears",
  "special",
  "speech",
  "speed",
  "spells",
  "spend",
  "spent",
  "spices",
  "spider",
  "spied",
  "spike",
  "spiked",
  "spikes",
  "spilled",
  "spilling",
  "spinning",
  "spirits",
  "spit",
  "splash",
  "splashed",
  "splashing",
  "splendid",
  "splinters",
  "split",
  "spoke",
  "spoken",
  "spoon",
  "spot",
  "spotted",
  "sprawled",
  "spray",
  "spread",
  "spreading",
  "spring",
  "sprouted",
  "spun",
  "spurred",
  "square",
  "squat",
  "squeeze",
  "squeezed",
  "squinted",
  "squire",
  "squires",
  "squirmed",
  "squirrel",
  "stab",
  "stabbed",
  "stable",
  "stableboy",
  "stables",
  "staff",
  "stafford",
  "stag",
  "staggered",
  "stained",
  "stair",
  "stairs",
  "stakes",
  "stale",
  "stalked",
  "stallion",
  "stand",
  "standard",
  "standing",
  "stands",
  "stank",
  "stannis",
  "star",
  "stare",
  "stared",
  "staring",
  "stark",
  "starks",
  "stars",
  "start",
  "started",
  "starting",
  "startled",
  "starve",
  "starved",
  "starving",
  "statue",
  "stay",
  "stayed",
  "steady",
  "steal",
  "stealing",
  "steam",
  "steaming",
  "steel",
  "steep",
  "steffon",
  "stench",
  "step",
  "stepped",
  "steps",
  "stern",
  "stevron",
  "stew",
  "steward",
  "stewards",
  "stick",
  "stiff",
  "stiffly",
  "still",
  "stink",
  "stinking",
  "stir",
  "stirred",
  "stirring",
  "stole",
  "stolen",
  "stomach",
  "stone",
  "stones",
  "stony",
  "stood",
  "stool",
  "stop",
  "stopped",
  "stories",
  "storm",
  "storms",
  "story",
  "stout",
  "straight",
  "strand",
  "strange",
  "strangely",
  "stranger",
  "strangers",
  "strapped",
  "straw",
  "stream",
  "streamed",
  "streaming",
  "streams",
  "street",
  "streets",
  "strength",
  "stretch",
  "stretched",
  "strewn",
  "strike",
  "string",
  "strings",
  "strip",
  "striped",
  "stripped",
  "strode",
  "stroke",
  "stroked",
  "strong",
  "stronger",
  "struck",
  "struggle",
  "struggled",
  "stubborn",
  "stuck",
  "studded",
  "studied",
  "stuff",
  "stuffed",
  "stumbled",
  "stumbling",
  "stump",
  "stunted",
  "stupid",
  "styr",
  "subject",
  "such",
  "suck",
  "sucked",
  "sucking",
  "sudden",
  "suddenly",
  "suffer",
  "suffered",
  "suffice",
  "suggest",
  "suggested",
  "suit",
  "suited",
  "sullen",
  "summer",
  "summon",
  "summoned",
  "sun",
  "sunk",
  "sunlight",
  "sunset",
  "sunspear",
  "supper",
  "support",
  "suppose",
  "supposed",
  "surcoat",
  "sure",
  "surely",
  "surface",
  "surprise",
  "surprised",
  "survive",
  "survived",
  "survivors",
  "suspected",
  "suspicion",
  "swallow",
  "swallowed",
  "swam",
  "swann",
  "sway",
  "swayed",
  "swaying",
  "swear",
  "swears",
  "sweat",
  "sweet",
  "sweeter",
  "sweetling",
  "sweets",
  "swept",
  "swift",
  "swiftly",
  "swim",
  "swing",
  "swinging",
  "swirled",
  "swirling",
  "swollen",
  "sword",
  "swordbelt",
  "swords",
  "swore",
  "sworn",
  "swung",
  "swyft",
  "symon",
  "syrio",
  "table",
  "tables",
  "taena",
  "tail",
  "take",
  "taken",
  "takes",
  "taking",
  "tale",
  "tales",
  "talk",
  "talked",
  "talking",
  "tall",
  "taller",
  "tallhart",
  "tanda",
  "tangle",
  "tangled",
  "tankard",
  "targaryen",
  "tarly",
  "tarth",
  "task",
  "taste",
  "tasted",
  "tattered",
  "taught",
  "teach",
  "tear",
  "tearing",
  "tears",
  "teats",
  "teeth",
  "tell",
  "telling",
  "tells",
  "temper",
  "temple",
  "temples",
  "ten",
  "tend",
  "tender",
  "tent",
  "tents",
  "terms",
  "terrace",
  "terrible",
  "terrified",
  "terror",
  "terrors",
  "than",
  "thank",
  "thanked",
  "thanks",
  "theirs",
  "thenn",
  "thenns",
  "theon",
  "these",
  "thick",
  "thicker",
  "thief",
  "thieves",
  "thigh",
  "thighs",
  "thin",
  "thing",
  "things",
  "thinking",
  "thinks",
  "third",
  "thirst",
  "thirteen",
  "thirty",
  "thoren",
  "thorne",
  "thorns",
  "thoros",
  "those",
  "though",
  "thought",
  "thoughts",
  "thousand",
  "thousands",
  "thread",
  "threat",
  "threaten",
  "threats",
  "three",
  "threw",
  "thrice",
  "throat",
  "throats",
  "throbbing",
  "throne",
  "thrones",
  "through",
  "throw",
  "throwing",
  "thrown",
  "thrust",
  "thumb",
  "thunder",
  "tickler",
  "tide",
  "tidings",
  "tied",
  "tight",
  "tightened",
  "tightly",
  "till",
  "times",
  "timett",
  "tiny",
  "tired",
  "titan",
  "toad",
  "today",
  "toe",
  "toes",
  "together",
  "tokar",
  "token",
  "told",
  "tollett",
  "tom",
  "tommen",
  "tone",
  "tongue",
  "tongues",
  "tonight",
  "too",
  "took",
  "tooth",
  "top",
  "torch",
  "torches",
  "tore",
  "tormund",
  "torn",
  "torrhen",
  "tossed",
  "touch",
  "touched",
  "touching",
  "tourney",
  "toward",
  "tower",
  "towering",
  "towers",
  "town",
  "towns",
  "trade",
  "trader",
  "trading",
  "trail",
  "trailed",
  "train",
  "trained",
  "training",
  "traitor",
  "traitors",
  "trant",
  "trap",
  "trapped",
  "travel",
  "treachery",
  "treason",
  "treasures",
  "treat",
  "treated",
  "tree",
  "trees",
  "trembled",
  "trembling",
  "trial",
  "trick",
  "trident",
  "tried",
  "trimmed",
  "tris",
  "trotted",
  "trouble",
  "troubled",
  "trout",
  "true",
  "trueborn",
  "truly",
  "trumpets",
  "trunk",
  "trust",
  "trusted",
  "truth",
  "try",
  "trying",
  "trystane",
  "tub",
  "tucked",
  "tugged",
  "tully",
  "tullys",
  "tumbled",
  "tunic",
  "tunnel",
  "tunnels",
  "turn",
  "turncloak",
  "turned",
  "turning",
  "turnips",
  "turns",
  "turtle",
  "tutor",
  "twelve",
  "twenty",
  "twice",
  "twin",
  "twins",
  "twist",
  "twisted",
  "twisting",
  "twitched",
  "tyene",
  "tyrell",
  "tyrells",
  "tyrion",
  "tyrosh",
  "tyroshi",
  "tysha",
  "tytos",
  "tywin",
  "ugly",
  "umber",
  "unawares",
  "uncertain",
  "uncle",
  "uncles",
  "under",
  "underfoot",
  "undying",
  "uneasy",
  "unella",
  "unless",
  "unlike",
  "unseen",
  "unsullied",
  "until",
  "upon",
  "upper",
  "upward",
  "urged",
  "urswyck",
  "use",
  "used",
  "useful",
  "useless",
  "using",
  "usual",
  "usurper",
  "utterly",
  "vaes",
  "vain",
  "val",
  "valar",
  "vale",
  "valiant",
  "valley",
  "valor",
  "valyria",
  "valyrian",
  "van",
  "vance",
  "vanished",
  "varamyr",
  "vardis",
  "vargo",
  "varys",
  "vast",
  "vault",
  "vaulted",
  "vaults",
  "veil",
  "veins",
  "velvet",
  "vengeance",
  "vest",
  "victarion",
  "victory",
  "view",
  "vile",
  "village",
  "villages",
  "violently",
  "viper",
  "viserion",
  "viserys",
  "visible",
  "vision",
  "visit",
  "visited",
  "visitors",
  "visor",
  "voice",
  "voices",
  "volantene",
  "volantis",
  "vow",
  "vowed",
  "vows",
  "voyage",
  "vyman",
  "waddled",
  "wager",
  "wagon",
  "wagons",
  "waif",
  "wailing",
  "waist",
  "wait",
  "waited",
  "waiting",
  "wake",
  "waking",
  "walda",
  "walder",
  "walders",
  "walk",
  "walked",
  "walking",
  "wall",
  "walls",
  "walton",
  "wandered",
  "wandering",
  "want",
  "wanted",
  "wanting",
  "wants",
  "war",
  "ward",
  "warden",
  "warg",
  "warhammer",
  "warhorn",
  "warhorns",
  "warily",
  "warlocks",
  "warm",
  "warmer",
  "warmth",
  "warn",
  "warned",
  "warning",
  "warrior",
  "warriors",
  "wars",
  "warships",
  "wary",
  "wash",
  "washed",
  "washing",
  "wasn",
  "waste",
  "wasted",
  "watch",
  "watched",
  "watching",
  "water",
  "watered",
  "waters",
  "watery",
  "wave",
  "waved",
  "waves",
  "waving",
  "wax",
  "way",
  "waymar",
  "wayn",
  "wayns",
  "waynwood",
  "ways",
  "weak",
  "weakness",
  "wealth",
  "weapon",
  "weapons",
  "wear",
  "wearing",
  "wears",
  "weary",
  "weasel",
  "wed",
  "wedding",
  "weeds",
  "weep",
  "weeper",
  "weeping",
  "weese",
  "weight",
  "weirwood",
  "weirwoods",
  "welcome",
  "welcomed",
  "wench",
  "wendel",
  "went",
  "wept",
  "weren",
  "west",
  "western",
  "westeros",
  "westerosi",
  "wet",
  "wex",
  "whatever",
  "wheel",
  "wheeled",
  "wheels",
  "whenever",
  "whent",
  "where",
  "wherever",
  "whether",
  "while",
  "whilst",
  "whip",
  "whipped",
  "whirled",
  "whiskers",
  "whisper",
  "whispered",
  "whispers",
  "whistled",
  "white",
  "whoever",
  "whole",
  "whom",
  "whose",
  "why",
  "wicked",
  "wide",
  "widow",
  "wife",
  "wight",
  "wights",
  "wild",
  "wildfire",
  "wildling",
  "wildlings",
  "wildly",
  "willas",
  "willem",
  "willing",
  "willow",
  "win",
  "winch",
  "wind",
  "windblown",
  "winding",
  "window",
  "windows",
  "winds",
  "wine",
  "wing",
  "wings",
  "winning",
  "winter",
  "wiped",
  "wisdom",
  "wise",
  "wiser",
  "wish",
  "wished",
  "wishes",
  "wishing",
  "wisps",
  "wit",
  "witch",
  "withered",
  "within",
  "without",
  "witness",
  "wits",
  "wives",
  "wizard",
  "woke",
  "woken",
  "wolf",
  "wolfswood",
  "wolves",
  "woman",
  "womb",
  "women",
  "won",
  "wonder",
  "wondered",
  "wondering",
  "wood",
  "wooden",
  "woodharp",
  "woods",
  "wool",
  "woolen",
  "word",
  "wordless",
  "words",
  "wore",
  "work",
  "worked",
  "working",
  "world",
  "worm",
  "worms",
  "worn",
  "worse",
  "worship",
  "worst",
  "worth",
  "worthy",
  "wouldn",
  "wound",
  "wounded",
  "wounds",
  "woven",
  "wrapped",
  "wrath",
  "wrenched",
  "wretched",
  "wrinkled",
  "wrist",
  "wrists",
  "write",
  "writing",
  "written",
  "wrong",
  "wrote",
  "wroth",
  "wrought",
  "wun",
  "wyk",
  "wylis",
  "wyman",
  "xaro",
  "xho",
  "xhoan",
  "xhondo",
  "yandry",
  "yanked",
  "yard",
  "yards",
  "yarwyck",
  "year",
  "years",
  "yellow",
  "yes",
  "yesterday",
  "yet",
  "yezzan",
  "ygritte",
  "yield",
  "yielded",
  "yohn",
  "yollo",
  "yoren",
  "young",
  "younger",
  "youngest",
  "yours",
  "yourself",
  "youth",
  "yronwood",
  "ysilla",
  "yunkai",
  "yunkish"
];

// src/utils.js
var randInt = (h, l = 0) => {
  return l + Math.floor(Math.random() * h);
};
var randomChoice = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
var upperFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
var range = (n) => {
  return [...Array(n).keys()];
};
var generatePhrase = (n, wordList, type = "words") => {
  const phrase = range(n).map((i) => {
    if (type === "words" || i % 2 === 0) {
      return randomChoice(wordList);
    } else {
      return randInt(9999);
    }
  });
  return phrase.join(" ");
};
var generatePhrases = (count, phraseLength, wordList, passType) => {
  const phrases = range(count).map((i) => {
    return generatePhrase(phraseLength, wordList, passType);
  });
  return phrases;
};

// node_modules/commander/esm.mjs
var import__ = __toESM(require_commander(), 1);
var {
  program,
  createCommand,
  createArgument,
  createOption,
  CommanderError,
  InvalidArgumentError,
  InvalidOptionArgumentError,
  Command,
  Argument,
  Option,
  Help
} = import__.default;

// src/index.js
var helpText = `

Example call:
  $ wicked-pw -mus -n2
  friends 1394 boys 4560 gift     =>   Friends1394boys4560gift#
  jonos 3715 log 3979 selling     =>   Jonos3715log3979selling#

Statistics:
  4087 words in dictionary
  5 words ->  1.14 x 10^18 
  4 words ->  2.79 x 10^14
  3 words ->  6.83 x 10^10
`;
program.option("-m, --mixed", "Use mix of words and numbers", false).option("-n, --num <number>", "Number of phrases to create", "5").option("-l, --len <number>", "Length of each phrase", "5").option("-s, --symbol", "Include a special character (#)", false).option("-u, --upper", "Include an uppercase letter", false).addHelpText("after", helpText);
program.parse();
var run = () => {
  const options = program.opts();
  const phrases = generatePhrases(parseInt(options.num), parseInt(options.len), got_long_words_default, options.mixed ? "mixed" : "words");
  let longest = Math.max(...phrases.map((phrase) => phrase.length));
  console.log("=".repeat(65));
  phrases.forEach((p) => {
    const specialCharacter = options.symbol ? "#" : "";
    let pastablePhrase = p.replace(/\s/g, "");
    if (options.symbol) {
      pastablePhrase = pastablePhrase + "#";
    }
    if (options.upper) {
      pastablePhrase = upperFirst(pastablePhrase);
    }
    console.log(`${p.padEnd(longest + 4)} =>   ${pastablePhrase}`);
  });
  console.log("=".repeat(65));
  return phrases;
};
if (import.meta.main) {
  run();
}
