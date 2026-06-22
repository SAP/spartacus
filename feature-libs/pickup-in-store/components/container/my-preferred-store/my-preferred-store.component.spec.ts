import { CommonModule } from '@angular/common';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CmsConfig,
  CmsService,
  ConfigModule,
  I18nTestingModule,
  Page,
  PointOfService,
  RoutingService,
} from '@spartacus/core';
import { StoreModule } from '@spartacus/pickup-in-store/components';
import {
  PickupLocationsSearchFacade,
  PreferredStoreFacade,
} from '@spartacus/pickup-in-store/root';
import { StoreLocationService } from '@spartacus/storefinder/core';
import { StoreFinderFacade } from '@spartacus/storefinder/root';
import { CardModule, IconTestingModule } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { MockPickupLocationsSearchService } from '../../../core/facade/pickup-locations-search.service.spec';
import { MockPreferredStoreService } from '../../../core/services/preferred-store.service.spec';
import { MyPreferredStoreComponent } from './my-preferred-store.component';

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of({ pageId: 'storefinderPage' });
  }
  refreshLatestPage() {}
  refreshPageById() {}
  refreshComponent() {}
}

export class MockStoreLocationService implements Partial<StoreLocationService> {
  getStoreLatitude(): number {
    return 1;
  }

  getStoreLongitude(): number {
    return 1;
  }

  getDirections(): string {
    const google_map_url = 'https://www.google.com/maps/dir/Current+Location/';
    const latitude = this.getStoreLatitude();
    const longitude = this.getStoreLongitude();
    return google_map_url + latitude + ',' + longitude;
  }
}

const mockStore: PointOfService = {
  address: {
    country: {
      isocode: 'PL',
      name: 'Poland',
    },
    defaultAddress: false,
    formattedAddress: 'ul. Zwycięstwa 23, Gliwice, 44-100',
    id: '8796099117079',
    line1: 'ul. Zwycięstwa 23',
    phone: '+48 32 440 08 00',
    postalCode: '44-100',
    shippingAddress: false,
    town: 'Gliwice',
    visibleInAddressBook: true,
  },
  displayName: 'SAP Labs Polska',
  features: {},
  geoPoint: {
    latitude: 50.296528,
    longitude: 18.670372,
  },
  name: 'sap-poland-labs-polska-gliwice-office',
  openingHours: {
    code: 'sap-office-standard-hours',
    specialDayOpeningList: [],
    weekDayOpeningList: [
      {
        closed: true,
        weekDay: 'Sun',
      },
      {
        closingTime: {
          formattedHour: '8:00 PM',
          hour: 8,
          minute: 0,
        },
        openingTime: {
          formattedHour: '9:00 AM',
          hour: 9,
          minute: 0,
        },
        closed: false,
        weekDay: 'Mon',
      },
      {
        closingTime: {
          formattedHour: '8:00 PM',
          hour: 8,
          minute: 0,
        },
        openingTime: {
          formattedHour: '9:00 AM',
          hour: 9,
          minute: 0,
        },
        closed: false,
        weekDay: 'Tue',
      },
      {
        closingTime: {
          formattedHour: '8:00 PM',
          hour: 8,
          minute: 0,
        },
        openingTime: {
          formattedHour: '9:00 AM',
          hour: 9,
          minute: 0,
        },
        closed: false,
        weekDay: 'Wed',
      },
      {
        closingTime: {
          formattedHour: '8:00 PM',
          hour: 8,
          minute: 0,
        },
        openingTime: {
          formattedHour: '9:00 AM',
          hour: 9,
          minute: 0,
        },
        closed: false,
        weekDay: 'Thu',
      },
      {
        closingTime: {
          formattedHour: '8:00 PM',
          hour: 8,
          minute: 0,
        },
        openingTime: {
          formattedHour: '9:00 AM',
          hour: 9,
          minute: 0,
        },
        closed: false,
        weekDay: 'Fri',
      },
      {
        closingTime: {
          formattedHour: '8:00 PM',
          hour: 8,
          minute: 0,
        },
        openingTime: {
          formattedHour: '10:00 AM',
          hour: 10,
          minute: 0,
        },
        closed: false,
        weekDay: 'Sat',
      },
    ],
  },
  storeImages: [],
};

describe('MyPreferredStoreComponent', () => {
  let component: MyPreferredStoreComponent;
  let fixture: ComponentFixture<MyPreferredStoreComponent>;
  let routingService: RoutingService;
  let cmsService: CmsService;
  let pickupLocationsSearchService: PickupLocationsSearchFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CardModule,
        CommonModule,
        I18nTestingModule,
        IconTestingModule,
        StoreModule,
        ConfigModule.withConfig({
          cmsComponents: {
            MyPreferredStore: {
              component: MyPreferredStoreComponent,
            },
          },
        } as CmsConfig),
        MyPreferredStoreComponent,
      ],
      providers: [
        { provide: PreferredStoreFacade, useClass: MockPreferredStoreService },
        {
          provide: PickupLocationsSearchFacade,
          useClass: MockPickupLocationsSearchService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: StoreFinderFacade, useClass: MockStoreLocationService },
        { provide: StoreLocationService, useClass: MockStoreLocationService },
        { provide: CmsService, useClass: MockCmsService },
      ],
    })

      .compileComponents();
    cmsService = TestBed.inject(CmsService);
    routingService = TestBed.inject(RoutingService);
    pickupLocationsSearchService = TestBed.inject(PickupLocationsSearchFacade);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPreferredStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should toggleOpenHours', () => {
    const initialValue = component.openHoursOpen;
    component.toggleOpenHours();
    expect(component.openHoursOpen).toEqual(!initialValue);
  });

  it('should changeStore', () => {
    spyOn(routingService, 'go');
    component.changeStore();
    expect(routingService.go).toHaveBeenCalledWith(['/store-finder']);
  });

  it('should show the link', () => {
    spyOn(component, 'getDirectionsToStore');
    spyOn(
      pickupLocationsSearchService,
      'loadAndGetStoreDetails'
    ).and.returnValue(of(mockStore));

    component.ngOnInit();
    fixture.detectChanges();

    const getDirectionLink =
      fixture.debugElement.nativeElement.querySelector('cx-generic-link');
    getDirectionLink.click();

    expect(component.getDirectionsToStore).not.toHaveBeenCalled();
  });

  it('should show action link and a button', () => {
    spyOn(cmsService, 'getCurrentPage').and.returnValue(
      of({ pageId: 'someOtherPage' })
    );
    spyOn(
      pickupLocationsSearchService,
      'loadAndGetStoreDetails'
    ).and.returnValue(of(mockStore));

    component.ngOnInit();
    fixture.detectChanges();

    const getDirectionLink =
      fixture.debugElement.nativeElement.querySelector('cx-generic-link');
    expect(getDirectionLink.textContent).toBe('Get Directions');
    const changeStoreButton = fixture.debugElement.nativeElement.querySelector(
      'button.btn-tertiary'
    );
    expect(changeStoreButton.textContent).toEqual(' Change Store ');
  });
});
