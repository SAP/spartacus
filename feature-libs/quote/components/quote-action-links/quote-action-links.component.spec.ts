import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, Price } from '@spartacus/core';
import { CartUtilsService } from '@spartacus/quote/core';
import {
  Quote,
  QuoteActionType,
  QuoteFacade,
  QuoteState,
} from '@spartacus/quote/root';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { BehaviorSubject, NEVER, Observable } from 'rxjs';
import { createEmptyQuote } from '../../core/testing/quote-test-utils';
import { CommonQuoteTestUtilsService } from '../testing/common-quote-test-utils.service';
import { QuoteActionLinksComponent } from './quote-action-links.component';
import createSpy = jasmine.createSpy;

class MockActionLinksService implements Partial<CartUtilsService> {
  goToNewCart = createSpy();
}

const mockRoutes = [{ path: 'cxRoute:quotes', component: {} }] as Routes;

const mockCartId = '1234';
const mockCode = '3333';
const threshold = 20;
const totalPrice: Price = { value: threshold + 1 };

const mockQuote: Quote = {
  ...createEmptyQuote(),
  allowedActions: [
    { type: QuoteActionType.EDIT, isPrimary: false },
    { type: QuoteActionType.REQUOTE, isPrimary: true },
  ],
  state: QuoteState.BUYER_DRAFT,
  cartId: mockCartId,
  code: mockCode,
  threshold: threshold,
  totalPrice: totalPrice,
};

const mockQuoteDetails$ = new BehaviorSubject<Quote>(mockQuote);

class MockCommerceQuotesFacade implements Partial<QuoteFacade> {
  getQuoteDetails(): Observable<Quote> {
    return mockQuoteDetails$.asObservable();
  }
}

describe('QuoteActionLinksComponent', () => {
  let fixture: ComponentFixture<QuoteActionLinksComponent>;
  let htmlElem: HTMLElement;
  let component: QuoteActionLinksComponent;
  let actionLinksService: CartUtilsService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        RouterTestingModule.withRoutes(mockRoutes),
        UrlTestingModule,
      ],
      declarations: [QuoteActionLinksComponent],
      providers: [
        {
          provide: QuoteFacade,
          useClass: MockCommerceQuotesFacade,
        },
        {
          provide: CartUtilsService,
          useClass: MockActionLinksService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteActionLinksComponent);
    htmlElem = fixture.nativeElement;
    actionLinksService = TestBed.inject(CartUtilsService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    mockQuoteDetails$.next(mockQuote);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render empty component', () => {
    fixture = TestBed.createComponent(QuoteActionLinksComponent);
    htmlElem = fixture.nativeElement;
    actionLinksService = TestBed.inject(CartUtilsService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    component.quoteDetails$ = NEVER;
    fixture.detectChanges();

    CommonQuoteTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'section'
    );
  });

  it('should render action links', () => {
    CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
      expect,
      htmlElem,
      'button.link',
      2
    );

    CommonQuoteTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      'button.link',
      'quote.links.newCart',
      0
    );

    CommonQuoteTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      'button.link',
      'quote.links.quotes',
      1
    );
  });

  it('should fire `goToNewCart()` when "New Cart" button was clicked', () => {
    spyOn(component, 'goToNewCart').and.callThrough();
    const link = CommonQuoteTestUtilsService.getHTMLElement(
      htmlElem,
      'button.link',
      0
    );
    link?.click();
    expect(component.goToNewCart).toHaveBeenCalled();
    expect(actionLinksService.goToNewCart).toHaveBeenCalled();
  });

  it('should redirect to Quotes list when "Quotes" button was clicked', fakeAsync(() => {
    fixture.detectChanges();
    const link = CommonQuoteTestUtilsService.getHTMLElement(
      htmlElem,
      'button.link',
      1
    );
    link?.click();
    tick();

    expect(router.url).toBe('/cxRoute:quotes');
  }));
});
