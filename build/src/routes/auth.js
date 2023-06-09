"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = require("../controllers/auth.js");
var _checkPermission = require("../middlewares/checkPermission.js");
var router = _express["default"].Router();
router.post("/signup", _auth.signup);
router.post("/signin", _auth.signin);
router.post("/refresh", _auth.request_refreshToken);
router.put("/update-user-password", _checkPermission.checkPermission, _auth.updatePassword);
var _default = router;
exports["default"] = _default;