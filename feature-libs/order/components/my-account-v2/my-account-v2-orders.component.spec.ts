import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { MyAccountV2OrderHistoryService } from '@spartacus/order/core';
import { OrderHistoryListView } from '@spartacus/order/root';
import { EMPTY, Observable, of } from 'rxjs';
import { MyAccountV2OrdersComponent } from './my-account-v2-orders.component';

const mockOrders: OrderHistoryListView = {
  orders: [
    {
      code: '1',
      placed: new Date('2018-01-01'),
      statusDisplay: 'test',
      total: { formattedValue: '1' },
      entries: [
        { product: { name: 'a1' } },
        { product: { name: 'b1', images: {} } },
      ],
    },
    {
      code: '2',
      placed: new Date('2018-01-02'),
      statusDisplay: 'test2',
      total: { formattedValue: '2' },
      entries: [{ product: { name: 'a1' } }, { product: { name: 'b1' } }],
    },
  ],
  pagination: { totalResults: 1, totalPages: 2, sort: 'byDate' },
  sorts: [{ code: 'byDate', selected: true }],
};

const mockEmptyOrderList: OrderHistoryListView = {
  orders: [],
  pagination: { totalResults: 0, totalPages: 1 },
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockService implements Partial<MyAccountV2OrderHistoryService> {
  getOrderHistoryList(): Observable<OrderHistoryListView> {
    return of(mockOrders);
  }
  getOrderHistoryListLoaded(): Observable<boolean> {
    return of(true);
  }
  loadOrderList(
    _pageSize: number,
    _currentPage?: number,
    _sort?: string
  ): void {}
  clearOrderList() {}
}

class MockRoutingService {
  go() {}
}

class MockTranslationService {
  translate(): Observable<string> {
    return EMPTY;
  }
}

@Component({
  template: '',
  selector: 'cx-media',
})
class MockMediaComponent {
  @Input() container: any;
  @Input() format: any;
  @Input() alt: any;
}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

describe(' MyAccountV2OrdersComponent', () => {
  let component: MyAccountV2OrdersComponent;
  let fixture: ComponentFixture<MyAccountV2OrdersComponent>;
  let service: MyAccountV2OrderHistoryService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule],
        declarations: [
          MyAccountV2OrdersComponent,
          MockUrlPipe,
          MockMediaComponent,
          MockSpinnerComponent,
        ],
        providers: [
          { provide: RoutingService, useClass: MockRoutingService },
          { provide: MyAccountV2OrderHistoryService, useClass: MockService },
          { provide: TranslationService, useClass: MockTranslationService },
        ],
      }).compileComponents();
      service = TestBed.inject(MyAccountV2OrderHistoryService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountV2OrdersComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load header with show more', () => {
    component.orders$ = of(mockOrders);
    component.isLoaded$.next(true);
    fixture.detectChanges();
    const heading = fixture.debugElement.query(
      By.css('.cx-my-account-view-heading')
    );
    expect(heading).not.toBeNull();
    const link = fixture.debugElement.query(By.css('#show-more-orders'));
    expect(link).not.toBeNull();
  });

  it('should show orders', () => {
    component.orders$ = of(mockOrders);
    component.isLoaded$.next(true);
    fixture.detectChanges();
    const details = fixture.debugElement.query(
      By.css('.cx-my-account-view-order')
    );
    expect(details).not.toBeNull();
    const noOrder = fixture.debugElement.query(
      By.css('.cx-my-account-no-order')
    );
    expect(noOrder).toBeNull();
    const spinner = fixture.debugElement.query(By.css('.cx-spinner'));
    expect(spinner).toBeNull();
  });

  it('should show no orders', () => {
    component.orders$ = of(mockEmptyOrderList);
    component.isLoaded$.next(true);
    fixture.detectChanges();
    const details = fixture.debugElement.query(
      By.css('.cx-my-account-view-order')
    );
    expect(details).toBeNull();
    const noOrder = fixture.debugElement.query(
      By.css('.cx-my-account-no-order')
    );
    expect(noOrder).not.toBeNull();
    const spinner = fixture.debugElement.query(By.css('.cx-spinner'));
    expect(spinner).toBeNull();
  });

  it('should show spinner', () => {
    component.orders$ = of({ pagination: { totalResults: 0 } });
    component.isLoaded$.next(false);
    fixture.detectChanges();
    const details = fixture.debugElement.query(
      By.css('.cx-my-account-view-order')
    );
    expect(details).toBeNull();
    const noOrder = fixture.debugElement.query(
      By.css('.cx-my-account-no-order')
    );
    expect(noOrder).toBeNull();
    const spinner = fixture.debugElement.query(By.css('.cx-spinner'));
    expect(spinner).not.toBeNull();
  });

  describe('should get a product from an order', () => {
    it('should return a product with name and images', () => {
      let result = component.getProduct(mockOrders.orders[0]);
      expect(result.name).toEqual('b1');
    });
    it('should return the first product as no order has images', () => {
      let result = component.getProduct(mockOrders.orders[1]);
      expect(result.name).toEqual('a1');
    });
  });

  it('on destroy', () => {
    spyOn(service, 'clearOrderList').and.stub();
    component.ngOnDestroy();
    expect(service.clearOrderList).toHaveBeenCalled();
  });
});
