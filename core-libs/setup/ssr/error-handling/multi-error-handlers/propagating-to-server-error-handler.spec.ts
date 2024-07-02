import { TestBed } from '@angular/core/testing';
import { PROPAGATE_ERROR_TO_SERVER } from '../error-response/propagate-error-to-server';
import { PropagatingToServerErrorHandler } from './propagating-to-server-error-handler';

describe('PropagatingToServerErrorHandler', () => {
  describe('default factories', () => {
    let serverRespondingErrorHandler: PropagatingToServerErrorHandler;
    let propagateErrorResponse: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          PropagatingToServerErrorHandler,
          {
            provide: PROPAGATE_ERROR_TO_SERVER,
            useValue: jest.fn(),
          },
        ],
      });

      serverRespondingErrorHandler = TestBed.inject(
        PropagatingToServerErrorHandler
      );
      propagateErrorResponse = TestBed.inject(PROPAGATE_ERROR_TO_SERVER);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should propagate error', () => {
      const error = new Error('test error');

      serverRespondingErrorHandler.handleError(error);

      expect(propagateErrorResponse as jest.Mock).toHaveBeenCalledWith(error);
    });
  });
});
