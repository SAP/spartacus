import { TestBed } from '@angular/core/testing';
import { ChatGtpBtpConnector } from './chat-gpt-btp.connector';

describe('ChatGtpBtpConnector', () => {
  let classUnderTest: ChatGtpBtpConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatGtpBtpConnector],
    });
    classUnderTest = TestBed.inject(ChatGtpBtpConnector);
  });

  it('should create', () => {
    expect(classUnderTest).toBeDefined();
  });
});
