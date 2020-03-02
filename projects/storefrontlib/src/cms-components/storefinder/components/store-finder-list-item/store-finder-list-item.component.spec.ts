import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  I18nTestingModule,
  StoreDataService,
  RoutingService,
} from '@spartacus/core';
import { StoreFinderListItemComponent } from './store-finder-list-item.component';

const weekday = {
  closingTime: {
    formattedHour: '20:00',
    hour: 8,
    minute: 0,
  },
  openingTime: {
    formattedHour: '09:00',
    hour: 9,
    minute: 0,
  },
  closed: false,
};

const location = {
  name: 'Test Name',
};

const countryIsoCode = 'CA';

const regionIsoCode = 'CA-QC';

const sampleStore: any = {
  address: {
    country: { isocode: 'JP' },
    line1: 'Sakuragaokacho Shibuya',
    line2: '26-01',
    phone: '+81 5141 3298',
    postalCode: '150-8512',
    town: 'Tokio',
  },
  displayName: 'Tokio Cerulean Tower Tokyu Hotel',
  geoPoint: {
    latitude: 35.656347,
    longitude: 139.69956,
  },
  openingHours: {
    weekDayOpeningList: [
      {
        ...weekday,
        weekDay: 'Mon',
      },
      {
        ...weekday,
        weekDay: 'Tue',
      },
      {
        ...weekday,
        weekDay: 'Wed',
      },
      {
        ...weekday,
        weekDay: 'Thu',
      },
      {
        ...weekday,
        weekDay: 'Fri',
      },
      {
        closingTime: {
          formattedHour: '20:00',
          hour: 8,
          minute: 0,
        },
        openingTime: {
          formattedHour: '10:00',
          hour: 10,
          minute: 0,
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

const mockRoutingService = {
  go: jasmine.createSpy('go'),
};

const mockActivatedRoute = {
  snapshot: {
    params: {},
  },
};

describe('StoreFinderListItemComponent', () => {
  let component: StoreFinderListItemComponent;
  let fixture: ComponentFixture<StoreFinderListItemComponent>;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, I18nTestingModule],
      declarations: [StoreFinderListItemComponent],
      providers: [
        StoreDataService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: RoutingService, useValue: mockRoutingService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    route = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(StoreFinderListItemComponent);
    component = fixture.componentInstance;
    component.location = sampleStore;
    component.locationIndex = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit item index', () => {
    spyOn(component.storeItemClick, 'emit');
    component.handleStoreItemClick();
    fixture.detectChanges();
    expect(component.storeItemClick.emit).toHaveBeenCalledWith(1);
  });

  it('should route when viewStore is called without region', () => {
    route.snapshot.params = {
      country: countryIsoCode,
    };
    fixture.detectChanges();

    component.viewStore(location);

    expect(mockRoutingService.go).toHaveBeenCalledWith([
      `store-finder/country/${countryIsoCode}/${location.name}`,
    ]);
  });

  it('should create store url for route', () => {
    route.snapshot.params = {
      country: countryIsoCode,
      region: regionIsoCode,
    };
    const result = component.prepareRouteUrl(location);

    expect(result).toEqual(
      `store-finder/country/${countryIsoCode}/region/${regionIsoCode}/${location.name}`
    );
  });
});
