import { TestBed } from '@angular/core/testing';
import { GlobalMessageService } from '../../../facade';
import { GlobalMessageType } from '../../../models/global-message.model';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { ForbiddenHandler } from './forbidden.handler';

class MockGlobalMessageService {
  add() {}
}
describe('ForbiddenHandler', () => {
  let service: ForbiddenHandler;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ForbiddenHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
    service = TestBed.inject(ForbiddenHandler);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register 403 responseStatus ', () => {
    expect(service.responseStatus).toEqual(HttpResponseStatus.FORBIDDEN);
  });

  it('should send common error to global message service', () => {
    spyOn(globalMessageService, 'add');
    service.handleError();

    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'httpHandlers.forbidden' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
