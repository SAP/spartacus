import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'cx-spinner-button',
  templateUrl: './spinner-button.component.html',
})
export class SpinnerButtonComponent {
  @Input()
  disabled = false;

  @Input()
  text: string;

  @Output()
  clikEvent = new EventEmitter<void>();

  constructor() {}
}
