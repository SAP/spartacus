import { TestBed } from '@angular/core/testing';
import { ChatGptBtpConnector } from './chat-gpt-btp.connector';
import { LoggerService } from '@spartacus/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockLoggerService {
  log(): void {}
  warn(): void {}
  error(): void {}
  info(): void {}
  debug(): void {}
}

describe('ChatGptBtpConnector', () => {
  let classUnderTest: ChatGptBtpConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ChatGptBtpConnector,
        { provide: LoggerService, useClass: MockLoggerService },
      ],
    });
    classUnderTest = TestBed.inject(ChatGptBtpConnector);
  });

  it('should create', () => {
    expect(classUnderTest).toBeDefined();
  });
});
