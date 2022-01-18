import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActiveCartService, Cart } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CartTotalsComponent } from './cart-totals.component';

const cartMock: Cart = {
  name: 'cart-mock',
};

@Component({
  template: '',
  selector: 'cx-order-summary',
})
class MockOrderSummaryComponent {
  @Input()
  cart: Observable<Cart>;
}

class MockActiveCartService {
  getActive(): Observable<Cart> {
    return of(cartMock);
  }
}

describe('CartTotalsComponent', () => {
  let component: CartTotalsComponent;
  let fixture: ComponentFixture<CartTotalsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CartTotalsComponent, MockOrderSummaryComponent],
        providers: [
          {
            provide: ActiveCartService,
            useClass: MockActiveCartService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CartTotalsComponent);
    component = fixture.componentInstance;
  });

  it('should get active cart on ngOnInit()', () => {
    let cart: Cart;

    component.ngOnInit();
    fixture.detectChanges();

    component.cart$.subscribe((data: Cart) => (cart = data));
    expect(cart).toEqual(cartMock);
  });
});
