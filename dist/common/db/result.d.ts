export interface Multi<T> {
    total: number;
    rows: T[];
}
export interface ResponseType {
    ok: boolean;
    data?: any;
    errors?: any;
}
