import { TestBed } from '@angular/core/testing';
import { ConfiguratorSpeechTextRecognitionService } from './configurator-speech-text-recognition.service';

describe('ConfiguratorSpeechRecognitionService', () => {
  let classUnderTest: ConfiguratorSpeechTextRecognitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguratorSpeechTextRecognitionService],
    });
    classUnderTest = TestBed.inject(ConfiguratorSpeechTextRecognitionService);
    classUnderTest.init();
  });

  it('should create', () => {
    expect(classUnderTest).toBeDefined();
  });
});
