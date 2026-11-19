/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CheckoutPlaceOrderComponent } from '@spartacus/checkout/base/components';
import {
  CurrencyService,
  GlobalMessageService,
  LanguageService,
  MockTranslatePipe,
  RoutingService,
  TranslatePipe,
} from '@spartacus/core';
import { OrderFacade } from '@spartacus/order/root';
import {
  AtMessageDirective,
  LAUNCH_CALLER,
  LaunchDialogService,
  LaunchRenderStrategy,
} from '@spartacus/storefront';
import { of } from 'rxjs';
import { OpfB2bCheckoutPlaceOrderComponent } from './opf-b2b-checkout-place-order.component';

@Directive({ selector: '[cxAtMessage]' })
class MockAtMessageDirective {
  @Input() cxAtMessage: string | string[] | undefined;
}

class MockCheckoutPlaceOrderComponent {
  checkoutSubmitForm = new UntypedFormGroup({
    termsAndConditions: new UntypedFormGroup({}),
  });
}

class MockStore {
  dispatch = vi.fn();
  pipe = vi.fn().mockReturnValue(of({}));
}

class MockLaunchRenderStrategy {
  render = vi.fn();
}

class MockOrderFacade implements Partial<OrderFacade> {
  placeOrder = vi.fn().mockReturnValue(of({}));
  clearOrder = vi.fn();
}

class MockRoutingService implements Partial<RoutingService> {
  go = vi.fn().mockReturnValue(Promise.resolve(true));
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  launch = vi.fn();
  clear = vi.fn();
}

describe('OpfB2bCheckoutPlaceOrderComponent', () => {
  let component: OpfB2bCheckoutPlaceOrderComponent;
  let fixture: ComponentFixture<OpfB2bCheckoutPlaceOrderComponent>;
  let controls: UntypedFormGroup['controls'];
  let orderFacade: OrderFacade;
  let routingService: RoutingService;
  let launchDialogService: LaunchDialogService;

  beforeEach(async () => {
    const mockCurrencyService = {
      getActive: () => of('USD'),
    };
    const mockLanguageService = {
      getActive: () => of('en'),
    };
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, OpfB2bCheckoutPlaceOrderComponent],
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
    })
      .overrideComponent(OpfB2bCheckoutPlaceOrderComponent, {
        remove: { imports: [TranslatePipe, AtMessageDirective] },
        add: { imports: [MockTranslatePipe, MockAtMessageDirective] },
      })
      .compileComponents();
  });

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
