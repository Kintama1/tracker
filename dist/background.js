/* -------------------------------------------------- */
/*      Start of Webpack Hot Extension Middleware     */
/* ================================================== */
/*  This will be converted into a lodash templ., any  */
/*  external argument must be provided using it       */
/* -------------------------------------------------- */
(function () {
  (function () {
    ""||(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("webextension-polyfill", ["module"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.browser = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (module) {
  /* webextension-polyfill - v0.12.0 - Tue May 14 2024 18:01:29 */
  /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */
  /* vim: set sts=2 sw=2 et tw=80: */
  /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
  "use strict";

  if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id)) {
    throw new Error("This script should only be loaded in a browser extension.");
  }
  if (!(globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)) {
    const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";

    // Wrapping the bulk of this polyfill in a one-time-use function is a minor
    // optimization for Firefox. Since Spidermonkey does not fully parse the
    // contents of a function until the first time it's called, and since it will
    // never actually need to be called, this allows the polyfill to be included
    // in Firefox nearly for free.
    const wrapAPIs = extensionAPIs => {
      // NOTE: apiMetadata is associated to the content of the api-metadata.json file
      // at build time by replacing the following "include" with the content of the
      // JSON file.
      const apiMetadata = {
        "alarms": {
          "clear": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "clearAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "get": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "bookmarks": {
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getChildren": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getRecent": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getSubTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTree": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "browserAction": {
          "disable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "enable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "getBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getBadgeText": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "openPopup": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setBadgeText": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "browsingData": {
          "remove": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "removeCache": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCookies": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeDownloads": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFormData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeHistory": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeLocalStorage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePasswords": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePluginData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "settings": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "commands": {
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "contextMenus": {
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "cookies": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAllCookieStores": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "set": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "devtools": {
          "inspectedWindow": {
            "eval": {
              "minArgs": 1,
              "maxArgs": 2,
              "singleCallbackArg": false
            }
          },
          "panels": {
            "create": {
              "minArgs": 3,
              "maxArgs": 3,
              "singleCallbackArg": true
            },
            "elements": {
              "createSidebarPane": {
                "minArgs": 1,
                "maxArgs": 1
              }
            }
          }
        },
        "downloads": {
          "cancel": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "download": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "erase": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFileIcon": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "open": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "pause": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFile": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "resume": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "extension": {
          "isAllowedFileSchemeAccess": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "isAllowedIncognitoAccess": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "history": {
          "addUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "deleteRange": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getVisits": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "i18n": {
          "detectLanguage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAcceptLanguages": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "identity": {
          "launchWebAuthFlow": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "idle": {
          "queryState": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "management": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getSelf": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setEnabled": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "uninstallSelf": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "notifications": {
          "clear": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPermissionLevel": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "pageAction": {
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "hide": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "permissions": {
          "contains": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "request": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "runtime": {
          "getBackgroundPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPlatformInfo": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "openOptionsPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "requestUpdateCheck": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "sendMessage": {
            "minArgs": 1,
            "maxArgs": 3
          },
          "sendNativeMessage": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "setUninstallURL": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "sessions": {
          "getDevices": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getRecentlyClosed": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "restore": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "storage": {
          "local": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "managed": {
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            }
          },
          "sync": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          }
        },
        "tabs": {
          "captureVisibleTab": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "detectLanguage": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "discard": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "duplicate": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "executeScript": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getZoom": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getZoomSettings": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goBack": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goForward": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "highlight": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "insertCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "query": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "reload": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "sendMessage": {
            "minArgs": 2,
            "maxArgs": 3
          },
          "setZoom": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "setZoomSettings": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "update": {
            "minArgs": 1,
            "maxArgs": 2
          }
        },
        "topSites": {
          "get": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "webNavigation": {
          "getAllFrames": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFrame": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "webRequest": {
          "handlerBehaviorChanged": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "windows": {
          "create": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getLastFocused": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        }
      };
      if (Object.keys(apiMetadata).length === 0) {
        throw new Error("api-metadata.json has not been included in browser-polyfill");
      }

      /**
       * A WeakMap subclass which creates and stores a value for any key which does
       * not exist when accessed, but behaves exactly as an ordinary WeakMap
       * otherwise.
       *
       * @param {function} createItem
       *        A function which will be called in order to create the value for any
       *        key which does not exist, the first time it is accessed. The
       *        function receives, as its only argument, the key being created.
       */
      class DefaultWeakMap extends WeakMap {
        constructor(createItem, items = undefined) {
          super(items);
          this.createItem = createItem;
        }
        get(key) {
          if (!this.has(key)) {
            this.set(key, this.createItem(key));
          }
          return super.get(key);
        }
      }

      /**
       * Returns true if the given object is an object with a `then` method, and can
       * therefore be assumed to behave as a Promise.
       *
       * @param {*} value The value to test.
       * @returns {boolean} True if the value is thenable.
       */
      const isThenable = value => {
        return value && typeof value === "object" && typeof value.then === "function";
      };

      /**
       * Creates and returns a function which, when called, will resolve or reject
       * the given promise based on how it is called:
       *
       * - If, when called, `chrome.runtime.lastError` contains a non-null object,
       *   the promise is rejected with that value.
       * - If the function is called with exactly one argument, the promise is
       *   resolved to that value.
       * - Otherwise, the promise is resolved to an array containing all of the
       *   function's arguments.
       *
       * @param {object} promise
       *        An object containing the resolution and rejection functions of a
       *        promise.
       * @param {function} promise.resolve
       *        The promise's resolution function.
       * @param {function} promise.reject
       *        The promise's rejection function.
       * @param {object} metadata
       *        Metadata about the wrapped method which has created the callback.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function}
       *        The generated callback function.
       */
      const makeCallback = (promise, metadata) => {
        return (...callbackArgs) => {
          if (extensionAPIs.runtime.lastError) {
            promise.reject(new Error(extensionAPIs.runtime.lastError.message));
          } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
            promise.resolve(callbackArgs[0]);
          } else {
            promise.resolve(callbackArgs);
          }
        };
      };
      const pluralizeArguments = numArgs => numArgs == 1 ? "argument" : "arguments";

      /**
       * Creates a wrapper function for a method with the given name and metadata.
       *
       * @param {string} name
       *        The name of the method which is being wrapped.
       * @param {object} metadata
       *        Metadata about the method being wrapped.
       * @param {integer} metadata.minArgs
       *        The minimum number of arguments which must be passed to the
       *        function. If called with fewer than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxArgs
       *        The maximum number of arguments which may be passed to the
       *        function. If called with more than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function(object, ...*)}
       *       The generated wrapper function.
       */
      const wrapAsyncFunction = (name, metadata) => {
        return function asyncFunctionWrapper(target, ...args) {
          if (args.length < metadata.minArgs) {
            throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
          }
          if (args.length > metadata.maxArgs) {
            throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
          }
          return new Promise((resolve, reject) => {
            if (metadata.fallbackToNoCallback) {
              // This API method has currently no callback on Chrome, but it return a promise on Firefox,
              // and so the polyfill will try to call it with a callback first, and it will fallback
              // to not passing the callback if the first call fails.
              try {
                target[name](...args, makeCallback({
                  resolve,
                  reject
                }, metadata));
              } catch (cbError) {
                console.warn(`${name} API method doesn't seem to support the callback parameter, ` + "falling back to call it without a callback: ", cbError);
                target[name](...args);

                // Update the API method metadata, so that the next API calls will not try to
                // use the unsupported callback anymore.
                metadata.fallbackToNoCallback = false;
                metadata.noCallback = true;
                resolve();
              }
            } else if (metadata.noCallback) {
              target[name](...args);
              resolve();
            } else {
              target[name](...args, makeCallback({
                resolve,
                reject
              }, metadata));
            }
          });
        };
      };

      /**
       * Wraps an existing method of the target object, so that calls to it are
       * intercepted by the given wrapper function. The wrapper function receives,
       * as its first argument, the original `target` object, followed by each of
       * the arguments passed to the original method.
       *
       * @param {object} target
       *        The original target object that the wrapped method belongs to.
       * @param {function} method
       *        The method being wrapped. This is used as the target of the Proxy
       *        object which is created to wrap the method.
       * @param {function} wrapper
       *        The wrapper function which is called in place of a direct invocation
       *        of the wrapped method.
       *
       * @returns {Proxy<function>}
       *        A Proxy object for the given method, which invokes the given wrapper
       *        method in its place.
       */
      const wrapMethod = (target, method, wrapper) => {
        return new Proxy(method, {
          apply(targetMethod, thisObj, args) {
            return wrapper.call(thisObj, target, ...args);
          }
        });
      };
      let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);

      /**
       * Wraps an object in a Proxy which intercepts and wraps certain methods
       * based on the given `wrappers` and `metadata` objects.
       *
       * @param {object} target
       *        The target object to wrap.
       *
       * @param {object} [wrappers = {}]
       *        An object tree containing wrapper functions for special cases. Any
       *        function present in this object tree is called in place of the
       *        method in the same location in the `target` object tree. These
       *        wrapper methods are invoked as described in {@see wrapMethod}.
       *
       * @param {object} [metadata = {}]
       *        An object tree containing metadata used to automatically generate
       *        Promise-based wrapper functions for asynchronous. Any function in
       *        the `target` object tree which has a corresponding metadata object
       *        in the same location in the `metadata` tree is replaced with an
       *        automatically-generated wrapper function, as described in
       *        {@see wrapAsyncFunction}
       *
       * @returns {Proxy<object>}
       */
      const wrapObject = (target, wrappers = {}, metadata = {}) => {
        let cache = Object.create(null);
        let handlers = {
          has(proxyTarget, prop) {
            return prop in target || prop in cache;
          },
          get(proxyTarget, prop, receiver) {
            if (prop in cache) {
              return cache[prop];
            }
            if (!(prop in target)) {
              return undefined;
            }
            let value = target[prop];
            if (typeof value === "function") {
              // This is a method on the underlying object. Check if we need to do
              // any wrapping.

              if (typeof wrappers[prop] === "function") {
                // We have a special-case wrapper for this method.
                value = wrapMethod(target, target[prop], wrappers[prop]);
              } else if (hasOwnProperty(metadata, prop)) {
                // This is an async method that we have metadata for. Create a
                // Promise wrapper for it.
                let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                value = wrapMethod(target, target[prop], wrapper);
              } else {
                // This is a method that we don't know or care about. Return the
                // original method, bound to the underlying object.
                value = value.bind(target);
              }
            } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
              // This is an object that we need to do some wrapping for the children
              // of. Create a sub-object wrapper for it with the appropriate child
              // metadata.
              value = wrapObject(value, wrappers[prop], metadata[prop]);
            } else if (hasOwnProperty(metadata, "*")) {
              // Wrap all properties in * namespace.
              value = wrapObject(value, wrappers[prop], metadata["*"]);
            } else {
              // We don't need to do any wrapping for this property,
              // so just forward all access to the underlying object.
              Object.defineProperty(cache, prop, {
                configurable: true,
                enumerable: true,
                get() {
                  return target[prop];
                },
                set(value) {
                  target[prop] = value;
                }
              });
              return value;
            }
            cache[prop] = value;
            return value;
          },
          set(proxyTarget, prop, value, receiver) {
            if (prop in cache) {
              cache[prop] = value;
            } else {
              target[prop] = value;
            }
            return true;
          },
          defineProperty(proxyTarget, prop, desc) {
            return Reflect.defineProperty(cache, prop, desc);
          },
          deleteProperty(proxyTarget, prop) {
            return Reflect.deleteProperty(cache, prop);
          }
        };

        // Per contract of the Proxy API, the "get" proxy handler must return the
        // original value of the target if that value is declared read-only and
        // non-configurable. For this reason, we create an object with the
        // prototype set to `target` instead of using `target` directly.
        // Otherwise we cannot return a custom object for APIs that
        // are declared read-only and non-configurable, such as `chrome.devtools`.
        //
        // The proxy handlers themselves will still use the original `target`
        // instead of the `proxyTarget`, so that the methods and properties are
        // dereferenced via the original targets.
        let proxyTarget = Object.create(target);
        return new Proxy(proxyTarget, handlers);
      };

      /**
       * Creates a set of wrapper functions for an event object, which handles
       * wrapping of listener functions that those messages are passed.
       *
       * A single wrapper is created for each listener function, and stored in a
       * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
       * retrieve the original wrapper, so that  attempts to remove a
       * previously-added listener work as expected.
       *
       * @param {DefaultWeakMap<function, function>} wrapperMap
       *        A DefaultWeakMap object which will create the appropriate wrapper
       *        for a given listener function when one does not exist, and retrieve
       *        an existing one when it does.
       *
       * @returns {object}
       */
      const wrapEvent = wrapperMap => ({
        addListener(target, listener, ...args) {
          target.addListener(wrapperMap.get(listener), ...args);
        },
        hasListener(target, listener) {
          return target.hasListener(wrapperMap.get(listener));
        },
        removeListener(target, listener) {
          target.removeListener(wrapperMap.get(listener));
        }
      });
      const onRequestFinishedWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }

        /**
         * Wraps an onRequestFinished listener function so that it will return a
         * `getContent()` property which returns a `Promise` rather than using a
         * callback API.
         *
         * @param {object} req
         *        The HAR entry object representing the network request.
         */
        return function onRequestFinished(req) {
          const wrappedReq = wrapObject(req, {} /* wrappers */, {
            getContent: {
              minArgs: 0,
              maxArgs: 0
            }
          });
          listener(wrappedReq);
        };
      });
      const onMessageWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }

        /**
         * Wraps a message listener function so that it may send responses based on
         * its return value, rather than by returning a sentinel value and calling a
         * callback. If the listener function returns a Promise, the response is
         * sent when the promise either resolves or rejects.
         *
         * @param {*} message
         *        The message sent by the other end of the channel.
         * @param {object} sender
         *        Details about the sender of the message.
         * @param {function(*)} sendResponse
         *        A callback which, when called with an arbitrary argument, sends
         *        that value as a response.
         * @returns {boolean}
         *        True if the wrapped listener returned a Promise, which will later
         *        yield a response. False otherwise.
         */
        return function onMessage(message, sender, sendResponse) {
          let didCallSendResponse = false;
          let wrappedSendResponse;
          let sendResponsePromise = new Promise(resolve => {
            wrappedSendResponse = function (response) {
              didCallSendResponse = true;
              resolve(response);
            };
          });
          let result;
          try {
            result = listener(message, sender, wrappedSendResponse);
          } catch (err) {
            result = Promise.reject(err);
          }
          const isResultThenable = result !== true && isThenable(result);

          // If the listener didn't returned true or a Promise, or called
          // wrappedSendResponse synchronously, we can exit earlier
          // because there will be no response sent from this listener.
          if (result !== true && !isResultThenable && !didCallSendResponse) {
            return false;
          }

          // A small helper to send the message if the promise resolves
          // and an error if the promise rejects (a wrapped sendMessage has
          // to translate the message into a resolved promise or a rejected
          // promise).
          const sendPromisedResult = promise => {
            promise.then(msg => {
              // send the message value.
              sendResponse(msg);
            }, error => {
              // Send a JSON representation of the error if the rejected value
              // is an instance of error, or the object itself otherwise.
              let message;
              if (error && (error instanceof Error || typeof error.message === "string")) {
                message = error.message;
              } else {
                message = "An unexpected error occurred";
              }
              sendResponse({
                __mozWebExtensionPolyfillReject__: true,
                message
              });
            }).catch(err => {
              // Print an error on the console if unable to send the response.
              console.error("Failed to send onMessage rejected reply", err);
            });
          };

          // If the listener returned a Promise, send the resolved value as a
          // result, otherwise wait the promise related to the wrappedSendResponse
          // callback to resolve and send it as a response.
          if (isResultThenable) {
            sendPromisedResult(result);
          } else {
            sendPromisedResult(sendResponsePromise);
          }

          // Let Chrome know that the listener is replying.
          return true;
        };
      });
      const wrappedSendMessageCallback = ({
        reject,
        resolve
      }, reply) => {
        if (extensionAPIs.runtime.lastError) {
          // Detect when none of the listeners replied to the sendMessage call and resolve
          // the promise to undefined as in Firefox.
          // See https://github.com/mozilla/webextension-polyfill/issues/130
          if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
            resolve();
          } else {
            reject(new Error(extensionAPIs.runtime.lastError.message));
          }
        } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
          // Convert back the JSON representation of the error into
          // an Error instance.
          reject(new Error(reply.message));
        } else {
          resolve(reply);
        }
      };
      const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
        if (args.length < metadata.minArgs) {
          throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
        }
        if (args.length > metadata.maxArgs) {
          throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
        }
        return new Promise((resolve, reject) => {
          const wrappedCb = wrappedSendMessageCallback.bind(null, {
            resolve,
            reject
          });
          args.push(wrappedCb);
          apiNamespaceObj.sendMessage(...args);
        });
      };
      const staticWrappers = {
        devtools: {
          network: {
            onRequestFinished: wrapEvent(onRequestFinishedWrappers)
          }
        },
        runtime: {
          onMessage: wrapEvent(onMessageWrappers),
          onMessageExternal: wrapEvent(onMessageWrappers),
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 1,
            maxArgs: 3
          })
        },
        tabs: {
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 2,
            maxArgs: 3
          })
        }
      };
      const settingMetadata = {
        clear: {
          minArgs: 1,
          maxArgs: 1
        },
        get: {
          minArgs: 1,
          maxArgs: 1
        },
        set: {
          minArgs: 1,
          maxArgs: 1
        }
      };
      apiMetadata.privacy = {
        network: {
          "*": settingMetadata
        },
        services: {
          "*": settingMetadata
        },
        websites: {
          "*": settingMetadata
        }
      };
      return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
    };

    // The build process adds a UMD wrapper around this file, which makes the
    // `module` variable available.
    module.exports = wrapAPIs(chrome);
  } else {
    module.exports = globalThis.browser;
  }
});
//# sourceMappingURL=browser-polyfill.js.map
"";
  })();
  var formatter = function formatter(msg) {
    return "[ WER: ".concat(msg, " ]");
  };
  var logger = function logger(msg) {
    var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "info";
    return console[level](formatter(msg));
  };
  var timeFormatter = function timeFormatter(date) {
    return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
  };
  // eslint-disable-next-line no-restricted-globals
  var injectionContext = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this;
  var browser = injectionContext.browser || injectionContext.chrome;
  if (!browser) {
    logger("Browser API is not available", "warn");
    return;
  }
  var signals = JSON.parse('{"SIGN_CHANGE":"SIGN_CHANGE","SIGN_RELOAD":"SIGN_RELOAD","SIGN_RELOADED":"SIGN_RELOADED","SIGN_LOG":"SIGN_LOG","SIGN_CONNECT":"SIGN_CONNECT"}');
  var config = JSON.parse('{"RECONNECT_INTERVAL":2000,"SOCKET_ERR_CODE_REF":"https://tools.ietf.org/html/rfc6455#section-7.4.1"}');
  var reloadPage = "true" === "true";
  var wsHost = "ws://localhost:9090";
  var SIGN_CHANGE = signals.SIGN_CHANGE,
    SIGN_RELOAD = signals.SIGN_RELOAD,
    SIGN_RELOADED = signals.SIGN_RELOADED,
    SIGN_LOG = signals.SIGN_LOG,
    SIGN_CONNECT = signals.SIGN_CONNECT;
  var RECONNECT_INTERVAL = config.RECONNECT_INTERVAL,
    SOCKET_ERR_CODE_REF = config.SOCKET_ERR_CODE_REF;
  var extension = browser.extension,
    runtime = browser.runtime,
    tabs = browser.tabs;
  var manifest = runtime.getManifest();
  // ========================== Called only on content scripts ============================== //
  function contentScriptWorker() {
    runtime.sendMessage({
      type: SIGN_CONNECT
    }).then(function (msg) {
      return console.info(msg);
    });
    runtime.onMessage.addListener(function (_ref) {
      var type = _ref.type,
        payload = _ref.payload;
      switch (type) {
        case SIGN_RELOAD:
          logger("Detected Changes. Reloading...");
          reloadPage && window.location.reload();
          break;
        case SIGN_LOG:
          console.info(payload);
          break;
        default:
          break;
      }
    });
  }
  // ======================== Called only on background scripts ============================= //
  function backgroundWorker(socket) {
    runtime.onMessage.addListener(function (action) {
      if (action.type === SIGN_CONNECT) {
        return Promise.resolve(formatter("Connected to Web Extension Hot Reloader"));
      }
      return true;
    });
    socket.addEventListener("message", function (_ref2) {
      var data = _ref2.data;
      var _JSON$parse = JSON.parse(data),
        type = _JSON$parse.type,
        payload = _JSON$parse.payload;
      if (type === SIGN_CHANGE && (!payload || !payload.onlyPageChanged)) {
        tabs.query({
          status: "complete"
        }).then(function (loadedTabs) {
          loadedTabs.forEach(function (tab) {
            var _a;
            return tab.id && ((_a = tabs.sendMessage(tab.id, {
              type: SIGN_RELOAD
            })) === null || _a === void 0 ? void 0 : _a["catch"](function () {
              return null;
            }));
          });
          socket.send(JSON.stringify({
            type: SIGN_RELOADED,
            payload: formatter("".concat(timeFormatter(new Date()), " - ").concat(manifest.name, " successfully reloaded"))
          }));
          runtime.reload();
        });
      } else {
        runtime.sendMessage({
          type: type,
          payload: payload
        });
      }
    });
    socket.addEventListener("close", function (_ref3) {
      var code = _ref3.code;
      logger("Socket connection closed. Code ".concat(code, ". See more in ").concat(SOCKET_ERR_CODE_REF), "warn");
      var intId = setInterval(function () {
        logger("Attempting to reconnect (tip: Check if Webpack is running)");
        var ws = new WebSocket(wsHost);
        ws.onerror = function () {
          return logger("Error trying to re-connect. Reattempting in ".concat(RECONNECT_INTERVAL / 1000, "s"), "warn");
        };
        ws.addEventListener("open", function () {
          clearInterval(intId);
          logger("Reconnected. Reloading plugin");
          runtime.reload();
        });
      }, RECONNECT_INTERVAL);
    });
  }
  // ======================== Called only on extension pages that are not the background ============================= //
  function extensionPageWorker() {
    runtime.sendMessage({
      type: SIGN_CONNECT
    }).then(function (msg) {
      return console.info(msg);
    });
    runtime.onMessage.addListener(function (_ref4) {
      var type = _ref4.type,
        payload = _ref4.payload;
      switch (type) {
        case SIGN_CHANGE:
          logger("Detected Changes. Reloading...");
          // Always reload extension pages in the foreground when they change.
          // This option doesn't make sense otherwise
          window.location.reload();
          break;
        case SIGN_LOG:
          console.info(payload);
          break;
        default:
          break;
      }
    });
  }
  // ======================= Bootstraps the middleware =========================== //
  runtime.reload ? typeof window === 'undefined' || extension.getBackgroundPage() === window ? backgroundWorker(new WebSocket(wsHost)) : extensionPageWorker() : contentScriptWorker();
})();
/* ----------------------------------------------- */
/* End of Webpack Hot Extension Middleware  */
/* ----------------------------------------------- *//******/ (() => { // webpackBootstrap
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
var activeTabId = null;
var siteTimeData = {};
var currentFavIcon = null;
var currentDomain = null;
var isTracking = false;
var display = "daughnut";
var lastUpdateTime = null;
var updateInterval = null;

//function that gets the domain name from the url
function getDomain(url) {
  try {
    if (!url) return null;
    var hostname = new URL(url).hostname;
    return hostname || null;
  } catch (_unused) {
    return null;
  }
}

//function that increments the time spent on a website, much better for use when the popup is open as it is relatively more accurate
function incrementTime(domain) {
  if (!domain) return;
  siteTimeData[domain][1] = (siteTimeData[domain][1] || 0) + 1;
  console.log("Time incremented for ".concat(domain, ":"), siteTimeData[domain][1]);

  // Save to storage and notify popup if open
  chrome.storage.local.set({
    siteTimeData: siteTimeData
  }, function () {
    if (display === "list") {
      chrome.runtime.sendMessage({
        type: 'timeUpdateList',
        timeData: siteTimeData
      })["catch"](function () {
        // Ignore error if popup is closed
      });
    }
    if (display === "daughnut") {
      chrome.runtime.sendMessage({
        type: 'timeUpdateDaughnut',
        timeData: siteTimeData
      })["catch"](function () {
        // Ignore error if popup is closed
      });
    }
  });
}

//function that increments time as long as the popup is open and the tab is active
function startTracking() {
  if (updateInterval) {
    clearInterval(updateInterval);
  }
  updateInterval = setInterval(function () {
    if (isTracking && currentDomain) {
      incrementTime(currentDomain);
    }
  }, 1000);
}
function stopTracking() {
  if (updateInterval) {
    clearInterval(updateInterval);
    updateInterval = null;
  }
}

//handling favicons

//checking if the backup favicon is valid
function fetchFavicon(url, callback) {
  fetch(url).then(function (response) {
    if (response.ok) {
      callback(url); // Favicon is valid
    } else {
      callback(null); // Fallback failed
    }
  })["catch"](function () {
    return callback(null);
  }); // Network error
}

//function that updates the timeSite data and adds the favicon for that website to it
function updateSiteTimeData(domain, favicon) {
  if (!siteTimeData[domain]) {
    siteTimeData[domain] = [favicon, 0]; // Add domain with favicon and initial time
  } else {
    siteTimeData[domain][0] = favicon; // Update favicon for existing domain
  }
}
function favRoutine(currentDomain, currentFavIcon) {
  if (!currentDomain) {
    console.error('Domain is null, skipping favicon handling.');
    return;
  }
  // Fallback for websites without a favicon
  if (!currentFavIcon) {
    var fallbackFaviconUrl = "https://".concat(currentDomain, "/favicon.ico");
    fetchFavicon(fallbackFaviconUrl, function (validFaviconUrl) {
      currentFavIcon = validFaviconUrl || 'assets/default-favicon.png';
      updateSiteTimeData(currentDomain, currentFavIcon);
    });
  } else {
    updateSiteTimeData(currentDomain, currentFavIcon);
  }
}

// Message handling
///

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === 'getData') {
    sendResponse({
      timeData: siteTimeData,
      display: display
    });
    return true;
  }
  if (message.type === 'startOrPause') {
    isTracking = message.status;
    console.log('Tracking status changed to:', isTracking);
    if (isTracking) {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function (tabs) {
        if (tabs[0]) {
          activeTabId = tabs[0].id;
          currentDomain = getDomain(tabs[0].url);
          currentFavIcon = tabs[0].favIconUrl;
          if (tabs[0].url.startsWith('chrome://')) {
            currentFavIcon = 'assets/chrome-favicon.png'; // Assign a specific icon for Chrome internal pages
          }
          favRoutine(currentDomain, currentFavIcon);
          startTracking();
          console.log('Started tracking for:', currentDomain);
        }
      });
    } else {
      stopTracking();
      activeTabId = null;
      currentDomain = null;
    }
    chrome.storage.local.set({
      isTracking: isTracking
    });
    sendResponse({
      status: 'success'
    });
    return true;
  }
  if (message.type === 'clear') {
    siteTimeData = {};
    chrome.storage.local.set({
      siteTimeData: siteTimeData
    });
    console.log('Cleared time data');
    sendResponse({
      status: 'success'
    });
    return true;
  }
  if (message.type === 'daughnut') {
    display = "daughnut";
    console.log('Displaying: ', display, 'for tracking status: ', isTracking);
    if (!isTracking) {
      console.log('sending response as it is not tracking ', display);
      sendResponse({
        timeData: siteTimeData,
        display: display
      });
    } else {
      sendResponse({
        status: 'success'
      });
    }
    return true;
  }
  if (message.type === 'list') {
    display = "list";
    console.log('Displaying: ', display, 'for tracking status: ', isTracking);
    if (!isTracking) {
      console.log('sending response as it is not tracking ', display);
      sendResponse({
        timeData: siteTimeData,
        display: display
      });
    } else {
      sendResponse({
        status: 'success'
      });
    }
    return true;
  }
});

// Tab focus handling

chrome.windows.onFocusChanged.addListener(function (windowId) {
  if (!isTracking) return;
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    console.log('Window lost focus');
    stopTracking();
  } else {
    console.log('Window gained focus');
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      if (tabs[0]) {
        activeTabId = tabs[0].id;
        currentDomain = getDomain(tabs[0].url);
        currentFavIcon = tabs[0].favIconUrl;
        if (tabs[0].url.startsWith('chrome://')) {
          currentFavIcon = 'assets/chrome-favicon.png'; // Assign a specific icon for Chrome internal pages
        }
        favRoutine(currentDomain, currentFavIcon);
        startTracking();
        console.log('Resumed tracking for:', currentDomain);
      }
    });
  }
});

// listens to when a tab becomes the active tab i the browser
chrome.tabs.onActivated.addListener(function (activeInfo) {
  if (!isTracking) return;
  stopTracking();
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    activeTabId = tab.id;
    currentDomain = getDomain(tab.url);
    currentFavIcon = tab.favIconUrl;
    console.log('Current domain:', tab.url);
    if (tab.url.startsWith('chrome://')) {
      currentFavIcon = 'assets/chrome-favicon.png'; // Assign a specific icon for Chrome internal pages
    }
    favRoutine(currentDomain, currentFavIcon);
    startTracking();
    console.log('Tab activated:', currentDomain);
  });
});
//This listens to change within the tab itself, although entirely unsure whether it is necessary, it works for now so I would keep it
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (!isTracking) return;
  if (tabId === activeTabId && changeInfo.url) {
    stopTracking();
    currentDomain = getDomain(changeInfo.url);
    currentFavIcon = tab.favIconUrl;
    if (tab.url.startsWith('chrome://')) {
      currentFavIcon = 'assets/chrome-favicon.png'; // Assign a specific icon for Chrome internal pages
    }
    favRoutine(currentDomain, currentFavIcon);
    startTracking();
    console.log('Tab URL updated:', currentDomain);
  }
});

// Initialize from storage starts working when the extension is opened
chrome.storage.local.get(['isTracking', 'siteTimeData'], function (result) {
  isTracking = result.isTracking || false;
  siteTimeData = result.siteTimeData || {};
  if (isTracking) {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      if (tabs[0]) {
        activeTabId = tabs[0].id;
        currentDomain = getDomain(tabs[0].url);
        currentFavIcon = tabs[0].favIconUrl;
        if (tabs[0].url.startsWith('chrome://')) {
          currentFavIcon = 'assets/chrome-favicon.png'; // Assign a specific icon for Chrome internal pages
        }
        favRoutine(currentDomain, currentFavIcon);
        startTracking();
      }
    });
  }
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFdBQVcsR0FBRyxJQUFJO0FBQ3RCLElBQUlDLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDckIsSUFBSUMsY0FBYyxHQUFHLElBQUk7QUFFekIsSUFBSUMsYUFBYSxHQUFHLElBQUk7QUFDeEIsSUFBSUMsVUFBVSxHQUFHLEtBQUs7QUFDdEIsSUFBSUMsT0FBTyxHQUFHLFVBQVU7QUFFeEIsSUFBSUMsY0FBYyxHQUFHLElBQUk7QUFDekIsSUFBSUMsY0FBYyxHQUFHLElBQUk7O0FBRXpCO0FBQ0EsU0FBU0MsU0FBU0EsQ0FBQ0MsR0FBRyxFQUFFO0VBQ3BCLElBQUk7SUFDQSxJQUFJLENBQUNBLEdBQUcsRUFBRSxPQUFPLElBQUk7SUFDckIsSUFBTUMsUUFBUSxHQUFHLElBQUlDLEdBQUcsQ0FBQ0YsR0FBRyxDQUFDLENBQUNDLFFBQVE7SUFDdEMs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YWNrZ3JvdW5kLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBhY3RpdmVUYWJJZCA9IG51bGw7XG5sZXQgc2l0ZVRpbWVEYXRhID0ge307XG5sZXQgY3VycmVudEZhdkljb24gPSBudWxsO1xuXG5sZXQgY3VycmVudERvbWFpbiA9IG51bGw7XG5sZXQgaXNUcmFja2luZyA9IGZhbHNlO1xubGV0IGRpc3BsYXkgPSBcImRhdWdobnV0XCI7XG5cbmxldCBsYXN0VXBkYXRlVGltZSA9IG51bGw7XG5sZXQgdXBkYXRlSW50ZXJ2YWwgPSBudWxsO1xuXG4vL2Z1bmN0aW9uIHRoYXQgZ2V0cyB0aGUgZG9tYWluIG5hbWUgZnJvbSB0aGUgdXJsXG5mdW5jdGlvbiBnZXREb21haW4odXJsKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKCF1cmwpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBob3N0bmFtZSA9IG5ldyBVUkwodXJsKS5ob3N0bmFtZTtcbiAgICAgICAgcmV0dXJuIGhvc3RuYW1lIHx8IG51bGw7XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cblxuLy9mdW5jdGlvbiB0aGF0IGluY3JlbWVudHMgdGhlIHRpbWUgc3BlbnQgb24gYSB3ZWJzaXRlLCBtdWNoIGJldHRlciBmb3IgdXNlIHdoZW4gdGhlIHBvcHVwIGlzIG9wZW4gYXMgaXQgaXMgcmVsYXRpdmVseSBtb3JlIGFjY3VyYXRlXG5mdW5jdGlvbiBpbmNyZW1lbnRUaW1lKGRvbWFpbikge1xuICAgIGlmICghZG9tYWluKSByZXR1cm47XG4gICAgXG4gICAgc2l0ZVRpbWVEYXRhW2RvbWFpbl1bMV0gPSAoc2l0ZVRpbWVEYXRhW2RvbWFpbl1bMV0gfHwgMCkgKyAxO1xuICAgIGNvbnNvbGUubG9nKGBUaW1lIGluY3JlbWVudGVkIGZvciAke2RvbWFpbn06YCwgc2l0ZVRpbWVEYXRhW2RvbWFpbl1bMV0pO1xuICAgIFxuICAgIC8vIFNhdmUgdG8gc3RvcmFnZSBhbmQgbm90aWZ5IHBvcHVwIGlmIG9wZW5cbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBzaXRlVGltZURhdGEgfSwgKCkgPT4ge1xuICAgICAgICBpZiAoZGlzcGxheSA9PT0gXCJsaXN0XCIpIHtcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdHlwZTogJ3RpbWVVcGRhdGVMaXN0JyxcbiAgICAgICAgICAgIHRpbWVEYXRhOiBzaXRlVGltZURhdGFcbiAgICAgICAgXG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIC8vIElnbm9yZSBlcnJvciBpZiBwb3B1cCBpcyBjbG9zZWRcbiAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpc3BsYXkgPT09IFwiZGF1Z2hudXRcIikge1xuICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICd0aW1lVXBkYXRlRGF1Z2hudXQnLFxuICAgICAgICAgICAgICAgIHRpbWVEYXRhOiBzaXRlVGltZURhdGFcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBJZ25vcmUgZXJyb3IgaWYgcG9wdXAgaXMgY2xvc2VkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vL2Z1bmN0aW9uIHRoYXQgaW5jcmVtZW50cyB0aW1lIGFzIGxvbmcgYXMgdGhlIHBvcHVwIGlzIG9wZW4gYW5kIHRoZSB0YWIgaXMgYWN0aXZlXG5mdW5jdGlvbiBzdGFydFRyYWNraW5nKCkge1xuICAgIGlmICh1cGRhdGVJbnRlcnZhbCkge1xuICAgICAgICBjbGVhckludGVydmFsKHVwZGF0ZUludGVydmFsKTtcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmIChpc1RyYWNraW5nICYmIGN1cnJlbnREb21haW4pIHtcbiAgICAgICAgICAgIGluY3JlbWVudFRpbWUoY3VycmVudERvbWFpbik7XG4gICAgICAgIH1cbiAgICB9LCAxMDAwKTtcbn1cblxuZnVuY3Rpb24gc3RvcFRyYWNraW5nKCkge1xuICAgIGlmICh1cGRhdGVJbnRlcnZhbCkge1xuICAgICAgICBjbGVhckludGVydmFsKHVwZGF0ZUludGVydmFsKTtcbiAgICAgICAgdXBkYXRlSW50ZXJ2YWwgPSBudWxsO1xuICAgIH1cbn1cblxuLy9oYW5kbGluZyBmYXZpY29uc1xuXG4vL2NoZWNraW5nIGlmIHRoZSBiYWNrdXAgZmF2aWNvbiBpcyB2YWxpZFxuZnVuY3Rpb24gZmV0Y2hGYXZpY29uKHVybCwgY2FsbGJhY2spIHtcbiAgICBmZXRjaCh1cmwpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodXJsKTsgLy8gRmF2aWNvbiBpcyB2YWxpZFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsKTsgLy8gRmFsbGJhY2sgZmFpbGVkXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoKSA9PiBjYWxsYmFjayhudWxsKSk7IC8vIE5ldHdvcmsgZXJyb3Jcbn1cblxuLy9mdW5jdGlvbiB0aGF0IHVwZGF0ZXMgdGhlIHRpbWVTaXRlIGRhdGEgYW5kIGFkZHMgdGhlIGZhdmljb24gZm9yIHRoYXQgd2Vic2l0ZSB0byBpdFxuZnVuY3Rpb24gdXBkYXRlU2l0ZVRpbWVEYXRhKGRvbWFpbiwgZmF2aWNvbikge1xuICAgIGlmICghc2l0ZVRpbWVEYXRhW2RvbWFpbl0pIHtcbiAgICAgICAgc2l0ZVRpbWVEYXRhW2RvbWFpbl0gPSBbZmF2aWNvbiwgMF07IC8vIEFkZCBkb21haW4gd2l0aCBmYXZpY29uIGFuZCBpbml0aWFsIHRpbWVcbiAgICB9IGVsc2Uge1xuICAgICAgICBzaXRlVGltZURhdGFbZG9tYWluXVswXSA9IGZhdmljb247IC8vIFVwZGF0ZSBmYXZpY29uIGZvciBleGlzdGluZyBkb21haW5cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZhdlJvdXRpbmUoY3VycmVudERvbWFpbiwgY3VycmVudEZhdkljb24pIHtcbiAgICBpZiAoIWN1cnJlbnREb21haW4pIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRG9tYWluIGlzIG51bGwsIHNraXBwaW5nIGZhdmljb24gaGFuZGxpbmcuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRmFsbGJhY2sgZm9yIHdlYnNpdGVzIHdpdGhvdXQgYSBmYXZpY29uXG4gICAgaWYgKCFjdXJyZW50RmF2SWNvbikge1xuICAgICAgICBjb25zdCBmYWxsYmFja0Zhdmljb25VcmwgPSBgaHR0cHM6Ly8ke2N1cnJlbnREb21haW59L2Zhdmljb24uaWNvYDtcbiAgICAgICAgZmV0Y2hGYXZpY29uKGZhbGxiYWNrRmF2aWNvblVybCwgKHZhbGlkRmF2aWNvblVybCkgPT4ge1xuICAgICAgICAgICAgY3VycmVudEZhdkljb24gPSB2YWxpZEZhdmljb25VcmwgfHwgJ2Fzc2V0cy9kZWZhdWx0LWZhdmljb24ucG5nJztcbiAgICAgICAgICAgIHVwZGF0ZVNpdGVUaW1lRGF0YShjdXJyZW50RG9tYWluLCBjdXJyZW50RmF2SWNvbik7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHVwZGF0ZVNpdGVUaW1lRGF0YShjdXJyZW50RG9tYWluLCBjdXJyZW50RmF2SWNvbik7XG4gICAgfVxufVxuXG5cbi8vIE1lc3NhZ2UgaGFuZGxpbmdcbi8vL1xuXG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgICBpZiAobWVzc2FnZS50eXBlID09PSAnZ2V0RGF0YScpIHtcbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgdGltZURhdGE6IHNpdGVUaW1lRGF0YSwgZGlzcGxheTogZGlzcGxheSB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIFxuICAgIGlmIChtZXNzYWdlLnR5cGUgPT09ICdzdGFydE9yUGF1c2UnKSB7XG4gICAgICAgIGlzVHJhY2tpbmcgPSBtZXNzYWdlLnN0YXR1cztcbiAgICAgICAgY29uc29sZS5sb2coJ1RyYWNraW5nIHN0YXR1cyBjaGFuZ2VkIHRvOicsIGlzVHJhY2tpbmcpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGlzVHJhY2tpbmcpIHtcbiAgICAgICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sICh0YWJzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRhYnNbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlVGFiSWQgPSB0YWJzWzBdLmlkO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50RG9tYWluID0gZ2V0RG9tYWluKHRhYnNbMF0udXJsKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEZhdkljb24gPSB0YWJzWzBdLmZhdkljb25Vcmw7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWJzWzBdLnVybC5zdGFydHNXaXRoKCdjaHJvbWU6Ly8nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEZhdkljb24gPSAnYXNzZXRzL2Nocm9tZS1mYXZpY29uLnBuZyc7IC8vIEFzc2lnbiBhIHNwZWNpZmljIGljb24gZm9yIENocm9tZSBpbnRlcm5hbCBwYWdlc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBmYXZSb3V0aW5lKGN1cnJlbnREb21haW4sIGN1cnJlbnRGYXZJY29uKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VHJhY2tpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N0YXJ0ZWQgdHJhY2tpbmcgZm9yOicsIGN1cnJlbnREb21haW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RvcFRyYWNraW5nKCk7XG4gICAgICAgICAgICBhY3RpdmVUYWJJZCA9IG51bGw7XG4gICAgICAgICAgICBjdXJyZW50RG9tYWluID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgaXNUcmFja2luZyB9KTtcbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3RhdHVzOiAnc3VjY2VzcycgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBcbiAgICBpZiAobWVzc2FnZS50eXBlID09PSAnY2xlYXInKSB7XG4gICAgICAgIHNpdGVUaW1lRGF0YSA9IHt9O1xuICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBzaXRlVGltZURhdGEgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGVhcmVkIHRpbWUgZGF0YScpO1xuICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdGF0dXM6ICdzdWNjZXNzJyB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChtZXNzYWdlLnR5cGUgPT09ICdkYXVnaG51dCcpIHtcbiAgICAgICAgZGlzcGxheSA9IFwiZGF1Z2hudXRcIjtcbiAgICAgICAgY29uc29sZS5sb2coJ0Rpc3BsYXlpbmc6ICcsIGRpc3BsYXksICdmb3IgdHJhY2tpbmcgc3RhdHVzOiAnLCBpc1RyYWNraW5nKTsgIFxuICAgICAgICBpZiAoIWlzVHJhY2tpbmcpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NlbmRpbmcgcmVzcG9uc2UgYXMgaXQgaXMgbm90IHRyYWNraW5nICcsIGRpc3BsYXkpO1xuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHsgdGltZURhdGE6IHNpdGVUaW1lRGF0YSwgZGlzcGxheTogZGlzcGxheSB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdGF0dXM6ICdzdWNjZXNzJyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gJ2xpc3QnKSB7ICBcbiAgICAgICAgZGlzcGxheSA9IFwibGlzdFwiO1xuICAgICAgICBjb25zb2xlLmxvZygnRGlzcGxheWluZzogJywgZGlzcGxheSwgJ2ZvciB0cmFja2luZyBzdGF0dXM6ICcsIGlzVHJhY2tpbmcpOyAgXG4gICAgICAgIGlmICghaXNUcmFja2luZyl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc2VuZGluZyByZXNwb25zZSBhcyBpdCBpcyBub3QgdHJhY2tpbmcgJywgZGlzcGxheSk7XG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UoeyB0aW1lRGF0YTogc2l0ZVRpbWVEYXRhLCBkaXNwbGF5OiBkaXNwbGF5IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgIHNlbmRSZXNwb25zZSh7IHN0YXR1czogJ3N1Y2Nlc3MnIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn0pO1xuXG5cblxuXG5cbi8vIFRhYiBmb2N1cyBoYW5kbGluZ1xuXG5jaHJvbWUud2luZG93cy5vbkZvY3VzQ2hhbmdlZC5hZGRMaXN0ZW5lcigod2luZG93SWQpID0+IHtcbiAgICBpZiAoIWlzVHJhY2tpbmcpIHJldHVybjtcbiAgICBcbiAgICBpZiAod2luZG93SWQgPT09IGNocm9tZS53aW5kb3dzLldJTkRPV19JRF9OT05FKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdXaW5kb3cgbG9zdCBmb2N1cycpO1xuICAgICAgICBzdG9wVHJhY2tpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnV2luZG93IGdhaW5lZCBmb2N1cycpO1xuICAgICAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCAodGFicykgPT4ge1xuICAgICAgICAgICAgaWYgKHRhYnNbMF0pIHtcbiAgICAgICAgICAgICAgICBhY3RpdmVUYWJJZCA9IHRhYnNbMF0uaWQ7XG4gICAgICAgICAgICAgICAgY3VycmVudERvbWFpbiA9IGdldERvbWFpbih0YWJzWzBdLnVybCk7XG4gICAgICAgICAgICAgICAgY3VycmVudEZhdkljb24gPSB0YWJzWzBdLmZhdkljb25Vcmw7XG4gICAgICAgICAgICAgICAgaWYgKHRhYnNbMF0udXJsLnN0YXJ0c1dpdGgoJ2Nocm9tZTovLycpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRGYXZJY29uID0gJ2Fzc2V0cy9jaHJvbWUtZmF2aWNvbi5wbmcnOyAvLyBBc3NpZ24gYSBzcGVjaWZpYyBpY29uIGZvciBDaHJvbWUgaW50ZXJuYWwgcGFnZXNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZmF2Um91dGluZShjdXJyZW50RG9tYWluLCBjdXJyZW50RmF2SWNvbik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc3RhcnRUcmFja2luZygpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXN1bWVkIHRyYWNraW5nIGZvcjonLCBjdXJyZW50RG9tYWluKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbi8vIGxpc3RlbnMgdG8gd2hlbiBhIHRhYiBiZWNvbWVzIHRoZSBhY3RpdmUgdGFiIGkgdGhlIGJyb3dzZXJcbmNocm9tZS50YWJzLm9uQWN0aXZhdGVkLmFkZExpc3RlbmVyKChhY3RpdmVJbmZvKSA9PiB7XG4gICAgaWYgKCFpc1RyYWNraW5nKSByZXR1cm47XG4gICAgc3RvcFRyYWNraW5nKCk7XG4gICAgXG4gICAgY2hyb21lLnRhYnMuZ2V0KGFjdGl2ZUluZm8udGFiSWQsICh0YWIpID0+IHtcbiAgICAgICAgYWN0aXZlVGFiSWQgPSB0YWIuaWQ7XG4gICAgICAgIGN1cnJlbnREb21haW4gPSBnZXREb21haW4odGFiLnVybCk7XG4gICAgICAgIGN1cnJlbnRGYXZJY29uID0gdGFiLmZhdkljb25Vcmw7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDdXJyZW50IGRvbWFpbjonLCB0YWIudXJsKTtcbiAgICAgICAgaWYgKHRhYi51cmwuc3RhcnRzV2l0aCgnY2hyb21lOi8vJykpIHtcbiAgICAgICAgICAgIGN1cnJlbnRGYXZJY29uID0gJ2Fzc2V0cy9jaHJvbWUtZmF2aWNvbi5wbmcnOyAvLyBBc3NpZ24gYSBzcGVjaWZpYyBpY29uIGZvciBDaHJvbWUgaW50ZXJuYWwgcGFnZXNcbiAgICAgICAgfVxuICAgICAgIFxuICAgICAgICBmYXZSb3V0aW5lKGN1cnJlbnREb21haW4sIGN1cnJlbnRGYXZJY29uKTtcbiAgICAgICAgXG4gICAgICAgIHN0YXJ0VHJhY2tpbmcoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1RhYiBhY3RpdmF0ZWQ6JywgY3VycmVudERvbWFpbik7XG4gICAgfSk7XG59KTtcbi8vVGhpcyBsaXN0ZW5zIHRvIGNoYW5nZSB3aXRoaW4gdGhlIHRhYiBpdHNlbGYsIGFsdGhvdWdoIGVudGlyZWx5IHVuc3VyZSB3aGV0aGVyIGl0IGlzIG5lY2Vzc2FyeSwgaXQgd29ya3MgZm9yIG5vdyBzbyBJIHdvdWxkIGtlZXAgaXRcbmNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcigodGFiSWQsIGNoYW5nZUluZm8sIHRhYikgPT4ge1xuICAgIGlmICghaXNUcmFja2luZykgcmV0dXJuO1xuICAgIGlmICh0YWJJZCA9PT0gYWN0aXZlVGFiSWQgJiYgY2hhbmdlSW5mby51cmwpIHtcbiAgICAgICAgc3RvcFRyYWNraW5nKCk7XG4gICAgICAgIGN1cnJlbnREb21haW4gPSBnZXREb21haW4oY2hhbmdlSW5mby51cmwpO1xuICAgICAgICBjdXJyZW50RmF2SWNvbiA9IHRhYi5mYXZJY29uVXJsO1xuICAgICAgICBpZiAodGFiLnVybC5zdGFydHNXaXRoKCdjaHJvbWU6Ly8nKSkge1xuICAgICAgICAgICAgY3VycmVudEZhdkljb24gPSAnYXNzZXRzL2Nocm9tZS1mYXZpY29uLnBuZyc7IC8vIEFzc2lnbiBhIHNwZWNpZmljIGljb24gZm9yIENocm9tZSBpbnRlcm5hbCBwYWdlc1xuICAgICAgICB9XG4gICAgICAgIGZhdlJvdXRpbmUoY3VycmVudERvbWFpbiwgY3VycmVudEZhdkljb24pO1xuICAgICAgICBcbiAgICAgICAgc3RhcnRUcmFja2luZygpO1xuICAgICAgICBjb25zb2xlLmxvZygnVGFiIFVSTCB1cGRhdGVkOicsIGN1cnJlbnREb21haW4pO1xuICAgIH1cbn0pO1xuXG5cblxuXG4vLyBJbml0aWFsaXplIGZyb20gc3RvcmFnZSBzdGFydHMgd29ya2luZyB3aGVuIHRoZSBleHRlbnNpb24gaXMgb3BlbmVkXG5jaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoWydpc1RyYWNraW5nJywgJ3NpdGVUaW1lRGF0YSddLCAocmVzdWx0KSA9PiB7XG4gICAgaXNUcmFja2luZyA9IHJlc3VsdC5pc1RyYWNraW5nIHx8IGZhbHNlO1xuICAgIHNpdGVUaW1lRGF0YSA9IHJlc3VsdC5zaXRlVGltZURhdGEgfHwge307XG4gICAgXG4gICAgaWYgKGlzVHJhY2tpbmcpIHtcbiAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgKHRhYnMpID0+IHtcbiAgICAgICAgICAgIGlmICh0YWJzWzBdKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlVGFiSWQgPSB0YWJzWzBdLmlkO1xuICAgICAgICAgICAgICAgIGN1cnJlbnREb21haW4gPSBnZXREb21haW4odGFic1swXS51cmwpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRGYXZJY29uID0gdGFic1swXS5mYXZJY29uVXJsO1xuICAgICAgICAgICAgICAgIGlmICh0YWJzWzBdLnVybC5zdGFydHNXaXRoKCdjaHJvbWU6Ly8nKSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50RmF2SWNvbiA9ICdhc3NldHMvY2hyb21lLWZhdmljb24ucG5nJzsgLy8gQXNzaWduIGEgc3BlY2lmaWMgaWNvbiBmb3IgQ2hyb21lIGludGVybmFsIHBhZ2VzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGZhdlJvdXRpbmUoY3VycmVudERvbWFpbiwgY3VycmVudEZhdkljb24pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHN0YXJ0VHJhY2tpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufSk7ICJdLCJuYW1lcyI6WyJhY3RpdmVUYWJJZCIsInNpdGVUaW1lRGF0YSIsImN1cnJlbnRGYXZJY29uIiwiY3VycmVudERvbWFpbiIsImlzVHJhY2tpbmciLCJkaXNwbGF5IiwibGFzdFVwZGF0ZVRpbWUiLCJ1cGRhdGVJbnRlcnZhbCIsImdldERvbWFpbiIsInVybCIsImhvc3RuYW1lIiwiVVJMIiwiX3VudXNlZCIsImluY3JlbWVudFRpbWUiLCJkb21haW4iLCJjb25zb2xlIiwibG9nIiwiY29uY2F0IiwiY2hyb21lIiwic3RvcmFnZSIsImxvY2FsIiwic2V0IiwicnVudGltZSIsInNlbmRNZXNzYWdlIiwidHlwZSIsInRpbWVEYXRhIiwic3RhcnRUcmFja2luZyIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsInN0b3BUcmFja2luZyIsImZldGNoRmF2aWNvbiIsImNhbGxiYWNrIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJvayIsInVwZGF0ZVNpdGVUaW1lRGF0YSIsImZhdmljb24iLCJmYXZSb3V0aW5lIiwiZXJyb3IiLCJmYWxsYmFja0Zhdmljb25VcmwiLCJ2YWxpZEZhdmljb25VcmwiLCJvbk1lc3NhZ2UiLCJhZGRMaXN0ZW5lciIsIm1lc3NhZ2UiLCJzZW5kZXIiLCJzZW5kUmVzcG9uc2UiLCJzdGF0dXMiLCJ0YWJzIiwicXVlcnkiLCJhY3RpdmUiLCJjdXJyZW50V2luZG93IiwiaWQiLCJmYXZJY29uVXJsIiwic3RhcnRzV2l0aCIsIndpbmRvd3MiLCJvbkZvY3VzQ2hhbmdlZCIsIndpbmRvd0lkIiwiV0lORE9XX0lEX05PTkUiLCJvbkFjdGl2YXRlZCIsImFjdGl2ZUluZm8iLCJnZXQiLCJ0YWJJZCIsInRhYiIsIm9uVXBkYXRlZCIsImNoYW5nZUluZm8iLCJyZXN1bHQiXSwic291cmNlUm9vdCI6IiJ9