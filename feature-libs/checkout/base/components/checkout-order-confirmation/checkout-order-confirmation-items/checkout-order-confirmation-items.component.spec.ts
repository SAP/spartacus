import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CheckoutFacade } from '@spartacus/checkout/base/root';
import { FeaturesConfig, I18nTestingModule } from '@spartacus/core';
import { PromotionsModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { CheckoutOrderConfirmationItemsComponent } from './checkout-order-confirmation-items.component';
import createSpy = jasmine.createSpy;

class MockCheckoutService implements Partial<CheckoutFacade> {
  getOrder = createSpy().and.returnValue(
    of({
      entries: [
        {
          entryNumber: 1,
          quantity: 1,
        },
      ],
    })
  );
}

describe('CheckoutOrderConfirmationItemsComponent', () => {
  let component: CheckoutOrderConfirmationItemsComponent;
  let fixture: ComponentFixture<CheckoutOrderConfirmationItemsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, PromotionsModule],
        declarations: [CheckoutOrderConfirmationItemsComponent],
        providers: [
          { provide: CheckoutFacade, useClass: MockCheckoutService },
          {
            provide: FeaturesConfig,
            useValue: {
              features: { level: '1.3' },
            },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutOrderConfirmationItemsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
