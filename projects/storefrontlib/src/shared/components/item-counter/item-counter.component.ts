import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const COUNTER_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  /* tslint:disable-next-line */
  useExisting: forwardRef(() => ItemCounterComponent),
  multi: true,
};

@Component({
  selector: 'cx-item-counter',
  templateUrl: './item-counter.component.html',
  providers: [COUNTER_CONTROL_ACCESSOR],
})
export class ItemCounterComponent
  implements OnInit, ControlValueAccessor, OnChanges, OnDestroy {
  @ViewChild('itemCounterInput', { static: false }) public input: ElementRef;

  @Input() value = 1;
  @Input() min = 1;
  @Input() max: number;
  @Input() async = false;
  @Input() cartIsLoading = false;

  @HostBinding('class.changeable') @Input() isValueChangeable = true;

  @Output() update = new EventEmitter<number>();

  inputControl: FormControl = new FormControl({
    disabled: this.isValueChangeable,
  });

  subscription: Subscription;

  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (event.code === 'ArrowUp' || event.code === 'ArrowRight') {
      this.increment();
    }

    if (event.code === 'ArrowDown' || event.code === 'ArrowLeft') {
      this.decrement();
    }
  }

  @HostListener('click')
  handleClick() {
    this.input.nativeElement.focus();
  }

  ngOnInit() {
    this.writeValue(this.min || 0);
    this.subscription = this.inputControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        if (value) {
          this.manualChange(Number(value));
        }
      });
  }

  ngOnChanges() {
    if (this.cartIsLoading) {
      this.inputControl.disable({
        onlySelf: true,
        emitEvent: false,
      });
    } else {
      this.inputControl.enable({
        onlySelf: true,
        emitEvent: false,
      });
    }
  }

  constructor(private renderer: Renderer2) {}

  onTouch: Function = () => {};
  onModelChange: Function = (_rating: number) => {};

  /**
   * If value is too small it will be set to min, if is too big it will be set to max.
   */
  adjustValueInRange(incomingValue: number): number {
    return incomingValue < this.min || !this.min
      ? this.min
      : incomingValue > this.max || !this.max
      ? this.max
      : incomingValue;
  }

  /**
   * Update model value and refresh input
   */
  manualChange(newValue: number): void {
    newValue = this.adjustValueInRange(newValue);
    this.updateValue(newValue);
    /* We use the value from the input, however, this value
      is not the correct value that should be displayed. The correct value to display
      is this.value, which the parent updates if the async call succeed. If the call
      fails, then the input will need to display this.value, and not what the user
      recently typed in */
    this.renderer.setProperty(this.input.nativeElement, 'value', newValue);
  }

  /**
   * Verify value that it can be incremented, if yes it does that.
   */
  increment(): void {
    this.manualChange(++this.value);
  }

  /**
   * Verify value that it can be decremented, if yes it does that.
   */
  decrement(): void {
    this.manualChange(--this.value);
  }

  // ControlValueAccessor interface

  registerOnTouched(fn: Function): void {
    this.onTouch = fn;
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  writeValue(value: number): void {
    this.value = value || this.min || 0;
    this.onModelChange(this.value);
  }

  /**
   * Set up new value for input and emit event outside
   */
  updateValue(updatedQuantity: number): void {
    if (!this.async) {
      // If the async flag is true, then the parent component is responsible for updating the form
      this.writeValue(updatedQuantity);
    }

    // Additionally, we emit a change event, so that users may optionally do something on change
    this.update.emit(updatedQuantity);
    this.onTouch();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
