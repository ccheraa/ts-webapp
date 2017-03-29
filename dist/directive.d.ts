declare class Tool {
    static actions(short?: boolean): string[];
    static do(action: string): (args: string[]) => void;
    static init(args: string[]): boolean;
    static create(args: string[]): void;
    static remove(args: string[]): void;
}
export { Tool as Directive };
