/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import {
  ICON_TYPE,
  MessageEvent,
  MessagingComponent,
  MessagingConfigs,
} from '@spartacus/storefront';
import { BehaviorSubject, of } from 'rxjs';
import { finalize, map, take, tap } from 'rxjs/operators';
import {
  ConfiguratorChatGtpService
} from '../../core';
import { ChatGPT4 } from '../../core/model/chat-gpt-4.model';

const DEFAULT_COMMENT_MAX_CHARS = 100000;

@Component({
  selector: 'cx-configurator-chat',
  templateUrl: './configurator-chat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorChatComponent {
  @ViewChild(MessagingComponent) commentsComponent: MessagingComponent;
  iconTypes = ICON_TYPE;

  showChat = false;
  messageHistory: MessageEvent[] = [];

  messageEvents$: BehaviorSubject<Array<MessageEvent>> = new BehaviorSubject(
    this.messageHistory
  );
  messagingConfigs: MessagingConfigs = this.prepareMessagingConfigs();

  constructor(protected configuratorChatService: ConfiguratorChatGtpService) {}

  displayChat(): void {
    this.showChat = true;
  }

  hideChat(): void {
    this.showChat = false;
  }

  protected prepareMessagingConfigs(): MessagingConfigs {
    return {
      charactersLimit: DEFAULT_COMMENT_MAX_CHARS,
      dateFormat: 'MMMM d, yyyy h:mm aa',
      displayAddMessageSection: of(true),
    };
  }

  onSend(event: { message: string }): void {
    console.log('send message: ' + event.message);
    this.messageHistory.push({
      text: event.message,
      rightAlign: false,
      createdAt: new Date().toString(),
    });
    this.configuratorChatService
      .ask(event.message)
      .pipe(
        take(1),
        tap((answer) => console.log(answer)),
        map((answer) => this.mapAnswerToMessageEvent(answer)),
        // do for error and success
        finalize(() => this.commentsComponent.resetForm())
      )
      .subscribe((event) => {
        this.messageHistory.push(event);
        this.messageEvents$.next(this.messageHistory);
      });
  }

  mapAnswerToMessageEvent(answer: ChatGPT4.Message): MessageEvent {
    return {
      text: answer.content,
      rightAlign: true,
      createdAt: new Date().toString(),
    };
  }
}
