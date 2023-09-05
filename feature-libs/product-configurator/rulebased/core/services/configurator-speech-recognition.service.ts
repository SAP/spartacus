import { Injectable } from '@angular/core';

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
declare var webkitSpeechRecognition: any;

@Injectable({
<<<<<<< Updated upstream
  providedIn: 'root',
})
export class ConfiguratorSpeechRecognitionService {
  speechRecognition = new webkitSpeechRecognition();
  recordedText: string;
  errorMsg: string;

  init() {
    this.speechRecognition.lang = 'en-US';
    this.speechRecognition.maxAlternatives = 5;
    this.speechRecognition.interimResults = false;

    this.speechRecognition.addEventListener('result', (event: any) => {
      const transcript = event.results[0][0].transcript;
      console.log(transcript);
      this.recordedText = transcript;
    });

    this.speechRecognition.addEventListener('nomatch', () => {
      console.error('Speech not recognized');
      this.errorMsg = "Please, repeat. I don't understand you";
    });

    this.speechRecognition.addEventListener('error', (event: any) => {
      console.error(`Speech recognition error detected: ${event.error}`);
      this.errorMsg = "Please, repeat. I don't understand you";
    });
  }

  getErrorMsg() : string {
    return this.errorMsg;
  }

  getRecordedText(): string {
    return this.recordedText;
  }

  resetRecordedText() {
    this.recordedText = '';
  }

  startRecording() {
    console.log('Speech recognition started');
    this.speechRecognition.start();
  }

  stopRecording() {
    console.log('Speech recognition ended');
    this.speechRecognition.stop();
=======
  providedIn: 'root'
})
export class ConfiguratorVoiceRecognitionService {

  speechRecognition =  new webkitSpeechRecognition();
  isStopped = false;
  public text = '';
  tempWords: string;

  constructor() { }

  init() {
    this.speechRecognition.interimResults = true;
    this.speechRecognition.lang = 'en-US';

    this.speechRecognition.addEventListener('result', (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log(transcript);
    });
  }

  start() {
    this.isStopped = false;
    this.speechRecognition.start();
    console.log("Speech recognition started")
    this.speechRecognition.addEventListener('end', (condition) => {
      if (this.isStopped) {
        this.speechRecognition.stop();
        console.log("End speech recognition")
      } else {
        this.wordConcat()
        this.speechRecognition.start();
      }
    });
  }

  stop() {
    this.isStopped = true;
    this.wordConcat()
    this.speechRecognition.stop();
    console.log("End speech recognition")
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
>>>>>>> Stashed changes
  }
}
