import { Response } from 'express';
// import { Response } from 'express';

export interface Multi<T> {
  total: number;
  rows: T[];
};
export interface ResponseType {
  ok: boolean;
  data?: any;
  errors?: any;
};
// export function encodeResponse(data?: any): ResponseType {
//   return { ok: true, data};
// }
// export function encodeErrorResponse(errors: any[]): ResponseType {
//   return { ok: false, errors};
// }
// export function sendResponse(res: Response, data: any) {
//   res.json(encodeResponse(data));
//   console.log('response sent!', data);
// }
// export function sendErrorResponse(res: Response, errors?: any[]) {
//   res.json(encodeErrorResponse(errors));
// }

// export type NumberResultType = ResultType & {
//   data: number;
// };
// export type OneResultType<T> = ResultType & {
//   data: T;
// };
// export type MultiResultType<T> = ResultType & {
//   count: number;
//   data: T[];
// };

// /* ok & count: not finished
// export function Result<T>(data: T): { ok: boolean, data: T | T[], count?: number };
// export function Result<T>(data: T, ok: boolean): { ok: boolean, data: T | T[], count?: number };
// export function Result<T>(data: T[], count: number): { ok: boolean, data: T | T[], count?: number };
// export function Result<T>(data: T | T[], other?: number | boolean): { ok: boolean, data: T | T[], count?: number } {
//   let ok: boolean, count: number;
//   if (typeof other === 'number') {
//     ok = true;
//     count = other;
//   } else if (typeof other === 'boolean') {
//     ok = other;
//   } else {
//     ok = true;
//   }
//   return {ok, data, count};
// }*/