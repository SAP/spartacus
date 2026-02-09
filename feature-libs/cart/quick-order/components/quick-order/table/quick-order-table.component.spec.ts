import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OrderEntry } from '@spartacus/cart/base/root';
import {
  CxDatePipe,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import { QuickOrderItemComponent } from './item/quick-order-item.component';
import { QuickOrderTableComponent } from './quick-order-table.component';

const mockEntries: OrderEntry[] = [
  {
    quantity: 1,
    product: { name: 'mockProduct', code: 'mockCode' },
  },
];

@Component({
  template: '',
  selector: '[cx-quick-order-item], cx-quick-order-item',
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
      imports: [QuickOrderTableComponent],
    })
      .overrideComponent(QuickOrderTableComponent, {
        remove: {
          imports: [QuickOrderItemComponent, TranslatePipe, CxDatePipe],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockQuickOrderItemComponent,
          ],
        },
      })
      .compileComponents();
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
