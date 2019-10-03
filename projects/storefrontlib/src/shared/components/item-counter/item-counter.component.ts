import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * Provides a UI to manage the count of the quantity, typically by using
 * increase and decrease functinality. The item counter expects an input `FormControl`
 * so that the state of the control can be managed outside of this component.
 */
@Component({
  selector: 'cx-item-counter',
  templateUrl: './item-counter.component.html',
  // we do not use OnPush change detection strategy here, as we would not
  // get updates of other form control state (disabled).
  // We could observe the form's root state in order to move to OnPush.
})
export class ItemCounterComponent {
  /**
   * Holds the value of the counter, the state of the `FormControl`
   * can be managed outside of the item counter.
   */
  @Input() control: FormControl;

  /**
   * This can be used in case an item has a minmum order quantity.
   */
  @Input() min = 1;

  /**
   * This can be used in case an item has a maximum order quantity.
   */
  @Input() max: number;

  /**
   * In readonly mode the item counter will only be shown as a label,
   * the form controls are not rendered.
   */
  @HostBinding('class.readonly') @Input() readonly = false;

  @ViewChild('qty', { static: false }) private input: ElementRef<HTMLElement>;

  @HostListener('click')
  handleClick() {
    this.input.nativeElement.focus();
  }

  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (['ArrowUp', 'ArrowRight'].includes(event.code)) {
      this.increment();
    }
    if (['ArrowDown', 'ArrowLeft', 'Minus'].includes(event.code)) {
      this.decrement();
    }
  }

  increment() {
    this.increase(1);
  }

  decrement() {
    this.increase(-1);
  }

  private increase(value: number) {
    let newValue = this.control.value + value;
    if (this.min && newValue < this.min) {
      newValue = this.min;
    } else if (this.max && newValue > this.max) {
      newValue = this.max;
    }
    this.control.setValue(newValue);
  }
}
