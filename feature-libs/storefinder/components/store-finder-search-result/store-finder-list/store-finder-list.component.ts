/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DOCUMENT,
  KeyValuePipe,
  NgClass,
  NgFor,
  NgIf,
  NgSwitch,
  NgSwitchCase,
} from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  Inject,
  inject,
  Input,
  viewChild,
  ViewChild,
} from '@angular/core';
import {
  FeatureToggles,
  PointOfService,
  TranslatePipe,
} from '@spartacus/core';
import { StoreFinderService } from '@spartacus/storefinder/core';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';
import { StoreFinderListItemComponent } from '../../store-finder-list-item/store-finder-list-item.component';
import { StoreFinderMapComponent } from '../../store-finder-map/store-finder-map.component';
import { StoreFinderPaginationDetailsComponent } from '../../store-finder-pagination-details/store-finder-pagination-details.component';
import { StoreFinderStoreDescriptionComponent } from '../../store-finder-store-description/store-finder-store-description.component';
import { LocationDisplayMode } from './store-finder-list.model';

@Component({
  selector: 'cx-store-finder-list',
  templateUrl: './store-finder-list.component.html',
  imports: [
    NgIf,
    StoreFinderPaginationDetailsComponent,
    IconComponent,
    StoreFinderStoreDescriptionComponent,
    NgFor,
    NgClass,
    StoreFinderListItemComponent,
    StoreFinderMapComponent,
    NgSwitch,
    NgSwitchCase,
    KeyValuePipe,
    TranslatePipe,
  ],
})
export class StoreFinderListComponent {
  @Input()
  locations: any;
  @Input()
  useMylocation: boolean;
  @ViewChild('storeMap')
  storeMap: StoreFinderMapComponent;

  selectedStore: PointOfService;
  selectedStoreIndex: number;
  isDetailsModeVisible: boolean;
  storeDetails: PointOfService;
  iconTypes = ICON_TYPE;
  displayModes = LocationDisplayMode;
  activeDisplayMode = LocationDisplayMode.LIST_VIEW;
  readonly backButton = viewChild<ElementRef<HTMLButtonElement>>('backButton');
  private featureToggles = inject(FeatureToggles);

  constructor(
    private storeFinderService: StoreFinderService,
    @Inject(DOCUMENT) private document: any
  ) {
    this.isDetailsModeVisible = false;

    if (this.featureToggles.a11yStoreFinderFocusOnBackButton) {
      // Fires when backButton enters the DOM (signal goes undefined → ElementRef), moving focus to it.
      effect(() => {
        this.backButton()?.nativeElement?.focus();
      });
    }
  }

  centerStoreOnMapByIndex(index: number, location: PointOfService): void {
    this.showStoreDetails(location);
    this.selectedStoreIndex = index;
    this.selectedStore = location;
    this.storeMap.centerMap(
      this.storeFinderService.getStoreLatitude(this.locations.stores[index]),
      this.storeFinderService.getStoreLongitude(this.locations.stores[index])
    );
  }

  selectStoreItemList(index: number): void {
    this.selectedStoreIndex = index;
    const storeListItem = this.document.getElementById('item-' + index);
    storeListItem.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }

  showStoreDetails(location: PointOfService) {
    this.isDetailsModeVisible = true;
    this.storeDetails = location;
  }

  hideStoreDetails() {
    this.isDetailsModeVisible = false;
    this.selectedStoreIndex = undefined;
    this.selectedStore = undefined;
    this.storeMap.renderMap();
  }

  setDisplayMode(mode: LocationDisplayMode): void {
    this.activeDisplayMode = mode;
  }

  isDisplayModeActive(mode: LocationDisplayMode): boolean {
    return this.activeDisplayMode === mode;
  }
}
