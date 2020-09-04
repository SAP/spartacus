import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum OrganizationMessageType {
  NOTIFY = 'notify',
  PROMPT = 'prompt',
}
@Component({
  selector: 'cx-organization-message',
  templateUrl: './organization-message.component.html',
})
export class OrganizationMessageComponent {
  @HostBinding('class') type: OrganizationMessageType;
  @HostBinding('class.hide') hide = true;

  message$ = new BehaviorSubject(undefined);

  @Input() i18nCancel = 'organization.cancel';
  @Input() i18nConfirm = 'organization.ok';

  @Input()
  set message(value) {
    this.notify(value);
  }
  get message() {
    return 'xyz';
  }

  @Output() confirm = new EventEmitter();

  prompt(message: string) {
    this.show(message);
    this.type = OrganizationMessageType.PROMPT;
  }

  notify(message: string) {
    this.show(message);
    this.type = OrganizationMessageType.NOTIFY;
  }

  protected show(message: string) {
    if (message && message !== '') {
      this.message$.next(message);
      this.hide = false;
    }
  }

  close() {
    this.hide = true;
  }

  handleConfirm() {
    this.confirm.emit(true);
  }
}
