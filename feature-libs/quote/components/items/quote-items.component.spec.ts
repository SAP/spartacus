import { Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AbstractOrderContextModule } from '@spartacus/cart/base/components';
import { AbstractOrderType } from '@spartacus/cart/base/root';
import { EventService, I18nTestingModule } from '@spartacus/core';
import { Quote } from '@spartacus/quote/root';
import { IconTestingModule, OutletDirective } from '@spartacus/storefront';
import { EMPTY, NEVER, of } from 'rxjs';
import { createEmptyQuote } from '../../core/testing/quote-test-utils';
import { CommonQuoteTestUtilsService } from '../testing/common-quote-test-utils.service';
import { QuoteItemsComponent } from './quote-items.component';
import { QuoteItemsComponentService } from './quote-items.component.service';

@Directive({
  selector: '[cxOutlet]',
})
class MockOutletDirective implements Partial<OutletDirective> {
  @Input() cxOutlet: string;
  @Input() cxOutletContext: string;
}
const quote: Quote = {
  ...createEmptyQuote(),
};

describe('QuoteItemsComponent', () => {
  let fixture: ComponentFixture<QuoteItemsComponent>;
  let htmlElem: HTMLElement;
  let component: QuoteItemsComponent;
  let eventService: EventService;
  let quoteItemsComponentService: QuoteItemsComponentService;

  beforeEach(
    waitForAsync(() => {
      initMocks();
      TestBed.configureTestingModule({
        imports: [
          I18nTestingModule,
          IconTestingModule,
          AbstractOrderContextModule,
        ],
        declarations: [QuoteItemsComponent, MockOutletDirective],
        providers: [
          {
            provide: EventService,
            useValue: eventService,
          },
          {
            provide: QuoteItemsComponentService,
            useValue: quoteItemsComponentService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteItemsComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    component.showCart$ = of(true);
    fixture.detectChanges();
  });

  function initMocks() {
    eventService = jasmine.createSpyObj('EventService', ['get', 'dispatch']);
    quoteItemsComponentService = jasmine.createSpyObj(
      'QuoteItemsComponentService',
      [
        'setQuoteEntriesExpanded',
        'getQuoteEntriesExpanded',
        'retrieveQuoteEntries',
      ]
    );
    asSpy(eventService.get).and.returnValue(EMPTY);
    asSpy(quoteItemsComponentService.getQuoteEntriesExpanded).and.returnValue(
      true
    );
    asSpy(quoteItemsComponentService.retrieveQuoteEntries).and.returnValue(
      of({
        entries: quote.entries,
        readOnly: true,
        abstractOrderType: AbstractOrderType.QUOTE,
        abstractOrderId: quote.code,
      })
    );
  }

  function asSpy(f: any) {
    return <jasmine.Spy>f;
  }

  describe('Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Ghost animation', () => {
    it('should not be present in case quote items data is provided', () => {
      CommonQuoteTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-ghost-table-header'
      );
    });

    it('should render view for ghost animation', () => {
      component.quoteItemsData$ = NEVER;
      fixture.detectChanges();
      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-table-header'
      );

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-title'
      );

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-table'
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-row',
        5
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-image-container',
        5
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-image',
        5
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-container',
        5
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-info-container',
        5
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-info',
        20
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-qty',
        5
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-total',
        5
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-action',
        5
      );
    });
  });

  describe('onToggleShowOrHideCart', () => {
    it('should call quoteItemsComponentService correctly if argument is true', () => {
      component.onToggleShowOrHideCart(true);
      expect(
        quoteItemsComponentService.setQuoteEntriesExpanded
      ).toHaveBeenCalledWith(false);
    });

    it('should call quoteItemsComponentService correctly if argument is false', () => {
      component.onToggleShowOrHideCart(false);
      expect(
        quoteItemsComponentService.setQuoteEntriesExpanded
      ).toHaveBeenCalledWith(true);
    });
  });

  it('should display CARET_UP per default', () => {
    CommonQuoteTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      'cx-icon',
      'CARET_UP'
    );
  });

  it('should display CARET_DOWN when collapsed', () => {
    component.showCart$ = of(false);
    fixture.detectChanges();
    CommonQuoteTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      'cx-icon',
      'CARET_DOWN'
    );
  });

  it('should toggle quote entries on enter', () => {
    CommonQuoteTestUtilsService.clickToggle(htmlElem, true);
    fixture.detectChanges();
    expect(
      quoteItemsComponentService.setQuoteEntriesExpanded
    ).toHaveBeenCalledWith(false);
  });

  it('should toggle quote entries on click', () => {
    component.showCart$ = of(false);
    fixture.detectChanges();
    CommonQuoteTestUtilsService.clickToggle(htmlElem, false);
    fixture.detectChanges();
    expect(
      quoteItemsComponentService.setQuoteEntriesExpanded
    ).toHaveBeenCalledWith(true);
  });

  describe('Accessibility', () => {
    it("should contain 'div' HTML element with 'role' attribute that indicates the role for this element", () => {
      const element =
        CommonQuoteTestUtilsService.getElementByClassNameOrTreeOrder(
          htmlElem,
          'div',
          '',
          0
        );

      CommonQuoteTestUtilsService.expectElementContainsA11y(
        expect,
        element,
        'role',
        'region'
      );
    });

    it("should contain 'div' HTML element with 'aria-label' attribute that indicates the text for this element", () => {
      const element =
        CommonQuoteTestUtilsService.getElementByClassNameOrTreeOrder(
          htmlElem,
          'div',
          '',
          0
        );

      CommonQuoteTestUtilsService.expectElementContainsA11y(
        expect,
        element,
        'aria-label',
        'quote.items.regionTitle'
      );
    });
  });
});
