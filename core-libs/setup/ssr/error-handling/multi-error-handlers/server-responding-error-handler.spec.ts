import { TestBed } from '@angular/core/testing';
import { PROPAGATE_ERROR_RESPONSE } from '../error-response/propagate-error-response';
import { ServerRespondingErrorHandler } from './server-responding-error-handler';

describe('ServerRespondingErrorHandler', () => {
  describe('default factories', () => {
    let serverRespondingErrorHandler: ServerRespondingErrorHandler;
    let propagateErrorResponse: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ServerRespondingErrorHandler,
          {
            provide: PROPAGATE_ERROR_RESPONSE,
            useValue: jest.fn(),
          },
        ],
      });

      serverRespondingErrorHandler = TestBed.inject(
        ServerRespondingErrorHandler
      );
      propagateErrorResponse = TestBed.inject(PROPAGATE_ERROR_RESPONSE);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should propagate error response', () => {
      const error = new Error('test error');

      serverRespondingErrorHandler.handleError(error);

      expect(propagateErrorResponse as jest.Mock).toHaveBeenCalledWith(error);
    });
  });
});
