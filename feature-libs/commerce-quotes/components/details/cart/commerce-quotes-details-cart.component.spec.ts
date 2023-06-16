import { TestBed } from '@angular/core/testing';
import { CommerceQuotesDetailsCartComponent } from './commerce-quotes-details-cart.component';
import { QuoteFacade } from '@spartacus/commerce-quotes/root';
import { MockCommerceQuotesFacade } from '../overview/commerce-quotes-details-overview.component.spec';
import { I18nTestingModule } from '@spartacus/core';
import { IconTestingModule } from '@spartacus/storefront';

describe('CommerceQuotesDetailsCartComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, IconTestingModule],
      declarations: [CommerceQuotesDetailsCartComponent],
      providers: [
        {
          provide: QuoteFacade,
          useClass: MockCommerceQuotesFacade,
        },
      ],
    });
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CommerceQuotesDetailsCartComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
