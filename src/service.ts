let dir = 'src/client/app/service/';
import { Tools } from './tools';

class Tool {
  static _name: string;
  static _Name: string;
  static actions(short = true): string[] {
    return short ? ['create (c)', 'remove (r)'] : ['create', 'remove'];
  }
  static do(action: string): (args: string[]) => void {
    switch (action) {
      case 'c':
      case 'create': return Tool.create;
      case 'r':
      case 'remove': return Tool.remove;
      default: Tools.error((action ? 'unkown action "' + action + '"' : 'must define an action') + '\navailable actions: ' + Tool.actions().join(', ')); return;
    }
  }
  static init(args: string[]) {
    if (args.length) {
      Tool._Name = args[0];
      Tool._name = args[1] || Tools.hyphen(args[0]);
      return true;
    } else {
      Tools.error('use ts-webapp service <' + Tool.actions().join('/') + '> <service name> <filename?>');
      return false;
    }
  }
  public static create(args: string[]) {
    if (!Tool.init(args)) { return; }
    let file =
`import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/rx';

@Injectable()
export class ${Tool._Name}Service {
  constructor(private http: Http) {}
  dummy(): Observable<any> {
    let subject = new Subject<any>();
    subject.next('data');
    return subject;
  }
}
`;
    Tools.writeFile(dir + Tool._name + '.service.ts', file, function (err) {
      if (err) {
        return Tools.error(err);
      };
      Tools.addBeforeMulti(dir + 'index.ts', [
        ['/// exports', 'export * from \'./' + Tool._name + '.service\';'],
        ['/// imports', 'import { ' + Tool._Name + 'Service } from \'./' + Tool._name + '.service\';'],
        ['/// services', '  ' + Tool._Name + 'Service,']
      ], () => {});
    });
  }
  public static remove(args: string[]) {
    if (!Tool.init(args)) { return; }
    Tools.deleteFile(dir + Tool._name + '.service.ts', (err) => {
      if (err) { return Tools.error(err); };
      Tools.removeLines(dir + 'index.ts', [
        'export * from \'./' + Tool._name + '.service\';',
        'import { ' + Tool._Name + 'Service } from \'./' + Tool._name + '.service\';',
        '  ' + Tool._Name + 'Service,'
      ]);
    });
  }
}
export { Tool as Service}