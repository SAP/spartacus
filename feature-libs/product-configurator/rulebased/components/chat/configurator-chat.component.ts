/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
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
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ChatGPT4 } from '../../core/model/chat-gpt-4.model';
import { ConfiguratorChatGtpService } from '../../core/services/configurator-chat-gtp.service';
import { ConfiguratorSpeechTextRecognitionService } from '../../core/services/configurator-speech-text-recognition.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';

const DEFAULT_COMMENT_MAX_CHARS = 100000;
const INIT_MSG = 'Hello - I need your assistance.';
const WAIT_MSG = 'Please wait a moment - I will reply as soon as possible :-)';

@Component({
  selector: 'cx-configurator-chat',
  templateUrl: './configurator-chat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorChatComponent {
  @ViewChild(MessagingComponent) commentsComponent: MessagingComponent;
  iconTypes = ICON_TYPE;

  showChat = false;
  isVolume = false;
  isRecording = false;
  isSpeechTextRecognitionSupported = false;
  messageHistory: MessageEvent[] = [];

  messageEvents$: BehaviorSubject<Array<MessageEvent>> = new BehaviorSubject(
    this.messageHistory
  );

  messagingConfigs: MessagingConfigs = this.prepareMessagingConfigs();

  routerData$: Observable<ConfiguratorRouter.Data> =
    this.configRouterExtractorService.extractRouterData();

  configuration$: Observable<Configurator.Configuration> =
    this.routerData$.pipe(
      switchMap((routerData) =>
        this.configuratorCommonsService.getConfiguration(routerData.owner)
      )
    );

  constructor(
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configuratorChatService: ConfiguratorChatGtpService,
    protected globalMessageService: GlobalMessageService,
    protected configSpeechTextRecognitionService: ConfiguratorSpeechTextRecognitionService
  ) {
    this.configSpeechTextRecognitionService.init();
    this.isSpeechTextRecognitionSupported =
      configSpeechTextRecognitionService.isSupported;

    this.configSpeechTextRecognitionService.errorMsg.subscribe((errorMsg) => {
      this.globalMessageService.add(
        {
          key: errorMsg,
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  }

  startOrStopRecording() {
    if (!this.isRecording) {
      this.startRecording();
    } else {
      this.stopRecording();
    }
  }

  protected startRecording() {
    this.isRecording = true;
    this.configSpeechTextRecognitionService.startRecording();
  }

  protected stopRecording() {
    this.isRecording = false;
    this.isVolume = true;
    this.configSpeechTextRecognitionService.stopRecording();
    this.configSpeechTextRecognitionService.recordedText.subscribe(
      (recordedText) => {
        console.log('recorded text: ' + recordedText);
        if (this.isNotEmpty(recordedText)) {
          this.commentsComponent.form.get('message')?.setValue(recordedText);

          // Add a delay before firing a message
          setTimeout(() => {
            this.onSend({ message: recordedText });
          }, 1000);
        }
      }
    );
  }

  protected isNotEmpty(value: string): boolean {
    return value !== '';
  }

  displayChat(): void {
    this.showChat = true;
    if (this.messageHistory.length === 0) {
      this.messageHistory.push(this.mapUserMessageToEvent(INIT_MSG));
      this.messageHistory.push(this.mapAnswerToMessageEvent(WAIT_MSG));
      this.messageEvents$.next(this.messageHistory);
      this.handleAnswer(
        this.configuratorChatService.initConversation(INIT_MSG)
      );
    }
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
    this.messageHistory.push(this.mapUserMessageToEvent(event.message));
    this.messageHistory.push(this.mapAnswerToMessageEvent(WAIT_MSG));
    this.messageEvents$.next(this.messageHistory);
    this.commentsComponent.resetForm();
    this.handleAnswer(this.configuratorChatService.ask(event.message));
  }

  protected mapUserMessageToEvent(message: string): MessageEvent {
    return {
      text: message,
      rightAlign: false,
      createdAt: new Date().toString(),
    };
  }

  protected handleAnswer(answer$: Observable<ChatGPT4.Message>) {
    answer$
      .pipe(
        take(1),
        tap((answer) => console.log('GTP answered: ', answer)),
        map((answer) => this.mapAnswerToMessageEvent(answer.content))
      )
      .subscribe((event) => {
        this.messageHistory.pop(); // remove waiting message
        this.messageHistory.push(event);
        this.messageEvents$.next(this.messageHistory);
        if (this.isVolume) {
          // read the last message
          this.configSpeechTextRecognitionService.speak(event.text);
        }
      });
  }

  startOrStopReading() {
    if (this.isVolume) {
      this.configSpeechTextRecognitionService.cancel();
      this.isVolume = false;
    } else {
      this.configSpeechTextRecognitionService.speak(
        this.messageHistory[this.messageHistory.length - 1].text
      );
      this.isVolume = true;
    }
  }

  getVolumeTitle(): string {
    if (this.isVolume) {
      return 'Mute audio';
    }
    return 'Unmute audio';
  }

  getMicroTitle(): string {
    if (this.isRecording) {
      return 'Mute micro';
    }
    return 'Unmute micro';
  }

  getMicroIcon(): ICON_TYPE {
    return !this.isRecording
      ? this.iconTypes.MICROPHONE_SLASH
      : this.iconTypes.MICROPHONE;
  }

  protected mapAnswerToMessageEvent(answer: string): MessageEvent {
    return {
      text: answer,
      rightAlign: true,
      createdAt: new Date().toString(),
    };
  }
}
