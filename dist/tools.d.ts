/// <reference types="node" />
export declare class Tools {
    static createDir(dirname: string, callback?: (err: NodeJS.ErrnoException) => void): void;
    static deleteDir(dirname: string, callback?: (err: NodeJS.ErrnoException) => void): void;
    static writeFile(filename: string, data: any, callback?: (err: NodeJS.ErrnoException) => void): void;
    static appendFile(filename: string, data: any, callback?: (err: NodeJS.ErrnoException) => void): void;
    static deleteFile(filename: string, callback?: (err: NodeJS.ErrnoException) => void): void;
    static removeLine(filename: string, line: string, callback?: (err: NodeJS.ErrnoException) => void): void;
    static removeLines(filename: string, lines: string[], callback?: (err: NodeJS.ErrnoException) => void): void;
    static addBefore(filename: string, anchor: string, line: string, callback?: (err: NodeJS.ErrnoException) => void): void;
    static addBeforeMulti(filename: string, tags: string[][], callback?: (err: NodeJS.ErrnoException) => void): void;
    static error(err: NodeJS.ErrnoException | string): void;
    static hyphen(name: string): string;
    static info(message: string): void;
    static replace(filename: any, args: any, callback: any): void;
}
