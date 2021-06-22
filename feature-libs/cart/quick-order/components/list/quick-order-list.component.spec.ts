import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderEntry } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { QuickOrderService } from '@spartacus/cart/quick-order/core';
import { QuickOrderListComponent } from './quick-order-list.component';

const mockentries: OrderEntry[] = [
  {
    quantity: 1,
    product: { name: 'mockProduct', code: 'mockCode' },
  },
];

const mockentries$ = new BehaviorSubject<OrderEntry[]>(mockentries);

class MockQuickOrderService implements Partial<QuickOrderService> {
  getEntries(): BehaviorSubject<OrderEntry[]> {
    return mockentries$;
  }
}

describe('QuickOrderListComponent', () => {
  let component: QuickOrderListComponent;
  let fixture: ComponentFixture<QuickOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuickOrderListComponent],
      providers: [
        { provide: QuickOrderService, useClass: MockQuickOrderService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickOrderListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
