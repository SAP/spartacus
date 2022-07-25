import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { MapData, StoreData } from './map-types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-prototype',
  templateUrl: './prototype.component.html',
  styleUrls: ['./prototype.component.scss'],
})
export class PrototypeComponent implements OnInit {
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

  selectedStore: StoreData;

  get encodedStoreLocation(): string {
    return encodeURIComponent(this.selectedStore.line1);
  }

  get googleMapsUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps/embed/v1/place?key=AIzaSyAEwnpFNr0duKCE0DClFE7RRJJ9zUmJ8u8&q=${ this.encodedStoreLocation }&center=${this.selectedStore.latitude},${this.selectedStore.longitude}&zoom=10`
    );
  }

  constructor(protected sanitizer: DomSanitizer) {
    this.selectedStore = this.storeData.data[0];
  }

  ngOnInit(): void {
  }

}
