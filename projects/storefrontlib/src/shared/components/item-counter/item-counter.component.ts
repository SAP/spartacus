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

  private _control$: Observable<FormControl>;

  /**
   * In readonly mode the item counter will only be shown as a label,
   * the form controls are not rendered.
   * Please not that readonly is different from the `disabled` form state.
   * @default false
   */
  @HostBinding('class.readonly') @Input() readonly = false;

  @ViewChild('qty', { static: false }) private input: ElementRef<HTMLElement>;

  @HostListener('click')
  handleClick() {
    this.input.nativeElement.focus();
  }

  increment() {
    // it's too early to use the `stepUp` and `stepDown` API...
    // let's wait for FF: https://caniuse.com/#search=stepUp
    this.control.setValue(this.control.value + this.step);
  }

  decrement() {
    this.control.setValue(this.control.value - this.step);
  }

  /**
   * Returns an observable with the control. The value changes of the
   * control are intercepted in order to suppress invalid values.
   */
  getControl(): Observable<FormControl> {
    if (!this._control$) {
      this._control$ = this.control.valueChanges.pipe(
        startWith(this.control.value),
        tap(value => {
          if (value < (this.min || 1)) {
            this.control.setValue(this.min, { emitEvent: false });
          }
          if (this.max && value > this.max) {
            this.control.setValue(this.max, { emitEvent: false });
          }
        }),
        map(() => this.control)
      );
    }
    return this._control$;
  }
}
