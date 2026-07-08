import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrderEntry } from '@spartacus/cart/base/root';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import {
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { ItemCounterComponent, MediaComponent } from '@spartacus/storefront';
import { Subject } from 'rxjs';
import { QuickOrderItemComponent } from './quick-order-item.component';

const mockIndex: number = 1;
const mockCodeSubject = new Subject<string>();
const mockEntry: OrderEntry = {
  quantity: 1,
  product: { name: 'mockProduct', code: 'mockCode' },
};

class MockQuickOrderFacade implements Partial<QuickOrderFacade> {
  softDeleteEntry(_index: number): void {}
  updateEntryQuantity(_index: number, _quantity: number): void {}
  setProductAdded(code: string): void {
    mockCodeSubject.next(code);
  }
  getProductAdded(): Subject<string> {
    return new Subject<string>();
  }
}

@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@Component({
  template: '',
  selector: 'cx-item-counter',
  imports: [ReactiveFormsModule, I18nTestingModule],
})
class MockItemCounterComponent {
  @Input() max: number;
  @Input() control: any;
  @Input() readonly: boolean;
}

@Component({
  template: '',
  selector: 'cx-media',
  imports: [ReactiveFormsModule, I18nTestingModule],
})
class MockMediaComponent {
  @Input() container;
  @Input() alt: string;
}

describe('QuickOrderItemComponent', () => {
  let component: QuickOrderItemComponent;
  let fixture: ComponentFixture<QuickOrderItemComponent>;
  let quickOrderService: QuickOrderFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        QuickOrderItemComponent,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: QuickOrderFacade, useClass: MockQuickOrderFacade },
      ],
    })
      .overrideComponent(QuickOrderItemComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            ItemCounterComponent,
            MediaComponent,
            UrlPipe,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockUrlPipe,
            MockItemCounterComponent,
            MockMediaComponent,
          ],
        },
      })
      .compileComponents();

    quickOrderService = TestBed.inject(QuickOrderFacade);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickOrderItemComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('entry', mockEntry);
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

  it('should delete entry', () => {
    spyOn(quickOrderService, 'softDeleteEntry');
    component.removeEntry();

    expect(quickOrderService.softDeleteEntry).toHaveBeenCalledWith(mockIndex);
  });

  it('should update entry on quantity change', () => {
    spyOn(quickOrderService, 'updateEntryQuantity');
    component.quantityControl.setValue(5);

    expect(quickOrderService.updateEntryQuantity).toHaveBeenCalledWith(
      mockIndex,
      5
    );
  });

  it('should update quantity on secondary product add', () => {
    spyOn(quickOrderService, 'getProductAdded').and.returnValue(
      mockCodeSubject
    );
    component.ngOnInit();
    quickOrderService.setProductAdded(mockEntry.product.code);

    expect(quickOrderService.getProductAdded).toHaveBeenCalled();
    expect(component.quantityControl.value).toEqual(mockEntry.quantity);
  });
});
