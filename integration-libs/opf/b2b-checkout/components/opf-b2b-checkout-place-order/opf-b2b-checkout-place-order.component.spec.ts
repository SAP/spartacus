/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CheckoutPlaceOrderComponent } from '@spartacus/checkout/base/components';
import {
  CurrencyService,
  GlobalMessageService,
  I18nTestingModule,
  LanguageService,
  RoutingService,
} from '@spartacus/core';
import { OrderFacade } from '@spartacus/order/root';
import {
  AtMessageModule,
  LAUNCH_CALLER,
  LaunchDialogService,
  LaunchRenderStrategy,
} from '@spartacus/storefront';
import { of } from 'rxjs';
import { OpfB2bCheckoutPlaceOrderComponent } from './opf-b2b-checkout-place-order.component';
import createSpy = jasmine.createSpy;

class MockCheckoutPlaceOrderComponent {
  checkoutSubmitForm = new UntypedFormGroup({
    termsAndConditions: new UntypedFormGroup({}),
  });
}

class MockStore {
  dispatch = createSpy('dispatch');
  pipe = createSpy('pipe').and.returnValue(of({}));
}

class MockLaunchRenderStrategy {
  render = createSpy('render');
}

class MockOrderFacade implements Partial<OrderFacade> {
  placeOrder = createSpy().and.returnValue(of({}));
  clearOrder = createSpy();
}

class MockRoutingService implements Partial<RoutingService> {
  go = createSpy().and.returnValue(Promise.resolve(true));
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  launch = createSpy();
  clear = createSpy();
}

describe('OpfB2bCheckoutPlaceOrderComponent', () => {
  let component: OpfB2bCheckoutPlaceOrderComponent;
  let fixture: ComponentFixture<OpfB2bCheckoutPlaceOrderComponent>;
  let controls: UntypedFormGroup['controls'];
  let orderFacade: OrderFacade;
  let routingService: RoutingService;
  let launchDialogService: LaunchDialogService;

  beforeEach(waitForAsync(() => {
    const mockCurrencyService = {
      getActive: () => of('USD'),
    };
    const mockLanguageService = {
      getActive: () => of('en'),
    };
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        I18nTestingModule,
        AtMessageModule,
        OpfB2bCheckoutPlaceOrderComponent,
      ],
      providers: [
        {
          provide: CheckoutPlaceOrderComponent,
          useClass: MockCheckoutPlaceOrderComponent,
        },
        { provide: Store, useClass: MockStore },
        { provide: LaunchRenderStrategy, useClass: MockLaunchRenderStrategy },
        { provide: OrderFacade, useClass: MockOrderFacade },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: GlobalMessageService, useValue: {} },
        { provide: CurrencyService, useValue: mockCurrencyService },
        { provide: LanguageService, useValue: mockLanguageService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpfB2bCheckoutPlaceOrderComponent);
    component = fixture.componentInstance;
    controls = component.checkoutSubmitForm.controls;

    orderFacade = TestBed.inject(OrderFacade);
    routingService = TestBed.inject(RoutingService);
    launchDialogService = TestBed.inject(LaunchDialogService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set terms and conditions to true when not disabled', () => {
    component.isDisabled = false;
    component.ngOnInit();
    expect(controls.termsAndConditions.value).toBe(true);
  });

  it('should set terms and conditions to false when disabled', () => {
    component.isDisabled = true;
    component.ngOnInit();
    expect(controls.termsAndConditions.value).toBe(false);
  });

  it('should not place order when checkbox not checked', () => {
    controls.termsAndConditions.setValue(false);
    component.submitForm();
    expect(orderFacade.placeOrder).not.toHaveBeenCalled();
  });

  it('should place order when checkbox checked', () => {
    controls.termsAndConditions.setValue(true);
    component.submitForm();
    expect(launchDialogService.launch).toHaveBeenCalledWith(
      LAUNCH_CALLER.PLACE_ORDER_SPINNER,
      component['vcr']
    );
    expect(orderFacade.placeOrder).toHaveBeenCalled();
  });

  it('should change page and reset form data on a successful place order', () => {
    component.onSuccess();
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orderConfirmation',
    });
  });

  describe('Place order UI', () => {
    beforeEach(() => {
      controls.termsAndConditions.setValue(true);
    });

    it('should have the place order button ENABLED when terms and condition is checked', () => {
      fixture.detectChanges();
      expect(
        fixture.debugElement.nativeElement.querySelector('.btn-primary')
          .disabled
      ).toEqual(false);
    });
  });
});
