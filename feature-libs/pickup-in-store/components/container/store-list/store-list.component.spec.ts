import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ActiveCartFacade, Cart, OrderEntry } from '@spartacus/cart/base/root';
import { I18nTestingModule, PointOfServiceStock } from '@spartacus/core';
import {
  PointOfServiceNames,
  PreferredStoreService,
} from '@spartacus/pickup-in-store/core';
import {
  AugmentedPointOfService,
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
} from '@spartacus/pickup-in-store/root';
import { CurrentProductService, SpinnerModule } from '@spartacus/storefront';
import { MockIntendedPickupLocationService } from 'feature-libs/pickup-in-store/core/facade/intended-pickup-location.service.spec';
import { MockPickupLocationsSearchService } from 'feature-libs/pickup-in-store/core/facade/pickup-locations-search.service.spec';
import { MockPreferredStoreService } from 'feature-libs/pickup-in-store/core/services/preferred-store.service.spec';
import { Observable, of } from 'rxjs';
import { StoreListComponent } from './store-list.component';

export class MockActiveCartService {
  addEntry(_productCode: string, _quantity: number): void {}
  getEntry(_productCode: string): Observable<OrderEntry> {
    return of();
  }
  isStable(): Observable<boolean> {
    return of();
  }
  getActive(): Observable<Cart> {
    return of({
      guid: 'test',
      user: { uid: 'test' },
      entries: [{ product: { code: 'test' }, quantity: 1, entryNumber: 1 }],
    });
  }
  getEntries(): Observable<OrderEntry[]> {
    return of([]);
  }
  getLastEntry(_productCode: string): Observable<OrderEntry> {
    return of();
  }
}
class MockCurrentProductService {
  getProduct(): Observable<null> {
    return of(null);
  }
}
describe('StoreListComponent', () => {
  let component: StoreListComponent;
  let fixture: ComponentFixture<StoreListComponent>;
  let pickupLocationsSearchService: PickupLocationsSearchFacade;
  let preferredStoreService: PreferredStoreService;
  let intendedPickupLocationService: IntendedPickupLocationFacade;
  let activeCartService: ActiveCartFacade;
  const preferredStore: AugmentedPointOfService = {
    name: 'London School',
    displayName: 'London School',
    pickupOption: 'pickup',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        SpinnerModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [StoreListComponent],
      providers: [
        {
          provide: PickupLocationsSearchFacade,
          useClass: MockPickupLocationsSearchService,
        },
        { provide: PreferredStoreService, useClass: MockPreferredStoreService },
        {
          provide: IntendedPickupLocationFacade,
          useClass: MockIntendedPickupLocationService,
        },
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartService,
        },
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreListComponent);
    component = fixture.componentInstance;
    pickupLocationsSearchService = TestBed.inject(PickupLocationsSearchFacade);
    preferredStoreService = TestBed.inject(PreferredStoreService);
    intendedPickupLocationService = TestBed.inject(
      IntendedPickupLocationFacade
    );
    activeCartService = TestBed.inject(ActiveCartFacade);
    component.productCode = 'productCode';
    fixture.detectChanges();
  });

  it('should create store list', () => {
    expect(component).toBeDefined();
  });

  it('should get local stores on init', () => {
    spyOn(pickupLocationsSearchService, 'getSearchResults');
    spyOn(pickupLocationsSearchService, 'isSearchRunning');
    spyOn(pickupLocationsSearchService, 'hasSearchStarted');

    component.ngOnInit();
    expect(pickupLocationsSearchService.getSearchResults).toHaveBeenCalledWith(
      'productCode'
    );
    expect(pickupLocationsSearchService.isSearchRunning).toHaveBeenCalled();
    expect(pickupLocationsSearchService.hasSearchStarted).toHaveBeenCalled();
  });

  it('should set the preferred store when a store is selected', () => {
    spyOn(preferredStoreService, 'setPreferredStore');
    component.isPDP = true;
    spyOn(intendedPickupLocationService, 'setIntendedLocation');
    spyOn(component.storeSelected, 'emit');

    component.onSelectStore(preferredStore);

    const expectedPreferredStore: PointOfServiceNames = {
      name: 'London School',
      displayName: 'London School',
    };

    expect(preferredStoreService.setPreferredStore).toHaveBeenCalledWith(
      expectedPreferredStore
    );
    expect(
      intendedPickupLocationService.setIntendedLocation
    ).toHaveBeenCalledWith('productCode', preferredStore);
    expect(component.storeSelected.emit).toHaveBeenCalledWith();
  });

  it('should set blank preferred store when store has no name', () => {
    spyOn(preferredStoreService, 'setPreferredStore');
    component.isPDP = true;
    component.onSelectStore({ storeContent: 'storeContent' });
    expect(preferredStoreService.setPreferredStore).toHaveBeenCalledWith({
      name: '',
      displayName: undefined,
    });
  });

  it('should call getSearchResults with productCode', () => {
    component.productCode = 'productCode';
    spyOn(pickupLocationsSearchService, 'getSearchResults');
    component.ngOnInit();
    expect(pickupLocationsSearchService.getSearchResults).toHaveBeenCalledWith(
      'productCode'
    );
  });

  it('should set entry number to 1 when adding an entry', () => {
    const expected = 1;
    component.productCode = 'test';
    component.ngOnInit();
    const received = component.entryNumber;
    expect(received).toEqual(expected);
  });
  it('should not set quantity if entry item product code is not equal to product code', () => {
    spyOn(activeCartService, 'getActive').and.returnValue(
      of({
        entries: [{}],
      })
    );
    component.ngOnInit();
    expect(component.quantity).toBeUndefined();
  });

  it('should set entryNumber to -1 if item entryNumber is not set', () => {
    spyOn(activeCartService, 'getActive').and.returnValue(
      of({
        entries: [
          {
            product: { code: 'test' },
          },
        ],
      })
    );
    component.productCode = 'test';
    component.ngOnInit();
    expect(component.entryNumber).toBe(-1);
  });
  it('should not call setPickupOptionInStore if not on PDP', () => {
    spyOn(pickupLocationsSearchService, 'setPickupOptionInStore');
    const store: PointOfServiceStock = {
      name: 'London School',
    };
    component.isPDP = false;
    component.onSelectStore(store);
    expect(
      pickupLocationsSearchService.setPickupOptionInStore
    ).toHaveBeenCalled();
  });
});
