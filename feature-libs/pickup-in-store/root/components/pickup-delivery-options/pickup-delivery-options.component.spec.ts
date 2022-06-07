import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddToCartContainerContext } from '@spartacus/cart/base/components/add-to-cart';
import { I18nTestingModule } from '@spartacus/core';
import { PickupInStoreFacade } from '@spartacus/pickup-in-store/root';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
  OutletContextData,
} from '@spartacus/storefront';
import { of, Subscription } from 'rxjs';
import { PickupDeliveryOptionsComponent } from './pickup-delivery-options.component';

import createSpy = jasmine.createSpy;

class MockPickupInStoreFacade implements PickupInStoreFacade {
  getStore = createSpy();
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
  let service: PickupInStoreFacade;

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
      ],
      declarations: [PickupDeliveryOptionsComponent],
    });

  const stubServiceAndCreateComponent = () => {
    fixture = TestBed.createComponent(PickupDeliveryOptionsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PickupInStoreFacade);
    launchDialogService = TestBed.inject(LaunchDialogService);

    spyOn(launchDialogService, 'openDialog').and.callThrough();

    fixture.detectChanges();
  };

  describe('without outletContext', () => {
    beforeEach(() => {
      configureTestingModule().compileComponents();
      stubServiceAndCreateComponent();
    });

    it('should create and call getStore', () => {
      expect(component).toBeDefined();
      expect(service.getStore).toHaveBeenCalled();
    });

    it('should trigger and open dialog', () => {
      component.openDialog();
      expect(launchDialogService.openDialog).toHaveBeenCalledWith(
        LAUNCH_CALLER.PICKUP_IN_STORE,
        component.element,
        component['vcr'],
        { msg: 'London', productCode: undefined }
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

    it('should trigger and open dialog', () => {
      component.openDialog();
      expect(launchDialogService.openDialog).toHaveBeenCalledWith(
        LAUNCH_CALLER.PICKUP_IN_STORE,
        component.element,
        component['vcr'],
        { msg: 'London', productCode: contextData.productCode }
      );
    });
  });
});
