import { TestBed } from '@angular/core/testing';
import { GlobalMessageService } from '../../../facade';
import { GlobalMessageType } from '../../../models/global-message.model';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { GatewayTimeoutHandler } from './gateway-timeout.handler';

class MockGlobalMessageService {
  add() {}
}
describe('GatewayTimeoutHandler', () => {
  let service: GatewayTimeoutHandler;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GatewayTimeoutHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
    service = TestBed.inject(GatewayTimeoutHandler);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register 504 responseStatus ', () => {
    expect(service.responseStatus).toEqual(HttpResponseStatus.GATEWAY_TIMEOUT);
  });

  it('should send error to global message service', () => {
    spyOn(globalMessageService, 'add');
    service.handleError();

    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'httpHandlers.gatewayTimeout' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
