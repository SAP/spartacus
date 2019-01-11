import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ItemCounterComponent } from './item-counter.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

class MockEvent {
  code: string;

  preventDefault() {}

  stopPropagation() {}
}

describe('ItemCounterComponent', () => {
  let itemCounterComponent: ItemCounterComponent;
  let fixture: ComponentFixture<ItemCounterComponent>;

  let keyBoardEvent: MockEvent;
  let focusEvent: FocusEvent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [ItemCounterComponent],
      providers: [
        { provide: Function },
        { provide: KeyboardEvent, useClass: MockEvent },
        { provide: FocusEvent, useClass: MockEvent },
        { provide: MockEvent }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCounterComponent);
    itemCounterComponent = fixture.componentInstance;
    itemCounterComponent.input = { nativeElement: { value: '' } };

    keyBoardEvent = TestBed.get(KeyboardEvent);
    focusEvent = TestBed.get(FocusEvent);

    spyOn(itemCounterComponent, 'decrement').and.callThrough();
    spyOn(itemCounterComponent, 'hasError').and.callThrough();
    spyOn(itemCounterComponent, 'increment').and.callThrough();
    spyOn(itemCounterComponent, 'updateValue').and.callThrough();
    spyOn(itemCounterComponent, 'adjustValueInRange').and.callThrough();
    spyOn(itemCounterComponent, 'isOutOfRange').and.callThrough();
    spyOn(itemCounterComponent, 'manualChange').and.callThrough();
    spyOn(itemCounterComponent.update, 'emit').and.callThrough();
    spyOn(keyBoardEvent, 'preventDefault').and.callThrough();
    spyOn(keyBoardEvent, 'stopPropagation').and.callThrough();
    spyOn(focusEvent, 'preventDefault').and.callThrough();
    spyOn(focusEvent, 'stopPropagation').and.callThrough();
  });

  it('should create cart details component', () => {
    expect(itemCounterComponent).toBeTruthy();
  });

  it('should call writeValue(value) with null value', () => {
    itemCounterComponent.writeValue(null);

    expect(itemCounterComponent.value).toEqual(0);
  });

  it('should call writeValue(value) with valid value', () => {
    itemCounterComponent.writeValue(3);

    expect(itemCounterComponent.value).toEqual(3);
  });

  it('should call onKeyDown(event: KeyboardEvent) where event contains a ArrowDown code', () => {
    keyBoardEvent.code = 'ArrowDown';
    itemCounterComponent.onKeyDown(keyBoardEvent as KeyboardEvent);

    expect(keyBoardEvent.preventDefault).toHaveBeenCalled();
    expect(keyBoardEvent.stopPropagation).toHaveBeenCalled();
  });

  it('should call onKeyDown(event: KeyboardEvent) where event contains a ArrowUp code', () => {
    keyBoardEvent.code = 'ArrowUp';
    itemCounterComponent.onKeyDown(keyBoardEvent as KeyboardEvent);

    expect(keyBoardEvent.preventDefault).toHaveBeenCalled();
    expect(keyBoardEvent.stopPropagation).toHaveBeenCalled();
  });

  it('should call onKeyDown(event: KeyboardEvent) where event contains a invalid code', () => {
    keyBoardEvent.code = 'InvalidCode';
    itemCounterComponent.onKeyDown(keyBoardEvent as KeyboardEvent);

    expect(keyBoardEvent.preventDefault).not.toHaveBeenCalled();
    expect(keyBoardEvent.stopPropagation).not.toHaveBeenCalled();
  });

  it('should call onBlur(event: FocusEvent)', () => {
    itemCounterComponent.onBlur(focusEvent);

    expect(itemCounterComponent.focus).toBeFalsy();
    expect(focusEvent.preventDefault).toHaveBeenCalled();
    expect(focusEvent.stopPropagation).toHaveBeenCalled();
  });

  it('should call onFocus(event: FocusEvent)', () => {
    itemCounterComponent.onFocus(focusEvent);

    expect(itemCounterComponent.focus).toBeTruthy();
    expect(focusEvent.preventDefault).toHaveBeenCalled();
    expect(focusEvent.stopPropagation).toHaveBeenCalled();
  });

  it('should call increment() with value less than max', () => {
    itemCounterComponent.value = 1;
    itemCounterComponent.min = 1;
    itemCounterComponent.max = 2;
    itemCounterComponent.increment();

    expect(itemCounterComponent.value).toEqual(2);
    expect(itemCounterComponent.update.emit).toHaveBeenCalled();
  });

  it('should call increment() with value greater than max', () => {
    itemCounterComponent.value = 3;
    itemCounterComponent.min = 1;
    itemCounterComponent.max = 2;
    itemCounterComponent.increment();

    expect(itemCounterComponent.value).toEqual(2);
    expect(itemCounterComponent.update.emit).toHaveBeenCalled();
  });

  it('should call decrement() with value greater than min', () => {
    itemCounterComponent.value = 3;
    itemCounterComponent.min = 2;
    itemCounterComponent.max = 5;
    itemCounterComponent.decrement();

    expect(itemCounterComponent.value).toEqual(2);
    expect(itemCounterComponent.update.emit).toHaveBeenCalled();
  });

  it('should call decrement() with value less than min', () => {
    itemCounterComponent.value = 1;
    itemCounterComponent.min = 2;
    itemCounterComponent.max = 5;
    itemCounterComponent.decrement();

    expect(itemCounterComponent.value).toEqual(2);
    expect(itemCounterComponent.update.emit).toHaveBeenCalled();
  });

  it('should not display input when isValueChangeable is not passed', () => {
    itemCounterComponent.isValueChangeable = false;
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('input.cx-item-counter__value'))
    ).toBeFalsy();
    expect(
      fixture.debugElement.query(By.css('div.cx-item-counter__value'))
    ).toBeTruthy();
  });

  it('should display input when isValueChangeable is passed', () => {
    itemCounterComponent.isValueChangeable = true;
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('input.cx-item-counter__value'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('div.cx-item-counter__value'))
    ).toBeFalsy();
  });

  it('should contain error when value is not in correct range', () => {
    itemCounterComponent.value = 61;
    itemCounterComponent.min = 1;
    itemCounterComponent.max = 5;
    expect(itemCounterComponent.hasError()).toBeTruthy();
  });

  it('should adjust value in range', () => {
    itemCounterComponent.min = 1;
    itemCounterComponent.max = 5;
    expect(itemCounterComponent.adjustValueInRange(7)).toEqual(5);
    expect(itemCounterComponent.adjustValueInRange(0)).toEqual(1);
    expect(itemCounterComponent.adjustValueInRange(3)).toEqual(3);
  });

  it('should verify is value out of range', () => {
    itemCounterComponent.min = 1;
    itemCounterComponent.max = 5;
    expect(itemCounterComponent.isOutOfRange(7)).toBeTruthy();
    expect(itemCounterComponent.isOutOfRange(0)).toBeTruthy();
    expect(itemCounterComponent.isOutOfRange(3)).toBeFalsy();
  });

  it('should try set manual change with wrong value', () => {
    itemCounterComponent.min = 1;
    itemCounterComponent.max = 5;
    itemCounterComponent.manualChange(7);
    expect(itemCounterComponent.isOutOfRange).toHaveBeenCalledWith(7);
    expect(itemCounterComponent.adjustValueInRange).toHaveBeenCalledWith(7);
    expect(itemCounterComponent.updateValue).toHaveBeenCalledWith(5);
  });

  it('should try set manual change with correct value', () => {
    itemCounterComponent.min = 1;
    itemCounterComponent.max = 5;
    itemCounterComponent.manualChange(3);
    expect(itemCounterComponent.isOutOfRange).toHaveBeenCalledWith(3);
    expect(itemCounterComponent.adjustValueInRange).toHaveBeenCalledWith(3);
    expect(itemCounterComponent.updateValue).toHaveBeenCalledWith(3);
  });

  it('should set value on input', () => {
    itemCounterComponent.min = 1;
    itemCounterComponent.max = 5;
    const inputEvent = { target: { value: '3' } };
    itemCounterComponent.onInput(inputEvent);
    expect(itemCounterComponent.manualChange).toHaveBeenCalledWith(3);
  });

  it('should not set value on input', () => {
    itemCounterComponent.min = 1;
    itemCounterComponent.max = 5;
    const inputEvent = { target: {} };
    itemCounterComponent.onInput(inputEvent);
    expect(itemCounterComponent.manualChange).not.toHaveBeenCalled();
  });
});
