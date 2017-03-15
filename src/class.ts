let dir = 'src/common/class/';
import { error, hyphen, createDir, writeFile, tplFile, tpl, addBefore, deleteFile, removeLine } from './tools';

let vars: any = { dir }
class Tool {
  static actions(short = true): string[] {
    return short ? ['create (c)', 'remove (r)'] : ['create', 'remove'];
  }
  static do(action: string): (args: string[]) => void {
    switch (action) {
      case 'c':
      case 'create': return Tool.create;
      case 'r':
      case 'remove': return Tool.remove;
      default: error((action ? 'unkown action "' + action + '"' : 'must define an action') + '\navailable actions: ' + Tool.actions().join(', ')); return;
    }
  }
  static init(args: string[]) {
    if (args.length) {
      vars.Name = args[0];
      vars.name = args[1] || hyphen(args[0]);
      return true;
    } else {
      error('use ts-webapp class <' + Tool.actions().join('/') + '> <class name> <filename?>');
      return false;
    }
  }
  public static create(args: string[]) {
    if (!Tool.init(args)) { return; }
    writeFile(
      tpl('{dir}/{name}.class.ts', vars),
      tplFile('class.ts', vars)
    );
    addBefore(tpl('{dir}/index.ts', vars), '/// exports', tpl('export * from \'./{name}.class\';', vars));
  }
  public static remove(args: string[]) {
    if (!Tool.init(args)) { return; }
    deleteFile(tpl('{dir}/{name}.class.ts', vars));
    removeLine(tpl('{dir}/index.ts', vars), tpl('export * from \'./{name}.class\';', vars));
  }
}
export { Tool as Class }
