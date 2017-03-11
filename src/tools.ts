import * as fs from 'fs';
import * as rimraf from 'rimraf';
import { blue, red } from 'chalk';
export class Tools {
  public static createDir(dirname: string, callback?: (err: NodeJS.ErrnoException) => void) {
    fs.mkdir(dirname, callback);
  }
  public static deleteDir(dirname: string, callback?: (err: NodeJS.ErrnoException) => void) {
    rimraf(dirname, callback);
  }
  public static writeFile(filename: string, data: any, callback?: (err: NodeJS.ErrnoException) => void) {
    fs.writeFile(filename, data, 'utf8', callback);
  }
  public static appendFile(filename: string, data: any, callback?: (err: NodeJS.ErrnoException) => void) {
    fs.appendFile(filename, data, 'utf8', callback);
  }
  public static deleteFile(filename: string, callback?: (err: NodeJS.ErrnoException) => void) {
    fs.unlink(filename, callback);
  }
  public static removeLine(filename: string, line: string, callback?: (err: NodeJS.ErrnoException) => void) {
    Tools.replace(filename, [[new RegExp(line.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '\\r?\\n', 'g'), '']], callback);
  }
  public static removeLines(filename: string, lines: string[], callback?: (err: NodeJS.ErrnoException) => void) {
    Tools.replace(filename,
    lines.map(line => [new RegExp(line.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '\\r?\\n', 'g'), '']),
    callback);
  }
  public static addBefore(filename: string, anchor: string, line: string, callback?: (err: NodeJS.ErrnoException) => void) {
    Tools.replace(filename, [
      [new RegExp(line.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '\\r?\\n', 'g'), ''],
      [anchor, line + '\n' + anchor]
    ], () => {});
  }
  public static addBeforeMulti(filename: string, tags: string[][], callback?: (err: NodeJS.ErrnoException) => void) {
    Tools.replace(filename, tags.map(tag => [
      [new RegExp(tag[1].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '\\r?\\n', 'g'), ''],
      [tag[0], tag[1] + '\n' + tag[0]]
    ]).reduce((tags, tag) => [].concat(tags, tag)),
    () => {});
  }
  public static error(err: NodeJS.ErrnoException | string) {
    console.log(red((<NodeJS.ErrnoException>err).message || <string>err));
  }
  public static hyphen(name: string): string {
    return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }
  public static info(message: string) {
    console.log(blue(message));
  }
  public static replace(filename, args, callback) {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        return Tools.error(err);
      }
      args.forEach(arg => {
        // console.log(arg[0].test(data));
        data = data.replace(arg[0], arg[1]);
      });
      fs.writeFile(filename, data, 'utf8', (err) => {
        if (err) {
          return Tools.error(err);
        }
        callback && callback();
      });
    });
  }
}