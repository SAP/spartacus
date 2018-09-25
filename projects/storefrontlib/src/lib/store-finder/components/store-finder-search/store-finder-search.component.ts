import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoreFinderService } from '../../services/store-finder.service';

@Component({
  selector: 'y-store-finder-search',
  templateUrl: './store-finder-search.component.html',
  styleUrls: ['./store-finder-search.component.scss']
})
export class StoreFinderSearchComponent {
  @Output()
  persistQuery: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  showMapList: EventEmitter<boolean> = new EventEmitter<boolean>();
  searchBox: FormControl = new FormControl();

  constructor(private storeFinderService: StoreFinderService) {}

  findStores(address: string) {
    this.storeFinderService.findStores(address);
    this.persistQuery.emit(address);
    this.showMapList.emit(true);
  }

  viewAllStores() {
    this.storeFinderService.viewAllStores();
    this.showMapList.emit(false);
  }

  onKey(event: any) {
    if (event.key === 'Enter') {
      this.findStores(this.searchBox.value);
    }
  }
}
