import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Order } from '@spartacus/order/root';
import { of } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';
import { OrderDetailBillingComponent } from './order-detail-billing.component';

const mockOrder: Order = {
  code: '1',
  statusDisplay: 'Shipped',
};

class MockOrderDetailsService {
  getOrderDetails() {
    return of(mockOrder);
  }
}

describe('OrderDetailBillingComponent', () => {
  let component: OrderDetailBillingComponent;
  let fixture: ComponentFixture<OrderDetailBillingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OrderDetailBillingComponent],
        providers: [
          {
            provide: OrderDetailsService,
            useClass: MockOrderDetailsService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailBillingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
