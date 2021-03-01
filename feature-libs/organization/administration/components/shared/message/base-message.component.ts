import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  HostBinding,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { GlobalMessageType, Translatable } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { MessageData } from './message.model';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseMessageComponent implements OnInit {
  @HostBinding('class') type: string;
  @HostBinding('class.terminated') terminated = false;

  message: Translatable;
  messageTitle?: Translatable;

  /**
   * Icon used to display next to the message.
   */
  messageIcon: ICON_TYPE;

  constructor(
    protected messageData: MessageData,
    @Inject(PLATFORM_ID) protected platformId: any
  ) {}

  ngOnInit() {
    this.message = this.messageData.message ?? {};
    this.messageTitle = this.messageData.messageTitle;
    this.type = this.resolveType();
    this.messageIcon = this.messageData.messageIcon;

    if (this.messageData.timeout) {
      this.handleAutoHide();
    }
  }

  close(): void {
    this.messageData.events.next({ close: true });
  }

  protected resolveType(): string {
    if (
      !this.messageData.type ||
      this.messageData.type === GlobalMessageType.MSG_TYPE_INFO
    ) {
      return 'info';
    }
    if (this.messageData.type === GlobalMessageType.MSG_TYPE_ERROR) {
      return 'error';
    }
    if (this.messageData.type === GlobalMessageType.MSG_TYPE_WARNING) {
      return 'warning';
    }
  }

  protected handleAutoHide() {
    if (isPlatformBrowser(this.platformId)) {
      // we don't want to run this logic when doing SSR
      setTimeout(() => {
        this.close();
      }, this.messageData.timeout);
    }
  }
}
