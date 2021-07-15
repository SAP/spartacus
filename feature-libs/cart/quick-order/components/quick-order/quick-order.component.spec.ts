import { ComponentFixture, TestBed } from '@angular/core/testing';
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
import { BehaviorSubject, Observable, of } from 'rxjs';
import { QuickOrderStatePersistenceService } from '../../core/services/quick-order-state-persistance.service';
import { QuickOrderComponent } from './quick-order.component';

const mockProduct: Product = {
  code: '123456789',
};
const mockEntry: OrderEntry = {
  product: mockProduct,
};

class MockQuickOrderFacade implements Partial<QuickOrderFacade> {
  getEntries(): BehaviorSubject<OrderEntry[]> {
    return new BehaviorSubject<OrderEntry[]>([mockEntry]);
  }
  clearList(): void {}
}

class MockActiveCartService implements Partial<ActiveCartService> {
  getActiveCartId(): Observable<string> {
    return of('123456789');
  }
  addEntries(_cartEntries: OrderEntry[]): void {}
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add(
    _text: string | Translatable,
    _type: GlobalMessageType,
    _timeout?: number
  ): void {}
}

describe('QuickOrderComponent', () => {
  let component: QuickOrderComponent;
  let fixture: ComponentFixture<QuickOrderComponent>;
  let activeCartService: ActiveCartService;
  let quickOrderService: QuickOrderFacade;
  let globalMessageService: GlobalMessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [QuickOrderComponent],
      providers: [
        { provide: ActiveCartService, useClass: MockActiveCartService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: QuickOrderFacade, useClass: MockQuickOrderFacade },
        QuickOrderStatePersistenceService,
      ],
    }).compileComponents();

    activeCartService = TestBed.inject(ActiveCartService);
    quickOrderService = TestBed.inject(QuickOrderFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickOrderComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger clear the list method from the service', () => {
    spyOn(quickOrderService, 'clearList');
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
    spyOn(quickOrderService, 'clearList');
    spyOn(activeCartService, 'addEntries');
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
});
