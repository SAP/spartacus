import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import {
  CxDatePipe,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OrderSummaryComponent } from '../cart-shared';
import { CartTotalsComponent } from './cart-totals.component';

const cartMock: Cart = {
  name: 'cart-mock',
};

class MockActiveCartService {
  getActive(): Observable<Cart> {
    return of(cartMock);
  }
}

@Component({
  selector: 'cx-order-summary',
  template: '',
})
class MockOrderSummaryComponent {
  @Input() cart: Cart;
}

describe('CartTotalsComponent', () => {
  let component: CartTotalsComponent;
  let fixture: ComponentFixture<CartTotalsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MockOrderSummaryComponent, CartTotalsComponent],
      providers: [
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartService,
        },
      ],
    })
      .overrideComponent(CartTotalsComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, OrderSummaryComponent],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe, MockOrderSummaryComponent],
        },
      })
      .compileComponents();
  }));

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
