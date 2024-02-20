import { TestBed } from '@angular/core/testing';
import { ChatGptBtpConnector } from './chat-gpt-btp.connector';

describe('ChatGptBtpConnector', () => {
  let classUnderTest: ChatGptBtpConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatGptBtpConnector],
    });
    classUnderTest = TestBed.inject(ChatGptBtpConnector);
  });

  it('should create', () => {
    expect(classUnderTest).toBeDefined();
  });
});
