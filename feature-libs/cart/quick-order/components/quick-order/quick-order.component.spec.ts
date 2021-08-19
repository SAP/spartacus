import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import {
  ActiveCartService,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  OrderEntry,
  Product,
  Translatable,
} from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CmsQuickOrderComponent } from '../../core/models/cms.model';
import { QuickOrderStatePersistenceService } from '../../core/services/quick-order-state-persistance.service';
import { QuickOrderComponent } from './quick-order.component';

const mockProduct: Product = {
  code: '123456789',
};
const mockEntry: OrderEntry = {
  product: mockProduct,
};

const mockEntries$ = new BehaviorSubject<OrderEntry[]>([mockEntry]);

class MockQuickOrderFacade implements Partial<QuickOrderFacade> {
  getEntries(): BehaviorSubject<OrderEntry[]> {
    return mockEntries$;
  }
  clearList(): void {}
}

class MockQuickOrderStatePersistenceService
  implements Partial<QuickOrderStatePersistenceService> {
  initSync(): void {}
}

const mockIsStable$ = new BehaviorSubject<boolean>(true);
const mockCartId$ = new BehaviorSubject<string>('123456789');

class MockActiveCartService implements Partial<ActiveCartService> {
  getActiveCartId(): Observable<string> {
    return mockCartId$.asObservable();
  }
  addEntries(_cartEntries: OrderEntry[]): void {}
  isStable(): Observable<boolean> {
    return mockIsStable$.asObservable();
  }
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add(
    _text: string | Translatable,
    _type: GlobalMessageType,
    _timeout?: number
  ): void {}
}

const mockData: CmsQuickOrderComponent = {
  quickOrderListLimit: 10,
};

const MockCmsComponentData = <CmsComponentData<any>>{
  data$: of(mockData),
};

describe('QuickOrderComponent', () => {
  let component: QuickOrderComponent;
  let fixture: ComponentFixture<QuickOrderComponent>;
  let activeCartService: ActiveCartService;
  let quickOrderService: QuickOrderFacade;
  let globalMessageService: GlobalMessageService;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [QuickOrderComponent],
      providers: [
        { provide: ActiveCartService, useClass: MockActiveCartService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: QuickOrderFacade, useClass: MockQuickOrderFacade },
        {
          provide: QuickOrderStatePersistenceService,
          useClass: MockQuickOrderStatePersistenceService,
        },
        {
          provide: CmsComponentData,
          useValue: MockCmsComponentData,
        },
      ],
    }).compileComponents();

    activeCartService = TestBed.inject(ActiveCartService);
    quickOrderService = TestBed.inject(QuickOrderFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickOrderComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.ngOnInit();

    mockEntries$.next([mockEntry]);
    mockIsStable$.next(true);
    mockCartId$.next('123456789');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger clear the list method from the service', () => {
    spyOn(quickOrderService, 'clearList').and.callThrough();
    spyOn(globalMessageService, 'add').and.stub();

    component.clear();
    expect(quickOrderService.clearList).toHaveBeenCalled();
    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'quickOrderTable.listCleared',
      },
      GlobalMessageType.MSG_TYPE_INFO
    );
  });

  it('should trigger add to cart', () => {
    spyOn(quickOrderService, 'clearList').and.callThrough();
    spyOn(activeCartService, 'addEntries').and.callThrough();
    spyOn(globalMessageService, 'add').and.stub();

    component.addToCart();

    let entryList: OrderEntry[];
    component.entries$.subscribe((entries) => {
      entryList = entries;
    });

    expect(activeCartService.addEntries).toHaveBeenCalledWith(entryList);
    expect(quickOrderService.clearList).toHaveBeenCalled();
    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'quickOrderTable.addedtoCart',
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  });

  it('should hide "empty list" button if there are no entries', () => {
    mockEntries$.next([]);
    fixture.detectChanges();

    expect(el.query(By.css('.clear-button'))).toBeNull();
  });

  it('should disable clear list action when cart is not stable', () => {
    mockIsStable$.next(false);
    fixture.detectChanges();

    expect(
      el.query(By.css('.clear-button')).nativeElement.disabled
    ).toBeTruthy();
  });
});
