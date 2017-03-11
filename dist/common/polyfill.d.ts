declare type findIndexCallback<T> = (value: T, index: number, obj: Array<T>) => boolean;
interface Array<T> {
    findIndex: (callback: findIndexCallback<T>, thisArg?: any) => number;
}
