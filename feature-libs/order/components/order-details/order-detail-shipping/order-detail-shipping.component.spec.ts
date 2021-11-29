import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { ContextService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OrderDetailShippingComponent } from './order-detail-shipping.component';
import createSpy = jasmine.createSpy;

const mockOrder: Order = {
  code: 'test-code-412',
  statusDisplay: 'test-status-display',
  created: new Date('2019-02-11T13:02:58+0000'),
  purchaseOrderNumber: 'test-po',
  costCenter: {
    name: 'Rustic Global',
    unit: {
      name: 'Rustic',
    },
  },
};

class MockImportExportContext {
  getOrderDetails = createSpy('getOrderDetails').and.returnValue(of(mockOrder));
}
const contextService = new MockImportExportContext();

class MockContextService implements Partial<ContextService> {
  get = createSpy().and.returnValue(of(contextService));
}

describe('OrderDetailShippingComponent', () => {
  let component: OrderDetailShippingComponent;
  let fixture: ComponentFixture<OrderDetailShippingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        providers: [
          {
            provide: ContextService,
            useClass: MockContextService,
          },
        ],
        declarations: [OrderDetailShippingComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailShippingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get order details', () => {
    let result: any;

    component.order$.subscribe((data) => (result = data)).unsubscribe();

    expect(result).toEqual(mockOrder);
  });
});
