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
/* harmony import */ var _state_trackingState_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state/trackingState.js */ "./src/popup/state/trackingState.js");
/* harmony import */ var _services_chromeMessaging_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/chromeMessaging.js */ "./src/popup/services/chromeMessaging.js");
/* harmony import */ var _components_Chart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Chart */ "./src/popup/components/Chart.js");
/* harmony import */ var _components_ListView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/ListView */ "./src/popup/components/ListView.js");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Modal */ "./src/popup/components/Modal.js");
/* harmony import */ var _popup_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./popup.css */ "./src/popup/popup.css");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }






document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('time-tracker');
  var startButton = document.getElementById('start');
  var clearButton = document.getElementById('clear');
  var donutOption = document.getElementById('daughnut');
  var listOption = document.getElementById('list');
  var histView = document.getElementById('history');

  // Initialize state and services
  var trackingState = new _state_trackingState_js__WEBPACK_IMPORTED_MODULE_0__.TrackingState();
  var messagingService = new _services_chromeMessaging_js__WEBPACK_IMPORTED_MODULE_1__.ChromeMessagingService(trackingState);

  // Component instances
  var modal = new _components_Modal__WEBPACK_IMPORTED_MODULE_4__.Modal();
  var chart = null;
  var listView = null;

  // UI State Management
  function updateButtonStyle(isTracking) {
    startButton.textContent = isTracking ? 'Pause' : 'Start';
    startButton.classList.toggle('active', isTracking);
  }
  function updateOptionsStyle(button) {
    var isDonut = button === donutOption;
    donutOption.classList.toggle('active', isDonut);
    listOption.classList.toggle('active', !isDonut);
    donutOption.disabled = isDonut;
    listOption.disabled = !isDonut;
    trackingState.setCurrentView(isDonut ? 'donut' : 'list');
  }

  // Display Management
  function initializeChart() {
    if (!chart) {
      chart = new _components_Chart__WEBPACK_IMPORTED_MODULE_2__.ChartComponent(container, function () {
        var _chart;
        if ((_chart = chart) !== null && _chart !== void 0 && _chart.otherDomains) {
          modal.showOtherDomains(chart.otherDomains);
        }
      });
    }
    return chart;
  }
  function initializeListView() {
    if (!listView) {
      listView = new _components_ListView__WEBPACK_IMPORTED_MODULE_3__.ListView(container);
    }
    return listView;
  }
  function updateDisplay(newTimeData) {
    var displayType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : trackingState.currentView;
    trackingState.setTimeData(newTimeData);
    if (displayType === 'donut') {
      if (listView) {
        listView.destroy();
        listView = null;
      }
      initializeChart().update(newTimeData);
    } else {
      if (chart) {
        chart.destroy();
        chart = null;
      }
      initializeListView().update(newTimeData);
    }
  }

  // Initialize popup
  function initializePopup() {
    return _initializePopup.apply(this, arguments);
  } // Event Handlers
  function _initializePopup() {
    _initializePopup = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var response, isTracking;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return messagingService.getData();
          case 2:
            response = _context4.sent;
            if (response !== null && response !== void 0 && response.timeData) {
              if (response.display === "daughnut") {
                updateOptionsStyle(donutOption);
                updateDisplay(response.timeData, 'donut');
              } else {
                updateOptionsStyle(listOption);
                updateDisplay(response.timeData, 'list');
              }
            }
            _context4.next = 6;
            return messagingService.getTrackingStatus();
          case 6:
            isTracking = _context4.sent;
            updateButtonStyle(isTracking);
          case 8:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return _initializePopup.apply(this, arguments);
  }
  function handleStartClick() {
    return _handleStartClick.apply(this, arguments);
  } // Setup event listeners
  function _handleStartClick() {
    _handleStartClick = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var newTrackingStatus, response;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            newTrackingStatus = startButton.textContent === 'Start';
            _context5.next = 3;
            return messagingService.startOrPause(newTrackingStatus);
          case 3:
            updateButtonStyle(newTrackingStatus);
            if (newTrackingStatus) {
              _context5.next = 9;
              break;
            }
            _context5.next = 7;
            return messagingService.getData();
          case 7:
            response = _context5.sent;
            if (response !== null && response !== void 0 && response.timeData) {
              updateDisplay(response.timeData);
            }
          case 9:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return _handleStartClick.apply(this, arguments);
  }
  donutOption.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var response;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return messagingService.setView('daughnut');
        case 2:
          response = _context.sent;
          updateOptionsStyle(donutOption);
          if (response !== null && response !== void 0 && response.timeData) {
            updateDisplay(response.timeData, 'donut');
          }
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  listOption.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var response;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return messagingService.setView('list');
        case 2:
          response = _context2.sent;
          updateOptionsStyle(listOption);
          if (response !== null && response !== void 0 && response.timeData) {
            updateDisplay(response.timeData, 'list');
          }
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  histView.addEventListener('click', function () {
    window.location.href = 'history.html';
  });
  startButton.addEventListener('click', handleStartClick);
  clearButton.addEventListener('click', function () {
    modal.showClearConfirm(/*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(shouldSaveSession) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!shouldSaveSession) {
                _context3.next = 5;
                break;
              }
              _context3.next = 3;
              return messagingService.saveSession(trackingState.timeData);
            case 3:
              _context3.next = 7;
              break;
            case 5:
              _context3.next = 7;
              return messagingService.clearData();
            case 7:
              updateDisplay({});
            case 8:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }());
  });

  // Initialize
  donutOption.disabled = true;
  container.innerHTML = '';
  initializePopup();
  messagingService.setupMessageListener(updateDisplay);

  // Cleanup
  window.addEventListener('unload', function () {
    var _chart2, _listView;
    (_chart2 = chart) === null || _chart2 === void 0 || _chart2.destroy();
    (_listView = listView) === null || _listView === void 0 || _listView.destroy();
    modal.destroy();
  });

  // Add styles
  var style = document.createElement('style');
  style.textContent = "\n        .domain-entry {\n            display: flex;\n            justify-content: space-between;\n            padding: 8px;\n            border-bottom: 1px solid #eee;\n        }\n        .domain-name {\n            font-weight: bold;\n            max-width: 70%;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            white-space: nowrap;\n        }\n        .domain-time {\n            color: #666;\n        }\n        .no-data {\n            padding: 20px;\n            color: #666;\n            font-style: italic;\n        }\n        #start {\n            transition: background-color 0.3s ease;\n        }\n        #start.active {\n            background-color: #ff4444;\n            color: white;\n        }\n    ";
  document.head.appendChild(style);
});

/***/ }),

/***/ "./src/popup/services/chromeMessaging.js":
/*!***********************************************!*\
  !*** ./src/popup/services/chromeMessaging.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChromeMessagingService: () => (/* binding */ ChromeMessagingService)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./src/popup/services/storage.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// src/popup/services/chromeMessaging.js

var ChromeMessagingService = /*#__PURE__*/function () {
  function ChromeMessagingService(trackingState) {
    _classCallCheck(this, ChromeMessagingService);
    this.trackingState = trackingState;
  }
  return _createClass(ChromeMessagingService, [{
    key: "getData",
    value: function () {
      var _getData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this = this;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", new Promise(function (resolve) {
                chrome.runtime.sendMessage({
                  type: 'getData'
                }, function (response) {
                  if (response && response.timeData) {
                    _this.trackingState.setTimeData(response.timeData);
                    resolve(response);
                  }
                });
              }));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function getData() {
        return _getData.apply(this, arguments);
      }
      return getData;
    }()
  }, {
    key: "getTrackingStatus",
    value: function () {
      var _getTrackingStatus = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var isTracking;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _storage_js__WEBPACK_IMPORTED_MODULE_0__.StorageService.getTrackingStatus();
            case 2:
              isTracking = _context2.sent;
              this.trackingState.setIsTracking(isTracking);
              return _context2.abrupt("return", isTracking);
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function getTrackingStatus() {
        return _getTrackingStatus.apply(this, arguments);
      }
      return getTrackingStatus;
    }()
  }, {
    key: "startOrPause",
    value: function () {
      var _startOrPause = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(status) {
        var _this2 = this;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", new Promise(function (resolve) {
                chrome.runtime.sendMessage({
                  type: 'startOrPause',
                  status: status
                }, function (response) {
                  if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                    return;
                  }
                  _this2.trackingState.setIsTracking(status);
                  resolve(response);
                });
              }));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function startOrPause(_x) {
        return _startOrPause.apply(this, arguments);
      }
      return startOrPause;
    }()
  }, {
    key: "setView",
    value: function () {
      var _setView = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(type) {
        var _this3 = this;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", new Promise(function (resolve) {
                chrome.runtime.sendMessage({
                  type: type
                }, function (response) {
                  _this3.trackingState.setCurrentView(type === 'daughnut' ? 'donut' : 'list');
                  resolve(response);
                });
              }));
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function setView(_x2) {
        return _setView.apply(this, arguments);
      }
      return setView;
    }()
  }, {
    key: "clearData",
    value: function () {
      var _clearData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var _this4 = this;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", new Promise(function (resolve) {
                chrome.runtime.sendMessage({
                  type: 'clear'
                }, function () {
                  _this4.trackingState.setTimeData({});
                  resolve();
                });
              }));
            case 1:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function clearData() {
        return _clearData.apply(this, arguments);
      }
      return clearData;
    }()
  }, {
    key: "saveSession",
    value: function () {
      var _saveSession = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(timeData) {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _storage_js__WEBPACK_IMPORTED_MODULE_0__.StorageService.saveSession(timeData);
            case 2:
              _context6.next = 4;
              return this.clearData();
            case 4:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function saveSession(_x3) {
        return _saveSession.apply(this, arguments);
      }
      return saveSession;
    }()
  }, {
    key: "setupMessageListener",
    value: function setupMessageListener(updateDisplayCallback) {
      var _this5 = this;
      chrome.runtime.onMessage.addListener(function (message) {
        if (message.timeData) {
          var state = _this5.trackingState.getCurrentState();
          if (message.type === 'timeUpdateList' && state.currentView === 'list' || message.type === 'timeUpdateDaughnut' && state.currentView === 'donut' || !state.isTracking) {
            _this5.trackingState.setTimeData(message.timeData);
            updateDisplayCallback(message.timeData, state.currentView);
          }
        }
      });
    }
  }]);
}();

/***/ }),

/***/ "./src/popup/services/storage.js":
/*!***************************************!*\
  !*** ./src/popup/services/storage.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StorageService: () => (/* binding */ StorageService)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// src/popup/services/storage.js
var StorageService = /*#__PURE__*/function () {
  function StorageService() {
    _classCallCheck(this, StorageService);
  }
  return _createClass(StorageService, null, [{
    key: "getSessions",
    value: function () {
      var _getSessions = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", new Promise(function (resolve) {
                chrome.storage.local.get(['sessions'], function (result) {
                  resolve(result.sessions || []);
                });
              }));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function getSessions() {
        return _getSessions.apply(this, arguments);
      }
      return getSessions;
    }()
  }, {
    key: "saveSession",
    value: function () {
      var _saveSession = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(timeData) {
        var sessions;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.getSessions();
            case 2:
              sessions = _context2.sent;
              sessions.push({
                timestamp: Date.now(),
                timeData: _objectSpread({}, timeData)
              });
              return _context2.abrupt("return", new Promise(function (resolve) {
                chrome.storage.local.set({
                  sessions: sessions
                }, resolve);
              }));
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function saveSession(_x) {
        return _saveSession.apply(this, arguments);
      }
      return saveSession;
    }()
  }, {
    key: "getTrackingStatus",
    value: function () {
      var _getTrackingStatus = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", new Promise(function (resolve) {
                chrome.storage.local.get(['isTracking'], function (result) {
                  resolve(result.isTracking || false);
                });
              }));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function getTrackingStatus() {
        return _getTrackingStatus.apply(this, arguments);
      }
      return getTrackingStatus;
    }()
  }]);
}();

/***/ }),

/***/ "./src/popup/state/trackingState.js":
/*!******************************************!*\
  !*** ./src/popup/state/trackingState.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrackingState: () => (/* binding */ TrackingState)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var TrackingState = /*#__PURE__*/function () {
  function TrackingState() {
    _classCallCheck(this, TrackingState);
    this.isTracking = false;
    this.timeData = {};
    this.currentView = 'donut';
  }
  return _createClass(TrackingState, [{
    key: "setIsTracking",
    value: function setIsTracking(status) {
      this.isTracking = status;
    }
  }, {
    key: "setTimeData",
    value: function setTimeData(data) {
      this.timeData = data;
    }
  }, {
    key: "setCurrentView",
    value: function setCurrentView(view) {
      this.currentView = view;
    }
  }, {
    key: "getCurrentState",
    value: function getCurrentState() {
      return {
        isTracking: this.isTracking,
        timeData: this.timeData,
        currentView: this.currentView
      };
    }
  }]);
}();

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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors","common"], () => (__webpack_require__("./src/popup/popup.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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O1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1dDaERBOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90cmFja2VyLy4vc3JjL3BvcHVwL2NvbXBvbmVudHMvTW9kYWwuanMiLCJ3ZWJwYWNrOi8vdHJhY2tlci8uL3NyYy9wb3B1cC9wb3B1cC5qcyIsIndlYnBhY2s6Ly90cmFja2VyLy4vc3JjL3BvcHVwL3NlcnZpY2VzL2Nocm9tZU1lc3NhZ2luZy5qcyIsIndlYnBhY2s6Ly90cmFja2VyLy4vc3JjL3BvcHVwL3NlcnZpY2VzL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdHJhY2tlci8uL3NyYy9wb3B1cC9zdGF0ZS90cmFja2luZ1N0YXRlLmpzIiwid2VicGFjazovL3RyYWNrZXIvLi9zcmMvcG9wdXAvcG9wdXAuY3NzIiwid2VicGFjazovL3RyYWNrZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdHJhY2tlci93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL3RyYWNrZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdHJhY2tlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdHJhY2tlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RyYWNrZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90cmFja2VyL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3RyYWNrZXIvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3RyYWNrZXIvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90cmFja2VyL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly90cmFja2VyL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmb3JtYXRUaW1lIH0gZnJvbSAnLi4vdXRpbHMvdGltZUZvcm1hdHRlcic7XG5cbmV4cG9ydCBjbGFzcyBNb2RhbCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJDb25maXJtTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xlYXJDb25maXJtTW9kYWwnKTtcbiAgICAgICAgdGhpcy5vdGhlck1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ290aGVyTW9kYWwnKTtcbiAgICAgICAgdGhpcy5hY3RpdmVNb2RhbCA9IG51bGw7XG4gICAgICAgIHRoaXMuc2V0dXBFdmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIHNldHVwRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIC8vIEdsb2JhbCBjbGljayBoYW5kbGVyIGZvciBjbG9zaW5nIG1vZGFsc1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZU1vZGFsICYmIGV2ZW50LnRhcmdldCA9PT0gdGhpcy5hY3RpdmVNb2RhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTZXR1cCBvdGhlciBtb2RhbCBjbG9zZSBidXR0b25cbiAgICAgICAgY29uc3Qgb3RoZXJNb2RhbENsb3NlQnRuID0gdGhpcy5vdGhlck1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1idG4nKTtcbiAgICAgICAgaWYgKG90aGVyTW9kYWxDbG9zZUJ0bikge1xuICAgICAgICAgICAgb3RoZXJNb2RhbENsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5oaWRlKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUHJldmVudCBtb2RhbCBjb250ZW50IGNsaWNrcyBmcm9tIGNsb3NpbmcgdGhlIG1vZGFsXG4gICAgICAgIGNvbnN0IG1vZGFsQ29udGVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW9kYWwtY29udGVudCcpO1xuICAgICAgICBtb2RhbENvbnRlbnRzLmZvckVhY2goY29udGVudCA9PiB7XG4gICAgICAgICAgICBjb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaG93Q2xlYXJDb25maXJtKG9uQ29uZmlybSkge1xuICAgICAgICBjb25zdCBjb25maXJtQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbmZpcm1DbGVhcicpO1xuICAgICAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FuY2VsQ2xlYXInKTtcbiAgICAgICAgY29uc3Qgc2F2ZUNoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmVCZWZvcmVDbGVhcicpO1xuXG4gICAgICAgIC8vIFJlbW92ZSBleGlzdGluZyBsaXN0ZW5lcnMgaWYgYW55XG4gICAgICAgIGNvbnN0IG5ld0NvbmZpcm1CdXR0b24gPSBjb25maXJtQnV0dG9uLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgY29uc3QgbmV3Q2FuY2VsQnV0dG9uID0gY2FuY2VsQnV0dG9uLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgY29uZmlybUJ1dHRvbi5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdDb25maXJtQnV0dG9uLCBjb25maXJtQnV0dG9uKTtcbiAgICAgICAgY2FuY2VsQnV0dG9uLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0NhbmNlbEJ1dHRvbiwgY2FuY2VsQnV0dG9uKTtcblxuICAgICAgICAvLyBBZGQgbmV3IGxpc3RlbmVyc1xuICAgICAgICBuZXdDb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2hvdWxkU2F2ZVNlc3Npb24gPSBzYXZlQ2hlY2tib3guY2hlY2tlZDtcbiAgICAgICAgICAgIG9uQ29uZmlybShzaG91bGRTYXZlU2Vzc2lvbik7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmV3Q2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5oaWRlKCkpO1xuXG4gICAgICAgIHRoaXMuc2hvdyh0aGlzLmNsZWFyQ29uZmlybU1vZGFsKTtcbiAgICB9XG5cbiAgICBzaG93T3RoZXJEb21haW5zKG90aGVyRG9tYWlucykge1xuICAgICAgICBjb25zb2xlLmxvZyggXCJzaG93IG90aGVyIGRvbWFpbnMgaXMgYmVpbmcgY2FsbGVkXCIsIG90aGVyRG9tYWlucyk7XG4gICAgICAgIGNvbnN0IG1vZGFsQm9keSA9IHRoaXMub3RoZXJNb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtYm9keScpO1xuICAgICAgICBtb2RhbEJvZHkuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgICAgb3RoZXJEb21haW5zLmZvckVhY2goKFtkb21haW4sIFtmYXZpY29uLCB0aW1lXV0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRvbWFpbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZG9tYWluRGl2LmNsYXNzTmFtZSA9ICdkb21haW4tZW50cnknO1xuICAgICAgICAgICAgZG9tYWluRGl2LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7ZmF2aWNvbiB8fCAnYXNzZXRzL2RlZmF1bHQtZmF2aWNvbi5wbmcnfVwiIFxuICAgICAgICAgICAgICAgICAgICAgYWx0PVwiRmF2aWNvblwiIFxuICAgICAgICAgICAgICAgICAgICAgd2lkdGg9XCIxNlwiIFxuICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PVwiMTZcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRvbWFpbi1uYW1lXCI+JHtkb21haW59PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZG9tYWluLXRpbWVcIj4ke2Zvcm1hdFRpbWUodGltZSl9PC9zcGFuPlxuICAgICAgICAgICAgYDtcbiAgICAgICAgICAgIG1vZGFsQm9keS5hcHBlbmRDaGlsZChkb21haW5EaXYpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNob3codGhpcy5vdGhlck1vZGFsKTtcbiAgICB9XG5cbiAgICBzaG93KG1vZGFsKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlTW9kYWwgPSBtb2RhbDtcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlTW9kYWwpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlTW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlTW9kYWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWV0aG9kIHRvIGNoZWNrIGlmIGFueSBtb2RhbCBpcyBjdXJyZW50bHkgdmlzaWJsZVxuICAgIGlzVmlzaWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlTW9kYWwgIT09IG51bGw7XG4gICAgfVxuXG4gICAgLy8gQ2xlYW4gdXAgZXZlbnQgbGlzdGVuZXJzIHdoZW4gbmVlZGVkXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oaWRlKTtcbiAgICAgICAgY29uc3Qgb3RoZXJNb2RhbENsb3NlQnRuID0gdGhpcy5vdGhlck1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1idG4nKTtcbiAgICAgICAgaWYgKG90aGVyTW9kYWxDbG9zZUJ0bikge1xuICAgICAgICAgICAgb3RoZXJNb2RhbENsb3NlQnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oaWRlKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBUcmFja2luZ1N0YXRlIH0gZnJvbSAnLi9zdGF0ZS90cmFja2luZ1N0YXRlLmpzJztcbmltcG9ydCB7IENocm9tZU1lc3NhZ2luZ1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2Nocm9tZU1lc3NhZ2luZy5qcyc7XG5pbXBvcnQgeyBDaGFydENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9DaGFydCc7XG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gJy4vY29tcG9uZW50cy9MaXN0Vmlldyc7XG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4vY29tcG9uZW50cy9Nb2RhbCc7XG5pbXBvcnQgJy4vcG9wdXAuY3NzJztcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lLXRyYWNrZXInKTtcbiAgICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydCcpO1xuICAgIGNvbnN0IGNsZWFyQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsZWFyJyk7XG4gICAgY29uc3QgZG9udXRPcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF1Z2hudXQnKTtcbiAgICBjb25zdCBsaXN0T3B0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpc3QnKTtcbiAgICBjb25zdCBoaXN0VmlldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaXN0b3J5Jyk7XG5cbiAgICAvLyBJbml0aWFsaXplIHN0YXRlIGFuZCBzZXJ2aWNlc1xuICAgIGNvbnN0IHRyYWNraW5nU3RhdGUgPSBuZXcgVHJhY2tpbmdTdGF0ZSgpO1xuICAgIGNvbnN0IG1lc3NhZ2luZ1NlcnZpY2UgPSBuZXcgQ2hyb21lTWVzc2FnaW5nU2VydmljZSh0cmFja2luZ1N0YXRlKTtcblxuICAgIC8vIENvbXBvbmVudCBpbnN0YW5jZXNcbiAgICBjb25zdCBtb2RhbCA9IG5ldyBNb2RhbCgpO1xuICAgIGxldCBjaGFydCA9IG51bGw7XG4gICAgbGV0IGxpc3RWaWV3ID0gbnVsbDtcblxuICAgIC8vIFVJIFN0YXRlIE1hbmFnZW1lbnRcbiAgICBmdW5jdGlvbiB1cGRhdGVCdXR0b25TdHlsZShpc1RyYWNraW5nKSB7XG4gICAgICAgIHN0YXJ0QnV0dG9uLnRleHRDb250ZW50ID0gaXNUcmFja2luZyA/ICdQYXVzZScgOiAnU3RhcnQnO1xuICAgICAgICBzdGFydEJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnLCBpc1RyYWNraW5nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVPcHRpb25zU3R5bGUoYnV0dG9uKSB7XG4gICAgICAgIGNvbnN0IGlzRG9udXQgPSBidXR0b24gPT09IGRvbnV0T3B0aW9uO1xuICAgICAgICBkb251dE9wdGlvbi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnLCBpc0RvbnV0KTtcbiAgICAgICAgbGlzdE9wdGlvbi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnLCAhaXNEb251dCk7XG4gICAgICAgIGRvbnV0T3B0aW9uLmRpc2FibGVkID0gaXNEb251dDtcbiAgICAgICAgbGlzdE9wdGlvbi5kaXNhYmxlZCA9ICFpc0RvbnV0O1xuICAgICAgICB0cmFja2luZ1N0YXRlLnNldEN1cnJlbnRWaWV3KGlzRG9udXQgPyAnZG9udXQnIDogJ2xpc3QnKTtcbiAgICB9XG5cbiAgICAvLyBEaXNwbGF5IE1hbmFnZW1lbnRcbiAgICBmdW5jdGlvbiBpbml0aWFsaXplQ2hhcnQoKSB7XG4gICAgICAgIGlmICghY2hhcnQpIHtcbiAgICAgICAgICAgIGNoYXJ0ID0gbmV3IENoYXJ0Q29tcG9uZW50KGNvbnRhaW5lciwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGFydD8ub3RoZXJEb21haW5zKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGFsLnNob3dPdGhlckRvbWFpbnMoY2hhcnQub3RoZXJEb21haW5zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hhcnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZUxpc3RWaWV3KCkge1xuICAgICAgICBpZiAoIWxpc3RWaWV3KSB7XG4gICAgICAgICAgICBsaXN0VmlldyA9IG5ldyBMaXN0Vmlldyhjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaXN0VmlldztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5KG5ld1RpbWVEYXRhLCBkaXNwbGF5VHlwZSA9IHRyYWNraW5nU3RhdGUuY3VycmVudFZpZXcpIHtcbiAgICAgICAgdHJhY2tpbmdTdGF0ZS5zZXRUaW1lRGF0YShuZXdUaW1lRGF0YSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZGlzcGxheVR5cGUgPT09ICdkb251dCcpIHtcbiAgICAgICAgICAgIGlmIChsaXN0Vmlldykge1xuICAgICAgICAgICAgICAgIGxpc3RWaWV3LmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBsaXN0VmlldyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbml0aWFsaXplQ2hhcnQoKS51cGRhdGUobmV3VGltZURhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNoYXJ0KSB7XG4gICAgICAgICAgICAgICAgY2hhcnQuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIGNoYXJ0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluaXRpYWxpemVMaXN0VmlldygpLnVwZGF0ZShuZXdUaW1lRGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIHBvcHVwXG4gICAgYXN5bmMgZnVuY3Rpb24gaW5pdGlhbGl6ZVBvcHVwKCkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG1lc3NhZ2luZ1NlcnZpY2UuZ2V0RGF0YSgpO1xuICAgICAgICBpZiAocmVzcG9uc2U/LnRpbWVEYXRhKSB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGlzcGxheSA9PT0gXCJkYXVnaG51dFwiKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlT3B0aW9uc1N0eWxlKGRvbnV0T3B0aW9uKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVEaXNwbGF5KHJlc3BvbnNlLnRpbWVEYXRhLCAnZG9udXQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlT3B0aW9uc1N0eWxlKGxpc3RPcHRpb24pO1xuICAgICAgICAgICAgICAgIHVwZGF0ZURpc3BsYXkocmVzcG9uc2UudGltZURhdGEsICdsaXN0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpc1RyYWNraW5nID0gYXdhaXQgbWVzc2FnaW5nU2VydmljZS5nZXRUcmFja2luZ1N0YXR1cygpO1xuICAgICAgICB1cGRhdGVCdXR0b25TdHlsZShpc1RyYWNraW5nKTtcbiAgICB9XG5cbiAgICAvLyBFdmVudCBIYW5kbGVyc1xuICAgIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZVN0YXJ0Q2xpY2soKSB7XG4gICAgICAgIGNvbnN0IG5ld1RyYWNraW5nU3RhdHVzID0gc3RhcnRCdXR0b24udGV4dENvbnRlbnQgPT09ICdTdGFydCc7XG4gICAgICAgIGF3YWl0IG1lc3NhZ2luZ1NlcnZpY2Uuc3RhcnRPclBhdXNlKG5ld1RyYWNraW5nU3RhdHVzKTtcbiAgICAgICAgdXBkYXRlQnV0dG9uU3R5bGUobmV3VHJhY2tpbmdTdGF0dXMpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFuZXdUcmFja2luZ1N0YXR1cykge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBtZXNzYWdpbmdTZXJ2aWNlLmdldERhdGEoKTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZT8udGltZURhdGEpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVEaXNwbGF5KHJlc3BvbnNlLnRpbWVEYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNldHVwIGV2ZW50IGxpc3RlbmVyc1xuICAgIGRvbnV0T3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG1lc3NhZ2luZ1NlcnZpY2Uuc2V0VmlldygnZGF1Z2hudXQnKTtcbiAgICAgICAgdXBkYXRlT3B0aW9uc1N0eWxlKGRvbnV0T3B0aW9uKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlPy50aW1lRGF0YSkge1xuICAgICAgICAgICAgdXBkYXRlRGlzcGxheShyZXNwb25zZS50aW1lRGF0YSwgJ2RvbnV0Jyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxpc3RPcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbWVzc2FnaW5nU2VydmljZS5zZXRWaWV3KCdsaXN0Jyk7XG4gICAgICAgIHVwZGF0ZU9wdGlvbnNTdHlsZShsaXN0T3B0aW9uKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlPy50aW1lRGF0YSkge1xuICAgICAgICAgICAgdXBkYXRlRGlzcGxheShyZXNwb25zZS50aW1lRGF0YSwgJ2xpc3QnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaGlzdFZpZXcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2hpc3RvcnkuaHRtbCc7XG4gICAgfSk7XG5cbiAgICBzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVN0YXJ0Q2xpY2spO1xuXG4gICAgY2xlYXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIG1vZGFsLnNob3dDbGVhckNvbmZpcm0oYXN5bmMgKHNob3VsZFNhdmVTZXNzaW9uKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2hvdWxkU2F2ZVNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBtZXNzYWdpbmdTZXJ2aWNlLnNhdmVTZXNzaW9uKHRyYWNraW5nU3RhdGUudGltZURhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBtZXNzYWdpbmdTZXJ2aWNlLmNsZWFyRGF0YSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXBkYXRlRGlzcGxheSh7fSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gSW5pdGlhbGl6ZVxuICAgIGRvbnV0T3B0aW9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgaW5pdGlhbGl6ZVBvcHVwKCk7XG4gICAgbWVzc2FnaW5nU2VydmljZS5zZXR1cE1lc3NhZ2VMaXN0ZW5lcih1cGRhdGVEaXNwbGF5KTtcblxuICAgIC8vIENsZWFudXBcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndW5sb2FkJywgKCkgPT4ge1xuICAgICAgICBjaGFydD8uZGVzdHJveSgpO1xuICAgICAgICBsaXN0Vmlldz8uZGVzdHJveSgpO1xuICAgICAgICBtb2RhbC5kZXN0cm95KCk7XG4gICAgfSk7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiAgICBcbiAgICAvLyBBZGQgc3R5bGVzXG4gICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlLnRleHRDb250ZW50ID0gYFxuICAgICAgICAuZG9tYWluLWVudHJ5IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgICBwYWRkaW5nOiA4cHg7XG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VlZTtcbiAgICAgICAgfVxuICAgICAgICAuZG9tYWluLW5hbWUge1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgICAgICBtYXgtd2lkdGg6IDcwJTtcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgIH1cbiAgICAgICAgLmRvbWFpbi10aW1lIHtcbiAgICAgICAgICAgIGNvbG9yOiAjNjY2O1xuICAgICAgICB9XG4gICAgICAgIC5uby1kYXRhIHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgICAgICAgICBjb2xvcjogIzY2NjtcbiAgICAgICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICAgICAgfVxuICAgICAgICAjc3RhcnQge1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzIGVhc2U7XG4gICAgICAgIH1cbiAgICAgICAgI3N0YXJ0LmFjdGl2ZSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY0NDQ0O1xuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICB9XG4gICAgYDtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbn0pOyIsIi8vIHNyYy9wb3B1cC9zZXJ2aWNlcy9jaHJvbWVNZXNzYWdpbmcuanNcbmltcG9ydCB7IFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zdG9yYWdlLmpzJztcblxuZXhwb3J0IGNsYXNzIENocm9tZU1lc3NhZ2luZ1NlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHRyYWNraW5nU3RhdGUpIHtcbiAgICAgICAgdGhpcy50cmFja2luZ1N0YXRlID0gdHJhY2tpbmdTdGF0ZTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXREYXRhKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdHlwZTogJ2dldERhdGEnIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS50aW1lRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYWNraW5nU3RhdGUuc2V0VGltZURhdGEocmVzcG9uc2UudGltZURhdGEpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0VHJhY2tpbmdTdGF0dXMoKSB7XG4gICAgICAgIGNvbnN0IGlzVHJhY2tpbmcgPSBhd2FpdCBTdG9yYWdlU2VydmljZS5nZXRUcmFja2luZ1N0YXR1cygpO1xuICAgICAgICB0aGlzLnRyYWNraW5nU3RhdGUuc2V0SXNUcmFja2luZyhpc1RyYWNraW5nKTtcbiAgICAgICAgcmV0dXJuIGlzVHJhY2tpbmc7XG4gICAgfVxuXG4gICAgYXN5bmMgc3RhcnRPclBhdXNlKHN0YXR1cykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdHlwZTogJ3N0YXJ0T3JQYXVzZScsIHN0YXR1cyB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudHJhY2tpbmdTdGF0ZS5zZXRJc1RyYWNraW5nKHN0YXR1cyk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgc2V0Vmlldyh0eXBlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyB0eXBlIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudHJhY2tpbmdTdGF0ZS5zZXRDdXJyZW50Vmlldyh0eXBlID09PSAnZGF1Z2hudXQnID8gJ2RvbnV0JyA6ICdsaXN0Jyk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgY2xlYXJEYXRhKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdHlwZTogJ2NsZWFyJyB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFja2luZ1N0YXRlLnNldFRpbWVEYXRhKHt9KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgc2F2ZVNlc3Npb24odGltZURhdGEpIHtcbiAgICAgICAgYXdhaXQgU3RvcmFnZVNlcnZpY2Uuc2F2ZVNlc3Npb24odGltZURhdGEpO1xuICAgICAgICBhd2FpdCB0aGlzLmNsZWFyRGF0YSgpO1xuICAgIH1cblxuICAgIHNldHVwTWVzc2FnZUxpc3RlbmVyKHVwZGF0ZURpc3BsYXlDYWxsYmFjaykge1xuICAgICAgICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnRpbWVEYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnRyYWNraW5nU3RhdGUuZ2V0Q3VycmVudFN0YXRlKCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKChtZXNzYWdlLnR5cGUgPT09ICd0aW1lVXBkYXRlTGlzdCcgJiYgc3RhdGUuY3VycmVudFZpZXcgPT09ICdsaXN0JykgfHxcbiAgICAgICAgICAgICAgICAgICAgKG1lc3NhZ2UudHlwZSA9PT0gJ3RpbWVVcGRhdGVEYXVnaG51dCcgJiYgc3RhdGUuY3VycmVudFZpZXcgPT09ICdkb251dCcpIHx8XG4gICAgICAgICAgICAgICAgICAgICFzdGF0ZS5pc1RyYWNraW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhY2tpbmdTdGF0ZS5zZXRUaW1lRGF0YShtZXNzYWdlLnRpbWVEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGlzcGxheUNhbGxiYWNrKG1lc3NhZ2UudGltZURhdGEsIHN0YXRlLmN1cnJlbnRWaWV3KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn0iLCIvLyBzcmMvcG9wdXAvc2VydmljZXMvc3RvcmFnZS5qc1xuZXhwb3J0IGNsYXNzIFN0b3JhZ2VTZXJ2aWNlIHtcbiAgICBzdGF0aWMgYXN5bmMgZ2V0U2Vzc2lvbnMoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFsnc2Vzc2lvbnMnXSwgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LnNlc3Npb25zIHx8IFtdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYXN5bmMgc2F2ZVNlc3Npb24odGltZURhdGEpIHtcbiAgICAgICAgY29uc3Qgc2Vzc2lvbnMgPSBhd2FpdCB0aGlzLmdldFNlc3Npb25zKCk7XG4gICAgICAgIHNlc3Npb25zLnB1c2goe1xuICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgdGltZURhdGE6IHsuLi50aW1lRGF0YX1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgc2Vzc2lvbnMgfSwgcmVzb2x2ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBhc3luYyBnZXRUcmFja2luZ1N0YXR1cygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoWydpc1RyYWNraW5nJ10sIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5pc1RyYWNraW5nIHx8IGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgVHJhY2tpbmdTdGF0ZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaXNUcmFja2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRpbWVEYXRhID0ge307XG4gICAgICAgIHRoaXMuY3VycmVudFZpZXcgPSAnZG9udXQnO1xuICAgIH1cblxuICAgIHNldElzVHJhY2tpbmcoc3RhdHVzKSB7XG4gICAgICAgIHRoaXMuaXNUcmFja2luZyA9IHN0YXR1cztcbiAgICB9XG5cbiAgICBzZXRUaW1lRGF0YShkYXRhKSB7XG4gICAgICAgIHRoaXMudGltZURhdGEgPSBkYXRhO1xuICAgIH1cblxuICAgIHNldEN1cnJlbnRWaWV3KHZpZXcpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VmlldyA9IHZpZXc7XG4gICAgfVxuXG4gICAgZ2V0Q3VycmVudFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaXNUcmFja2luZzogdGhpcy5pc1RyYWNraW5nLFxuICAgICAgICAgICAgdGltZURhdGE6IHRoaXMudGltZURhdGEsXG4gICAgICAgICAgICBjdXJyZW50VmlldzogdGhpcy5jdXJyZW50Vmlld1xuICAgICAgICB9O1xuICAgIH1cbn0iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcG9wdXAuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5vcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcG9wdXAuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJwb3B1cFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt0cmFja2VyXCJdID0gc2VsZltcIndlYnBhY2tDaHVua3RyYWNrZXJcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IixudWxsLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzXCIsXCJjb21tb25cIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvcG9wdXAvcG9wdXAuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiJdLCJuYW1lcyI6WyJmb3JtYXRUaW1lIiwiTW9kYWwiLCJfY2xhc3NDYWxsQ2hlY2siLCJjbGVhckNvbmZpcm1Nb2RhbCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJvdGhlck1vZGFsIiwiYWN0aXZlTW9kYWwiLCJzZXR1cEV2ZW50TGlzdGVuZXJzIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJfdGhpcyIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInRhcmdldCIsImhpZGUiLCJvdGhlck1vZGFsQ2xvc2VCdG4iLCJxdWVyeVNlbGVjdG9yIiwibW9kYWxDb250ZW50cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiY29udGVudCIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJzaG93Q2xlYXJDb25maXJtIiwib25Db25maXJtIiwiX3RoaXMyIiwiY29uZmlybUJ1dHRvbiIsImNhbmNlbEJ1dHRvbiIsInNhdmVDaGVja2JveCIsIm5ld0NvbmZpcm1CdXR0b24iLCJjbG9uZU5vZGUiLCJuZXdDYW5jZWxCdXR0b24iLCJwYXJlbnROb2RlIiwicmVwbGFjZUNoaWxkIiwic2hvdWxkU2F2ZVNlc3Npb24iLCJjaGVja2VkIiwic2hvdyIsInNob3dPdGhlckRvbWFpbnMiLCJvdGhlckRvbWFpbnMiLCJjb25zb2xlIiwibG9nIiwibW9kYWxCb2R5IiwiaW5uZXJIVE1MIiwiX3JlZiIsIl9yZWYyIiwiX3NsaWNlZFRvQXJyYXkiLCJkb21haW4iLCJfcmVmMiQiLCJmYXZpY29uIiwidGltZSIsImRvbWFpbkRpdiIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJjb25jYXQiLCJhcHBlbmRDaGlsZCIsIm1vZGFsIiwic3R5bGUiLCJkaXNwbGF5IiwiaXNWaXNpYmxlIiwiZGVzdHJveSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJfcmVnZW5lcmF0b3JSdW50aW1lIiwidCIsInIiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJuIiwiaGFzT3duUHJvcGVydHkiLCJvIiwiZGVmaW5lUHJvcGVydHkiLCJpIiwiU3ltYm9sIiwiYSIsIml0ZXJhdG9yIiwiYyIsImFzeW5jSXRlcmF0b3IiLCJ1IiwidG9TdHJpbmdUYWciLCJkZWZpbmUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJ3cmFwIiwiR2VuZXJhdG9yIiwiY3JlYXRlIiwiQ29udGV4dCIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsInR5cGUiLCJhcmciLCJjYWxsIiwiaCIsImwiLCJmIiwicyIsInkiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwicCIsImQiLCJnZXRQcm90b3R5cGVPZiIsInYiLCJ2YWx1ZXMiLCJnIiwiZGVmaW5lSXRlcmF0b3JNZXRob2RzIiwiX2ludm9rZSIsIkFzeW5jSXRlcmF0b3IiLCJpbnZva2UiLCJfdHlwZW9mIiwicmVzb2x2ZSIsIl9fYXdhaXQiLCJ0aGVuIiwiY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmciLCJFcnJvciIsImRvbmUiLCJtZXRob2QiLCJkZWxlZ2F0ZSIsIm1heWJlSW52b2tlRGVsZWdhdGUiLCJzZW50IiwiX3NlbnQiLCJkaXNwYXRjaEV4Y2VwdGlvbiIsImFicnVwdCIsIlR5cGVFcnJvciIsInJlc3VsdE5hbWUiLCJuZXh0IiwibmV4dExvYyIsInB1c2hUcnlFbnRyeSIsInRyeUxvYyIsImNhdGNoTG9jIiwiZmluYWxseUxvYyIsImFmdGVyTG9jIiwidHJ5RW50cmllcyIsInB1c2giLCJyZXNldFRyeUVudHJ5IiwiY29tcGxldGlvbiIsInJlc2V0IiwiaXNOYU4iLCJsZW5ndGgiLCJkaXNwbGF5TmFtZSIsImlzR2VuZXJhdG9yRnVuY3Rpb24iLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJtYXJrIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJhd3JhcCIsImFzeW5jIiwiUHJvbWlzZSIsImtleXMiLCJyZXZlcnNlIiwicG9wIiwicHJldiIsImNoYXJBdCIsInNsaWNlIiwic3RvcCIsInJ2YWwiLCJoYW5kbGUiLCJjb21wbGV0ZSIsImZpbmlzaCIsIl9jYXRjaCIsImRlbGVnYXRlWWllbGQiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJfYXN5bmNUb0dlbmVyYXRvciIsImFyZ3VtZW50cyIsImFwcGx5IiwiX25leHQiLCJfdGhyb3ciLCJUcmFja2luZ1N0YXRlIiwiQ2hyb21lTWVzc2FnaW5nU2VydmljZSIsIkNoYXJ0Q29tcG9uZW50IiwiTGlzdFZpZXciLCJjb250YWluZXIiLCJzdGFydEJ1dHRvbiIsImNsZWFyQnV0dG9uIiwiZG9udXRPcHRpb24iLCJsaXN0T3B0aW9uIiwiaGlzdFZpZXciLCJ0cmFja2luZ1N0YXRlIiwibWVzc2FnaW5nU2VydmljZSIsImNoYXJ0IiwibGlzdFZpZXciLCJ1cGRhdGVCdXR0b25TdHlsZSIsImlzVHJhY2tpbmciLCJ0ZXh0Q29udGVudCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInVwZGF0ZU9wdGlvbnNTdHlsZSIsImJ1dHRvbiIsImlzRG9udXQiLCJkaXNhYmxlZCIsInNldEN1cnJlbnRWaWV3IiwiaW5pdGlhbGl6ZUNoYXJ0IiwiX2NoYXJ0IiwiaW5pdGlhbGl6ZUxpc3RWaWV3IiwidXBkYXRlRGlzcGxheSIsIm5ld1RpbWVEYXRhIiwiZGlzcGxheVR5cGUiLCJ1bmRlZmluZWQiLCJjdXJyZW50VmlldyIsInNldFRpbWVEYXRhIiwidXBkYXRlIiwiaW5pdGlhbGl6ZVBvcHVwIiwiX2luaXRpYWxpemVQb3B1cCIsIl9jYWxsZWU0IiwicmVzcG9uc2UiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJnZXREYXRhIiwidGltZURhdGEiLCJnZXRUcmFja2luZ1N0YXR1cyIsImhhbmRsZVN0YXJ0Q2xpY2siLCJfaGFuZGxlU3RhcnRDbGljayIsIl9jYWxsZWU1IiwibmV3VHJhY2tpbmdTdGF0dXMiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJzdGFydE9yUGF1c2UiLCJfY2FsbGVlIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInNldFZpZXciLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImxvY2F0aW9uIiwiaHJlZiIsIl9yZWYzIiwiX2NhbGxlZTMiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJzYXZlU2Vzc2lvbiIsImNsZWFyRGF0YSIsIl94Iiwic2V0dXBNZXNzYWdlTGlzdGVuZXIiLCJfY2hhcnQyIiwiX2xpc3RWaWV3IiwiaGVhZCIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwiX3RvUHJvcGVydHlLZXkiLCJfdG9QcmltaXRpdmUiLCJ0b1ByaW1pdGl2ZSIsIlN0cmluZyIsIk51bWJlciIsIlN0b3JhZ2VTZXJ2aWNlIiwiX2dldERhdGEiLCJjaHJvbWUiLCJydW50aW1lIiwic2VuZE1lc3NhZ2UiLCJfZ2V0VHJhY2tpbmdTdGF0dXMiLCJzZXRJc1RyYWNraW5nIiwiX3N0YXJ0T3JQYXVzZSIsInN0YXR1cyIsImxhc3RFcnJvciIsImVycm9yIiwibWVzc2FnZSIsIl9zZXRWaWV3IiwiX3RoaXMzIiwiX3gyIiwiX2NsZWFyRGF0YSIsIl90aGlzNCIsIl9zYXZlU2Vzc2lvbiIsIl9jYWxsZWU2IiwiX2NhbGxlZTYkIiwiX2NvbnRleHQ2IiwiX3gzIiwidXBkYXRlRGlzcGxheUNhbGxiYWNrIiwiX3RoaXM1Iiwib25NZXNzYWdlIiwiYWRkTGlzdGVuZXIiLCJzdGF0ZSIsImdldEN1cnJlbnRTdGF0ZSIsIl9nZXRTZXNzaW9ucyIsInN0b3JhZ2UiLCJsb2NhbCIsImdldCIsInJlc3VsdCIsInNlc3Npb25zIiwiZ2V0U2Vzc2lvbnMiLCJ0aW1lc3RhbXAiLCJEYXRlIiwibm93IiwiX29iamVjdFNwcmVhZCIsInNldCIsImRhdGEiLCJ2aWV3Il0sInNvdXJjZVJvb3QiOiIifQ==