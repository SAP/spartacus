import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddToCartContainerContext } from '@spartacus/cart/base/components/add-to-cart';
import { I18nTestingModule } from '@spartacus/core';
import {
  IntendedPickupLocationFacade,
  PickupInStoreFacade,
} from '@spartacus/pickup-in-store/root';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
  OutletContextData,
} from '@spartacus/storefront';
import { of, Subscription } from 'rxjs';
import { MockIntendedPickupLocationService } from '../../core/facade/intended-pickup-location.service.spec';
import { PickupDeliveryOptionsComponent } from './pickup-delivery-options.component';

import createSpy = jasmine.createSpy;

class MockPickupInStoreFacade implements PickupInStoreFacade {
  getStock = createSpy();
  clearStockData = createSpy();
  hideOutOfStock = createSpy();
  getHideOutOfStockState = createSpy();
  getStockLoading = createSpy();
  getStockSuccess = createSpy();
  getSearchHasBeenPerformed = createSpy();
  getStockEntities = createSpy();
  getStores = createSpy();
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
}

const contextData: AddToCartContainerContext = { productCode: 'test' };
const context$ = of(contextData);

describe('PickupDeliveryOptionsComponent', () => {
  let component: PickupDeliveryOptionsComponent;
  let fixture: ComponentFixture<PickupDeliveryOptionsComponent>;
  let launchDialogService: LaunchDialogService;
  let intendedPickupLocationService: IntendedPickupLocationFacade;

  const configureTestingModule = () =>
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        PickupDeliveryOptionsComponent,
        {
          provide: PickupInStoreFacade,
          useClass: MockPickupInStoreFacade,
        },
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
        {
          provide: IntendedPickupLocationFacade,
          useClass: MockIntendedPickupLocationService,
        },
      ],
      declarations: [PickupDeliveryOptionsComponent],
    });

  const stubServiceAndCreateComponent = () => {
    fixture = TestBed.createComponent(PickupDeliveryOptionsComponent);
    component = fixture.componentInstance;
    launchDialogService = TestBed.inject(LaunchDialogService);
    intendedPickupLocationService = TestBed.inject(
      IntendedPickupLocationFacade
    );

    spyOn(launchDialogService, 'openDialog').and.callThrough();

    fixture.detectChanges();
  };

  describe('without outletContext', () => {
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
        { productCode: undefined }
      );
    });

    it('should unsubscribe from any subscriptions when destroyed', () => {
      component.subscription = new Subscription();
      spyOn(component.subscription, 'unsubscribe');
      component.ngOnDestroy();
      expect(component.subscription.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('with outletContext', () => {
    beforeEach(() => {
      configureTestingModule()
        .overrideProvider(OutletContextData, {
          useValue: { context$ },
        })
        .compileComponents();
      stubServiceAndCreateComponent();
    });

    it('should get the intended pickup location for the product on init', () => {
      spyOn(
        intendedPickupLocationService,
        'getIntendedLocation'
      ).and.callThrough();

      component.ngOnInit();

      expect(
        intendedPickupLocationService.getIntendedLocation
      ).toHaveBeenCalledWith(contextData.productCode);
    });

    it('should set pickupInStore to false when there is not intended location', () => {
      spyOn(
        intendedPickupLocationService,
        'getIntendedLocation'
      ).and.returnValue(of());

      component.ngOnInit();

      // If the service does not return a pickup location then pickUpInStore should be false
      expect(component.pickUpInStore).toEqual(false);
    });

    it('should set pickupInStore to true when there is an intended location', () => {
      spyOn(
        intendedPickupLocationService,
        'getIntendedLocation'
      ).and.returnValue(of({ name: 'location-name' }));

      component.ngOnInit();

      // If the service does return a pickup location then pickUpInStore should be true
      expect(component.pickUpInStore).toEqual(true);
    });

    it('should trigger and open dialog', () => {
      component.openDialog();
      expect(launchDialogService.openDialog).toHaveBeenCalledWith(
        LAUNCH_CALLER.PICKUP_IN_STORE,
        component.element,
        component['vcr'],
        { productCode: contextData.productCode }
      );
    });

    it('should clear intended pickup location when delivery is selected', () => {
      spyOn(intendedPickupLocationService, 'removeIntendedLocation');
      component.clearIntendedPickupLocation();
      expect(
        intendedPickupLocationService.removeIntendedLocation
      ).toHaveBeenCalledWith(contextData.productCode);
    });
  });
});
