"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateStatus = exports.getOneOrder = exports.getAllOrder = exports.addOrder = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _order = _interopRequireDefault(require("../models/order.js"));
var addOrder = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var newOrder, savedOrder;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          newOrder = new _order["default"](req.body);
          _context.next = 4;
          return newOrder.save();
        case 4:
          savedOrder = _context.sent;
          res.status(200).json(savedOrder);
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(500).json(_context.t0);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function addOrder(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.addOrder = addOrder;
var getAllOrder = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var order;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _order["default"].find();
        case 3:
          order = _context2.sent;
          return _context2.abrupt("return", res.status(200).json(order));
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).send({
            messenger: _context2.t0
          }));
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function getAllOrder(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getAllOrder = getAllOrder;
var getOneOrder = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, order;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          _context3.next = 4;
          return _order["default"].findById(id);
        case 4:
          order = _context3.sent;
          return _context3.abrupt("return", res.status(200).json(order));
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(500).send({
            messenger: _context3.t0
          }));
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function getOneOrder(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getOneOrder = getOneOrder;
var updateStatus = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body, status, _id, order;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body = req.body, status = _req$body.status, _id = _req$body._id;
          _context4.next = 4;
          return _order["default"].findById(_id);
        case 4:
          order = _context4.sent;
          if (order) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            error: "Order not found"
          }));
        case 7:
          // Cập nhật trạng thái mới cho sản phẩm
          order.status = status;

          // Lưu giỏ hàng đã cập nhật
          _context4.next = 10;
          return order.save();
        case 10:
          return _context4.abrupt("return", res.json({
            message: "updated successfully"
          }));
        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.status(500).json({
            error: "Internal server error"
          });
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 13]]);
  }));
  return function updateStatus(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.updateStatus = updateStatus;