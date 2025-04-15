import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartItemContext } from '@spartacus/cart/base/root';
import { SubscriptionOrderConfirmationComponent } from './subscription-order-confirmation.component';
import { of } from 'rxjs';
import { RecurringCharge } from '@spartacus/subscription-billing/root';
import { OrderEntry } from '@spartacus/cart/base/root';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

class MockCartItemContext {
  item$ = of(mockOrderEntry);
}

const mockRecurringCharges: RecurringCharge[] = [
  { price: { formattedValue: '100 USD' } },
];

const mockOrderEntry: OrderEntry = {
  product: {
    productTypes: 'SUBSCRIPTION',
    code: 'Mobile_2020_Plan_cpq',
    name: 'Mobile 2020 Plan',
    sapPricePlan: {
      recurringCharges: mockRecurringCharges,
    },
    sapSubscriptionTerm: {
      billingPlan: {
        billingTime: { name: 'Monthly Payment' },
      },
    },
  },
  quantity: 1,
  totalPrice: { formattedValue: 'USD10.00', value: 10, currencyIso: 'USD' },
};

describe('SubscriptionOrderConfirmationComponent (Signals)', () => {
  let component: SubscriptionOrderConfirmationComponent;
  let fixture: ComponentFixture<SubscriptionOrderConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [SubscriptionOrderConfirmationComponent],
      providers: [{ provide: CartItemContext, useClass: MockCartItemContext }],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionOrderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return true for isSubscription when product type is SUBSCRIPTION', () => {
    expect(component.isSubscription()).toBeTruthy();
  });

  it('should return the correct recurring charges from signal', () => {
    expect(component.recurringCharges()).toEqual(mockRecurringCharges);
  });

  it('should return the correct billing time name', () => {
    expect(component.billingTimeName()).toEqual('Monthly Payment');
  });

  it('should render recurring charges in the template', () => {
    fixture.detectChanges();

    const recurringChargeElements = fixture.debugElement.queryAll(
      By.css('.subscription-recurringcharge')
    );
    expect(recurringChargeElements.length).toBe(1);

    const textContent =
      recurringChargeElements[0].nativeElement.textContent.trim();
    expect(textContent).toContain('Monthly Payment');
    expect(textContent).toContain('100 USD');
  });

  it('should not render charges if product type is not SUBSCRIPTION', () => {
    const notSubEntry: OrderEntry = {
      ...mockOrderEntry,
      product: { ...mockOrderEntry.product, productTypes: 'NON_SUB' },
    };

    (component as any).cartItemContext.item$ = of(notSubEntry);
    fixture = TestBed.createComponent(SubscriptionOrderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const chargeElements = fixture.debugElement.queryAll(
      By.css('.subscription-recurringcharge')
    );
    expect(chargeElements.length).toBe(0);
  });
});
