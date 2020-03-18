import { TestBed } from '@angular/core/testing';
import { GlobalMessageService } from '../../../facade';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { UnknownErrorHandler } from './unknown-error.handler';

class MockGlobalMessageService {}
describe('UnknownErrorHandler', () => {
  let service: UnknownErrorHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnknownErrorHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
    service = TestBed.inject(UnknownErrorHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register -1 responseStatus ', () => {
    expect(service.responseStatus).toEqual(HttpResponseStatus.UNKNOWN);
  });
});
