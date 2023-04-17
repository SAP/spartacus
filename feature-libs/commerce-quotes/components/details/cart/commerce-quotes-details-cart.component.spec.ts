import { TestBed } from '@angular/core/testing';
import { CommerceQuotesDetailsCartComponent } from './commerce-quotes-details-cart.component';
import { CommerceQuotesFacade } from '@spartacus/commerce-quotes/root';
import { MockCommerceQuotesFacade } from '../overview/commerce-quotes-details-overview.component.spec';

describe('CommerceQuotesDetailsCartComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [
        {
          provide: CommerceQuotesFacade,
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
