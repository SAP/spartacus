import { Component } from '@angular/core';
import { SearchQuery } from '../../../store-finder/models/searchQuery';

@Component({
  selector: 'y-store-list-page-layout',
  templateUrl: './store-list-page-layout.component.html',
  styleUrls: ['./store-list-page-layout.component.scss']
})
export class StoreListPageLayoutComponent {
  query: SearchQuery;
  showMapListComponent: boolean;

  constructor() {}

  persistQuery(query: SearchQuery) {
    this.query = query;
  }

  showMapList(value: boolean) {
    this.showMapListComponent = value;
  }
}
