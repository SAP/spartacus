import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ActiveCartService,
  Cart,
  CartVoucherService,
  I18nTestingModule,
} from '@spartacus/core';
import {
  AppliedCouponsComponent,
  OrderSummaryComponent,
  PromotionsComponent,
} from '@spartacus/storefront';
import { MockFeatureLevelDirective } from 'projects/storefrontlib/shared/test/mock-feature-level-directive';
import { of } from 'rxjs';
import { CheckoutOrderSummaryComponent } from './checkout-order-summary.component';
import createSpy = jasmine.createSpy;

class MockActiveCartService implements Partial<ActiveCartService> {
  getActive = createSpy().and.returnValue(
    of(<Partial<Cart>>{
      totalItems: 5141,
      subTotal: { formattedValue: '11119' },
    })
  );
}

describe('CheckoutOrderSummaryComponent', () => {
  let component: CheckoutOrderSummaryComponent;
  let fixture: ComponentFixture<CheckoutOrderSummaryComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          CheckoutOrderSummaryComponent,
          OrderSummaryComponent,
          PromotionsComponent,
          AppliedCouponsComponent,
          MockFeatureLevelDirective,
        ],
        providers: [
          { provide: ActiveCartService, useClass: MockActiveCartService },
          { provide: CartVoucherService, useValue: {} },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutOrderSummaryComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
