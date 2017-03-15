"use strict";
var fs = require("fs");
var rimraf = require("rimraf");
var format = require("string-template");
var path_1 = require("path");
var chalk_1 = require("chalk");
function createDir(dirname) {
    fs.mkdirSync(dirname);
}
exports.createDir = createDir;
function deleteDir(dirname, callback) {
    rimraf(dirname, callback);
}
exports.deleteDir = deleteDir;
function writeFile(filename, data) {
    fs.writeFileSync(filename, data, 'utf8');
}
exports.writeFile = writeFile;
function appendFile(filename, data) {
    fs.appendFileSync(filename, data, 'utf8');
}
exports.appendFile = appendFile;
function deleteFile(filename) {
    fs.unlinkSync(filename);
}
exports.deleteFile = deleteFile;
function removeLine(filename, line) {
    replace(filename, [[new RegExp(line.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '\\r?\\n', 'g'), '']]);
}
exports.removeLine = removeLine;
function removeLines(filename, lines) {
    replace(filename, lines.map(function (line) { return [new RegExp(line.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '\\r?\\n', 'g'), '']; }));
}
exports.removeLines = removeLines;
function addBefore(filename, anchor, line) {
    replace(filename, [
        [new RegExp(line.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '\\r?\\n', 'g'), ''],
        [anchor, line + '\n' + anchor]
    ]);
}
exports.addBefore = addBefore;
function addBeforeMulti(filename, tags) {
    replace(filename, tags.map(function (tag) { return [
        [new RegExp(tag[1].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '\\r?\\n', 'g'), ''],
        [tag[0], tag[1] + '\n' + tag[0]]
    ]; }).reduce(function (tags, tag) { return [].concat(tags, tag); }));
}
exports.addBeforeMulti = addBeforeMulti;
function error(err) {
    console.log(chalk_1.red(err.message || err));
}
exports.error = error;
function hyphen(name) {
    return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
exports.hyphen = hyphen;
function info(message) {
    console.log(chalk_1.blue(message));
}
exports.info = info;
function replace(filename, args) {
    var data = fs.readFileSync(filename, 'utf8');
    args.forEach(function (arg) {
        // console.log(arg[0].test(data));
        data = data.replace(arg[0], arg[1]);
    });
    fs.writeFileSync(filename, data, 'utf8');
}
exports.replace = replace;
function tpl(template, data) {
    // console.log(data);
    // console.log(template);
    // console.log(format(template, data));
    return format(template, data);
}
exports.tpl = tpl;
function tplFile(filename, data) {
    return tpl(fs.readFileSync(path_1.join(__dirname, '../src/templates/' + filename), 'utf8'), data);
}
exports.tplFile = tplFile;
//# sourceMappingURL=tools.js.map