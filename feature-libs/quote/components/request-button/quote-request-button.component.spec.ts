import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { Quote, QuoteFacade } from '@spartacus/quote/root';
import { of } from 'rxjs';
import { createEmptyQuote } from '../../core/testing/quote-test-utils';
import { QuoteRequestButtonComponent } from './quote-request-button.component';
import createSpy = jasmine.createSpy;

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}
const quoteCode = 'quote1';
const mockCreatedQuote: Quote = {
  ...createEmptyQuote(),
  allowedActions: [],
  code: quoteCode,
};
class MockQuoteFacade implements Partial<QuoteFacade> {
  createQuote = createSpy().and.returnValue(of(mockCreatedQuote));
}
describe('QuoteRequestButtonComponent', () => {
  let fixture: ComponentFixture<QuoteRequestButtonComponent>;
  let component: QuoteRequestButtonComponent;
  let quoteFacade: QuoteFacade;
  const mockRoutingService = jasmine.createSpyObj('RoutingService', ['go']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuoteRequestButtonComponent, MockUrlPipe],
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
    fixture = TestBed.createComponent(QuoteRequestButtonComponent);
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
