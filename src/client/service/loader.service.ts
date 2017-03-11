import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/rx';

import { Loader } from '../db';

@Injectable()
export class LoaderService implements Loader {
  private loading: { action: string, cb: Function}[] = [];
  public result: Subject<boolean> = new Subject<boolean>();
  load(action: string, cb?: Function): Observable<boolean> {
    console.log('loading: ' + action + '...');
    if (this.loading.findIndex(loading => loading.action === action) < 0) {
      this.loading.push({
        action,
        cb: cb
      });
    }
    return this.check();
  }
  unload(action: string): Observable<boolean> {
    console.log('unloading: ' + action + '...');
    let found = this.loading.findIndex(loading => loading.action === action);
    if (found > -1) {
      if (this.loading[found].cb) {
        this.loading[found].cb();
      }
      this.loading.splice(found, 1);
    }
    return this.check();
  }
  check(): Observable<boolean>  {
    this.result.next(this.loading.length > 0);
    return this.result;
  }
}
