import { Component, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Quote, QuoteState } from '@spartacus/quote/root';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { CommonQuoteTestUtilsService } from '../../testing/common-quote-test-utils.service';
import { QuoteActionsConfirmDialogComponent } from './quote-actions-confirm-dialog.component';
import { ConfirmationContext } from './quote-actions-confirm-dialog.model';

const QUOTE_CODE = '00010000';
const quote: Quote = {
  code: QUOTE_CODE,
  name: 'Quote name',
  state: QuoteState.BUYER_OFFER,
  allowedActions: [],
  totalPrice: {},
  description: 'Quote description',
  expirationTime: new Date('2023-05-26'),
  isEditable: true,
};

const confirmationContext: ConfirmationContext = {
  quote: quote,
  title: 'confirmActionDialog.buyer_offer.edit.title',
  confirmNote: 'confirmActionDialog.buyer_offer.edit.confirmNote',
  warningNote: 'confirmActionDialog.buyer_offer.edit.warningNote',
  validity: 'confirmActionDialog.validity',
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
export class MockKeyboadFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
}

describe('QuoteActionsConfirmDialogComponent', () => {
  let component: QuoteActionsConfirmDialogComponent;
  let fixture: ComponentFixture<QuoteActionsConfirmDialogComponent>;
  let htmlElem: HTMLElement;
  let mockLaunchDialogService: LaunchDialogService;

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
        declarations: [
          QuoteActionsConfirmDialogComponent,
          MockKeyboadFocusDirective,
          MockCxIconComponent,
        ],
        imports: [I18nTestingModule],
        providers: [
          {
            provide: LaunchDialogService,
            useClass: MockLaunchDialogService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    dialogDataSender = new BehaviorSubject({
      confirmationContext: confirmationContext,
    });
    fixture = TestBed.createComponent(QuoteActionsConfirmDialogComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    mockLaunchDialogService = TestBed.inject(LaunchDialogService);
    spyOn(mockLaunchDialogService, 'closeDialog');
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
    expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith('yes');
  });

  it('should close the dialog on no', () => {
    const secondaryButton = CommonQuoteTestUtilsService.getHTMLElement(
      htmlElem,
      'button.btn-secondary'
    );
    secondaryButton.click();
    expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith('no');
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
    expect(mockLaunchDialogService.closeDialog).toHaveBeenCalled();
  });
});
