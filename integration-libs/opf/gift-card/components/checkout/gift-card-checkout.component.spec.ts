import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { of, throwError } from 'rxjs';

import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { GiftCardCheckoutComponent } from './gift-card-checkout.component';
import { OrderFacade } from '@spartacus/order/root';
import { ViewContainerRef } from '@angular/core';

class MockActiveCartFacade {
  getActive = jasmine
    .createSpy('getActive')
    .and.returnValue(of({ code: '123' }));
}

class MockOrderFacade {
  placePaymentAuthorizedOrder = jasmine.createSpy(
    'placePaymentAuthorizedOrder'
  );
}

class MockRoutingService {
  go = jasmine.createSpy('go');
}

class MockLaunchDialogService {
  launch = jasmine.createSpy('launch');
  clear = jasmine.createSpy('clear');
}

class MockGlobalMessageService {
  add = jasmine.createSpy('add');
}

describe('GiftCardCheckoutComponent', () => {
  let component: GiftCardCheckoutComponent;
  let fixture: ComponentFixture<GiftCardCheckoutComponent>;
  let orderFacade: OrderFacade;
  let routingService: RoutingService;
  let launchDialogService: LaunchDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, GiftCardCheckoutComponent],
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
        { provide: OrderFacade, useClass: MockOrderFacade },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        ViewContainerRef,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GiftCardCheckoutComponent);
    component = fixture.componentInstance;
    orderFacade = TestBed.inject(OrderFacade);
    routingService = TestBed.inject(RoutingService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    fixture.detectChanges();
  });

  it('should create and initialize cart$', () => {
    expect(component).toBeTruthy();
    component.cart$.subscribe((cart) => {
      expect(cart.code).toBe('123');
    });
  });

  describe('placeOrderWithGiftCard', () => {
    beforeEach(() => {
      component.termsAndConditionsChecked = true;
    });

    it('should launch spinner and redirect on success', () => {
      const mockComponentRef = { destroy: jasmine.createSpy('destroy') } as any;
      (launchDialogService.launch as jasmine.Spy).and.returnValue(
        of(mockComponentRef)
      );
      (orderFacade.placePaymentAuthorizedOrder as jasmine.Spy).and.returnValue(
        of({ code: '0001' })
      );

      component.placeOrderWithGiftCard();

      expect(launchDialogService.launch).toHaveBeenCalledWith(
        LAUNCH_CALLER.PLACE_ORDER_SPINNER,
        jasmine.any(ViewContainerRef)
      );
      expect(orderFacade.placePaymentAuthorizedOrder).toHaveBeenCalledWith(
        true
      );
      expect(launchDialogService.clear).toHaveBeenCalledWith(
        LAUNCH_CALLER.PLACE_ORDER_SPINNER
      );
      expect(mockComponentRef.destroy).toHaveBeenCalled();
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'orderConfirmation',
      });
    });

    it('should clear spinner and destroy component on error', () => {
      const mockComponentRef = { destroy: jasmine.createSpy('destroy') } as any;
      (launchDialogService.launch as jasmine.Spy).and.returnValue(
        of(mockComponentRef)
      );
      (orderFacade.placePaymentAuthorizedOrder as jasmine.Spy).and.returnValue(
        throwError(() => new Error('fail'))
      );

      component.placeOrderWithGiftCard();

      expect(launchDialogService.clear).toHaveBeenCalledWith(
        LAUNCH_CALLER.PLACE_ORDER_SPINNER
      );
      expect(mockComponentRef.destroy).toHaveBeenCalled();
    });

    it('should not place order if terms are not checked', () => {
      component.termsAndConditionsChecked = false;
      component.placeOrderWithGiftCard();
      expect(orderFacade.placePaymentAuthorizedOrder).not.toHaveBeenCalled();
    });
  });
});
