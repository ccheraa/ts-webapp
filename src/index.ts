#! /usr/bin/env node
declare var process: any;
import { Class } from './class';
import { Component } from './component';
import { Service } from './service';
import { Model } from './model';
import { error } from './tools';
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
      case 'm':
      case 'model': fn = Model.do(action); break;
      default: error('unkown object "' + object + '"\navailable objects: class (l), component (c), service (s), model (m)');
    }
    if (fn) {
      fn(args);
    }
  } else {
    error('use ts-webapp <object> <action> <parameters...>');
  }
}
tools();
