"use strict";
var dir = 'src/client/app/component/';
var tools_1 = require("./tools");
var vars = { dir: dir };
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
                tools_1.error((action ? 'unkown action "' + action + '"' : 'must define an action') + '\navailable actions: ' + Tool.actions().join(', '));
                return;
        }
    };
    Tool.init = function (args) {
        if (args.length) {
            vars.Name = args[0];
            vars.name = args[1] || tools_1.hyphen(args[0]);
            return true;
        }
        else {
            tools_1.error('use ts-webapp component <' + Tool.actions().join('/') + '> <component name> <filename?>');
            return false;
        }
    };
    Tool.create = function (args) {
        if (!Tool.init(args)) {
            return;
        }
        tools_1.createDir(tools_1.tpl('{dir}/{name}', vars));
        tools_1.writeFile(tools_1.tpl('{dir}/{name}/{name}.component.ts', vars), tools_1.tplFile('component.ts', vars));
        tools_1.writeFile(tools_1.tpl('{dir}/{name}/{name}.component.html', vars), tools_1.tplFile('component.html', vars));
        tools_1.writeFile(tools_1.tpl('{dir}/{name}/{name}.component.scss', vars), tools_1.tplFile('component.scss', vars));
        tools_1.addBeforeMulti(tools_1.tpl('{dir}/index.ts', vars), [
            ['/// exports',
                tools_1.tpl('export * from \'./{name}/{name}.component\';', vars)],
            ['/// imports', tools_1.tpl('import { {Name}Component } from \'./{name}/{name}.component\';', vars)],
            ['/// components', tools_1.tpl('  {Name}Component,', vars)]
        ]);
    };
    Tool.remove = function (args) {
        if (!Tool.init(args)) {
            return;
        }
        tools_1.deleteDir(dir + '/' + vars.name, function (err) {
            if (err) {
                return tools_1.error(err);
            }
            ;
            tools_1.removeLines(tools_1.tpl('{dir}/index.ts', vars), [
                tools_1.tpl('export * from \'./{name}/{name}.component\';', vars),
                tools_1.tpl('import { {Name}Component } from \'./{name}/{name}.component\';', vars),
                tools_1.tpl('  {Name}Component,', vars)
            ]);
        });
    };
    return Tool;
}());
exports.Component = Tool;
//# sourceMappingURL=component.js.map