import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FeaturesConfig, I18nTestingModule } from '@spartacus/core';
import { OrderFacade } from '@spartacus/order/root';
import { PromotionsModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OrderConfirmationItemsComponent } from './order-confirmation-items.component';
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
    })
  );
  clearPlacedOrder() {}
}

describe('OrderConfirmationItemsComponent', () => {
  let component: OrderConfirmationItemsComponent;
  let fixture: ComponentFixture<OrderConfirmationItemsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, PromotionsModule],
        declarations: [OrderConfirmationItemsComponent],
        providers: [
          { provide: OrderFacade, useClass: MockOrderFacade },
          {
            provide: FeaturesConfig,
            useValue: {
              features: { level: '1.3' },
            },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmationItemsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
