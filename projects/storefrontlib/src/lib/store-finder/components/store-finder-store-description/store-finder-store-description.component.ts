import { Component, OnInit, Input } from '@angular/core';
import { AbstractStoreItemComponent } from '../abstract-store-item/abstract-store-item.component';
import { StoreDataService } from '../../services';

const loc = {
  address: {
    country: {
      isocode: 'JP'
    },
    line1: 'Horikawa-Cho',
    line2: '26330',
    phone: '+81 2783 5395',
    postalCode: '212-0013',
    town: 'Kawasaki'
  },
  displayName: 'Kawasaki Mets Kawasaki Hotel',
  geoPoint: {
    latitude: 35.531106,
    longitude: 139.696071
  },
  name: 'Kawasaki Mets Kawasaki Hotel',
  openingHours: {
    weekDayOpeningList: [
      {
        closingTime: {
          formattedHour: '20:00',
          hour: 8,
          minute: 0
        },
        openingTime: {
          formattedHour: '09:00',
          hour: 9,
          minute: 0
        },
        closed: false,
        weekDay: 'Mon'
      },
      {
        closingTime: {
          formattedHour: '20:00',
          hour: 8,
          minute: 0
        },
        openingTime: {
          formattedHour: '09:00',
          hour: 9,
          minute: 0
        },
        closed: false,
        weekDay: 'Tue'
      },
      {
        closingTime: {
          formattedHour: '20:00',
          hour: 8,
          minute: 0
        },
        openingTime: {
          formattedHour: '09:00',
          hour: 9,
          minute: 0
        },
        closed: false,
        weekDay: 'Wed'
      },
      {
        closingTime: {
          formattedHour: '20:00',
          hour: 8,
          minute: 0
        },
        openingTime: {
          formattedHour: '09:00',
          hour: 9,
          minute: 0
        },
        closed: false,
        weekDay: 'Thu'
      },
      {
        closingTime: {
          formattedHour: '20:00',
          hour: 8,
          minute: 0
        },
        openingTime: {
          formattedHour: '09:00',
          hour: 9,
          minute: 0
        },
        closed: false,
        weekDay: 'Fri'
      },
      {
        closingTime: {
          formattedHour: '20:00',
          hour: 8,
          minute: 0
        },
        openingTime: {
          formattedHour: '10:00',
          hour: 10,
          minute: 0
        },
        closed: false,
        weekDay: 'Sat'
      },
      {
        closed: true,
        weekDay: 'Sun'
      }
    ]
  }
};

@Component({
  selector: 'y-store-finder-store-description',
  templateUrl: './store-finder-store-description.component.html',
  styleUrls: ['./store-finder-store-description.component.css']
})
export class StoreFinderStoreDescriptionComponent extends AbstractStoreItemComponent {
  // @Input()
  location: any = loc;

  constructor(protected storeDataService: StoreDataService) {
    super(storeDataService);
  }
}
