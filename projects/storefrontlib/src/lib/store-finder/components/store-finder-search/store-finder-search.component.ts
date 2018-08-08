import { Component, OnInit } from '@angular/core';
import {FindStoresService} from '../../services';

@Component({
  selector: 'y-store-finder-search',
  templateUrl: './store-finder-search.component.html',
  styleUrls: ['./store-finder-search.component.scss']
})
export class StoreFinderSearchComponent implements OnInit {

  constructor(private findStoresService: FindStoresService) { }

  ngOnInit() {
  }

  findStores(address: string) {
    this.findStoresService.findStores(address);
  }

}
