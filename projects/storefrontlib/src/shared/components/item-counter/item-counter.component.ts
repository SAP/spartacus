import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

/**
 * Provides a UI to manage the count of the quantity, typically by using
 * increase and decrease functinality. The item counter expects an input `FormControl`
 * so that the state of the control can be managed outside of this component.
 */
@Component({
  selector: 'cx-item-counter',
  templateUrl: './item-counter.component.html',
  // do not use OnPush change detection strategy as we would not
  // get updates of other form control state (disabled). We want to have a
  // disabled state in order to ensure that the control cannot be used while
  // the cart is updated.
})
export class ItemCounterComponent {
  /**
   * Holds the value of the counter, the state of the `FormControl`
   * can be managed outside of the item counter.
   */
  @Input() control: FormControl;

  /**
   * This can be used in case an item has a minmum order quantity.
   * @default 1
   */
  @Input() min = 1;

  /**
   * This can be used in case an item has a maximum order quantity.
   */
  @Input() max: number;

  /**
   * The step is used to increment the count. It is supposed to be a
   * positive inteteger or float.
   * @default 1
   */
  @Input() step = 1;

  /**
   * Inidicates that the input can be manually set to zero,
   * despite the fact that the input controls will be limited to
   * the minimum. The zero value can be used to remove an item.
   */
  @Input() allowZero = false;

  private _control$: Observable<FormControl>;

  /**
   * In readonly mode the item counter will only be shown as a label,
   * the form controls are not rendered.
   * Please not that readonly is different from the `disabled` form state.
   * @default false
   */
  @HostBinding('class.readonly') @Input() readonly = false;

  @ViewChild('qty') private input: ElementRef<HTMLInputElement>;

  @HostListener('click') handleClick() {
    this.input.nativeElement.focus();
  }

  increment() {
    // it's too early to use the `stepUp` and `stepDown` API...
    // let's wait for FF: https://caniuse.com/#search=stepUp
    this.control.setValue(this.control.value + this.step);
    this.control.markAsDirty();
  }

  decrement() {
    this.control.setValue(this.control.value - this.step);
    this.control.markAsDirty();
  }

  /**
   * Returns an observable with the control. The value changes of the
   * control are intercepted in order to suppress invalid values.
   */
  getControl(): Observable<FormControl> {
    if (!this._control$) {
      this._control$ = this.control.valueChanges.pipe(
        startWith(this.control.value),
        tap(value =>
          this.control.setValue(this.getValidCount(value), { emitEvent: false })
        ),
        map(() => this.control)
      );
    }
    return this._control$;
  }

  /**
   * Validate that the given value is in between
   * the `min` and `max` value. If the value is out
   * of  the min/max range, it will be altered.
   * If `allowZero` is set to true, the 0 value is ignored.
   *
   */
  private getValidCount(value: number) {
    if (value < this.min && !(value === 0 && this.allowZero)) {
      value = this.min;
    }
    if (this.max && value > this.max) {
      value = this.max;
    }
    return value;
  }
}
