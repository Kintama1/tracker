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

/***/ "./src/popup/components/Chart.js":
/*!***************************************!*\
  !*** ./src/popup/components/Chart.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChartComponent: () => (/* binding */ ChartComponent)
/* harmony export */ });
/* harmony import */ var chart_js_auto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chart.js/auto */ "./node_modules/chart.js/auto/auto.js");
/* harmony import */ var _utils_timeFormatter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/timeFormatter */ "./src/popup/utils/timeFormatter.js");
/* harmony import */ var _utils_iconLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/iconLoader */ "./src/popup/utils/iconLoader.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var ChartComponent = /*#__PURE__*/function () {
  function ChartComponent(container, onOthersClick) {
    _classCallCheck(this, ChartComponent);
    this.container = container;
    this.onOthersClick = onOthersClick;
    this.donutChart = null;
    this.faviconUpdateInterval = null;
    this.otherDomains = [];
    this.totalTime = 0;
    this.chartOptions = {
      cutout: '70%',
      responsive: true,
      animation: {
        duration: 300
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: function label(context) {
              var domain = context.label;
              var time = context.raw;
              return "".concat(domain, ": ").concat((0,_utils_timeFormatter__WEBPACK_IMPORTED_MODULE_1__.formatTime)(time));
            }
          }
        }
      },
      elements: {
        arc: {
          borderWidth: 0
        }
      },
      maintainAspectRatio: false
    };
  }
  return _createClass(ChartComponent, [{
    key: "createTimerPlugin",
    value: function createTimerPlugin() {
      var _this = this;
      return {
        id: 'timerPlugin',
        beforeDraw: function beforeDraw(chart) {
          var ctx = chart.ctx,
            chartArea = chart.chartArea;
          var top = chartArea.top,
            bottom = chartArea.bottom,
            left = chartArea.left,
            right = chartArea.right;
          var centerX = (right + left) / 2;
          var centerY = (top + bottom) / 2;
          ctx.save();
          ctx.font = '1rem Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#35918b';
          ctx.fillText('Total Time', centerX, centerY - 10);
          ctx.font = '1.5rem Arial';
          ctx.fillText((0,_utils_timeFormatter__WEBPACK_IMPORTED_MODULE_1__.formatTime)(_this.totalTime), centerX, centerY + 15);
          ctx.restore();
        }
      };
    }
  }, {
    key: "update",
    value: function update(timeData) {
      var maxSegments = 5;
      var colorPalette = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
      var sortedDomains = Object.entries(timeData).sort(function (_ref, _ref2) {
        var _ref3 = _slicedToArray(_ref, 2),
          a = _ref3[1];
        var _ref4 = _slicedToArray(_ref2, 2),
          b = _ref4[1];
        return b[1] - a[1];
      });
      this.totalTime = sortedDomains.reduce(function (acc, _ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
          _ref6$ = _slicedToArray(_ref6[1], 2),
          time = _ref6$[1];
        return acc + time;
      }, 0);
      var topDomains = sortedDomains.slice(0, maxSegments - 1);
      this.otherDomains = sortedDomains.slice(maxSegments - 1);
      var otherTime = this.otherDomains.reduce(function (acc, _ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
          _ref8$ = _slicedToArray(_ref8[1], 2),
          time = _ref8$[1];
        return acc + time;
      }, 0);
      var labels = [].concat(_toConsumableArray(topDomains.map(function (_ref9) {
        var _ref10 = _slicedToArray(_ref9, 1),
          domain = _ref10[0];
        return domain;
      })), ['Others']);
      var data = [].concat(_toConsumableArray(topDomains.map(function (_ref11) {
        var _ref12 = _slicedToArray(_ref11, 2),
          _ref12$ = _slicedToArray(_ref12[1], 2),
          time = _ref12$[1];
        return time;
      })), [otherTime]);
      var favicons = _toConsumableArray(topDomains.map(function (_ref13) {
        var _ref14 = _slicedToArray(_ref13, 2),
          _ref14$ = _slicedToArray(_ref14[1], 1),
          favicon = _ref14$[0];
        return favicon || 'assets/default-favicon.png';
      }));
      if (favicons.length >= maxSegments - 1) {
        favicons.push('assets/others-favicon.png');
      }
      if (!this.donutChart) {
        this.createChart(labels, data, colorPalette, maxSegments, favicons);
      } else {
        this.updateChart(labels, data, favicons);
      }
      this.updateFavicons(favicons);
    }
  }, {
    key: "createChart",
    value: function createChart(labels, data, colorPalette, maxSegments, favicons) {
      this.container.innerHTML = '';
      var canvas = document.createElement('canvas');
      canvas.id = 'donut-chart';
      this.container.appendChild(canvas);
      this.donutChart = new chart_js_auto__WEBPACK_IMPORTED_MODULE_0__.Chart(canvas.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: colorPalette.slice(0, maxSegments)
          }]
        },
        options: this.chartOptions,
        plugins: [this.createTimerPlugin()]
      });
      this.donutChart.faviconData = favicons;
      this.setupEventListeners(canvas);
    }
  }, {
    key: "setupEventListeners",
    value: function setupEventListeners(canvas) {
      var _this2 = this;
      var isHoveringOthers = false;
      canvas.addEventListener('mousemove', function (event) {
        var points = _this2.donutChart.getElementsAtEventForMode(event, 'nearest', {
          intersect: true
        }, true);
        if (points.length) {
          var firstPoint = points[0];
          var label = _this2.donutChart.data.labels[firstPoint.index];
          if (label === 'Others') {
            if (!isHoveringOthers) {
              canvas.style.cursor = 'pointer';
              isHoveringOthers = true;
            }
          } else if (isHoveringOthers) {
            canvas.style.cursor = 'default';
            isHoveringOthers = false;
          }
        } else if (isHoveringOthers) {
          canvas.style.cursor = 'default';
          isHoveringOthers = false;
        }
      });
      canvas.addEventListener('click', function (event) {
        var points = _this2.donutChart.getElementsAtEventForMode(event, 'nearest', {
          intersect: true
        }, true);
        if (points.length) {
          var firstPoint = points[0];
          var label = _this2.donutChart.data.labels[firstPoint.index];
          if (label === 'Others' && _this2.onOthersClick) {
            _this2.onOthersClick(_this2.otherDomains);
          }
        }
      });
    }
  }, {
    key: "updateChart",
    value: function updateChart(labels, data, favicons) {
      this.donutChart.data.labels = labels;
      this.donutChart.data.datasets[0].data = data;
      this.donutChart.faviconData = favicons;
      this.donutChart.update('none');
    }
  }, {
    key: "updateFavicons",
    value: function updateFavicons(favicons) {
      var _this$donutChart,
        _this3 = this;
      if (this.faviconUpdateInterval) {
        clearInterval(this.faviconUpdateInterval);
      }
      if ((_this$donutChart = this.donutChart) !== null && _this$donutChart !== void 0 && _this$donutChart.ctx) {
        (0,_utils_iconLoader__WEBPACK_IMPORTED_MODULE_2__.drawFaviconsOnDonut)(this.donutChart, favicons);
        this.faviconUpdateInterval = setInterval(function () {
          var _this3$donutChart;
          if ((_this3$donutChart = _this3.donutChart) !== null && _this3$donutChart !== void 0 && _this3$donutChart.ctx) {
            (0,_utils_iconLoader__WEBPACK_IMPORTED_MODULE_2__.drawFaviconsOnDonut)(_this3.donutChart, favicons);
          }
        }, 200);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.faviconUpdateInterval) {
        clearInterval(this.faviconUpdateInterval);
      }
      if (this.donutChart) {
        this.donutChart.destroy();
        this.donutChart = null;
      }
    }
  }]);
}();

/***/ }),

/***/ "./src/popup/components/ListView.js":
/*!******************************************!*\
  !*** ./src/popup/components/ListView.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ListView: () => (/* binding */ ListView)
/* harmony export */ });
/* harmony import */ var _utils_timeFormatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/timeFormatter */ "./src/popup/utils/timeFormatter.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var ListView = /*#__PURE__*/function () {
  function ListView(container) {
    _classCallCheck(this, ListView);
    this.container = container;
  }
  return _createClass(ListView, [{
    key: "update",
    value: function update(timeData) {
      this.container.innerHTML = '';
      var sortedDomains = Object.entries(timeData).sort(function (_ref, _ref2) {
        var _ref3 = _slicedToArray(_ref, 2),
          a = _ref3[1];
        var _ref4 = _slicedToArray(_ref2, 2),
          b = _ref4[1];
        return b[1] - a[1];
      });
      if (sortedDomains.length === 0) {
        this.showEmptyState();
        return;
      }
      this.renderList(sortedDomains);
    }
  }, {
    key: "showEmptyState",
    value: function showEmptyState() {
      var emptyDiv = document.createElement('div');
      emptyDiv.className = 'no-data';
      emptyDiv.textContent = 'No tracking data available';
      this.container.appendChild(emptyDiv);
    }
  }, {
    key: "renderList",
    value: function renderList(sortedDomains) {
      var fragment = document.createDocumentFragment();
      sortedDomains.forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
          domain = _ref6[0],
          _ref6$ = _slicedToArray(_ref6[1], 2),
          favicon = _ref6$[0],
          time = _ref6$[1];
        var domainDiv = document.createElement('div');
        domainDiv.className = 'domain-entry';

        // Create and append favicon image
        var img = document.createElement('img');
        img.src = favicon || 'assets/default-favicon.png';
        img.alt = 'Favicon';
        img.width = 16;
        img.height = 16;
        img.onerror = function () {
          img.src = 'assets/default-favicon.png';
        };
        domainDiv.appendChild(img);

        // Create and append domain name
        var domainName = document.createElement('span');
        domainName.className = 'domain-name';
        domainName.textContent = domain;
        domainDiv.appendChild(domainName);

        // Create and append time
        var timeSpan = document.createElement('span');
        timeSpan.className = 'domain-time';
        timeSpan.textContent = (0,_utils_timeFormatter__WEBPACK_IMPORTED_MODULE_0__.formatTime)(time);
        domainDiv.appendChild(timeSpan);
        fragment.appendChild(domainDiv);
      });
      this.container.appendChild(fragment);
    }

    // Method to clean up any resources or event listeners
  }, {
    key: "destroy",
    value: function destroy() {
      this.container.innerHTML = '';
    }
  }]);
}();

/***/ }),

/***/ "./src/popup/components/Modal.js":
/*!***************************************!*\
  !*** ./src/popup/components/Modal.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Modal: () => (/* binding */ Modal)
/* harmony export */ });
/* harmony import */ var _utils_timeFormatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/timeFormatter */ "./src/popup/utils/timeFormatter.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var Modal = /*#__PURE__*/function () {
  function Modal() {
    _classCallCheck(this, Modal);
    this.clearConfirmModal = document.getElementById('clearConfirmModal');
    this.otherModal = document.getElementById('otherModal');
    this.activeModal = null;
    this.setupEventListeners();
  }
  return _createClass(Modal, [{
    key: "setupEventListeners",
    value: function setupEventListeners() {
      var _this = this;
      // Global click handler for closing modals
      window.addEventListener('click', function (event) {
        if (_this.activeModal && event.target === _this.activeModal) {
          _this.hide();
        }
      });

      // Setup other modal close button
      var otherModalCloseBtn = this.otherModal.querySelector('.close-btn');
      if (otherModalCloseBtn) {
        otherModalCloseBtn.addEventListener('click', function () {
          return _this.hide();
        });
      }

      // Prevent modal content clicks from closing the modal
      var modalContents = document.querySelectorAll('.modal-content');
      modalContents.forEach(function (content) {
        content.addEventListener('click', function (e) {
          return e.stopPropagation();
        });
      });
    }
  }, {
    key: "showClearConfirm",
    value: function showClearConfirm(onConfirm) {
      var _this2 = this;
      var confirmButton = document.getElementById('confirmClear');
      var cancelButton = document.getElementById('cancelClear');
      var saveCheckbox = document.getElementById('saveBeforeClear');

      // Remove existing listeners if any
      var newConfirmButton = confirmButton.cloneNode(true);
      var newCancelButton = cancelButton.cloneNode(true);
      confirmButton.parentNode.replaceChild(newConfirmButton, confirmButton);
      cancelButton.parentNode.replaceChild(newCancelButton, cancelButton);

      // Add new listeners
      newConfirmButton.addEventListener('click', function () {
        var shouldSaveSession = saveCheckbox.checked;
        onConfirm(shouldSaveSession);
        _this2.hide();
      });
      newCancelButton.addEventListener('click', function () {
        return _this2.hide();
      });
      this.show(this.clearConfirmModal);
    }
  }, {
    key: "showOtherDomains",
    value: function showOtherDomains(otherDomains) {
      console.log("show other domains is being called", otherDomains);
      var modalBody = this.otherModal.querySelector('.modal-body');
      modalBody.innerHTML = '';
      otherDomains.forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          domain = _ref2[0],
          _ref2$ = _slicedToArray(_ref2[1], 2),
          favicon = _ref2$[0],
          time = _ref2$[1];
        var domainDiv = document.createElement('div');
        domainDiv.className = 'domain-entry';
        domainDiv.innerHTML = "\n                <img src=\"".concat(favicon || 'assets/default-favicon.png', "\" \n                     alt=\"Favicon\" \n                     width=\"16\" \n                     height=\"16\">\n                <span class=\"domain-name\">").concat(domain, "</span>\n                <span class=\"domain-time\">").concat((0,_utils_timeFormatter__WEBPACK_IMPORTED_MODULE_0__.formatTime)(time), "</span>\n            ");
        modalBody.appendChild(domainDiv);
      });
      this.show(this.otherModal);
    }
  }, {
    key: "show",
    value: function show(modal) {
      this.activeModal = modal;
      modal.style.display = 'block';
    }
  }, {
    key: "hide",
    value: function hide() {
      if (this.activeModal) {
        this.activeModal.style.display = 'none';
        this.activeModal = null;
      }
    }

    // Method to check if any modal is currently visible
  }, {
    key: "isVisible",
    value: function isVisible() {
      return this.activeModal !== null;
    }

    // Clean up event listeners when needed
  }, {
    key: "destroy",
    value: function destroy() {
      window.removeEventListener('click', this.hide);
      var otherModalCloseBtn = this.otherModal.querySelector('.close-btn');
      if (otherModalCloseBtn) {
        otherModalCloseBtn.removeEventListener('click', this.hide);
      }
    }
  }]);
}();

/***/ }),

/***/ "./src/popup/popup.js":
/*!****************************!*\
  !*** ./src/popup/popup.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Chart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Chart */ "./src/popup/components/Chart.js");
/* harmony import */ var _components_ListView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/ListView */ "./src/popup/components/ListView.js");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Modal */ "./src/popup/components/Modal.js");
/* harmony import */ var _popup_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./popup.css */ "./src/popup/popup.css");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('time-tracker');
  var startButton = document.getElementById('start');
  var clearButton = document.getElementById('clear');
  var donutOption = document.getElementById('daughnut');
  var listOption = document.getElementById('list');
  var histView = document.getElementById('history');

  // State variables
  var isTracking = false;
  var timeData = {};
  var currentView = 'donut';

  // Component instances
  var modal = new _components_Modal__WEBPACK_IMPORTED_MODULE_2__.Modal();
  var chart = null;
  var listView = null;

  // UI State Management
  function updateButtonStyle(isTracking) {
    startButton.textContent = isTracking ? 'Pause' : 'Start';
    if (isTracking) {
      startButton.classList.add('active');
    } else {
      startButton.classList.remove('active');
    }
  }
  function updateOptionsStyle(button) {
    if (button === donutOption) {
      donutOption.classList.add('active');
      listOption.classList.remove('active');
      donutOption.disabled = true;
      listOption.disabled = false;
      currentView = 'donut';
    } else {
      listOption.classList.add('active');
      donutOption.classList.remove('active');
      listOption.disabled = true;
      donutOption.disabled = false;
      currentView = 'list';
    }
  }

  // Display Management
  function initializeChart() {
    if (!chart) {
      chart = new _components_Chart__WEBPACK_IMPORTED_MODULE_0__.ChartComponent(container, function () {
        if (chart && chart.otherDomains) {
          modal.showOtherDomains(chart.otherDomains);
        }
      });
    }
    return chart;
  }
  function initializeListView() {
    if (!listView) {
      listView = new _components_ListView__WEBPACK_IMPORTED_MODULE_1__.ListView(container);
    }
    return listView;
  }
  function updateDisplay(newTimeData) {
    var displayType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : currentView;
    timeData = newTimeData;
    if (displayType === 'donut') {
      if (listView) {
        listView.destroy();
        listView = null;
      }
      initializeChart().update(timeData);
    } else {
      if (chart) {
        chart.destroy();
        chart = null;
      }
      initializeListView().update(timeData);
    }
  }

  // Initialize popup
  function initializePopup() {
    chrome.runtime.sendMessage({
      type: 'getData'
    }, function (response) {
      if (response && response.timeData) {
        timeData = response.timeData;
        if (response.display === "daughnut") {
          updateOptionsStyle(donutOption);
          updateDisplay(timeData, 'donut');
        } else {
          updateOptionsStyle(listOption);
          updateDisplay(timeData, 'list');
        }
      }
    });

    // Get tracking status to update button
    chrome.storage.local.get(['isTracking'], function (result) {
      isTracking = result.isTracking || false;
      updateButtonStyle(isTracking);
    });
  }

  // Event Handlers
  function handleStartClick() {
    var newTrackingStatus = startButton.textContent === 'Start';
    chrome.runtime.sendMessage({
      type: 'startOrPause',
      status: newTrackingStatus
    }, function (response) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }
      updateButtonStyle(newTrackingStatus);
      if (!newTrackingStatus) {
        chrome.runtime.sendMessage({
          type: 'getData'
        }, function (response) {
          if (response && response.timeData) {
            updateDisplay(response.timeData);
          }
        });
      }
    });
  }
  function handleClearData(shouldSaveSession) {
    if (shouldSaveSession) {
      var session = {
        timestamp: Date.now(),
        timeData: _objectSpread({}, timeData)
      };
      chrome.storage.local.get(['sessions'], function (result) {
        var sessions = result.sessions || [];
        sessions.push(session);
        chrome.storage.local.set({
          sessions: sessions
        }, function () {
          chrome.runtime.sendMessage({
            type: 'clear'
          }, function () {
            timeData = {};
            updateDisplay(timeData);
          });
        });
      });
    } else {
      chrome.runtime.sendMessage({
        type: 'clear'
      }, function () {
        timeData = {};
        updateDisplay(timeData);
      });
    }
  }

  // Setup event listeners
  donutOption.addEventListener('click', function () {
    chrome.runtime.sendMessage({
      type: 'daughnut'
    }, function (response) {
      updateOptionsStyle(donutOption);
      if (response.timeData) {
        updateDisplay(response.timeData, 'donut');
      }
    });
  });
  listOption.addEventListener('click', function () {
    chrome.runtime.sendMessage({
      type: 'list'
    }, function (response) {
      updateOptionsStyle(listOption);
      if (response.timeData) {
        updateDisplay(response.timeData, 'list');
      }
    });
  });
  histView.addEventListener('click', function () {
    window.location.href = 'history.html';
  });
  startButton.addEventListener('click', handleStartClick);
  clearButton.addEventListener('click', function () {
    modal.showClearConfirm(handleClearData);
  });

  // Message listener
  chrome.runtime.onMessage.addListener(function (message) {
    if (message.timeData) {
      if (message.type === 'timeUpdateList' && currentView === 'list') {
        updateDisplay(message.timeData, 'list');
      } else if (message.type === 'timeUpdateDaughnut' && currentView === 'donut') {
        updateDisplay(message.timeData, 'donut');
      } else if (!isTracking) {
        updateDisplay(message.timeData);
      }
    }
  });

  // Initialize
  donutOption.disabled = true;
  container.innerHTML = '';
  initializePopup();

  // Cleanup when popup closes
  window.addEventListener('unload', function () {
    if (chart) {
      chart.destroy();
    }
    if (listView) {
      listView.destroy();
    }
    modal.destroy();
  });

  // Add styles
  var style = document.createElement('style');
  style.textContent = "\n        .domain-entry {\n            display: flex;\n            justify-content: space-between;\n            padding: 8px;\n            border-bottom: 1px solid #eee;\n        }\n        .domain-name {\n            font-weight: bold;\n            max-width: 70%;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            white-space: nowrap;\n        }\n        .domain-time {\n            color: #666;\n        }\n        .no-data {\n            padding: 20px;\n            color: #666;\n            font-style: italic;\n        }\n        #start {\n            transition: background-color 0.3s ease;\n        }\n        #start.active {\n            background-color: #ff4444;\n            color: white;\n        }\n    ";
  document.head.appendChild(style);
});

/***/ }),

/***/ "./src/popup/utils/iconLoader.js":
/*!***************************************!*\
  !*** ./src/popup/utils/iconLoader.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   drawFaviconsOnDonut: () => (/* binding */ drawFaviconsOnDonut),
/* harmony export */   loadAndDrawIcon: () => (/* binding */ loadAndDrawIcon)
/* harmony export */ });
function loadAndDrawIcon(faviconUrl, x, y, ctx) {
  var img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function () {
    var iconSize = 20;
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, iconSize / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, x - iconSize / 2, y - iconSize / 2, iconSize, iconSize);
    ctx.restore();
  };
  img.onerror = function () {
    var defaultImg = new Image();
    defaultImg.src = 'assets/default-favicon.png';
    defaultImg.onload = function () {
      var iconSize = 20;
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, iconSize / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(defaultImg, x - iconSize / 2, y - iconSize / 2, iconSize, iconSize);
      ctx.restore();
    };
  };
  img.src = faviconUrl;
}
function drawFaviconsOnDonut(chart, favicons) {
  var ctx = chart.ctx,
    chartArea = chart.chartArea;
  if (!chartArea) return;
  var top = chartArea.top,
    bottom = chartArea.bottom,
    left = chartArea.left,
    right = chartArea.right;
  var centerX = (right + left) / 2;
  var centerY = (top + bottom) / 2;
  var radius = Math.min(chartArea.width, chartArea.height) / 2;
  var iconRadius = radius * 0.85;
  favicons.forEach(function (favicon, index) {
    if (!chart.getDatasetMeta(0).data[index]) return;
    var segment = chart.getDatasetMeta(0).data[index];
    var rotationOffset = Math.PI / 1.95;
    var segmentAngle = (segment.startAngle + segment.endAngle) / 2 - Math.PI / 2 + rotationOffset;
    var x = centerX + Math.cos(segmentAngle) * iconRadius;
    var y = centerY + Math.sin(segmentAngle) * iconRadius;
    loadAndDrawIcon(favicon, x, y, ctx);
  });
}

/***/ }),

/***/ "./src/popup/utils/timeFormatter.js":
/*!******************************************!*\
  !*** ./src/popup/utils/timeFormatter.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatTime: () => (/* binding */ formatTime)
/* harmony export */ });
function formatTime(seconds) {
  if (seconds < 60) return "".concat(seconds, "s");
  if (seconds < 3600) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    return "".concat(minutes, "m ").concat(remainingSeconds, "s");
  }
  var hours = Math.floor(seconds / 3600);
  var remainingMinutes = Math.floor(seconds % 3600 / 60);
  return "".concat(hours, "h ").concat(remainingMinutes, "m");
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/popup/popup.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/popup/popup.css ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `body {
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    line-height: 1.6;
    color: #35918b;
    margin: 0;
    padding: 0;
    height : 400px;
    width : 350px;
    text-align: center;
    background: #050518;
}
#time-tracker {
    padding: 10px;
    background: #050518;
}
.header {
    margin: 10px;
    display: flex;
    justify-content: space-between;
    color: #35918b;
}

.icon-container {
    display: flex;
    justify-content: space-around;
    width: 100px;
    gap: 10px;
    align-items: center;
}

.icons {
    background-color: #aaaadf;
    transition: background-color 0.3s ease;
    border-radius: 4px;
    border: none;
}

.icons:hover {
    background-color: #292091;
}

/* SVG colors for non-active state */
.icons svg {
    stroke: #0000ff; /* Blue stroke for non-active state */
}

.icons svg path,
.icons svg circle {
    stroke: #0000ff; /* Blue stroke for paths and circles */
}

/* SVG colors for active state */
.icons.active svg {
    stroke: #00ff00; /* Green stroke for active state */
}

.icons.active svg path,
.icons.active svg circle {
    stroke: #00ff00; /* Green stroke for paths and circles */
}

/* Specific styles for list icon fill */
#list svg g[id="Dribbble-Light-Preview"] g[id="icons"] path {
    fill: #0000ff; /* Blue fill for non-active state */
}

#list.active svg g[id="Dribbble-Light-Preview"] g[id="icons"] path {
    fill: #00ff00; /* Green fill for active state */
}

/* Keep your existing hover styles */
.icons:hover {
    background-color: #292091;
}

#daughnut.active,
#list.active {
    background-color: #292091;
}
/* buttons */



/* Buttons section working on them */
.button-container {
    display: flex;
    justify-content: center;
    padding : 1rem;
    gap: 2rem;
    margin-bottom: 2rem;

}
.buttons {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    color: white;
    background-color: #aaaadf;
    transition: background-color 0.3s;
}

.buttons:hover {
    background-color: #292091;
}
#start.active:hover {
    background-color: #5d1717;
    color: white;
}


/* Modal for other segment */

.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
}

.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #12122d;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 300px;
    color: #35918b;
}

.modal-body {
    max-height: 60vh;
    overflow-y: auto;
    padding: 10px 0;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 20px;
    color: #35918b;
    cursor: pointer;
    padding: 5px;
}

.close-btn:hover {
    color: #fff;
}

/* Style for modal domain entries */
.modal .domain-entry {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    border-bottom: 1px solid #35918b3d;
}

.modal .domain-entry img {
    width: 16px;
    height: 16px;
}

.modal .domain-entry .domain-name {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* Checkbox styling */
#saveBeforeClear {
    accent-color: #35918b;
}

/* Button container in modal */
.modal .button-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;
}

.modal .buttons {
    padding: 8px 16px;
    min-width: 80px;
}
.modal .buttons:hover {
    background-color: #292091;
}`, "",{"version":3,"sources":["webpack://./src/popup/popup.css"],"names":[],"mappings":"AAAA;IACI,oCAAoC;IACpC,eAAe;IACf,gBAAgB;IAChB,cAAc;IACd,SAAS;IACT,UAAU;IACV,cAAc;IACd,aAAa;IACb,kBAAkB;IAClB,mBAAmB;AACvB;AACA;IACI,aAAa;IACb,mBAAmB;AACvB;AACA;IACI,YAAY;IACZ,aAAa;IACb,8BAA8B;IAC9B,cAAc;AAClB;;AAEA;IACI,aAAa;IACb,6BAA6B;IAC7B,YAAY;IACZ,SAAS;IACT,mBAAmB;AACvB;;AAEA;IACI,yBAAyB;IACzB,sCAAsC;IACtC,kBAAkB;IAClB,YAAY;AAChB;;AAEA;IACI,yBAAyB;AAC7B;;AAEA,oCAAoC;AACpC;IACI,eAAe,EAAE,qCAAqC;AAC1D;;AAEA;;IAEI,eAAe,EAAE,sCAAsC;AAC3D;;AAEA,gCAAgC;AAChC;IACI,eAAe,EAAE,kCAAkC;AACvD;;AAEA;;IAEI,eAAe,EAAE,uCAAuC;AAC5D;;AAEA,uCAAuC;AACvC;IACI,aAAa,EAAE,mCAAmC;AACtD;;AAEA;IACI,aAAa,EAAE,gCAAgC;AACnD;;AAEA,oCAAoC;AACpC;IACI,yBAAyB;AAC7B;;AAEA;;IAEI,yBAAyB;AAC7B;AACA,YAAY;;;;AAIZ,oCAAoC;AACpC;IACI,aAAa;IACb,uBAAuB;IACvB,cAAc;IACd,SAAS;IACT,mBAAmB;;AAEvB;AACA;IACI,kBAAkB;IAClB,YAAY;IACZ,kBAAkB;IAClB,eAAe;IACf,eAAe;IACf,YAAY;IACZ,yBAAyB;IACzB,iCAAiC;AACrC;;AAEA;IACI,yBAAyB;AAC7B;AACA;IACI,yBAAyB;IACzB,YAAY;AAChB;;;AAGA,4BAA4B;;AAE5B;IACI,aAAa;IACb,eAAe;IACf,MAAM;IACN,OAAO;IACP,WAAW;IACX,YAAY;IACZ,oCAAoC;IACpC,aAAa;AACjB;;AAEA;IACI,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,gCAAgC;IAChC,mBAAmB;IACnB,aAAa;IACb,kBAAkB;IAClB,UAAU;IACV,gBAAgB;IAChB,cAAc;AAClB;;AAEA;IACI,gBAAgB;IAChB,gBAAgB;IAChB,eAAe;AACnB;;AAEA;IACI,kBAAkB;IAClB,SAAS;IACT,WAAW;IACX,eAAe;IACf,cAAc;IACd,eAAe;IACf,YAAY;AAChB;;AAEA;IACI,WAAW;AACf;;AAEA,mCAAmC;AACnC;IACI,aAAa;IACb,mBAAmB;IACnB,SAAS;IACT,YAAY;IACZ,kCAAkC;AACtC;;AAEA;IACI,WAAW;IACX,YAAY;AAChB;;AAEA;IACI,YAAY;IACZ,gBAAgB;IAChB,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA,qBAAqB;AACrB;IACI,qBAAqB;AACzB;;AAEA,8BAA8B;AAC9B;IACI,aAAa;IACb,uBAAuB;IACvB,SAAS;IACT,gBAAgB;AACpB;;AAEA;IACI,iBAAiB;IACjB,eAAe;AACnB;AACA;IACI,yBAAyB;AAC7B","sourcesContent":["body {\n    font-family: 'Open Sans', sans-serif;\n    font-size: 14px;\n    line-height: 1.6;\n    color: #35918b;\n    margin: 0;\n    padding: 0;\n    height : 400px;\n    width : 350px;\n    text-align: center;\n    background: #050518;\n}\n#time-tracker {\n    padding: 10px;\n    background: #050518;\n}\n.header {\n    margin: 10px;\n    display: flex;\n    justify-content: space-between;\n    color: #35918b;\n}\n\n.icon-container {\n    display: flex;\n    justify-content: space-around;\n    width: 100px;\n    gap: 10px;\n    align-items: center;\n}\n\n.icons {\n    background-color: #aaaadf;\n    transition: background-color 0.3s ease;\n    border-radius: 4px;\n    border: none;\n}\n\n.icons:hover {\n    background-color: #292091;\n}\n\n/* SVG colors for non-active state */\n.icons svg {\n    stroke: #0000ff; /* Blue stroke for non-active state */\n}\n\n.icons svg path,\n.icons svg circle {\n    stroke: #0000ff; /* Blue stroke for paths and circles */\n}\n\n/* SVG colors for active state */\n.icons.active svg {\n    stroke: #00ff00; /* Green stroke for active state */\n}\n\n.icons.active svg path,\n.icons.active svg circle {\n    stroke: #00ff00; /* Green stroke for paths and circles */\n}\n\n/* Specific styles for list icon fill */\n#list svg g[id=\"Dribbble-Light-Preview\"] g[id=\"icons\"] path {\n    fill: #0000ff; /* Blue fill for non-active state */\n}\n\n#list.active svg g[id=\"Dribbble-Light-Preview\"] g[id=\"icons\"] path {\n    fill: #00ff00; /* Green fill for active state */\n}\n\n/* Keep your existing hover styles */\n.icons:hover {\n    background-color: #292091;\n}\n\n#daughnut.active,\n#list.active {\n    background-color: #292091;\n}\n/* buttons */\n\n\n\n/* Buttons section working on them */\n.button-container {\n    display: flex;\n    justify-content: center;\n    padding : 1rem;\n    gap: 2rem;\n    margin-bottom: 2rem;\n\n}\n.buttons {\n    padding: 10px 20px;\n    border: none;\n    border-radius: 5px;\n    cursor: pointer;\n    font-size: 1rem;\n    color: white;\n    background-color: #aaaadf;\n    transition: background-color 0.3s;\n}\n\n.buttons:hover {\n    background-color: #292091;\n}\n#start.active:hover {\n    background-color: #5d1717;\n    color: white;\n}\n\n\n/* Modal for other segment */\n\n.modal {\n    display: none;\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.5);\n    z-index: 9999;\n}\n\n.modal-content {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    background: #12122d;\n    padding: 20px;\n    border-radius: 8px;\n    width: 80%;\n    max-width: 300px;\n    color: #35918b;\n}\n\n.modal-body {\n    max-height: 60vh;\n    overflow-y: auto;\n    padding: 10px 0;\n}\n\n.close-btn {\n    position: absolute;\n    top: 10px;\n    right: 15px;\n    font-size: 20px;\n    color: #35918b;\n    cursor: pointer;\n    padding: 5px;\n}\n\n.close-btn:hover {\n    color: #fff;\n}\n\n/* Style for modal domain entries */\n.modal .domain-entry {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    padding: 8px;\n    border-bottom: 1px solid #35918b3d;\n}\n\n.modal .domain-entry img {\n    width: 16px;\n    height: 16px;\n}\n\n.modal .domain-entry .domain-name {\n    flex-grow: 1;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n/* Checkbox styling */\n#saveBeforeClear {\n    accent-color: #35918b;\n}\n\n/* Button container in modal */\n.modal .button-container {\n    display: flex;\n    justify-content: center;\n    gap: 10px;\n    margin-top: 15px;\n}\n\n.modal .buttons {\n    padding: 8px 16px;\n    min-width: 80px;\n}\n.modal .buttons:hover {\n    background-color: #292091;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/popup/popup.css":
/*!*****************************!*\
  !*** ./src/popup/popup.css ***!
  \*****************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./popup.css */ "./node_modules/css-loader/dist/cjs.js!./src/popup/popup.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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
/******/ 			"popup": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./src/popup/popup.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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RUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxPQUFPLHNGQUFzRixZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLE1BQU0sS0FBSyxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssWUFBWSxPQUFPLFlBQVksTUFBTSxzQkFBc0IsT0FBTyxNQUFNLHNCQUFzQixPQUFPLFlBQVksTUFBTSxzQkFBc0IsT0FBTyxNQUFNLHNCQUFzQixPQUFPLFlBQVksTUFBTSxzQkFBc0IsT0FBTyxLQUFLLHNCQUFzQixPQUFPLFlBQVksTUFBTSxZQUFZ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O1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90cmFja2VyLy4vc3JjL3BvcHVwL2NvbXBvbmVudHMvQ2hhcnQuanMiLCJ3ZWJwYWNrOi8vdHJhY2tlci8uL3NyYy9wb3B1cC9jb21wb25lbnRzL0xpc3RWaWV3LmpzIiwid2VicGFjazovL3RyYWNrZXIvLi9zcmMvcG9wdXAvY29tcG9uZW50cy9Nb2RhbC5qcyIsIndlYnBhY2s6Ly90cmFja2VyLy4vc3JjL3BvcHVwL3BvcHVwLmpzIiwid2VicGFjazovL3RyYWNrZXIvLi9zcmMvcG9wdXAvdXRpbHMvaWNvbkxvYWRlci5qcyIsIndlYnBhY2s6Ly90cmFja2VyLy4vc3JjL3BvcHVwL3V0aWxzL3RpbWVGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vdHJhY2tlci8uL3NyYy9wb3B1cC9wb3B1cC5jc3MiLCJ3ZWJwYWNrOi8vdHJhY2tlci8uL3NyYy9wb3B1cC9wb3B1cC5jc3M/ZjJjNiIsIndlYnBhY2s6Ly90cmFja2VyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RyYWNrZXIvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly90cmFja2VyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RyYWNrZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RyYWNrZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90cmFja2VyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdHJhY2tlci93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly90cmFja2VyL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly90cmFja2VyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdHJhY2tlci93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdHJhY2tlci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhcnQgfSBmcm9tICdjaGFydC5qcy9hdXRvJztcbmltcG9ydCB7IGZvcm1hdFRpbWUgfSBmcm9tICcuLi91dGlscy90aW1lRm9ybWF0dGVyJztcbmltcG9ydCB7IGRyYXdGYXZpY29uc09uRG9udXQgfSBmcm9tICcuLi91dGlscy9pY29uTG9hZGVyJztcblxuZXhwb3J0IGNsYXNzIENoYXJ0Q29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIsIG9uT3RoZXJzQ2xpY2spIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMub25PdGhlcnNDbGljayA9IG9uT3RoZXJzQ2xpY2s7XG4gICAgICAgIHRoaXMuZG9udXRDaGFydCA9IG51bGw7XG4gICAgICAgIHRoaXMuZmF2aWNvblVwZGF0ZUludGVydmFsID0gbnVsbDtcbiAgICAgICAgdGhpcy5vdGhlckRvbWFpbnMgPSBbXTtcbiAgICAgICAgdGhpcy50b3RhbFRpbWUgPSAwO1xuXG4gICAgICAgIHRoaXMuY2hhcnRPcHRpb25zID0ge1xuICAgICAgICAgICAgY3V0b3V0OiAnNzAlJyxcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICBhbmltYXRpb246IHsgZHVyYXRpb246IDMwMCB9LFxuICAgICAgICAgICAgcGx1Z2luczoge1xuICAgICAgICAgICAgICAgIGxlZ2VuZDogeyBkaXNwbGF5OiBmYWxzZSB9LFxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogZnVuY3Rpb24oY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRvbWFpbiA9IGNvbnRleHQubGFiZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZSA9IGNvbnRleHQucmF3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtkb21haW59OiAke2Zvcm1hdFRpbWUodGltZSl9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgICAgIGFyYzogeyBib3JkZXJXaWR0aDogMCB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWFpbnRhaW5Bc3BlY3RSYXRpbzogZmFsc2VcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjcmVhdGVUaW1lclBsdWdpbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiAndGltZXJQbHVnaW4nLFxuICAgICAgICAgICAgYmVmb3JlRHJhdzogKGNoYXJ0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBjdHgsIGNoYXJ0QXJlYSB9ID0gY2hhcnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgeyB0b3AsIGJvdHRvbSwgbGVmdCwgcmlnaHQgfSA9IGNoYXJ0QXJlYTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBjZW50ZXJYID0gKHJpZ2h0ICsgbGVmdCkgLyAyO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbnRlclkgPSAodG9wICsgYm90dG9tKSAvIDI7XG5cbiAgICAgICAgICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gJzFyZW0gQXJpYWwnO1xuICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjMzU5MThiJztcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ1RvdGFsIFRpbWUnLCBjZW50ZXJYLCBjZW50ZXJZIC0gMTApO1xuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gJzEuNXJlbSBBcmlhbCc7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGZvcm1hdFRpbWUodGhpcy50b3RhbFRpbWUpLCBjZW50ZXJYLCBjZW50ZXJZICsgMTUpO1xuICAgICAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdXBkYXRlKHRpbWVEYXRhKSB7XG4gICAgICAgIGNvbnN0IG1heFNlZ21lbnRzID0gNTtcbiAgICAgICAgY29uc3QgY29sb3JQYWxldHRlID0gWycjRkY2QjZCJywgJyM0RUNEQzQnLCAnIzQ1QjdEMScsICcjOTZDRUI0JywgJyNGRkVFQUQnXTtcblxuICAgICAgICBjb25zdCBzb3J0ZWREb21haW5zID0gT2JqZWN0LmVudHJpZXModGltZURhdGEpXG4gICAgICAgICAgICAuc29ydCgoWywgYV0sIFssIGJdKSA9PiBiWzFdIC0gYVsxXSk7XG5cbiAgICAgICAgdGhpcy50b3RhbFRpbWUgPSBzb3J0ZWREb21haW5zLnJlZHVjZSgoYWNjLCBbLCBbLCB0aW1lXV0pID0+IGFjYyArIHRpbWUsIDApO1xuICAgICAgICBjb25zdCB0b3BEb21haW5zID0gc29ydGVkRG9tYWlucy5zbGljZSgwLCBtYXhTZWdtZW50cyAtIDEpO1xuICAgICAgICB0aGlzLm90aGVyRG9tYWlucyA9IHNvcnRlZERvbWFpbnMuc2xpY2UobWF4U2VnbWVudHMgLSAxKTtcbiAgICAgICAgY29uc3Qgb3RoZXJUaW1lID0gdGhpcy5vdGhlckRvbWFpbnMucmVkdWNlKChhY2MsIFssIFssIHRpbWVdXSkgPT4gYWNjICsgdGltZSwgMCk7XG5cbiAgICAgICAgY29uc3QgbGFiZWxzID0gWy4uLnRvcERvbWFpbnMubWFwKChbZG9tYWluXSkgPT4gZG9tYWluKSwgJ090aGVycyddO1xuICAgICAgICBjb25zdCBkYXRhID0gWy4uLnRvcERvbWFpbnMubWFwKChbLCBbLCB0aW1lXV0pID0+IHRpbWUpLCBvdGhlclRpbWVdO1xuICAgICAgICBjb25zdCBmYXZpY29ucyA9IFsuLi50b3BEb21haW5zLm1hcCgoWywgW2Zhdmljb25dXSkgPT4gZmF2aWNvbiB8fCAnYXNzZXRzL2RlZmF1bHQtZmF2aWNvbi5wbmcnKV07XG4gICAgICAgIGlmIChmYXZpY29ucy5sZW5ndGggPj0gbWF4U2VnbWVudHMgLSAxKSB7XG4gICAgICAgICAgICBmYXZpY29ucy5wdXNoKCdhc3NldHMvb3RoZXJzLWZhdmljb24ucG5nJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuZG9udXRDaGFydCkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVDaGFydChsYWJlbHMsIGRhdGEsIGNvbG9yUGFsZXR0ZSwgbWF4U2VnbWVudHMsIGZhdmljb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcnQobGFiZWxzLCBkYXRhLCBmYXZpY29ucyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZUZhdmljb25zKGZhdmljb25zKTtcbiAgICB9XG5cbiAgICBjcmVhdGVDaGFydChsYWJlbHMsIGRhdGEsIGNvbG9yUGFsZXR0ZSwgbWF4U2VnbWVudHMsIGZhdmljb25zKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgY2FudmFzLmlkID0gJ2RvbnV0LWNoYXJ0JztcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxuICAgICAgICB0aGlzLmRvbnV0Q2hhcnQgPSBuZXcgQ2hhcnQoY2FudmFzLmdldENvbnRleHQoJzJkJyksIHtcbiAgICAgICAgICAgIHR5cGU6ICdkb3VnaG51dCcsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbGFiZWxzLFxuICAgICAgICAgICAgICAgIGRhdGFzZXRzOiBbe1xuICAgICAgICAgICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yUGFsZXR0ZS5zbGljZSgwLCBtYXhTZWdtZW50cyksXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcHRpb25zOiB0aGlzLmNoYXJ0T3B0aW9ucyxcbiAgICAgICAgICAgIHBsdWdpbnM6IFt0aGlzLmNyZWF0ZVRpbWVyUGx1Z2luKCldXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZG9udXRDaGFydC5mYXZpY29uRGF0YSA9IGZhdmljb25zO1xuICAgICAgICB0aGlzLnNldHVwRXZlbnRMaXN0ZW5lcnMoY2FudmFzKTtcbiAgICB9XG5cbiAgICBzZXR1cEV2ZW50TGlzdGVuZXJzKGNhbnZhcykge1xuICAgICAgICBsZXQgaXNIb3ZlcmluZ090aGVycyA9IGZhbHNlO1xuXG4gICAgICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBvaW50cyA9IHRoaXMuZG9udXRDaGFydC5nZXRFbGVtZW50c0F0RXZlbnRGb3JNb2RlKFxuICAgICAgICAgICAgICAgIGV2ZW50LCAnbmVhcmVzdCcsIHsgaW50ZXJzZWN0OiB0cnVlIH0sIHRydWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChwb2ludHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3RQb2ludCA9IHBvaW50c1swXTtcbiAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuZG9udXRDaGFydC5kYXRhLmxhYmVsc1tmaXJzdFBvaW50LmluZGV4XTtcbiAgICAgICAgICAgICAgICBpZiAobGFiZWwgPT09ICdPdGhlcnMnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNIb3ZlcmluZ090aGVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzSG92ZXJpbmdPdGhlcnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc0hvdmVyaW5nT3RoZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG4gICAgICAgICAgICAgICAgICAgIGlzSG92ZXJpbmdPdGhlcnMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzSG92ZXJpbmdPdGhlcnMpIHtcbiAgICAgICAgICAgICAgICBjYW52YXMuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xuICAgICAgICAgICAgICAgIGlzSG92ZXJpbmdPdGhlcnMgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwb2ludHMgPSB0aGlzLmRvbnV0Q2hhcnQuZ2V0RWxlbWVudHNBdEV2ZW50Rm9yTW9kZShcbiAgICAgICAgICAgICAgICBldmVudCwgJ25lYXJlc3QnLCB7IGludGVyc2VjdDogdHJ1ZSB9LCB0cnVlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHBvaW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdFBvaW50ID0gcG9pbnRzWzBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5kb251dENoYXJ0LmRhdGEubGFiZWxzW2ZpcnN0UG9pbnQuaW5kZXhdO1xuICAgICAgICAgICAgICAgIGlmIChsYWJlbCA9PT0gJ090aGVycycgJiYgdGhpcy5vbk90aGVyc0NsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25PdGhlcnNDbGljayh0aGlzLm90aGVyRG9tYWlucyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVDaGFydChsYWJlbHMsIGRhdGEsIGZhdmljb25zKSB7XG4gICAgICAgIHRoaXMuZG9udXRDaGFydC5kYXRhLmxhYmVscyA9IGxhYmVscztcbiAgICAgICAgdGhpcy5kb251dENoYXJ0LmRhdGEuZGF0YXNldHNbMF0uZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuZG9udXRDaGFydC5mYXZpY29uRGF0YSA9IGZhdmljb25zO1xuICAgICAgICB0aGlzLmRvbnV0Q2hhcnQudXBkYXRlKCdub25lJyk7XG4gICAgfVxuXG4gICAgdXBkYXRlRmF2aWNvbnMoZmF2aWNvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMuZmF2aWNvblVwZGF0ZUludGVydmFsKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuZmF2aWNvblVwZGF0ZUludGVydmFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRvbnV0Q2hhcnQ/LmN0eCkge1xuICAgICAgICAgICAgZHJhd0Zhdmljb25zT25Eb251dCh0aGlzLmRvbnV0Q2hhcnQsIGZhdmljb25zKTtcbiAgICAgICAgICAgIHRoaXMuZmF2aWNvblVwZGF0ZUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRvbnV0Q2hhcnQ/LmN0eCkge1xuICAgICAgICAgICAgICAgICAgICBkcmF3RmF2aWNvbnNPbkRvbnV0KHRoaXMuZG9udXRDaGFydCwgZmF2aWNvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5mYXZpY29uVXBkYXRlSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5mYXZpY29uVXBkYXRlSW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRvbnV0Q2hhcnQpIHtcbiAgICAgICAgICAgIHRoaXMuZG9udXRDaGFydC5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLmRvbnV0Q2hhcnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IGZvcm1hdFRpbWUgfSBmcm9tICcuLi91dGlscy90aW1lRm9ybWF0dGVyJztcblxuZXhwb3J0IGNsYXNzIExpc3RWaWV3IHtcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgfVxuXG4gICAgdXBkYXRlKHRpbWVEYXRhKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBjb25zdCBzb3J0ZWREb21haW5zID0gT2JqZWN0LmVudHJpZXModGltZURhdGEpXG4gICAgICAgICAgICAuc29ydCgoWywgYV0sIFssIGJdKSA9PiBiWzFdIC0gYVsxXSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoc29ydGVkRG9tYWlucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0VtcHR5U3RhdGUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVuZGVyTGlzdChzb3J0ZWREb21haW5zKTtcbiAgICB9XG5cbiAgICBzaG93RW1wdHlTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgZW1wdHlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZW1wdHlEaXYuY2xhc3NOYW1lID0gJ25vLWRhdGEnO1xuICAgICAgICBlbXB0eURpdi50ZXh0Q29udGVudCA9ICdObyB0cmFja2luZyBkYXRhIGF2YWlsYWJsZSc7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKGVtcHR5RGl2KTtcbiAgICB9XG5cbiAgICByZW5kZXJMaXN0KHNvcnRlZERvbWFpbnMpIHtcbiAgICAgICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICAgICAgc29ydGVkRG9tYWlucy5mb3JFYWNoKChbZG9tYWluLCBbZmF2aWNvbiwgdGltZV1dKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkb21haW5EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRvbWFpbkRpdi5jbGFzc05hbWUgPSAnZG9tYWluLWVudHJ5JztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQ3JlYXRlIGFuZCBhcHBlbmQgZmF2aWNvbiBpbWFnZVxuICAgICAgICAgICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICBpbWcuc3JjID0gZmF2aWNvbiB8fCAnYXNzZXRzL2RlZmF1bHQtZmF2aWNvbi5wbmcnO1xuICAgICAgICAgICAgaW1nLmFsdCA9ICdGYXZpY29uJztcbiAgICAgICAgICAgIGltZy53aWR0aCA9IDE2O1xuICAgICAgICAgICAgaW1nLmhlaWdodCA9IDE2O1xuICAgICAgICAgICAgaW1nLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaW1nLnNyYyA9ICdhc3NldHMvZGVmYXVsdC1mYXZpY29uLnBuZyc7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZG9tYWluRGl2LmFwcGVuZENoaWxkKGltZyk7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSBhbmQgYXBwZW5kIGRvbWFpbiBuYW1lXG4gICAgICAgICAgICBjb25zdCBkb21haW5OYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgZG9tYWluTmFtZS5jbGFzc05hbWUgPSAnZG9tYWluLW5hbWUnO1xuICAgICAgICAgICAgZG9tYWluTmFtZS50ZXh0Q29udGVudCA9IGRvbWFpbjtcbiAgICAgICAgICAgIGRvbWFpbkRpdi5hcHBlbmRDaGlsZChkb21haW5OYW1lKTtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIGFuZCBhcHBlbmQgdGltZVxuICAgICAgICAgICAgY29uc3QgdGltZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICB0aW1lU3Bhbi5jbGFzc05hbWUgPSAnZG9tYWluLXRpbWUnO1xuICAgICAgICAgICAgdGltZVNwYW4udGV4dENvbnRlbnQgPSBmb3JtYXRUaW1lKHRpbWUpO1xuICAgICAgICAgICAgZG9tYWluRGl2LmFwcGVuZENoaWxkKHRpbWVTcGFuKTtcblxuICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZG9tYWluRGl2KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuICAgIH1cblxuICAgIC8vIE1ldGhvZCB0byBjbGVhbiB1cCBhbnkgcmVzb3VyY2VzIG9yIGV2ZW50IGxpc3RlbmVyc1xuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBmb3JtYXRUaW1lIH0gZnJvbSAnLi4vdXRpbHMvdGltZUZvcm1hdHRlcic7XG5cbmV4cG9ydCBjbGFzcyBNb2RhbCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJDb25maXJtTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xlYXJDb25maXJtTW9kYWwnKTtcbiAgICAgICAgdGhpcy5vdGhlck1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ290aGVyTW9kYWwnKTtcbiAgICAgICAgdGhpcy5hY3RpdmVNb2RhbCA9IG51bGw7XG4gICAgICAgIHRoaXMuc2V0dXBFdmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIHNldHVwRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIC8vIEdsb2JhbCBjbGljayBoYW5kbGVyIGZvciBjbG9zaW5nIG1vZGFsc1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZU1vZGFsICYmIGV2ZW50LnRhcmdldCA9PT0gdGhpcy5hY3RpdmVNb2RhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTZXR1cCBvdGhlciBtb2RhbCBjbG9zZSBidXR0b25cbiAgICAgICAgY29uc3Qgb3RoZXJNb2RhbENsb3NlQnRuID0gdGhpcy5vdGhlck1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1idG4nKTtcbiAgICAgICAgaWYgKG90aGVyTW9kYWxDbG9zZUJ0bikge1xuICAgICAgICAgICAgb3RoZXJNb2RhbENsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5oaWRlKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUHJldmVudCBtb2RhbCBjb250ZW50IGNsaWNrcyBmcm9tIGNsb3NpbmcgdGhlIG1vZGFsXG4gICAgICAgIGNvbnN0IG1vZGFsQ29udGVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW9kYWwtY29udGVudCcpO1xuICAgICAgICBtb2RhbENvbnRlbnRzLmZvckVhY2goY29udGVudCA9PiB7XG4gICAgICAgICAgICBjb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaG93Q2xlYXJDb25maXJtKG9uQ29uZmlybSkge1xuICAgICAgICBjb25zdCBjb25maXJtQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbmZpcm1DbGVhcicpO1xuICAgICAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FuY2VsQ2xlYXInKTtcbiAgICAgICAgY29uc3Qgc2F2ZUNoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmVCZWZvcmVDbGVhcicpO1xuXG4gICAgICAgIC8vIFJlbW92ZSBleGlzdGluZyBsaXN0ZW5lcnMgaWYgYW55XG4gICAgICAgIGNvbnN0IG5ld0NvbmZpcm1CdXR0b24gPSBjb25maXJtQnV0dG9uLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgY29uc3QgbmV3Q2FuY2VsQnV0dG9uID0gY2FuY2VsQnV0dG9uLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgY29uZmlybUJ1dHRvbi5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdDb25maXJtQnV0dG9uLCBjb25maXJtQnV0dG9uKTtcbiAgICAgICAgY2FuY2VsQnV0dG9uLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0NhbmNlbEJ1dHRvbiwgY2FuY2VsQnV0dG9uKTtcblxuICAgICAgICAvLyBBZGQgbmV3IGxpc3RlbmVyc1xuICAgICAgICBuZXdDb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2hvdWxkU2F2ZVNlc3Npb24gPSBzYXZlQ2hlY2tib3guY2hlY2tlZDtcbiAgICAgICAgICAgIG9uQ29uZmlybShzaG91bGRTYXZlU2Vzc2lvbik7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmV3Q2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5oaWRlKCkpO1xuXG4gICAgICAgIHRoaXMuc2hvdyh0aGlzLmNsZWFyQ29uZmlybU1vZGFsKTtcbiAgICB9XG5cbiAgICBzaG93T3RoZXJEb21haW5zKG90aGVyRG9tYWlucykge1xuICAgICAgICBjb25zb2xlLmxvZyggXCJzaG93IG90aGVyIGRvbWFpbnMgaXMgYmVpbmcgY2FsbGVkXCIsIG90aGVyRG9tYWlucyk7XG4gICAgICAgIGNvbnN0IG1vZGFsQm9keSA9IHRoaXMub3RoZXJNb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtYm9keScpO1xuICAgICAgICBtb2RhbEJvZHkuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgICAgb3RoZXJEb21haW5zLmZvckVhY2goKFtkb21haW4sIFtmYXZpY29uLCB0aW1lXV0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRvbWFpbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZG9tYWluRGl2LmNsYXNzTmFtZSA9ICdkb21haW4tZW50cnknO1xuICAgICAgICAgICAgZG9tYWluRGl2LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7ZmF2aWNvbiB8fCAnYXNzZXRzL2RlZmF1bHQtZmF2aWNvbi5wbmcnfVwiIFxuICAgICAgICAgICAgICAgICAgICAgYWx0PVwiRmF2aWNvblwiIFxuICAgICAgICAgICAgICAgICAgICAgd2lkdGg9XCIxNlwiIFxuICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PVwiMTZcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRvbWFpbi1uYW1lXCI+JHtkb21haW59PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZG9tYWluLXRpbWVcIj4ke2Zvcm1hdFRpbWUodGltZSl9PC9zcGFuPlxuICAgICAgICAgICAgYDtcbiAgICAgICAgICAgIG1vZGFsQm9keS5hcHBlbmRDaGlsZChkb21haW5EaXYpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNob3codGhpcy5vdGhlck1vZGFsKTtcbiAgICB9XG5cbiAgICBzaG93KG1vZGFsKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlTW9kYWwgPSBtb2RhbDtcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlTW9kYWwpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlTW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlTW9kYWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWV0aG9kIHRvIGNoZWNrIGlmIGFueSBtb2RhbCBpcyBjdXJyZW50bHkgdmlzaWJsZVxuICAgIGlzVmlzaWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlTW9kYWwgIT09IG51bGw7XG4gICAgfVxuXG4gICAgLy8gQ2xlYW4gdXAgZXZlbnQgbGlzdGVuZXJzIHdoZW4gbmVlZGVkXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oaWRlKTtcbiAgICAgICAgY29uc3Qgb3RoZXJNb2RhbENsb3NlQnRuID0gdGhpcy5vdGhlck1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1idG4nKTtcbiAgICAgICAgaWYgKG90aGVyTW9kYWxDbG9zZUJ0bikge1xuICAgICAgICAgICAgb3RoZXJNb2RhbENsb3NlQnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oaWRlKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBDaGFydENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9DaGFydCc7XG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gJy4vY29tcG9uZW50cy9MaXN0Vmlldyc7XG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4vY29tcG9uZW50cy9Nb2RhbCc7XG5pbXBvcnQgJy4vcG9wdXAuY3NzJztcblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZS10cmFja2VyJyk7XG4gICAgY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQnKTtcbiAgICBjb25zdCBjbGVhckJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbGVhcicpO1xuICAgIGNvbnN0IGRvbnV0T3B0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdWdobnV0Jyk7XG4gICAgY29uc3QgbGlzdE9wdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0Jyk7XG4gICAgY29uc3QgaGlzdFZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGlzdG9yeScpO1xuXG4gICAgLy8gU3RhdGUgdmFyaWFibGVzXG4gICAgbGV0IGlzVHJhY2tpbmcgPSBmYWxzZTtcbiAgICBsZXQgdGltZURhdGEgPSB7fTtcbiAgICBsZXQgY3VycmVudFZpZXcgPSAnZG9udXQnO1xuXG4gICAgLy8gQ29tcG9uZW50IGluc3RhbmNlc1xuICAgIGNvbnN0IG1vZGFsID0gbmV3IE1vZGFsKCk7XG4gICAgbGV0IGNoYXJ0ID0gbnVsbDtcbiAgICBsZXQgbGlzdFZpZXcgPSBudWxsO1xuXG4gICAgLy8gVUkgU3RhdGUgTWFuYWdlbWVudFxuICAgIGZ1bmN0aW9uIHVwZGF0ZUJ1dHRvblN0eWxlKGlzVHJhY2tpbmcpIHtcbiAgICAgICAgc3RhcnRCdXR0b24udGV4dENvbnRlbnQgPSBpc1RyYWNraW5nID8gJ1BhdXNlJyA6ICdTdGFydCc7XG4gICAgICAgIGlmIChpc1RyYWNraW5nKSB7XG4gICAgICAgICAgICBzdGFydEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXJ0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlT3B0aW9uc1N0eWxlKGJ1dHRvbikge1xuICAgICAgICBpZiAoYnV0dG9uID09PSBkb251dE9wdGlvbikge1xuICAgICAgICAgICAgZG9udXRPcHRpb24uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICBsaXN0T3B0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgZG9udXRPcHRpb24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgbGlzdE9wdGlvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgY3VycmVudFZpZXcgPSAnZG9udXQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGlzdE9wdGlvbi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGRvbnV0T3B0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgbGlzdE9wdGlvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBkb251dE9wdGlvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgY3VycmVudFZpZXcgPSAnbGlzdCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEaXNwbGF5IE1hbmFnZW1lbnRcbiAgICBmdW5jdGlvbiBpbml0aWFsaXplQ2hhcnQoKSB7XG4gICAgICAgIGlmICghY2hhcnQpIHtcbiAgICAgICAgICAgIGNoYXJ0ID0gbmV3IENoYXJ0Q29tcG9uZW50KGNvbnRhaW5lciwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGFydCAmJiBjaGFydC5vdGhlckRvbWFpbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kYWwuc2hvd090aGVyRG9tYWlucyhjaGFydC5vdGhlckRvbWFpbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaGFydDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0aWFsaXplTGlzdFZpZXcoKSB7XG4gICAgICAgIGlmICghbGlzdFZpZXcpIHtcbiAgICAgICAgICAgIGxpc3RWaWV3ID0gbmV3IExpc3RWaWV3KGNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpc3RWaWV3O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXkobmV3VGltZURhdGEsIGRpc3BsYXlUeXBlID0gY3VycmVudFZpZXcpIHtcbiAgICAgICAgdGltZURhdGEgPSBuZXdUaW1lRGF0YTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkaXNwbGF5VHlwZSA9PT0gJ2RvbnV0Jykge1xuICAgICAgICAgICAgaWYgKGxpc3RWaWV3KSB7XG4gICAgICAgICAgICAgICAgbGlzdFZpZXcuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIGxpc3RWaWV3ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluaXRpYWxpemVDaGFydCgpLnVwZGF0ZSh0aW1lRGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY2hhcnQpIHtcbiAgICAgICAgICAgICAgICBjaGFydC5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgY2hhcnQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5pdGlhbGl6ZUxpc3RWaWV3KCkudXBkYXRlKHRpbWVEYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEluaXRpYWxpemUgcG9wdXBcbiAgICBmdW5jdGlvbiBpbml0aWFsaXplUG9wdXAoKSB7XG4gICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdHlwZTogJ2dldERhdGEnIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnRpbWVEYXRhKSB7XG4gICAgICAgICAgICAgICAgdGltZURhdGEgPSByZXNwb25zZS50aW1lRGF0YTtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGlzcGxheSA9PT0gXCJkYXVnaG51dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZU9wdGlvbnNTdHlsZShkb251dE9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZURpc3BsYXkodGltZURhdGEsICdkb251dCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZU9wdGlvbnNTdHlsZShsaXN0T3B0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGlzcGxheSh0aW1lRGF0YSwgJ2xpc3QnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEdldCB0cmFja2luZyBzdGF0dXMgdG8gdXBkYXRlIGJ1dHRvblxuICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoWydpc1RyYWNraW5nJ10sIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlzVHJhY2tpbmcgPSByZXN1bHQuaXNUcmFja2luZyB8fCBmYWxzZTtcbiAgICAgICAgICAgIHVwZGF0ZUJ1dHRvblN0eWxlKGlzVHJhY2tpbmcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBFdmVudCBIYW5kbGVyc1xuICAgIGZ1bmN0aW9uIGhhbmRsZVN0YXJ0Q2xpY2soKSB7XG4gICAgICAgIGNvbnN0IG5ld1RyYWNraW5nU3RhdHVzID0gc3RhcnRCdXR0b24udGV4dENvbnRlbnQgPT09ICdTdGFydCc7XG4gICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdHlwZTogJ3N0YXJ0T3JQYXVzZScsIHN0YXR1czogbmV3VHJhY2tpbmdTdGF0dXMgfSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihjaHJvbWUucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXBkYXRlQnV0dG9uU3R5bGUobmV3VHJhY2tpbmdTdGF0dXMpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIW5ld1RyYWNraW5nU3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyB0eXBlOiAnZ2V0RGF0YScgfSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS50aW1lRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGlzcGxheShyZXNwb25zZS50aW1lRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlQ2xlYXJEYXRhKHNob3VsZFNhdmVTZXNzaW9uKSB7XG4gICAgICAgIGlmIChzaG91bGRTYXZlU2Vzc2lvbikge1xuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IHtcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgdGltZURhdGE6IHsuLi50aW1lRGF0YX1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbJ3Nlc3Npb25zJ10sIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZXNzaW9ucyA9IHJlc3VsdC5zZXNzaW9ucyB8fCBbXTtcbiAgICAgICAgICAgICAgICBzZXNzaW9ucy5wdXNoKHNlc3Npb24pO1xuICAgICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IHNlc3Npb25zIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyB0eXBlOiAnY2xlYXInIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVEYXRhID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVEaXNwbGF5KHRpbWVEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdHlwZTogJ2NsZWFyJyB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGltZURhdGEgPSB7fTtcbiAgICAgICAgICAgICAgICB1cGRhdGVEaXNwbGF5KHRpbWVEYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2V0dXAgZXZlbnQgbGlzdGVuZXJzXG4gICAgZG9udXRPcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdHlwZTogJ2RhdWdobnV0JyB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZU9wdGlvbnNTdHlsZShkb251dE9wdGlvbik7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UudGltZURhdGEpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVEaXNwbGF5KHJlc3BvbnNlLnRpbWVEYXRhLCAnZG9udXQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBsaXN0T3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IHR5cGU6ICdsaXN0JyB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZU9wdGlvbnNTdHlsZShsaXN0T3B0aW9uKTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS50aW1lRGF0YSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZURpc3BsYXkocmVzcG9uc2UudGltZURhdGEsICdsaXN0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaGlzdFZpZXcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2hpc3RvcnkuaHRtbCc7XG4gICAgfSk7XG5cbiAgICBzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVN0YXJ0Q2xpY2spO1xuXG4gICAgY2xlYXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIG1vZGFsLnNob3dDbGVhckNvbmZpcm0oaGFuZGxlQ2xlYXJEYXRhKTtcbiAgICB9KTtcblxuICAgIC8vIE1lc3NhZ2UgbGlzdGVuZXJcbiAgICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgaWYgKG1lc3NhZ2UudGltZURhdGEpIHtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnR5cGUgPT09ICd0aW1lVXBkYXRlTGlzdCcgJiYgY3VycmVudFZpZXcgPT09ICdsaXN0Jykge1xuICAgICAgICAgICAgICAgIHVwZGF0ZURpc3BsYXkobWVzc2FnZS50aW1lRGF0YSwgJ2xpc3QnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWVzc2FnZS50eXBlID09PSAndGltZVVwZGF0ZURhdWdobnV0JyAmJiBjdXJyZW50VmlldyA9PT0gJ2RvbnV0Jykge1xuICAgICAgICAgICAgICAgIHVwZGF0ZURpc3BsYXkobWVzc2FnZS50aW1lRGF0YSwgJ2RvbnV0Jyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFpc1RyYWNraW5nKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGlzcGxheShtZXNzYWdlLnRpbWVEYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gSW5pdGlhbGl6ZVxuICAgIGRvbnV0T3B0aW9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgaW5pdGlhbGl6ZVBvcHVwKCk7XG5cbiAgICAvLyBDbGVhbnVwIHdoZW4gcG9wdXAgY2xvc2VzXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3VubG9hZCcsICgpID0+IHtcbiAgICAgICAgaWYgKGNoYXJ0KSB7XG4gICAgICAgICAgICBjaGFydC5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpc3RWaWV3KSB7XG4gICAgICAgICAgICBsaXN0Vmlldy5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgbW9kYWwuZGVzdHJveSgpO1xuICAgIH0pO1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiAgICBcbiAgICAvLyBBZGQgc3R5bGVzXG4gICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlLnRleHRDb250ZW50ID0gYFxuICAgICAgICAuZG9tYWluLWVudHJ5IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgICBwYWRkaW5nOiA4cHg7XG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VlZTtcbiAgICAgICAgfVxuICAgICAgICAuZG9tYWluLW5hbWUge1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgICAgICBtYXgtd2lkdGg6IDcwJTtcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgIH1cbiAgICAgICAgLmRvbWFpbi10aW1lIHtcbiAgICAgICAgICAgIGNvbG9yOiAjNjY2O1xuICAgICAgICB9XG4gICAgICAgIC5uby1kYXRhIHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgICAgICAgICBjb2xvcjogIzY2NjtcbiAgICAgICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICAgICAgfVxuICAgICAgICAjc3RhcnQge1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzIGVhc2U7XG4gICAgICAgIH1cbiAgICAgICAgI3N0YXJ0LmFjdGl2ZSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY0NDQ0O1xuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICB9XG4gICAgYDtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbn0pOyIsImV4cG9ydCBmdW5jdGlvbiBsb2FkQW5kRHJhd0ljb24oZmF2aWNvblVybCwgeCwgeSwgY3R4KSB7XG4gICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG4gICAgXG4gICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgaWNvblNpemUgPSAyMDtcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHgsIHksIGljb25TaXplLzIsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgY3R4LmNsaXAoKTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIHggLSBpY29uU2l6ZS8yLCB5IC0gaWNvblNpemUvMiwgaWNvblNpemUsIGljb25TaXplKTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9O1xuICAgIFxuICAgIGltZy5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBkZWZhdWx0SW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGRlZmF1bHRJbWcuc3JjID0gJ2Fzc2V0cy9kZWZhdWx0LWZhdmljb24ucG5nJztcbiAgICAgICAgZGVmYXVsdEltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpY29uU2l6ZSA9IDIwO1xuICAgICAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5hcmMoeCwgeSwgaWNvblNpemUvMiwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICAgICAgY3R4LmNsaXAoKTtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoZGVmYXVsdEltZywgeCAtIGljb25TaXplLzIsIHkgLSBpY29uU2l6ZS8yLCBpY29uU2l6ZSwgaWNvblNpemUpO1xuICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFxuICAgIGltZy5zcmMgPSBmYXZpY29uVXJsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhd0Zhdmljb25zT25Eb251dChjaGFydCwgZmF2aWNvbnMpIHtcbiAgICBjb25zdCB7IGN0eCwgY2hhcnRBcmVhIH0gPSBjaGFydDtcbiAgICBpZiAoIWNoYXJ0QXJlYSkgcmV0dXJuO1xuICAgIFxuICAgIGNvbnN0IHsgdG9wLCBib3R0b20sIGxlZnQsIHJpZ2h0IH0gPSBjaGFydEFyZWE7XG4gICAgY29uc3QgY2VudGVyWCA9IChyaWdodCArIGxlZnQpIC8gMjtcbiAgICBjb25zdCBjZW50ZXJZID0gKHRvcCArIGJvdHRvbSkgLyAyO1xuICAgIGNvbnN0IHJhZGl1cyA9IE1hdGgubWluKGNoYXJ0QXJlYS53aWR0aCwgY2hhcnRBcmVhLmhlaWdodCkgLyAyO1xuICAgIGNvbnN0IGljb25SYWRpdXMgPSByYWRpdXMgKiAwLjg1O1xuICAgIFxuICAgIGZhdmljb25zLmZvckVhY2goKGZhdmljb24sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmICghY2hhcnQuZ2V0RGF0YXNldE1ldGEoMCkuZGF0YVtpbmRleF0pIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNlZ21lbnQgPSBjaGFydC5nZXREYXRhc2V0TWV0YSgwKS5kYXRhW2luZGV4XTtcbiAgICAgICAgY29uc3Qgcm90YXRpb25PZmZzZXQgPSBNYXRoLlBJLzEuOTU7XG4gICAgICAgIGNvbnN0IHNlZ21lbnRBbmdsZSA9IChzZWdtZW50LnN0YXJ0QW5nbGUgKyBzZWdtZW50LmVuZEFuZ2xlKSAvIDIgLSBNYXRoLlBJIC8gMiArIHJvdGF0aW9uT2Zmc2V0O1xuICAgICAgICBcbiAgICAgICAgY29uc3QgeCA9IGNlbnRlclggKyBNYXRoLmNvcyhzZWdtZW50QW5nbGUpICogaWNvblJhZGl1cztcbiAgICAgICAgY29uc3QgeSA9IGNlbnRlclkgKyBNYXRoLnNpbihzZWdtZW50QW5nbGUpICogaWNvblJhZGl1cztcbiAgICAgICAgXG4gICAgICAgIGxvYWRBbmREcmF3SWNvbihmYXZpY29uLCB4LCB5LCBjdHgpO1xuICAgIH0pO1xufSIsIlxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0VGltZShzZWNvbmRzKSB7XG4gICAgaWYgKHNlY29uZHMgPCA2MCkgcmV0dXJuIGAke3NlY29uZHN9c2A7XG4gICAgaWYgKHNlY29uZHMgPCAzNjAwKSB7XG4gICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCk7XG4gICAgICAgIGNvbnN0IHJlbWFpbmluZ1NlY29uZHMgPSBzZWNvbmRzICUgNjA7XG4gICAgICAgIHJldHVybiBgJHttaW51dGVzfW0gJHtyZW1haW5pbmdTZWNvbmRzfXNgO1xuICAgIH1cbiAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDM2MDApO1xuICAgIGNvbnN0IHJlbWFpbmluZ01pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWNvbmRzICUgMzYwMCkgLyA2MCk7XG4gICAgcmV0dXJuIGAke2hvdXJzfWggJHtyZW1haW5pbmdNaW51dGVzfW1gO1xufSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBib2R5IHtcbiAgICBmb250LWZhbWlseTogJ09wZW4gU2FucycsIHNhbnMtc2VyaWY7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxLjY7XG4gICAgY29sb3I6ICMzNTkxOGI7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgaGVpZ2h0IDogNDAwcHg7XG4gICAgd2lkdGggOiAzNTBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgYmFja2dyb3VuZDogIzA1MDUxODtcbn1cbiN0aW1lLXRyYWNrZXIge1xuICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgYmFja2dyb3VuZDogIzA1MDUxODtcbn1cbi5oZWFkZXIge1xuICAgIG1hcmdpbjogMTBweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBjb2xvcjogIzM1OTE4Yjtcbn1cblxuLmljb24tY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICAgIHdpZHRoOiAxMDBweDtcbiAgICBnYXA6IDEwcHg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmljb25zIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWFhYWRmO1xuICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcyBlYXNlO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBib3JkZXI6IG5vbmU7XG59XG5cbi5pY29uczpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI5MjA5MTtcbn1cblxuLyogU1ZHIGNvbG9ycyBmb3Igbm9uLWFjdGl2ZSBzdGF0ZSAqL1xuLmljb25zIHN2ZyB7XG4gICAgc3Ryb2tlOiAjMDAwMGZmOyAvKiBCbHVlIHN0cm9rZSBmb3Igbm9uLWFjdGl2ZSBzdGF0ZSAqL1xufVxuXG4uaWNvbnMgc3ZnIHBhdGgsXG4uaWNvbnMgc3ZnIGNpcmNsZSB7XG4gICAgc3Ryb2tlOiAjMDAwMGZmOyAvKiBCbHVlIHN0cm9rZSBmb3IgcGF0aHMgYW5kIGNpcmNsZXMgKi9cbn1cblxuLyogU1ZHIGNvbG9ycyBmb3IgYWN0aXZlIHN0YXRlICovXG4uaWNvbnMuYWN0aXZlIHN2ZyB7XG4gICAgc3Ryb2tlOiAjMDBmZjAwOyAvKiBHcmVlbiBzdHJva2UgZm9yIGFjdGl2ZSBzdGF0ZSAqL1xufVxuXG4uaWNvbnMuYWN0aXZlIHN2ZyBwYXRoLFxuLmljb25zLmFjdGl2ZSBzdmcgY2lyY2xlIHtcbiAgICBzdHJva2U6ICMwMGZmMDA7IC8qIEdyZWVuIHN0cm9rZSBmb3IgcGF0aHMgYW5kIGNpcmNsZXMgKi9cbn1cblxuLyogU3BlY2lmaWMgc3R5bGVzIGZvciBsaXN0IGljb24gZmlsbCAqL1xuI2xpc3Qgc3ZnIGdbaWQ9XCJEcmliYmJsZS1MaWdodC1QcmV2aWV3XCJdIGdbaWQ9XCJpY29uc1wiXSBwYXRoIHtcbiAgICBmaWxsOiAjMDAwMGZmOyAvKiBCbHVlIGZpbGwgZm9yIG5vbi1hY3RpdmUgc3RhdGUgKi9cbn1cblxuI2xpc3QuYWN0aXZlIHN2ZyBnW2lkPVwiRHJpYmJibGUtTGlnaHQtUHJldmlld1wiXSBnW2lkPVwiaWNvbnNcIl0gcGF0aCB7XG4gICAgZmlsbDogIzAwZmYwMDsgLyogR3JlZW4gZmlsbCBmb3IgYWN0aXZlIHN0YXRlICovXG59XG5cbi8qIEtlZXAgeW91ciBleGlzdGluZyBob3ZlciBzdHlsZXMgKi9cbi5pY29uczpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI5MjA5MTtcbn1cblxuI2RhdWdobnV0LmFjdGl2ZSxcbiNsaXN0LmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI5MjA5MTtcbn1cbi8qIGJ1dHRvbnMgKi9cblxuXG5cbi8qIEJ1dHRvbnMgc2VjdGlvbiB3b3JraW5nIG9uIHRoZW0gKi9cbi5idXR0b24tY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIHBhZGRpbmcgOiAxcmVtO1xuICAgIGdhcDogMnJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xuXG59XG4uYnV0dG9ucyB7XG4gICAgcGFkZGluZzogMTBweCAyMHB4O1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FhYWFkZjtcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3M7XG59XG5cbi5idXR0b25zOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjkyMDkxO1xufVxuI3N0YXJ0LmFjdGl2ZTpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzVkMTcxNztcbiAgICBjb2xvcjogd2hpdGU7XG59XG5cblxuLyogTW9kYWwgZm9yIG90aGVyIHNlZ21lbnQgKi9cblxuLm1vZGFsIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xuICAgIHotaW5kZXg6IDk5OTk7XG59XG5cbi5tb2RhbC1jb250ZW50IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA1MCU7XG4gICAgbGVmdDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICAgIGJhY2tncm91bmQ6ICMxMjEyMmQ7XG4gICAgcGFkZGluZzogMjBweDtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgd2lkdGg6IDgwJTtcbiAgICBtYXgtd2lkdGg6IDMwMHB4O1xuICAgIGNvbG9yOiAjMzU5MThiO1xufVxuXG4ubW9kYWwtYm9keSB7XG4gICAgbWF4LWhlaWdodDogNjB2aDtcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIHBhZGRpbmc6IDEwcHggMDtcbn1cblxuLmNsb3NlLWJ0biB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMTBweDtcbiAgICByaWdodDogMTVweDtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gICAgY29sb3I6ICMzNTkxOGI7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHBhZGRpbmc6IDVweDtcbn1cblxuLmNsb3NlLWJ0bjpob3ZlciB7XG4gICAgY29sb3I6ICNmZmY7XG59XG5cbi8qIFN0eWxlIGZvciBtb2RhbCBkb21haW4gZW50cmllcyAqL1xuLm1vZGFsIC5kb21haW4tZW50cnkge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDEwcHg7XG4gICAgcGFkZGluZzogOHB4O1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMzU5MThiM2Q7XG59XG5cbi5tb2RhbCAuZG9tYWluLWVudHJ5IGltZyB7XG4gICAgd2lkdGg6IDE2cHg7XG4gICAgaGVpZ2h0OiAxNnB4O1xufVxuXG4ubW9kYWwgLmRvbWFpbi1lbnRyeSAuZG9tYWluLW5hbWUge1xuICAgIGZsZXgtZ3JvdzogMTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5cbi8qIENoZWNrYm94IHN0eWxpbmcgKi9cbiNzYXZlQmVmb3JlQ2xlYXIge1xuICAgIGFjY2VudC1jb2xvcjogIzM1OTE4Yjtcbn1cblxuLyogQnV0dG9uIGNvbnRhaW5lciBpbiBtb2RhbCAqL1xuLm1vZGFsIC5idXR0b24tY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGdhcDogMTBweDtcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xufVxuXG4ubW9kYWwgLmJ1dHRvbnMge1xuICAgIHBhZGRpbmc6IDhweCAxNnB4O1xuICAgIG1pbi13aWR0aDogODBweDtcbn1cbi5tb2RhbCAuYnV0dG9uczpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI5MjA5MTtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9wb3B1cC9wb3B1cC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxvQ0FBb0M7SUFDcEMsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2QsU0FBUztJQUNULFVBQVU7SUFDVixjQUFjO0lBQ2QsYUFBYTtJQUNiLGtCQUFrQjtJQUNsQixtQkFBbUI7QUFDdkI7QUFDQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7QUFDdkI7QUFDQTtJQUNJLFlBQVk7SUFDWixhQUFhO0lBQ2IsOEJBQThCO0lBQzlCLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsNkJBQTZCO0lBQzdCLFlBQVk7SUFDWixTQUFTO0lBQ1QsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLHNDQUFzQztJQUN0QyxrQkFBa0I7SUFDbEIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQSxvQ0FBb0M7QUFDcEM7SUFDSSxlQUFlLEVBQUUscUNBQXFDO0FBQzFEOztBQUVBOztJQUVJLGVBQWUsRUFBRSxzQ0FBc0M7QUFDM0Q7O0FBRUEsZ0NBQWdDO0FBQ2hDO0lBQ0ksZUFBZSxFQUFFLGtDQUFrQztBQUN2RDs7QUFFQTs7SUFFSSxlQUFlLEVBQUUsdUNBQXVDO0FBQzVEOztBQUVBLHVDQUF1QztBQUN2QztJQUNJLGFBQWEsRUFBRSxtQ0FBbUM7QUFDdEQ7O0FBRUE7SUFDSSxhQUFhLEVBQUUsZ0NBQWdDO0FBQ25EOztBQUVBLG9DQUFvQztBQUNwQztJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQTs7SUFFSSx5QkFBeUI7QUFDN0I7QUFDQSxZQUFZOzs7O0FBSVosb0NBQW9DO0FBQ3BDO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixjQUFjO0lBQ2QsU0FBUztJQUNULG1CQUFtQjs7QUFFdkI7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixlQUFlO0lBQ2YsWUFBWTtJQUNaLHlCQUF5QjtJQUN6QixpQ0FBaUM7QUFDckM7O0FBRUE7SUFDSSx5QkFBeUI7QUFDN0I7QUFDQTtJQUNJLHlCQUF5QjtJQUN6QixZQUFZO0FBQ2hCOzs7QUFHQSw0QkFBNEI7O0FBRTVCO0lBQ0ksYUFBYTtJQUNiLGVBQWU7SUFDZixNQUFNO0lBQ04sT0FBTztJQUNQLFdBQVc7SUFDWCxZQUFZO0lBQ1osb0NBQW9DO0lBQ3BDLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLFNBQVM7SUFDVCxnQ0FBZ0M7SUFDaEMsbUJBQW1CO0lBQ25CLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLGdCQUFnQjtJQUNoQixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFNBQVM7SUFDVCxXQUFXO0lBQ1gsZUFBZTtJQUNmLGNBQWM7SUFDZCxlQUFlO0lBQ2YsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFdBQVc7QUFDZjs7QUFFQSxtQ0FBbUM7QUFDbkM7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLFNBQVM7SUFDVCxZQUFZO0lBQ1osa0NBQWtDO0FBQ3RDOztBQUVBO0lBQ0ksV0FBVztJQUNYLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLHVCQUF1QjtJQUN2QixtQkFBbUI7QUFDdkI7O0FBRUEscUJBQXFCO0FBQ3JCO0lBQ0kscUJBQXFCO0FBQ3pCOztBQUVBLDhCQUE4QjtBQUM5QjtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsU0FBUztJQUNULGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixlQUFlO0FBQ25CO0FBQ0E7SUFDSSx5QkFBeUI7QUFDN0JcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSB7XFxuICAgIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJywgc2Fucy1zZXJpZjtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICBsaW5lLWhlaWdodDogMS42O1xcbiAgICBjb2xvcjogIzM1OTE4YjtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBoZWlnaHQgOiA0MDBweDtcXG4gICAgd2lkdGggOiAzNTBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBiYWNrZ3JvdW5kOiAjMDUwNTE4O1xcbn1cXG4jdGltZS10cmFja2VyIHtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgYmFja2dyb3VuZDogIzA1MDUxODtcXG59XFxuLmhlYWRlciB7XFxuICAgIG1hcmdpbjogMTBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgICBjb2xvcjogIzM1OTE4YjtcXG59XFxuXFxuLmljb24tY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIHdpZHRoOiAxMDBweDtcXG4gICAgZ2FwOiAxMHB4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uaWNvbnMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWFhYWRmO1xcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZTtcXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICBib3JkZXI6IG5vbmU7XFxufVxcblxcbi5pY29uczpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyOTIwOTE7XFxufVxcblxcbi8qIFNWRyBjb2xvcnMgZm9yIG5vbi1hY3RpdmUgc3RhdGUgKi9cXG4uaWNvbnMgc3ZnIHtcXG4gICAgc3Ryb2tlOiAjMDAwMGZmOyAvKiBCbHVlIHN0cm9rZSBmb3Igbm9uLWFjdGl2ZSBzdGF0ZSAqL1xcbn1cXG5cXG4uaWNvbnMgc3ZnIHBhdGgsXFxuLmljb25zIHN2ZyBjaXJjbGUge1xcbiAgICBzdHJva2U6ICMwMDAwZmY7IC8qIEJsdWUgc3Ryb2tlIGZvciBwYXRocyBhbmQgY2lyY2xlcyAqL1xcbn1cXG5cXG4vKiBTVkcgY29sb3JzIGZvciBhY3RpdmUgc3RhdGUgKi9cXG4uaWNvbnMuYWN0aXZlIHN2ZyB7XFxuICAgIHN0cm9rZTogIzAwZmYwMDsgLyogR3JlZW4gc3Ryb2tlIGZvciBhY3RpdmUgc3RhdGUgKi9cXG59XFxuXFxuLmljb25zLmFjdGl2ZSBzdmcgcGF0aCxcXG4uaWNvbnMuYWN0aXZlIHN2ZyBjaXJjbGUge1xcbiAgICBzdHJva2U6ICMwMGZmMDA7IC8qIEdyZWVuIHN0cm9rZSBmb3IgcGF0aHMgYW5kIGNpcmNsZXMgKi9cXG59XFxuXFxuLyogU3BlY2lmaWMgc3R5bGVzIGZvciBsaXN0IGljb24gZmlsbCAqL1xcbiNsaXN0IHN2ZyBnW2lkPVxcXCJEcmliYmJsZS1MaWdodC1QcmV2aWV3XFxcIl0gZ1tpZD1cXFwiaWNvbnNcXFwiXSBwYXRoIHtcXG4gICAgZmlsbDogIzAwMDBmZjsgLyogQmx1ZSBmaWxsIGZvciBub24tYWN0aXZlIHN0YXRlICovXFxufVxcblxcbiNsaXN0LmFjdGl2ZSBzdmcgZ1tpZD1cXFwiRHJpYmJibGUtTGlnaHQtUHJldmlld1xcXCJdIGdbaWQ9XFxcImljb25zXFxcIl0gcGF0aCB7XFxuICAgIGZpbGw6ICMwMGZmMDA7IC8qIEdyZWVuIGZpbGwgZm9yIGFjdGl2ZSBzdGF0ZSAqL1xcbn1cXG5cXG4vKiBLZWVwIHlvdXIgZXhpc3RpbmcgaG92ZXIgc3R5bGVzICovXFxuLmljb25zOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI5MjA5MTtcXG59XFxuXFxuI2RhdWdobnV0LmFjdGl2ZSxcXG4jbGlzdC5hY3RpdmUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjkyMDkxO1xcbn1cXG4vKiBidXR0b25zICovXFxuXFxuXFxuXFxuLyogQnV0dG9ucyBzZWN0aW9uIHdvcmtpbmcgb24gdGhlbSAqL1xcbi5idXR0b24tY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHBhZGRpbmcgOiAxcmVtO1xcbiAgICBnYXA6IDJyZW07XFxuICAgIG1hcmdpbi1ib3R0b206IDJyZW07XFxuXFxufVxcbi5idXR0b25zIHtcXG4gICAgcGFkZGluZzogMTBweCAyMHB4O1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBmb250LXNpemU6IDFyZW07XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FhYWFkZjtcXG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzO1xcbn1cXG5cXG4uYnV0dG9uczpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyOTIwOTE7XFxufVxcbiNzdGFydC5hY3RpdmU6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWQxNzE3O1xcbiAgICBjb2xvcjogd2hpdGU7XFxufVxcblxcblxcbi8qIE1vZGFsIGZvciBvdGhlciBzZWdtZW50ICovXFxuXFxuLm1vZGFsIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gICAgei1pbmRleDogOTk5OTtcXG59XFxuXFxuLm1vZGFsLWNvbnRlbnQge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgICBiYWNrZ3JvdW5kOiAjMTIxMjJkO1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICAgIHdpZHRoOiA4MCU7XFxuICAgIG1heC13aWR0aDogMzAwcHg7XFxuICAgIGNvbG9yOiAjMzU5MThiO1xcbn1cXG5cXG4ubW9kYWwtYm9keSB7XFxuICAgIG1heC1oZWlnaHQ6IDYwdmg7XFxuICAgIG92ZXJmbG93LXk6IGF1dG87XFxuICAgIHBhZGRpbmc6IDEwcHggMDtcXG59XFxuXFxuLmNsb3NlLWJ0biB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAxMHB4O1xcbiAgICByaWdodDogMTVweDtcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcbiAgICBjb2xvcjogIzM1OTE4YjtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBwYWRkaW5nOiA1cHg7XFxufVxcblxcbi5jbG9zZS1idG46aG92ZXIge1xcbiAgICBjb2xvcjogI2ZmZjtcXG59XFxuXFxuLyogU3R5bGUgZm9yIG1vZGFsIGRvbWFpbiBlbnRyaWVzICovXFxuLm1vZGFsIC5kb21haW4tZW50cnkge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDEwcHg7XFxuICAgIHBhZGRpbmc6IDhweDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMzNTkxOGIzZDtcXG59XFxuXFxuLm1vZGFsIC5kb21haW4tZW50cnkgaW1nIHtcXG4gICAgd2lkdGg6IDE2cHg7XFxuICAgIGhlaWdodDogMTZweDtcXG59XFxuXFxuLm1vZGFsIC5kb21haW4tZW50cnkgLmRvbWFpbi1uYW1lIHtcXG4gICAgZmxleC1ncm93OiAxO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG59XFxuXFxuLyogQ2hlY2tib3ggc3R5bGluZyAqL1xcbiNzYXZlQmVmb3JlQ2xlYXIge1xcbiAgICBhY2NlbnQtY29sb3I6ICMzNTkxOGI7XFxufVxcblxcbi8qIEJ1dHRvbiBjb250YWluZXIgaW4gbW9kYWwgKi9cXG4ubW9kYWwgLmJ1dHRvbi1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZ2FwOiAxMHB4O1xcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xcbn1cXG5cXG4ubW9kYWwgLmJ1dHRvbnMge1xcbiAgICBwYWRkaW5nOiA4cHggMTZweDtcXG4gICAgbWluLXdpZHRoOiA4MHB4O1xcbn1cXG4ubW9kYWwgLmJ1dHRvbnM6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjkyMDkxO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3BvcHVwLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xub3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3BvcHVwLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwicG9wdXBcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rdHJhY2tlclwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt0cmFja2VyXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvcG9wdXAvcG9wdXAuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6WyJDaGFydCIsImZvcm1hdFRpbWUiLCJkcmF3RmF2aWNvbnNPbkRvbnV0IiwiQ2hhcnRDb21wb25lbnQiLCJjb250YWluZXIiLCJvbk90aGVyc0NsaWNrIiwiX2NsYXNzQ2FsbENoZWNrIiwiZG9udXRDaGFydCIsImZhdmljb25VcGRhdGVJbnRlcnZhbCIsIm90aGVyRG9tYWlucyIsInRvdGFsVGltZSIsImNoYXJ0T3B0aW9ucyIsImN1dG91dCIsInJlc3BvbnNpdmUiLCJhbmltYXRpb24iLCJkdXJhdGlvbiIsInBsdWdpbnMiLCJsZWdlbmQiLCJkaXNwbGF5IiwidG9vbHRpcCIsImVuYWJsZWQiLCJjYWxsYmFja3MiLCJsYWJlbCIsImNvbnRleHQiLCJkb21haW4iLCJ0aW1lIiwicmF3IiwiY29uY2F0IiwiZWxlbWVudHMiLCJhcmMiLCJib3JkZXJXaWR0aCIsIm1haW50YWluQXNwZWN0UmF0aW8iLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsImNyZWF0ZVRpbWVyUGx1Z2luIiwiX3RoaXMiLCJpZCIsImJlZm9yZURyYXciLCJjaGFydCIsImN0eCIsImNoYXJ0QXJlYSIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsImNlbnRlclgiLCJjZW50ZXJZIiwic2F2ZSIsImZvbnQiLCJ0ZXh0QWxpZ24iLCJ0ZXh0QmFzZWxpbmUiLCJmaWxsU3R5bGUiLCJmaWxsVGV4dCIsInJlc3RvcmUiLCJ1cGRhdGUiLCJ0aW1lRGF0YSIsIm1heFNlZ21lbnRzIiwiY29sb3JQYWxldHRlIiwic29ydGVkRG9tYWlucyIsIk9iamVjdCIsImVudHJpZXMiLCJzb3J0IiwiX3JlZiIsIl9yZWYyIiwiX3JlZjMiLCJfc2xpY2VkVG9BcnJheSIsImEiLCJfcmVmNCIsImIiLCJyZWR1Y2UiLCJhY2MiLCJfcmVmNSIsIl9yZWY2IiwiX3JlZjYkIiwidG9wRG9tYWlucyIsInNsaWNlIiwib3RoZXJUaW1lIiwiX3JlZjciLCJfcmVmOCIsIl9yZWY4JCIsImxhYmVscyIsIl90b0NvbnN1bWFibGVBcnJheSIsIm1hcCIsIl9yZWY5IiwiX3JlZjEwIiwiZGF0YSIsIl9yZWYxMSIsIl9yZWYxMiIsIl9yZWYxMiQiLCJmYXZpY29ucyIsIl9yZWYxMyIsIl9yZWYxNCIsIl9yZWYxNCQiLCJmYXZpY29uIiwibGVuZ3RoIiwicHVzaCIsImNyZWF0ZUNoYXJ0IiwidXBkYXRlQ2hhcnQiLCJ1cGRhdGVGYXZpY29ucyIsImlubmVySFRNTCIsImNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiZ2V0Q29udGV4dCIsInR5cGUiLCJkYXRhc2V0cyIsImJhY2tncm91bmRDb2xvciIsIm9wdGlvbnMiLCJmYXZpY29uRGF0YSIsInNldHVwRXZlbnRMaXN0ZW5lcnMiLCJfdGhpczIiLCJpc0hvdmVyaW5nT3RoZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicG9pbnRzIiwiZ2V0RWxlbWVudHNBdEV2ZW50Rm9yTW9kZSIsImludGVyc2VjdCIsImZpcnN0UG9pbnQiLCJpbmRleCIsInN0eWxlIiwiY3Vyc29yIiwiX3RoaXMkZG9udXRDaGFydCIsIl90aGlzMyIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsIl90aGlzMyRkb251dENoYXJ0IiwiZGVzdHJveSIsIkxpc3RWaWV3Iiwic2hvd0VtcHR5U3RhdGUiLCJyZW5kZXJMaXN0IiwiZW1wdHlEaXYiLCJjbGFzc05hbWUiLCJ0ZXh0Q29udGVudCIsImZyYWdtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImZvckVhY2giLCJkb21haW5EaXYiLCJpbWciLCJzcmMiLCJhbHQiLCJ3aWR0aCIsImhlaWdodCIsIm9uZXJyb3IiLCJkb21haW5OYW1lIiwidGltZVNwYW4iLCJNb2RhbCIsImNsZWFyQ29uZmlybU1vZGFsIiwiZ2V0RWxlbWVudEJ5SWQiLCJvdGhlck1vZGFsIiwiYWN0aXZlTW9kYWwiLCJ3aW5kb3ciLCJ0YXJnZXQiLCJoaWRlIiwib3RoZXJNb2RhbENsb3NlQnRuIiwicXVlcnlTZWxlY3RvciIsIm1vZGFsQ29udGVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY29udGVudCIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJzaG93Q2xlYXJDb25maXJtIiwib25Db25maXJtIiwiY29uZmlybUJ1dHRvbiIsImNhbmNlbEJ1dHRvbiIsInNhdmVDaGVja2JveCIsIm5ld0NvbmZpcm1CdXR0b24iLCJjbG9uZU5vZGUiLCJuZXdDYW5jZWxCdXR0b24iLCJwYXJlbnROb2RlIiwicmVwbGFjZUNoaWxkIiwic2hvdWxkU2F2ZVNlc3Npb24iLCJjaGVja2VkIiwic2hvdyIsInNob3dPdGhlckRvbWFpbnMiLCJjb25zb2xlIiwibG9nIiwibW9kYWxCb2R5IiwiX3JlZjIkIiwibW9kYWwiLCJpc1Zpc2libGUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic3RhcnRCdXR0b24iLCJjbGVhckJ1dHRvbiIsImRvbnV0T3B0aW9uIiwibGlzdE9wdGlvbiIsImhpc3RWaWV3IiwiaXNUcmFja2luZyIsImN1cnJlbnRWaWV3IiwibGlzdFZpZXciLCJ1cGRhdGVCdXR0b25TdHlsZSIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInVwZGF0ZU9wdGlvbnNTdHlsZSIsImJ1dHRvbiIsImRpc2FibGVkIiwiaW5pdGlhbGl6ZUNoYXJ0IiwiaW5pdGlhbGl6ZUxpc3RWaWV3IiwidXBkYXRlRGlzcGxheSIsIm5ld1RpbWVEYXRhIiwiZGlzcGxheVR5cGUiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJpbml0aWFsaXplUG9wdXAiLCJjaHJvbWUiLCJydW50aW1lIiwic2VuZE1lc3NhZ2UiLCJyZXNwb25zZSIsInN0b3JhZ2UiLCJsb2NhbCIsImdldCIsInJlc3VsdCIsImhhbmRsZVN0YXJ0Q2xpY2siLCJuZXdUcmFja2luZ1N0YXR1cyIsInN0YXR1cyIsImxhc3RFcnJvciIsImVycm9yIiwibWVzc2FnZSIsImhhbmRsZUNsZWFyRGF0YSIsInNlc3Npb24iLCJ0aW1lc3RhbXAiLCJEYXRlIiwibm93IiwiX29iamVjdFNwcmVhZCIsInNlc3Npb25zIiwic2V0IiwibG9jYXRpb24iLCJocmVmIiwib25NZXNzYWdlIiwiYWRkTGlzdGVuZXIiLCJoZWFkIiwibG9hZEFuZERyYXdJY29uIiwiZmF2aWNvblVybCIsIngiLCJ5IiwiSW1hZ2UiLCJjcm9zc09yaWdpbiIsIm9ubG9hZCIsImljb25TaXplIiwiYmVnaW5QYXRoIiwiTWF0aCIsIlBJIiwiY2xpcCIsImRyYXdJbWFnZSIsImRlZmF1bHRJbWciLCJyYWRpdXMiLCJtaW4iLCJpY29uUmFkaXVzIiwiZ2V0RGF0YXNldE1ldGEiLCJzZWdtZW50Iiwicm90YXRpb25PZmZzZXQiLCJzZWdtZW50QW5nbGUiLCJzdGFydEFuZ2xlIiwiZW5kQW5nbGUiLCJjb3MiLCJzaW4iLCJzZWNvbmRzIiwibWludXRlcyIsImZsb29yIiwicmVtYWluaW5nU2Vjb25kcyIsImhvdXJzIiwicmVtYWluaW5nTWludXRlcyJdLCJzb3VyY2VSb290IjoiIn0=