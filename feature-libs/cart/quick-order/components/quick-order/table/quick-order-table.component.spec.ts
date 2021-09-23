import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, OrderEntry } from '@spartacus/core';
import { QuickOrderTableComponent } from './quick-order-table.component';

const mockEntries: OrderEntry[] = [
  {
    quantity: 1,
    product: { name: 'mockProduct', code: 'mockCode' },
  },
];

@Component({
  template: '',
  selector: 'cx-quick-order-item',
})
class MockQuickOrderItemComponent {
  @Input() entry: OrderEntry;
  @Input() index: number;
  @Input() loading: boolean;
}

describe('QuickOrderTableComponent', () => {
  let component: QuickOrderTableComponent;
  let fixture: ComponentFixture<QuickOrderTableComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [QuickOrderTableComponent, MockQuickOrderItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickOrderTableComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.entries = mockEntries;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('if there are entries', () => {
    it('should show the table header', () => {
      expect(el.query(By.css('.cx-quick-order-table-header'))).toBeTruthy();
    });

    it('should show the table row', () => {
      expect(el.query(By.css('.cx-quick-order-table-row'))).toBeTruthy();
    });
  });
});
