import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';

import { CancelOrReturnItemsComponent } from './cancellation-return-items.component';

const mockEntries = [
  {
    id: 1,
    quantity: 5,
    entryNumber: 1,
    returnableQuantity: 4,
    returnedQuantity: 3,
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

describe('CancelOrReturnItemsComponent', () => {
  let component: CancelOrReturnItemsComponent;
  let fixture: ComponentFixture<CancelOrReturnItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
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

    component.entries = mockEntries;
    spyOn(component.confirm, 'emit').and.callThrough();
    spyOn(component, 'disableEnableConfirm').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the entry inputs in order return/cancel page', () => {
    component.confirmRequest = false;
    mockEntries[0].returnedQuantity = undefined;
    component.ngOnInit();

    const inputControl = (component.inputsControl.controls[0] as FormGroup)
      .controls;
    expect(inputControl.quantity.value).toEqual(null);
    expect(inputControl.orderEntryNumber.value).toEqual(1);
  });

  it('should display the entry inputs in order confirmation page', () => {
    component.confirmRequest = true;
    mockEntries[0].returnedQuantity = 3;
    component.ngOnInit();

    const inputControl = (component.inputsControl.controls[0] as FormGroup)
      .controls;
    expect(inputControl.quantity.value).toEqual(3);
    expect(inputControl.orderEntryNumber.value).toEqual(1);
  });

  it('should be able to set return/cancel quantities to maximum in order return/cancel page', () => {
    component.confirmRequest = false;
    component.ngOnInit();
    component.setAll();

    expect(component.form.value.entryInput[0].quantity).toEqual(4);
    expect(component.disableEnableConfirm).toHaveBeenCalled();
  });

  it('should disable the continue button when return quantities are not set', () => {
    component.ngOnInit();

    component.form.value.entryInput[0].quantity = 0;
    component.disableEnableConfirm();
    expect(component.disableConfirmBtn).toEqual(true);

    component.form.value.entryInput[0].quantity = 1;
    component.disableEnableConfirm();
    expect(component.disableConfirmBtn).toEqual(false);
  });

  it('should emit confirmation with entryInputs', () => {
    component.ngOnInit();

    component.form.value.entryInput[0].quantity = 2;
    component.confirmEntryInputs();
    expect(component.confirm.emit).toHaveBeenCalledWith([
      {
        orderEntryNumber: 1,
        quantity: 2,
      },
    ]);
  });
});
