import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FindStoresService } from '../../../store-finder/services/store-finder.service';

@Component({
  selector: 'y-store-finder-page-layout',
  templateUrl: './store-finder-page-layout.component.html',
  styleUrls: ['./store-finder-page-layout.component.scss']
})
export class StoreFinderPageLayoutComponent implements OnInit {
  storeFinder = new FormControl('');

  constructor(private findStoresService: FindStoresService) {}

  ngOnInit() {}

  findStores(address: string) {
    this.findStoresService.findStores(address);
  }
}
