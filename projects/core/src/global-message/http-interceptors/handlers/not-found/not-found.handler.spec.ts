import { TestBed } from '@angular/core/testing';
import { GlobalMessageService } from '../../../facade/global-message.service';
import { NotFoundHandler } from './not-found.handler';

class MockGlobalMessageService {}

describe('NotFoundHandler', () => {
  let service: NotFoundHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotFoundHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
    service = TestBed.inject(NotFoundHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
