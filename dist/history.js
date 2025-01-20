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
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/popup/history.js":
/*!******************************!*\
  !*** ./src/popup/history.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Chart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Chart.js */ "./src/popup/components/Chart.js");
/* harmony import */ var _components_ListView_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/ListView.js */ "./src/popup/components/ListView.js");
/* harmony import */ var _utils_timeFormatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/timeFormatter */ "./src/popup/utils/timeFormatter.js");
/* harmony import */ var _history_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./history.css */ "./src/popup/history.css");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }




document.addEventListener('DOMContentLoaded', function () {
  var backButton = document.getElementById('back-to-tracker');
  var sessionList = document.getElementById('session-list');
  var activeSession = null;
  function formatDate(timestamp) {
    var date = new Date(timestamp);
    return date.toLocaleString();
  }
  function createExpandedView(sessionData) {
    var expandedView = document.createElement('div');
    expandedView.className = 'session-expanded-view';

    // Create view toggle buttons
    var toggleContainer = document.createElement('div');
    toggleContainer.className = 'view-toggle-container';
    var chartButton = document.createElement('button');
    chartButton.textContent = 'Chart View';
    chartButton.className = 'view-toggle-btn active';
    var listButton = document.createElement('button');
    listButton.textContent = 'List View';
    listButton.className = 'view-toggle-btn';
    toggleContainer.appendChild(chartButton);
    toggleContainer.appendChild(listButton);

    // Create view container
    var viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';
    expandedView.appendCçhild(toggleContainer);
    expandedView.appendChild(viewContainer);

    // Initialize with chart view
    var chart = new _components_Chart_js__WEBPACK_IMPORTED_MODULE_0__.ChartComponent(viewContainer);
    chart.update(sessionData.timeData);

    // Add click handlers
    chartButton.addEventListener('click', function () {
      if (listButton.classList.contains('active')) {
        chartButton.classList.add('active');
        listButton.classList.remove('active');
        viewContainer.innerHTML = '';
        var _chart = new _components_Chart_js__WEBPACK_IMPORTED_MODULE_0__.ChartComponent(viewContainer);
        _chart.update(sessionData.timeData);
      }
    });
    listButton.addEventListener('click', function () {
      if (chartButton.classList.contains('active')) {
        listButton.classList.add('active');
        chartButton.classList.remove('active');
        viewContainer.innerHTML = '';
        var listView = new _components_ListView_js__WEBPACK_IMPORTED_MODULE_1__.ListView(viewContainer);
        listView.update(sessionData.timeData);
      }
    });
    return expandedView;
  }
  function loadSessions() {
    chrome.storage.local.get(['sessions'], function (result) {
      var sessions = result.sessions || [];
      sessionList.innerHTML = '';
      sessions.slice().reverse().forEach(function (session, index) {
        var totalTime = Object.values(session.timeData).reduce(function (acc, _ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            _ = _ref2[0],
            time = _ref2[1];
          return acc + time;
        }, 0);
        var sitesCount = Object.keys(session.timeData).length;
        var sessionElement = document.createElement('div');
        sessionElement.className = 'session-item';
        sessionElement.innerHTML = "\n                    <div class=\"session-info\">\n                        <span>".concat(formatDate(session.timestamp), "</span>\n                        <span>").concat((0,_utils_timeFormatter__WEBPACK_IMPORTED_MODULE_2__.formatTime)(totalTime), "</span>\n                    </div>\n                    <div class=\"sites-count\">\n                        ").concat(sitesCount, " sites tracked\n                    </div>\n                    <div class=\"expand-indicator\">\u25BC</div>\n                ");
        var expandedView = null;
        sessionElement.addEventListener('click', function () {
          if (activeSession && activeSession !== sessionElement) {
            var _activeSession$nextEl;
            // Collapse the previously active session
            activeSession.classList.remove('expanded');
            (_activeSession$nextEl = activeSession.nextElementSibling) === null || _activeSession$nextEl === void 0 || _activeSession$nextEl.remove();
          }
          sessionElement.classList.toggle('expanded');
          if (sessionElement.classList.contains('expanded')) {
            if (!expandedView) {
              expandedView = createExpandedView(session);
            }
            sessionElement.after(expandedView);
            activeSession = sessionElement;
          } else {
            var _expandedView;
            (_expandedView = expandedView) === null || _expandedView === void 0 || _expandedView.remove();
            activeSession = null;
          }
        });
        sessionList.appendChild(sessionElement);
      });
    });
  }
  backButton.addEventListener('click', function () {
    window.location.href = 'popup.html';
  });
  loadSessions();
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/popup/history.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/popup/history.css ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./popup.css */ "./node_modules/css-loader/dist/cjs.js!./src/popup/popup.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_listview_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./listview.css */ "./node_modules/css-loader/dist/cjs.js!./src/popup/listview.css");
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_listview_css__WEBPACK_IMPORTED_MODULE_3__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* Import base styles */

/* Base styles */
body {
    background-color: #0f0f1a;
    height: auto;
    min-height: 400px;
    margin: 0;
    padding: 0;
}

/* History container styles */
.history-container {
    padding: 20px;
    color: #35918b;
}

.history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

/* Session list styles */
.session-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.session-item {
    background: #12122d;
    padding: 15px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}

.session-item:hover {
    background: #1a1a3a;
}

.session-info {
    display: flex;
    justify-content: space-between;
    font-weight: 500;
}

.sites-count {
    color: #999;
    margin-top: 5px;
    font-size: 0.9em;
}

.expand-indicator {
    position: absolute;
    right: 15px;
    bottom: 10px;
    color: #999;
    font-size: 12px;
    transition: transform 0.3s ease;
}

.session-item.expanded {
    background: #1a1a3a;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin-bottom: 0;
}

.session-item.expanded .expand-indicator {
    transform: rotate(180deg);
}

/* Expanded view styles */
.session-expanded-view {
    background: #12122d;
    border-top: none;
    border-radius: 0 0 8px 8px;
    margin-top: 0;
    padding: 20px;
}

/* View toggle styles */
.view-toggle-container {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 20px;
}

.view-toggle-btn {
    padding: 8px 24px;
    border: none;
    border-radius: 8px;
    background-color: #1a1a3a;
    color: #999;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
}

.view-toggle-btn:hover {
    background-color: #252538;
}

.view-toggle-btn.active {
    background-color: #35918b;
    color: white;
}

.view-container {
    height: 300px;
    position: relative;
}

/* List View Specific Styles */
.list-scroll-container {
    height: 300px;
    overflow-y: auto;
    padding-right: 8px;
    margin-right: -8px;
}

.domain-list-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 8px 0;
}

.domain-entry {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 4px;
}

.favicon-container {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.favicon-image {
    width: 20px;
    height: 20px;
    object-fit: contain;
}

.domain-content {
    flex: 1;
    display: flex;
    gap: 8px;
    align-items: center;
    min-width: 0;
}

.domain-name {
    color: #35918b;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
}

.domain-time {
    color: #35918b;
    white-space: nowrap;
    font-size: 14px;
}

/* Scrollbar Styling */
.list-scroll-container::-webkit-scrollbar {
    width: 4px;
}

.list-scroll-container::-webkit-scrollbar-track {
    background: transparent;
}

.list-scroll-container::-webkit-scrollbar-thumb {
    background: rgba(53, 145, 139, 0.3);
    border-radius: 4px;
}

.list-scroll-container::-webkit-scrollbar-thumb:hover {
    background: rgba(53, 145, 139, 0.5);
}

/* Back button style */
.buttons {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    background-color: #35918b;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
}

.buttons:hover {
    background-color: #2a7571;
}`, "",{"version":3,"sources":["webpack://./src/popup/history.css"],"names":[],"mappings":"AAAA,uBAAuB;;AAIvB,gBAAgB;AAChB;IACI,yBAAyB;IACzB,YAAY;IACZ,iBAAiB;IACjB,SAAS;IACT,UAAU;AACd;;AAEA,6BAA6B;AAC7B;IACI,aAAa;IACb,cAAc;AAClB;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,mBAAmB;IACnB,mBAAmB;AACvB;;AAEA,wBAAwB;AACxB;IACI,aAAa;IACb,sBAAsB;IACtB,SAAS;AACb;;AAEA;IACI,mBAAmB;IACnB,aAAa;IACb,kBAAkB;IAClB,eAAe;IACf,yBAAyB;IACzB,kBAAkB;AACtB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,gBAAgB;AACpB;;AAEA;IACI,WAAW;IACX,eAAe;IACf,gBAAgB;AACpB;;AAEA;IACI,kBAAkB;IAClB,WAAW;IACX,YAAY;IACZ,WAAW;IACX,eAAe;IACf,+BAA+B;AACnC;;AAEA;IACI,mBAAmB;IACnB,4BAA4B;IAC5B,6BAA6B;IAC7B,gBAAgB;AACpB;;AAEA;IACI,yBAAyB;AAC7B;;AAEA,yBAAyB;AACzB;IACI,mBAAmB;IACnB,gBAAgB;IAChB,0BAA0B;IAC1B,aAAa;IACb,aAAa;AACjB;;AAEA,uBAAuB;AACvB;IACI,aAAa;IACb,uBAAuB;IACvB,SAAS;IACT,mBAAmB;AACvB;;AAEA;IACI,iBAAiB;IACjB,YAAY;IACZ,kBAAkB;IAClB,yBAAyB;IACzB,WAAW;IACX,eAAe;IACf,yBAAyB;IACzB,eAAe;AACnB;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI,yBAAyB;IACzB,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,kBAAkB;AACtB;;AAEA,8BAA8B;AAC9B;IACI,aAAa;IACb,gBAAgB;IAChB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,SAAS;IACT,cAAc;AAClB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,SAAS;IACT,YAAY;AAChB;;AAEA;IACI,cAAc;IACd,WAAW;IACX,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,uBAAuB;AAC3B;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,mBAAmB;AACvB;;AAEA;IACI,OAAO;IACP,aAAa;IACb,QAAQ;IACR,mBAAmB;IACnB,YAAY;AAChB;;AAEA;IACI,cAAc;IACd,OAAO;IACP,mBAAmB;IACnB,gBAAgB;IAChB,uBAAuB;IACvB,eAAe;AACnB;;AAEA;IACI,cAAc;IACd,mBAAmB;IACnB,eAAe;AACnB;;AAEA,sBAAsB;AACtB;IACI,UAAU;AACd;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;IACI,mCAAmC;IACnC,kBAAkB;AACtB;;AAEA;IACI,mCAAmC;AACvC;;AAEA,sBAAsB;AACtB;IACI,iBAAiB;IACjB,YAAY;IACZ,kBAAkB;IAClB,yBAAyB;IACzB,YAAY;IACZ,eAAe;IACf,yBAAyB;AAC7B;;AAEA;IACI,yBAAyB;AAC7B","sourcesContent":["/* Import base styles */\n@import './popup.css';\n@import './listview.css';\n\n/* Base styles */\nbody {\n    background-color: #0f0f1a;\n    height: auto;\n    min-height: 400px;\n    margin: 0;\n    padding: 0;\n}\n\n/* History container styles */\n.history-container {\n    padding: 20px;\n    color: #35918b;\n}\n\n.history-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 20px;\n}\n\n/* Session list styles */\n.session-list {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n}\n\n.session-item {\n    background: #12122d;\n    padding: 15px;\n    border-radius: 8px;\n    cursor: pointer;\n    transition: all 0.3s ease;\n    position: relative;\n}\n\n.session-item:hover {\n    background: #1a1a3a;\n}\n\n.session-info {\n    display: flex;\n    justify-content: space-between;\n    font-weight: 500;\n}\n\n.sites-count {\n    color: #999;\n    margin-top: 5px;\n    font-size: 0.9em;\n}\n\n.expand-indicator {\n    position: absolute;\n    right: 15px;\n    bottom: 10px;\n    color: #999;\n    font-size: 12px;\n    transition: transform 0.3s ease;\n}\n\n.session-item.expanded {\n    background: #1a1a3a;\n    border-bottom-left-radius: 0;\n    border-bottom-right-radius: 0;\n    margin-bottom: 0;\n}\n\n.session-item.expanded .expand-indicator {\n    transform: rotate(180deg);\n}\n\n/* Expanded view styles */\n.session-expanded-view {\n    background: #12122d;\n    border-top: none;\n    border-radius: 0 0 8px 8px;\n    margin-top: 0;\n    padding: 20px;\n}\n\n/* View toggle styles */\n.view-toggle-container {\n    display: flex;\n    justify-content: center;\n    gap: 12px;\n    margin-bottom: 20px;\n}\n\n.view-toggle-btn {\n    padding: 8px 24px;\n    border: none;\n    border-radius: 8px;\n    background-color: #1a1a3a;\n    color: #999;\n    cursor: pointer;\n    transition: all 0.3s ease;\n    font-size: 14px;\n}\n\n.view-toggle-btn:hover {\n    background-color: #252538;\n}\n\n.view-toggle-btn.active {\n    background-color: #35918b;\n    color: white;\n}\n\n.view-container {\n    height: 300px;\n    position: relative;\n}\n\n/* List View Specific Styles */\n.list-scroll-container {\n    height: 300px;\n    overflow-y: auto;\n    padding-right: 8px;\n    margin-right: -8px;\n}\n\n.domain-list-container {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n    padding: 8px 0;\n}\n\n.domain-entry {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n    padding: 4px;\n}\n\n.favicon-container {\n    flex-shrink: 0;\n    width: 20px;\n    height: 20px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.favicon-image {\n    width: 20px;\n    height: 20px;\n    object-fit: contain;\n}\n\n.domain-content {\n    flex: 1;\n    display: flex;\n    gap: 8px;\n    align-items: center;\n    min-width: 0;\n}\n\n.domain-name {\n    color: #35918b;\n    flex: 1;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 14px;\n}\n\n.domain-time {\n    color: #35918b;\n    white-space: nowrap;\n    font-size: 14px;\n}\n\n/* Scrollbar Styling */\n.list-scroll-container::-webkit-scrollbar {\n    width: 4px;\n}\n\n.list-scroll-container::-webkit-scrollbar-track {\n    background: transparent;\n}\n\n.list-scroll-container::-webkit-scrollbar-thumb {\n    background: rgba(53, 145, 139, 0.3);\n    border-radius: 4px;\n}\n\n.list-scroll-container::-webkit-scrollbar-thumb:hover {\n    background: rgba(53, 145, 139, 0.5);\n}\n\n/* Back button style */\n.buttons {\n    padding: 8px 16px;\n    border: none;\n    border-radius: 6px;\n    background-color: #35918b;\n    color: white;\n    cursor: pointer;\n    transition: all 0.3s ease;\n}\n\n.buttons:hover {\n    background-color: #2a7571;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/popup/history.css":
/*!*******************************!*\
  !*** ./src/popup/history.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_history_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./history.css */ "./node_modules/css-loader/dist/cjs.js!./src/popup/history.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_history_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_history_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_history_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_history_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"history": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunktracker"] = self["webpackChunktracker"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors","common"], () => (__webpack_require__("./src/popup/history.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVEO0FBQ0g7QUFDRDtBQUM1QjtBQUN2QkcsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFXO0VBQ3JELElBQU1DLFVBQVUsR0FBR0YsUUFBUSxDQUFDRyxjQUFjLENBQUMsaUJBQWlCLENBQUM7RUFDN0QsSUFBTUMsV0FBVyxHQUFHSixRQUFRLENBQUNHLGNBQWMsQ0FBQyxjQUFjLENBQUM7RUFDM0QsSUFBSUUsYUFBYSxHQUFHLElBQUk7RUFFeEIsU0FBU0MsVUFBVUEsQ0FBQ0MsU0FBUyxFQUFFO0lBQzNCLElBQU1DLElBQUksR0FBRyxJQUFJQyxJQUFJLENBQUNGLFNBQVMsQ0FBQztJQUNoQyxPQUFPQyxJQUFJLENBQUNFLGNBQWMsQ0FBQyxDQUFDO0VBQ2hDO0VBR0EsU0FBU0Msa0JBQWtCQSxDQUFDQyxXQUFXLEVBQUU7SUFDckMsSUFBTUMsWUFBWSxHQUFHYixRQUFRLENBQUNjLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDbERELFlBQVksQ0FBQ0UsU0FBUyxHQUFHLHVCQUF1Qjs7SUFFaEQ7SUFDQSxJQUFNQyxlQUFlLEdBQUdoQixRQUFRLENBQUNjLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDckRFLGVBQWUsQ0FBQ0QsU0FBUyxHQUFHLHVCQUF1QjtJQUVuRCxJQUFNRSxXQUFXLEdBQUdqQixRQUFRLENBQUNjLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDcERHLFdBQVcsQ0FBQ0MsV0FBVyxHQUFHLFlBQVk7SUFDdENELFdBQVcsQ0FBQ0YsU0FBUyxHQUFHLHdCQUF3QjtJQUVoRCxJQUFNSSxVQUFVLEdBQUduQixRQUFRLENBQUNjLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDbkRLLFVBQVUsQ0FBQ0QsV0FBVyxHQUFHLFdBQVc7SUFDcENDLFVBQVUsQ0FBQ0osU0FBUyxHQUFHLGlCQUFpQjtJQUV4Q0MsZUFBZSxDQUFDSSxXQUFXLENBQUNILFdBQVcsQ0FBQztJQUN4Q0QsZUFBZSxDQUFDSSxXQUFXLENBQUNELFVBQVUsQ0FBQzs7SUFFdkM7SUFDQSxJQUFNRSxhQUFhLEdBQUdyQixRQUFRLENBQUNjLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDbkRPLGFBQWEsQ0FBQ04sU0FBUyxHQUFHLGdCQUFnQjtJQUUxQ0YsWUFBWSxDQUFDUyxZQUFZLENBQUNOLGVBQWUsQ0FBQztJQUMxQ0gsWUFBWSxDQUFDTyxXQUFXLENBQUNDLGFBQWEsQ0FBQzs7SUFFdkM7SUFDQSxJQUFNRSxLQUFLLEdBQUcsSUFBSTFCLGdFQUFjLENBQUN3QixhQUFhLENBQUM7SUFDL0NFLEtBQUssQ0FBQ0MsTUFBTSxDQUFDWixXQUFXLENBQUNhLFFBQVEsQ0FBQzs7SUFFbEM7SUFDQVIsV0FBVyxDQUFDaEIsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07TUFDeEMsSUFBSWtCLFVBQVUsQ0FBQ08sU0FBUyxDQUFDQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDekNWLFdBQVcsQ0FBQ1MsU0FBUyxDQUFDRSxHQUFHLENBQUMsUUFBUSxDQUFDO1FBQ25DVCxVQUFVLENBQUNPLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNyQ1IsYUFBYSxDQUFDUyxTQUFTLEdBQUcsRUFBRTtRQUM1QixJQUFNUCxNQUFLLEdBQUcsSUFBSTFCLGdFQUFjLENBQUN3QixhQUFhLENBQUM7UUFDL0NFLE1BQUssQ0FBQ0MsTUFBTSxDQUFDWixXQUFXLENBQUNhLFFBQVEsQ0FBQztNQUN0QztJQUNKLENBQUMsQ0FBQztJQUVGTixVQUFVLENBQUNsQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtNQUN2QyxJQUFJZ0IsV0FBVyxDQUFDUyxTQUFTLENBQUNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUMxQ1IsVUFBVSxDQUFDTyxTQUFTLENBQUNFLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDbENYLFdBQVcsQ0FBQ1MsU0FBUyxDQUFDRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3RDUixhQUFhLENBQUNTLFNBQVMsR0FBRyxFQUFFO1FBQzVCLElBQU1DLFFBQVEsR0FBRyxJQUFJakMsNkRBQVEsQ0FBQ3VCLGFBQWEsQ0FBQztRQUM1Q1UsUUFBUSxDQUFDUCxNQUFNLENBQUNaLFdBQVcsQ0FBQ2EsUUFBUSxDQUFDO01BQ3pDO0lBQ0osQ0FBQyxDQUFDO0lBRUYsT0FBT1osWUFBWTtFQUN2QjtFQUVBLFNBQVNtQixZQUFZQSxDQUFBLEVBQUc7SUFDcEJDLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDQyxLQUFLLENBQUNDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFVBQUNDLE1BQU0sRUFBSztNQUMvQyxJQUFNQyxRQUFRLEdBQUdELE1BQU0sQ0FBQ0MsUUFBUSxJQUFJLEVBQUU7TUFDdENsQyxXQUFXLENBQUMwQixTQUFTLEdBQUcsRUFBRTtNQUUxQlEsUUFBUSxDQUFDQyxLQUFLLENBQUMsQ0FBQyxDQUFDQyxPQUFPLENBQUMsQ0FBQyxDQUFDQyxPQUFPLENBQUMsVUFBQ0MsT0FBTyxFQUFFQyxLQUFLLEVBQUs7UUFDbkQsSUFBTUMsU0FBUyxHQUFHQyxNQUFNLENBQUNDLE1BQU0sQ0FBQ0osT0FBTyxDQUFDakIsUUFBUSxDQUFDLENBQzVDc0IsTUFBTSxDQUFDLFVBQUNDLEdBQUcsRUFBQUMsSUFBQTtVQUFBLElBQUFDLEtBQUEsR0FBQUMsY0FBQSxDQUFBRixJQUFBO1lBQUdHLENBQUMsR0FBQUYsS0FBQTtZQUFFRyxJQUFJLEdBQUFILEtBQUE7VUFBQSxPQUFNRixHQUFHLEdBQUdLLElBQUk7UUFBQSxHQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFNQyxVQUFVLEdBQUdULE1BQU0sQ0FBQ1UsSUFBSSxDQUFDYixPQUFPLENBQUNqQixRQUFRLENBQUMsQ0FBQytCLE1BQU07UUFFdkQsSUFBTUMsY0FBYyxHQUFHekQsUUFBUSxDQUFDYyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ3BEMkMsY0FBYyxDQUFDMUMsU0FBUyxHQUFHLGNBQWM7UUFDekMwQyxjQUFjLENBQUMzQixTQUFTLHdGQUFBNEIsTUFBQSxDQUVScEQsVUFBVSxDQUFDb0MsT0FBTyxDQUFDbkMsU0FBUyxDQUFDLDZDQUFBbUQsTUFBQSxDQUM3QjNELGdFQUFVLENBQUM2QyxTQUFTLENBQUMsb0hBQUFjLE1BQUEsQ0FHM0JKLFVBQVUsbUlBR25CO1FBRUQsSUFBSXpDLFlBQVksR0FBRyxJQUFJO1FBRXZCNEMsY0FBYyxDQUFDeEQsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07VUFDM0MsSUFBSUksYUFBYSxJQUFJQSxhQUFhLEtBQUtvRCxjQUFjLEVBQUU7WUFBQSxJQUFBRSxxQkFBQTtZQUNuRDtZQUNBdEQsYUFBYSxDQUFDcUIsU0FBUyxDQUFDRyxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQzFDLENBQUE4QixxQkFBQSxHQUFBdEQsYUFBYSxDQUFDdUQsa0JBQWtCLGNBQUFELHFCQUFBLGVBQWhDQSxxQkFBQSxDQUFrQzlCLE1BQU0sQ0FBQyxDQUFDO1VBQzlDO1VBRUE0QixjQUFjLENBQUMvQixTQUFTLENBQUNtQyxNQUFNLENBQUMsVUFBVSxDQUFDO1VBRTNDLElBQUlKLGNBQWMsQ0FBQy9CLFNBQVMsQ0FBQ0MsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQy9DLElBQUksQ0FBQ2QsWUFBWSxFQUFFO2NBQ2ZBLFlBQVksR0FBR0Ysa0JBQWtCLENBQUMrQixPQUFPLENBQUM7WUFDOUM7WUFDQWUsY0FBYyxDQUFDSyxLQUFLLENBQUNqRCxZQUFZLENBQUM7WUFDbENSLGFBQWEsR0FBR29ELGNBQWM7VUFDbEMsQ0FBQyxNQUFNO1lBQUEsSUFBQU0sYUFBQTtZQUNILENBQUFBLGFBQUEsR0FBQWxELFlBQVksY0FBQWtELGFBQUEsZUFBWkEsYUFBQSxDQUFjbEMsTUFBTSxDQUFDLENBQUM7WUFDdEJ4QixhQUFhLEdBQUcsSUFBSTtVQUN4QjtRQUNKLENBQUMsQ0FBQztRQUVGRCxXQUFXLENBQUNnQixXQUFXLENBQUNxQyxjQUFjLENBQUM7TUFDM0MsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDO0VBQ047RUFFQXZELFVBQVUsQ0FBQ0QsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07SUFDdkMrRCxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsSUFBSSxHQUFHLFlBQVk7RUFDdkMsQ0FBQyxDQUFDO0VBRUZsQyxZQUFZLENBQUMsQ0FBQztBQUNsQixDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0hGO0FBQzZHO0FBQ2pCO0FBQ1k7QUFDRztBQUMzRyw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GLDBCQUEwQixzRkFBaUM7QUFDM0QsMEJBQTBCLHlGQUFpQztBQUMzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUMsT0FBTyxnR0FBZ0csYUFBYSxNQUFNLFlBQVksV0FBVyxZQUFZLFdBQVcsVUFBVSxNQUFNLFlBQVksTUFBTSxVQUFVLFVBQVUsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxZQUFZLE1BQU0sVUFBVSxZQUFZLFdBQVcsTUFB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Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7V0NoREE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RyYWNrZXIvLi9zcmMvcG9wdXAvaGlzdG9yeS5qcyIsIndlYnBhY2s6Ly90cmFja2VyLy4vc3JjL3BvcHVwL2hpc3RvcnkuY3NzIiwid2VicGFjazovL3RyYWNrZXIvLi9zcmMvcG9wdXAvaGlzdG9yeS5jc3M/NTdjMiIsIndlYnBhY2s6Ly90cmFja2VyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RyYWNrZXIvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly90cmFja2VyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RyYWNrZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RyYWNrZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90cmFja2VyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdHJhY2tlci93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly90cmFja2VyL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly90cmFja2VyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdHJhY2tlci93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdHJhY2tlci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvQ2hhcnQuanMnO1xuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tICcuL2NvbXBvbmVudHMvTGlzdFZpZXcuanMnO1xuaW1wb3J0IHsgZm9ybWF0VGltZSB9IGZyb20gJy4vdXRpbHMvdGltZUZvcm1hdHRlcic7XG5pbXBvcnQgJy4vaGlzdG9yeS5jc3MnO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGJhY2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFjay10by10cmFja2VyJyk7XG4gICAgY29uc3Qgc2Vzc2lvbkxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2Vzc2lvbi1saXN0Jyk7XG4gICAgbGV0IGFjdGl2ZVNlc3Npb24gPSBudWxsO1xuXG4gICAgZnVuY3Rpb24gZm9ybWF0RGF0ZSh0aW1lc3RhbXApIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHRpbWVzdGFtcCk7XG4gICAgICAgIHJldHVybiBkYXRlLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFeHBhbmRlZFZpZXcoc2Vzc2lvbkRhdGEpIHtcbiAgICAgICAgY29uc3QgZXhwYW5kZWRWaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGV4cGFuZGVkVmlldy5jbGFzc05hbWUgPSAnc2Vzc2lvbi1leHBhbmRlZC12aWV3JztcbiAgICAgICAgXG4gICAgICAgIC8vIENyZWF0ZSB2aWV3IHRvZ2dsZSBidXR0b25zXG4gICAgICAgIGNvbnN0IHRvZ2dsZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0b2dnbGVDb250YWluZXIuY2xhc3NOYW1lID0gJ3ZpZXctdG9nZ2xlLWNvbnRhaW5lcic7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjaGFydEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjaGFydEJ1dHRvbi50ZXh0Q29udGVudCA9ICdDaGFydCBWaWV3JztcbiAgICAgICAgY2hhcnRCdXR0b24uY2xhc3NOYW1lID0gJ3ZpZXctdG9nZ2xlLWJ0biBhY3RpdmUnO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbGlzdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBsaXN0QnV0dG9uLnRleHRDb250ZW50ID0gJ0xpc3QgVmlldyc7XG4gICAgICAgIGxpc3RCdXR0b24uY2xhc3NOYW1lID0gJ3ZpZXctdG9nZ2xlLWJ0bic7XG4gICAgICAgIFxuICAgICAgICB0b2dnbGVDb250YWluZXIuYXBwZW5kQ2hpbGQoY2hhcnRCdXR0b24pO1xuICAgICAgICB0b2dnbGVDb250YWluZXIuYXBwZW5kQ2hpbGQobGlzdEJ1dHRvbik7XG4gICAgICAgIFxuICAgICAgICAvLyBDcmVhdGUgdmlldyBjb250YWluZXJcbiAgICAgICAgY29uc3Qgdmlld0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB2aWV3Q29udGFpbmVyLmNsYXNzTmFtZSA9ICd2aWV3LWNvbnRhaW5lcic7XG4gICAgICAgIFxuICAgICAgICBleHBhbmRlZFZpZXcuYXBwZW5kQ8OnaGlsZCh0b2dnbGVDb250YWluZXIpO1xuICAgICAgICBleHBhbmRlZFZpZXcuYXBwZW5kQ2hpbGQodmlld0NvbnRhaW5lcik7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB3aXRoIGNoYXJ0IHZpZXdcbiAgICAgICAgY29uc3QgY2hhcnQgPSBuZXcgQ2hhcnRDb21wb25lbnQodmlld0NvbnRhaW5lcik7XG4gICAgICAgIGNoYXJ0LnVwZGF0ZShzZXNzaW9uRGF0YS50aW1lRGF0YSk7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGQgY2xpY2sgaGFuZGxlcnNcbiAgICAgICAgY2hhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAobGlzdEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgY2hhcnRCdXR0b24uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgbGlzdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB2aWV3Q29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoYXJ0ID0gbmV3IENoYXJ0Q29tcG9uZW50KHZpZXdDb250YWluZXIpO1xuICAgICAgICAgICAgICAgIGNoYXJ0LnVwZGF0ZShzZXNzaW9uRGF0YS50aW1lRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgbGlzdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChjaGFydEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgbGlzdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBjaGFydEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB2aWV3Q29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RWaWV3ID0gbmV3IExpc3RWaWV3KHZpZXdDb250YWluZXIpO1xuICAgICAgICAgICAgICAgIGxpc3RWaWV3LnVwZGF0ZShzZXNzaW9uRGF0YS50aW1lRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBleHBhbmRlZFZpZXc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZFNlc3Npb25zKCkge1xuICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoWydzZXNzaW9ucyddLCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9ucyA9IHJlc3VsdC5zZXNzaW9ucyB8fCBbXTtcbiAgICAgICAgICAgIHNlc3Npb25MaXN0LmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgICAgICBzZXNzaW9ucy5zbGljZSgpLnJldmVyc2UoKS5mb3JFYWNoKChzZXNzaW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvdGFsVGltZSA9IE9iamVjdC52YWx1ZXMoc2Vzc2lvbi50aW1lRGF0YSlcbiAgICAgICAgICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCBbXywgdGltZV0pID0+IGFjYyArIHRpbWUsIDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNpdGVzQ291bnQgPSBPYmplY3Qua2V5cyhzZXNzaW9uLnRpbWVEYXRhKS5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzZXNzaW9uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHNlc3Npb25FbGVtZW50LmNsYXNzTmFtZSA9ICdzZXNzaW9uLWl0ZW0nO1xuICAgICAgICAgICAgICAgIHNlc3Npb25FbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlc3Npb24taW5mb1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtmb3JtYXREYXRlKHNlc3Npb24udGltZXN0YW1wKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2Zvcm1hdFRpbWUodG90YWxUaW1lKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2l0ZXMtY291bnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICR7c2l0ZXNDb3VudH0gc2l0ZXMgdHJhY2tlZFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImV4cGFuZC1pbmRpY2F0b3JcIj7ilrw8L2Rpdj5cbiAgICAgICAgICAgICAgICBgO1xuXG4gICAgICAgICAgICAgICAgbGV0IGV4cGFuZGVkVmlldyA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBzZXNzaW9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZVNlc3Npb24gJiYgYWN0aXZlU2Vzc2lvbiAhPT0gc2Vzc2lvbkVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvbGxhcHNlIHRoZSBwcmV2aW91c2x5IGFjdGl2ZSBzZXNzaW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVTZXNzaW9uLmNsYXNzTGlzdC5yZW1vdmUoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVTZXNzaW9uLm5leHRFbGVtZW50U2libGluZz8ucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uRWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlc3Npb25FbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZXhwYW5kZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFleHBhbmRlZFZpZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBhbmRlZFZpZXcgPSBjcmVhdGVFeHBhbmRlZFZpZXcoc2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uRWxlbWVudC5hZnRlcihleHBhbmRlZFZpZXcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlU2Vzc2lvbiA9IHNlc3Npb25FbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kZWRWaWV3Py5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVNlc3Npb24gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzZXNzaW9uTGlzdC5hcHBlbmRDaGlsZChzZXNzaW9uRWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmFja0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAncG9wdXAuaHRtbCc7XG4gICAgfSk7XG5cbiAgICBsb2FkU2Vzc2lvbnMoKTtcbn0pOyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfMF9fXyBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3BvcHVwLmNzc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfMV9fXyBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2xpc3R2aWV3LmNzc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18uaShfX19DU1NfTE9BREVSX0FUX1JVTEVfSU1QT1JUXzBfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18uaShfX19DU1NfTE9BREVSX0FUX1JVTEVfSU1QT1JUXzFfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAvKiBJbXBvcnQgYmFzZSBzdHlsZXMgKi9cblxuLyogQmFzZSBzdHlsZXMgKi9cbmJvZHkge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwZjBmMWE7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICAgIG1pbi1oZWlnaHQ6IDQwMHB4O1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xufVxuXG4vKiBIaXN0b3J5IGNvbnRhaW5lciBzdHlsZXMgKi9cbi5oaXN0b3J5LWNvbnRhaW5lciB7XG4gICAgcGFkZGluZzogMjBweDtcbiAgICBjb2xvcjogIzM1OTE4Yjtcbn1cblxuLmhpc3RvcnktaGVhZGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG5cbi8qIFNlc3Npb24gbGlzdCBzdHlsZXMgKi9cbi5zZXNzaW9uLWxpc3Qge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBnYXA6IDEwcHg7XG59XG5cbi5zZXNzaW9uLWl0ZW0ge1xuICAgIGJhY2tncm91bmQ6ICMxMjEyMmQ7XG4gICAgcGFkZGluZzogMTVweDtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uc2Vzc2lvbi1pdGVtOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiAjMWExYTNhO1xufVxuXG4uc2Vzc2lvbi1pbmZvIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBmb250LXdlaWdodDogNTAwO1xufVxuXG4uc2l0ZXMtY291bnQge1xuICAgIGNvbG9yOiAjOTk5O1xuICAgIG1hcmdpbi10b3A6IDVweDtcbiAgICBmb250LXNpemU6IDAuOWVtO1xufVxuXG4uZXhwYW5kLWluZGljYXRvciB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHJpZ2h0OiAxNXB4O1xuICAgIGJvdHRvbTogMTBweDtcbiAgICBjb2xvcjogIzk5OTtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTtcbn1cblxuLnNlc3Npb24taXRlbS5leHBhbmRlZCB7XG4gICAgYmFja2dyb3VuZDogIzFhMWEzYTtcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwO1xuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAwO1xuICAgIG1hcmdpbi1ib3R0b206IDA7XG59XG5cbi5zZXNzaW9uLWl0ZW0uZXhwYW5kZWQgLmV4cGFuZC1pbmRpY2F0b3Ige1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG59XG5cbi8qIEV4cGFuZGVkIHZpZXcgc3R5bGVzICovXG4uc2Vzc2lvbi1leHBhbmRlZC12aWV3IHtcbiAgICBiYWNrZ3JvdW5kOiAjMTIxMjJkO1xuICAgIGJvcmRlci10b3A6IG5vbmU7XG4gICAgYm9yZGVyLXJhZGl1czogMCAwIDhweCA4cHg7XG4gICAgbWFyZ2luLXRvcDogMDtcbiAgICBwYWRkaW5nOiAyMHB4O1xufVxuXG4vKiBWaWV3IHRvZ2dsZSBzdHlsZXMgKi9cbi52aWV3LXRvZ2dsZS1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgZ2FwOiAxMnB4O1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG5cbi52aWV3LXRvZ2dsZS1idG4ge1xuICAgIHBhZGRpbmc6IDhweCAyNHB4O1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzFhMWEzYTtcbiAgICBjb2xvcjogIzk5OTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcbiAgICBmb250LXNpemU6IDE0cHg7XG59XG5cbi52aWV3LXRvZ2dsZS1idG46aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMyNTI1Mzg7XG59XG5cbi52aWV3LXRvZ2dsZS1idG4uYWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzU5MThiO1xuICAgIGNvbG9yOiB3aGl0ZTtcbn1cblxuLnZpZXctY29udGFpbmVyIHtcbiAgICBoZWlnaHQ6IDMwMHB4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLyogTGlzdCBWaWV3IFNwZWNpZmljIFN0eWxlcyAqL1xuLmxpc3Qtc2Nyb2xsLWNvbnRhaW5lciB7XG4gICAgaGVpZ2h0OiAzMDBweDtcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIHBhZGRpbmctcmlnaHQ6IDhweDtcbiAgICBtYXJnaW4tcmlnaHQ6IC04cHg7XG59XG5cbi5kb21haW4tbGlzdC1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBnYXA6IDE2cHg7XG4gICAgcGFkZGluZzogOHB4IDA7XG59XG5cbi5kb21haW4tZW50cnkge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDEycHg7XG4gICAgcGFkZGluZzogNHB4O1xufVxuXG4uZmF2aWNvbi1jb250YWluZXIge1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIHdpZHRoOiAyMHB4O1xuICAgIGhlaWdodDogMjBweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5mYXZpY29uLWltYWdlIHtcbiAgICB3aWR0aDogMjBweDtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgb2JqZWN0LWZpdDogY29udGFpbjtcbn1cblxuLmRvbWFpbi1jb250ZW50IHtcbiAgICBmbGV4OiAxO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZ2FwOiA4cHg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtaW4td2lkdGg6IDA7XG59XG5cbi5kb21haW4tbmFtZSB7XG4gICAgY29sb3I6ICMzNTkxOGI7XG4gICAgZmxleDogMTtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4uZG9tYWluLXRpbWUge1xuICAgIGNvbG9yOiAjMzU5MThiO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4vKiBTY3JvbGxiYXIgU3R5bGluZyAqL1xuLmxpc3Qtc2Nyb2xsLWNvbnRhaW5lcjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgIHdpZHRoOiA0cHg7XG59XG5cbi5saXN0LXNjcm9sbC1jb250YWluZXI6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn1cblxuLmxpc3Qtc2Nyb2xsLWNvbnRhaW5lcjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoNTMsIDE0NSwgMTM5LCAwLjMpO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbn1cblxuLmxpc3Qtc2Nyb2xsLWNvbnRhaW5lcjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG92ZXIge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoNTMsIDE0NSwgMTM5LCAwLjUpO1xufVxuXG4vKiBCYWNrIGJ1dHRvbiBzdHlsZSAqL1xuLmJ1dHRvbnMge1xuICAgIHBhZGRpbmc6IDhweCAxNnB4O1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzM1OTE4YjtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG59XG5cbi5idXR0b25zOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmE3NTcxO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3BvcHVwL2hpc3RvcnkuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLHVCQUF1Qjs7QUFJdkIsZ0JBQWdCO0FBQ2hCO0lBQ0kseUJBQXlCO0lBQ3pCLFlBQVk7SUFDWixpQkFBaUI7SUFDakIsU0FBUztJQUNULFVBQVU7QUFDZDs7QUFFQSw2QkFBNkI7QUFDN0I7SUFDSSxhQUFhO0lBQ2IsY0FBYztBQUNsQjs7QUFFQTtJQUNJLGFBQWE7SUFDYiw4QkFBOEI7SUFDOUIsbUJBQW1CO0lBQ25CLG1CQUFtQjtBQUN2Qjs7QUFFQSx3QkFBd0I7QUFDeEI7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLFNBQVM7QUFDYjs7QUFFQTtJQUNJLG1CQUFtQjtJQUNuQixhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZix5QkFBeUI7SUFDekIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLDhCQUE4QjtJQUM5QixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsZUFBZTtJQUNmLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsWUFBWTtJQUNaLFdBQVc7SUFDWCxlQUFlO0lBQ2YsK0JBQStCO0FBQ25DOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLDRCQUE0QjtJQUM1Qiw2QkFBNkI7SUFDN0IsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBLHlCQUF5QjtBQUN6QjtJQUNJLG1CQUFtQjtJQUNuQixnQkFBZ0I7SUFDaEIsMEJBQTBCO0lBQzFCLGFBQWE7SUFDYixhQUFhO0FBQ2pCOztBQUVBLHVCQUF1QjtBQUN2QjtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsU0FBUztJQUNULG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6QixXQUFXO0lBQ1gsZUFBZTtJQUNmLHlCQUF5QjtJQUN6QixlQUFlO0FBQ25COztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isa0JBQWtCO0FBQ3RCOztBQUVBLDhCQUE4QjtBQUM5QjtJQUNJLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsU0FBUztJQUNULGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLFNBQVM7SUFDVCxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksY0FBYztJQUNkLFdBQVc7SUFDWCxZQUFZO0lBQ1osYUFBYTtJQUNiLG1CQUFtQjtJQUNuQix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLE9BQU87SUFDUCxhQUFhO0lBQ2IsUUFBUTtJQUNSLG1CQUFtQjtJQUNuQixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksY0FBYztJQUNkLE9BQU87SUFDUCxtQkFBbUI7SUFDbkIsZ0JBQWdCO0lBQ2hCLHVCQUF1QjtJQUN2QixlQUFlO0FBQ25COztBQUVBO0lBQ0ksY0FBYztJQUNkLG1CQUFtQjtJQUNuQixlQUFlO0FBQ25COztBQUVBLHNCQUFzQjtBQUN0QjtJQUNJLFVBQVU7QUFDZDs7QUFFQTtJQUNJLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLG1DQUFtQztJQUNuQyxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxtQ0FBbUM7QUFDdkM7O0FBRUEsc0JBQXNCO0FBQ3RCO0lBQ0ksaUJBQWlCO0lBQ2pCLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIseUJBQXlCO0lBQ3pCLFlBQVk7SUFDWixlQUFlO0lBQ2YseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIEltcG9ydCBiYXNlIHN0eWxlcyAqL1xcbkBpbXBvcnQgJy4vcG9wdXAuY3NzJztcXG5AaW1wb3J0ICcuL2xpc3R2aWV3LmNzcyc7XFxuXFxuLyogQmFzZSBzdHlsZXMgKi9cXG5ib2R5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzBmMGYxYTtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICBtaW4taGVpZ2h0OiA0MDBweDtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4vKiBIaXN0b3J5IGNvbnRhaW5lciBzdHlsZXMgKi9cXG4uaGlzdG9yeS1jb250YWluZXIge1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICBjb2xvcjogIzM1OTE4YjtcXG59XFxuXFxuLmhpc3RvcnktaGVhZGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbn1cXG5cXG4vKiBTZXNzaW9uIGxpc3Qgc3R5bGVzICovXFxuLnNlc3Npb24tbGlzdCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGdhcDogMTBweDtcXG59XFxuXFxuLnNlc3Npb24taXRlbSB7XFxuICAgIGJhY2tncm91bmQ6ICMxMjEyMmQ7XFxuICAgIHBhZGRpbmc6IDE1cHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5zZXNzaW9uLWl0ZW06aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kOiAjMWExYTNhO1xcbn1cXG5cXG4uc2Vzc2lvbi1pbmZvIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgICBmb250LXdlaWdodDogNTAwO1xcbn1cXG5cXG4uc2l0ZXMtY291bnQge1xcbiAgICBjb2xvcjogIzk5OTtcXG4gICAgbWFyZ2luLXRvcDogNXB4O1xcbiAgICBmb250LXNpemU6IDAuOWVtO1xcbn1cXG5cXG4uZXhwYW5kLWluZGljYXRvciB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgcmlnaHQ6IDE1cHg7XFxuICAgIGJvdHRvbTogMTBweDtcXG4gICAgY29sb3I6ICM5OTk7XFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTtcXG59XFxuXFxuLnNlc3Npb24taXRlbS5leHBhbmRlZCB7XFxuICAgIGJhY2tncm91bmQ6ICMxYTFhM2E7XFxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDA7XFxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAwO1xcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcbn1cXG5cXG4uc2Vzc2lvbi1pdGVtLmV4cGFuZGVkIC5leHBhbmQtaW5kaWNhdG9yIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcXG59XFxuXFxuLyogRXhwYW5kZWQgdmlldyBzdHlsZXMgKi9cXG4uc2Vzc2lvbi1leHBhbmRlZC12aWV3IHtcXG4gICAgYmFja2dyb3VuZDogIzEyMTIyZDtcXG4gICAgYm9yZGVyLXRvcDogbm9uZTtcXG4gICAgYm9yZGVyLXJhZGl1czogMCAwIDhweCA4cHg7XFxuICAgIG1hcmdpbi10b3A6IDA7XFxuICAgIHBhZGRpbmc6IDIwcHg7XFxufVxcblxcbi8qIFZpZXcgdG9nZ2xlIHN0eWxlcyAqL1xcbi52aWV3LXRvZ2dsZS1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZ2FwOiAxMnB4O1xcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbn1cXG5cXG4udmlldy10b2dnbGUtYnRuIHtcXG4gICAgcGFkZGluZzogOHB4IDI0cHg7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWExYTNhO1xcbiAgICBjb2xvcjogIzk5OTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxufVxcblxcbi52aWV3LXRvZ2dsZS1idG46aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjUyNTM4O1xcbn1cXG5cXG4udmlldy10b2dnbGUtYnRuLmFjdGl2ZSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzNTkxOGI7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuLnZpZXctY29udGFpbmVyIHtcXG4gICAgaGVpZ2h0OiAzMDBweDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4vKiBMaXN0IFZpZXcgU3BlY2lmaWMgU3R5bGVzICovXFxuLmxpc3Qtc2Nyb2xsLWNvbnRhaW5lciB7XFxuICAgIGhlaWdodDogMzAwcHg7XFxuICAgIG92ZXJmbG93LXk6IGF1dG87XFxuICAgIHBhZGRpbmctcmlnaHQ6IDhweDtcXG4gICAgbWFyZ2luLXJpZ2h0OiAtOHB4O1xcbn1cXG5cXG4uZG9tYWluLWxpc3QtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZ2FwOiAxNnB4O1xcbiAgICBwYWRkaW5nOiA4cHggMDtcXG59XFxuXFxuLmRvbWFpbi1lbnRyeSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogMTJweDtcXG4gICAgcGFkZGluZzogNHB4O1xcbn1cXG5cXG4uZmF2aWNvbi1jb250YWluZXIge1xcbiAgICBmbGV4LXNocmluazogMDtcXG4gICAgd2lkdGg6IDIwcHg7XFxuICAgIGhlaWdodDogMjBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5mYXZpY29uLWltYWdlIHtcXG4gICAgd2lkdGg6IDIwcHg7XFxuICAgIGhlaWdodDogMjBweDtcXG4gICAgb2JqZWN0LWZpdDogY29udGFpbjtcXG59XFxuXFxuLmRvbWFpbi1jb250ZW50IHtcXG4gICAgZmxleDogMTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZ2FwOiA4cHg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIG1pbi13aWR0aDogMDtcXG59XFxuXFxuLmRvbWFpbi1uYW1lIHtcXG4gICAgY29sb3I6ICMzNTkxOGI7XFxuICAgIGZsZXg6IDE7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxufVxcblxcbi5kb21haW4tdGltZSB7XFxuICAgIGNvbG9yOiAjMzU5MThiO1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxufVxcblxcbi8qIFNjcm9sbGJhciBTdHlsaW5nICovXFxuLmxpc3Qtc2Nyb2xsLWNvbnRhaW5lcjo6LXdlYmtpdC1zY3JvbGxiYXIge1xcbiAgICB3aWR0aDogNHB4O1xcbn1cXG5cXG4ubGlzdC1zY3JvbGwtY29udGFpbmVyOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4ubGlzdC1zY3JvbGwtY29udGFpbmVyOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XFxuICAgIGJhY2tncm91bmQ6IHJnYmEoNTMsIDE0NSwgMTM5LCAwLjMpO1xcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxufVxcblxcbi5saXN0LXNjcm9sbC1jb250YWluZXI6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZDogcmdiYSg1MywgMTQ1LCAxMzksIDAuNSk7XFxufVxcblxcbi8qIEJhY2sgYnV0dG9uIHN0eWxlICovXFxuLmJ1dHRvbnMge1xcbiAgICBwYWRkaW5nOiA4cHggMTZweDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzNTkxOGI7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xcbn1cXG5cXG4uYnV0dG9uczpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyYTc1NzE7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaGlzdG9yeS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcbm9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9oaXN0b3J5LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiaGlzdG9yeVwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt0cmFja2VyXCJdID0gc2VsZltcIndlYnBhY2tDaHVua3RyYWNrZXJcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yc1wiLFwiY29tbW9uXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3BvcHVwL2hpc3RvcnkuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6WyJDaGFydENvbXBvbmVudCIsIkxpc3RWaWV3IiwiZm9ybWF0VGltZSIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImJhY2tCdXR0b24iLCJnZXRFbGVtZW50QnlJZCIsInNlc3Npb25MaXN0IiwiYWN0aXZlU2Vzc2lvbiIsImZvcm1hdERhdGUiLCJ0aW1lc3RhbXAiLCJkYXRlIiwiRGF0ZSIsInRvTG9jYWxlU3RyaW5nIiwiY3JlYXRlRXhwYW5kZWRWaWV3Iiwic2Vzc2lvbkRhdGEiLCJleHBhbmRlZFZpZXciLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwidG9nZ2xlQ29udGFpbmVyIiwiY2hhcnRCdXR0b24iLCJ0ZXh0Q29udGVudCIsImxpc3RCdXR0b24iLCJhcHBlbmRDaGlsZCIsInZpZXdDb250YWluZXIiLCJhcHBlbmRDw6doaWxkIiwiY2hhcnQiLCJ1cGRhdGUiLCJ0aW1lRGF0YSIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiYWRkIiwicmVtb3ZlIiwiaW5uZXJIVE1MIiwibGlzdFZpZXciLCJsb2FkU2Vzc2lvbnMiLCJjaHJvbWUiLCJzdG9yYWdlIiwibG9jYWwiLCJnZXQiLCJyZXN1bHQiLCJzZXNzaW9ucyIsInNsaWNlIiwicmV2ZXJzZSIsImZvckVhY2giLCJzZXNzaW9uIiwiaW5kZXgiLCJ0b3RhbFRpbWUiLCJPYmplY3QiLCJ2YWx1ZXMiLCJyZWR1Y2UiLCJhY2MiLCJfcmVmIiwiX3JlZjIiLCJfc2xpY2VkVG9BcnJheSIsIl8iLCJ0aW1lIiwic2l0ZXNDb3VudCIsImtleXMiLCJsZW5ndGgiLCJzZXNzaW9uRWxlbWVudCIsImNvbmNhdCIsIl9hY3RpdmVTZXNzaW9uJG5leHRFbCIsIm5leHRFbGVtZW50U2libGluZyIsInRvZ2dsZSIsImFmdGVyIiwiX2V4cGFuZGVkVmlldyIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiJdLCJzb3VyY2VSb290IjoiIn0=