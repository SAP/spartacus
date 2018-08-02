import {
  Component,
  Input,
  forwardRef,
  Output,
  EventEmitter
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const COUNTER_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  /* tslint:disable-next-line */
  useExisting: forwardRef(() => ItemCounterComponent),
  multi: true
};

@Component({
  selector: 'y-item-counter',
  templateUrl: './item-counter.component.html',
  styleUrls: ['./item-counter.component.scss'],
  providers: [COUNTER_CONTROL_ACCESSOR]
})
export class ItemCounterComponent implements ControlValueAccessor {
  value = 0;
  @Input() step = 1;
  @Input() min = 0;
  @Input() max = 0;

  @Output() change = new EventEmitter<any>();

  focus: boolean;

  private onTouch = () => {};
  private onModelChange = (rating: number) => {};

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
    this.onTouch();
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

  increment() {
    const updatedQuantity = this.value + this.step;
    if (this.value < this.max) {
      this.writeValue(updatedQuantity);
      this.change.emit(updatedQuantity);
    }
    this.onTouch();
  }

  decrement() {
    const updatedQuantity = this.value - this.step;
    if (this.value > this.min) {
      this.writeValue(updatedQuantity);
      this.change.emit(updatedQuantity);
    }
    this.onTouch();
  }

  // ControlValueAccessor interface

  registerOnTouched(fn) {
    this.onTouch = fn;
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  writeValue(value) {
    this.value = value || 0;
    this.onModelChange(this.value);
  }
}
