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
let activeTabId = null;
let siteTimeData = {};
let currentFavIcon = null;

let currentDomain = null;
let isTracking = false;
let display = "daughnut";

let lastUpdateTime = null;
let updateInterval = null;

//function that gets the domain name from the url
function getDomain(url) {
    try {
        if (!url) return null;
        const hostname = new URL(url).hostname;
        return hostname || null;
    } catch {
        return null;
    }
}

//function that increments the time spent on a website, much better for use when the popup is open as it is relatively more accurate
function incrementTime(domain) {
    if (!domain) return;
    
    siteTimeData[domain][1] = (siteTimeData[domain][1] || 0) + 1;
    console.log(`Time incremented for ${domain}:`, siteTimeData[domain][1]);
    
    // Save to storage and notify popup if open
    chrome.storage.local.set({ siteTimeData }, () => {
        if (display === "list") {
        chrome.runtime.sendMessage({
            type: 'timeUpdateList',
            timeData: siteTimeData
        
        }).catch(() => {
            // Ignore error if popup is closed
        });
        }
        if (display === "daughnut") {
            chrome.runtime.sendMessage({
                type: 'timeUpdateDaughnut',
                timeData: siteTimeData
            }).catch(() => {
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
    
    updateInterval = setInterval(() => {
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
    fetch(url)
        .then((response) => {
            if (response.ok) {
                callback(url); // Favicon is valid
            } else {
                callback(null); // Fallback failed
            }
        })
        .catch(() => callback(null)); // Network error
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
        const fallbackFaviconUrl = `https://${currentDomain}/favicon.ico`;
        fetchFavicon(fallbackFaviconUrl, (validFaviconUrl) => {
            currentFavIcon = validFaviconUrl || 'assets/default-favicon.png';
            updateSiteTimeData(currentDomain, currentFavIcon);
        });
    } else {
        updateSiteTimeData(currentDomain, currentFavIcon);
    }
}


// Message handling
///


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'getData') {
        sendResponse({ timeData: siteTimeData });
        return true;
    }
    
    if (message.type === 'startOrPause') {
        isTracking = message.status;
        console.log('Tracking status changed to:', isTracking);
        
        if (isTracking) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
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
        
        chrome.storage.local.set({ isTracking });
        sendResponse({ status: 'success' });
        return true;
    }
    
    if (message.type === 'clear') {
        siteTimeData = {};
        chrome.storage.local.set({ siteTimeData });
        console.log('Cleared time data');
        sendResponse({ status: 'success' });
        return true;
    }
    if (message.type === 'daughnut') {
        display = "daughnut";
        console.log('Displaying: ', display);
        sendResponse({ status: 'success' });
        return true;
    }
    if (message.type === 'list') {  
        display = "list";
        console.log('Displaying: ', display);
        sendResponse({ status: 'success' });
        return true;
    }
});





// Tab focus handling

chrome.windows.onFocusChanged.addListener((windowId) => {
    if (!isTracking) return;
    
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        console.log('Window lost focus');
        stopTracking();
    } else {
        console.log('Window gained focus');
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
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
chrome.tabs.onActivated.addListener((activeInfo) => {
    if (!isTracking) return;
    stopTracking();
    
    chrome.tabs.get(activeInfo.tabId, (tab) => {
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
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
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
chrome.storage.local.get(['isTracking', 'siteTimeData'], (result) => {
    isTracking = result.isTracking || false;
    siteTimeData = result.siteTimeData || {};
    
    if (isTracking) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsT0FBTztBQUMvQztBQUNBO0FBQ0EsK0JBQStCLGNBQWM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CLGNBQWM7QUFDZCxnQ0FBZ0M7QUFDaEM7QUFDQSxTQUFTO0FBQ1Qsc0NBQXNDO0FBQ3RDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QyxNQUFNO0FBQ04sMkNBQTJDO0FBQzNDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLHVCQUF1Qix3QkFBd0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxtQ0FBbUM7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRTtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxZQUFZO0FBQy9DLHVCQUF1QixtQkFBbUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxjQUFjO0FBQ2pEO0FBQ0EsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0EsQ0FBQzs7Ozs7O0FBTUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsNEJBQTRCLG1DQUFtQztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0VBQWtFO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7OztBQUtEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixtQ0FBbUM7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHJhY2tlci8uL3NyYy9iYWNrZ3JvdW5kLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBhY3RpdmVUYWJJZCA9IG51bGw7XG5sZXQgc2l0ZVRpbWVEYXRhID0ge307XG5sZXQgY3VycmVudEZhdkljb24gPSBudWxsO1xuXG5sZXQgY3VycmVudERvbWFpbiA9IG51bGw7XG5sZXQgaXNUcmFja2luZyA9IGZhbHNlO1xubGV0IGRpc3BsYXkgPSBcImRhdWdobnV0XCI7XG5cbmxldCBsYXN0VXBkYXRlVGltZSA9IG51bGw7XG5sZXQgdXBkYXRlSW50ZXJ2YWwgPSBudWxsO1xuXG4vL2Z1bmN0aW9uIHRoYXQgZ2V0cyB0aGUgZG9tYWluIG5hbWUgZnJvbSB0aGUgdXJsXG5mdW5jdGlvbiBnZXREb21haW4odXJsKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKCF1cmwpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBob3N0bmFtZSA9IG5ldyBVUkwodXJsKS5ob3N0bmFtZTtcbiAgICAgICAgcmV0dXJuIGhvc3RuYW1lIHx8IG51bGw7XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cblxuLy9mdW5jdGlvbiB0aGF0IGluY3JlbWVudHMgdGhlIHRpbWUgc3BlbnQgb24gYSB3ZWJzaXRlLCBtdWNoIGJldHRlciBmb3IgdXNlIHdoZW4gdGhlIHBvcHVwIGlzIG9wZW4gYXMgaXQgaXMgcmVsYXRpdmVseSBtb3JlIGFjY3VyYXRlXG5mdW5jdGlvbiBpbmNyZW1lbnRUaW1lKGRvbWFpbikge1xuICAgIGlmICghZG9tYWluKSByZXR1cm47XG4gICAgXG4gICAgc2l0ZVRpbWVEYXRhW2RvbWFpbl1bMV0gPSAoc2l0ZVRpbWVEYXRhW2RvbWFpbl1bMV0gfHwgMCkgKyAxO1xuICAgIGNvbnNvbGUubG9nKGBUaW1lIGluY3JlbWVudGVkIGZvciAke2RvbWFpbn06YCwgc2l0ZVRpbWVEYXRhW2RvbWFpbl1bMV0pO1xuICAgIFxuICAgIC8vIFNhdmUgdG8gc3RvcmFnZSBhbmQgbm90aWZ5IHBvcHVwIGlmIG9wZW5cbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBzaXRlVGltZURhdGEgfSwgKCkgPT4ge1xuICAgICAgICBpZiAoZGlzcGxheSA9PT0gXCJsaXN0XCIpIHtcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdHlwZTogJ3RpbWVVcGRhdGVMaXN0JyxcbiAgICAgICAgICAgIHRpbWVEYXRhOiBzaXRlVGltZURhdGFcbiAgICAgICAgXG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIC8vIElnbm9yZSBlcnJvciBpZiBwb3B1cCBpcyBjbG9zZWRcbiAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpc3BsYXkgPT09IFwiZGF1Z2hudXRcIikge1xuICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICd0aW1lVXBkYXRlRGF1Z2hudXQnLFxuICAgICAgICAgICAgICAgIHRpbWVEYXRhOiBzaXRlVGltZURhdGFcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBJZ25vcmUgZXJyb3IgaWYgcG9wdXAgaXMgY2xvc2VkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vL2Z1bmN0aW9uIHRoYXQgaW5jcmVtZW50cyB0aW1lIGFzIGxvbmcgYXMgdGhlIHBvcHVwIGlzIG9wZW4gYW5kIHRoZSB0YWIgaXMgYWN0aXZlXG5mdW5jdGlvbiBzdGFydFRyYWNraW5nKCkge1xuICAgIGlmICh1cGRhdGVJbnRlcnZhbCkge1xuICAgICAgICBjbGVhckludGVydmFsKHVwZGF0ZUludGVydmFsKTtcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmIChpc1RyYWNraW5nICYmIGN1cnJlbnREb21haW4pIHtcbiAgICAgICAgICAgIGluY3JlbWVudFRpbWUoY3VycmVudERvbWFpbik7XG4gICAgICAgIH1cbiAgICB9LCAxMDAwKTtcbn1cblxuZnVuY3Rpb24gc3RvcFRyYWNraW5nKCkge1xuICAgIGlmICh1cGRhdGVJbnRlcnZhbCkge1xuICAgICAgICBjbGVhckludGVydmFsKHVwZGF0ZUludGVydmFsKTtcbiAgICAgICAgdXBkYXRlSW50ZXJ2YWwgPSBudWxsO1xuICAgIH1cbn1cblxuLy9oYW5kbGluZyBmYXZpY29uc1xuXG4vL2NoZWNraW5nIGlmIHRoZSBiYWNrdXAgZmF2aWNvbiBpcyB2YWxpZFxuZnVuY3Rpb24gZmV0Y2hGYXZpY29uKHVybCwgY2FsbGJhY2spIHtcbiAgICBmZXRjaCh1cmwpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodXJsKTsgLy8gRmF2aWNvbiBpcyB2YWxpZFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsKTsgLy8gRmFsbGJhY2sgZmFpbGVkXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoKSA9PiBjYWxsYmFjayhudWxsKSk7IC8vIE5ldHdvcmsgZXJyb3Jcbn1cblxuLy9mdW5jdGlvbiB0aGF0IHVwZGF0ZXMgdGhlIHRpbWVTaXRlIGRhdGEgYW5kIGFkZHMgdGhlIGZhdmljb24gZm9yIHRoYXQgd2Vic2l0ZSB0byBpdFxuZnVuY3Rpb24gdXBkYXRlU2l0ZVRpbWVEYXRhKGRvbWFpbiwgZmF2aWNvbikge1xuICAgIGlmICghc2l0ZVRpbWVEYXRhW2RvbWFpbl0pIHtcbiAgICAgICAgc2l0ZVRpbWVEYXRhW2RvbWFpbl0gPSBbZmF2aWNvbiwgMF07IC8vIEFkZCBkb21haW4gd2l0aCBmYXZpY29uIGFuZCBpbml0aWFsIHRpbWVcbiAgICB9IGVsc2Uge1xuICAgICAgICBzaXRlVGltZURhdGFbZG9tYWluXVswXSA9IGZhdmljb247IC8vIFVwZGF0ZSBmYXZpY29uIGZvciBleGlzdGluZyBkb21haW5cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZhdlJvdXRpbmUoY3VycmVudERvbWFpbiwgY3VycmVudEZhdkljb24pIHtcbiAgICBpZiAoIWN1cnJlbnREb21haW4pIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRG9tYWluIGlzIG51bGwsIHNraXBwaW5nIGZhdmljb24gaGFuZGxpbmcuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRmFsbGJhY2sgZm9yIHdlYnNpdGVzIHdpdGhvdXQgYSBmYXZpY29uXG4gICAgaWYgKCFjdXJyZW50RmF2SWNvbikge1xuICAgICAgICBjb25zdCBmYWxsYmFja0Zhdmljb25VcmwgPSBgaHR0cHM6Ly8ke2N1cnJlbnREb21haW59L2Zhdmljb24uaWNvYDtcbiAgICAgICAgZmV0Y2hGYXZpY29uKGZhbGxiYWNrRmF2aWNvblVybCwgKHZhbGlkRmF2aWNvblVybCkgPT4ge1xuICAgICAgICAgICAgY3VycmVudEZhdkljb24gPSB2YWxpZEZhdmljb25VcmwgfHwgJ2Fzc2V0cy9kZWZhdWx0LWZhdmljb24ucG5nJztcbiAgICAgICAgICAgIHVwZGF0ZVNpdGVUaW1lRGF0YShjdXJyZW50RG9tYWluLCBjdXJyZW50RmF2SWNvbik7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHVwZGF0ZVNpdGVUaW1lRGF0YShjdXJyZW50RG9tYWluLCBjdXJyZW50RmF2SWNvbik7XG4gICAgfVxufVxuXG5cbi8vIE1lc3NhZ2UgaGFuZGxpbmdcbi8vL1xuXG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgICBpZiAobWVzc2FnZS50eXBlID09PSAnZ2V0RGF0YScpIHtcbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgdGltZURhdGE6IHNpdGVUaW1lRGF0YSB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIFxuICAgIGlmIChtZXNzYWdlLnR5cGUgPT09ICdzdGFydE9yUGF1c2UnKSB7XG4gICAgICAgIGlzVHJhY2tpbmcgPSBtZXNzYWdlLnN0YXR1cztcbiAgICAgICAgY29uc29sZS5sb2coJ1RyYWNraW5nIHN0YXR1cyBjaGFuZ2VkIHRvOicsIGlzVHJhY2tpbmcpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGlzVHJhY2tpbmcpIHtcbiAgICAgICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sICh0YWJzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRhYnNbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlVGFiSWQgPSB0YWJzWzBdLmlkO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50RG9tYWluID0gZ2V0RG9tYWluKHRhYnNbMF0udXJsKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEZhdkljb24gPSB0YWJzWzBdLmZhdkljb25Vcmw7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWJzWzBdLnVybC5zdGFydHNXaXRoKCdjaHJvbWU6Ly8nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEZhdkljb24gPSAnYXNzZXRzL2Nocm9tZS1mYXZpY29uLnBuZyc7IC8vIEFzc2lnbiBhIHNwZWNpZmljIGljb24gZm9yIENocm9tZSBpbnRlcm5hbCBwYWdlc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBmYXZSb3V0aW5lKGN1cnJlbnREb21haW4sIGN1cnJlbnRGYXZJY29uKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VHJhY2tpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N0YXJ0ZWQgdHJhY2tpbmcgZm9yOicsIGN1cnJlbnREb21haW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RvcFRyYWNraW5nKCk7XG4gICAgICAgICAgICBhY3RpdmVUYWJJZCA9IG51bGw7XG4gICAgICAgICAgICBjdXJyZW50RG9tYWluID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgaXNUcmFja2luZyB9KTtcbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3RhdHVzOiAnc3VjY2VzcycgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBcbiAgICBpZiAobWVzc2FnZS50eXBlID09PSAnY2xlYXInKSB7XG4gICAgICAgIHNpdGVUaW1lRGF0YSA9IHt9O1xuICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBzaXRlVGltZURhdGEgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGVhcmVkIHRpbWUgZGF0YScpO1xuICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdGF0dXM6ICdzdWNjZXNzJyB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChtZXNzYWdlLnR5cGUgPT09ICdkYXVnaG51dCcpIHtcbiAgICAgICAgZGlzcGxheSA9IFwiZGF1Z2hudXRcIjtcbiAgICAgICAgY29uc29sZS5sb2coJ0Rpc3BsYXlpbmc6ICcsIGRpc3BsYXkpO1xuICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdGF0dXM6ICdzdWNjZXNzJyB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChtZXNzYWdlLnR5cGUgPT09ICdsaXN0JykgeyAgXG4gICAgICAgIGRpc3BsYXkgPSBcImxpc3RcIjtcbiAgICAgICAgY29uc29sZS5sb2coJ0Rpc3BsYXlpbmc6ICcsIGRpc3BsYXkpO1xuICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdGF0dXM6ICdzdWNjZXNzJyB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufSk7XG5cblxuXG5cblxuLy8gVGFiIGZvY3VzIGhhbmRsaW5nXG5cbmNocm9tZS53aW5kb3dzLm9uRm9jdXNDaGFuZ2VkLmFkZExpc3RlbmVyKCh3aW5kb3dJZCkgPT4ge1xuICAgIGlmICghaXNUcmFja2luZykgcmV0dXJuO1xuICAgIFxuICAgIGlmICh3aW5kb3dJZCA9PT0gY2hyb21lLndpbmRvd3MuV0lORE9XX0lEX05PTkUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1dpbmRvdyBsb3N0IGZvY3VzJyk7XG4gICAgICAgIHN0b3BUcmFja2luZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdXaW5kb3cgZ2FpbmVkIGZvY3VzJyk7XG4gICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sICh0YWJzKSA9PiB7XG4gICAgICAgICAgICBpZiAodGFic1swXSkge1xuICAgICAgICAgICAgICAgIGFjdGl2ZVRhYklkID0gdGFic1swXS5pZDtcbiAgICAgICAgICAgICAgICBjdXJyZW50RG9tYWluID0gZ2V0RG9tYWluKHRhYnNbMF0udXJsKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50RmF2SWNvbiA9IHRhYnNbMF0uZmF2SWNvblVybDtcbiAgICAgICAgICAgICAgICBpZiAodGFic1swXS51cmwuc3RhcnRzV2l0aCgnY2hyb21lOi8vJykpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEZhdkljb24gPSAnYXNzZXRzL2Nocm9tZS1mYXZpY29uLnBuZyc7IC8vIEFzc2lnbiBhIHNwZWNpZmljIGljb24gZm9yIENocm9tZSBpbnRlcm5hbCBwYWdlc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBmYXZSb3V0aW5lKGN1cnJlbnREb21haW4sIGN1cnJlbnRGYXZJY29uKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzdGFydFRyYWNraW5nKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3VtZWQgdHJhY2tpbmcgZm9yOicsIGN1cnJlbnREb21haW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxuLy8gbGlzdGVucyB0byB3aGVuIGEgdGFiIGJlY29tZXMgdGhlIGFjdGl2ZSB0YWIgaSB0aGUgYnJvd3NlclxuY2hyb21lLnRhYnMub25BY3RpdmF0ZWQuYWRkTGlzdGVuZXIoKGFjdGl2ZUluZm8pID0+IHtcbiAgICBpZiAoIWlzVHJhY2tpbmcpIHJldHVybjtcbiAgICBzdG9wVHJhY2tpbmcoKTtcbiAgICBcbiAgICBjaHJvbWUudGFicy5nZXQoYWN0aXZlSW5mby50YWJJZCwgKHRhYikgPT4ge1xuICAgICAgICBhY3RpdmVUYWJJZCA9IHRhYi5pZDtcbiAgICAgICAgY3VycmVudERvbWFpbiA9IGdldERvbWFpbih0YWIudXJsKTtcbiAgICAgICAgY3VycmVudEZhdkljb24gPSB0YWIuZmF2SWNvblVybDtcbiAgICAgICAgY29uc29sZS5sb2coJ0N1cnJlbnQgZG9tYWluOicsIHRhYi51cmwpO1xuICAgICAgICBpZiAodGFiLnVybC5zdGFydHNXaXRoKCdjaHJvbWU6Ly8nKSkge1xuICAgICAgICAgICAgY3VycmVudEZhdkljb24gPSAnYXNzZXRzL2Nocm9tZS1mYXZpY29uLnBuZyc7IC8vIEFzc2lnbiBhIHNwZWNpZmljIGljb24gZm9yIENocm9tZSBpbnRlcm5hbCBwYWdlc1xuICAgICAgICB9XG4gICAgICAgXG4gICAgICAgIGZhdlJvdXRpbmUoY3VycmVudERvbWFpbiwgY3VycmVudEZhdkljb24pO1xuICAgICAgICBcbiAgICAgICAgc3RhcnRUcmFja2luZygpO1xuICAgICAgICBjb25zb2xlLmxvZygnVGFiIGFjdGl2YXRlZDonLCBjdXJyZW50RG9tYWluKTtcbiAgICB9KTtcbn0pO1xuLy9UaGlzIGxpc3RlbnMgdG8gY2hhbmdlIHdpdGhpbiB0aGUgdGFiIGl0c2VsZiwgYWx0aG91Z2ggZW50aXJlbHkgdW5zdXJlIHdoZXRoZXIgaXQgaXMgbmVjZXNzYXJ5LCBpdCB3b3JrcyBmb3Igbm93IHNvIEkgd291bGQga2VlcCBpdFxuY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKCh0YWJJZCwgY2hhbmdlSW5mbywgdGFiKSA9PiB7XG4gICAgaWYgKCFpc1RyYWNraW5nKSByZXR1cm47XG4gICAgaWYgKHRhYklkID09PSBhY3RpdmVUYWJJZCAmJiBjaGFuZ2VJbmZvLnVybCkge1xuICAgICAgICBzdG9wVHJhY2tpbmcoKTtcbiAgICAgICAgY3VycmVudERvbWFpbiA9IGdldERvbWFpbihjaGFuZ2VJbmZvLnVybCk7XG4gICAgICAgIGN1cnJlbnRGYXZJY29uID0gdGFiLmZhdkljb25Vcmw7XG4gICAgICAgIGlmICh0YWIudXJsLnN0YXJ0c1dpdGgoJ2Nocm9tZTovLycpKSB7XG4gICAgICAgICAgICBjdXJyZW50RmF2SWNvbiA9ICdhc3NldHMvY2hyb21lLWZhdmljb24ucG5nJzsgLy8gQXNzaWduIGEgc3BlY2lmaWMgaWNvbiBmb3IgQ2hyb21lIGludGVybmFsIHBhZ2VzXG4gICAgICAgIH1cbiAgICAgICAgZmF2Um91dGluZShjdXJyZW50RG9tYWluLCBjdXJyZW50RmF2SWNvbik7XG4gICAgICAgIFxuICAgICAgICBzdGFydFRyYWNraW5nKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdUYWIgVVJMIHVwZGF0ZWQ6JywgY3VycmVudERvbWFpbik7XG4gICAgfVxufSk7XG5cblxuXG5cbi8vIEluaXRpYWxpemUgZnJvbSBzdG9yYWdlIHN0YXJ0cyB3b3JraW5nIHdoZW4gdGhlIGV4dGVuc2lvbiBpcyBvcGVuZWRcbmNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbJ2lzVHJhY2tpbmcnLCAnc2l0ZVRpbWVEYXRhJ10sIChyZXN1bHQpID0+IHtcbiAgICBpc1RyYWNraW5nID0gcmVzdWx0LmlzVHJhY2tpbmcgfHwgZmFsc2U7XG4gICAgc2l0ZVRpbWVEYXRhID0gcmVzdWx0LnNpdGVUaW1lRGF0YSB8fCB7fTtcbiAgICBcbiAgICBpZiAoaXNUcmFja2luZykge1xuICAgICAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCAodGFicykgPT4ge1xuICAgICAgICAgICAgaWYgKHRhYnNbMF0pIHtcbiAgICAgICAgICAgICAgICBhY3RpdmVUYWJJZCA9IHRhYnNbMF0uaWQ7XG4gICAgICAgICAgICAgICAgY3VycmVudERvbWFpbiA9IGdldERvbWFpbih0YWJzWzBdLnVybCk7XG4gICAgICAgICAgICAgICAgY3VycmVudEZhdkljb24gPSB0YWJzWzBdLmZhdkljb25Vcmw7XG4gICAgICAgICAgICAgICAgaWYgKHRhYnNbMF0udXJsLnN0YXJ0c1dpdGgoJ2Nocm9tZTovLycpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRGYXZJY29uID0gJ2Fzc2V0cy9jaHJvbWUtZmF2aWNvbi5wbmcnOyAvLyBBc3NpZ24gYSBzcGVjaWZpYyBpY29uIGZvciBDaHJvbWUgaW50ZXJuYWwgcGFnZXNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZmF2Um91dGluZShjdXJyZW50RG9tYWluLCBjdXJyZW50RmF2SWNvbik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc3RhcnRUcmFja2luZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59KTsgIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9