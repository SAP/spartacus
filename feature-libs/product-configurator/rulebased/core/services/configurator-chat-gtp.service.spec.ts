import { TestBed } from '@angular/core/testing';
import { ConfiguratorChatGtpService } from './configurator-chat-gtp.service';
import { ConfiguratorQuantityService } from './configurator-quantity.service';

describe('ConfiguratorChatService', () => {
  let classUnderTest: ConfiguratorChatGtpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguratorQuantityService],
    });
    classUnderTest = TestBed.inject(ConfiguratorChatGtpService);
  });

  it('should create', () => {
    expect(classUnderTest).toBeDefined();
  });
});
