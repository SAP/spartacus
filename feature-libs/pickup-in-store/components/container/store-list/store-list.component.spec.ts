import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule } from '@spartacus/core';
import {
  AugmentedPointOfService,
  PointOfServiceNames,
  PreferredStoreService,
} from '@spartacus/pickup-in-store/core';
import {
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
} from '@spartacus/pickup-in-store/root';
import { SpinnerModule } from '@spartacus/storefront';
import { MockIntendedPickupLocationService } from 'feature-libs/pickup-in-store/core/facade/intended-pickup-location.service.spec';
import { MockPickupLocationsSearchService } from 'feature-libs/pickup-in-store/core/facade/pickup-locations-search.service.spec';
import { MockPreferredStoreService } from 'feature-libs/pickup-in-store/core/services/preferred-store.service.spec';
import { StoreListComponent } from './store-list.component';

describe('StoreListComponent', () => {
  let component: StoreListComponent;
  let fixture: ComponentFixture<StoreListComponent>;
  let pickupLocationsSearchService: PickupLocationsSearchFacade;
  let preferredStoreService: PreferredStoreService;
  let intendedPickupLocationService: IntendedPickupLocationFacade;
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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreListComponent);
    component = fixture.componentInstance;
    pickupLocationsSearchService = TestBed.inject(PickupLocationsSearchFacade);
    preferredStoreService = TestBed.inject(PreferredStoreService);
    intendedPickupLocationService = TestBed.inject(
      IntendedPickupLocationFacade
    );

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

    component.onSelectStore({ storeContent: 'storeContent' });
    expect(preferredStoreService.setPreferredStore).toHaveBeenCalledWith({
      name: undefined,
      displayName: undefined,
    });
  });
});
