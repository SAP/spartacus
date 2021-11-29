import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CheckoutFacade } from '@spartacus/checkout/base/root';
import {
  FeaturesConfig,
  I18nTestingModule,
  OrderEntry,
  PromotionLocation,
} from '@spartacus/core';
import { PromotionsModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { CheckoutOrderConfirmationItemsComponent } from './checkout-order-confirmation-items.component';
import createSpy = jasmine.createSpy;

@Component({ selector: 'cx-cart-item-list', template: '' })
class MockReviewSubmitComponent {
  @Input() items: OrderEntry[];
  @Input() readonly: boolean;
  @Input() promotionLocation: PromotionLocation = PromotionLocation.Checkout;
}

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
        declarations: [
          CheckoutOrderConfirmationItemsComponent,
          MockReviewSubmitComponent,
        ],
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
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should display items', () => {
    const items = () => fixture.debugElement.query(By.css('cx-cart-item-list'));
    component.ngOnInit();
    fixture.detectChanges();
    expect(items()).toBeTruthy();
  });
});
