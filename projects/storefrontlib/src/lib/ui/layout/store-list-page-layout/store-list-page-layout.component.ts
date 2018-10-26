import { Component } from '@angular/core';
import { SearchQuery } from '../../../store-finder/models/search-query';

@Component({
  selector: 'y-store-list-page-layout',
  templateUrl: './store-list-page-layout.component.html',
  styleUrls: ['./store-list-page-layout.component.scss']
})
export class StoreListPageLayoutComponent {
  searchQuery: SearchQuery;
  showMapListComponent: boolean;

  constructor() {}

  persistQuery(searchQuery: SearchQuery) {
    this.searchQuery = searchQuery;
  }

  showMapList(value: boolean) {
    this.showMapListComponent = value;
  }
}
