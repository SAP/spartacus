/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewChild,
} from '@angular/core';
import { EventService, TranslationService } from '@spartacus/core';
import {
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import {
  ICON_TYPE,
  MessageEvent,
  MessagingComponent,
  MessagingConfigs,
} from '@spartacus/storefront';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

const DEFAULT_COMMENT_MAX_CHARS = 100000;

@Component({
  selector: 'cx-configurator-chat',
  templateUrl: './configurator-chat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorChatComponent {
  showChat = false;
  @ViewChild(MessagingComponent) commentsComponent: MessagingComponent;
  iconTypes = ICON_TYPE;

  routerData$: Observable<ConfiguratorRouter.Data> =
    this.configRouterExtractorService.extractRouterData();

  configuration$: Observable<Configurator.Configuration> =
    this.routerData$.pipe(
      filter(
        (routerData) =>
          routerData.pageType === ConfiguratorRouter.PageType.CONFIGURATION
      ),
      switchMap((routerData) => {
        return this.configuratorCommonsService.getOrCreateConfiguration(
          routerData.owner,
          routerData.configIdTemplate
        );
      })
    );

  messageEvents$: Observable<Array<MessageEvent>> = this.prepareMessageEvents();
  messagingConfigs: MessagingConfigs = this.prepareMessagingConfigs();

  constructor(
    protected eventService: EventService,
    protected translationService: TranslationService,
    @Inject(DOCUMENT) protected document: Document,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService
  ) {}

  displayChat(): void {
    this.showChat = true;
  }

  hideChat(): void {
    this.showChat = false;
  }

  protected prepareMessageEvents(): Observable<Array<MessageEvent>> {
    return this.configuration$.pipe(
      map((configuration) => {
        const messageEvents: MessageEvent[] = [];
        configuration.comments?.forEach((comment) =>
          messageEvents.push(this.mapCommentToMessageEvent(comment))
        );
        messageEvents.sort((eventA, eventB) => {
          return (
            new Date(eventA?.createdAt ?? 0).getTime() -
            new Date(eventB?.createdAt ?? 0).getTime()
          );
        });
        return messageEvents;
      })
    );
  }

  protected mapCommentToMessageEvent(
    comment: Configurator.Comment
  ): MessageEvent {
    const messages: MessageEvent = {
      text: comment?.text,
      createdAt: comment?.creationDate?.toString(),
      rightAlign: !comment.fromCustomer,
    };
    return messages;
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
    this.configuration$.pipe(
      map((configuration) => {
        const message: Configurator.Comment = {
          text: event.message,
        };
        configuration?.comments?.push(message);
        console.log('message has been added');
      })
    );
  }
}
