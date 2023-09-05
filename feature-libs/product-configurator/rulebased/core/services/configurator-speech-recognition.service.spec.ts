import { TestBed } from '@angular/core/testing';
import { ConfiguratorSpeechRecognitionService } from './configurator-speech-recognition.service';

describe('ConfiguratorSpeechRecognitionService', () => {
  let classUnderTest: ConfiguratorSpeechRecognitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguratorSpeechRecognitionService],
    });
    classUnderTest = TestBed.inject(ConfiguratorSpeechRecognitionService);
    classUnderTest.init();
  });

  it('should create', () => {
    expect(classUnderTest).toBeDefined();
  });
});
