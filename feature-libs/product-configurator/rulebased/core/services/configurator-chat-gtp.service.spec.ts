import { TestBed } from '@angular/core/testing';
import { ConfiguratorChatGtpService } from './configurator-chat-gtp.service';

describe('ConfiguratorChatGtpService', () => {
  let classUnderTest: ConfiguratorChatGtpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguratorChatGtpService],
    });
    classUnderTest = TestBed.inject(ConfiguratorChatGtpService);
  });

  it('should create', () => {
    expect(classUnderTest).toBeDefined();
  });
});
