#! /usr/bin/env node
"use strict";
var class_1 = require("./class");
var component_1 = require("./component");
var service_1 = require("./service");
var directive_1 = require("./directive");
var model_1 = require("./model");
var tools_1 = require("./tools");
function tools() {
    if (process.argv.length > 2) {
        var object = process.argv[2];
        var action = process.argv[3];
        var fn = void 0;
        var args = process.argv.slice(4);
        switch (object) {
            case 'l':
            case 'class':
                fn = class_1.Class.do(action);
                break;
            case 'c':
            case 'component':
                fn = component_1.Component.do(action);
                break;
            case 's':
            case 'service':
                fn = service_1.Service.do(action);
                break;
            case 'm':
            case 'model':
                fn = model_1.Model.do(action);
                break;
            case 'd':
            case 'directive':
                fn = directive_1.Directive.do(action);
                break;
            default: tools_1.error('unkown object "' + object + '"\navailable objects: class (l), component (c), service (s), directive (d), model (m)');
        }
        if (fn) {
            fn(args);
        }
    }
    else {
        tools_1.error('use ts-webapp <object> <action> <parameters...>');
    }
}
tools();
//# sourceMappingURL=index.js.map