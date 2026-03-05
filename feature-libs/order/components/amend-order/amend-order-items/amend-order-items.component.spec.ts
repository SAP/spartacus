import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import {
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import { ItemCounterComponent, MediaComponent } from '@spartacus/storefront';
import { OrderAmendService } from '../amend-order.service';
import { CancelOrReturnItemsComponent } from './amend-order-items.component';

import createSpy = jasmine.createSpy;

const mockEntries = [
  {
    id: 1,
    quantity: 5,
    entryNumber: 1,
    returnableQuantity: 4,
    returnedQuantity: 3,
    cancellableQuantity: 2,
    cancelledQuantity: 1,
    product: { code: 'test' },
  },
];
const mockForm: UntypedFormGroup = new UntypedFormGroup({});
const entryGroup = new UntypedFormGroup({});
mockForm.addControl('entries', entryGroup);
mockEntries.forEach((entry) => {
  const key = entry.entryNumber.toString();
  entryGroup.addControl(key, new UntypedFormControl(0));
});

@Component({
  template: '',
  selector: 'cx-media',
})
class MockMediaComponent {
  @Input() container: any;
  @Input() format: any;
}

@Component({
  template: '',
  selector: 'cx-item-counter',
})
class MockItemCounterComponent {
  @Input() min: any;
  @Input() max: any;
  @Input() readonly: any;
  @Input() control: any;
}

class MockOrderAmendService {
  getAmendedPrice = createSpy();
  getForm() {}
  getMaxAmendQuantity() {
    return 99;
  }
}

describe('CancelOrReturnItemsComponent', () => {
  let component: CancelOrReturnItemsComponent;
  let fixture: ComponentFixture<CancelOrReturnItemsComponent>;
  let orderAmendService: OrderAmendService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CancelOrReturnItemsComponent],
      providers: [
        {
          provide: OrderAmendService,
          useClass: MockOrderAmendService,
        },
      ],
    })
      .overrideComponent(CancelOrReturnItemsComponent, {
        remove: {
          imports: [TranslatePipe, MediaComponent, ItemCounterComponent],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockMediaComponent,
            MockItemCounterComponent,
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelOrReturnItemsComponent);
    component = fixture.componentInstance;
    orderAmendService = TestBed.inject(OrderAmendService);

    component.entries = mockEntries;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set all quanities to max values', () => {
    component.setAll(mockForm);
    expect(entryGroup.get('1').value).toEqual(99);
  });

  it('should call getAmendedPrice', () => {
    component.getItemPrice(mockEntries[0]);
    expect(orderAmendService.getAmendedPrice).toHaveBeenCalledWith(
      mockEntries[0]
    );
  });
});
