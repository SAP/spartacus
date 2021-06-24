import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ActiveCartService,
  I18nTestingModule,
  OrderEntry,
  Product,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { QuickOrderStatePersistenceService } from '../../core/services/quick-order-state-persistance.service';
import { QuickOrderService } from '../../core/services/quick-order.service';
import { QuickOrderComponent } from './quick-order-container.component';

const mockProduct: Product = {
  code: '123456789',
};
const mockEntry: OrderEntry = {
  product: mockProduct,
};

class MockQuickOrderService implements Partial<QuickOrderService> {
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

describe('QuickOrderComponent', () => {
  let component: QuickOrderComponent;
  let fixture: ComponentFixture<QuickOrderComponent>;
  let activeCartService: ActiveCartService;
  let quickOrderService: QuickOrderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [QuickOrderComponent],
      providers: [
        { provide: ActiveCartService, useClass: MockActiveCartService },
        { provide: QuickOrderService, useClass: MockQuickOrderService },
        QuickOrderStatePersistenceService,
      ],
    }).compileComponents();

    activeCartService = TestBed.inject(ActiveCartService);
    quickOrderService = TestBed.inject(QuickOrderService);
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

    component.clear();
    expect(quickOrderService.clearList).toHaveBeenCalled();
  });

  it('should trigger add to cart', () => {
    spyOn(quickOrderService, 'clearList');
    spyOn(activeCartService, 'addEntries');

    component.addToCart();

    let entryList: OrderEntry[];
    component.entries$.subscribe((entries) => {
      entryList = entries;
    });

    expect(activeCartService.addEntries).toHaveBeenCalledWith(entryList);
    expect(quickOrderService.clearList).toHaveBeenCalled();
  });
});
