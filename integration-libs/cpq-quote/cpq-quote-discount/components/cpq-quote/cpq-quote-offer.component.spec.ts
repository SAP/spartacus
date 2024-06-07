import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CpqQuoteOfferComponent } from './cpq-quote-offer.component';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { ReplaySubject } from 'rxjs';
import { CpqDiscounts } from '@spartacus/cpq-quote/root';
import { Component, Input } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { take } from 'rxjs/operators';
import { CpqQuoteService } from '../../cpq-qute.service';

class MockCartItemContext implements Partial<CartItemContext> {
  item$ = new ReplaySubject<OrderEntry>(1);
}

@Component({
  selector: 'cx-cpq-quote-offer',
  template: '',
})
class MockConfigureCpqDiscountsComponent {
  @Input() cartEntry: Partial<OrderEntry & Array<CpqDiscounts>>;
}

describe('Cpq Quote Offer display', () => {
  let component: CpqQuoteOfferComponent;
  let fixture: ComponentFixture<CpqQuoteOfferComponent>;
  let mockCartItemContext: MockCartItemContext;
  let cpqQuoteService: CpqQuoteService;

  beforeEach(
    waitForAsync(() => {
      mockCartItemContext = new MockCartItemContext();

      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [
          CpqQuoteOfferComponent,
          MockConfigureCpqDiscountsComponent,
        ],
        providers: [
          { provide: CartItemContext, useValue: mockCartItemContext },
          CpqQuoteService
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CpqQuoteOfferComponent);
    component = fixture.componentInstance;
    mockCartItemContext = TestBed.inject(CartItemContext) as any;
    cpqQuoteService = TestBed.inject(CpqQuoteService); // Inject the service
    fixture.detectChanges();
  });

  it('should set isFlag to false when quoteDiscountData has cpqDiscounts', (done: DoneFn) => {
    mockCartItemContext.item$.next({
      cpqDiscounts: [{ appliedValue: 30, isoCode: 'USD', value: 15 }],
    });
    component.ngOnInit();
    fixture.detectChanges();
    cpqQuoteService.isFlag$.pipe(take(1)).subscribe(flag => {
      expect(flag).toBe(false);
      done();
    });
  });


  it('should set isFlag to true when quoteDiscountData is null', (done: DoneFn) => {
    component.ngOnInit();
    component.quoteDiscountData = null;
    fixture.detectChanges(); // Manually trigger change detection
    cpqQuoteService.isFlag$.pipe(take(1)).subscribe(flag => {
      expect(flag).toBe(true);
      done();
    });
  });
});
