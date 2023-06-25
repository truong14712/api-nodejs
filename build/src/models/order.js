"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var Schema = _mongoose["default"].Schema;
var orderSchema = new Schema({
  products: [{
    productId: {
      type: String,
      ref: "Product"
    },
    quantity: {
      type: Number,
      "default": 1
    }
  }],
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  phoneNumber: {
    type: Number,
    require: true
  },
  deliveryAddress: {
    type: String,
    require: true
  },
  status: {
    type: String,
    "enum": [1, 2, 3],
    "default": 1
  },
  payment: {
    type: String,
    require: true
  },
  total: {
    type: Number,
    require: true
  }
});
var _default = _mongoose["default"].model("order", orderSchema);
exports["default"] = _default;