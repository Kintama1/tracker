"use strict";
(self["webpackChunktracker"] = self["webpackChunktracker"] || []).push([["common"],{

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
    this.scrollContainer = null;
    this.listContainer = null;
    this.initialized = false;
    this.initialize();
  }
  return _createClass(ListView, [{
    key: "initialize",
    value: function initialize() {
      // Clear any existing content first
      this.container.innerHTML = '';

      // Create scrollable container
      this.scrollContainer = document.createElement('div');
      this.scrollContainer.className = 'list-scroll-container';

      // Create list container for items
      this.listContainer = document.createElement('div');
      this.listContainer.className = 'domain-list-container';
      this.scrollContainer.appendChild(this.listContainer);
      this.container.appendChild(this.scrollContainer);
      this.initialized = true;
    }
  }, {
    key: "update",
    value: function update(timeData) {
      if (!this.initialized) {
        this.initialize();
      }
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
      if (this.listContainer) {
        this.listContainer.innerHTML = "\n                <div class=\"no-data\">No tracking data available</div>\n            ";
      }
    }
  }, {
    key: "createDomainLink",
    value: function createDomainLink(domain) {
      var link = document.createElement('a');
      link.href = "https://".concat(domain);
      link.className = 'domain-name';
      link.textContent = domain;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      return link;
    }
  }, {
    key: "renderList",
    value: function renderList(sortedDomains) {
      var _this = this;
      if (!this.listContainer) return;
      this.listContainer.innerHTML = '';
      var fragment = document.createDocumentFragment();
      sortedDomains.forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
          domain = _ref6[0],
          _ref6$ = _slicedToArray(_ref6[1], 2),
          favicon = _ref6$[0],
          time = _ref6$[1];
        var domainDiv = document.createElement('div');
        domainDiv.className = 'domain-entry';

        // Create favicon container
        var faviconContainer = document.createElement('div');
        faviconContainer.className = 'favicon-container';

        // Create and append favicon image
        var img = document.createElement('img');
        img.src = favicon || 'assets/default-favicon.png';
        img.alt = 'Favicon';
        img.className = 'favicon-image';
        img.onerror = function () {
          img.src = 'assets/default-favicon.png';
        };
        faviconContainer.appendChild(img);
        domainDiv.appendChild(faviconContainer);

        // Create and append domain link
        var domainLink = _this.createDomainLink(domain);
        domainDiv.appendChild(domainLink);

        // Create time
        var timeSpan = document.createElement('span');
        timeSpan.className = 'domain-time';
        timeSpan.textContent = (0,_utils_timeFormatter__WEBPACK_IMPORTED_MODULE_0__.formatTime)(time);
        domainDiv.appendChild(timeSpan);
        fragment.appendChild(domainDiv);
      });
      this.listContainer.appendChild(fragment);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      // Properly remove all content and references
      if (this.container) {
        this.container.innerHTML = '';
      }
      this.scrollContainer = null;
      this.listContainer = null;
      this.initialized = false;
    }
  }]);
}();

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

/***/ "./node_modules/css-loader/dist/cjs.js!./src/popup/listview.css":
/*!**********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/popup/listview.css ***!
  \**********************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, `/* listview.css */
.list-scroll-container {
    height: 300px;
    overflow-y: auto;
    padding-right: 4px;
}

.domain-list-container {
    display: flex;
    flex-direction: column;
}

.domain-entry {
    display: flex;
    align-items: center;
    padding: 8px;
    border-bottom: 1px solid #252538;
    position: relative;
}

.favicon-container {
    width: 20px;
    height: 20px;
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.favicon-image {
    width: 20px;
    height: 20px;
    object-fit: contain;
}

.domain-name {
    color: #35918b;
    flex: 1;
    margin-right: 12px;
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

/* No data state */
.no-data {
    color: #666;
    text-align: center;
    padding: 20px;
    font-style: italic;
}

/* Add these styles to your listview.css */
.domain-name {
    color: #35918b;
    flex: 1;
    margin-right: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    text-decoration: none; /* Remove default underline */
    transition: color 0.2s ease;
}

.domain-name:hover {
    color: #40b1aa; /* Slightly lighter shade for hover */
    text-decoration: underline; /* Add underline on hover */
}`, "",{"version":3,"sources":["webpack://./src/popup/listview.css"],"names":[],"mappings":"AAAA,iBAAiB;AACjB;IACI,aAAa;IACb,gBAAgB;IAChB,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,YAAY;IACZ,gCAAgC;IAChC,kBAAkB;AACtB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,aAAa;IACb,mBAAmB;IACnB,uBAAuB;AAC3B;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,mBAAmB;AACvB;;AAEA;IACI,cAAc;IACd,OAAO;IACP,kBAAkB;IAClB,mBAAmB;IACnB,gBAAgB;IAChB,uBAAuB;IACvB,eAAe;AACnB;;AAEA;IACI,cAAc;IACd,mBAAmB;IACnB,eAAe;AACnB;;AAEA,sBAAsB;AACtB;IACI,UAAU;AACd;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;IACI,mCAAmC;IACnC,kBAAkB;AACtB;;AAEA;IACI,mCAAmC;AACvC;;AAEA,kBAAkB;AAClB;IACI,WAAW;IACX,kBAAkB;IAClB,aAAa;IACb,kBAAkB;AACtB;;AAEA,0CAA0C;AAC1C;IACI,cAAc;IACd,OAAO;IACP,kBAAkB;IAClB,mBAAmB;IACnB,gBAAgB;IAChB,uBAAuB;IACvB,eAAe;IACf,qBAAqB,EAAE,6BAA6B;IACpD,2BAA2B;AAC/B;;AAEA;IACI,cAAc,EAAE,qCAAqC;IACrD,0BAA0B,EAAE,2BAA2B;AAC3D","sourcesContent":["/* listview.css */\n.list-scroll-container {\n    height: 300px;\n    overflow-y: auto;\n    padding-right: 4px;\n}\n\n.domain-list-container {\n    display: flex;\n    flex-direction: column;\n}\n\n.domain-entry {\n    display: flex;\n    align-items: center;\n    padding: 8px;\n    border-bottom: 1px solid #252538;\n    position: relative;\n}\n\n.favicon-container {\n    width: 20px;\n    height: 20px;\n    margin-right: 12px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.favicon-image {\n    width: 20px;\n    height: 20px;\n    object-fit: contain;\n}\n\n.domain-name {\n    color: #35918b;\n    flex: 1;\n    margin-right: 12px;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 14px;\n}\n\n.domain-time {\n    color: #35918b;\n    white-space: nowrap;\n    font-size: 14px;\n}\n\n/* Scrollbar Styling */\n.list-scroll-container::-webkit-scrollbar {\n    width: 4px;\n}\n\n.list-scroll-container::-webkit-scrollbar-track {\n    background: transparent;\n}\n\n.list-scroll-container::-webkit-scrollbar-thumb {\n    background: rgba(53, 145, 139, 0.3);\n    border-radius: 4px;\n}\n\n.list-scroll-container::-webkit-scrollbar-thumb:hover {\n    background: rgba(53, 145, 139, 0.5);\n}\n\n/* No data state */\n.no-data {\n    color: #666;\n    text-align: center;\n    padding: 20px;\n    font-style: italic;\n}\n\n/* Add these styles to your listview.css */\n.domain-name {\n    color: #35918b;\n    flex: 1;\n    margin-right: 12px;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 14px;\n    text-decoration: none; /* Remove default underline */\n    transition: color 0.2s ease;\n}\n\n.domain-name:hover {\n    color: #40b1aa; /* Slightly lighter shade for hover */\n    text-decoration: underline; /* Add underline on hover */\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_listview_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./listview.css */ "./node_modules/css-loader/dist/cjs.js!./src/popup/listview.css");
// Imports



var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_listview_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
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
}`, "",{"version":3,"sources":["webpack://./src/popup/popup.css"],"names":[],"mappings":"AAEA;IACI,oCAAoC;IACpC,eAAe;IACf,gBAAgB;IAChB,cAAc;IACd,SAAS;IACT,UAAU;IACV,cAAc;IACd,aAAa;IACb,kBAAkB;IAClB,mBAAmB;AACvB;AACA;IACI,aAAa;IACb,mBAAmB;AACvB;AACA;IACI,YAAY;IACZ,aAAa;IACb,8BAA8B;IAC9B,cAAc;AAClB;;AAEA;IACI,aAAa;IACb,6BAA6B;IAC7B,YAAY;IACZ,SAAS;IACT,mBAAmB;AACvB;;AAEA;IACI,yBAAyB;IACzB,sCAAsC;IACtC,kBAAkB;IAClB,YAAY;AAChB;;AAEA;IACI,yBAAyB;AAC7B;;AAEA,oCAAoC;AACpC;IACI,eAAe,EAAE,qCAAqC;AAC1D;;AAEA;;IAEI,eAAe,EAAE,sCAAsC;AAC3D;;AAEA,gCAAgC;AAChC;IACI,eAAe,EAAE,kCAAkC;AACvD;;AAEA;;IAEI,eAAe,EAAE,uCAAuC;AAC5D;;AAEA,uCAAuC;AACvC;IACI,aAAa,EAAE,mCAAmC;AACtD;;AAEA;IACI,aAAa,EAAE,gCAAgC;AACnD;;AAEA,oCAAoC;AACpC;IACI,yBAAyB;AAC7B;;AAEA;;IAEI,yBAAyB;AAC7B;AACA,YAAY;;;;AAIZ,oCAAoC;AACpC;IACI,aAAa;IACb,uBAAuB;IACvB,cAAc;IACd,SAAS;IACT,mBAAmB;;AAEvB;AACA;IACI,kBAAkB;IAClB,YAAY;IACZ,kBAAkB;IAClB,eAAe;IACf,eAAe;IACf,YAAY;IACZ,yBAAyB;IACzB,iCAAiC;AACrC;;AAEA;IACI,yBAAyB;AAC7B;AACA;IACI,yBAAyB;IACzB,YAAY;AAChB;;;AAGA,4BAA4B;;AAE5B;IACI,aAAa;IACb,eAAe;IACf,MAAM;IACN,OAAO;IACP,WAAW;IACX,YAAY;IACZ,oCAAoC;IACpC,aAAa;AACjB;;AAEA;IACI,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,gCAAgC;IAChC,mBAAmB;IACnB,aAAa;IACb,kBAAkB;IAClB,UAAU;IACV,gBAAgB;IAChB,cAAc;AAClB;;AAEA;IACI,gBAAgB;IAChB,gBAAgB;IAChB,eAAe;AACnB;;AAEA;IACI,kBAAkB;IAClB,SAAS;IACT,WAAW;IACX,eAAe;IACf,cAAc;IACd,eAAe;IACf,YAAY;AAChB;;AAEA;IACI,WAAW;AACf;;AAEA,mCAAmC;AACnC;IACI,aAAa;IACb,mBAAmB;IACnB,SAAS;IACT,YAAY;IACZ,kCAAkC;AACtC;;AAEA;IACI,WAAW;IACX,YAAY;AAChB;;AAEA;IACI,YAAY;IACZ,gBAAgB;IAChB,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA,qBAAqB;AACrB;IACI,qBAAqB;AACzB;;AAEA,8BAA8B;AAC9B;IACI,aAAa;IACb,uBAAuB;IACvB,SAAS;IACT,gBAAgB;AACpB;;AAEA;IACI,iBAAiB;IACjB,eAAe;AACnB;AACA;IACI,yBAAyB;AAC7B","sourcesContent":["@import './listview.css';\n\nbody {\n    font-family: 'Open Sans', sans-serif;\n    font-size: 14px;\n    line-height: 1.6;\n    color: #35918b;\n    margin: 0;\n    padding: 0;\n    height : 400px;\n    width : 350px;\n    text-align: center;\n    background: #050518;\n}\n#time-tracker {\n    padding: 10px;\n    background: #050518;\n}\n.header {\n    margin: 10px;\n    display: flex;\n    justify-content: space-between;\n    color: #35918b;\n}\n\n.icon-container {\n    display: flex;\n    justify-content: space-around;\n    width: 100px;\n    gap: 10px;\n    align-items: center;\n}\n\n.icons {\n    background-color: #aaaadf;\n    transition: background-color 0.3s ease;\n    border-radius: 4px;\n    border: none;\n}\n\n.icons:hover {\n    background-color: #292091;\n}\n\n/* SVG colors for non-active state */\n.icons svg {\n    stroke: #0000ff; /* Blue stroke for non-active state */\n}\n\n.icons svg path,\n.icons svg circle {\n    stroke: #0000ff; /* Blue stroke for paths and circles */\n}\n\n/* SVG colors for active state */\n.icons.active svg {\n    stroke: #00ff00; /* Green stroke for active state */\n}\n\n.icons.active svg path,\n.icons.active svg circle {\n    stroke: #00ff00; /* Green stroke for paths and circles */\n}\n\n/* Specific styles for list icon fill */\n#list svg g[id=\"Dribbble-Light-Preview\"] g[id=\"icons\"] path {\n    fill: #0000ff; /* Blue fill for non-active state */\n}\n\n#list.active svg g[id=\"Dribbble-Light-Preview\"] g[id=\"icons\"] path {\n    fill: #00ff00; /* Green fill for active state */\n}\n\n/* Keep your existing hover styles */\n.icons:hover {\n    background-color: #292091;\n}\n\n#daughnut.active,\n#list.active {\n    background-color: #292091;\n}\n/* buttons */\n\n\n\n/* Buttons section working on them */\n.button-container {\n    display: flex;\n    justify-content: center;\n    padding : 1rem;\n    gap: 2rem;\n    margin-bottom: 2rem;\n\n}\n.buttons {\n    padding: 10px 20px;\n    border: none;\n    border-radius: 5px;\n    cursor: pointer;\n    font-size: 1rem;\n    color: white;\n    background-color: #aaaadf;\n    transition: background-color 0.3s;\n}\n\n.buttons:hover {\n    background-color: #292091;\n}\n#start.active:hover {\n    background-color: #5d1717;\n    color: white;\n}\n\n\n/* Modal for other segment */\n\n.modal {\n    display: none;\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.5);\n    z-index: 9999;\n}\n\n.modal-content {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    background: #12122d;\n    padding: 20px;\n    border-radius: 8px;\n    width: 80%;\n    max-width: 300px;\n    color: #35918b;\n}\n\n.modal-body {\n    max-height: 60vh;\n    overflow-y: auto;\n    padding: 10px 0;\n}\n\n.close-btn {\n    position: absolute;\n    top: 10px;\n    right: 15px;\n    font-size: 20px;\n    color: #35918b;\n    cursor: pointer;\n    padding: 5px;\n}\n\n.close-btn:hover {\n    color: #fff;\n}\n\n/* Style for modal domain entries */\n.modal .domain-entry {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    padding: 8px;\n    border-bottom: 1px solid #35918b3d;\n}\n\n.modal .domain-entry img {\n    width: 16px;\n    height: 16px;\n}\n\n.modal .domain-entry .domain-name {\n    flex-grow: 1;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n/* Checkbox styling */\n#saveBeforeClear {\n    accent-color: #35918b;\n}\n\n/* Button container in modal */\n.modal .button-container {\n    display: flex;\n    justify-content: center;\n    gap: 10px;\n    margin-top: 15px;\n}\n\n.modal .buttons {\n    padding: 8px 16px;\n    min-width: 80px;\n}\n.modal .buttons:hover {\n    background-color: #292091;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBbUI7QUFDbkI7O0FBRUE7QUFDQSxtQkFBbUI7QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxPQUFPLHNGQUFzRixZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLE1BQU0sS0FBSyxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssWUFBWSxPQUFPLFlBQVksTUFBTSxzQkFBc0IsT0FBTyxNQUFNLHNCQUFzQixPQUFPLFlBQVksTUFBTSxzQkFBc0IsT0FBTyxNQUFNLHNCQUFzQixPQUFPLFlBQVksTUFBTSxzQkFBc0IsT0FBTyxLQUFLLHNCQUFzQixPQUFPLFlBQVksTUFBTSxZQUFZLE9BQU8sTUFBTSxZQUFZLE1BQU0sYUFBYSxZQUFZLE1BQU0sVUFBVSxZQUFZLFdBQVcsVUFBVSxhQUFhLE1BQU0sS0FBSyxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksV0FBVyxRQUFRLGFBQWEsTUFBTSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksV0FBVyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLE1BQU0sWUFBWSxNQUFNLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sWUFBWSxNQUFNLFlBQVksT0FBTyxZQUFZLE1BQU0sVUFBVSxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLG1EQUFtRCxVQUFVLDJDQUEyQyxzQkFBc0IsdUJBQXVCLHFCQUFxQixnQkFBZ0IsaUJBQWlCLHFCQUFxQixvQkFBb0IseUJBQXlCLDBCQUEwQixHQUFHLGlCQUFpQixvQkFBb0IsMEJBQTBCLEdBQUcsV0FBVyxtQkFBbUIsb0JBQW9CLHFDQUFxQyxxQkFBcUIsR0FBRyxxQkFBcUIsb0JBQW9CLG9DQUFvQyxtQkFBbUIsZ0JBQWdCLDBCQUEwQixHQUFHLFlBQVksZ0NBQWdDLDZDQUE2Qyx5QkFBeUIsbUJBQW1CLEdBQUcsa0JBQWtCLGdDQUFnQyxHQUFHLHVEQUF1RCx1QkFBdUIseUNBQXlDLHlDQUF5Qyx1QkFBdUIsMENBQTBDLDBEQUEwRCx1QkFBdUIsc0NBQXNDLHVEQUF1RCx1QkFBdUIsMkNBQTJDLCtHQUErRyxxQkFBcUIsdUNBQXVDLDRFQUE0RSxxQkFBcUIsb0NBQW9DLHlEQUF5RCxnQ0FBZ0MsR0FBRyxxQ0FBcUMsZ0NBQWdDLEdBQUcsaUZBQWlGLG9CQUFvQiw4QkFBOEIscUJBQXFCLGdCQUFnQiwwQkFBMEIsS0FBSyxZQUFZLHlCQUF5QixtQkFBbUIseUJBQXlCLHNCQUFzQixzQkFBc0IsbUJBQW1CLGdDQUFnQyx3Q0FBd0MsR0FBRyxvQkFBb0IsZ0NBQWdDLEdBQUcsdUJBQXVCLGdDQUFnQyxtQkFBbUIsR0FBRywrQ0FBK0Msb0JBQW9CLHNCQUFzQixhQUFhLGNBQWMsa0JBQWtCLG1CQUFtQiwyQ0FBMkMsb0JBQW9CLEdBQUcsb0JBQW9CLHlCQUF5QixlQUFlLGdCQUFnQix1Q0FBdUMsMEJBQTBCLG9CQUFvQix5QkFBeUIsaUJBQWlCLHVCQUF1QixxQkFBcUIsR0FBRyxpQkFBaUIsdUJBQXVCLHVCQUF1QixzQkFBc0IsR0FBRyxnQkFBZ0IseUJBQXlCLGdCQUFnQixrQkFBa0Isc0JBQXNCLHFCQUFxQixzQkFBc0IsbUJBQW1CLEdBQUcsc0JBQXNCLGtCQUFrQixHQUFHLGdFQUFnRSxvQkFBb0IsMEJBQTBCLGdCQUFnQixtQkFBbUIseUNBQXlDLEdBQUcsOEJBQThCLGtCQUFrQixtQkFBbUIsR0FBRyx1Q0FBdUMsbUJBQW1CLHVCQUF1Qiw4QkFBOEIsMEJBQTBCLEdBQUcsOENBQThDLDRCQUE0QixHQUFHLCtEQUErRCxvQkFBb0IsOEJBQThCLGdCQUFnQix1QkFBdUIsR0FBRyxxQkFBcUIsd0JBQXdCLHNCQUFzQixHQUFHLHlCQUF5QixnQ0FBZ0MsR0FBRyxtQkFBbUI7QUFDMTdLO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90cmFja2VyLy4vc3JjL3BvcHVwL2NvbXBvbmVudHMvQ2hhcnQuanMiLCJ3ZWJwYWNrOi8vdHJhY2tlci8uL3NyYy9wb3B1cC9jb21wb25lbnRzL0xpc3RWaWV3LmpzIiwid2VicGFjazovL3RyYWNrZXIvLi9zcmMvcG9wdXAvdXRpbHMvaWNvbkxvYWRlci5qcyIsIndlYnBhY2s6Ly90cmFja2VyLy4vc3JjL3BvcHVwL3V0aWxzL3RpbWVGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vdHJhY2tlci8uL3NyYy9wb3B1cC9saXN0dmlldy5jc3MiLCJ3ZWJwYWNrOi8vdHJhY2tlci8uL3NyYy9wb3B1cC9wb3B1cC5jc3MiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhcnQgfSBmcm9tICdjaGFydC5qcy9hdXRvJztcbmltcG9ydCB7IGZvcm1hdFRpbWUgfSBmcm9tICcuLi91dGlscy90aW1lRm9ybWF0dGVyJztcbmltcG9ydCB7IGRyYXdGYXZpY29uc09uRG9udXQgfSBmcm9tICcuLi91dGlscy9pY29uTG9hZGVyJztcblxuZXhwb3J0IGNsYXNzIENoYXJ0Q29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIsIG9uT3RoZXJzQ2xpY2spIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMub25PdGhlcnNDbGljayA9IG9uT3RoZXJzQ2xpY2s7XG4gICAgICAgIHRoaXMuZG9udXRDaGFydCA9IG51bGw7XG4gICAgICAgIHRoaXMuZmF2aWNvblVwZGF0ZUludGVydmFsID0gbnVsbDtcbiAgICAgICAgdGhpcy5vdGhlckRvbWFpbnMgPSBbXTtcbiAgICAgICAgdGhpcy50b3RhbFRpbWUgPSAwO1xuXG4gICAgICAgIHRoaXMuY2hhcnRPcHRpb25zID0ge1xuICAgICAgICAgICAgY3V0b3V0OiAnNzAlJyxcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICBhbmltYXRpb246IHsgZHVyYXRpb246IDMwMCB9LFxuICAgICAgICAgICAgcGx1Z2luczoge1xuICAgICAgICAgICAgICAgIGxlZ2VuZDogeyBkaXNwbGF5OiBmYWxzZSB9LFxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogZnVuY3Rpb24oY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRvbWFpbiA9IGNvbnRleHQubGFiZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZSA9IGNvbnRleHQucmF3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtkb21haW59OiAke2Zvcm1hdFRpbWUodGltZSl9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgICAgIGFyYzogeyBib3JkZXJXaWR0aDogMCB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWFpbnRhaW5Bc3BlY3RSYXRpbzogZmFsc2VcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjcmVhdGVUaW1lclBsdWdpbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiAndGltZXJQbHVnaW4nLFxuICAgICAgICAgICAgYmVmb3JlRHJhdzogKGNoYXJ0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBjdHgsIGNoYXJ0QXJlYSB9ID0gY2hhcnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgeyB0b3AsIGJvdHRvbSwgbGVmdCwgcmlnaHQgfSA9IGNoYXJ0QXJlYTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBjZW50ZXJYID0gKHJpZ2h0ICsgbGVmdCkgLyAyO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbnRlclkgPSAodG9wICsgYm90dG9tKSAvIDI7XG5cbiAgICAgICAgICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gJzFyZW0gQXJpYWwnO1xuICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjMzU5MThiJztcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ1RvdGFsIFRpbWUnLCBjZW50ZXJYLCBjZW50ZXJZIC0gMTApO1xuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gJzEuNXJlbSBBcmlhbCc7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGZvcm1hdFRpbWUodGhpcy50b3RhbFRpbWUpLCBjZW50ZXJYLCBjZW50ZXJZICsgMTUpO1xuICAgICAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdXBkYXRlKHRpbWVEYXRhKSB7XG4gICAgICAgIGNvbnN0IG1heFNlZ21lbnRzID0gNTtcbiAgICAgICAgY29uc3QgY29sb3JQYWxldHRlID0gWycjRkY2QjZCJywgJyM0RUNEQzQnLCAnIzQ1QjdEMScsICcjOTZDRUI0JywgJyNGRkVFQUQnXTtcblxuICAgICAgICBjb25zdCBzb3J0ZWREb21haW5zID0gT2JqZWN0LmVudHJpZXModGltZURhdGEpXG4gICAgICAgICAgICAuc29ydCgoWywgYV0sIFssIGJdKSA9PiBiWzFdIC0gYVsxXSk7XG5cbiAgICAgICAgdGhpcy50b3RhbFRpbWUgPSBzb3J0ZWREb21haW5zLnJlZHVjZSgoYWNjLCBbLCBbLCB0aW1lXV0pID0+IGFjYyArIHRpbWUsIDApO1xuICAgICAgICBjb25zdCB0b3BEb21haW5zID0gc29ydGVkRG9tYWlucy5zbGljZSgwLCBtYXhTZWdtZW50cyAtIDEpO1xuICAgICAgICB0aGlzLm90aGVyRG9tYWlucyA9IHNvcnRlZERvbWFpbnMuc2xpY2UobWF4U2VnbWVudHMgLSAxKTtcbiAgICAgICAgY29uc3Qgb3RoZXJUaW1lID0gdGhpcy5vdGhlckRvbWFpbnMucmVkdWNlKChhY2MsIFssIFssIHRpbWVdXSkgPT4gYWNjICsgdGltZSwgMCk7XG5cbiAgICAgICAgY29uc3QgbGFiZWxzID0gWy4uLnRvcERvbWFpbnMubWFwKChbZG9tYWluXSkgPT4gZG9tYWluKSwgJ090aGVycyddO1xuICAgICAgICBjb25zdCBkYXRhID0gWy4uLnRvcERvbWFpbnMubWFwKChbLCBbLCB0aW1lXV0pID0+IHRpbWUpLCBvdGhlclRpbWVdO1xuICAgICAgICBjb25zdCBmYXZpY29ucyA9IFsuLi50b3BEb21haW5zLm1hcCgoWywgW2Zhdmljb25dXSkgPT4gZmF2aWNvbiB8fCAnYXNzZXRzL2RlZmF1bHQtZmF2aWNvbi5wbmcnKV07XG4gICAgICAgIGlmIChmYXZpY29ucy5sZW5ndGggPj0gbWF4U2VnbWVudHMgLSAxKSB7XG4gICAgICAgICAgICBmYXZpY29ucy5wdXNoKCdhc3NldHMvb3RoZXJzLWZhdmljb24ucG5nJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuZG9udXRDaGFydCkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVDaGFydChsYWJlbHMsIGRhdGEsIGNvbG9yUGFsZXR0ZSwgbWF4U2VnbWVudHMsIGZhdmljb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcnQobGFiZWxzLCBkYXRhLCBmYXZpY29ucyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZUZhdmljb25zKGZhdmljb25zKTtcbiAgICB9XG5cbiAgICBjcmVhdGVDaGFydChsYWJlbHMsIGRhdGEsIGNvbG9yUGFsZXR0ZSwgbWF4U2VnbWVudHMsIGZhdmljb25zKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgY2FudmFzLmlkID0gJ2RvbnV0LWNoYXJ0JztcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxuICAgICAgICB0aGlzLmRvbnV0Q2hhcnQgPSBuZXcgQ2hhcnQoY2FudmFzLmdldENvbnRleHQoJzJkJyksIHtcbiAgICAgICAgICAgIHR5cGU6ICdkb3VnaG51dCcsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbGFiZWxzLFxuICAgICAgICAgICAgICAgIGRhdGFzZXRzOiBbe1xuICAgICAgICAgICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yUGFsZXR0ZS5zbGljZSgwLCBtYXhTZWdtZW50cyksXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcHRpb25zOiB0aGlzLmNoYXJ0T3B0aW9ucyxcbiAgICAgICAgICAgIHBsdWdpbnM6IFt0aGlzLmNyZWF0ZVRpbWVyUGx1Z2luKCldXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZG9udXRDaGFydC5mYXZpY29uRGF0YSA9IGZhdmljb25zO1xuICAgICAgICB0aGlzLnNldHVwRXZlbnRMaXN0ZW5lcnMoY2FudmFzKTtcbiAgICB9XG5cbiAgICBzZXR1cEV2ZW50TGlzdGVuZXJzKGNhbnZhcykge1xuICAgICAgICBsZXQgaXNIb3ZlcmluZ090aGVycyA9IGZhbHNlO1xuXG4gICAgICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBvaW50cyA9IHRoaXMuZG9udXRDaGFydC5nZXRFbGVtZW50c0F0RXZlbnRGb3JNb2RlKFxuICAgICAgICAgICAgICAgIGV2ZW50LCAnbmVhcmVzdCcsIHsgaW50ZXJzZWN0OiB0cnVlIH0sIHRydWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChwb2ludHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3RQb2ludCA9IHBvaW50c1swXTtcbiAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuZG9udXRDaGFydC5kYXRhLmxhYmVsc1tmaXJzdFBvaW50LmluZGV4XTtcbiAgICAgICAgICAgICAgICBpZiAobGFiZWwgPT09ICdPdGhlcnMnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNIb3ZlcmluZ090aGVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzSG92ZXJpbmdPdGhlcnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc0hvdmVyaW5nT3RoZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG4gICAgICAgICAgICAgICAgICAgIGlzSG92ZXJpbmdPdGhlcnMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzSG92ZXJpbmdPdGhlcnMpIHtcbiAgICAgICAgICAgICAgICBjYW52YXMuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xuICAgICAgICAgICAgICAgIGlzSG92ZXJpbmdPdGhlcnMgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwb2ludHMgPSB0aGlzLmRvbnV0Q2hhcnQuZ2V0RWxlbWVudHNBdEV2ZW50Rm9yTW9kZShcbiAgICAgICAgICAgICAgICBldmVudCwgJ25lYXJlc3QnLCB7IGludGVyc2VjdDogdHJ1ZSB9LCB0cnVlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHBvaW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdFBvaW50ID0gcG9pbnRzWzBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5kb251dENoYXJ0LmRhdGEubGFiZWxzW2ZpcnN0UG9pbnQuaW5kZXhdO1xuICAgICAgICAgICAgICAgIGlmIChsYWJlbCA9PT0gJ090aGVycycgJiYgdGhpcy5vbk90aGVyc0NsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25PdGhlcnNDbGljayh0aGlzLm90aGVyRG9tYWlucyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVDaGFydChsYWJlbHMsIGRhdGEsIGZhdmljb25zKSB7XG4gICAgICAgIHRoaXMuZG9udXRDaGFydC5kYXRhLmxhYmVscyA9IGxhYmVscztcbiAgICAgICAgdGhpcy5kb251dENoYXJ0LmRhdGEuZGF0YXNldHNbMF0uZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuZG9udXRDaGFydC5mYXZpY29uRGF0YSA9IGZhdmljb25zO1xuICAgICAgICB0aGlzLmRvbnV0Q2hhcnQudXBkYXRlKCdub25lJyk7XG4gICAgfVxuXG4gICAgdXBkYXRlRmF2aWNvbnMoZmF2aWNvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMuZmF2aWNvblVwZGF0ZUludGVydmFsKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuZmF2aWNvblVwZGF0ZUludGVydmFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRvbnV0Q2hhcnQ/LmN0eCkge1xuICAgICAgICAgICAgZHJhd0Zhdmljb25zT25Eb251dCh0aGlzLmRvbnV0Q2hhcnQsIGZhdmljb25zKTtcbiAgICAgICAgICAgIHRoaXMuZmF2aWNvblVwZGF0ZUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRvbnV0Q2hhcnQ/LmN0eCkge1xuICAgICAgICAgICAgICAgICAgICBkcmF3RmF2aWNvbnNPbkRvbnV0KHRoaXMuZG9udXRDaGFydCwgZmF2aWNvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5mYXZpY29uVXBkYXRlSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5mYXZpY29uVXBkYXRlSW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRvbnV0Q2hhcnQpIHtcbiAgICAgICAgICAgIHRoaXMuZG9udXRDaGFydC5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLmRvbnV0Q2hhcnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IGZvcm1hdFRpbWUgfSBmcm9tICcuLi91dGlscy90aW1lRm9ybWF0dGVyJztcblxuZXhwb3J0IGNsYXNzIExpc3RWaWV3IHtcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMuc2Nyb2xsQ29udGFpbmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5saXN0Q29udGFpbmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplKCkge1xuICAgICAgICAvLyBDbGVhciBhbnkgZXhpc3RpbmcgY29udGVudCBmaXJzdFxuICAgICAgICB0aGlzLmNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgXG4gICAgICAgIC8vIENyZWF0ZSBzY3JvbGxhYmxlIGNvbnRhaW5lclxuICAgICAgICB0aGlzLnNjcm9sbENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnNjcm9sbENvbnRhaW5lci5jbGFzc05hbWUgPSAnbGlzdC1zY3JvbGwtY29udGFpbmVyJztcbiAgICAgICAgXG4gICAgICAgIC8vIENyZWF0ZSBsaXN0IGNvbnRhaW5lciBmb3IgaXRlbXNcbiAgICAgICAgdGhpcy5saXN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMubGlzdENvbnRhaW5lci5jbGFzc05hbWUgPSAnZG9tYWluLWxpc3QtY29udGFpbmVyJztcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2Nyb2xsQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubGlzdENvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuc2Nyb2xsQ29udGFpbmVyKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHVwZGF0ZSh0aW1lRGF0YSkge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzb3J0ZWREb21haW5zID0gT2JqZWN0LmVudHJpZXModGltZURhdGEpXG4gICAgICAgICAgICAuc29ydCgoWywgYV0sIFssIGJdKSA9PiBiWzFdIC0gYVsxXSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoc29ydGVkRG9tYWlucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0VtcHR5U3RhdGUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVuZGVyTGlzdChzb3J0ZWREb21haW5zKTtcbiAgICB9XG5cbiAgICBzaG93RW1wdHlTdGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdENvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5saXN0Q29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm8tZGF0YVwiPk5vIHRyYWNraW5nIGRhdGEgYXZhaWxhYmxlPC9kaXY+XG4gICAgICAgICAgICBgO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlRG9tYWluTGluayhkb21haW4pIHtcbiAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgbGluay5ocmVmID0gYGh0dHBzOi8vJHtkb21haW59YDtcbiAgICAgICAgbGluay5jbGFzc05hbWUgPSAnZG9tYWluLW5hbWUnO1xuICAgICAgICBsaW5rLnRleHRDb250ZW50ID0gZG9tYWluO1xuICAgICAgICBsaW5rLnRhcmdldCA9ICdfYmxhbmsnO1xuICAgICAgICBsaW5rLnJlbCA9ICdub29wZW5lciBub3JlZmVycmVyJztcbiAgICAgICAgcmV0dXJuIGxpbms7XG4gICAgfVxuXG4gICAgcmVuZGVyTGlzdChzb3J0ZWREb21haW5zKSB7XG4gICAgICAgIGlmICghdGhpcy5saXN0Q29udGFpbmVyKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxpc3RDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgICAgIHNvcnRlZERvbWFpbnMuZm9yRWFjaCgoW2RvbWFpbiwgW2Zhdmljb24sIHRpbWVdXSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZG9tYWluRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkb21haW5EaXYuY2xhc3NOYW1lID0gJ2RvbWFpbi1lbnRyeSc7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIENyZWF0ZSBmYXZpY29uIGNvbnRhaW5lclxuICAgICAgICAgICAgY29uc3QgZmF2aWNvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZmF2aWNvbkNvbnRhaW5lci5jbGFzc05hbWUgPSAnZmF2aWNvbi1jb250YWluZXInO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBDcmVhdGUgYW5kIGFwcGVuZCBmYXZpY29uIGltYWdlXG4gICAgICAgICAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgIGltZy5zcmMgPSBmYXZpY29uIHx8ICdhc3NldHMvZGVmYXVsdC1mYXZpY29uLnBuZyc7XG4gICAgICAgICAgICBpbWcuYWx0ID0gJ0Zhdmljb24nO1xuICAgICAgICAgICAgaW1nLmNsYXNzTmFtZSA9ICdmYXZpY29uLWltYWdlJztcbiAgICAgICAgICAgIGltZy5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGltZy5zcmMgPSAnYXNzZXRzL2RlZmF1bHQtZmF2aWNvbi5wbmcnO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZhdmljb25Db250YWluZXIuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICAgICAgICAgIGRvbWFpbkRpdi5hcHBlbmRDaGlsZChmYXZpY29uQ29udGFpbmVyKTtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIGFuZCBhcHBlbmQgZG9tYWluIGxpbmtcbiAgICAgICAgICAgIGNvbnN0IGRvbWFpbkxpbmsgPSB0aGlzLmNyZWF0ZURvbWFpbkxpbmsoZG9tYWluKTtcbiAgICAgICAgICAgIGRvbWFpbkRpdi5hcHBlbmRDaGlsZChkb21haW5MaW5rKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRpbWVcbiAgICAgICAgICAgIGNvbnN0IHRpbWVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgdGltZVNwYW4uY2xhc3NOYW1lID0gJ2RvbWFpbi10aW1lJztcbiAgICAgICAgICAgIHRpbWVTcGFuLnRleHRDb250ZW50ID0gZm9ybWF0VGltZSh0aW1lKTtcbiAgICAgICAgICAgIGRvbWFpbkRpdi5hcHBlbmRDaGlsZCh0aW1lU3Bhbik7XG5cbiAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGRvbWFpbkRpdik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubGlzdENvbnRhaW5lci5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgLy8gUHJvcGVybHkgcmVtb3ZlIGFsbCBjb250ZW50IGFuZCByZWZlcmVuY2VzXG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zY3JvbGxDb250YWluZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmxpc3RDb250YWluZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgfVxufSIsImV4cG9ydCBmdW5jdGlvbiBsb2FkQW5kRHJhd0ljb24oZmF2aWNvblVybCwgeCwgeSwgY3R4KSB7XG4gICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG4gICAgXG4gICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgaWNvblNpemUgPSAyMDtcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHgsIHksIGljb25TaXplLzIsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgY3R4LmNsaXAoKTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIHggLSBpY29uU2l6ZS8yLCB5IC0gaWNvblNpemUvMiwgaWNvblNpemUsIGljb25TaXplKTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9O1xuICAgIFxuICAgIGltZy5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBkZWZhdWx0SW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGRlZmF1bHRJbWcuc3JjID0gJ2Fzc2V0cy9kZWZhdWx0LWZhdmljb24ucG5nJztcbiAgICAgICAgZGVmYXVsdEltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpY29uU2l6ZSA9IDIwO1xuICAgICAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5hcmMoeCwgeSwgaWNvblNpemUvMiwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICAgICAgY3R4LmNsaXAoKTtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoZGVmYXVsdEltZywgeCAtIGljb25TaXplLzIsIHkgLSBpY29uU2l6ZS8yLCBpY29uU2l6ZSwgaWNvblNpemUpO1xuICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFxuICAgIGltZy5zcmMgPSBmYXZpY29uVXJsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhd0Zhdmljb25zT25Eb251dChjaGFydCwgZmF2aWNvbnMpIHtcbiAgICBjb25zdCB7IGN0eCwgY2hhcnRBcmVhIH0gPSBjaGFydDtcbiAgICBpZiAoIWNoYXJ0QXJlYSkgcmV0dXJuO1xuICAgIFxuICAgIGNvbnN0IHsgdG9wLCBib3R0b20sIGxlZnQsIHJpZ2h0IH0gPSBjaGFydEFyZWE7XG4gICAgY29uc3QgY2VudGVyWCA9IChyaWdodCArIGxlZnQpIC8gMjtcbiAgICBjb25zdCBjZW50ZXJZID0gKHRvcCArIGJvdHRvbSkgLyAyO1xuICAgIGNvbnN0IHJhZGl1cyA9IE1hdGgubWluKGNoYXJ0QXJlYS53aWR0aCwgY2hhcnRBcmVhLmhlaWdodCkgLyAyO1xuICAgIGNvbnN0IGljb25SYWRpdXMgPSByYWRpdXMgKiAwLjg1O1xuICAgIFxuICAgIGZhdmljb25zLmZvckVhY2goKGZhdmljb24sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmICghY2hhcnQuZ2V0RGF0YXNldE1ldGEoMCkuZGF0YVtpbmRleF0pIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNlZ21lbnQgPSBjaGFydC5nZXREYXRhc2V0TWV0YSgwKS5kYXRhW2luZGV4XTtcbiAgICAgICAgY29uc3Qgcm90YXRpb25PZmZzZXQgPSBNYXRoLlBJLzEuOTU7XG4gICAgICAgIGNvbnN0IHNlZ21lbnRBbmdsZSA9IChzZWdtZW50LnN0YXJ0QW5nbGUgKyBzZWdtZW50LmVuZEFuZ2xlKSAvIDIgLSBNYXRoLlBJIC8gMiArIHJvdGF0aW9uT2Zmc2V0O1xuICAgICAgICBcbiAgICAgICAgY29uc3QgeCA9IGNlbnRlclggKyBNYXRoLmNvcyhzZWdtZW50QW5nbGUpICogaWNvblJhZGl1cztcbiAgICAgICAgY29uc3QgeSA9IGNlbnRlclkgKyBNYXRoLnNpbihzZWdtZW50QW5nbGUpICogaWNvblJhZGl1cztcbiAgICAgICAgXG4gICAgICAgIGxvYWRBbmREcmF3SWNvbihmYXZpY29uLCB4LCB5LCBjdHgpO1xuICAgIH0pO1xufSIsIlxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0VGltZShzZWNvbmRzKSB7XG4gICAgaWYgKHNlY29uZHMgPCA2MCkgcmV0dXJuIGAke3NlY29uZHN9c2A7XG4gICAgaWYgKHNlY29uZHMgPCAzNjAwKSB7XG4gICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCk7XG4gICAgICAgIGNvbnN0IHJlbWFpbmluZ1NlY29uZHMgPSBzZWNvbmRzICUgNjA7XG4gICAgICAgIHJldHVybiBgJHttaW51dGVzfW0gJHtyZW1haW5pbmdTZWNvbmRzfXNgO1xuICAgIH1cbiAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDM2MDApO1xuICAgIGNvbnN0IHJlbWFpbmluZ01pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWNvbmRzICUgMzYwMCkgLyA2MCk7XG4gICAgcmV0dXJuIGAke2hvdXJzfWggJHtyZW1haW5pbmdNaW51dGVzfW1gO1xufSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAvKiBsaXN0dmlldy5jc3MgKi9cbi5saXN0LXNjcm9sbC1jb250YWluZXIge1xuICAgIGhlaWdodDogMzAwcHg7XG4gICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICBwYWRkaW5nLXJpZ2h0OiA0cHg7XG59XG5cbi5kb21haW4tbGlzdC1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLmRvbWFpbi1lbnRyeSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHBhZGRpbmc6IDhweDtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzI1MjUzODtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5mYXZpY29uLWNvbnRhaW5lciB7XG4gICAgd2lkdGg6IDIwcHg7XG4gICAgaGVpZ2h0OiAyMHB4O1xuICAgIG1hcmdpbi1yaWdodDogMTJweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5mYXZpY29uLWltYWdlIHtcbiAgICB3aWR0aDogMjBweDtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgb2JqZWN0LWZpdDogY29udGFpbjtcbn1cblxuLmRvbWFpbi1uYW1lIHtcbiAgICBjb2xvcjogIzM1OTE4YjtcbiAgICBmbGV4OiAxO1xuICAgIG1hcmdpbi1yaWdodDogMTJweDtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4uZG9tYWluLXRpbWUge1xuICAgIGNvbG9yOiAjMzU5MThiO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4vKiBTY3JvbGxiYXIgU3R5bGluZyAqL1xuLmxpc3Qtc2Nyb2xsLWNvbnRhaW5lcjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgIHdpZHRoOiA0cHg7XG59XG5cbi5saXN0LXNjcm9sbC1jb250YWluZXI6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn1cblxuLmxpc3Qtc2Nyb2xsLWNvbnRhaW5lcjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoNTMsIDE0NSwgMTM5LCAwLjMpO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbn1cblxuLmxpc3Qtc2Nyb2xsLWNvbnRhaW5lcjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG92ZXIge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoNTMsIDE0NSwgMTM5LCAwLjUpO1xufVxuXG4vKiBObyBkYXRhIHN0YXRlICovXG4ubm8tZGF0YSB7XG4gICAgY29sb3I6ICM2NjY7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xufVxuXG4vKiBBZGQgdGhlc2Ugc3R5bGVzIHRvIHlvdXIgbGlzdHZpZXcuY3NzICovXG4uZG9tYWluLW5hbWUge1xuICAgIGNvbG9yOiAjMzU5MThiO1xuICAgIGZsZXg6IDE7XG4gICAgbWFyZ2luLXJpZ2h0OiAxMnB4O1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOyAvKiBSZW1vdmUgZGVmYXVsdCB1bmRlcmxpbmUgKi9cbiAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjJzIGVhc2U7XG59XG5cbi5kb21haW4tbmFtZTpob3ZlciB7XG4gICAgY29sb3I6ICM0MGIxYWE7IC8qIFNsaWdodGx5IGxpZ2h0ZXIgc2hhZGUgZm9yIGhvdmVyICovXG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIEFkZCB1bmRlcmxpbmUgb24gaG92ZXIgKi9cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9wb3B1cC9saXN0dmlldy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsaUJBQWlCO0FBQ2pCO0lBQ0ksYUFBYTtJQUNiLGdCQUFnQjtJQUNoQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixZQUFZO0lBQ1osZ0NBQWdDO0lBQ2hDLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksV0FBVztJQUNYLFlBQVk7SUFDWixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxjQUFjO0lBQ2QsT0FBTztJQUNQLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsZ0JBQWdCO0lBQ2hCLHVCQUF1QjtJQUN2QixlQUFlO0FBQ25COztBQUVBO0lBQ0ksY0FBYztJQUNkLG1CQUFtQjtJQUNuQixlQUFlO0FBQ25COztBQUVBLHNCQUFzQjtBQUN0QjtJQUNJLFVBQVU7QUFDZDs7QUFFQTtJQUNJLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLG1DQUFtQztJQUNuQyxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxtQ0FBbUM7QUFDdkM7O0FBRUEsa0JBQWtCO0FBQ2xCO0lBQ0ksV0FBVztJQUNYLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2Isa0JBQWtCO0FBQ3RCOztBQUVBLDBDQUEwQztBQUMxQztJQUNJLGNBQWM7SUFDZCxPQUFPO0lBQ1Asa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixnQkFBZ0I7SUFDaEIsdUJBQXVCO0lBQ3ZCLGVBQWU7SUFDZixxQkFBcUIsRUFBRSw2QkFBNkI7SUFDcEQsMkJBQTJCO0FBQy9COztBQUVBO0lBQ0ksY0FBYyxFQUFFLHFDQUFxQztJQUNyRCwwQkFBMEIsRUFBRSwyQkFBMkI7QUFDM0RcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogbGlzdHZpZXcuY3NzICovXFxuLmxpc3Qtc2Nyb2xsLWNvbnRhaW5lciB7XFxuICAgIGhlaWdodDogMzAwcHg7XFxuICAgIG92ZXJmbG93LXk6IGF1dG87XFxuICAgIHBhZGRpbmctcmlnaHQ6IDRweDtcXG59XFxuXFxuLmRvbWFpbi1saXN0LWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi5kb21haW4tZW50cnkge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwYWRkaW5nOiA4cHg7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMjUyNTM4O1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5mYXZpY29uLWNvbnRhaW5lciB7XFxuICAgIHdpZHRoOiAyMHB4O1xcbiAgICBoZWlnaHQ6IDIwcHg7XFxuICAgIG1hcmdpbi1yaWdodDogMTJweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5mYXZpY29uLWltYWdlIHtcXG4gICAgd2lkdGg6IDIwcHg7XFxuICAgIGhlaWdodDogMjBweDtcXG4gICAgb2JqZWN0LWZpdDogY29udGFpbjtcXG59XFxuXFxuLmRvbWFpbi1uYW1lIHtcXG4gICAgY29sb3I6ICMzNTkxOGI7XFxuICAgIGZsZXg6IDE7XFxuICAgIG1hcmdpbi1yaWdodDogMTJweDtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG59XFxuXFxuLmRvbWFpbi10aW1lIHtcXG4gICAgY29sb3I6ICMzNTkxOGI7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG59XFxuXFxuLyogU2Nyb2xsYmFyIFN0eWxpbmcgKi9cXG4ubGlzdC1zY3JvbGwtY29udGFpbmVyOjotd2Via2l0LXNjcm9sbGJhciB7XFxuICAgIHdpZHRoOiA0cHg7XFxufVxcblxcbi5saXN0LXNjcm9sbC1jb250YWluZXI6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxufVxcblxcbi5saXN0LXNjcm9sbC1jb250YWluZXI6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcXG4gICAgYmFja2dyb3VuZDogcmdiYSg1MywgMTQ1LCAxMzksIDAuMyk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG59XFxuXFxuLmxpc3Qtc2Nyb2xsLWNvbnRhaW5lcjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDUzLCAxNDUsIDEzOSwgMC41KTtcXG59XFxuXFxuLyogTm8gZGF0YSBzdGF0ZSAqL1xcbi5uby1kYXRhIHtcXG4gICAgY29sb3I6ICM2NjY7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5cXG4vKiBBZGQgdGhlc2Ugc3R5bGVzIHRvIHlvdXIgbGlzdHZpZXcuY3NzICovXFxuLmRvbWFpbi1uYW1lIHtcXG4gICAgY29sb3I6ICMzNTkxOGI7XFxuICAgIGZsZXg6IDE7XFxuICAgIG1hcmdpbi1yaWdodDogMTJweDtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOyAvKiBSZW1vdmUgZGVmYXVsdCB1bmRlcmxpbmUgKi9cXG4gICAgdHJhbnNpdGlvbjogY29sb3IgMC4ycyBlYXNlO1xcbn1cXG5cXG4uZG9tYWluLW5hbWU6aG92ZXIge1xcbiAgICBjb2xvcjogIzQwYjFhYTsgLyogU2xpZ2h0bHkgbGlnaHRlciBzaGFkZSBmb3IgaG92ZXIgKi9cXG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIEFkZCB1bmRlcmxpbmUgb24gaG92ZXIgKi9cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfMF9fXyBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2xpc3R2aWV3LmNzc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18uaShfX19DU1NfTE9BREVSX0FUX1JVTEVfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBib2R5IHtcbiAgICBmb250LWZhbWlseTogJ09wZW4gU2FucycsIHNhbnMtc2VyaWY7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxLjY7XG4gICAgY29sb3I6ICMzNTkxOGI7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgaGVpZ2h0IDogNDAwcHg7XG4gICAgd2lkdGggOiAzNTBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgYmFja2dyb3VuZDogIzA1MDUxODtcbn1cbiN0aW1lLXRyYWNrZXIge1xuICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgYmFja2dyb3VuZDogIzA1MDUxODtcbn1cbi5oZWFkZXIge1xuICAgIG1hcmdpbjogMTBweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBjb2xvcjogIzM1OTE4Yjtcbn1cblxuLmljb24tY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICAgIHdpZHRoOiAxMDBweDtcbiAgICBnYXA6IDEwcHg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmljb25zIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWFhYWRmO1xuICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcyBlYXNlO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBib3JkZXI6IG5vbmU7XG59XG5cbi5pY29uczpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI5MjA5MTtcbn1cblxuLyogU1ZHIGNvbG9ycyBmb3Igbm9uLWFjdGl2ZSBzdGF0ZSAqL1xuLmljb25zIHN2ZyB7XG4gICAgc3Ryb2tlOiAjMDAwMGZmOyAvKiBCbHVlIHN0cm9rZSBmb3Igbm9uLWFjdGl2ZSBzdGF0ZSAqL1xufVxuXG4uaWNvbnMgc3ZnIHBhdGgsXG4uaWNvbnMgc3ZnIGNpcmNsZSB7XG4gICAgc3Ryb2tlOiAjMDAwMGZmOyAvKiBCbHVlIHN0cm9rZSBmb3IgcGF0aHMgYW5kIGNpcmNsZXMgKi9cbn1cblxuLyogU1ZHIGNvbG9ycyBmb3IgYWN0aXZlIHN0YXRlICovXG4uaWNvbnMuYWN0aXZlIHN2ZyB7XG4gICAgc3Ryb2tlOiAjMDBmZjAwOyAvKiBHcmVlbiBzdHJva2UgZm9yIGFjdGl2ZSBzdGF0ZSAqL1xufVxuXG4uaWNvbnMuYWN0aXZlIHN2ZyBwYXRoLFxuLmljb25zLmFjdGl2ZSBzdmcgY2lyY2xlIHtcbiAgICBzdHJva2U6ICMwMGZmMDA7IC8qIEdyZWVuIHN0cm9rZSBmb3IgcGF0aHMgYW5kIGNpcmNsZXMgKi9cbn1cblxuLyogU3BlY2lmaWMgc3R5bGVzIGZvciBsaXN0IGljb24gZmlsbCAqL1xuI2xpc3Qgc3ZnIGdbaWQ9XCJEcmliYmJsZS1MaWdodC1QcmV2aWV3XCJdIGdbaWQ9XCJpY29uc1wiXSBwYXRoIHtcbiAgICBmaWxsOiAjMDAwMGZmOyAvKiBCbHVlIGZpbGwgZm9yIG5vbi1hY3RpdmUgc3RhdGUgKi9cbn1cblxuI2xpc3QuYWN0aXZlIHN2ZyBnW2lkPVwiRHJpYmJibGUtTGlnaHQtUHJldmlld1wiXSBnW2lkPVwiaWNvbnNcIl0gcGF0aCB7XG4gICAgZmlsbDogIzAwZmYwMDsgLyogR3JlZW4gZmlsbCBmb3IgYWN0aXZlIHN0YXRlICovXG59XG5cbi8qIEtlZXAgeW91ciBleGlzdGluZyBob3ZlciBzdHlsZXMgKi9cbi5pY29uczpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI5MjA5MTtcbn1cblxuI2RhdWdobnV0LmFjdGl2ZSxcbiNsaXN0LmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI5MjA5MTtcbn1cbi8qIGJ1dHRvbnMgKi9cblxuXG5cbi8qIEJ1dHRvbnMgc2VjdGlvbiB3b3JraW5nIG9uIHRoZW0gKi9cbi5idXR0b24tY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIHBhZGRpbmcgOiAxcmVtO1xuICAgIGdhcDogMnJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xuXG59XG4uYnV0dG9ucyB7XG4gICAgcGFkZGluZzogMTBweCAyMHB4O1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FhYWFkZjtcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3M7XG59XG5cbi5idXR0b25zOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjkyMDkxO1xufVxuI3N0YXJ0LmFjdGl2ZTpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzVkMTcxNztcbiAgICBjb2xvcjogd2hpdGU7XG59XG5cblxuLyogTW9kYWwgZm9yIG90aGVyIHNlZ21lbnQgKi9cblxuLm1vZGFsIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xuICAgIHotaW5kZXg6IDk5OTk7XG59XG5cbi5tb2RhbC1jb250ZW50IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA1MCU7XG4gICAgbGVmdDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICAgIGJhY2tncm91bmQ6ICMxMjEyMmQ7XG4gICAgcGFkZGluZzogMjBweDtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgd2lkdGg6IDgwJTtcbiAgICBtYXgtd2lkdGg6IDMwMHB4O1xuICAgIGNvbG9yOiAjMzU5MThiO1xufVxuXG4ubW9kYWwtYm9keSB7XG4gICAgbWF4LWhlaWdodDogNjB2aDtcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIHBhZGRpbmc6IDEwcHggMDtcbn1cblxuLmNsb3NlLWJ0biB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMTBweDtcbiAgICByaWdodDogMTVweDtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gICAgY29sb3I6ICMzNTkxOGI7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHBhZGRpbmc6IDVweDtcbn1cblxuLmNsb3NlLWJ0bjpob3ZlciB7XG4gICAgY29sb3I6ICNmZmY7XG59XG5cbi8qIFN0eWxlIGZvciBtb2RhbCBkb21haW4gZW50cmllcyAqL1xuLm1vZGFsIC5kb21haW4tZW50cnkge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDEwcHg7XG4gICAgcGFkZGluZzogOHB4O1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMzU5MThiM2Q7XG59XG5cbi5tb2RhbCAuZG9tYWluLWVudHJ5IGltZyB7XG4gICAgd2lkdGg6IDE2cHg7XG4gICAgaGVpZ2h0OiAxNnB4O1xufVxuXG4ubW9kYWwgLmRvbWFpbi1lbnRyeSAuZG9tYWluLW5hbWUge1xuICAgIGZsZXgtZ3JvdzogMTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5cbi8qIENoZWNrYm94IHN0eWxpbmcgKi9cbiNzYXZlQmVmb3JlQ2xlYXIge1xuICAgIGFjY2VudC1jb2xvcjogIzM1OTE4Yjtcbn1cblxuLyogQnV0dG9uIGNvbnRhaW5lciBpbiBtb2RhbCAqL1xuLm1vZGFsIC5idXR0b24tY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGdhcDogMTBweDtcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xufVxuXG4ubW9kYWwgLmJ1dHRvbnMge1xuICAgIHBhZGRpbmc6IDhweCAxNnB4O1xuICAgIG1pbi13aWR0aDogODBweDtcbn1cbi5tb2RhbCAuYnV0dG9uczpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI5MjA5MTtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9wb3B1cC9wb3B1cC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUE7SUFDSSxvQ0FBb0M7SUFDcEMsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2QsU0FBUztJQUNULFVBQVU7SUFDVixjQUFjO0lBQ2QsYUFBYTtJQUNiLGtCQUFrQjtJQUNsQixtQkFBbUI7QUFDdkI7QUFDQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7QUFDdkI7QUFDQTtJQUNJLFlBQVk7SUFDWixhQUFhO0lBQ2IsOEJBQThCO0lBQzlCLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsNkJBQTZCO0lBQzdCLFlBQVk7SUFDWixTQUFTO0lBQ1QsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLHNDQUFzQztJQUN0QyxrQkFBa0I7SUFDbEIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQSxvQ0FBb0M7QUFDcEM7SUFDSSxlQUFlLEVBQUUscUNBQXFDO0FBQzFEOztBQUVBOztJQUVJLGVBQWUsRUFBRSxzQ0FBc0M7QUFDM0Q7O0FBRUEsZ0NBQWdDO0FBQ2hDO0lBQ0ksZUFBZSxFQUFFLGtDQUFrQztBQUN2RDs7QUFFQTs7SUFFSSxlQUFlLEVBQUUsdUNBQXVDO0FBQzVEOztBQUVBLHVDQUF1QztBQUN2QztJQUNJLGFBQWEsRUFBRSxtQ0FBbUM7QUFDdEQ7O0FBRUE7SUFDSSxhQUFhLEVBQUUsZ0NBQWdDO0FBQ25EOztBQUVBLG9DQUFvQztBQUNwQztJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQTs7SUFFSSx5QkFBeUI7QUFDN0I7QUFDQSxZQUFZOzs7O0FBSVosb0NBQW9DO0FBQ3BDO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixjQUFjO0lBQ2QsU0FBUztJQUNULG1CQUFtQjs7QUFFdkI7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixlQUFlO0lBQ2YsWUFBWTtJQUNaLHlCQUF5QjtJQUN6QixpQ0FBaUM7QUFDckM7O0FBRUE7SUFDSSx5QkFBeUI7QUFDN0I7QUFDQTtJQUNJLHlCQUF5QjtJQUN6QixZQUFZO0FBQ2hCOzs7QUFHQSw0QkFBNEI7O0FBRTVCO0lBQ0ksYUFBYTtJQUNiLGVBQWU7SUFDZixNQUFNO0lBQ04sT0FBTztJQUNQLFdBQVc7SUFDWCxZQUFZO0lBQ1osb0NBQW9DO0lBQ3BDLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLFNBQVM7SUFDVCxnQ0FBZ0M7SUFDaEMsbUJBQW1CO0lBQ25CLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLGdCQUFnQjtJQUNoQixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFNBQVM7SUFDVCxXQUFXO0lBQ1gsZUFBZTtJQUNmLGNBQWM7SUFDZCxlQUFlO0lBQ2YsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFdBQVc7QUFDZjs7QUFFQSxtQ0FBbUM7QUFDbkM7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLFNBQVM7SUFDVCxZQUFZO0lBQ1osa0NBQWtDO0FBQ3RDOztBQUVBO0lBQ0ksV0FBVztJQUNYLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLHVCQUF1QjtJQUN2QixtQkFBbUI7QUFDdkI7O0FBRUEscUJBQXFCO0FBQ3JCO0lBQ0kscUJBQXFCO0FBQ3pCOztBQUVBLDhCQUE4QjtBQUM5QjtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsU0FBUztJQUNULGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixlQUFlO0FBQ25CO0FBQ0E7SUFDSSx5QkFBeUI7QUFDN0JcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCAnLi9saXN0dmlldy5jc3MnO1xcblxcbmJvZHkge1xcbiAgICBmb250LWZhbWlseTogJ09wZW4gU2FucycsIHNhbnMtc2VyaWY7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgbGluZS1oZWlnaHQ6IDEuNjtcXG4gICAgY29sb3I6ICMzNTkxOGI7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgaGVpZ2h0IDogNDAwcHg7XFxuICAgIHdpZHRoIDogMzUwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZDogIzA1MDUxODtcXG59XFxuI3RpbWUtdHJhY2tlciB7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIGJhY2tncm91bmQ6ICMwNTA1MTg7XFxufVxcbi5oZWFkZXIge1xcbiAgICBtYXJnaW46IDEwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgY29sb3I6ICMzNTkxOGI7XFxufVxcblxcbi5pY29uLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICB3aWR0aDogMTAwcHg7XFxuICAgIGdhcDogMTBweDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmljb25zIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FhYWFkZjtcXG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzIGVhc2U7XFxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgYm9yZGVyOiBub25lO1xcbn1cXG5cXG4uaWNvbnM6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjkyMDkxO1xcbn1cXG5cXG4vKiBTVkcgY29sb3JzIGZvciBub24tYWN0aXZlIHN0YXRlICovXFxuLmljb25zIHN2ZyB7XFxuICAgIHN0cm9rZTogIzAwMDBmZjsgLyogQmx1ZSBzdHJva2UgZm9yIG5vbi1hY3RpdmUgc3RhdGUgKi9cXG59XFxuXFxuLmljb25zIHN2ZyBwYXRoLFxcbi5pY29ucyBzdmcgY2lyY2xlIHtcXG4gICAgc3Ryb2tlOiAjMDAwMGZmOyAvKiBCbHVlIHN0cm9rZSBmb3IgcGF0aHMgYW5kIGNpcmNsZXMgKi9cXG59XFxuXFxuLyogU1ZHIGNvbG9ycyBmb3IgYWN0aXZlIHN0YXRlICovXFxuLmljb25zLmFjdGl2ZSBzdmcge1xcbiAgICBzdHJva2U6ICMwMGZmMDA7IC8qIEdyZWVuIHN0cm9rZSBmb3IgYWN0aXZlIHN0YXRlICovXFxufVxcblxcbi5pY29ucy5hY3RpdmUgc3ZnIHBhdGgsXFxuLmljb25zLmFjdGl2ZSBzdmcgY2lyY2xlIHtcXG4gICAgc3Ryb2tlOiAjMDBmZjAwOyAvKiBHcmVlbiBzdHJva2UgZm9yIHBhdGhzIGFuZCBjaXJjbGVzICovXFxufVxcblxcbi8qIFNwZWNpZmljIHN0eWxlcyBmb3IgbGlzdCBpY29uIGZpbGwgKi9cXG4jbGlzdCBzdmcgZ1tpZD1cXFwiRHJpYmJibGUtTGlnaHQtUHJldmlld1xcXCJdIGdbaWQ9XFxcImljb25zXFxcIl0gcGF0aCB7XFxuICAgIGZpbGw6ICMwMDAwZmY7IC8qIEJsdWUgZmlsbCBmb3Igbm9uLWFjdGl2ZSBzdGF0ZSAqL1xcbn1cXG5cXG4jbGlzdC5hY3RpdmUgc3ZnIGdbaWQ9XFxcIkRyaWJiYmxlLUxpZ2h0LVByZXZpZXdcXFwiXSBnW2lkPVxcXCJpY29uc1xcXCJdIHBhdGgge1xcbiAgICBmaWxsOiAjMDBmZjAwOyAvKiBHcmVlbiBmaWxsIGZvciBhY3RpdmUgc3RhdGUgKi9cXG59XFxuXFxuLyogS2VlcCB5b3VyIGV4aXN0aW5nIGhvdmVyIHN0eWxlcyAqL1xcbi5pY29uczpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyOTIwOTE7XFxufVxcblxcbiNkYXVnaG51dC5hY3RpdmUsXFxuI2xpc3QuYWN0aXZlIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI5MjA5MTtcXG59XFxuLyogYnV0dG9ucyAqL1xcblxcblxcblxcbi8qIEJ1dHRvbnMgc2VjdGlvbiB3b3JraW5nIG9uIHRoZW0gKi9cXG4uYnV0dG9uLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBwYWRkaW5nIDogMXJlbTtcXG4gICAgZ2FwOiAycmVtO1xcbiAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xcblxcbn1cXG4uYnV0dG9ucyB7XFxuICAgIHBhZGRpbmc6IDEwcHggMjBweDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhYWFhZGY7XFxuICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcztcXG59XFxuXFxuLmJ1dHRvbnM6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjkyMDkxO1xcbn1cXG4jc3RhcnQuYWN0aXZlOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzVkMTcxNztcXG4gICAgY29sb3I6IHdoaXRlO1xcbn1cXG5cXG5cXG4vKiBNb2RhbCBmb3Igb3RoZXIgc2VnbWVudCAqL1xcblxcbi5tb2RhbCB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICAgIHotaW5kZXg6IDk5OTk7XFxufVxcblxcbi5tb2RhbC1jb250ZW50IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogNTAlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gICAgYmFja2dyb3VuZDogIzEyMTIyZDtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgICB3aWR0aDogODAlO1xcbiAgICBtYXgtd2lkdGg6IDMwMHB4O1xcbiAgICBjb2xvcjogIzM1OTE4YjtcXG59XFxuXFxuLm1vZGFsLWJvZHkge1xcbiAgICBtYXgtaGVpZ2h0OiA2MHZoO1xcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xcbiAgICBwYWRkaW5nOiAxMHB4IDA7XFxufVxcblxcbi5jbG9zZS1idG4ge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMTBweDtcXG4gICAgcmlnaHQ6IDE1cHg7XFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXG4gICAgY29sb3I6ICMzNTkxOGI7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgcGFkZGluZzogNXB4O1xcbn1cXG5cXG4uY2xvc2UtYnRuOmhvdmVyIHtcXG4gICAgY29sb3I6ICNmZmY7XFxufVxcblxcbi8qIFN0eWxlIGZvciBtb2RhbCBkb21haW4gZW50cmllcyAqL1xcbi5tb2RhbCAuZG9tYWluLWVudHJ5IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiAxMHB4O1xcbiAgICBwYWRkaW5nOiA4cHg7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMzU5MThiM2Q7XFxufVxcblxcbi5tb2RhbCAuZG9tYWluLWVudHJ5IGltZyB7XFxuICAgIHdpZHRoOiAxNnB4O1xcbiAgICBoZWlnaHQ6IDE2cHg7XFxufVxcblxcbi5tb2RhbCAuZG9tYWluLWVudHJ5IC5kb21haW4tbmFtZSB7XFxuICAgIGZsZXgtZ3JvdzogMTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxufVxcblxcbi8qIENoZWNrYm94IHN0eWxpbmcgKi9cXG4jc2F2ZUJlZm9yZUNsZWFyIHtcXG4gICAgYWNjZW50LWNvbG9yOiAjMzU5MThiO1xcbn1cXG5cXG4vKiBCdXR0b24gY29udGFpbmVyIGluIG1vZGFsICovXFxuLm1vZGFsIC5idXR0b24tY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGdhcDogMTBweDtcXG4gICAgbWFyZ2luLXRvcDogMTVweDtcXG59XFxuXFxuLm1vZGFsIC5idXR0b25zIHtcXG4gICAgcGFkZGluZzogOHB4IDE2cHg7XFxuICAgIG1pbi13aWR0aDogODBweDtcXG59XFxuLm1vZGFsIC5idXR0b25zOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI5MjA5MTtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiJdLCJuYW1lcyI6WyJDaGFydCIsImZvcm1hdFRpbWUiLCJkcmF3RmF2aWNvbnNPbkRvbnV0IiwiQ2hhcnRDb21wb25lbnQiLCJjb250YWluZXIiLCJvbk90aGVyc0NsaWNrIiwiX2NsYXNzQ2FsbENoZWNrIiwiZG9udXRDaGFydCIsImZhdmljb25VcGRhdGVJbnRlcnZhbCIsIm90aGVyRG9tYWlucyIsInRvdGFsVGltZSIsImNoYXJ0T3B0aW9ucyIsImN1dG91dCIsInJlc3BvbnNpdmUiLCJhbmltYXRpb24iLCJkdXJhdGlvbiIsInBsdWdpbnMiLCJsZWdlbmQiLCJkaXNwbGF5IiwidG9vbHRpcCIsImVuYWJsZWQiLCJjYWxsYmFja3MiLCJsYWJlbCIsImNvbnRleHQiLCJkb21haW4iLCJ0aW1lIiwicmF3IiwiY29uY2F0IiwiZWxlbWVudHMiLCJhcmMiLCJib3JkZXJXaWR0aCIsIm1haW50YWluQXNwZWN0UmF0aW8iLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsImNyZWF0ZVRpbWVyUGx1Z2luIiwiX3RoaXMiLCJpZCIsImJlZm9yZURyYXciLCJjaGFydCIsImN0eCIsImNoYXJ0QXJlYSIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsImNlbnRlclgiLCJjZW50ZXJZIiwic2F2ZSIsImZvbnQiLCJ0ZXh0QWxpZ24iLCJ0ZXh0QmFzZWxpbmUiLCJmaWxsU3R5bGUiLCJmaWxsVGV4dCIsInJlc3RvcmUiLCJ1cGRhdGUiLCJ0aW1lRGF0YSIsIm1heFNlZ21lbnRzIiwiY29sb3JQYWxldHRlIiwic29ydGVkRG9tYWlucyIsIk9iamVjdCIsImVudHJpZXMiLCJzb3J0IiwiX3JlZiIsIl9yZWYyIiwiX3JlZjMiLCJfc2xpY2VkVG9BcnJheSIsImEiLCJfcmVmNCIsImIiLCJyZWR1Y2UiLCJhY2MiLCJfcmVmNSIsIl9yZWY2IiwiX3JlZjYkIiwidG9wRG9tYWlucyIsInNsaWNlIiwib3RoZXJUaW1lIiwiX3JlZjciLCJfcmVmOCIsIl9yZWY4JCIsImxhYmVscyIsIl90b0NvbnN1bWFibGVBcnJheSIsIm1hcCIsIl9yZWY5IiwiX3JlZjEwIiwiZGF0YSIsIl9yZWYxMSIsIl9yZWYxMiIsIl9yZWYxMiQiLCJmYXZpY29ucyIsIl9yZWYxMyIsIl9yZWYxNCIsIl9yZWYxNCQiLCJmYXZpY29uIiwibGVuZ3RoIiwicHVzaCIsImNyZWF0ZUNoYXJ0IiwidXBkYXRlQ2hhcnQiLCJ1cGRhdGVGYXZpY29ucyIsImlubmVySFRNTCIsImNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiZ2V0Q29udGV4dCIsInR5cGUiLCJkYXRhc2V0cyIsImJhY2tncm91bmRDb2xvciIsIm9wdGlvbnMiLCJmYXZpY29uRGF0YSIsInNldHVwRXZlbnRMaXN0ZW5lcnMiLCJfdGhpczIiLCJpc0hvdmVyaW5nT3RoZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicG9pbnRzIiwiZ2V0RWxlbWVudHNBdEV2ZW50Rm9yTW9kZSIsImludGVyc2VjdCIsImZpcnN0UG9pbnQiLCJpbmRleCIsInN0eWxlIiwiY3Vyc29yIiwiX3RoaXMkZG9udXRDaGFydCIsIl90aGlzMyIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsIl90aGlzMyRkb251dENoYXJ0IiwiZGVzdHJveSIsIkxpc3RWaWV3Iiwic2Nyb2xsQ29udGFpbmVyIiwibGlzdENvbnRhaW5lciIsImluaXRpYWxpemVkIiwiaW5pdGlhbGl6ZSIsImNsYXNzTmFtZSIsInNob3dFbXB0eVN0YXRlIiwicmVuZGVyTGlzdCIsImNyZWF0ZURvbWFpbkxpbmsiLCJsaW5rIiwiaHJlZiIsInRleHRDb250ZW50IiwidGFyZ2V0IiwicmVsIiwiZnJhZ21lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwiZm9yRWFjaCIsImRvbWFpbkRpdiIsImZhdmljb25Db250YWluZXIiLCJpbWciLCJzcmMiLCJhbHQiLCJvbmVycm9yIiwiZG9tYWluTGluayIsInRpbWVTcGFuIiwibG9hZEFuZERyYXdJY29uIiwiZmF2aWNvblVybCIsIngiLCJ5IiwiSW1hZ2UiLCJjcm9zc09yaWdpbiIsIm9ubG9hZCIsImljb25TaXplIiwiYmVnaW5QYXRoIiwiTWF0aCIsIlBJIiwiY2xpcCIsImRyYXdJbWFnZSIsImRlZmF1bHRJbWciLCJyYWRpdXMiLCJtaW4iLCJ3aWR0aCIsImhlaWdodCIsImljb25SYWRpdXMiLCJnZXREYXRhc2V0TWV0YSIsInNlZ21lbnQiLCJyb3RhdGlvbk9mZnNldCIsInNlZ21lbnRBbmdsZSIsInN0YXJ0QW5nbGUiLCJlbmRBbmdsZSIsImNvcyIsInNpbiIsInNlY29uZHMiLCJtaW51dGVzIiwiZmxvb3IiLCJyZW1haW5pbmdTZWNvbmRzIiwiaG91cnMiLCJyZW1haW5pbmdNaW51dGVzIl0sInNvdXJjZVJvb3QiOiIifQ==