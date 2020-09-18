import {
  Directive,
  EventEmitter,
  HostBinding,
  OnInit,
  Output,
} from '@angular/core';
import { GlobalMessageType, Translatable } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { MessageComponentData } from './message.model';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class BaseMessageComponent implements OnInit {
  @HostBinding('class') type: string;
  @HostBinding('class.terminated') terminated = false;

  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter();

  message: Translatable;
  icon: ICON_TYPE;

  constructor(protected messageData: MessageComponentData) {}

  ngOnInit() {
    this.message = this.messageData.message;
    this.icon = ICON_TYPE.INFO;
    this.type = this.resolveType();

    if (this.messageData.timeout) {
      setTimeout(() => {
        this.close();
      }, this.messageData.timeout);
    }
  }

  close(): void {
    this.closeEvent.emit(true);
  }

  protected resolveType(): string {
    if (this.messageData.type === GlobalMessageType.MSG_TYPE_INFO) {
      return 'info';
    }
    if (this.messageData.type === GlobalMessageType.MSG_TYPE_ERROR) {
      return 'error';
    }
    if (this.messageData.type === GlobalMessageType.MSG_TYPE_WARNING) {
      return 'warning';
    }
  }
}
