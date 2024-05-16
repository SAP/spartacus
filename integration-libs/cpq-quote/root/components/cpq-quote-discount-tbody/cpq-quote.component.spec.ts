import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CpqQuoteDiscountComponent } from './cpq-quote.component';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CpqDiscounts } from '@spartacus/cpq-quote/root';

class MockCartItemContext implements Partial<CartItemContext> {
  item$ = new ReplaySubject<OrderEntry>(1);
}

describe('Cpq Quote Discount Component', () => {
  let component: CpqQuoteDiscountComponent;
  let fixture: ComponentFixture<CpqQuoteDiscountComponent>;
  let htmlElem: HTMLElement;
  let mockCartItemContext: MockCartItemContext;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CpqQuoteDiscountComponent],
      providers: [{ provide: CartItemContext, useClass: MockCartItemContext }],
    }).compileComponents();

    fixture = TestBed.createComponent(CpqQuoteDiscountComponent);
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
      orderCode: '123',
      cpqDiscounts: [],
    };
    component.orderEntry$.pipe(take(1)).subscribe((value: any) => {
      expect(value).toBe(orderEntry);
      done();
    });

    mockCartItemContext.item$.next(orderEntry);
  });

  it('should not be displayed if model provides empty array', () => {
    mockCartItemContext.item$.next({
      cpqDiscounts: undefined,
    });

    fixture.detectChanges();

    expect(htmlElem.querySelectorAll('.cpq-quote-discount').length).toBe(0);
  });
});
