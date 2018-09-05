import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoreFinderService } from '../../services/store-finder.service';

@Component({
  selector: 'y-store-finder-search',
  templateUrl: './store-finder-search.component.html',
  styleUrls: ['./store-finder-search.component.scss']
})
export class StoreFinderSearchComponent {
  @Output() persistQuery: EventEmitter<string> = new EventEmitter<string>();
  searchBox: FormControl = new FormControl();

  constructor(private storeFinderService: StoreFinderService) {}

  findStores(address: string) {
    this.storeFinderService.findStores(address);
    this.persistQuery.emit(address);
  }

  viewAllStores() {
    this.storeFinderService.viewAllStores();
  }

  onKey(event: any) {
    if (event.key === 'Enter') {
      this.findStores(this.searchBox.value);
    }
  }
}
