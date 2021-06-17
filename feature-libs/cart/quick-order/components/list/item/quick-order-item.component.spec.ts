import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule, OrderEntry } from '@spartacus/core';
import { QuickOrderService } from 'feature-libs/cart/quick-order/core/services/quick-order.service';
import { QuickOrderItemComponent } from './quick-order-item.component';

const mockIndex: number = 1;
const mockEntry: OrderEntry = {
  quantity: 1,
  product: { name: 'mockProduct', code: 'mockCode' },
};

class MockQuickOrderService implements Partial<QuickOrderService> {
  removeEntry(_index: number): void {}
  updateEntryQuantity(_index: number, _quantity: number): void {}
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('QuickOrderItemComponent', () => {
  let component: QuickOrderItemComponent;
  let fixture: ComponentFixture<QuickOrderItemComponent>;
  let quickOrderService: QuickOrderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [QuickOrderItemComponent, MockUrlPipe],
      providers: [
        { provide: QuickOrderService, useClass: MockQuickOrderService },
      ],
    }).compileComponents();

    quickOrderService = TestBed.inject(QuickOrderService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickOrderItemComponent);
    component = fixture.componentInstance;

    component.entry = mockEntry;
    component.index = mockIndex;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form control on init', () => {
    component.ngOnInit();

    expect(component.quantityControl).toBeTruthy();
  });

  it('should remove entry', () => {
    spyOn(quickOrderService, 'removeEntry');
    component.removeEntry();

    expect(quickOrderService.removeEntry).toHaveBeenCalledWith(mockIndex);
  });

  it('should update entry on quantity change', () => {
    spyOn(quickOrderService, 'updateEntryQuantity');
    component.quantityControl.setValue(5);

    expect(quickOrderService.updateEntryQuantity).toHaveBeenCalledWith(
      mockIndex,
      5
    );
  });
});
