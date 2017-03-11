"use strict";
var fs = require("fs");
var rimraf = require("rimraf");
var chalk_1 = require("chalk");
var Tools = (function () {
    function Tools() {
    }
    Tools.createDir = function (dirname, callback) {
        fs.mkdir(dirname, callback);
    };
    Tools.deleteDir = function (dirname, callback) {
        rimraf(dirname, callback);
    };
    Tools.writeFile = function (filename, data, callback) {
        fs.writeFile(filename, data, 'utf8', callback);
    };
    Tools.appendFile = function (filename, data, callback) {
        fs.appendFile(filename, data, 'utf8', callback);
    };
    Tools.deleteFile = function (filename, callback) {
        fs.unlink(filename, callback);
    };
    Tools.removeLine = function (filename, line, callback) {
        Tools.replace(filename, [[new RegExp(line.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '\\r?\\n', 'g'), '']], callback);
    };
    Tools.removeLines = function (filename, lines, callback) {
        Tools.replace(filename, lines.map(function (line) { return [new RegExp(line.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '\\r?\\n', 'g'), '']; }), callback);
    };
    Tools.addBefore = function (filename, anchor, line, callback) {
        Tools.replace(filename, [
            [new RegExp(line.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '\\r?\\n', 'g'), ''],
            [anchor, line + '\n' + anchor]
        ], function () { });
    };
    Tools.addBeforeMulti = function (filename, tags, callback) {
        Tools.replace(filename, tags.map(function (tag) { return [
            [new RegExp(tag[1].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '\\r?\\n', 'g'), ''],
            [tag[0], tag[1] + '\n' + tag[0]]
        ]; }).reduce(function (tags, tag) { return [].concat(tags, tag); }), function () { });
    };
    Tools.error = function (err) {
        console.log(chalk_1.red(err.message || err));
    };
    Tools.hyphen = function (name) {
        return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    };
    Tools.info = function (message) {
        console.log(chalk_1.blue(message));
    };
    Tools.replace = function (filename, args, callback) {
        fs.readFile(filename, 'utf8', function (err, data) {
            if (err) {
                return Tools.error(err);
            }
            args.forEach(function (arg) {
                // console.log(arg[0].test(data));
                data = data.replace(arg[0], arg[1]);
            });
            fs.writeFile(filename, data, 'utf8', function (err) {
                if (err) {
                    return Tools.error(err);
                }
                callback && callback();
            });
        });
    };
    return Tools;
}());
exports.Tools = Tools;
//# sourceMappingURL=tools.js.map