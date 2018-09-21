import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmationComponent } from './order-confirmation.component';

import { CheckoutService } from '../../services';
import { CardModule } from '../../../ui/components/card/card.module';
import { CartSharedModule } from '../../../cart/components/cart-shared/cart-shared.module';
import { MediaModule } from '../../../ui';
import { CartService } from '../../../cart/services';

class CheckoutServiceMock {}

xdescribe('OrderConfirmationComponent', () => {
  let component: OrderConfirmationComponent;
  let fixture: ComponentFixture<OrderConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MediaModule, CartSharedModule, CardModule],
      declarations: [OrderConfirmationComponent],
      providers: [
        { provide: CheckoutService, useClass: CheckoutServiceMock },
        { provide: CartService, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
