let dir = 'src/client/app/component/';
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
      Tools.error('use ts-webapp component <' + Tool.actions().join('/') + '> <component name> <filename?>');
      return false;
    }
  }
  public static create(args: string[]) {
    if (!Tool.init(args)) { return; }
    let fileTS =
`import { Component, OnInit } from '@angular/core';
import { NavigatorService } from '../../service';

@Component({
  selector: 'app-${Tool._name}',
  templateUrl: './${Tool._name}.component.html',
  styleUrls: ['./${Tool._name}.component.scss']
})
export class ${Tool._Name}Component implements OnInit {
  constructor(private nav: NavigatorService) { }
  ngOnInit() {
    this.nav.title('${Tool._Name}');
    this.nav.home(false);
    this.nav.menu([]);
  }
}
`;
    let fileHTML = `<p>${Tool._Name} works!</p>`;
    Tools.createDir(dir + '/' + Tool._name, (err) => {
      if (err) { return Tools.error(err); };
      Tools.writeFile(dir + '/' + Tool._name + '/' + Tool._name + '.component.ts', fileTS, function (err) {
        if (err) { return Tools.error(err); };
        Tools.writeFile(dir + '/' + Tool._name + '/' + Tool._name + '.component.html', fileHTML, function (err) {
          if (err) { return Tools.error(err); };
          Tools.writeFile(dir + '/' + Tool._name + '/' + Tool._name + '.component.scss', '', function (err) {
            if (err) { return Tools.error(err); };
            Tools.addBeforeMulti(dir + 'index.ts', [
              ['/// exports', 'export * from \'./' + Tool._name + '/' + Tool._name + '.component\';'],
              ['/// imports', 'import { ' + Tool._Name + 'Component } from \'./' + Tool._name + '/' + Tool._name + '.component\';'],
              ['/// components', '  ' + Tool._Name + 'Component,']
            ], () => {});
          });
        });
      });
    });
  }
  public static remove(args: string[]) {
    if (!Tool.init(args)) { return; }
    Tools.deleteDir(dir + '/' + Tool._name, (err) => {
      if (err) { return Tools.error(err); };
      Tools.removeLines(dir + 'index.ts', [
        'export * from \'./' + Tool._name + '/' + Tool._name + '.component\';',
        'import { ' + Tool._Name + 'Component } from \'./' + Tool._name + '/' + Tool._name + '.component\';',
        '  ' + Tool._Name + 'Component,'
      ]);
    });
  }
}
export { Tool as Component}