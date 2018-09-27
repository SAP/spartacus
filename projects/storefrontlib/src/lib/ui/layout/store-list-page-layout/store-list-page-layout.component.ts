import { Component } from '@angular/core';

@Component({
  selector: 'y-store-list-page-layout',
  templateUrl: './store-list-page-layout.component.html',
  styleUrls: ['./store-list-page-layout.component.scss']
})
export class StoreListPageLayoutComponent {
  query: string;
  showMapListComponent: boolean;

  constructor() {}
}
