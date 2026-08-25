import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { OrderFacade } from '@spartacus/order/root';
import { of } from 'rxjs';
import { OrderConfirmationTotalsComponent } from './order-confirmation-totals.component';

class MockOrderFacade implements Partial<OrderFacade> {
  getOrderDetails = vi.fn().mockReturnValue(
    of({
      code: 'test-code-412',
    })
  );
  clearPlacedOrder() {}
}

describe('OrderConfirmationTotalsComponent', () => {
  let component: OrderConfirmationTotalsComponent;
  let fixture: ComponentFixture<OrderConfirmationTotalsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, OrderConfirmationTotalsComponent],
      providers: [{ provide: OrderFacade, useClass: MockOrderFacade }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmationTotalsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
