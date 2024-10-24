/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { EventEmitter, inject, Injectable } from '@angular/core';
import { LoggerService } from '@spartacus/core';

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
declare let webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorSpeechTextRecognitionService {
  protected logger = inject(LoggerService);

  private static DEFAULT_LANGUAGE = 'en-US';

  speechRecognition: any;
  speechSynthesis: any;
  isSupported = false;

  recordedText: EventEmitter<string> = new EventEmitter();
  errorMsg: EventEmitter<string> = new EventEmitter();

  init() {
    this.isSupported =
      window.hasOwnProperty('SpeechRecognition') ||
      window.hasOwnProperty('webkitSpeechRecognition');

    if (this.isSupported) {
      this.speechRecognition = new webkitSpeechRecognition();
      this.speechSynthesis = window.speechSynthesis;
      this.speechRecognition.lang =
        ConfiguratorSpeechTextRecognitionService.DEFAULT_LANGUAGE;
      this.speechRecognition.maxAlternatives = 5;
      this.speechRecognition.interimResults = false;

      this.speechRecognition.addEventListener('result', (event: any) => {
        const transcript = event.results[0][0].transcript;
        this.logger.log('After event has been fired: ' + transcript);
        this.recordedText.emit(transcript);
      });

      this.speechRecognition.addEventListener('nomatch', () => {
        this.logger.error('Speech not recognized');
        this.errorMsg.emit("Please, repeat again. I don't understand you.");
      });

      this.speechRecognition.addEventListener('error', (event: any) => {
        this.logger.error(`Speech recognition error detected: ${event.error}`);
        this.errorMsg.emit(
          'Something went wrong. Could you repeat again what you have said?'
        );
      });
    }
  }

  startRecording() {
    this.logger.log('Speech recognition started');
    this.speechRecognition.start();
  }

  stopRecording() {
    this.logger.log('Speech recognition ended');
    this.speechRecognition.stop();
  }

  private getVoice(): SpeechSynthesisVoice {
    return this.speechSynthesis
      .getVoices()
      .find(
        (voice: SpeechSynthesisVoice) =>
          voice.lang ===
          ConfiguratorSpeechTextRecognitionService.DEFAULT_LANGUAGE
      );
  }

  startAudio(message: string | undefined) {
    if (message) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang =
        ConfiguratorSpeechTextRecognitionService.DEFAULT_LANGUAGE;
      utterance.voice = this.getVoice();

      this.speechSynthesis.speak(utterance);
    }
  }

  stopAudio() {
    this.speechSynthesis.cancel();
  }
}
