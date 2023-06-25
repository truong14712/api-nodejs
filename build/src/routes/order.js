"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _order = require("../controllers/order.js");
var router = _express["default"].Router();
router.post("/", _order.addOrder);
router.get("/", _order.getAllOrder);
router.get("/:id", _order.getOneOrder);
router.patch("/updateStatus", _order.updateStatus);
var _default = router;
exports["default"] = _default;