let dir = 'src/client/app/component/';
import { error, hyphen, createDir, writeFile, tplFile, tpl, addBeforeMulti, deleteDir, removeLines } from './tools';

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
      error('use ts-webapp component <' + Tool.actions().join('/') + '> <component name> <filename?>');
      return false;
    }
  }
  public static create(args: string[]) {
    if (!Tool.init(args)) { return; }
    createDir(tpl('{dir}/{name}', vars));
    writeFile(
      tpl('{dir}/{name}/{name}.component.ts', vars),
      tplFile('component.ts', vars)
    );
    writeFile(
      tpl('{dir}/{name}/{name}.component.html', vars),
      tplFile('component.html', vars)
    );
    writeFile(
      tpl('{dir}/{name}/{name}.component.scss', vars),
      tplFile('component.scss', vars)
    );
    addBeforeMulti(tpl('{dir}/index.ts', vars), [
      ['/// exports', 
      tpl('export * from \'./{name}/{name}.component\';', vars)],
      ['/// imports', tpl('import { {Name}Component } from \'./{name}/{name}.component\';', vars)],
      ['/// components', tpl('  {Name}Component,', vars)]
    ]);
  }
  public static remove(args: string[]) {
    if (!Tool.init(args)) { return; }
    deleteDir(dir + '/' + vars.name, (err) => {
      if (err) { return error(err); };
      removeLines(tpl('{dir}/index.ts', vars), [
        tpl('export * from \'./{name}/{name}.component\';', vars),
        tpl('import { {Name}Component } from \'./{name}/{name}.component\';', vars),
        tpl('  {Name}Component,', vars)
      ]);
    });
  }
}
export { Tool as Component }
