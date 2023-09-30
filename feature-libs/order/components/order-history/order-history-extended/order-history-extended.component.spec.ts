import {
  Component,
  EventEmitter,
  Input,
  Output,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  FeaturesConfigModule,
  I18nTestingModule,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import {
  OrderHistoryFacade,
  ReplenishmentOrderHistoryFacade,
} from '../../../root/facade';
import { EMPTY, Observable, of } from 'rxjs';
import { OrderHistoryEnhancedUIComponent } from './order-history-extended.component';
import { OrderHistoryList } from '../../../root/model';

const mockOrders: OrderHistoryList = {
  orders: [
    {
      code: '1',
      placed: new Date('2018-01-01'),
      statusDisplay: 'test',
      total: { formattedValue: '1' },
    },
    {
      code: '2',
      placed: new Date('2018-01-02'),
      statusDisplay: 'test2',
      total: { formattedValue: '2' },
    },
  ],
  pagination: { totalResults: 1, totalPages: 2, sort: 'byDate' },
  sorts: [{ code: 'byDate', selected: true }],
};

const mockEmptyOrderList: OrderHistoryList = {
  orders: [],
  pagination: { totalResults: 0, totalPages: 1 },
};

@Component({
  template: '',
  selector: 'cx-pagination',
})
class MockPaginationComponent {
  @Input() pagination: any;
  @Output() viewPageEvent = new EventEmitter<string>();
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockOrderHistoryFacade implements Partial<OrderHistoryFacade> {
  getOrderHistoryList(): Observable<OrderHistoryList> {
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

class MockReplenishmentOrderHistoryFacade
  implements Partial<ReplenishmentOrderHistoryFacade>
{
  getReplenishmentOrderDetails() {
    return of({});
  }
}

describe('OrderHistoryEnhancedUIComponent ', () => {
  let component: OrderHistoryEnhancedUIComponent;
  let fixture: ComponentFixture<OrderHistoryEnhancedUIComponent>;
  let routingService: RoutingService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule, FeaturesConfigModule],
        declarations: [
          OrderHistoryEnhancedUIComponent,
          MockUrlPipe,
          MockPaginationComponent,
        ],
        providers: [
          { provide: RoutingService, useClass: MockRoutingService },
          { provide: OrderHistoryFacade, useClass: MockOrderHistoryFacade },
          { provide: TranslationService, useClass: MockTranslationService },
          {
            provide: ReplenishmentOrderHistoryFacade,
            useClass: MockReplenishmentOrderHistoryFacade,
          },
        ],
      }).compileComponents();
      routingService = TestBed.inject(RoutingService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryEnhancedUIComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load header and body tags', () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.cx-order-history-extended-header'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('.cx-order-history-extended-body'))
    ).toBeTruthy();
  });

  it('should redirect when clicking on order code', () => {
    spyOn(routingService, 'go').and.stub();

    fixture.detectChanges();
    const codes = fixture.debugElement.queryAll(
      By.css('.cx-enhanced-ui-order-history-code')
    );
    codes[1].triggerEventHandler('click');

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orderDetails',
      params: mockOrders.orders?.[1],
    });
  });

  it('should display pagination', () => {
    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(
      By.css('.cx-order-history-pagination')
    );

    expect(elements.length).toEqual(2);
  });

  it('should show start shopping button if no order is present', () => {
    component.orders$ = of(mockEmptyOrderList);
    fixture.detectChanges();
    const elements = fixture.debugElement.queryAll(
      By.css('.cx-order-history-pagination')
    );
    expect(elements.length).toEqual(0);
    const buttonDebugElement = fixture.debugElement.query(By.css('a'));
    expect(buttonDebugElement.nativeElement.innerText).toEqual(
      'orderHistory.startShopping'
    );
  });
});
