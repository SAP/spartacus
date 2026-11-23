/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  inject,
  output,
} from '@angular/core';
import { GoogleMapRendererService } from '@spartacus/storefinder/core';

@Component({
  selector: 'cx-store-finder-map',
  templateUrl: './store-finder-map.component.html',
})
export class StoreFinderMapComponent implements OnChanges {
  private googleMapRendererService = inject(GoogleMapRendererService);

  // TODO: Skipped for migration because:
  //  Your application code writes to the query. This prevents migration.
  @ViewChild('mapElement', { static: true })
  mapElement: ElementRef;
  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  locations: any[];
  readonly selectedStoreItem = output<number>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.locations && this.locations) {
      this.renderMap();
    }
  }

  /**
   * Sets the center of the map to the given location
   * @param latitude latitude of the new center
   * @param longitude longitude of the new center
   */
  centerMap(latitude: number, longitude: number): void {
    this.googleMapRendererService.centerMap(latitude, longitude);
  }

  renderMap(): void {
    this.googleMapRendererService.renderMap(
      this.mapElement.nativeElement,
      this.locations,
      (markerIndex) => {
        this.selectStoreItemClickHandle(markerIndex);
      }
    );
  }

  private selectStoreItemClickHandle(markerIndex: number) {
    this.selectedStoreItem.emit(markerIndex);
  }
}
