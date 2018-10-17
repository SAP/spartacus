import { Component } from '@angular/core';

@Component({
  selector: 'y-store-finder-page-layout',
  templateUrl: './store-finder-page-layout.component.html',
  styleUrls: ['./store-finder-page-layout.component.scss']
})
export class StoreFinderPageLayoutComponent {
  query: string;
  showMapListComponent: boolean;

  persistQuery(query: string) {
    this.query = query;
  }

  showMapList(value: boolean) {
    this.showMapListComponent = value;
  }
}
