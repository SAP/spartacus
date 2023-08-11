import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  QuoteFacade,
  Quote,
  QuoteActionType,
  QuoteState,
  QuoteDiscount,
  QuoteDiscountType,
  QuoteMetadata,
} from '@spartacus/quote/root';
import { I18nTestingModule, Price } from '@spartacus/core';

import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';

import { QuoteSellerEditComponent } from './quote-seller-edit.component';
import createSpy = jasmine.createSpy;
import {
  QUOTE_CODE,
  EXPIRATION_TIME_AS_STRING,
  createEmptyQuote,
  EXPIRATION_DATE_AS_STRING,
} from '../../core/testing/quote-test-utils';
import { QuoteSellerEditComponentService } from './quote-seller-edit.component.service';
import {
  AbstractControl,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';
import { Component, Input } from '@angular/core';

const mockCartId = '1234';
const threshold = 20;
const totalPrice: Price = { value: threshold + 1 };
const invalidInput = 'INVALID';

const mockQuote: Quote = {
  ...createEmptyQuote(),
  allowedActions: [
    { type: QuoteActionType.EDIT, isPrimary: false },
    { type: QuoteActionType.REQUOTE, isPrimary: true },
  ],
  state: QuoteState.SELLER_DRAFT,
  cartId: mockCartId,
  code: QUOTE_CODE,
  threshold: threshold,
  totalPrice: totalPrice,
  expirationTime: new Date(EXPIRATION_TIME_AS_STRING),
};

const mockQuoteDetails$ = new BehaviorSubject<Quote>(mockQuote);
const formatter = new Intl.NumberFormat('en', {
  style: 'currency',
  currency: 'USD',
  currencyDisplay: 'narrowSymbol',
});

class MockCommerceQuotesFacade implements Partial<QuoteFacade> {
  getQuoteDetails(): Observable<Quote> {
    return mockQuoteDetails$.asObservable();
  }
  addDiscount = createSpy();
  editQuote = createSpy();
}

class MockQuoteSellerEditComponentService {
  parseDiscountValue() {
    return of(0);
  }
  getFormatter() {
    return of(formatter);
  }

  getLocalizationElements() {
    return of({
      locale: 'en',
      currencySymbol: '$',
      formatter: formatter,
    });
  }

  getNumberFormatValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.value === invalidInput ? { wrongFormat: {} } : null;
    };
  }

  isEditableForSeller(): boolean {
    return true;
  }

  addTimeToDate(): string {
    return EXPIRATION_TIME_AS_STRING;
  }
  removeTimeFromDate(): string {
    return EXPIRATION_DATE_AS_STRING;
  }

  getMaximumNumberOfTotalPlaces(): number {
    return 10;
  }
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'cx-date-picker',
  template: '',
})
class MockDatePickerComponent {
  @Input() control: UntypedFormControl;
  @Input() min: UntypedFormControl;
  @Input() max: UntypedFormControl;
  @Input() required: boolean;
}

describe('QuoteSellerEditComponent', () => {
  let fixture: ComponentFixture<QuoteSellerEditComponent>;
  let component: QuoteSellerEditComponent;
  let facade: QuoteFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule],
      declarations: [QuoteSellerEditComponent, MockDatePickerComponent],
      providers: [
        {
          provide: QuoteFacade,
          useClass: MockCommerceQuotesFacade,
        },
        {
          provide: QuoteSellerEditComponentService,
          useClass: MockQuoteSellerEditComponentService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteSellerEditComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(QuoteFacade);
    mockQuoteDetails$.next(mockQuote);
  });

  it('should create component', () => {
    expect(component).toBeDefined();
    expect(facade).toBeDefined();
  });

  it('should emit data for in case seller status is provided', (done) => {
    component.quoteDetailsForSeller$
      .subscribe((quote) => {
        expect(quote.code).toBe(QUOTE_CODE);
        done();
      })
      .unsubscribe();
  });

  it('should unsubscribe subscription on ngOnDestroy', () => {
    const spyUnsubscribe = spyOn(Subscription.prototype, 'unsubscribe');
    component.ngOnDestroy();
    expect(spyUnsubscribe).toHaveBeenCalled();
  });

  describe('ngOnInit', () => {
    it('should provide initial value for discount control', () => {
      fixture.detectChanges();
      expect(component.form.controls.discount.value).toBe('$0.00');
    });

    it('should provide initial value for expiry date control', () => {
      fixture.detectChanges();
      expect(component.form.controls.validityDate.value).toBe(
        EXPIRATION_DATE_AS_STRING
      );
    });
  });

  describe('field validation', () => {
    it('should detect that invalid input is not desired', () => {
      fixture.detectChanges();
      component.form.controls.discount.setValue(invalidInput);
      fixture.detectChanges();
      expect(component.form.controls.discount.valid).toBe(false);
    });

    it('should accept valid input', () => {
      fixture.detectChanges();
      component.form.controls.discount.setValue('1234');
      fixture.detectChanges();
      expect(component.form.controls.discount.valid).toBe(true);
    });
  });

  describe('onApply', () => {
    it('should call corresponding facade method', () => {
      component.form.controls.discount.setValue(0);
      const expectedDiscount: QuoteDiscount = {
        discountRate: component.form.controls.discount.value,
        discountType: QuoteDiscountType.ABSOLUTE,
      };
      component.onApply(QUOTE_CODE);
      expect(facade.addDiscount).toHaveBeenCalledWith(
        QUOTE_CODE,
        expectedDiscount
      );
    });
  });

  describe('onSetDate', () => {
    it('should call corresponding facade method', () => {
      const expectedQuoteMetaData: QuoteMetadata = {
        expirationTime: EXPIRATION_TIME_AS_STRING,
      };

      component.onSetDate(QUOTE_CODE);
      expect(facade.editQuote).toHaveBeenCalledWith(
        QUOTE_CODE,
        expectedQuoteMetaData
      );
    });
  });

  describe('mustDisplayValidationMessage', () => {
    it('should return false for valid input', () => {
      expect(component.mustDisplayValidationMessage()).toBe(false);
    });

    it('should return true in case validation errors exist', () => {
      component.form.controls.discount.setErrors([{}]);
      expect(component.mustDisplayValidationMessage()).toBe(true);
    });
  });
});
