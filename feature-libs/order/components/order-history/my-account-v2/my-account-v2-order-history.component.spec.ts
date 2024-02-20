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
  I18nTestingModule,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { MyAccountV2OrderHistoryService } from '@spartacus/order/core';
import { EMPTY, Observable, of } from 'rxjs';
import { ReplenishmentOrderHistoryFacade } from '../../../root/facade';
import { OrderHistoryList, OrderHistoryView } from '../../../root/model';
import { MyAccountV2OrderHistoryComponent } from './my-account-v2-order-history.component';

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

class MockMyAccountV2OrderHistoryService
  implements Partial<MyAccountV2OrderHistoryService>
{
  getOrderHistoryList(): Observable<OrderHistoryList> {
    return of(mockOrders);
  }

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

@Component({
  selector: 'cx-my-account-v2-order-consolidated-information',
  template: '',
})
export class MockMyAccountV2OrderConsolidatedInformationComponent {
  @Input() order?: OrderHistoryView;
}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

describe('MyAccountV2OrderHistoryComponent', () => {
  let component: MyAccountV2OrderHistoryComponent;
  let fixture: ComponentFixture<MyAccountV2OrderHistoryComponent>;
  let routingService: RoutingService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule],
        declarations: [
          MyAccountV2OrderHistoryComponent,
          MockUrlPipe,
          MockPaginationComponent,
          MockMyAccountV2OrderConsolidatedInformationComponent,
          MockSpinnerComponent,
        ],
        providers: [
          { provide: RoutingService, useClass: MockRoutingService },
          {
            provide: MyAccountV2OrderHistoryService,
            useClass: MockMyAccountV2OrderHistoryService,
          },
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
    fixture = TestBed.createComponent(MyAccountV2OrderHistoryComponent);
    component = fixture.componentInstance;
  });
  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load header and body tags', () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(
        By.css('.cx-my-account-v2-order-history-header')
      )
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('.cx-my-account-v2-order-history-body'))
    ).toBeTruthy();
  });

  it('should redirect when clicking on order code', () => {
    spyOn(routingService, 'go').and.stub();
    fixture.detectChanges();
    const codes = fixture.debugElement.queryAll(
      By.css('.cx-my-account-v2-order-history-code')
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
    expect(elements.length).toEqual(1);
  });

  it('should show start shopping button if no order is present', () => {
    component.orders$ = of(mockEmptyOrderList);
    component.isLoaded$.next(true);
    fixture.detectChanges();
    const elements = fixture.debugElement.queryAll(
      By.css('.cx-order-history-pagination')
    );
    expect(elements.length).toEqual(0);
    const link = fixture.debugElement.query(By.css('a'));
    expect(link.nativeNode.innerText).toEqual('orderHistory.startShopping');
  });

  it('should show spinner if data is still laoding', () => {
    component.orders$ = of(mockEmptyOrderList);
    component.isLoaded$.next(false);
    fixture.detectChanges();
    const elements = fixture.debugElement.queryAll(
      By.css('.cx-order-history-pagination')
    );
    expect(elements.length).toEqual(0);
    const link = fixture.debugElement.query(By.css('cx-spinner'));
    expect(link.nativeNode.nodeName).toEqual('CX-SPINNER');
  });
});
