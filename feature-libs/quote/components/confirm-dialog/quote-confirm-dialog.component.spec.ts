import { Component, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  CxDatePipe,
  I18nTestingModule,
  LanguageService,
} from '@spartacus/core';
import { Quote, QuoteState } from '@spartacus/quote/root';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CommonQuoteTestUtilsService } from '../testing/common-quote-test-utils.service';
import { QuoteConfirmDialogComponent } from './quote-confirm-dialog.component';
import { ConfirmationContext } from './quote-confirm-dialog.model';

const QUOTE_CODE = '00010000';
const quote: Quote = {
  code: QUOTE_CODE,
  name: 'Quote name',
  state: QuoteState.BUYER_OFFER,
  allowedActions: [],
  totalPrice: {},
  description: 'Quote description',
  expirationTime: new Date('2017-01-11T10:14:39+0000'),
  isEditable: true,
};

const confirmationContext: ConfirmationContext = {
  quote: quote,
  title: 'confirmActionDialog.buyer_offer.edit.title',
  confirmNote: 'confirmActionDialog.buyer_offer.edit.confirmNote',
  warningNote: 'confirmActionDialog.buyer_offer.edit.warningNote',
  validity: 'confirmActionDialog.validity',
  a11y: {
    close: 'confirmActionDialog.buyer_offer.edit.a11y.close',
  },
};

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Directive({
  selector: '[cxFocus]',
})
export class MockKeyboardFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
}

class MockLanguageService {
  getActive(): Observable<string> {
    return of('en-US');
  }
}

describe('QuoteConfirmDialogComponent', () => {
  let component: QuoteConfirmDialogComponent;
  let fixture: ComponentFixture<QuoteConfirmDialogComponent>;
  let htmlElem: HTMLElement;
  let launchDialogService: LaunchDialogService;
  let cxDatePipe: CxDatePipe;

  let dialogDataSender: BehaviorSubject<{
    confirmationContext: ConfirmationContext;
  }>;

  class MockLaunchDialogService {
    closeDialog(): void {}

    data$ = dialogDataSender;
  }

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          QuoteConfirmDialogComponent,
          MockKeyboardFocusDirective,
          MockCxIconComponent,
        ],
        providers: [
          CxDatePipe,
          {
            provide: LaunchDialogService,
            useClass: MockLaunchDialogService,
          },
          { provide: LanguageService, useClass: MockLanguageService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    dialogDataSender = new BehaviorSubject({
      confirmationContext: confirmationContext,
    });
    fixture = TestBed.createComponent(QuoteConfirmDialogComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    launchDialogService = TestBed.inject(LaunchDialogService);
    cxDatePipe = TestBed.inject(CxDatePipe);
    spyOn(launchDialogService, 'closeDialog');
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog on yes', () => {
    const primaryButton = CommonQuoteTestUtilsService.getHTMLElement(
      htmlElem,
      'button.btn-primary'
    );
    primaryButton.click();
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith('yes');
  });

  it('should close the dialog on no', () => {
    const secondaryButton = CommonQuoteTestUtilsService.getHTMLElement(
      htmlElem,
      'button.btn-secondary'
    );
    secondaryButton.click();
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith('no');
  });

  it('should contain expected title', () => {
    CommonQuoteTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-dialog-title',
      confirmationContext.title + ' code:' + QUOTE_CODE
    );
  });

  it('should contain expected quote name', () => {
    CommonQuoteTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-name .cx-content',
      quote.name
    );
  });

  it('should contain expected quote description', () => {
    CommonQuoteTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-description .cx-content',
      quote.description
    );
  });

  it('should contain three notes', () => {
    CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
      expect,
      htmlElem,
      '.cx-notes-container p',
      3
    );
  });

  it('should navigate back on escape', () => {
    const modal = CommonQuoteTestUtilsService.getHTMLElement(
      htmlElem,
      '.cx-modal-container'
    );
    modal.dispatchEvent(new Event('esc'));
    expect(launchDialogService.closeDialog).toHaveBeenCalled();
  });

  describe('isNotEmpty', () => {
    it('should return "false" because string is null', () => {
      expect(component['isNotEmpty'](null)).toBe(false);
    });

    it('should return "false" because string is undefined', () => {
      expect(component['isNotEmpty'](undefined)).toBe(false);
    });

    it('should return "false" because string is an empty string', () => {
      expect(component['isNotEmpty']('')).toBe(false);
    });

    it('should return "false" because string contains blank characters', () => {
      expect(component['isNotEmpty']('  ')).toBe(false);
    });

    it('should return "true" because string contains something', () => {
      expect(component['isNotEmpty']('test')).toBe(true);
    });
  });

  describe('getA11yModalText', () => {
    it('should return only a confirmation note', () => {
      const context = structuredClone(confirmationContext);
      context.warningNote = null;
      context.validity = null;
      context.quote.expirationTime = null;

      expect(component.getA11yModalText(context)).toEqual(
        confirmationContext.confirmNote
      );
    });

    it('should return a warning note with a confirmation note', () => {
      const context = structuredClone(confirmationContext);
      context.validity = null;
      context.quote.expirationTime = null;
      const a11yModalText =
        confirmationContext.warningNote + confirmationContext.confirmNote;

      expect(component.getA11yModalText(context)).toEqual(a11yModalText);
    });

    it('should return a validity with date and a confirmation note', () => {
      const context = structuredClone(confirmationContext);
      context.warningNote = null;
      const expirationTime = cxDatePipe.transform(
        confirmationContext.quote.expirationTime
      );
      const a11yModalText =
        confirmationContext.validity +
        expirationTime +
        confirmationContext.confirmNote;

      expect(component.getA11yModalText(context)).toEqual(a11yModalText);
    });

    it('should return a complete a11y relevant information', () => {
      const context = structuredClone(confirmationContext);
      const expirationTime = cxDatePipe.transform(
        confirmationContext.quote.expirationTime
      );
      const a11yModalText =
        confirmationContext.warningNote +
        confirmationContext.validity +
        expirationTime +
        confirmationContext.confirmNote;

      expect(component.getA11yModalText(context)).toEqual(a11yModalText);
    });
  });

  describe('Accessibility', () => {
    it("should contain action button element with class name 'close' and 'aria-label' attribute that indicates the text for close button", () => {
      const element =
        CommonQuoteTestUtilsService.getElementByClassNameOrTreeOrder(
          htmlElem,
          'button',
          'close',
          0
        );

      CommonQuoteTestUtilsService.expectElementContainsA11y(
        expect,
        element,
        'aria-label',
        'confirmActionDialog.buyer_offer.edit.a11y.close'
      );
    });

    it("should contain div element with class name 'cx-visually-hidden' and 'aria-live' attribute that indicates that the appeared modal requires the user's attention", () => {
      const element =
        CommonQuoteTestUtilsService.getElementByClassNameOrTreeOrder(
          htmlElem,
          'div',
          'cx-visually-hidden',
          0
        );

      CommonQuoteTestUtilsService.expectElementContainsA11y(
        expect,
        element,
        'aria-live',
        'polite'
      );
    });

    it("should contain div element with class name 'cx-visually-hidden' and 'role' attribute that indicates that the appeared modal requires the user's attention", () => {
      const element =
        CommonQuoteTestUtilsService.getElementByClassNameOrTreeOrder(
          htmlElem,
          'div',
          'cx-visually-hidden',
          0
        );

      CommonQuoteTestUtilsService.expectElementContainsA11y(
        expect,
        element,
        'role',
        'alert'
      );
    });

    it("should contain action div element with class name 'cx-visually-hidden' and 'aria-atomic' attribute that indicates whether a screen reader will present all changed region", () => {
      const element =
        CommonQuoteTestUtilsService.getElementByClassNameOrTreeOrder(
          htmlElem,
          'div',
          'cx-visually-hidden',
          0
        );

      CommonQuoteTestUtilsService.expectElementContainsA11y(
        expect,
        element,
        'aria-atomic',
        'true'
      );
    });

    it('should contain a explanatory text that is seen only for a screen reader and explains that the conflicts must be resolved to continue', () => {
      const expirationTime = cxDatePipe.transform(
        confirmationContext.quote.expirationTime
      );
      const a11yModalText =
        confirmationContext.warningNote +
        confirmationContext.validity +
        expirationTime +
        confirmationContext.confirmNote;

      CommonQuoteTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'div.cx-visually-hidden',
        a11yModalText
      );
    });

    it("should contain 'role' and 'aria-modal' attributes that indicate that the appeared pop-up is a modal dialog", () => {
      const element =
        CommonQuoteTestUtilsService.getElementByClassNameOrTreeOrder(
          htmlElem,
          'div',
          'cx-modal-container',
          0
        );

      CommonQuoteTestUtilsService.expectElementContainsA11y(
        expect,
        element,
        'role',
        'dialog'
      );

      CommonQuoteTestUtilsService.expectElementContainsA11y(
        expect,
        element,
        'aria-modal',
        'true'
      );
    });
  });
});
