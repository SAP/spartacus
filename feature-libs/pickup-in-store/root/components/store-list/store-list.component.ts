import { Component, OnInit } from '@angular/core';
import { StoreEntities, StoreFinderService } from '@spartacus/storefinder/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-store-list',
  templateUrl: 'store-list.component.html',
})
export class StoreListComponent implements OnInit {
  isLoading$: Observable<boolean>;
  locations$: Observable<StoreEntities>;

  constructor(private storeFinderService: StoreFinderService) {}

  ngOnInit() {
    this.locations$ = this.storeFinderService.getFindStoresEntities();
    this.isLoading$ = this.storeFinderService.getStoresLoading();

    this.storeFinderService.findStoresAction(
      '',
      {},
      undefined,
      undefined,
      true,
      50000
    );
  }
}
