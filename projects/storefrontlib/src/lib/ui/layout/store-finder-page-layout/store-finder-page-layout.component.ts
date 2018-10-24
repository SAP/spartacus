import { Component } from '@angular/core';
import { SearchQuery } from '../../../store-finder/models/search-query';

@Component({
  selector: 'y-store-finder-page-layout',
  templateUrl: './store-finder-page-layout.component.html',
  styleUrls: ['./store-finder-page-layout.component.scss']
})
export class StoreFinderPageLayoutComponent {
  searchQuery: SearchQuery;
  showMapListComponent: boolean;

  persistSearchQuery(searchQuery: SearchQuery) {
    this.searchQuery = searchQuery;
  }

  showMapList(value: boolean) {
    this.showMapListComponent = value;
  }
}
