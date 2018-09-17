import { PaymentManagementPageLayoutComponent } from './payment-management-page-layout.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { CheckoutService } from '../../../checkout/services/checkout.service';
import { CartService } from '../../../cart/services/cart.service';

const mockCheckoutService = {
  loadUserPaymentMethods: () => {}
};
const mockCartService = {};

class MockStore<T> extends BehaviorSubject<T> {
  select = () => this;
}

describe('PaymentManagementPageLayoutComponent', () => {
  let component: PaymentManagementPageLayoutComponent;
  let fixture: ComponentFixture<PaymentManagementPageLayoutComponent>;
  let mockStore: MockStore<any>;

  beforeEach(async(() => {
    mockStore = new MockStore({});

    TestBed.configureTestingModule({
      providers: [
        {
          provide: Store,
          useValue: mockStore
        },
        {
          provide: CheckoutService,
          useValue: mockCheckoutService
        },
        {
          provide: CartService,
          useValue: mockCartService
        }
      ],
      declarations: [PaymentManagementPageLayoutComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentManagementPageLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
