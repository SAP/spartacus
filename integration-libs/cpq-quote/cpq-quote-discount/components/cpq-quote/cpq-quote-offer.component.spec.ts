import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { LanguageService, TranslatePipe } from '@spartacus/core';
import { CpqDiscounts } from '@spartacus/cpq-quote/root';
import { TranslationService } from 'projects/core/src/i18n';
import { MockTranslatePipe } from 'projects/core/src/i18n/testing/mock-translate.pipe';
import { Observable, ReplaySubject, of, take } from 'rxjs';
import { CpqQuoteOfferComponent } from './cpq-quote-offer.component';

class MockCartItemContext implements Partial<CartItemContext> {
  item$ = new ReplaySubject<OrderEntry>(1);
}
class MockTranslationService implements Partial<TranslationService> {
  translate(): Observable<string> {
    return of('');
  }
}
class MockLanguageService {
  getActive(): Observable<string> {
    return of('en-US');
  }
}
@Component({
  selector: 'cx-cpq-quote-offer',
  template: '',
})
class MockConfigureCpqDiscountsComponent {
  @Input() cartEntry: Partial<OrderEntry & Array<CpqDiscounts>>;
}

describe('CpqQuoteOfferComponent', () => {
  let component: CpqQuoteOfferComponent;
  let fixture: ComponentFixture<CpqQuoteOfferComponent>;
  let mockCartItemContext: MockCartItemContext;
  let htmlElem: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CpqQuoteOfferComponent, MockConfigureCpqDiscountsComponent],
      providers: [
        { provide: CartItemContext, useClass: MockCartItemContext },
        {
          provide: TranslationService,
          useClass: MockTranslationService,
        },
        { provide: LanguageService, useClass: MockLanguageService },
      ],
    })
      .overrideComponent(CpqQuoteOfferComponent, {
        remove: { imports: [TranslatePipe] },
        add: { imports: [MockTranslatePipe] },
      })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(CpqQuoteOfferComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    mockCartItemContext = TestBed.inject(CartItemContext) as any;

    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should expose orderEntry$', (done) => {
    const orderEntry: Partial<OrderEntry & Array<CpqDiscounts>> = {
      cpqDiscounts: [],
    };
    component.orderEntry$.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(orderEntry);
      done();
    });

    mockCartItemContext.item$.next(orderEntry);
  });

  describe('estimated delivery date', () => {
    it('should not be displayed if model provides empty array', () => {
      mockCartItemContext.item$.next({
        cpqDiscounts: undefined,
      });

      // const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-offer').length).toBe(0);
    });
    it('should be displayed if model provides data', () => {
      mockCartItemContext.item$.next({
        cpqDiscounts: [
          {
            appliedValue: 1,
            isoCode: 2,
            value: 2,
          },
          {
            appliedValue: 1,
            isoCode: 2,
            value: 3,
          },
        ],
      });

      fixture.detectChanges();
      // const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-offer').length).toBe(2);
    });

    it('should set quoteDiscountData to null if cartItemContext is null', () => {
      (component as any).cartItemContext = null;
      component.ngOnInit();
      expect(component.quoteDiscountData).toBeNull();
    });
    it('should calculate the correct discount percentage', () => {
      const basePrice = 100;
      const appliedDiscount = 20;
      const quantity = 1;
      const expectedPercentage =
        (appliedDiscount / (basePrice * quantity)) * 100;
      const result = component.getDiscountPercentage(
        basePrice,
        appliedDiscount,
        quantity
      );
      expect(result).toBe(expectedPercentage);
    });
  });
  describe('formatDiscount', () => {
    it('should return an empty string for undefined input', () => {
      expect(component.formatDiscount(undefined)).toBe('');
    });

    it('should return "5" for input 5', () => {
      expect(component.formatDiscount(5)).toBe('5');
    });

    it('should return "5.50" for input 5.5', () => {
      expect(component.formatDiscount(5.5)).toBe('5.50');
    });

    it('should return "5.12" for input 5.1234', () => {
      expect(component.formatDiscount(5.1234)).toBe('5.12');
    });

    it('should return "0" for input 0', () => {
      expect(component.formatDiscount(0)).toBe('0');
    });

    it('should return "-3" for input -3', () => {
      expect(component.formatDiscount(-3)).toBe('-3');
    });

    it('should return "-3.25" for input -3.25', () => {
      expect(component.formatDiscount(-3.25)).toBe('-3.25');
    });

    it('should return "1000000" for input 1000000', () => {
      expect(component.formatDiscount(1000000)).toBe('1000000');
    });
  });
});
