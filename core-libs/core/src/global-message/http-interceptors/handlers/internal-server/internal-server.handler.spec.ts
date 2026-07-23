import { TestBed } from '@angular/core/testing';
import { GlobalMessageService } from '../../../facade';
import { GlobalMessageType } from '../../../models/global-message.model';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { InternalServerErrorHandler } from './internal-server.handler';

class MockGlobalMessageService {
  add() {}
}
describe('InternalServerErrorHandler', () => {
  let service: InternalServerErrorHandler;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InternalServerErrorHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
    service = TestBed.inject(InternalServerErrorHandler);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register 500 responseStatus ', () => {
    expect(service.responseStatus).toEqual(
      HttpResponseStatus.INTERNAL_SERVER_ERROR
    );
  });

  it('should send error to global message service', () => {
    spyOn(globalMessageService, 'add');
    service.handleError();

    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'httpHandlers.internalServerError' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
