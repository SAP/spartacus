import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { QuoteRequestQuoteButtonComponent } from './quote-request-quote-button.component';
import { QuoteFacade, Quote } from 'feature-libs/quote/root/public_api';
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
class MockQuoteFacade implements Partial<QuoteFacade> {
  createQuote = createSpy().and.returnValue(of(mockCreatedQuote));
}
describe('QuoteRequestQuoteButtonComponent', () => {
  let component: QuoteRequestQuoteButtonComponent;
  let fixture: ComponentFixture<QuoteRequestQuoteButtonComponent>;
  let quoteFacade: QuoteFacade;
  const mockRoutingService = jasmine.createSpyObj('RoutingService', ['go']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuoteRequestQuoteButtonComponent, MockUrlPipe],
      imports: [I18nTestingModule],
      providers: [
        {
          provide: QuoteFacade,
          useClass: MockQuoteFacade,
        },
        { provide: RoutingService, useValue: mockRoutingService },
      ],
    }).compileComponents();

    quoteFacade = TestBed.inject(QuoteFacade);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteRequestQuoteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call the goToQuoteDetails page when button clicked', () => {
    component.goToQuoteDetails();
    expect(quoteFacade.createQuote).toHaveBeenCalled();
    expect(mockRoutingService.go).toHaveBeenCalledWith({
      cxRoute: 'quoteDetails',
      params: { quoteId: quoteCode },
    });
  });
});
