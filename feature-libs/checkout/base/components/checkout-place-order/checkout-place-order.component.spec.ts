import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CurrencyService,
  CxDatePipe,
  GlobalMessageService,
  I18nTestingModule,
  LanguageService,
  MockDatePipe,
  MockTranslatePipe,
  RoutingService,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { OrderFacade } from '@spartacus/order/root';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, of } from 'rxjs';
import { CheckoutPlaceOrderComponent } from './checkout-place-order.component';
import createSpy = jasmine.createSpy;

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

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  isStable$ = new BehaviorSubject<boolean>(true);
  isStable = () => this.isStable$.asObservable();
}

@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('CheckoutPlaceOrderComponent', () => {
  let component: CheckoutPlaceOrderComponent;
  let fixture: ComponentFixture<CheckoutPlaceOrderComponent>;
  let controls: UntypedFormGroup['controls'];
  let orderFacade: OrderFacade;
  let routingService: RoutingService;
  let launchDialogService: LaunchDialogService;
  let activeCartFacade: MockActiveCartFacade;

  beforeEach(waitForAsync(() => {
    const mockCurrencyService = {
      getActive: () => of('USD'),
    };
    const mockLanguageService = {
      getActive: () => of('en'),
    };
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), I18nTestingModule],
      providers: [
        { provide: OrderFacade, useClass: MockOrderFacade },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: GlobalMessageService, useValue: {} },
        { provide: CurrencyService, useValue: mockCurrencyService },
        { provide: LanguageService, useValue: mockLanguageService },
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
      ],
    })
      .overrideComponent(CheckoutPlaceOrderComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, UrlPipe],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe, MockUrlPipe],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPlaceOrderComponent);
    component = fixture.componentInstance;
    controls = component.checkoutSubmitForm.controls;

    orderFacade = TestBed.inject(OrderFacade);
    routingService = TestBed.inject(RoutingService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    activeCartFacade = TestBed.inject(
      ActiveCartFacade
    ) as unknown as MockActiveCartFacade;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should not place order when checkbox not checked', () => {
    submitForm(false);

    expect(orderFacade.placeOrder).not.toHaveBeenCalled();
  });

  it('should place order when checkbox checked', () => {
    controls.termsAndConditions.setValue(true);

    submitForm(true);

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

  it('should combine currency and language into params$', (done) => {
    component.ngOnInit();
    component.params$.subscribe(([currency, language]) => {
      expect(currency).toBe('USD');
      expect(language).toBe('en');
      done();
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

    it('should have the place order button DISABLED while the cart is unstable', () => {
      activeCartFacade.isStable$.next(false);
      fixture.detectChanges();

      expect(
        fixture.debugElement.nativeElement.querySelector('.btn-primary')
          .disabled
      ).toEqual(true);
    });

    it('should re-enable the place order button when the cart becomes stable again', () => {
      activeCartFacade.isStable$.next(false);
      fixture.detectChanges();
      expect(
        fixture.debugElement.nativeElement.querySelector('.btn-primary')
          .disabled
      ).toEqual(true);

      activeCartFacade.isStable$.next(true);
      fixture.detectChanges();
      expect(
        fixture.debugElement.nativeElement.querySelector('.btn-primary')
          .disabled
      ).toEqual(false);
    });

    it('should render the cart-updating hint while the cart is unstable', () => {
      activeCartFacade.isStable$.next(false);
      fixture.detectChanges();

      expect(
        fixture.debugElement.nativeElement.querySelector(
          '.cx-place-order-cart-updating'
        )
      ).toBeTruthy();
    });

    it('should NOT render the cart-updating hint while the cart is stable', () => {
      activeCartFacade.isStable$.next(true);
      fixture.detectChanges();

      expect(
        fixture.debugElement.nativeElement.querySelector(
          '.cx-place-order-cart-updating'
        )
      ).toBeFalsy();
    });
  });

  describe('submitForm cart-stability guard', () => {
    it('should NOT place the order if submitForm() is invoked while the cart is unstable', () => {
      controls.termsAndConditions.setValue(true);
      activeCartFacade.isStable$.next(false);

      component.submitForm();

      expect(launchDialogService.launch).not.toHaveBeenCalled();
      expect(orderFacade.placeOrder).not.toHaveBeenCalled();
    });

    it('should place the order once the cart becomes stable', () => {
      controls.termsAndConditions.setValue(true);
      activeCartFacade.isStable$.next(true);

      component.submitForm();

      expect(orderFacade.placeOrder).toHaveBeenCalled();
    });
  });

  function submitForm(isTermsCondition: boolean): void {
    controls.termsAndConditions.setValue(isTermsCondition);
    component.submitForm();
  }
});
