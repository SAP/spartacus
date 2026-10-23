/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeoPoint, TranslatePipe } from '@spartacus/core';
import { StoreFinderService } from '@spartacus/storefinder/core';
import { SpinnerComponent } from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { StoreFinderListItemComponent } from '../store-finder-list-item/store-finder-list-item.component';

@Component({
  selector: 'cx-store-finder-grid',
  templateUrl: './store-finder-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    StoreFinderListItemComponent,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe
],
})
export class StoreFinderGridComponent implements OnInit {
  defaultLocation: GeoPoint;
  country: string;
  region: string;
  locations$: Observable<any> = this.storeFinderService.getFindStoresEntities();
  isLoading$: Observable<boolean> = this.storeFinderService.getStoresLoading();;
  pageState$ = combineLatest({
    isLoading: this.isLoading$,
    locations: this.locations$
  });

  constructor(
    private storeFinderService: StoreFinderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.defaultLocation = {};
    this.findStores();
  }

  protected findStores(): void {
    if (this.route.snapshot.params.country) {
      this.storeFinderService.callFindStoresAction(this.route.snapshot.params);
    }
  }
}
