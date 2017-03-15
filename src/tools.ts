import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as format from 'string-template';
import { join } from 'path';
import { blue, red } from 'chalk';
export function createDir(dirname: string) {
  fs.mkdirSync(dirname);
}
export function deleteDir(dirname: string, callback?: (err: NodeJS.ErrnoException) => void) {
  rimraf(dirname, callback);
}
export function writeFile(filename: string, data: any) {
  fs.writeFileSync(filename, data, 'utf8');
}
export function appendFile(filename: string, data: any) {
  fs.appendFileSync(filename, data, 'utf8');
}
export function deleteFile(filename: string) {
  fs.unlinkSync(filename);
}
export function removeLine(filename: string, line: string) {
  replace(filename, [[new RegExp(line.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '\\r?\\n', 'g'), '']]);
}
export function removeLines(filename: string, lines: string[]) {
  replace(filename,
  lines.map(line => [new RegExp(line.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '\\r?\\n', 'g'), '']));
}
export function addBefore(filename: string, anchor: string, line: string) {
  replace(filename, [
    [new RegExp(line.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '\\r?\\n', 'g'), ''],
    [anchor, line + '\n' + anchor]
  ]);
}
export function addBeforeMulti(filename: string, tags: string[][]) {
  replace(filename, tags.map(tag => [
    [new RegExp(tag[1].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '\\r?\\n', 'g'), ''],
    [tag[0], tag[1] + '\n' + tag[0]]
  ]).reduce((tags, tag) => [].concat(tags, tag)));
}
export function error(err: NodeJS.ErrnoException | string) {
  console.log(red((<NodeJS.ErrnoException>err).message || <string>err));
}
export function hyphen(name: string): string {
  return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
export function info(message: string) {
  console.log(blue(message));
}
export function replace(filename, args) {
  let data = fs.readFileSync(filename, 'utf8');
  args.forEach(arg => {
    // console.log(arg[0].test(data));
    data = data.replace(arg[0], arg[1]);
  });
  fs.writeFileSync(filename, data, 'utf8');
}
export function tpl(template: string, data: any) {
  // console.log(data);
  // console.log(template);
  // console.log(format(template, data));
  return format(template, data);
}
export function tplFile(filename: string, data: any): string {
  return tpl(fs.readFileSync(join(__dirname, '../src/templates/' + filename), 'utf8'), data);
}
