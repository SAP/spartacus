import { Component, Input, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';

import { CancellationReturnItemsComponent } from './cancellation-return-items.component';

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

describe('CancellationReturnItemsComponent', () => {
  let component: CancellationReturnItemsComponent;
  let fixture: ComponentFixture<CancellationReturnItemsComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [CancellationReturnItemsComponent, MockMediaComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellationReturnItemsComponent);
    component = fixture.componentInstance;

    component.entries = mockEntries;
    component.ngOnInit();
    fixture.detectChanges();
    el = fixture.debugElement;

    spyOn(component.confirm, 'emit').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the entry inputs in order return/cancel page', () => {
    const inputControl = (component.inputsControl.controls[0] as FormGroup)
      .controls;
    expect(inputControl.quantity.value).toEqual('');
    expect(inputControl.orderEntryNumber.value).toEqual(1);
  });

  it('should display the entry inputs in order confirmation page', () => {
    component.confirmRequest = true;
    component.ngOnInit();
    fixture.detectChanges();

    const inputControl = (component.inputsControl.controls[0] as FormGroup)
      .controls;
    expect(inputControl.quantity.value).toEqual(3);
    expect(inputControl.orderEntryNumber.value).toEqual(1);
  });

  it('should not display link or button in return/cancel confirmation page', () => {
    component.confirmRequest = true;
    component.ngOnInit();
    fixture.detectChanges();

    const completeLink = el.query(By.css('a'));
    expect(completeLink).toBeNull();

    const continueBtn = el.query(By.css('button'));
    expect(continueBtn).toBeNull();
  });

  it('should be able to set return/cancel quantities completely in order return/cancel page', () => {
    const completeLink = el.query(By.css('a'));
    completeLink.nativeElement.dispatchEvent(new MouseEvent('click'));
    expect(component.form.value.entryInput[0].quantity).toEqual(4);

    const continueBtn = el.query(By.css('button'));
    expect(continueBtn.nativeElement.disabled).toEqual(true);
  });

  it('should disable the continue button when return quantities are not set', () => {
    component.form.value.entryInput[0].quantity = 0;
    component.disableEnableConfirm();
    expect(component.disableConfirmBtn).toEqual(true);

    component.form.value.entryInput[0].quantity = 1;
    component.disableEnableConfirm();
    expect(component.disableConfirmBtn).toEqual(false);
  });

  it('should make the return quantities not greater than returnableQuantity', () => {
    spyOn(component, 'disableEnableConfirm').and.callThrough();

    component.onBlur('8', 0);
    expect(component.form.value.entryInput[0].quantity).toEqual(4);
    expect(component.disableEnableConfirm).toHaveBeenCalled();
  });

  it('should emit confirmation with entryInputs', () => {
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
