import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  I18nTestingModule,
  Product,
  ProductCatalogService,
} from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { EMPTY, of } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';
import { OrderDetailReorderComponent } from './order-detail-reorder.component';

const mockOrder: Order = {
  code: '123',
  entries: [
    {
      product: {
        code: '1',
      },
    },
    {
      product: {
        code: '2',
      },
    },
  ],
};

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef,
    _data?: any
  ) {
    return EMPTY;
  }
}

class MockOrderDetailsService {
  getOrderDetails() {
    return of(mockOrder);
  }
}

class MockProductCatalogService {
  isProductInCatalog(_product?: Product) {
    return false;
  }
}

describe('Order detail reorder component', () => {
  let component: OrderDetailReorderComponent;
  let fixture: ComponentFixture<OrderDetailReorderComponent>;
  let launchDialogService: LaunchDialogService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, OrderDetailReorderComponent],
      providers: [
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
        {
          provide: OrderDetailsService,
          useClass: MockOrderDetailsService,
        },
        {
          provide: ProductCatalogService,
          useClass: MockProductCatalogService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailReorderComponent);
    component = fixture.componentInstance;
    launchDialogService = TestBed.inject(LaunchDialogService);
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

  it('should launch dialog on reorder button click', () => {
    spyOn(launchDialogService, 'openDialog').and.stub();
    fixture.detectChanges();
    fixture.debugElement
      .query(By.css('.btn'))
      .nativeElement.dispatchEvent(new MouseEvent('click'));

    const dialogData = { orderCode: mockOrder.code };

    expect(launchDialogService.openDialog).toHaveBeenCalledWith(
      LAUNCH_CALLER.REORDER,
      component.element,
      component['vcr'],
      dialogData
    );
  });

  it('disable$ should return true if no entry product is in catalogue', (done) => {
    component.order$ = of(mockOrder);
    component.ngOnInit();

    component.disabled$.subscribe((disabled) => {
      expect(disabled).toBeTruthy();
      done();
    });
  });

  it('button should be disabled if disable$ emits true', () => {
    component.disabled$ = of(true);
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('.btn'));
    expect(buttonEl.nativeElement.disabled).toBeTruthy();
  });
});
