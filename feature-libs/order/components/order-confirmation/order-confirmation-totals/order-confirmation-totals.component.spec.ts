import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { OrderFacade } from '@spartacus/order/root';
import { of } from 'rxjs';
import { OrderConfirmationTotalsComponent } from './order-confirmation-totals.component';
import createSpy = jasmine.createSpy;

class MockOrderFacade implements Partial<OrderFacade> {
  getOrderDetails = createSpy().and.returnValue(
    of({
      code: 'test-code-412',
    })
  );
  clearPlacedOrder() {}
}

describe('OrderConfirmationTotalsComponent', () => {
  let component: OrderConfirmationTotalsComponent;
  let fixture: ComponentFixture<OrderConfirmationTotalsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [OrderConfirmationTotalsComponent],
        providers: [{ provide: OrderFacade, useClass: MockOrderFacade }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmationTotalsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
