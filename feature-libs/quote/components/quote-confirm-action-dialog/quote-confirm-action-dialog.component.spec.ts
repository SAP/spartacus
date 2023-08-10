import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, Directive, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  ICON_TYPE,
  LaunchDialogService,
  FocusConfig,
} from '@spartacus/storefront';
import { I18nTestingModule } from '@spartacus/core';
import { Quote, QuoteState } from '@spartacus/quote/root';
import { QuoteConfirmActionDialogComponent } from './quote-confirm-action-dialog.component';
import { ConfirmationContext } from './quote-confirm-action-dialog.model';

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

describe('QuoteRequestDialogComponent', () => {
  let component: QuoteConfirmActionDialogComponent;
  let fixture: ComponentFixture<QuoteConfirmActionDialogComponent>;
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
          QuoteConfirmActionDialogComponent,
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
    fixture = TestBed.createComponent(QuoteConfirmActionDialogComponent);
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
    fixture.debugElement
      .query(By.css('.btn-primary'))
      .triggerEventHandler('click');
    expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith('yes');
  });

  it('should close the dialog on no', () => {
    fixture.debugElement
      .query(By.css('.btn-secondary'))
      .triggerEventHandler('click');
    expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith('no');
  });

  it('should contain expected title', () => {
    const title = fixture.debugElement.query(By.css('.cx-dialog-title'));
    expect(title.nativeNode.innerText).toEqual(
      confirmationContext.title + ' code:' + QUOTE_CODE
    );
  });

  it('should contain expected quote name', () => {
    const quoteName = fixture.debugElement.query(
      By.css('.quote-name .content')
    );
    expect(quoteName.nativeNode.innerText.includes(quote.name)).toEqual(true);
  });

  it('should contain expected quote description', () => {
    const quotedescription = fixture.debugElement.query(
      By.css('.quote-description .content')
    );
    expect(
      quotedescription.nativeNode.innerText.includes(quote.description)
    ).toEqual(true);
  });

  it('should contain three notes', () => {
    const notes = fixture.debugElement.queryAll(By.css('.notes p'));
    expect(notes.length).toEqual(3);
  });
});
