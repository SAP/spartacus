import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const COUNTER_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  /* tslint:disable-next-line */
  useExisting: forwardRef(() => ItemCounterComponent),
  multi: true
};

@Component({
  selector: 'cx-item-counter',
  templateUrl: './item-counter.component.html',
  styleUrls: ['./item-counter.component.scss'],
  providers: [COUNTER_CONTROL_ACCESSOR]
})
export class ItemCounterComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input')
  public input: ElementRef;

  value = 0;
  @Input()
  step = 1;
  @Input()
  min: number;
  @Input()
  max: number;
  @Input()
  async = false;
  @Input()
  cartIsLoading = false;
  @Input()
  isValueChangeable = false;

  @Output()
  update = new EventEmitter<any>();

  focus: boolean;

  outOfRange = false;

  ngOnInit() {
    this.writeValue(this.min || 0);
  }

  constructor() {}

  onTouch = () => {};
  onModelChange = (_rating: number) => {};

  adjustValueInRange(incomingValue): number {
    return incomingValue < this.min || !this.min
      ? this.min
      : incomingValue > this.max || !this.max
      ? this.max
      : incomingValue;
  }

  manualChange(newValue): void {
    this.outOfRange = this.isOutOfRange(newValue);
    newValue = this.adjustValueInRange(newValue);
    this.updateValue(newValue);
    /* We use the value from the input, however, this value
      is not the correct value that should be displayed. The correct value to display
      is this.value, which the parent updates if the async call succeed. If the call
      fails, then the input will need to display this.value, and not what the user
      recently typed in */
    this.input.nativeElement.value = newValue;
  }

  hasError(): boolean {
    return this.value < this.min || this.value > this.max;
  }

  isOutOfRange(value: number): boolean {
    return value < this.min || value > this.max;
  }

  isMaxOrMinValue(): boolean {
    return this.value === this.max || this.value === this.min;
  }

  onKeyDown(event: KeyboardEvent): void {
    const handlers = {
      ArrowDown: () => this.decrement(),
      ArrowUp: () => this.increment()
    };

    if (handlers[event.code]) {
      handlers[event.code]();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  onInput(event): void {
    const { value } = event.target;
    if (value) {
      this.manualChange(Number(value));
    }
  }

  onBlur(event: FocusEvent): void {
    this.focus = false;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }

  onFocus(event: FocusEvent): void {
    this.focus = true;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }

  increment(): void {
    this.outOfRange = false;
    const updatedQuantity =
      this.value < this.min || !this.min
        ? this.min
        : this.value < this.max || !this.max
        ? this.value + this.step
        : this.max;
    this.updateValue(updatedQuantity);
  }

  decrement(): void {
    this.outOfRange = false;
    const updatedQuantity =
      this.value > this.max || !this.max
        ? this.max
        : this.value > this.min || !this.min
        ? this.value - this.step
        : this.min;
    this.updateValue(updatedQuantity);
  }

  // ControlValueAccessor interface

  registerOnTouched(fn): void {
    this.onTouch = fn;
  }

  registerOnChange(fn): void {
    this.onModelChange = fn;
  }

  writeValue(value: number): void {
    this.value = value || this.min || 0;
    this.onModelChange(this.value);
  }

  updateValue(updatedQuantity) {
    if (!this.async) {
      // If the async flag is true, then the parent component is responsible for updating the form
      this.writeValue(updatedQuantity);
    }
    // Additionally, we emit a change event, so that users may optionally do something on change
    this.update.emit(updatedQuantity);
    this.onTouch();
  }
}
