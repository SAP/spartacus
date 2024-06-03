import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  EventService,
  I18nTestingModule,
  Price,
  FeatureConfigService,
} from '@spartacus/core';
import {
  CartUtilsService,
  QuoteDetailsReloadQueryEvent,
} from '@spartacus/quote/core';
import {
  Quote,
  QuoteActionType,
  QuoteFacade,
  QuoteState,
} from '@spartacus/quote/root';
import { FileDownloadService } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { BehaviorSubject, NEVER, Observable, of } from 'rxjs';
import { createEmptyQuote } from '../../core/testing/quote-test-utils';
import { CommonQuoteTestUtilsService } from '../testing/common-quote-test-utils.service';
import { QuoteLinksComponent } from './quote-links.component';
import createSpy = jasmine.createSpy;

class MockCartUtilsService implements Partial<CartUtilsService> {
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

const mockQuoteAttachment = (): File => {
  const blob = new Blob([''], { type: 'application/pdf' });
  return blob as File;
};

const mockQuoteDetails$ = new BehaviorSubject<Quote>(mockQuote);

class MockCommerceQuotesFacade implements Partial<QuoteFacade> {
  getQuoteDetails(): Observable<Quote> {
    return mockQuoteDetails$.asObservable();
  }

  downloadAttachment(
    _quoteCode: string,
    _attachmentId: string
  ): Observable<Blob> {
    return of(mockQuoteAttachment());
  }
}

class MockFileDownloadService {
  download(_url: string, _fileName?: string): void {}
}

class MockFeatureConfigService {
  isEnabled(_feature: string): boolean {
    return true;
  }
}

describe('QuoteLinksComponent', () => {
  let fixture: ComponentFixture<QuoteLinksComponent>;
  let htmlElem: HTMLElement;
  let component: QuoteLinksComponent;
  let cartUtilsService: CartUtilsService;
  let router: Router;
  let eventService: EventService;
  let quoteFacade: QuoteFacade;
  let fileDownloadService: FileDownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        RouterTestingModule.withRoutes(mockRoutes),
        UrlTestingModule,
      ],
      declarations: [QuoteLinksComponent],
      providers: [
        {
          provide: QuoteFacade,
          useClass: MockCommerceQuotesFacade,
        },
        {
          provide: CartUtilsService,
          useClass: MockCartUtilsService,
        },
        {
          provide: FileDownloadService,
          useClass: MockFileDownloadService,
        },
        {
          provide: FeatureConfigService,
          useClass: MockFeatureConfigService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteLinksComponent);
    htmlElem = fixture.nativeElement;
    cartUtilsService = TestBed.inject(CartUtilsService);
    eventService = TestBed.inject(EventService);
    router = TestBed.inject(Router);
    quoteFacade = TestBed.inject(QuoteFacade);
    fileDownloadService = TestBed.inject(FileDownloadService);
    component = fixture.componentInstance;
    mockQuoteDetails$.next(mockQuote);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render empty component', () => {
    fixture = TestBed.createComponent(QuoteLinksComponent);
    htmlElem = fixture.nativeElement;
    cartUtilsService = TestBed.inject(CartUtilsService);
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
      'a.link',
      2
    );

    CommonQuoteTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      'a.link',
      'quote.links.newCart',
      0
    );

    CommonQuoteTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      'a.link',
      'quote.links.quotes',
      1
    );
  });

  it('should fire `goToNewCart()` when "New Cart" button was clicked', () => {
    spyOn(eventService, 'dispatch').and.callThrough();
    const link = CommonQuoteTestUtilsService.getHTMLElement(
      htmlElem,
      'a.link',
      0
    );
    link.click();
    expect(cartUtilsService.goToNewCart).toHaveBeenCalled();
    expect(eventService.dispatch).toHaveBeenCalledWith(
      {},
      QuoteDetailsReloadQueryEvent
    );
  });

  it('should redirect to Quotes list when "Quotes" button was clicked', fakeAsync(() => {
    fixture.detectChanges();
    const link = CommonQuoteTestUtilsService.getHTMLElement(
      htmlElem,
      'a.link',
      1
    );
    link.click();
    tick();

    expect(router.url).toBe('/cxRoute:quotes');
  }));

  describe('Download proposal document', () => {
    const vendorQuote: Quote = {
      ...mockQuote,
      sapAttachments: [
        {
          id: mockQuote.code,
        },
      ],
    };

    it('should display download button if there is a proposal document attached to the quote', () => {
      mockQuoteDetails$.next(vendorQuote);
      fixture.detectChanges();
      const buttonContainerSection = CommonQuoteTestUtilsService.getHTMLElement(
        htmlElem,
        'section'
      );
      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        buttonContainerSection,
        'button'
      );
      CommonQuoteTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'button',
        'download'
      );
    });

    it('should not display download button if there is no proposal document attached to the quote', () => {
      mockQuoteDetails$.next(mockQuote);
      fixture.detectChanges();
      const buttonContainerSection = CommonQuoteTestUtilsService.getHTMLElement(
        htmlElem,
        'section'
      );
      CommonQuoteTestUtilsService.expectElementNotPresent(
        expect,
        buttonContainerSection,
        'button'
      );
    });

    it('should download the proposal document attached when Download button is clicked', () => {
      const spyDownloadAttachment = spyOn(
        quoteFacade,
        'downloadAttachment'
      ).and.returnValue(of(mockQuoteAttachment()));
      const spyDownload = spyOn(fileDownloadService, 'download');
      mockQuoteDetails$.next(vendorQuote);
      fixture.detectChanges();
      const downloadBtn = CommonQuoteTestUtilsService.getHTMLElement(
        htmlElem,
        'button'
      );
      downloadBtn.click();
      fixture.detectChanges();
      expect(spyDownloadAttachment).toHaveBeenCalledWith(
        vendorQuote.code,
        vendorQuote.code
      );
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(spyDownload).toHaveBeenCalled();
      });
    });
  });
});
