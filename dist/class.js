"use strict";
var dir = 'src/common/class/';
var tools_1 = require("./tools");
var Tool = (function () {
    function Tool() {
    }
    Tool.actions = function (short) {
        if (short === void 0) { short = true; }
        return short ? ['create (c)', 'remove (r)'] : ['create', 'remove'];
    };
    Tool.do = function (action) {
        switch (action) {
            case 'c':
            case 'create': return Tool.create;
            case 'r':
            case 'remove': return Tool.remove;
            default:
                tools_1.Tools.error((action ? 'unkown action "' + action + '"' : 'must define an action') + '\navailable actions: ' + Tool.actions().join(', '));
                return;
        }
    };
    Tool.init = function (args) {
        if (args.length) {
            Tool._Name = args[0];
            Tool._name = args[1] || tools_1.Tools.hyphen(args[0]);
            return true;
        }
        else {
            tools_1.Tools.error('use ts-webapp class <' + Tool.actions().join('/') + '> <class name> <filename?>');
            return false;
        }
    };
    Tool.create = function (args) {
        if (!Tool.init(args)) {
            return;
        }
        var file = "export class " + Tool._Name + "Class {\n  id: string;\n}\n";
        tools_1.Tools.writeFile(dir + Tool._name + '.class.ts', file, function (err) {
            if (err) {
                return tools_1.Tools.error(err);
            }
            ;
            tools_1.Tools.addBefore(dir + 'index.ts', '/// exports', 'export * from \'./' + Tool._name + '.class\';', function () { });
        });
    };
    Tool.remove = function (args) {
        if (!Tool.init(args)) {
            return;
        }
        tools_1.Tools.deleteFile(dir + Tool._name + '.class.ts', function () {
            tools_1.Tools.removeLine(dir + 'index.ts', 'export * from \'./' + Tool._name + '.class\';');
        });
    };
    return Tool;
}());
exports.Class = Tool;
//# sourceMappingURL=class.js.map