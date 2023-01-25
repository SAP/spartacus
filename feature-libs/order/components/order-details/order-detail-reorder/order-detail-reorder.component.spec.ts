import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FeaturesConfigModule, I18nTestingModule } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';
import { OrderDetailReorderComponent } from './order-detail-reorder.component';

const mockOrder: Order = {
  code: '123',
};

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
            provide: LaunchDialogService,
            useClass: MockLaunchDialogService,
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
