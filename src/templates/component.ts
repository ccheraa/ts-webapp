import { Component, OnInit } from '@angular/core';
import { NavigatorService } from '@ts-webapp/front';

@Component({
  selector: 'app-{name}',
  templateUrl: './{name}.component.html',
  styleUrls: ['./{name}.component.scss']
})
export class {Name}Component implements OnInit {
  constructor(private nav: NavigatorService) { }
  ngOnInit() {
    this.nav.title('{Name}');
    this.nav.home(false);
    this.nav.menu([]);
  }
}
