import {
  Component,
  OnInit,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
  ElementRef,
  Renderer2
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
  private input: ElementRef;

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
  isValueChangable = false;

  @Output()
  update = new EventEmitter<number>();

  focus: boolean;

  ngOnInit() {
    this.writeValue(this.min || 0);
  }

  constructor(private renderer: Renderer2) {}

  onTouch = () => {};
  onModelChange = (_rating: number) => {};

  manualChange(incomingValue: number): void {
    const newValue =
      incomingValue > this.max
        ? this.max
        : incomingValue < this.min
        ? this.min
        : incomingValue;

    if (!this.async) {
      this.writeValue(newValue);
    }

    this.update.emit(newValue);
    /* We use the value from the input, however, this value
      is not the correct value that should be displayed. The correct value to display
      is this.value, which the parent updates if the async call succeed. If the call
      fails, then the input will need to display this.value, and not what the user
      recently typed in */
    this.renderer.setProperty(this.input.nativeElement, 'value', this.value);
  }

  hasError(): boolean {
    if (this.value < this.min) {
      return true;
    }
    if (this.value > this.max) {
      return true;
    }
    return false;
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
    this.onTouch();
  }

  onInput(event): void {
    const { value } = event.target;
    if (value) {
      this.value = Number(value);
      this.update.emit(this.value);
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
    const updatedQuantity = this.value + this.step;
    if (this.value < this.max || !this.max) {
      if (!this.async) {
        // If the async flag is true, then the parent component is responsible for updating the form
        this.writeValue(updatedQuantity);
      }
      // Additionally, we emit a change event, so that users may optionally do something on change
      this.update.emit(updatedQuantity);
    }
    this.onTouch();
  }

  decrement(): void {
    const updatedQuantity = this.value - this.step;
    if (this.value > this.min || !this.min) {
      if (!this.async) {
        // If the async flag is true, then the parent component is responsible for updating the form
        this.writeValue(updatedQuantity);
      }
      // Additionally, we emit a change event, so that users may optionally do something on change
      this.update.emit(updatedQuantity);
    }
    this.onTouch();
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
}
