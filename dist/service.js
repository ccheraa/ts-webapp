"use strict";
var dir = 'src/client/app/service/';
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
            tools_1.Tools.error('use ts-webapp service <' + Tool.actions().join('/') + '> <service name> <filename?>');
            return false;
        }
    };
    Tool.create = function (args) {
        if (!Tool.init(args)) {
            return;
        }
        var file = "import { Injectable } from '@angular/core';\nimport { Http } from '@angular/http';\nimport { Observable, Subject } from 'rxjs/rx';\n\n@Injectable()\nexport class " + Tool._Name + "Service {\n  constructor(private http: Http) {}\n  dummy(): Observable<any> {\n    let subject = new Subject<any>();\n    subject.next('data');\n    return subject;\n  }\n}\n";
        tools_1.Tools.writeFile(dir + Tool._name + '.service.ts', file, function (err) {
            if (err) {
                return tools_1.Tools.error(err);
            }
            ;
            tools_1.Tools.addBeforeMulti(dir + 'index.ts', [
                ['/// exports', 'export * from \'./' + Tool._name + '.service\';'],
                ['/// imports', 'import { ' + Tool._Name + 'Service } from \'./' + Tool._name + '.service\';'],
                ['/// services', '  ' + Tool._Name + 'Service,']
            ], function () { });
        });
    };
    Tool.remove = function (args) {
        if (!Tool.init(args)) {
            return;
        }
        tools_1.Tools.deleteFile(dir + Tool._name + '.service.ts', function (err) {
            if (err) {
                return tools_1.Tools.error(err);
            }
            ;
            tools_1.Tools.removeLines(dir + 'index.ts', [
                'export * from \'./' + Tool._name + '.service\';',
                'import { ' + Tool._Name + 'Service } from \'./' + Tool._name + '.service\';',
                '  ' + Tool._Name + 'Service,'
            ]);
        });
    };
    return Tool;
}());
exports.Service = Tool;
//# sourceMappingURL=service.js.map