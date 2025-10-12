import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCartPriceBodyComponent } from './subscription-cart-price-body.component';
import { of } from 'rxjs';
import { OutletContextData } from '@spartacus/storefront';
import { SubscriptionProductService } from '@spartacus/subscription-billing/core';

const mockSubscriptionProduct = {
  basePrice: { formattedValue: 'USD35.00', value: 0 },
  product: {
    code: 'Mobile_2020_Plan_cpq',
    name: 'Mobile 2020 Plan',
    productTypes: 'SUBSCRIPTION',
    sapPricePlan: {
      oneTimeCharges: [
        {
          price: {
            currencyIso: 'USD',
            formattedValue: 'USD13.00',
            priceType: 'BUY',
            value: 13,
          },
          billingTime: {
            name: 'Pay on Checkout',
            namePastTense: 'Paid on order',
          },
          name: '20200812b7d7b4c9-5e8f-4cd9-89ea-e9f9f584dfd9-paynow',
        },
      ],
      recurringCharges: [
        {
          price: {
            currencyIso: 'USD',
            formattedValue: 'USD49.00',
            priceType: 'BUY',
            value: 49,
          },
        },
      ],
    },
    sapSubscriptionTerm: {
      billingPlan: { billingTime: { name: 'monthly payment' } },
      minimumTerm: { frequency: { name: 'Month(s)' }, value: 6 },
    },
  },
};

const mockProduct = {
  basePrice: { formattedValue: 'USD45.00', value: 0 },
  product: {
    code: 'Drill_Machine',
    name: 'Drill Machine',
  },
};

class MockSubscriptionOutletContextData {
  contextData = {
    item: mockSubscriptionProduct,
    items: [mockSubscriptionProduct],
    parent: 'cart',
  };
  context$ = of(this.contextData);
}

class MockOutletContextData {
  contextData = {
    item: mockProduct,
    items: [mockProduct],
    parent: 'cart',
  };
  context$ = of(this.contextData);
}

describe('SubscriptionCartPriceBodyComponent', () => {
  let component: SubscriptionCartPriceBodyComponent;
  let fixture: ComponentFixture<SubscriptionCartPriceBodyComponent>;

  describe('with subscription product', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [],
        providers: [
          {
            provide: OutletContextData,
            useClass: MockSubscriptionOutletContextData,
          },
          SubscriptionProductService
        ],
        imports: [SubscriptionCartPriceBodyComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(SubscriptionCartPriceBodyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render subscription charges', () => {
      const compiled = fixture.nativeElement;
      const recurringChargesElement = compiled.querySelector(
        '.cx-recurring-charges'
      );
      const oneTimeChargesElement = compiled.querySelector(
        '.cx-one-time-charges'
      );
      expect(recurringChargesElement).toBeTruthy();
      expect(oneTimeChargesElement).toBeTruthy();
    });
  });

  describe('with physical product', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [],
        providers: [
          {
            provide: OutletContextData,
            useClass: MockOutletContextData,
          },
          SubscriptionProductService
        ],
        imports: [SubscriptionCartPriceBodyComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(SubscriptionCartPriceBodyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render base price', () => {
      const compiled = fixture.nativeElement;
      const recurringChargesElement = compiled.querySelector(
        '.cx-recurring-charges'
      );
      const oneTimeChargesElement = compiled.querySelector(
        '.cx-one-time-charges'
      );
      const basePriceElement = compiled.querySelector('.cx-value');
      expect(recurringChargesElement).toBeFalsy();
      expect(oneTimeChargesElement).toBeFalsy();
      expect(basePriceElement).toBeTruthy();
      expect(basePriceElement.textContent).toContain('USD45.00');
    });
  });
});
