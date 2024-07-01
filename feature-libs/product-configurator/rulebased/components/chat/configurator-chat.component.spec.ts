import { Component, Input, Type } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConfiguratorChatComponent } from './configurator-chat.component';
import { ConfiguratorSpeechTextRecognitionService } from '../../core/services/configurator-speech-text-recognition.service';
import {
  Configurator,
  ConfiguratorChatGptService,
  ConfiguratorCommonsService,
} from '@spartacus/product-configurator/rulebased';
import { GlobalMessageService, LoggerService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

class MockConfiguratorChatGptService {
  initConversation() {}
  ask() {}
}

const router: ConfiguratorRouter.Data = {
  pageType: ConfiguratorRouter.PageType.CONFIGURATION,
  isOwnerCartEntry: true,
  owner: ConfiguratorModelUtils.createOwner(
    CommonConfigurator.OwnerType.PRODUCT,
    '3',
    ConfiguratorType.VARIANT
  ),
};

class MockConfigRouterExtractorService {
  extractRouterData() {
    return of(router);
  }
}

let configurationObs: any;
class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return configurationObs;
  }
}

class MockGlobalMessageService {
  add() {}
  remove() {}
}

class MockLoggerService {
  log(): void {}
  warn(): void {}
  error(): void {}
  info(): void {}
  debug(): void {}
}

describe('ConfiguratorChatComponent', () => {
  let component: ConfiguratorChatComponent;
  let fixture: ComponentFixture<ConfiguratorChatComponent>;
  let configuratorChatService: ConfiguratorChatGptService;
  let configuratorSpeechRecognitionService: ConfiguratorSpeechTextRecognitionService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguratorChatComponent, MockCxIconComponent],
      providers: [
        ConfiguratorSpeechTextRecognitionService,
        { provide: LoggerService, useClass: MockLoggerService },
        {
          provide: ConfiguratorChatGptService,
          useClass: MockConfiguratorChatGptService,
        },
        {
          provide: ConfiguratorRouterExtractorService,
          useClass: MockConfigRouterExtractorService,
        },
        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorChatComponent);
    component = fixture.componentInstance;

    configuratorChatService = TestBed.inject(
      ConfiguratorChatGptService as Type<ConfiguratorChatGptService>
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
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should call startRecording', () => {
    component['startRecording']();
    expect(
      configuratorSpeechRecognitionService.startRecording
    ).toHaveBeenCalled();
  });

  it('should call stopRecording', () => {
    component['stopRecording']();
    expect(
      configuratorSpeechRecognitionService.stopRecording
    ).toHaveBeenCalled();
  });
});
