export declare type DialogButtonDef = {
    id?: string;
    text?: string;
    icon?: string;
    mini?: boolean;
};
export declare type DialogDef = {
    title?: string;
    message?: string;
    buttons?: (string | DialogButtonDef)[];
    modal?: boolean;
};
export declare class DialogButtonClass {
    private id;
    private text;
    private icon;
    private mini;
    constructor(text: string);
    constructor(id: string, text: string);
    constructor(id: string, text: string, icon: string);
    constructor(id: string, text: string, icon: string, mini: boolean);
}
export declare class DialogClass {
    private title;
    private message;
    buttons: DialogButtonClass[];
    constructor(message: string);
    constructor(title: string, message: string);
    constructor(title: string, message: string, buttons: (string | DialogButtonDef)[]);
}
