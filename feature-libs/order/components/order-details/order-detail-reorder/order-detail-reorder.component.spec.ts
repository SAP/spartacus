import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActiveCartService } from '@spartacus/cart/base/core';
import { CartModificationList } from '@spartacus/cart/base/root';
import { FeaturesConfigModule, I18nTestingModule } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { ReorderOrderFacade } from 'feature-libs/order/root/facade/reorder-order.facade';
import { Observable, of } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';
import { OrderDetailReorderComponent } from './order-detail-reorder.component';

const mockCartModificationList: CartModificationList = {
  cartModifications: [],
};

const mockOrder: Order = {
  code: '123',
};

class MockActiveCartService {
  reloadCurrentActiveCart(): void {}
}

class MockReorderOrderFacade implements Partial<ReorderOrderFacade> {
  reorder(_orderId: string, _userId: string): Observable<CartModificationList> {
    return of(mockCartModificationList);
  }
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef,
    _data?: any
  ) {
    return of();
  }
  emitData(_data: any): void {}
}

class MockOrderDetailsService {
  getOrderDetails() {
    return of(mockOrder);
  }
}

describe('Order detail reorder component', () => {
  let component: OrderDetailReorderComponent;
  let fixture: ComponentFixture<OrderDetailReorderComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, FeaturesConfigModule],
        declarations: [OrderDetailReorderComponent],
        providers: [
          RouterTestingModule,
          {
            provide: ReorderOrderFacade,
            useClass: MockReorderOrderFacade,
          },
          {
            provide: LaunchDialogService,
            useClass: MockLaunchDialogService,
          },
          {
            provide: ActiveCartService,
            useClass: MockActiveCartService,
          },
          {
            provide: OrderDetailsService,
            useClass: MockOrderDetailsService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailReorderComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should read the order details', () => {
    fixture.detectChanges();

    component.order$.subscribe((order: any) => {
      expect(order).toEqual(mockOrder);
    });
  });
});