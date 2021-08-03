import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'cx-progress-button',
  templateUrl: './progress-button.component.html',
})
export class ProgressButtonComponent {
  @Input()
  loading = false;

  @Output()
  clikEvent = new EventEmitter<void>();

  constructor() {}
}
