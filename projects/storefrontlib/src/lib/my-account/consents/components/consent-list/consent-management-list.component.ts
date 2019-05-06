import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConsentTemplate } from '@spartacus/core';

@Component({
  selector: 'cx-consent-management-list',
  templateUrl: './consent-management-list.component.html',
})
export class ConsentManagementListComponent {
  @Input()
  consentTemplates: ConsentTemplate[];

  @Input()
  doneBtnLabel: string;

  @Output()
  consentChanged = new EventEmitter<{
    given: boolean;
    template: ConsentTemplate;
  }>();

  @Output()
  done = new EventEmitter<void>();

  constructor() {}

  onConsentChanged(change: {
    given: boolean;
    template: ConsentTemplate;
  }): void {
    this.consentChanged.emit(change);
  }

  onDone(): void {
    this.done.emit();
  }
}
