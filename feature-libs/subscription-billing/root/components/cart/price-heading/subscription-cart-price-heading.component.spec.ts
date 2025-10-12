import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionCartPriceHeadingComponent } from './subscription-cart-price-heading.component';
import { TranslationService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OutletContextData } from '@spartacus/storefront';

export const mockSubscriptionProduct = {
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
    return of('');
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
describe('SubscriptionCartPriceHeadingComponent', () => {
  let component: SubscriptionCartPriceHeadingComponent;
  let fixture: ComponentFixture<SubscriptionCartPriceHeadingComponent>;

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
});
