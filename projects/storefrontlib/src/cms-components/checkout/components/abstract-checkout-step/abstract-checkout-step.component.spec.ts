import { async, TestBed } from '@angular/core/testing';
import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckoutConfigService } from '../../services/checkout-config.service';
import { AbstractCheckoutStepComponent } from './abstract-checkout-step.component';

@Component({ selector: 'cx-test-cmp', template: '' })
export class TestComponent extends AbstractCheckoutStepComponent
  implements OnInit {
  constructor(
    protected checkoutConfigService: CheckoutConfigService,
    protected activatedRoute: ActivatedRoute
  ) {
    super(checkoutConfigService, activatedRoute);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}

class MockCheckoutConfigService {
  getNextCheckoutStepUrl(): string {
    return 'next step';
  }
  getPreviousCheckoutStepUrl(): string {
    return 'cart';
  }
}

class MockActivatedRoute {}

describe('AbstractCheckoutStepComponent', () => {
  let component: TestComponent;
  let checkoutConfigService: CheckoutConfigService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [
        { provide: CheckoutConfigService, useClass: MockCheckoutConfigService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    checkoutConfigService = TestBed.get(CheckoutConfigService as Type<
      CheckoutConfigService
    >);
    activatedRoute = TestBed.get(ActivatedRoute as Type<ActivatedRoute>);

    component = new TestComponent(checkoutConfigService, activatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get previous step and next step urls', () => {
    spyOn(checkoutConfigService, 'getNextCheckoutStepUrl').and.stub();
    spyOn(checkoutConfigService, 'getPreviousCheckoutStepUrl').and.stub();

    component.ngOnInit();
    expect(checkoutConfigService.getNextCheckoutStepUrl).toHaveBeenCalledWith(
      activatedRoute
    );
    expect(
      checkoutConfigService.getPreviousCheckoutStepUrl
    ).toHaveBeenCalledWith(activatedRoute);
  });

  it('should set previous button text to "back to cart" ', () => {
    spyOn(checkoutConfigService, 'getPreviousCheckoutStepUrl').and.returnValue(
      'cart'
    );
    component.ngOnInit();
    expect(component.backButtonText).toEqual('checkout.backToCart');
  });

  it('should set previous button text to "back"', () => {
    spyOn(checkoutConfigService, 'getPreviousCheckoutStepUrl').and.returnValue(
      'step1'
    );
    component.ngOnInit();
    expect(component.backButtonText).toEqual('common.back');
  });
});
