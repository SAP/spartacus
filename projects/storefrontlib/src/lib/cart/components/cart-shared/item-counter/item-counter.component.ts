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
  @Input() value = 0;
  @Input() step = 1;
  @Input() min = 0;
  @Input() max = 0;

  @Output() change = new EventEmitter<any>();

  focus: boolean;

  private onTouch: Function;
  private onModelChange: Function;

  registerOnTouched(fn) {
    this.onTouch = fn;
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  writeValue(value) {
    this.value = value || 0;
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
    if (this.value < this.max) {
      this.value = this.value + this.step;
      this.onModelChange(this.value);
      this.change.emit();
    }
    this.onTouch();
  }

  decrement() {
    if (this.value > this.min) {
      this.value = this.value - this.step;
      this.onModelChange(this.value);
      this.change.emit();
    }
    this.onTouch();
  }

  debounceIncAndDec() {}
}
