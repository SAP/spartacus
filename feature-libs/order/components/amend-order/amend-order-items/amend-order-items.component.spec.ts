import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { MockFeatureLevelDirective } from 'projects/storefrontlib/shared/test/mock-feature-level-directive';
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
const mockForm: FormGroup = new FormGroup({});
const entryGroup = new FormGroup({});
mockForm.addControl('entries', entryGroup);
mockEntries.forEach((entry) => {
  const key = entry.entryNumber.toString();
  entryGroup.addControl(key, new FormControl(0));
});

@Component({
  template: '',
  selector: 'cx-media',
})
class MockMediaComponent {
  @Input() container;
  @Input() format;
}

@Component({
  template: '',
  selector: 'cx-item-counter',
})
class MockItemCounterComponent {
  @Input() min;
  @Input() max;
  @Input() readonly;
  @Input() control;
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

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, I18nTestingModule],
        providers: [
          {
            provide: OrderAmendService,
            useClass: MockOrderAmendService,
          },
        ],
        declarations: [
          CancelOrReturnItemsComponent,
          MockMediaComponent,
          MockItemCounterComponent,
          MockFeatureLevelDirective,
        ],
      }).compileComponents();
    })
  );

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
