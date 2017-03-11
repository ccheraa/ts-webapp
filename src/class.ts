let dir = 'src/common/class/';
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
      Tools.error('use ts-webapp class <' + Tool.actions().join('/') + '> <class name> <filename?>');
      return false;
    }
  }
  public static create(args: string[]) {
    if (!Tool.init(args)) { return; }
    let file =
`export class ${Tool._Name}Class {
  id: string;
}
`;
    Tools.writeFile(dir + Tool._name + '.class.ts', file, function (err) {
      if (err) {
        return Tools.error(err);
      };
      Tools.addBefore(dir + 'index.ts', '/// exports', 'export * from \'./' + Tool._name + '.class\';', () => {});
    });
  }
  public static remove(args: string[]) {
    if (!Tool.init(args)) { return; }
    Tools.deleteFile(dir + Tool._name + '.class.ts', () => {
      Tools.removeLine(dir + 'index.ts', 'export * from \'./' + Tool._name + '.class\';');
    });
  }
}
export { Tool as Class}