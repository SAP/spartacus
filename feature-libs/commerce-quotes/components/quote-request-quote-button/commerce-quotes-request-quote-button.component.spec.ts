import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { CommerceQuotesRequestQuoteButtonComponent } from './commerce-quotes-request-quote-button.component';
import { QuoteFacade, Quote } from '@spartacus/commerce-quotes/root';
import createSpy = jasmine.createSpy;
import { of } from 'rxjs';

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}
const quoteCode = 'quote1';
const mockCreatedQuote: Quote = {
  allowedActions: [],
  code: quoteCode,
};
class MockCommerceQuotesFacade implements Partial<QuoteFacade> {
  createQuote = createSpy().and.returnValue(of(mockCreatedQuote));
}
describe('CommerceQuotesRequestQuoteButtonComponent', () => {
  let component: CommerceQuotesRequestQuoteButtonComponent;
  let fixture: ComponentFixture<CommerceQuotesRequestQuoteButtonComponent>;
  let commerceQuotesService: QuoteFacade;
  const mockRoutingService = jasmine.createSpyObj('RoutingService', ['go']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommerceQuotesRequestQuoteButtonComponent, MockUrlPipe],
      imports: [I18nTestingModule],
      providers: [
        {
          provide: QuoteFacade,
          useClass: MockCommerceQuotesFacade,
        },
        { provide: RoutingService, useValue: mockRoutingService },
      ],
    }).compileComponents();

    commerceQuotesService = TestBed.inject(QuoteFacade);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CommerceQuotesRequestQuoteButtonComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call the goToQuoteDetails page when button clicked', () => {
    component.goToQuoteDetails();
    expect(commerceQuotesService.createQuote).toHaveBeenCalled();
    expect(mockRoutingService.go).toHaveBeenCalledWith({
      cxRoute: 'quoteDetails',
      params: { quoteId: quoteCode },
    });
  });
});
