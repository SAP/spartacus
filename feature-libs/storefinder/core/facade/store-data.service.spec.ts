import { TestBed } from '@angular/core/testing';
import { StoreDataService } from './store-data.service';
import { PointOfService } from '@spartacus/core';

const location: PointOfService = {
  geoPoint: {
    latitude: 35.528984,
    longitude: 139.700168,
  },

  openingHours: {
    code: 'electronics-japan-standard-hours',
    weekDayOpeningList: [
      {
        closingTime: {
          formattedHour: '20:00',
          hour: 8,
          minute: 0,
        },
        openingTime: {
          formattedHour: '01:02',
          hour: 1,
          minute: 2,
        },
        closed: false,
        weekDay: 'Mon',
      },
      {
        closingTime: {
          formattedHour: '20:00',
          hour: 8,
          minute: 0,
        },
        openingTime: {
          formattedHour: '03:04',
          hour: 3,
          minute: 4,
        },
        closed: false,
        weekDay: 'Tue',
      },
      {
        closingTime: {
          formattedHour: '20:00',
          hour: 8,
          minute: 0,
        },
        openingTime: {
          formattedHour: '05:06',
          hour: 5,
          minute: 6,
        },
        closed: false,
        weekDay: 'Wed',
      },
      {
        closingTime: {
          formattedHour: '20:00',
          hour: 8,
          minute: 0,
        },
        openingTime: {
          formattedHour: '07:08',
          hour: 7,
          minute: 8,
        },
        closed: false,
        weekDay: 'Thu',
      },
      {
        closingTime: {
          formattedHour: '20:00',
          hour: 8,
          minute: 0,
        },
        openingTime: {
          formattedHour: '09:10',
          hour: 9,
          minute: 10,
        },
        closed: false,
        weekDay: 'Fri',
      },
      {
        closingTime: {
          formattedHour: '20:00',
          hour: 8,
          minute: 0,
        },
        openingTime: {
          formattedHour: '11:12',
          hour: 11,
          minute: 12,
        },
        closed: false,
        weekDay: 'Sat',
      },
      {
        closed: true,
        weekDay: 'Sun',
      },
    ],
  },
};

describe('StoreDataService', () => {
  let service: StoreDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreDataService],
    });

    service = TestBed.inject(StoreDataService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should return store latitude', () => {
    expect(service.getStoreLatitude(location)).toBe(35.528984);
  });

  it('should return store longitude', () => {
    expect(service.getStoreLongitude(location)).toBe(139.700168);
  });

  it('should return store opening time', () => {
    const monday = new Date(2018, 8, 17);

    expect(service.getStoreOpeningTime(location, monday)).toBe('01:02');
  });

  it('should return store closing time', () => {
    const monday = new Date(2018, 8, 17);

    expect(service.getStoreClosingTime(location, monday)).toBe('20:00');
  });

  it('should not return opening time when store is closed', () => {
    const sunday = new Date(2018, 8, 23);

    expect(service.getStoreOpeningTime(location, sunday)).toBe('closed');
  });

  it('should not return closing time when store is closed', () => {
    const sunday = new Date(2018, 8, 23);

    expect(service.getStoreClosingTime(location, sunday)).toBe('closed');
  });
});
