import { TestBed } from '@angular/core/testing';
import { GlobalMessageService } from '../../../facade';
import { GlobalMessageType } from '../../../models/global-message.model';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { BadGatewayHandler } from './bad-gateway.handler';

class MockGlobalMessageService {
  add() {}
}
describe('BadGatewayHandler', () => {
  let service: BadGatewayHandler;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BadGatewayHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
    service = TestBed.inject(BadGatewayHandler);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register 502 responseStatus ', () => {
    expect(service.responseStatus).toEqual(HttpResponseStatus.BAD_GATEWAY);
  });

  it('should send common error to global message service', () => {
    spyOn(globalMessageService, 'add');
    service.handleError();

    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'httpHandlers.badGateway' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
