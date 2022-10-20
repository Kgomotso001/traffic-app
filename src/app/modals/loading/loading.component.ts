import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
  <div id = "flex">
  <p>Saving order details, payment will be initiated soon</p>
  <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </div>

  `,
  styles: ['#flex { display: flex; flex-direction: column; align-items: center;justify-content : center; padding : 10px} p{ font-weight : bold}']
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
