import {
  Directive,
  EventEmitter,
  HostBinding,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { GlobalMessageType, Translatable } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MessageData, MessageEventData } from './message.model';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class BaseMessageComponent implements OnInit, OnDestroy {
  @HostBinding('class') type: string;
  @HostBinding('class.terminated') terminated = false;

  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter();

  message: Translatable;
  icon: ICON_TYPE;

  private subscription = new Subscription();

  constructor(protected messageData: MessageData) {}

  ngOnInit() {
    this.message = this.messageData.message;
    this.icon = ICON_TYPE.INFO;
    this.type = this.resolveType();

    // TODO: only perform this in the browser
    if (this.messageData.timeout) {
      setTimeout(() => {
        this.close();
      }, this.messageData.timeout);
    }

    this.subscription.add(
      // observe the close event of the message and close accordingly.
      this.messageData.events
        .pipe(filter((event: MessageEventData) => !!event.close))
        .subscribe(() => this.close())
    );
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
