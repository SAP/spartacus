import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'cx-progress-button',
  templateUrl: './progress-button.component.html',
})
export class ProgressButtonComponent {
  @Input()
  ariaLabel: string = '';

  @Input()
  class: string = '';

  @Input()
  disabled: boolean = false;

  @Input()
  loading: boolean = false;

  @Output()
  clikEvent = new EventEmitter<void>();

  constructor() {}
}
