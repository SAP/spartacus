import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, OrderEntry } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { QuickOrderService } from '../../core/services/quick-order.service';
import { QuickOrderListComponent } from './quick-order-list.component';

const mockEntries: OrderEntry[] = [
  {
    quantity: 1,
    product: { name: 'mockProduct', code: 'mockCode' },
  },
];

const mockEntries$ = new BehaviorSubject<OrderEntry[]>(mockEntries);

class MockQuickOrderService implements Partial<QuickOrderService> {
  getEntries(): BehaviorSubject<OrderEntry[]> {
    return mockEntries$;
  }
}

describe('QuickOrderListComponent', () => {
  let component: QuickOrderListComponent;
  let fixture: ComponentFixture<QuickOrderListComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [QuickOrderListComponent],
      providers: [
        { provide: QuickOrderService, useClass: MockQuickOrderService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickOrderListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('if there are entries', () => {
    it('should show the list header', () => {
      expect(el.query(By.css('.quick-order-list-header'))).toBeTruthy();
    });

    it('should show the list row', () => {
      expect(el.query(By.css('.quick-order-list-row'))).toBeTruthy();
    });
  });
});
