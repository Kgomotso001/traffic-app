import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  template: `
  <router-outlet></router-outlet>

  `,
  styles: [
  ]
})
export class WrapperComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
