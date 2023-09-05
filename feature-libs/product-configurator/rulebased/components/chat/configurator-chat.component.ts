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
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { ChatGPT4 } from '../../core/model/chat-gpt-4.model';
import { ConfiguratorChatGtpService } from '../../core/services/configurator-chat-gtp.service';
import { ConfiguratorSpeechRecognitionService } from '../../core/services/configurator-speech-recognition.service';

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
  isRecording = false;
  isRecordingPossible = false;
  messageHistory: MessageEvent[] = [];

  messageEvents$: BehaviorSubject<Array<MessageEvent>> = new BehaviorSubject(
    this.messageHistory
  );
  messagingConfigs: MessagingConfigs = this.prepareMessagingConfigs();

  constructor(
    protected configuratorChatService: ConfiguratorChatGtpService,
    protected configuratorSpeechRecognitionService: ConfiguratorSpeechRecognitionService
  ) {
    this.configuratorSpeechRecognitionService.init();
    this.isRecordingPossible = configuratorSpeechRecognitionService.speechRecognitionActive;
  }

  startRecording() {
    this.isRecording = true;
    this.configuratorSpeechRecognitionService.startRecording();
  }

  stopRecording() {
    this.isRecording = false;
    this.configuratorSpeechRecognitionService.stopRecording();
    const recordedText =
      this.configuratorSpeechRecognitionService.getRecordedText();
    if (this.isNotEmpty(recordedText)) {
      this.commentsComponent.form.get('message')?.setValue(recordedText);

      // Add a delay before firing a message
      setTimeout(() => {
        this.onSend({ message: recordedText });
      }, 1000);
      this.configuratorSpeechRecognitionService.resetRecordedText();
    }
  }

  protected isNotEmpty(value: string): boolean {
    return value !== '';
  }

  displayChat(): void {
    this.showChat = true;
    this.messageHistory.push(this.mapUserMessageToEvent(INIT_MSG));
    this.messageHistory.push(this.mapAnswerToMessageEvent(WAIT_MSG));
    this.messageEvents$.next(this.messageHistory);
    this.handleAnswer(this.configuratorChatService.initConversation(INIT_MSG));
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
      });
  }

  protected mapAnswerToMessageEvent(answer: string): MessageEvent {
    return {
      text: answer,
      rightAlign: true,
      createdAt: new Date().toString(),
    };
  }
}
