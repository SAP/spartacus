import { TestBed } from '@angular/core/testing';
import { GlobalMessageService } from '../../../facade/global-message.service';
import { HttpResponseStatus } from '../../../models/response-status.model';
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

  it('should register 404 responseStatus ', () => {
    expect(service.responseStatus).toEqual(HttpResponseStatus.NOT_FOUND);
  });
});
