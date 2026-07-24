import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActiveCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import {
  QuickOrderAddEntryEvent,
  QuickOrderFacade,
} from '@spartacus/cart/quick-order/root';
import {
  CxDatePipe,
  FeaturesConfig,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  Product,
  Translatable,
  TranslatePipe,
} from '@spartacus/core';
import {
  CmsComponentData,
  MessageComponentModule,
  ProgressButtonComponent,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CmsQuickOrderComponent } from '../../core/models/cms.model';
import { QuickOrderStatePersistenceService } from '../../core/services/quick-order-state-persistance.service';
import {
  QuickOrderFormComponent,
  QuickOrderTableComponent,
} from '../public_api';
import { QuickOrderComponent } from './quick-order.component';

const mockProduct: Product = {
  code: '123456789',
};
const mockProduct2: Product = {
  code: '987654321',
};
const mockEntry: OrderEntry = {
  product: mockProduct,
};
const mockEntry2: OrderEntry = {
  product: mockProduct2,
};
const mockEmptyEntry: OrderEntry = {};
const mockNonPurchasableProduct: Product = {
  code: '123456789',
  multidimensional: true,
};
const mockQuickOrderAddEntryEvent: QuickOrderAddEntryEvent = {
  entry: {
    product: {
      name: 'TestName',
      code: '987654321',
    },
  },
  productCode: '987654321',
  quantity: 10,
  quantityAdded: 1,
};

const mockEntries$ = new BehaviorSubject<OrderEntry[]>([mockEntry]);
const mockSoftDeletedEntries$ = new BehaviorSubject<Record<string, OrderEntry>>(
  {
    mockProduct2: mockEntry2,
  }
);
const mockCanAdd$ = new BehaviorSubject<boolean>(true);
const mockNonPurchasableProduct$ = new BehaviorSubject<Product | null>(
  mockNonPurchasableProduct
);

class MockQuickOrderFacade implements Partial<QuickOrderFacade> {
  getEntries(): BehaviorSubject<OrderEntry[]> {
    return mockEntries$;
  }
  clearList(): void {}
  addToCart(): Observable<[OrderEntry[], QuickOrderAddEntryEvent[]]> {
    return combineLatest([mockEntries$.asObservable()]).pipe(
      map(([entries]) => [entries, []])
    );
  }
  restoreSoftDeletedEntry(_productCode: string): void {}
  hardDeleteEntry(_productCode: string): void {}
  getSoftDeletedEntries(): Observable<Record<string, OrderEntry>> {
    return mockSoftDeletedEntries$;
  }
  clearDeletedEntries(): void {}
  setListLimit(_limit: number): void {}
  canAdd(_code?: string): Observable<boolean> {
    return mockCanAdd$.asObservable();
  }
  clearNonPurchasableProductError(): void {}
  getNonPurchasableProductError(): Observable<Product | null> {
    return mockNonPurchasableProduct$.asObservable();
  }
}

class MockQuickOrderStatePersistenceService
  implements Partial<QuickOrderStatePersistenceService>
{
  initSync(): void {}
}

const mockIsStable$ = new BehaviorSubject<boolean>(true);
const mockCartId$ = new BehaviorSubject<string>('123456789');

class MockActiveCartService implements Partial<ActiveCartFacade> {
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

@Component({
  template: '',
  selector: 'cx-quick-order-form',
  imports: [I18nTestingModule, MessageComponentModule],
})
class MockQuickOrderFormComponent {
  @Input() isLoading: boolean;
  @Input() limit: number;
}

@Component({
  template: '',
  selector: 'cx-quick-order-table',
  imports: [I18nTestingModule, MessageComponentModule],
})
class MockQuickOrderTableComponent {
  @Input() entries: OrderEntry[];
  @Input() loading: boolean;
}

@Component({
  template: '',
  selector: 'cx-progress-button',
  imports: [I18nTestingModule, MessageComponentModule],
})
class MockProgressButtonComponent {
  @Input() loading: boolean;
  @Input() disabled: boolean;
}

describe('QuickOrderComponent', () => {
  let component: QuickOrderComponent;
  let fixture: ComponentFixture<QuickOrderComponent>;
  let quickOrderService: QuickOrderFacade;
  let globalMessageService: GlobalMessageService;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageComponentModule, QuickOrderComponent],
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
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
        {
          provide: FeaturesConfig,
          useValue: {
            features: { level: '5.1' },
          },
        },
      ],
    })
      .overrideComponent(QuickOrderComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            QuickOrderFormComponent,
            QuickOrderTableComponent,
            ProgressButtonComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockQuickOrderFormComponent,
            MockQuickOrderTableComponent,
            MockProgressButtonComponent,
          ],
        },
      })
      .compileComponents();

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

  it('should display header', () => {
    expect(el.query(By.css('h2')).nativeElement.textContent?.trim()).toEqual(
      'quickOrderList.header'
    );
  });

  it('should call service method clearDeletedEntries on component destroy', () => {
    vi.spyOn(quickOrderService, 'clearDeletedEntries');
    component.ngOnDestroy();

    expect(quickOrderService.clearDeletedEntries).toHaveBeenCalled();
  });

  it('should trigger clear the list method from the service', () => {
    vi.spyOn(quickOrderService, 'clearList');
    vi.spyOn(globalMessageService, 'add').mockImplementation(() => {});

    component.clear();
    expect(quickOrderService.clearList).toHaveBeenCalled();
    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'quickOrderTable.listCleared',
      },
      GlobalMessageType.MSG_TYPE_INFO
    );
  });

  describe('should trigger add to cart', () => {
    it('in standard way', () => {
      vi.spyOn(quickOrderService, 'addToCart').mockReturnValue(
        of([[mockEntry], []])
      );
      vi.spyOn(globalMessageService, 'add').mockImplementation(() => {});

      component.addToCart([mockEntry]);

      expect(quickOrderService.addToCart).toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'quickOrderTable.addedtoCart',
        },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });

    it('with warning and success messages', () => {
      vi.spyOn(quickOrderService, 'addToCart').mockReturnValue(
        of([[mockEntry, mockEntry2], [mockQuickOrderAddEntryEvent]])
      );

      component.addToCart([mockEntry, mockEntry2]);
      fixture.detectChanges();

      expect(quickOrderService.addToCart).toHaveBeenCalled();
      expect(el.query(By.css('.quick-order-warnings-message'))).toBeTruthy();
    });

    it('and get info message that list is empty', () => {
      vi.spyOn(quickOrderService, 'addToCart').mockReturnValue(of([[], []]));

      component.addToCart([]);
      fixture.detectChanges();

      expect(quickOrderService.addToCart).not.toHaveBeenCalled();
      expect(
        el.query(By.css('.quick-order-add-to-cart-information-message'))
      ).toBeTruthy();
    });
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

  describe('on undoDeletion method', () => {
    it('should trigger restoreSoftDeletedEntry from service', () => {
      vi.spyOn(quickOrderService, 'restoreSoftDeletedEntry');

      component.undoDeletion(mockEntry);
      expect(quickOrderService.restoreSoftDeletedEntry).toHaveBeenCalledWith(
        mockEntry.product?.code
      );
    });

    it('should not trigger restoreSoftDeletedEntry from service on empty entry', () => {
      vi.spyOn(quickOrderService, 'restoreSoftDeletedEntry');

      component.undoDeletion(mockEmptyEntry);
      expect(quickOrderService.restoreSoftDeletedEntry).not.toHaveBeenCalled();
    });
  });

  describe('on clearDeletion method', () => {
    it('should trigger hardDeleteEntry from service', () => {
      vi.spyOn(quickOrderService, 'hardDeleteEntry');

      component.clearDeletion(mockEntry);
      expect(quickOrderService.hardDeleteEntry).toHaveBeenCalledWith(
        mockEntry.product?.code
      );
    });

    it('should not trigger hardDeleteEntry from service on empty entry', () => {
      vi.spyOn(quickOrderService, 'hardDeleteEntry');

      component.clearDeletion(mockEmptyEntry);
      expect(quickOrderService.hardDeleteEntry).not.toHaveBeenCalled();
    });
  });

  it('should get information if there is possible to add more products', () => {
    vi.spyOn(quickOrderService, 'canAdd');

    component.canAddProduct().subscribe((canAdd) => {
      expect(canAdd).toBeTruthy();
    });
  });

  describe('addToCartInformation$', () => {
    it('should return true value for show add to cart information', () => {
      component.addToCart([]);

      component.addToCartInformation$.subscribe((value) => {
        expect(value).toBeTruthy();
      });
    });

    it('should emit false value to show add to cart information on clear method', () => {
      component.addToCart([mockEntry]);
      component.clearAddToCartInformation();

      component.addToCartInformation$.subscribe((value) => {
        expect(value).toBeFalsy();
      });
    });
  });

  it('should trigger clearNonPurchasableProductError on clearNonPurchasableError', () => {
    vi.spyOn(
      quickOrderService,
      'clearNonPurchasableProductError'
    );

    component.clearNonPurchasableError();

    expect(
      quickOrderService.clearNonPurchasableProductError
    ).toHaveBeenCalled();
  });
});
