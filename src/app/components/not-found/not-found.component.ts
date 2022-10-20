import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
  <div id = "flex">
  <h1>Oops Page not found</h1>
  <p class="zoom-area">The Page you are looking for might have been removed or it is tempararily removed </p>
  <section class="error-container">
    <span class="four"><span class="screen-reader-text">4</span></span>
    <span class="zero"><span class="screen-reader-text">0</span></span>
    <span class="four"><span class="screen-reader-text">4</span></span>
  </section>
  <div class="link-container">
    <span class="more-link" routerLink = "/">TAKE ME HOME</span>
  </div>

  </div>
  `,
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
