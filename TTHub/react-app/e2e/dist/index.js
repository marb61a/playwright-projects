"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.smoke = exports.regression = exports.dev = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _parseEnv = require("./env/parseEnv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import file which holds environmental variable that need to be set
_dotenv.default.config({
  path: (0, _parseEnv.env)('COMMON_CONFIG_FILE')
}); // Holds arguments instead of using package.json


var common = "./src/features/**/*.feature                 --require-module ts-node/register  \n                --require ./src/step-definitions/**/**/*.ts                 -f json:./reports/reports.json                 --format progress-bar"; // Creates profiles for different test situations (Previously in package.json scripts)

var dev = "".concat(common, " --tags '@dev'");
exports.dev = dev;
var smoke = "".concat(common, " --tags '@smoke'");
exports.smoke = smoke;
var regression = "".concat(common, " --tags @regression");
exports.regression = regression;