"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.env = void 0;

// File checks browser environmental variable
var env = function env(key) {
  var value = process.env[key];

  if (!value) {
    throw Error("No environmental variable found for ".concat(key));
  }

  return value;
};

exports.env = env;