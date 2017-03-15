/// <reference types="node" />
export declare function createDir(dirname: string): void;
export declare function deleteDir(dirname: string, callback?: (err: NodeJS.ErrnoException) => void): void;
export declare function writeFile(filename: string, data: any): void;
export declare function appendFile(filename: string, data: any): void;
export declare function deleteFile(filename: string): void;
export declare function removeLine(filename: string, line: string): void;
export declare function removeLines(filename: string, lines: string[]): void;
export declare function addBefore(filename: string, anchor: string, line: string): void;
export declare function addBeforeMulti(filename: string, tags: string[][]): void;
export declare function error(err: NodeJS.ErrnoException | string): void;
export declare function hyphen(name: string): string;
export declare function info(message: string): void;
export declare function replace(filename: any, args: any): void;
export declare function tpl(template: string, data: any): string;
export declare function tplFile(filename: string, data: any): string;
