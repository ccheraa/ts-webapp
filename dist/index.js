#! /usr/bin/env node
"use strict";
var class_1 = require("./class");
var component_1 = require("./component");
var service_1 = require("./service");
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
            default: tools_1.Tools.error('unkown object "' + object + '"\navailable objects: class (l), component (c), Service (s)');
        }
        if (fn) {
            fn(args);
        }
    }
    else {
        tools_1.Tools.error('use ts-webapp <object> <action> <parameters...>');
    }
}
tools();
//# sourceMappingURL=index.js.map