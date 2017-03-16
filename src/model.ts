let dirCommon = 'src/common/db/';
let fileFront = 'src/client/app/db/index.ts';
let fileBack = 'src/server/db.ts';
import { error, hyphen, createDir, writeFile, tplFile, tpl, addBeforeMulti, addBefore, deleteFile, removeLines, removeLine } from './tools';

let vars: any = { dirCommon, fileFront, fileBack }
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
      if (args[1]) {
        if ((args[1] === 'true') || (args[1] === 'false')) {
          vars.name = hyphen(args[0]);
          vars.auth = args[1] === 'true' ? 'Auth' : '';
        } else {
          vars.name = args[1];
          vars.auth = args[2] === 'true' ? 'Auth' : '';
        }
      } else {
        vars.name = hyphen(args[0]);
        vars.auth = '';
      }
      // console.log(vars);
      return true;
    } else {
      error('use ts-webapp model <' + Tool.actions().join('/') + '> <model name> <filename?> <authentication model (true/false)?>');
      return false;
    }
  }
  public static create(args: string[]) {
    if (!Tool.init(args)) { return; }
    writeFile(
      tpl('{dirCommon}/{name}.def.ts', vars),
      tplFile('model.def.ts', vars)
    );
    addBefore(tpl('{dirCommon}/index.ts', vars), '/// definitions', tpl('export * from \'./{name}.def\';', vars));
    addBeforeMulti(vars.fileBack, [
      ['/// imports', tpl('  {Name}ModelScheme, {Name}ModelDefinition,', vars)],
      ['/// exports', tpl('export const {Name}Model = new {auth}Model<{Name}ModelDefinition>(\'{Name}\', {Name}ModelScheme);', vars)]
    ]);
    addBeforeMulti(vars.fileFront, [
      ['/// imports', tpl('  {Name}ModelDefinition, {Name}ModelUrl,', vars)],
      ['/// exports', tplFile('model.front.ts', vars)],
      ['/// models', tpl('  {Name}Model,', vars)]
    ]);
  }
  public static remove(args: string[]) {
    if (!Tool.init(args)) { return; }
    deleteFile(tpl('{dirCommon}/{name}.def.ts', vars));
    removeLine(tpl('{dirCommon}/index.ts', vars), tpl('export * from \'./{name}.def\';', vars));
    removeLines(vars.fileBack, [
      tpl('  {Name}ModelScheme, {Name}ModelDefinition,', vars),
      tpl('export const {Name}Model = new {auth}Model<{Name}ModelDefinition>(\'{Name}\', {Name}ModelScheme);', vars),
      tpl('export const {Name}Model = new Model<{Name}ModelDefinition>(\'{Name}\', {Name}ModelScheme);', vars)
    ]);
    removeLines(vars.fileFront, [
      tpl('  {Name}ModelDefinition, {Name}ModelUrl,', vars),
      tplFile('model.front.ts', vars),
      tpl('  {Name}Model,', vars)
    ]);
  }
}
export { Tool as Model }
