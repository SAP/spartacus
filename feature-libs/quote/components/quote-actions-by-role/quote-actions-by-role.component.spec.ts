import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  Price,
  TranslationService,
} from '@spartacus/core';
import {
  Quote,
  QuoteActionType,
  QuoteFacade,
  QuoteState,
} from '@spartacus/quote/root';

import { ElementRef, ViewContainerRef } from '@angular/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { createEmptyQuote } from '../../core/testing/quote-test-utils';
import { QuoteActionsByRoleComponent } from './quote-actions-by-role.component';
import createSpy = jasmine.createSpy;
import { ConfirmationContext } from '../quote-confirm-action-dialog/quote-confirm-action-dialog.model';

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

let dialogClose$: BehaviorSubject<any | undefined>;
class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(reason: any): void {
    dialogClose$.next(reason);
  }
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef,
    _data?: any
  ) {
    return of();
  }
  get dialogClose() {
    return dialogClose$.asObservable();
  }
}

class MockCommerceQuotesFacade implements Partial<QuoteFacade> {
  getQuoteDetails(): Observable<Quote> {
    return mockQuoteDetails$.asObservable();
  }
  performQuoteAction(
    _quoteCode: string,
    _quoteAction: QuoteActionType
  ): Observable<unknown> {
    return EMPTY;
  }
  requote = createSpy();
}

class MockTranslationService implements Partial<TranslationService> {
  translate(key: string): Observable<string> {
    return of(key);
  }
}

class MockGlobalMessageService {
  add(): void {}
}

describe('QuoteActionsByRoleComponent', () => {
  let fixture: ComponentFixture<QuoteActionsByRoleComponent>;
  let component: QuoteActionsByRoleComponent;
  let launchDialogService: LaunchDialogService;
  let facade: QuoteFacade;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [QuoteActionsByRoleComponent],
      providers: [
        {
          provide: QuoteFacade,
          useClass: MockCommerceQuotesFacade,
        },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteActionsByRoleComponent);
    component = fixture.componentInstance;
    launchDialogService = TestBed.inject(LaunchDialogService);
    facade = TestBed.inject(QuoteFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
    mockQuoteDetails$.next(mockQuote);
    dialogClose$ = new BehaviorSubject<any | undefined>(undefined);
  });

  it('should create component', () => {
    expect(component).toBeDefined();
    expect(facade).toBeDefined();
  });

  it('should read quote details state', (done) => {
    component.quoteDetails$.pipe(take(1)).subscribe((state) => {
      expect(state).toEqual(mockQuote);
      done();
    });
  });

  // it('should read quote details and return original data if state or allower actions are not present', (done) => {
  //   const mockQuoteDetailseWithoutState: Quote = {
  //     code: mockCode,
  //     cartId: mockCartId,
  //     allowedActions: [QuoteActionType.EDIT, QuoteActionType.REQUOTE],
  //   };
  //   const expected: QueryState<Quote> = {
  //     error: false,
  //     loading: false,
  //     data: mockQuoteDetailseWithoutState,
  //   };
  //   mockQuoteDetailsState$.next(expected);

  //   component.quoteDetailsState$.pipe(take(1)).subscribe((state) => {
  //     expect(state).toEqual(expected);
  //     done();
  //   });
  // });

  // it('should return list if commerce quotes config or actions order is not present', () => {
  //   Object.defineProperty(configService, 'config', {
  //     value: {
  //       commerceQuotes: null,
  //     },
  //   });
  //   expect(
  //     component['getOrderedList'](
  //       QuoteState.BUYER_DRAFT,
  //       mockQuote.allowedActions as QuoteActionType[]
  //     )
  //   ).toEqual(mockQuote.allowedActions);

  //   Object.defineProperty(configService, 'config', {
  //     value: {
  //       commerceQuotes: { actionsOrderByState: null },
  //     },
  //   });
  //   expect(
  //     component['getOrderedList'](
  //       QuoteState.BUYER_DRAFT,
  //       mockQuote.allowedActions as QuoteActionType[]
  //     )
  //   ).toEqual(mockQuote.allowedActions);
  // });

  // it('should return empty array if commerce quotes config is not set', () => {
  //   Object.defineProperty(configService, 'config', {
  //     value: {
  //       commerceQuotes: null,
  //     },
  //   });
  //   fixture = TestBed.createComponent(QuoteActionsByRoleComponent);
  //   component = fixture.componentInstance;

  //   expect(component.primaryActions).toEqual([]);
  // });

  it('should open confirmation dialog when action is SUBMIT', () => {
    spyOn(launchDialogService, 'openDialog');
    const newMockQuoteWithSubmitAction: Quote = {
      ...mockQuote,
      allowedActions: [
        { type: QuoteActionType.SUBMIT, isPrimary: true },
        { type: QuoteActionType.CANCEL, isPrimary: false },
      ],
    };
    const confirmationContextForSubmitAction: ConfirmationContext = {
      quote: newMockQuoteWithSubmitAction,
      title: 'quote.confirmActionDialog.buyer.submit.title',
      confirmNote: 'quote.confirmActionDialog.buyer.submit.confirmNote',
      successMessage: 'quote.confirmActionDialog.buyer.submit.successMessage',
    };
    mockQuoteDetails$.next(newMockQuoteWithSubmitAction);
    fixture.detectChanges();
    component.onClick(QuoteActionType.SUBMIT, newMockQuoteWithSubmitAction);
    expect(launchDialogService.openDialog).toHaveBeenCalledWith(
      LAUNCH_CALLER.ACTION_CONFIRMATION,
      component.element,
      component['viewContainerRef'],
      { confirmationContext: confirmationContextForSubmitAction }
    );
  });

  it('should open confirmation dialog when action is EDIT and state is BUYER_OFFER', () => {
    spyOn(launchDialogService, 'openDialog');
    const newMockQuoteWithEditActionAndBuyerOfferState: Quote = {
      ...mockQuote,
      allowedActions: [
        { type: QuoteActionType.SUBMIT, isPrimary: true },
        { type: QuoteActionType.CANCEL, isPrimary: false },
        { type: QuoteActionType.EDIT, isPrimary: false },
      ],
      state: QuoteState.BUYER_OFFER,
    };
    const confirmationContextForSubmitAction: ConfirmationContext = {
      quote: newMockQuoteWithEditActionAndBuyerOfferState,
      title: 'quote.confirmActionDialog.buyer_offer.edit.title',
      confirmNote: 'quote.confirmActionDialog.buyer_offer.edit.confirmNote',
      warningNote: 'quote.confirmActionDialog.buyer_offer.edit.warningNote',
      validity: 'quote.confirmActionDialog.validity',
    };
    mockQuoteDetails$.next(newMockQuoteWithEditActionAndBuyerOfferState);
    fixture.detectChanges();
    component.onClick(
      QuoteActionType.EDIT,
      newMockQuoteWithEditActionAndBuyerOfferState
    );
    expect(launchDialogService.openDialog).toHaveBeenCalledWith(
      LAUNCH_CALLER.ACTION_CONFIRMATION,
      component.element,
      component['viewContainerRef'],
      { confirmationContext: confirmationContextForSubmitAction }
    );
  });

  describe('Threshold check', () => {
    const allowedActionsSubmit = [
      { type: QuoteActionType.SUBMIT, isPrimary: true },
    ];
    const quoteFailingThreshold: Quote = {
      ...mockQuote,
      totalPrice: { value: threshold - 1 },
      allowedActions: allowedActionsSubmit,
    };
    const submittableQuote: Quote = {
      ...mockQuote,
      allowedActions: allowedActionsSubmit,
    };
    const cancellableQuote: Quote = {
      ...quoteFailingThreshold,
      allowedActions: [{ type: QuoteActionType.CANCEL, isPrimary: true }],
    };

    it('should let submit button enabled if threshold is met', () => {
      mockQuoteDetails$.next(submittableQuote);
      fixture.detectChanges();
      const actionButtons = fixture.debugElement.queryAll(By.css('.btn'));
      expect(actionButtons).toBeDefined();
      expect(actionButtons[0].nativeElement.disabled).toBe(false);
    });

    it('should let submit button enabled if threshold is not specified', () => {
      mockQuote.threshold = undefined;
      mockQuoteDetails$.next(submittableQuote);
      fixture.detectChanges();
      const actionButtons = fixture.debugElement.queryAll(By.css('.btn'));
      expect(actionButtons).toBeDefined();
      expect(actionButtons[0].nativeElement.disabled).toBe(false);
    });

    it('should disable submit button if threshold is not met and raise message', () => {
      spyOn(globalMessageService, 'add').and.callThrough();
      mockQuoteDetails$.next(quoteFailingThreshold);
      fixture.detectChanges();

      const actionButtons = fixture.debugElement.queryAll(By.css('.btn'));
      expect(actionButtons).toBeDefined();
      expect(actionButtons[0].nativeElement.disabled).toBe(true);
      expect(globalMessageService.add).toHaveBeenCalled();
    });

    it('should disable submit button if total price value is not provided', () => {
      quoteFailingThreshold.totalPrice.value = undefined;

      mockQuoteDetails$.next(quoteFailingThreshold);
      fixture.detectChanges();

      const actionButtons = fixture.debugElement.queryAll(By.css('.btn'));
      expect(actionButtons).toBeDefined();
      expect(actionButtons[0].nativeElement.disabled).toBe(true);
    });

    it('should not touch buttons other than submit', () => {
      mockQuoteDetails$.next(cancellableQuote);
      fixture.detectChanges();

      const actionButtons = fixture.debugElement.queryAll(By.css('.btn'));
      expect(actionButtons).toBeDefined();
      expect(actionButtons[0].nativeElement.disabled).toBe(false);
    });

    it('should not raise message in case threshold not met and submit action not present', () => {
      spyOn(globalMessageService, 'add').and.callThrough();
      mockQuoteDetails$.next(cancellableQuote);
      fixture.detectChanges();

      expect(globalMessageService.add).toHaveBeenCalledTimes(0);
    });
  });

  it('should perform quote action when action is SUBMIT and confirm dialogClose reason is yes', () => {
    spyOn(facade, 'performQuoteAction').and.callThrough();
    const newMockQuoteWithSubmitAction: Quote = {
      ...mockQuote,
      allowedActions: [
        { type: QuoteActionType.SUBMIT, isPrimary: true },
        { type: QuoteActionType.CANCEL, isPrimary: false },
      ],
    };
    mockQuoteDetails$.next(newMockQuoteWithSubmitAction);
    fixture.detectChanges();

    component.onClick(QuoteActionType.SUBMIT, newMockQuoteWithSubmitAction);
    launchDialogService.closeDialog('yes');
    expect(facade.performQuoteAction).toHaveBeenCalledWith(
      newMockQuoteWithSubmitAction.code,
      QuoteActionType.SUBMIT
    );
  });

  it('should generate buttons with actions and trigger proper method (requote if allowed action is REQUOTE)', () => {
    spyOn(facade, 'performQuoteAction').and.callThrough();
    fixture.detectChanges();
    const actionButtons = fixture.debugElement.queryAll(By.css('.btn'));

    expect(actionButtons).toBeDefined();
    actionButtons.filter((button, index) => {
      expect(button.nativeElement.textContent.trim()).toEqual(
        `quote.actions.${mockQuote.allowedActions[index].type}`
      );
      button.nativeElement.click();
    });
    expect(facade.performQuoteAction).toHaveBeenCalledWith(
      mockQuote.code,
      QuoteActionType.EDIT
    );
    expect(facade.requote).toHaveBeenCalledWith(mockQuote.code);
  });

  describe('isConfirmationPopupRequired', () => {
    it('should return true if role derived from state and action match', () => {
      expect(
        component['isConfirmationDialogRequired'](
          QuoteActionType.SUBMIT,
          QuoteState.BUYER_DRAFT
        )
      ).toBe(true);
    });
    it('should return true if state and action match', () => {
      expect(
        component['isConfirmationDialogRequired'](
          QuoteActionType.EDIT,
          QuoteState.BUYER_OFFER
        )
      ).toBe(true);
    });
    it('should return false if action does not match', () => {
      expect(
        component['isConfirmationDialogRequired'](
          QuoteActionType.CHECKOUT,
          QuoteState.BUYER_DRAFT
        )
      ).toBe(false);
    });
    it('should return false if state does not match', () => {
      expect(
        component['isConfirmationDialogRequired'](
          QuoteActionType.SUBMIT,
          QuoteState.CANCELLED
        )
      ).toBe(false);
    });
  });

  describe('statusToRole', () => {
    it('should return buyer-role', () => {
      expect(component['statusToRole'](QuoteState.BUYER_DRAFT)).toEqual(
        'buyer'
      );
    });
    it('should return seller-role', () => {
      expect(component['statusToRole'](QuoteState.SELLER_SUBMITTED)).toEqual(
        'seller'
      );
    });
    it('should return seller-approver-role', () => {
      expect(
        component['statusToRole'](QuoteState.SELLERAPPROVER_APPROVED)
      ).toEqual('sellerapprover');
    });
    it('should return sate if no role matches', () => {
      expect(component['statusToRole'](QuoteState.CANCELLED)).toEqual(
        'cancelled'
      );
    });
  });

  describe('getDialogConfig', () => {
    it('should return default config if state/action are not matching', () => {
      expect(
        component['getDialogConfig'](
          QuoteActionType.ORDER,
          QuoteState.BUYER_DRAFT
        )
      ).toEqual({
        i18nKey: 'quote.confirmActionDialog.buyer.order',
        showWarningNote: false,
        showExpirationDate: false,
        showSuccessMessage: true,
      });
    });
    it('should return configured config if state/action are matching', () => {
      expect(
        component['getDialogConfig'](
          QuoteActionType.EDIT,
          QuoteState.BUYER_OFFER
        )
      ).toEqual({
        i18nKey: 'quote.confirmActionDialog.buyer_offer.edit',
        showWarningNote: true,
        showExpirationDate: true,
        showSuccessMessage: false,
      });
    });
  });

  describe('handleConfirmationDialogClose', () => {
    let context: ConfirmationContext;
    beforeEach(() => {
      spyOn(facade, 'performQuoteAction').and.callThrough();
      spyOn(globalMessageService, 'add').and.callThrough();
      context = {
        quote: mockQuote,
        title: 'title',
        confirmNote: 'confirmNote',
        successMessage: 'successMessage',
      };
    });
    it("should do nothing if dialog was closed selecting 'no'", () => {
      component['handleConfirmationDialogClose'](
        QuoteActionType.SUBMIT,
        context
      );
      launchDialogService.closeDialog('no');
      expect(facade.performQuoteAction).not.toHaveBeenCalled();
      expect(globalMessageService.add).not.toHaveBeenCalled();
    });
    it("should perform quote action if dialog was closed  selecting 'yes'", () => {
      context.successMessage = undefined;
      component['handleConfirmationDialogClose'](
        QuoteActionType.EDIT,
        context
      );
      launchDialogService.closeDialog('yes');
      expect(facade.performQuoteAction).toHaveBeenCalledWith(
        mockCode,
        QuoteActionType.EDIT
      );
      expect(globalMessageService.add).not.toHaveBeenCalled();
    });
    it("should perform quote action if dialog was closed  selecting 'yes' and emit success message", () => {
      component['handleConfirmationDialogClose'](
        QuoteActionType.SUBMIT,
        context
      );
      launchDialogService.closeDialog('yes');
      expect(facade.performQuoteAction).toHaveBeenCalledWith(
        mockCode,
        QuoteActionType.SUBMIT
      );
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'successMessage' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });
  });
});
