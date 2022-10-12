import { HttpParams } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AsmCustomer360StoreLocation, Customer360SectionConfig, Customer360SectionData } from '@spartacus/asm/root';
import { PointOfService } from '@spartacus/core';
import {
  StoreFinderSearchPage,
  StoreFinderService,
} from '@spartacus/storefinder/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-map',
  templateUrl: './asm-customer-map.component.html',
  styleUrls: ['./asm-customer-map.component.scss'],
})
export class AsmCustomerMapComponent implements OnInit {
  storeData: StoreFinderSearchPage;

  readonly apiKey: string | undefined;

  currentLocation: string;

  googleMapsUrl: SafeResourceUrl;

  selectedStore: PointOfService;

  constructor(
    public config: Customer360SectionConfig,
    protected data: Customer360SectionData<AsmCustomer360StoreLocation>,
    protected changeDetectorRef: ChangeDetectorRef,
    protected sanitizer: DomSanitizer,
    /** TODO: This belongs in the 'storefinder' module. Should ask if we need to move these to core or some feature design. */
    protected storeFinderService: StoreFinderService
  ) {
    this.apiKey = config.googleMapsApiKey;
  }

  ngOnInit(): void {
    this.storeFinderService.findStoresAction(this.data.data.address);

    this.storeFinderService.getFindStoresEntities().subscribe((data: any) => {
      if (data) {
        this.storeData = data;
        this.selectedStore = data.stores?.[0];
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  updateGoogleMapsUrl(): void {
    if (this.apiKey && this.currentLocation && this.selectedStore.geoPoint) {
      const coordinates = `${this.selectedStore.geoPoint.latitude},${this.selectedStore.geoPoint.longitude}`;

      const params = new HttpParams()
        .append('key', this.apiKey)
        .append('origin', this.currentLocation)
        .append('destination', coordinates);

      this.googleMapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.google.com/maps/embed/v1/directions?${params.toString()}`
      );
    }
  }

  selectStore(store: PointOfService): void {
    this.selectedStore = store;

    this.updateGoogleMapsUrl();
  }
}
