import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output
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
export class ItemCounterComponent implements OnInit, ControlValueAccessor {
  value = 0;
  @Input() step = 1;
  @Input() min;
  @Input() max;
  @Input() async = false;

  @Output() change = new EventEmitter<any>();

  focus: boolean;

  onTouch = () => {};
  onModelChange = (rating: number) => {};

  ngOnInit() {
    if (this.min) {
      this.value = this.min;
    }
  }

  manualChange(newQuantity) {
    if (newQuantity > this.max) {
      this.writeValue(this.max);
    } else if (newQuantity < this.min) {
      this.writeValue(this.min);
    } else {
      this.writeValue(newQuantity);
    }
    console.log('newQty', newQuantity, 'max', this.max, 'value', this.value);
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
    console.log('blur');
    this.focus = false;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }

  onFocus(event: FocusEvent) {
    console.log('focus');
    this.focus = true;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }

  increment() {
    const updatedQuantity = this.value + this.step;
    if (this.value < this.max || !this.max) {
      if (!this.async) {
        // If the async flag is true, then the parent component is responsible for updating the form
        this.writeValue(updatedQuantity);
      }
      // Additionally, we emit a change event, so that users may optionally do something on change
      this.change.emit(updatedQuantity);
    }
    this.onTouch();
  }

  decrement() {
    const updatedQuantity = this.value - this.step;
    if (this.value > this.min || !this.min) {
      if (!this.async) {
        // If the async flag is true, then the parent component is responsible for updating the form
        this.writeValue(updatedQuantity);
      }
      // Additionally, we emit a change event, so that users may optionally do something on change
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
