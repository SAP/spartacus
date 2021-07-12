import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import { I18nTestingModule, OrderEntry } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { QuickOrderListComponent } from './quick-order-list.component';

const mockEntries: OrderEntry[] = [
  {
    quantity: 1,
    product: { name: 'mockProduct', code: 'mockCode' },
  },
];

const mockEntries$ = new BehaviorSubject<OrderEntry[]>(mockEntries);

class MockQuickOrderFacade implements Partial<QuickOrderFacade> {
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
        { provide: QuickOrderFacade, useClass: MockQuickOrderFacade },
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
