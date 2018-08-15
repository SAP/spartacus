import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FindStoresService } from '../../services';

@Component({
  selector: 'y-store-finder-search',
  templateUrl: './store-finder-search.component.html',
  styleUrls: ['./store-finder-search.component.scss']
})
export class StoreFinderSearchComponent implements OnInit {
  @Output() persistQuery: EventEmitter<string> = new EventEmitter<string>();
  searchBox: FormControl = new FormControl();

  constructor(private findStoresService: FindStoresService) {}

  ngOnInit() {}

  findStores(address: string) {
    this.findStoresService.findStores(address);
    this.persistQuery.emit(address);
  }

  onKey(event: any) {
    if (event.key === 'Enter') {
      this.findStores(this.searchBox.value);
    }
  }
}
