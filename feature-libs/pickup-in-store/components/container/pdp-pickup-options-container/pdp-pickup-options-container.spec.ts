import { CommonModule } from '@angular/common';
import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, Product } from '@spartacus/core';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import {
  AugmentedPointOfService,
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
  PickupOption,
} from '@spartacus/pickup-in-store/root';
import {
  CurrentProductService,
  LaunchDialogService,
  LAUNCH_CALLER,
} from '@spartacus/storefront';
import { MockPreferredStoreService } from 'feature-libs/pickup-in-store/core/services/preferred-store.service.spec';
import { Observable, of, Subscription } from 'rxjs';
import { MockIntendedPickupLocationService } from '../../../core/facade/intended-pickup-location.service.spec';
import { CurrentLocationService } from '../../services/current-location.service';
import { PdpPickupOptionsContainerComponent } from './pdp-pickup-options-container.component';

import createSpy = jasmine.createSpy;

class MockPickupLocationsSearchFacade implements PickupLocationsSearchFacade {
  startSearch = createSpy();
  hasSearchStarted = createSpy();
  isSearchRunning = createSpy();
  getSearchResults = createSpy().and.returnValue(
    of([
      {
        name: 'preferredStore',
        stockInfo: {
          stockLevel: 12,
        },
      },
    ])
  );
  clearSearchResults = createSpy();
  getHideOutOfStock = createSpy();
  setBrowserLocation = createSpy();
  toggleHideOutOfStock = createSpy();
  stockLevelAtStore = createSpy();
  getStockLevelAtStore = createSpy().and.returnValue(
    of({ stockLevel: { displayName: 'London School' } })
  );
  getStoreDetails = createSpy();
  loadStoreDetails = createSpy();
  setDeliveryOption = createSpy();
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef,
    _data?: any
  ) {
    return of();
  }

  get dialogClose(): Observable<string | undefined> {
    return of(undefined);
  }
}

class MockCurrentProductService {
  getProduct(): Observable<Product | null> {
    return of({ code: 'productCode', availableForPickup: true });
  }
}

class MockCurrentLocationService {
  getCurrentLocation(
    successCallback: PositionCallback,
    _errorCallback?: PositionErrorCallback | null,
    _options?: PositionOptions
  ): void {
    successCallback({
      coords: {
        latitude: 0,
        longitude: 0,
        accuracy: 0,
        altitude: 0,
        altitudeAccuracy: 0,
        heading: 0,
        speed: 0,
      },
      timestamp: 0,
    });
  }
}

describe('PickupOptionsComponent', () => {
  let component: PdpPickupOptionsContainerComponent;
  let fixture: ComponentFixture<PdpPickupOptionsContainerComponent>;
  let launchDialogService: LaunchDialogService;
  let intendedPickupLocationService: IntendedPickupLocationFacade;
  let currentProductService: CurrentProductService;
  let preferredStoreService: PreferredStoreService;

  const configureTestingModule = () =>
    TestBed.configureTestingModule({
      imports: [CommonModule, I18nTestingModule, ReactiveFormsModule],
      providers: [
        PdpPickupOptionsContainerComponent,
        {
          provide: PickupLocationsSearchFacade,
          useClass: MockPickupLocationsSearchFacade,
        },
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
        {
          provide: IntendedPickupLocationFacade,
          useClass: MockIntendedPickupLocationService,
        },
        { provide: CurrentProductService, useClass: MockCurrentProductService },
        {
          provide: PreferredStoreService,
          useClass: MockPreferredStoreService,
        },
        {
          provide: CurrentLocationService,
          useClass: MockCurrentLocationService,
        },
      ],
      declarations: [PdpPickupOptionsContainerComponent],
    });

  const stubServiceAndCreateComponent = () => {
    fixture = TestBed.createComponent(PdpPickupOptionsContainerComponent);
    component = fixture.componentInstance;
    launchDialogService = TestBed.inject(LaunchDialogService);
    intendedPickupLocationService = TestBed.inject(
      IntendedPickupLocationFacade
    );
    preferredStoreService = TestBed.inject(PreferredStoreService);

    currentProductService = TestBed.inject(CurrentProductService);

    spyOn(currentProductService, 'getProduct').and.callThrough();
    spyOn(launchDialogService, 'openDialog').and.callThrough();
    spyOn(
      intendedPickupLocationService,
      'removeIntendedLocation'
    ).and.callThrough();
    spyOn(intendedPickupLocationService, 'setIntendedLocation');

    fixture.detectChanges();
  };

  describe('with current product', () => {
    beforeEach(() => {
      configureTestingModule().compileComponents();
      stubServiceAndCreateComponent();
    });

    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should trigger and open dialog', () => {
      component.openDialog();
      expect(launchDialogService.openDialog).toHaveBeenCalledWith(
        LAUNCH_CALLER.PICKUP_IN_STORE,
        component.element,
        component['vcr'],
        { productCode: 'productCode' }
      );
    });

    it('should unsubscribe from any subscriptions when destroyed', () => {
      component.subscription = new Subscription();
      spyOn(component.subscription, 'unsubscribe');
      component.ngOnDestroy();
      expect(component.subscription.unsubscribe).toHaveBeenCalled();
    });

    it('should get the intended pickup location for the product on init', () => {
      spyOn(
        intendedPickupLocationService,
        'getIntendedLocation'
      ).and.callThrough();

      component.ngOnInit();

      expect(
        intendedPickupLocationService.getIntendedLocation
      ).toHaveBeenCalledWith('productCode');
      expect(component.availableForPickup).toBe(true);
    });

    it('should set pickupInStore to true when there is an intended location', () => {
      spyOn(
        intendedPickupLocationService,
        'getIntendedLocation'
      ).and.returnValue(
        of({ name: 'location-name', pickupOption: 'delivery' })
      );

      component.ngOnInit();
    });

    it('onPickupOptionChange where option is delivery', () => {
      spyOn(intendedPickupLocationService, 'getIntendedLocation');

      component['productCode'] = 'productCode';
      component.onPickupOptionChange('delivery');

      expect(
        intendedPickupLocationService.removeIntendedLocation
      ).toHaveBeenCalledWith('productCode');
    });

    it('onPickupOptionChange where option is pickup and display name is not set', () => {
      spyOn(preferredStoreService, 'getPreferredStore').and.callThrough();
      component['productCode'] = 'productCode';
      component.onPickupOptionChange('pickup');

      component['displayNameIsSet'] = true;

      expect(preferredStoreService.getPreferredStore).toHaveBeenCalled();
    });
  });

  describe('without current product', () => {
    beforeEach(() => {
      configureTestingModule()
        .overrideProvider(CurrentProductService, {
          useValue: { getProduct: () => of(null) },
        })
        .compileComponents();
      stubServiceAndCreateComponent();
    });

    it('should make no calls', () => {
      spyOn(
        intendedPickupLocationService,
        'getIntendedLocation'
      ).and.callThrough();

      component.ngOnInit();

      expect(currentProductService.getProduct).toHaveBeenCalled();
      expect(
        intendedPickupLocationService.getIntendedLocation
      ).not.toHaveBeenCalled();
      expect(component.availableForPickup).toBe(false);
    });

    it('should not display the form', () => {
      const form = fixture.debugElement.query(By.css('form'));
      expect(form).toBeNull();
    });

    it('onPickupOptionChange where option is pickup and display name is not set', () => {
      spyOn(preferredStoreService, 'getPreferredStore');
      spyOn(component, 'openDialog');
      component['productCode'] = 'productCode';
      component.onPickupOptionChange('pickup');

      component['displayNameIsSet'] = false;

      expect(preferredStoreService.getPreferredStore).toHaveBeenCalled();
      expect(component.openDialog).toHaveBeenCalled();
    });
  });

  describe('with current product and intended Location', () => {
    beforeEach(() => {
      configureTestingModule()
        .overrideProvider(IntendedPickupLocationFacade, {
          useValue: {
            setIntendedLocation: (
              _productCode: string,
              _location: AugmentedPointOfService
            ) => {},
            removeIntendedLocation: (_productCode: string) => {},

            getPickupOption: (
              _productCode: string
            ): Observable<PickupOption> => {
              return of('delivery');
            },
            setPickupOption: (
              _productCode: string,
              _pickupOption: PickupOption
            ): void => {},

            getIntendedLocation: () =>
              of({
                name: 'preferredStore',
                displayName: 'London School',
                pickupOption: 'pickupOptions',
              }),
          },
        })
        .compileComponents();
      stubServiceAndCreateComponent();
    });

    it('should not call getPreferredStore if display name is set', () => {
      spyOn(preferredStoreService, 'getPreferredStore');

      expect(preferredStoreService.getPreferredStore).not.toHaveBeenCalled();
    });
  });
});
