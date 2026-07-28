import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
import { firstValueFrom, of } from 'rxjs';
import { CheckoutPlaceOrderComponent } from './checkout-place-order.component';

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

  beforeEach(async () => {
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPlaceOrderComponent);
    component = fixture.componentInstance;
    controls = component.checkoutSubmitForm.controls;

    orderFacade = TestBed.inject(OrderFacade);
    routingService = TestBed.inject(RoutingService);
    launchDialogService = TestBed.inject(LaunchDialogService);
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

  it('should combine currency and language into params$', async () => {
    component.ngOnInit();
    const [currency, language] = await firstValueFrom(component.params$);
    expect(currency).toBe('USD');
    expect(language).toBe('en');
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

  function submitForm(isTermsCondition: boolean): void {
    controls.termsAndConditions.setValue(isTermsCondition);
    component.submitForm();
  }
});
