import { Component, Input, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';

import { CancellationReturnItemsComponent } from './cancellation-return-items.component';

const mockEntries = [
  {
    id: 1,
    quantity: 5,
    entryNumber: 1,
    returnableQuantity: 4,
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
    el = fixture.debugElement;
    component = fixture.componentInstance;

    component.entries = mockEntries;
    component.ngOnInit();

    spyOn(component.confirm, 'emit').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to set return quantities complete', () => {
    const completeLink = el.query(By.css('a'));
    completeLink.nativeElement.dispatchEvent(new MouseEvent('click'));
    expect(component.form.value.entryInput[0].quantity).toEqual(4);

    const continueBtn = el.query(By.css('button'));
    expect(continueBtn.nativeElement.disabled).toEqual(false);
  });

  it('should disable the continue button when return quantities are not set', () => {
    component.form.value.entryInput[0].quantity = 0;
    component.disableEnableConfirm();
    expect(component.disableConfirm).toEqual(true);

    component.form.value.entryInput[0].quantity = 1;
    component.disableEnableConfirm();
    expect(component.disableConfirm).toEqual(false);
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
