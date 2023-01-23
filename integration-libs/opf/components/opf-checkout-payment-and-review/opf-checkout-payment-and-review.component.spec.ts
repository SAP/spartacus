import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActiveCartService } from '@spartacus/cart/base/core';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { I18nTestingModule } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { OPFCheckoutPaymentAndReviewComponent } from './opf-checkout-payment-and-review.component';

const mockCart = {
  code: 'test',
  paymentType: {
    code: 'PAYMENT_GATEWAY',
  },
};

const cart$ = new BehaviorSubject<any>({});
class MockActiveCartService implements Partial<ActiveCartService> {
  getActive(): Observable<Cart> {
    return cart$.asObservable();
  }
}

@Component({
  template: '',
  selector: 'cx-opf-checkout-payments',
})
class MockOpfCheckoutPaymentsComponent {}

describe('OPFCheckoutPaymentReviewComponent', () => {
  let component: OPFCheckoutPaymentAndReviewComponent;
  let fixture: ComponentFixture<OPFCheckoutPaymentAndReviewComponent>;
  let activeCartService: ActiveCartFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        OPFCheckoutPaymentAndReviewComponent,
        MockOpfCheckoutPaymentsComponent,
      ],
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OPFCheckoutPaymentAndReviewComponent);
    activeCartService = TestBed.inject(ActiveCartFacade);

    component = fixture.componentInstance;
    spyOn(activeCartService, 'getActive').and.returnValue(cart$);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call for active cart to get payment type', () => {
    expect(activeCartService.getActive).toHaveBeenCalled();
  });

  it('should render cx-opf-checkout-payments component if payment type is not set to ACCOUNT', () => {
    cart$.next(mockCart);
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('cx-opf-checkout-payments'))
    ).toBeTruthy();
  });

  it('should not render cx-opf-checkout-payments component if payment type is set to ACCOUNT', () => {
    cart$.next({ ...mockCart, paymentType: { code: 'ACCOUNT' } });

    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('cx-opf-checkout-payments'))
    ).toBeFalsy();
  });
});
