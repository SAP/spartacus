import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';

@Component({
  selector: 'cx-organization-message',
  template: '',
})
class OrganizationMessageComponent {
  @Input() i18nCancel;
  @Input() i18nConfirm;
  @Output() confirm = new EventEmitter();
  prompt() {}
  close() {}
}

@NgModule({
  declarations: [OrganizationMessageComponent],
  exports: [OrganizationMessageComponent],
})
export class OrganizationMessageTestingModule {}
