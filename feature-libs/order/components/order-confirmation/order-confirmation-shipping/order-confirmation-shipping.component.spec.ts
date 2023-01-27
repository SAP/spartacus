import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { OrderFacade } from '@spartacus/order/root';
import { PromotionsModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OrderConfirmationShippingComponent } from './order-confirmation-shipping.component';
import createSpy = jasmine.createSpy;

class MockOrderFacade implements Partial<OrderFacade> {
  getOrderDetails = createSpy().and.returnValue(
    of({
      entries: [
        {
          entryNumber: 1,
          quantity: 1,
        },
      ],
      deliveryAddress: { id: 'testAddress' },
      deliveryMode: { code: 'testCode' },
    })
  );
}

describe('OrderConfirmationShippingComponent', () => {
  let component: OrderConfirmationShippingComponent;
  let fixture: ComponentFixture<OrderConfirmationShippingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, PromotionsModule],
        declarations: [OrderConfirmationShippingComponent],
        providers: [{ provide: OrderFacade, useClass: MockOrderFacade }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmationShippingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get order entries, delivery address and delivery mode', () => {
    fixture.detectChanges();

    expect(component.entries?.length).toEqual(1);
    expect(component.deliveryAddress?.id).toEqual('testAddress');
    expect(component.deliveryMode?.code).toEqual('testCode');
  });
});
