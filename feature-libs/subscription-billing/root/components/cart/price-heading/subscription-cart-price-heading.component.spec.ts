import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionCartPriceHeadingComponent } from './subscription-cart-price-heading.component';
import { TranslationService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OutletContextData } from '@spartacus/storefront';

const mockSubscriptionProduct = {
  basePrice: { formattedValue: 'USD35.00', value: 0 },
  product: {
    code: 'Mobile_2020_Plan_cpq',
    name: 'Mobile 2020 Plan',
    productTypes: 'SUBSCRIPTION',
  },
};

class MockTranslateService implements Partial<TranslationService> {
  translate(
    _key: string | string[],
    _options?: any,
    _whitespaceUntilLoaded?: boolean
  ): Observable<string> {
    return of('Item Price');
  }
}
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
    items: [{}],
    parent: 'cart',
  };
  context$ = of(this.contextData);
}

class MockEmptyContextData {
  context$ = undefined;
}
describe('SubscriptionCartPriceHeadingComponent', () => {
  let component: SubscriptionCartPriceHeadingComponent;
  let fixture: ComponentFixture<SubscriptionCartPriceHeadingComponent>;

  describe('with subscription product', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SubscriptionCartPriceHeadingComponent],
        providers: [
          { provide: TranslationService, useClass: MockTranslateService },
          {
            provide: OutletContextData,
            useClass: MockSubscriptionOutletContextData,
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(SubscriptionCartPriceHeadingComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render item price heading', () => {
      const compiled = fixture.nativeElement;
      const itemPriceHeading = compiled.querySelector('th span');
      expect(itemPriceHeading).toBeTruthy();
      expect(itemPriceHeading.textContent).toContain('Item Price');
    });
  });

  describe('with empty cart', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SubscriptionCartPriceHeadingComponent],
        providers: [
          { provide: TranslationService, useClass: MockTranslateService },
          {
            provide: OutletContextData,
            useClass: MockOutletContextData,
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(SubscriptionCartPriceHeadingComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should not render item price heading', () => {
      const compiled = fixture.nativeElement;
      const itemPriceHeading = compiled.querySelector('th span');
      expect(component.subscriptionItem()).toBeUndefined();
      expect(itemPriceHeading).toBeFalsy();
    });
  });

  describe('with empty context data', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SubscriptionCartPriceHeadingComponent],
        providers: [
          { provide: TranslationService, useClass: MockTranslateService },
          {
            provide: OutletContextData,
            useClass: MockEmptyContextData,
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(SubscriptionCartPriceHeadingComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should not render item price heading', () => {
      expect(component.cartItems()).toBeUndefined();
    });
  });
});
