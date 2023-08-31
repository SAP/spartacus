import { TestBed } from '@angular/core/testing';
import { ConfiguratorChatService } from './configurator-chat.service';
import { ConfiguratorQuantityService } from './configurator-quantity.service';

describe('ConfiguratorChatService', () => {
  let classUnderTest: ConfiguratorChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguratorQuantityService],
    });
    classUnderTest = TestBed.inject(ConfiguratorChatService);
  });

  it('should create', () => {
    expect(classUnderTest).toBeDefined();
  });
});
