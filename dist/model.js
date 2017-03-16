"use strict";
var dirCommon = 'src/common/db/';
var fileFront = 'src/client/app/db/index.ts';
var fileBack = 'src/server/db.ts';
var tools_1 = require("./tools");
var vars = { dirCommon: dirCommon, fileFront: fileFront, fileBack: fileBack };
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
            if (args[1]) {
                if ((args[1] === 'true') || (args[1] === 'false')) {
                    vars.name = tools_1.hyphen(args[0]);
                    vars.auth = args[1] === 'true' ? 'Auth' : '';
                }
                else {
                    vars.name = args[1];
                    vars.auth = args[2] === 'true' ? 'Auth' : '';
                }
            }
            else {
                vars.name = tools_1.hyphen(args[0]);
                vars.auth = '';
            }
            // console.log(vars);
            return true;
        }
        else {
            tools_1.error('use ts-webapp model <' + Tool.actions().join('/') + '> <model name> <filename?> <authentication model (true/false)?>');
            return false;
        }
    };
    Tool.create = function (args) {
        if (!Tool.init(args)) {
            return;
        }
        tools_1.writeFile(tools_1.tpl('{dirCommon}/{name}.def.ts', vars), tools_1.tplFile('model.def.ts', vars));
        tools_1.addBefore(tools_1.tpl('{dirCommon}/index.ts', vars), '/// definitions', tools_1.tpl('export * from \'./{name}.def\';', vars));
        tools_1.addBeforeMulti(vars.fileBack, [
            ['/// imports', tools_1.tpl('  {Name}ModelScheme, {Name}ModelDefinition,', vars)],
            ['/// exports', tools_1.tpl('export const {Name}Model = new {auth}Model<{Name}ModelDefinition>(\'{Name}\', {Name}ModelScheme);', vars)]
        ]);
        tools_1.addBeforeMulti(vars.fileFront, [
            ['/// imports', tools_1.tpl('  {Name}ModelDefinition, {Name}ModelUrl,', vars)],
            ['/// exports', tools_1.tplFile('model.front.ts', vars)],
            ['/// models', tools_1.tpl('  {Name}Model,', vars)]
        ]);
    };
    Tool.remove = function (args) {
        if (!Tool.init(args)) {
            return;
        }
        tools_1.deleteFile(tools_1.tpl('{dirCommon}/{name}.def.ts', vars));
        tools_1.removeLine(tools_1.tpl('{dirCommon}/index.ts', vars), tools_1.tpl('export * from \'./{name}.def\';', vars));
        tools_1.removeLines(vars.fileBack, [
            tools_1.tpl('  {Name}ModelScheme, {Name}ModelDefinition,', vars),
            tools_1.tpl('export const {Name}Model = new {auth}Model<{Name}ModelDefinition>(\'{Name}\', {Name}ModelScheme);', vars),
            tools_1.tpl('export const {Name}Model = new Model<{Name}ModelDefinition>(\'{Name}\', {Name}ModelScheme);', vars)
        ]);
        tools_1.removeLines(vars.fileFront, [
            tools_1.tpl('  {Name}ModelDefinition, {Name}ModelUrl,', vars),
            tools_1.tplFile('model.front.ts', vars),
            tools_1.tpl('  {Name}Model,', vars)
        ]);
    };
    return Tool;
}());
exports.Model = Tool;
//# sourceMappingURL=model.js.map