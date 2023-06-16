import { TestBed } from '@angular/core/testing';
import { QuoteDetailsCartComponent } from './quote-details-cart.component';
import { QuoteFacade } from '@spartacus/commerce-quotes/root';
import { MockQuoteFacade } from '../overview/quote-details-overview.component.spec';
import { I18nTestingModule } from '@spartacus/core';
import { IconTestingModule } from '@spartacus/storefront';

describe('QuoteDetailsCartComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, IconTestingModule],
      declarations: [QuoteDetailsCartComponent],
      providers: [
        {
          provide: QuoteFacade,
          useClass: MockQuoteFacade,
        },
      ],
    });
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(QuoteDetailsCartComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
