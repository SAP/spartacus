import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import { I18nTestingModule, OrderEntry } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { QuickOrderTableComponent } from './quick-order-table.component';

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

describe('QuickOrderTableComponent', () => {
  let component: QuickOrderTableComponent;
  let fixture: ComponentFixture<QuickOrderTableComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [QuickOrderTableComponent],
      providers: [
        { provide: QuickOrderFacade, useClass: MockQuickOrderFacade },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickOrderTableComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('if there are entries', () => {
    it('should show the table header', () => {
      expect(el.query(By.css('.quick-order-table-header'))).toBeTruthy();
    });

    it('should show the table row', () => {
      expect(el.query(By.css('.quick-order-table-row'))).toBeTruthy();
    });
  });
});
