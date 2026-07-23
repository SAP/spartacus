import { TestBed } from '@angular/core/testing';
import { GlobalMessageService } from '../../../facade';
import { GlobalMessageType } from '../../../models/global-message.model';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { ConflictHandler } from './conflict.handler';

class MockGlobalMessageService {
  add() {}
}
describe('ConflictHandler', () => {
  let service: ConflictHandler;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConflictHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
    service = TestBed.inject(ConflictHandler);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register 409 responseStatus ', () => {
    expect(service.responseStatus).toEqual(HttpResponseStatus.CONFLICT);
  });

  it('should send error to global message service', () => {
    spyOn(globalMessageService, 'add');
    service.handleError();

    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'httpHandlers.conflict' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
