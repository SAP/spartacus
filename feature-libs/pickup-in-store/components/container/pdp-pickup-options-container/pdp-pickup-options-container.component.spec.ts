import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  CxDatePipe,
  MockDatePipe,
  MockTranslatePipe,
  Product,
  TranslatePipe,
} from '@spartacus/core';

import {
  AugmentedPointOfService,
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
  PickupOption,
  PreferredStoreFacade,
} from '@spartacus/pickup-in-store/root';
import {
  CurrentProductService,
  LaunchDialogService,
} from '@spartacus/storefront';
import { Observable, Subscription, firstValueFrom, of } from 'rxjs';
import { PdpPickupOptionsContainerComponent } from './pdp-pickup-options-container.component';

import { ElementRef } from '@angular/core';
import { MockIntendedPickupLocationService } from '../../../core/facade/intended-pickup-location.service.spec';
import { MockPreferredStoreService } from '../../../core/services/preferred-store.service.spec';
import { PickupOptionsComponent } from '../../presentational';
import { PickupOptionsStubComponent } from '../../presentational/pickup-options/pickup-options.component.spec';
import { CurrentLocationService } from '../../services/current-location.service';
import { MockLaunchDialogService } from '../pickup-option-dialog/pickup-option-dialog.component.spec';

import createSpy = jasmine.createSpy;

class MockPickupLocationsSearchFacade
  implements Partial<PickupLocationsSearchFacade>
{
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
  getStoreDetails = createSpy().and.returnValue(of({ name: 'London School' }));
  loadStoreDetails = createSpy();
}

export class MockCurrentProductService {
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
        toJSON: () => {},
      },
      timestamp: 0,
      toJSON: () => {},
    } as GeolocationPosition);
  }
}

describe('PdpPickupOptionsComponent', () => {
  let component: PdpPickupOptionsContainerComponent;
  let fixture: ComponentFixture<PdpPickupOptionsContainerComponent>;
  let launchDialogService: LaunchDialogService;
  let intendedPickupLocationService: IntendedPickupLocationFacade;
  let currentProductService: CurrentProductService;
  let preferredStoreFacade: PreferredStoreFacade;

  const configureTestingModule = () =>
    TestBed.configureTestingModule({
      imports: [CommonModule, PdpPickupOptionsContainerComponent],
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
          provide: PreferredStoreFacade,
          useClass: MockPreferredStoreService,
        },
        {
          provide: CurrentLocationService,
          useClass: MockCurrentLocationService,
        },
      ],
    }).overrideComponent(PdpPickupOptionsContainerComponent, {
      remove: {
        imports: [TranslatePipe, CxDatePipe, PickupOptionsComponent],
      },
      add: {
        imports: [MockTranslatePipe, MockDatePipe, PickupOptionsStubComponent],
      },
    });

  const stubServiceAndCreateComponent = () => {
    fixture = TestBed.createComponent(PdpPickupOptionsContainerComponent);
    component = fixture.componentInstance;
    launchDialogService = TestBed.inject(LaunchDialogService);
    intendedPickupLocationService = TestBed.inject(
      IntendedPickupLocationFacade
    );
    preferredStoreFacade = TestBed.inject(PreferredStoreFacade);

    currentProductService = TestBed.inject(CurrentProductService);

    spyOn(currentProductService, 'getProduct').and.callThrough();
    spyOn(launchDialogService, 'openDialog').and.callThrough();
    spyOn(
      intendedPickupLocationService,
      'removeIntendedLocation'
    ).and.callThrough();
    spyOn(
      intendedPickupLocationService,
      'setIntendedLocation'
    ).and.callThrough();

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

    it('should not open dialog', () => {
      spyOn(component, 'openDialog');
      component.onPickupOptionChange({
        option: 'pickup',
        triggerElement: {} as ElementRef,
      });
      expect(component.openDialog).not.toHaveBeenCalled();
    });

    it('should handle invalid intended location on init', async () => {
      spyOn(
        intendedPickupLocationService,
        'getIntendedLocation'
      ).and.returnValue(of({ pickupOption: 'pickup', displayName: undefined }));
      const displayLocation = await firstValueFrom(
        component.displayPickupLocation$
      );
      expect(displayLocation).toBeUndefined();
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

    it('should return undefined if intendedLocation.displayName is not defined', async () => {
      spyOn(
        intendedPickupLocationService,
        'getIntendedLocation'
      ).and.returnValue(of({ pickupOption: 'pickup', displayName: undefined }));
      spyOn(component, 'setIntendedPickupLocation');
      const displayLocation = await firstValueFrom(
        component.displayPickupLocation$
      );
      expect(displayLocation).toEqual(undefined);
    });

    it('setIntendedPickupLocation should set pickupOption as delivery', async () => {
      spyOn(
        preferredStoreFacade,
        'getPreferredStoreWithProductInStock'
      ).and.returnValue(
        of({ name: 'London School', displayName: 'London School' })
      );
      component.setIntendedPickupLocation('productCode');
      expect(
        intendedPickupLocationService.setIntendedLocation
      ).toHaveBeenCalledWith('productCode', {
        name: 'London School',
        pickupOption: 'delivery',
      });
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
                pickupOption: 'pickup',
              }),
          },
        })
        .compileComponents();
      stubServiceAndCreateComponent();
    });

    it('should not call getPreferredStore if display name is set', () => {
      spyOn(preferredStoreFacade, 'getPreferredStore$');

      expect(preferredStoreFacade.getPreferredStore$).not.toHaveBeenCalled();
    });
  });
});
