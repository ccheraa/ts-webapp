#! /usr/bin/env node
import { Class } from './class';
import { Component } from './component';
import { Service } from './service';
import { Tools } from './tools';
function tools() {
  if (process.argv.length > 2) {
    let object = process.argv[2];
    let action = process.argv[3];
    let fn: (args: string[]) => void;
    let args = process.argv.slice(4);
    switch (object) {
      case 'l':
      case 'class': fn = Class.do(action); break;
      case 'c':
      case 'component': fn = Component.do(action); break;
      case 's':
      case 'service': fn = Service.do(action); break;
      default: Tools.error('unkown object "' + object + '"\navailable objects: class (l), component (c), Service (s)');
    }
    if (fn) {
      fn(args);
    }
  } else {
    Tools.error('use ts-webapp <object> <action> <parameters...>');
  }
}
tools();