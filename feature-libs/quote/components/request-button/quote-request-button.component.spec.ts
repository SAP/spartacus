import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AuthService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { Quote, QuoteFacade } from '@spartacus/quote/root';
import { BehaviorSubject, Observable, of } from 'rxjs';
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

const loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return loggedIn.asObservable();
  }
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
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        { provide: RoutingService, useValue: mockRoutingService },
      ],
    }).compileComponents();

    quoteFacade = TestBed.inject(QuoteFacade);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteRequestButtonComponent);
    component = fixture.componentInstance;
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
  it('should render button in case user is logged in', () => {
    loggedIn.next(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button')).not.toBe(null);
  });
  it('should not render button in case user is anonymous', () => {
    loggedIn.next(false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button')).toBe(null);
  });
});
