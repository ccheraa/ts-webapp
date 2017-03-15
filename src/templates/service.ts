import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/rx';

@Injectable()
export class {Name}Service {
  constructor(private http: Http) {}
  dummy(): Observable<any> {
    let subject = new Subject<any>();
    subject.next('data');
    return subject;
  }
}
