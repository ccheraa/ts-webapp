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
      vars.index = tpl('{dir}/index.ts', vars);
      vars.dir = tpl('{dir}/{name}', vars);
      vars.ts = tpl('{dir}/{name}.component.ts', vars);
      vars.html = tpl('{dir}/{name}.component.html', vars);
      vars.scss = tpl('{dir}/{name}.component.scss', vars);
      vars.exports = tpl('export * from \'./{name}/{name}.component\';', vars);
      vars.imports = tpl('import { {Name}Component } from \'./{name}/{name}.component\';', vars);
      vars.components = tpl('  {Name}Component,', vars);
      return true;
    } else {
      error('use ts-webapp component <' + Tool.actions().join('/') + '> <component name> <filename?>');
      return false;
    }
  }
  public static create(args: string[]) {
    if (!Tool.init(args)) { return; }
    createDir(vars.dir);
    writeFile(vars.ts, tplFile('component.ts', vars));
    writeFile(vars.html, tplFile('component.html', vars));
    writeFile(vars.scss, tplFile('component.scss', vars));
    addBeforeMulti(vars.index, [
      ['/// exports', vars.exports],
      ['/// imports', vars.imports],
      ['/// components', vars.components]
    ]);
  }
  public static remove(args: string[]) {
    if (!Tool.init(args)) { return; }
    deleteDir(dir + '/' + vars.name, (err) => {
      if (err) { return error(err); };
      removeLines(tpl('{dir}/index.ts', vars), [vars.exports, vars.imports, vars.components]);
    });
  }
}
export { Tool as Component }
