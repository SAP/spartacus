import { Component } from '@angular/core';

@Component({
  template: `<y-store-finder-header></y-store-finder-header>
  <router-outlet></router-outlet>`,
  selector: 'y-store-finder'
})
export class StoreFinderComponent {}
