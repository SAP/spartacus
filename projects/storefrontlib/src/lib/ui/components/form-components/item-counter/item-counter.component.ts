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
  @ViewChild('itemCounterInput')
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
  update = new EventEmitter<number>();

  focus: boolean;

  isValueOutOfRange = false;

  ngOnInit() {
    this.writeValue(this.min || 0);
  }

  constructor() {}

  onTouch: Function = () => {};
  onModelChange: Function = (_rating: number) => {};

  /**
   * Function set 'isValueOutOfRange' flag and adjust value in range. Then update model value and refresh input
   */
  manualChange(newValue: number) {
    this.isValueOutOfRange = this.isOutOfRange(newValue);

    this.updateValue(newValue);
    /* We use the value from the input, however, this value
      is not the correct value that should be displayed. The correct value to display
      is this.value, which the parent updates if the async call succeed. If the call
      fails, then the input will need to display this.value, and not what the user
      recently typed in */
    this.input.nativeElement.value = newValue;
  }

  /**
   * Verify value for decision about displaying error about range
   */
  isOutOfRange(value: number): boolean {
    return value < this.min || value > this.max;
  }

  onKeyDown(event: KeyboardEvent) {
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

  onInput(event: Event) {
    const { value } = event.target as any;
    if (value) {
      this.manualChange(Number(value));
    }
  }

  onBlur(event: FocusEvent) {
    this.focus = false;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }

  onFocus(event: FocusEvent) {
    this.focus = true;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }

  /**
   * Verify value that it can be incremented, if yes it does that.
   */
  increment() {
    this.manualChange(this.value + this.step);
  }

  /**
   * Verify value that it can be decremented, if yes it does that.
   */
  decrement() {
    this.manualChange(this.value - this.step);
  }

  // ControlValueAccessor interface

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  writeValue(value: number) {
    this.value = value;
    this.onModelChange(this.value);
  }

  /**
   * Set up new value for input and emit event outside
   */
  updateValue(updatedQuantity: number) {
    if (!this.async) {
      // If the async flag is true, then the parent component is responsible for updating the form
      this.writeValue(updatedQuantity);
    }

    // Additionally, we emit a change event, so that users may optionally do something on change
    this.update.emit(updatedQuantity);
    this.onTouch();
  }
}
