import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CpqQuoteDiscountComponent } from './cpq-quote.component';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { ReplaySubject, of } from 'rxjs';
import { Component, Input } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { take } from 'rxjs/operators';
import { CpqQuoteService } from '../../cpq-qute.service';
import { CpqDiscounts } from '@spartacus/cpq-quote/root';

class MockCartItemContext implements Partial<CartItemContext> {
  item$ = new ReplaySubject<OrderEntry>(1);
}

@Component({
  selector: 'cx-cpq-quote',
  template: '',
})
class MockConfigureCpqDiscountsComponent {
  @Input() cartEntry: Partial<OrderEntry & Array<CpqDiscounts>>;
}

describe('CpqQuoteDiscountComponent', () => {
  let component: CpqQuoteDiscountComponent;
  let fixture: ComponentFixture<CpqQuoteDiscountComponent>;
  let mockCartItemContext: MockCartItemContext;
  let cpqQuoteServiceMock: Partial<CpqQuoteService>;

  beforeEach(async () => {
    cpqQuoteServiceMock = {
      isFlag$: of(false),
    };
    mockCartItemContext = new MockCartItemContext();
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        CpqQuoteDiscountComponent,
        MockConfigureCpqDiscountsComponent,
      ],
      providers: [
        { provide: CpqQuoteService, useValue: cpqQuoteServiceMock },
        { provide: CartItemContext, useValue: mockCartItemContext },
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(CpqQuoteDiscountComponent);
    component = fixture.componentInstance;
    mockCartItemContext = TestBed.inject(CartItemContext) as any;
    fixture.detectChanges();
  });

  it('should display all content when isFlagQuote is false', () => {
    const contentElements = fixture.nativeElement.querySelectorAll(
      '.cx-total, .cx-formatted-value'
    );
    expect(contentElements.length).toBeGreaterThan(0);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose orderEntry$', (done) => {
    const orderEntry: Partial<OrderEntry & Array<CpqDiscounts>> = {
      orderCode: '123',
      cpqDiscounts: [],
    };
    component.orderEntry$.pipe(take(1)).subscribe((value: any) => {
      expect(value).toBe(orderEntry);
      done();
    });

    mockCartItemContext.item$.next(orderEntry);
  });

  describe('Cpq Quote Discount Percentage', () => {
    it('should not be displayed if model provides empty array', () => {
      mockCartItemContext.item$.next({
        cpqDiscounts: undefined,
      });

      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-discount').length).toBe(0);
    });

    it('should be displayed if model provides data', () => {
      mockCartItemContext.item$.next({
        cpqDiscounts: [{ appliedValue: 30, isoCode: 'USD', value: 15 }],
      });

      fixture.detectChanges();
      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-discount').length).toBe(1);
    });
    it('should display the appliedValue data', () => {
      const discounts: CpqDiscounts[] = [
        { appliedValue: 30, isoCode: 'USD', value: 15 },
      ];
      mockCartItemContext.item$.next({
        cpqDiscounts: discounts,
        basePrice: { value: 100, formattedValue: 'USD100.00' },
        quantity: 1,
      });
      fixture.detectChanges();
      const htmlElem = fixture.nativeElement;
      const discountsDisplayed = htmlElem.querySelectorAll('.cx-discount');
      expect(discountsDisplayed.length).toBe(discounts.length);
      for (let i = 0; i < discountsDisplayed.length; i++) {
        const expectedDiscountedPrice = component.getDiscountedPrice(
          100,
          discounts[i].appliedValue,
          1
        );
        const formattedPrice = new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(expectedDiscountedPrice ?? 0);
        const expectedDisplayValue = `${discounts[i].isoCode}${formattedPrice}`;
        console.log(
          `Expected: ${expectedDisplayValue}, Actual: ${discountsDisplayed[i].textContent}`
        );
        expect(discountsDisplayed[i].textContent.trim()).toBe(
          expectedDisplayValue
        );
      }
    });
  });
  describe('formattedValue', () => {
    it('should render formattedValue element if basePrice.formattedValue is defined', () => {
      const formattedValue = 'USD100.00';
      mockCartItemContext.item$.next({ basePrice: { formattedValue } });
      fixture.detectChanges();
      const spanElement = fixture.nativeElement.querySelector(
        '.cx-formatted-value'
      );
      expect(spanElement).toBeTruthy();
      expect(spanElement.textContent.trim()).toBe(formattedValue);
    });
    it('should be displayed if model provides data', () => {
      const formattedValue = 'USD100.00';
      const value = 100;
      const discounts: CpqDiscounts[] = [
        { appliedValue: 30, isoCode: 'USD', value: 15 },
      ];
      mockCartItemContext.item$.next({
        basePrice: { formattedValue, value },
        cpqDiscounts: discounts,
      });
      fixture.detectChanges();
      const htmlElem = fixture.nativeElement;
      const formattedValueSpan = htmlElem.querySelectorAll('.strike-through');
      expect(formattedValueSpan.length).toBe(1);
    });
    it('should not render formattedValue element if basePrice.formattedValue is undefined', () => {
      mockCartItemContext.item$.next({
        basePrice: { formattedValue: undefined },
      });
      fixture.detectChanges();
      const spanElement =
        fixture.nativeElement.querySelector('.strike-through');
      expect(spanElement).toBeFalsy();
    });
    it('should set quoteDiscountData to null if cartItemContext is null', () => {
      (component as any).cartItemContext = null;
      component.ngOnInit();
      expect(component.quoteDiscountData).toBeNull();
    });
    it('should unsubscribe on ngOnDestroy', () => {
      const unsubscribeSpy = spyOn(component['subscription'], 'unsubscribe');
      component.ngOnDestroy();
      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });
});
