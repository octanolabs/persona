"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPersona = getPersona;

var _ethereumjsUtil = require("ethereumjs-util");

var _names = _interopRequireDefault(require("./names"));

var _zodiacs = _interopRequireDefault(require("./zodiacs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var ADDRESS = new RegExp(/^0x[0-9a-fA-F]{40}$/i);

function getPersona(address) {
  // validate address
  if (!ADDRESS.test(address)) {
    return {
      success: false,
      error: address + " is not a valid address"
    };
  } // hash the address, this will ensure minor differences in a given address
  // will create major differences in the end result.


  var keccak = (0, _ethereumjsUtil.bufferToHex)((0, _ethereumjsUtil.keccakFromHexString)(address.toLowerCase())); // strip '0x' prefix from keccack hash

  var stripped = (0, _ethereumjsUtil.stripHexPrefix)(keccak.toLowerCase()); // split hash into byte array

  var split = stripped.match(/.{1,2}/g); // containers

  var sex = 0; // female

  var sum = new _ethereumjsUtil.BN(0); // sum of all positions

  var even = new _ethereumjsUtil.BN(0); // sum of even positions

  var odd = new _ethereumjsUtil.BN(0); // sum of odd positions

  var h1 = new _ethereumjsUtil.BN(0); // sum of half 1 positions

  var h2 = new _ethereumjsUtil.BN(0); // sum of half 2 positions

  var positions = split.entries();
  /* eslint-disable no-unused-vars */

  var _iterator = _createForOfIteratorHelper(positions),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          index = _step$value[0],
          hex = _step$value[1];

      var value = new _ethereumjsUtil.BN(hex, 16);
      sum = sum.add(value);

      if (index % 2) {
        even = even.add(value);
      } else {
        odd = odd.add(value);
      }
    } // determine sex based on even/odd state off total sum

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (sum % 2) {
    sex = 1; // male
  } // determine zodiac


  var zodiacIndex = sum % 12;
  var zodiac = _zodiacs["default"][zodiacIndex]; // determine given name based on sex
  // total male given names: 512
  // total female given names: 512
  // maximum potential odd sum: 4096
  // maximum potential even sum: 4096

  var given = '';

  if (sex === 0) {
    // female. use sum of even positions
    given = _names["default"].female[Math.floor(even / 8)];
  } else {
    // male. use sum of odd positions
    given = _names["default"].male[Math.floor(odd / 8)];
  } // determine family name from a total of 4096
  // maximum potential sum: 8192


  var family = _names["default"].family[Math.floor(sum / 2)]; // done


  return {
    success: true,
    sex: sex === 0 ? 'female' : 'male',
    name: {
      given: given,
      family: family
    },
    zodiac: zodiac,
    version: 1 // in case we make breaking changes in future.

  };
}