import { CommonModule } from '@angular/common';
import {
  Component,
  DebugElement,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActiveCartService } from '@spartacus/cart/base/core';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { I18nTestingModule } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
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
@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@Component({
  template: '',
  selector: 'cx-opf-checkout-payments',
})
class MockOpfCheckoutPaymentsComponent {
  @Input()
  disabled = false;
}

describe('OPFCheckoutPaymentReviewComponent', () => {
  let component: OPFCheckoutPaymentAndReviewComponent;
  let fixture: ComponentFixture<OPFCheckoutPaymentAndReviewComponent>;
  let el: DebugElement;
  let activeCartService: ActiveCartFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        I18nTestingModule,
        FormErrorsModule,
        RouterTestingModule,
      ],
      declarations: [
        OPFCheckoutPaymentAndReviewComponent,
        MockOpfCheckoutPaymentsComponent,
        MockUrlPipe,
      ],
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OPFCheckoutPaymentAndReviewComponent);
    el = fixture.debugElement;
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

    expect(el.query(By.css('cx-opf-checkout-payments'))).toBeTruthy();
  });

  it('should not render cx-opf-checkout-payments component if payment type is set to ACCOUNT', () => {
    cart$.next({ ...mockCart, paymentType: { code: 'ACCOUNT' } });

    fixture.detectChanges();

    expect(el.query(By.css('cx-opf-checkout-payments'))).toBeFalsy();
  });

  it('should change form value when checkbox get selected / change state', () => {
    expect(component.termsAndConditionInvalid).toEqual(true);

    const inputEl = el.query(By.css('input[type="checkbox"]')).nativeElement;

    inputEl.click();
    fixture.detectChanges();

    expect(inputEl.checked).toEqual(true);
    expect(component.termsAndConditionInvalid).toEqual(false);
  });
});
