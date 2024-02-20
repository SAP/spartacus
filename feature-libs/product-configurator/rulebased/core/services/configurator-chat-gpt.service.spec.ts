import { TestBed } from '@angular/core/testing';
import { ConfiguratorChatGptService } from './configurator-chat-gpt.service';

describe('ConfiguratorChatGptService', () => {
  let classUnderTest: ConfiguratorChatGptService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguratorChatGptService],
    });
    classUnderTest = TestBed.inject(ConfiguratorChatGptService);
  });

  it('should create', () => {
    expect(classUnderTest).toBeDefined();
  });
});
