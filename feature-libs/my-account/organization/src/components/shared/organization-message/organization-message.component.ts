import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

enum MessageType {
  notify = 'notify',
  prompt = 'prompt',
}
@Component({
  selector: 'cx-organization-message',
  templateUrl: './organization-message.component.html',
})
export class OrganizationMessageComponent {
  @HostBinding('class') type: MessageType;
  @HostBinding('class.hide') hide = true;

  message$ = new BehaviorSubject(undefined);

  @Input()
  set message(value) {
    this.notify(value);
  }

  @Output() confirm = new EventEmitter();

  prompt(message: string) {
    console.log('prompt');
    this.show(message);
    this.type = MessageType.prompt;
  }

  notify(message: string) {
    this.show(message);
    this.type = MessageType.notify;
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

  handleOk() {
    this.confirm.emit(true);
  }
}
