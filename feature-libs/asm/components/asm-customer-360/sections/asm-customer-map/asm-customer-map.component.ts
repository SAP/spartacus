import { HttpParams } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AsmCustomer360StoreLocation } from '@spartacus/asm/root';
import { PointOfService } from '@spartacus/core';
import {
  StoreFinderSearchPage,
  StoreFinderService,
} from '@spartacus/storefinder/core';
import { Subscription } from 'rxjs';

import { Customer360SectionContext } from '../customer-360-section-context.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-map',
  templateUrl: './asm-customer-map.component.html',
  styleUrls: ['./asm-customer-map.component.scss'],
})
export class AsmCustomerMapComponent implements OnDestroy, OnInit {
  storeData: StoreFinderSearchPage;

  currentLocation: string;

  googleMapsUrl: SafeResourceUrl;

  selectedStore: PointOfService;

  protected subscription = new Subscription();

  constructor(
    protected source: Customer360SectionContext<AsmCustomer360StoreLocation>,
    protected changeDetectorRef: ChangeDetectorRef,
    protected sanitizer: DomSanitizer,
    /** TODO: This belongs in the 'storefinder' module. Should ask if we need to move these to core or some feature design. */
    protected storeFinderService: StoreFinderService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.source.data$.subscribe((data) => {
        this.storeFinderService.findStoresAction(data.address);

        this.storeFinderService
          .getFindStoresEntities()
          .subscribe((data: any) => {
            if (data) {
              this.storeData = data;
              this.selectedStore = data.stores?.[0];
              this.changeDetectorRef.detectChanges();
            }
          });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateGoogleMapsUrl(): void {
    this.subscription.add(
      this.source.config$.subscribe((config) => {
        if (
          config.googleMapsApiKey &&
          this.currentLocation &&
          this.selectedStore.geoPoint
        ) {
          const coordinates = `${this.selectedStore.geoPoint.latitude},${this.selectedStore.geoPoint.longitude}`;

          const params = new HttpParams()
            .append('key', config.googleMapsApiKey)
            .append('origin', this.currentLocation)
            .append('destination', coordinates);

          this.googleMapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.google.com/maps/embed/v1/directions?${params.toString()}`
          );
        }
      })
    );
  }

  selectStore(store: PointOfService): void {
    this.selectedStore = store;

    this.updateGoogleMapsUrl();
  }
}
