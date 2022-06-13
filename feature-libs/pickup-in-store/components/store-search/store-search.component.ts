import { Component, Output, EventEmitter } from '@angular/core';
import { StoreFinderSearchQuery } from '@spartacus/storefinder/core';

@Component({
  selector: 'cx-store-search',
  templateUrl: './store-search.component.html',
  styleUrls: ['./store-search.component.css'],
})
export class StoreSearchComponent {
  @Output() findStores = new EventEmitter<StoreFinderSearchQuery>();

  constructor() {}

  onFindStores(queryText: string): boolean {
    this.findStores.emit({ queryText });
    return false;
  }

  useMyLocation(): void {
    this.findStores.emit({ useMyLocation: true });
  }
}
