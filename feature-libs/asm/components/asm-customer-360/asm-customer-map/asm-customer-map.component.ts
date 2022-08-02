import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { MapData, StoreData } from './map-types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-map',
  templateUrl: './asm-customer-map.component.html',
  styleUrls: ['./asm-customer-map.component.scss']
})
export class AsmCustomerMapComponent implements OnInit {
  storeData: MapData = {
    total: 3,
    data: [
      {
        id: '1',
        name: 'Boston',
        displayName: 'Boston',
        line1: '53 State St, Boston, MA 02109',
        line2: 'Floor 16',
        town: 'Boston',
        formattedDistance: '2 miles',
        latitude: 42.358856201171875,
        longitude: -71.05696868896484,
        image: 'https://s36700.pcdn.co/wp-content/uploads/2015/05/dachshund-puppies-03.jpg.optimal.jpg',
        productcode: 'productcode 1',
        openings: {
          'Mon - Sat': '09:00 - 20:00',
          'Sun': '09:00 - 17:00',
        },
        features: [
          'Wheelchair accessible',
        ],
      },
      {
        id: '2',
        name: 'Burlington',
        displayName: 'Burlington',
        line1: '15 Wayside Rd, Burlington, MA 01803',
        line2: '',
        town: 'Burlington',
        formattedDistance: '5 miles',
        latitude: 42.485267639160156,
        longitude: -71.19204711914062,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWApY7vpCoiyrYKL1FUsfNDwYUSNPTG5TZlQ&usqp=CAU',
        productcode: 'productcode 2',
        openings: {
          'Mon - Sat': '09:00 - 20:00',
          'Sun': '09:00 - 17:00',
        },
        features: [
          'Wheelchair accessible',
        ],
      },
      {
        id: '3',
        name: 'Palo Alto',
        displayName: 'Palo Alto',
        line1: '3410 Hillview Avenue, Palo Alto, CA 94304, USA',
        line2: '',
        town: 'Palo Alto',
        formattedDistance: '200 miles',
        latitude: 37.4443293,
        longitude: -122.1598465,
        image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retreiver-puppy-appears-on-nbc-news-today-show-on-news-photo-164288748-1551895571.jpg?crop=0.85948xw:1xh;center,top&resize=480:*',
        productcode: 'productcode 3',
        openings: {
          'Mon - Sat': '09:00 - 20:00',
          'Sun': '09:00 - 17:00',
        },
        features: [
          'Wheelchair accessible',
          'Taco Tuesday',
        ],
      },
    ],
  };

  currentLocation: string;

  googleMapsUrl: SafeResourceUrl;

  selectedStore: StoreData;

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected sanitizer: DomSanitizer
  ) {
    this.selectedStore = this.storeData.data[0];
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(position => {
      this.currentLocation = `${position.coords.latitude},${position.coords.longitude}`;

      this.updateGoogleMapsUrl();

      this.changeDetectorRef.detectChanges();
    });
  }

  updateGoogleMapsUrl(): void {
    if (this.currentLocation) {
      const coordinates = `${this.selectedStore.latitude},${this.selectedStore.longitude}`;

      const params = new HttpParams()
        .append('key', 'AIzaSyAEwnpFNr0duKCE0DClFE7RRJJ9zUmJ8u8')
        .append('origin', this.currentLocation)
        .append('destination', coordinates);

      this.googleMapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.google.com/maps/embed/v1/directions?${params.toString()}`
      );
    }
  }

  selectStore(store: StoreData): void {
    this.selectedStore = store;

    this.updateGoogleMapsUrl();
  }
}
