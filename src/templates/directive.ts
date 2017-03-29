import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[{name}]'
})
export class {Name}Directive implements OnInit {
  constructor(private el: ElementRef) {}
  ngOnInit() {}
}
