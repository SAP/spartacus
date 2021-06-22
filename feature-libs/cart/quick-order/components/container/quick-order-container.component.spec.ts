import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  QuickOrderService,
  QuickOrderStatePersistenceService,
} from '@spartacus/cart/quick-order/core';
import {
  ActiveCartService,
  I18nTestingModule,
  OrderEntry,
  Product,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
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
class MockQuickOrderStatePersistenceService
  implements Partial<QuickOrderStatePersistenceService> {
  initSync(): void {}
}

fdescribe('QuickOrderComponent', () => {
  let component: QuickOrderComponent;
  let fixture: ComponentFixture<QuickOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [QuickOrderComponent],
      providers: [
        { provide: ActiveCartService, useClass: MockActiveCartService },
        { provide: QuickOrderService, useClass: MockQuickOrderService },
        {
          provide: QuickOrderStatePersistenceService,
          useClass: MockQuickOrderStatePersistenceService,
        },
        ,
      ],
    }).compileComponents();
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
});
