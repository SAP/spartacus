import { StoreDataService } from '.';
import { TestBed } from '@angular/core/testing';

const location = {
  formattedDistance: '0 km',
  geoPoint: {
    latitude: 35.528984,
    longitude: 139.700168
  },

  openingHours: {
    code: 'electronics-japan-standard-hours',
    weekDayOpeningList: [
      {
        closingTime: {
          formattedHour: '20:00',
          hour: 8,
          minute: 0
        },
        openingTime: {
          formattedHour: '01:02',
          hour: 1,
          minute: 2
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
          formattedHour: '03:04',
          hour: 3,
          minute: 4
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
          formattedHour: '05:06',
          hour: 5,
          minute: 6
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
          formattedHour: '07:08',
          hour: 7,
          minute: 8
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
          formattedHour: '09:10',
          hour: 9,
          minute: 10
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
          formattedHour: '11:12',
          hour: 11,
          minute: 12
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

describe('StoreDataService', () => {
  let service: StoreDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreDataService]
    });

    service = TestBed.get(StoreDataService);
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
    const tuesday = new Date(2018, 8, 18);
    const wednesday = new Date(2018, 8, 19);
    const thursday = new Date(2018, 8, 20);
    const friday = new Date(2018, 8, 21);
    const saturday = new Date(2018, 8, 22);

    expect(service.getStoreOpeningTime(location, monday).getHours()).toBe(1);
    expect(service.getStoreOpeningTime(location, monday).getMinutes()).toBe(2);

    expect(service.getStoreOpeningTime(location, tuesday).getHours()).toBe(3);
    expect(service.getStoreOpeningTime(location, tuesday).getMinutes()).toBe(4);

    expect(service.getStoreOpeningTime(location, wednesday).getHours()).toBe(5);
    expect(service.getStoreOpeningTime(location, wednesday).getMinutes()).toBe(
      6
    );

    expect(service.getStoreOpeningTime(location, thursday).getHours()).toBe(7);
    expect(service.getStoreOpeningTime(location, thursday).getMinutes()).toBe(
      8
    );

    expect(service.getStoreOpeningTime(location, friday).getHours()).toBe(9);
    expect(service.getStoreOpeningTime(location, friday).getMinutes()).toBe(10);

    expect(service.getStoreOpeningTime(location, saturday).getHours()).toBe(11);
    expect(service.getStoreOpeningTime(location, saturday).getMinutes()).toBe(
      12
    );
  });

  it('should return store closing time', () => {
    const monday = new Date(2018, 8, 17);

    expect(service.getStoreClosingTime(location, monday).getHours()).toBe(20);
    expect(service.getStoreClosingTime(location, monday).getMinutes()).toBe(0);
  });

  it('should not return opening time when store is closed', () => {
    const sunday = new Date(2018, 8, 23);

    expect(service.getStoreOpeningTime(location, sunday)).toBe(null);
  });

  it('should not return closing time when store is closed', () => {
    const sunday = new Date(2018, 8, 23);

    expect(service.getStoreClosingTime(location, sunday)).toBe(null);
  });

  it('should indiacte store as open', () => {
    const saturday = new Date(2018, 8, 22, 14, 0);

    expect(service.isStoreOpen(location, saturday)).toBe(true);
  });

  it('should indiacte store as closed on a closed day', () => {
    const sunday = new Date(2018, 8, 23, 10, 0);

    expect(service.isStoreOpen(location, sunday)).toBe(false);
  });
});
