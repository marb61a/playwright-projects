"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.smoke = exports.regression = exports.dev = void 0;
// Holds arguments instead of using package.json
var common = "./src/feature/**/*.feature                 --require-module ts-node/register  \n                --require ./src/step-definitions/**/**/*.ts                 -f json:./reports/reports.json                 --format progress-bar"; // Creates profiles for different test situations (Previously in package.json scripts)

var dev = "".concat(common, " --tags '@dev'");
exports.dev = dev;
var smoke = "".concat(common, " --tags '@smoke'");
exports.smoke = smoke;
var regression = "".concat(common, " --tags @smoke");
exports.regression = regression;