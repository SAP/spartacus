import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FeaturesConfig, I18nTestingModule } from '@spartacus/core';
import { OrderFacade } from '@spartacus/order/root';
import { PromotionsModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { UnnamedOrderConfirmationItemsComponent } from './unnamed-order-confirmation-items.component';
import createSpy = jasmine.createSpy;

class MockOrderService implements Partial<OrderFacade> {
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
}

describe('UnnamedOrderConfirmationItemsComponent', () => {
  let component: UnnamedOrderConfirmationItemsComponent;
  let fixture: ComponentFixture<UnnamedOrderConfirmationItemsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, PromotionsModule],
        declarations: [UnnamedOrderConfirmationItemsComponent],
        providers: [
          { provide: OrderFacade, useClass: MockOrderService },
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
    fixture = TestBed.createComponent(UnnamedOrderConfirmationItemsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
