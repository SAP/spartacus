import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, TranslationService } from '@spartacus/core';
import {
  OrderReturnRequestFacade,
  ReturnRequestList,
} from '@spartacus/order/root';
import { ListNavigationModule } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { OrderReturnRequestListComponent } from './order-return-request-list.component';

const mockReturns: ReturnRequestList = {
  returnRequests: [
    {
      code: '1',
      rma: '1',
    },
    {
      code: '2',
      rma: '2',
    },
  ],
  pagination: { totalResults: 1, sort: 'byDate' },
  sorts: [{ code: 'byDate', selected: true }],
};

const mockReturnRequestList$ = new BehaviorSubject(mockReturns);

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockOrderReturnRequestService {
  getOrderReturnRequestList(): Observable<ReturnRequestList> {
    return mockReturnRequestList$.asObservable();
  }

  loadOrderReturnRequestList(
    _userId: string,
    _pageSize: number,
    _currentPage?: number,
    _sort?: string
  ): void {}

  clearOrderReturnRequestList() {}
}

class MockTranslationService {
  translate(): Observable<string> {
    return of('sortLabel');
  }
}

describe('OrderReturnRequestListComponent', () => {
  let component: OrderReturnRequestListComponent;
  let fixture: ComponentFixture<OrderReturnRequestListComponent>;
  let returnService: OrderReturnRequestFacade;
  let el: DebugElement;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, ListNavigationModule, I18nTestingModule],
        declarations: [OrderReturnRequestListComponent, MockUrlPipe],
        providers: [
          {
            provide: OrderReturnRequestFacade,
            useClass: MockOrderReturnRequestService,
          },
          {
            provide: TranslationService,
            useClass: MockTranslationService,
          },
        ],
      }).compileComponents();

      returnService = TestBed.inject(OrderReturnRequestFacade);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderReturnRequestListComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not set sort type if no return request are provided', () => {
    let returns: ReturnRequestList | undefined;

    mockReturnRequestList$.next({});

    component.returnRequests$
      .subscribe((value) => {
        returns = value;
      })
      .unsubscribe();

    expect(returns).toEqual({});
    expect(component.sortType).toBe(undefined);
  });

  it('should read order return request list', () => {
    let returns: ReturnRequestList | undefined;

    mockReturnRequestList$.next(mockReturns);
    fixture.detectChanges();

    component.returnRequests$
      .subscribe((value) => {
        returns = value;
      })
      .unsubscribe();

    expect(returns).toEqual(mockReturns);
    expect(component.sortType).toBe('byDate');
  });

  it('should set correctly sort code', () => {
    spyOn(returnService, 'loadOrderReturnRequestList').and.stub();

    component.changeSortCode('byOrderNumber');

    expect(component.sortType).toBe('byOrderNumber');
    expect(returnService.loadOrderReturnRequestList).toHaveBeenCalledWith(
      5,
      0,
      'byOrderNumber'
    );
  });

  it('getSortLabels ', (done) => {
    component
      .getSortLabels()
      .subscribe((labels) => {
        expect(labels).toEqual({ byDate: 'sortLabel', byRMA: 'sortLabel' });
        done();
      })
      .unsubscribe();
  });

  it('should set correctly page', () => {
    spyOn(returnService, 'loadOrderReturnRequestList').and.stub();

    component.sortType = 'byDate';
    component.pageChange(1);

    expect(returnService.loadOrderReturnRequestList).toHaveBeenCalledWith(
      5,
      1,
      'byDate'
    );
  });

  it('should clear return  requests data when component destroy', () => {
    spyOn(returnService, 'clearOrderReturnRequestList').and.stub();

    component.ngOnDestroy();
    expect(returnService.clearOrderReturnRequestList).toHaveBeenCalledWith();
  });

  it('should have valid attribute', () => {
    let returns: ReturnRequestList | undefined;

    mockReturnRequestList$.next(mockReturns);
    fixture.detectChanges();

    component.returnRequests$
      .subscribe((value) => {
        returns = value;
      })
      .unsubscribe();
    expect(returns).toEqual(mockReturns);

    const sortComponents = el.queryAll(By.css('cx-sorting'));
    expect(sortComponents.length).toBe(2);
    expect(
      sortComponents[1].query(By.css('div[aria-controls="order-return-table"]'))
    ).not.toBeNull();
  });
});
