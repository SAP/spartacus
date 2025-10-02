/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeoPoint } from '@spartacus/core';
import { StoreFinderService } from '@spartacus/storefinder/core';
import { Observable } from 'rxjs';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { StoreFinderListItemComponent } from '../store-finder-list-item/store-finder-list-item.component';
import { SpinnerComponent } from '../../../../projects/storefrontlib/shared/components/spinner/spinner.component';
import { TranslatePipe } from '../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
  selector: 'cx-store-finder-grid',
  templateUrl: './store-finder-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    StoreFinderListItemComponent,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
    MockTranslatePipe,
  ],
})
export class StoreFinderGridComponent implements OnInit {
  defaultLocation: GeoPoint;
  country: string;
  region: string;
  locations$: any;
  isLoading$: Observable<boolean>;

  constructor(
    private storeFinderService: StoreFinderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading$ = this.storeFinderService.getStoresLoading();
    this.locations$ = this.storeFinderService.getFindStoresEntities();
    this.defaultLocation = {};
    this.findStores();
  }

  protected findStores(): void {
    if (this.route.snapshot.params.country) {
      this.storeFinderService.callFindStoresAction(this.route.snapshot.params);
    }
  }
}
