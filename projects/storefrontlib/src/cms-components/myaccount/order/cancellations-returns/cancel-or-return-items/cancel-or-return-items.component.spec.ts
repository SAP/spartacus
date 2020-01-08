import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { OrderCancelOrReturnService } from '../cancel-or-return.service';
import { CancelOrReturnItemsComponent } from './cancel-or-return-items.component';
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
  @Input() step;
  @Input() min;
  @Input() max;
  @Input() isValueChangeable;
}

class MockOrderCancelOrReturnService {
  getCancelledOrReturnedPrice = createSpy();
  getEntryCancelledOrReturnedQty(): number {
    return 1;
  }
}

describe('CancelOrReturnItemsComponent', () => {
  let component: CancelOrReturnItemsComponent;
  let fixture: ComponentFixture<CancelOrReturnItemsComponent>;
  // let returnService: MockOrderCancelOrReturnService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      providers: [
        {
          provide: OrderCancelOrReturnService,
          useClass: MockOrderCancelOrReturnService,
        },
      ],
      declarations: [
        CancelOrReturnItemsComponent,
        MockMediaComponent,
        MockItemCounterComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelOrReturnItemsComponent);
    component = fixture.componentInstance;
    // returnService = TestBed.get(OrderCancelOrReturnService as Type<
    //   OrderCancelOrReturnService
    // >);

    component.entries = mockEntries;
    // component.cancelOrder = false;
    // spyOn(component.confirm, 'emit').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize the entry inputs', () => {
  //   const inputControl = (component.inputsControl.controls[0] as FormGroup)
  //     .controls;
  //   expect(inputControl.quantity.value).toEqual(1);
  //   expect(inputControl.orderEntryNumber.value).toEqual(1);
  // });

  it('should be able to set return/cancel quantities to maximum in order return/cancel page', () => {
    // component.confirmRequest = false;
    // component.ngOnInit();
    // component.setAll();
    // expect(component.form.value.entryInput[0].quantity).toEqual(4);
    // expect(component.disableConfirmBtn).toEqual(false);
    // component.cancelOrder = true;
    // component.confirmRequest = false;
    // component.ngOnInit();
    // component.setAll();
    // expect(component.form.value.entryInput[0].quantity).toEqual(2);
    // expect(component.disableConfirmBtn).toEqual(false);
  });

  it('should disable the continue button when return quantities are not set', () => {
    // component.ngOnInit();
    // component.form.value.entryInput[0].quantity = 0;
    // component.updateQty();
    // expect(component.disableConfirmBtn).toEqual(true);
    // component.form.value.entryInput[0].quantity = 1;
    // component.updateQty();
    // expect(component.disableConfirmBtn).toEqual(false);
  });

  it('should emit confirmation with entryInputs', () => {
    // component.ngOnInit();
    // component.form.value.entryInput[0].quantity = 2;
    // component.confirmEntryInputs();
    // expect(component.confirm.emit).toHaveBeenCalledWith([
    //   {
    //     orderEntryNumber: 1,
    //     quantity: 2,
    //   },
    // ]);
  });

  it('should get item price', () => {
    // component.getItemPrice(mockEntries[0]);
    // expect(returnService.getCancelledOrReturnedPrice).toHaveBeenCalledWith(
    //   mockEntries[0]
    // );
  });
});
