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

const testData = [
  { incomingValue: 0, adjustedValue: 1, isOutOfRange: true },
  { incomingValue: 1, adjustedValue: 1, isOutOfRange: false },
  { incomingValue: 2, adjustedValue: 2, isOutOfRange: false },
  { incomingValue: 5, adjustedValue: 5, isOutOfRange: false },
  { incomingValue: 6, adjustedValue: 5, isOutOfRange: true }
];

fdescribe('ItemCounterComponent', () => {
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
    spyOn(itemCounterComponent, 'increment').and.callThrough();
    spyOn(itemCounterComponent, 'updateValue').and.callThrough();
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

  describe('increment()', () => {
    it('should increment value when it is less than max', () => {
      itemCounterComponent.value = 1;
      itemCounterComponent.min = 1;
      itemCounterComponent.max = 2;
      itemCounterComponent.increment();

      expect(itemCounterComponent.value).toEqual(2);
      expect(itemCounterComponent.update.emit).toHaveBeenCalled();
    });
  });

  describe('decrement()', () => {
    it('should decrement value when it is greater than min', () => {
      itemCounterComponent.value = 3;
      itemCounterComponent.min = 2;
      itemCounterComponent.max = 5;
      itemCounterComponent.decrement();

      expect(itemCounterComponent.value).toEqual(2);
      expect(itemCounterComponent.update.emit).toHaveBeenCalled();
    });
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

  it('should verify is value out of range', () => {
    itemCounterComponent.min = 1;
    itemCounterComponent.max = 5;

    testData.forEach(({ incomingValue, isOutOfRange }) => {
      expect(itemCounterComponent.isOutOfRange(incomingValue)).toBe(
        isOutOfRange
      );
    });
  });
  describe('onInput()', () => {
    it('should call manualChange with value', () => {
      itemCounterComponent.min = 1;
      itemCounterComponent.max = 5;
      const inputEvent = { target: { value: '3' } } as any;
      itemCounterComponent.onInput(inputEvent);
      expect(itemCounterComponent.manualChange).toHaveBeenCalledWith(3);
    });

    it('should not call manualChange', () => {
      itemCounterComponent.min = 1;
      itemCounterComponent.max = 5;
      const inputEvent = { target: {} } as any;
      itemCounterComponent.onInput(inputEvent);
      expect(itemCounterComponent.manualChange).not.toHaveBeenCalled();
    });
  });
});
