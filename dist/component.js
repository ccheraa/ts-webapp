"use strict";
var dir = 'src/client/app/component/';
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
            tools_1.Tools.error('use ts-webapp component <' + Tool.actions().join('/') + '> <component name> <filename?>');
            return false;
        }
    };
    Tool.create = function (args) {
        if (!Tool.init(args)) {
            return;
        }
        var fileTS = "import { Component, OnInit } from '@angular/core';\nimport { NavigatorService } from '../../service';\n\n@Component({\n  selector: 'app-" + Tool._name + "',\n  templateUrl: './" + Tool._name + ".component.html',\n  styleUrls: ['./" + Tool._name + ".component.scss']\n})\nexport class " + Tool._Name + "Component implements OnInit {\n  constructor(private nav: NavigatorService) { }\n  ngOnInit() {\n    this.nav.title('" + Tool._Name + "');\n    this.nav.home(false);\n    this.nav.menu([]);\n  }\n}\n";
        var fileHTML = "<p>" + Tool._Name + " works!</p>";
        tools_1.Tools.createDir(dir + '/' + Tool._name, function (err) {
            if (err) {
                return tools_1.Tools.error(err);
            }
            ;
            tools_1.Tools.writeFile(dir + '/' + Tool._name + '/' + Tool._name + '.component.ts', fileTS, function (err) {
                if (err) {
                    return tools_1.Tools.error(err);
                }
                ;
                tools_1.Tools.writeFile(dir + '/' + Tool._name + '/' + Tool._name + '.component.html', fileHTML, function (err) {
                    if (err) {
                        return tools_1.Tools.error(err);
                    }
                    ;
                    tools_1.Tools.writeFile(dir + '/' + Tool._name + '/' + Tool._name + '.component.scss', '', function (err) {
                        if (err) {
                            return tools_1.Tools.error(err);
                        }
                        ;
                        tools_1.Tools.addBeforeMulti(dir + 'index.ts', [
                            ['/// exports', 'export * from \'./' + Tool._name + '/' + Tool._name + '.component\';'],
                            ['/// imports', 'import { ' + Tool._Name + 'Component } from \'./' + Tool._name + '/' + Tool._name + '.component\';'],
                            ['/// components', '  ' + Tool._Name + 'Component,']
                        ], function () { });
                    });
                });
            });
        });
    };
    Tool.remove = function (args) {
        if (!Tool.init(args)) {
            return;
        }
        tools_1.Tools.deleteDir(dir + '/' + Tool._name, function (err) {
            if (err) {
                return tools_1.Tools.error(err);
            }
            ;
            tools_1.Tools.removeLines(dir + 'index.ts', [
                'export * from \'./' + Tool._name + '/' + Tool._name + '.component\';',
                'import { ' + Tool._Name + 'Component } from \'./' + Tool._name + '/' + Tool._name + '.component\';',
                '  ' + Tool._Name + 'Component,'
            ]);
        });
    };
    return Tool;
}());
exports.Component = Tool;
//# sourceMappingURL=component.js.map