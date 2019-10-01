import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cx-item-counter',
  templateUrl: './item-counter.component.html',
})
export class ItemCounterComponent {
  @Input() min = 1;
  @Input() max: number;
  @Input() control: FormControl;

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
