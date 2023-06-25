"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viteNodeApp = void 0;
var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _index = _interopRequireDefault(require("./routes/index.js"));
var _db = _interopRequireDefault(require("./db.js"));
var _cors = _interopRequireDefault(require("cors"));
var _path = _interopRequireDefault(require("path"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
// import { fileURLToPath } from "url";
_dotenv["default"].config();
var app = (0, _express["default"])();
var PORT = process.env.PORT;
var hostname = "localhost";
app.use(_express["default"].json());
app.use(_bodyParser["default"].json());
app.use((0, _cors["default"])({
  origin: "*"
}));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
// app.use("/", express.static(path.join(__dirname, "uploads")));
// Page Home
app.get("/", function (req, res) {
  res.send("SERVER ON");
});
/* A function that connects to the database. */
(0, _db["default"])();
// run website
// app.use(cors());

app.listen(PORT, hostname, function () {
  console.log("Hello Minh Truong Dev, I am running at ".concat(hostname, ":").concat(PORT));
});
app.use("/api", _index["default"]);
var viteNodeApp = app;
exports.viteNodeApp = viteNodeApp;