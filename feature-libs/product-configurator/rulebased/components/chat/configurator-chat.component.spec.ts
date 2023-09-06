import { Component, Input, Type } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConfiguratorChatComponent } from './configurator-chat.component';
import { ConfiguratorSpeechTextRecognitionService } from '../../core/services/configurator-speech-text-recognition.service';
import { ConfiguratorChatGtpService } from '@spartacus/product-configurator/rulebased';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

class MockConfiguratorChatGtpService {
  initConversation() {}
  ask() {}
}

describe('ConfiguratorChatComponent', () => {
  let component: ConfiguratorChatComponent;
  let fixture: ComponentFixture<ConfiguratorChatComponent>;
  let configuratorChatService: ConfiguratorChatGtpService;
  let configuratorSpeechRecognitionService: ConfiguratorSpeechTextRecognitionService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConfiguratorChatComponent, MockCxIconComponent],
        providers: [
          ConfiguratorSpeechTextRecognitionService,
          {
            provide: ConfiguratorChatGtpService,
            useClass: MockConfiguratorChatGtpService,
          },
        ],
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorChatComponent);
    component = fixture.componentInstance;

    configuratorChatService = TestBed.inject(
      ConfiguratorChatGtpService as Type<ConfiguratorChatGtpService>
    );
    spyOn(configuratorChatService, 'initConversation').and.stub();
    spyOn(configuratorChatService, 'ask').and.stub();

    configuratorSpeechRecognitionService = TestBed.inject(
      ConfiguratorSpeechTextRecognitionService as Type<ConfiguratorSpeechTextRecognitionService>
    );
    spyOn(configuratorSpeechRecognitionService, 'init').and.callThrough();
    spyOn(
      configuratorSpeechRecognitionService,
      'startRecording'
    ).and.callThrough();
    spyOn(
      configuratorSpeechRecognitionService,
      'stopRecording'
    ).and.callThrough();
    spyOn(
      configuratorSpeechRecognitionService,
      'getRecordedText'
    ).and.callThrough();
    spyOn(
      configuratorSpeechRecognitionService,
      'resetRecordedText'
    ).and.callThrough();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should call startRecording', () => {
    component.startRecording();
    expect(
      configuratorSpeechRecognitionService.startRecording
    ).toHaveBeenCalled();
  });

  it('should call stopRecording', () => {
    component.stopRecording();
    expect(
      configuratorSpeechRecognitionService.stopRecording
    ).toHaveBeenCalled();
    expect(
      configuratorSpeechRecognitionService.getRecordedText
    ).toHaveBeenCalled();
  });
});
