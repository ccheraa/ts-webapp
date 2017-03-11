export declare class MenuItemClass {
    id: string;
    text: string;
    icon: string;
    mini: boolean;
    active: boolean;
    constructor();
    constructor(text: string);
    constructor(id: string, text: string);
    constructor(id: string, text: string, icon: string);
    constructor(id: string, text: string, icon: string, active: boolean);
}
