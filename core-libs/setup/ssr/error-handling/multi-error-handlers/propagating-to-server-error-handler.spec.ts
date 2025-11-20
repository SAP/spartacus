import { TestBed } from '@angular/core/testing';
import { PROPAGATE_ERROR_TO_SERVER } from '../error-response/propagate-error-to-server';
import { PropagatingToServerErrorHandler } from './propagating-to-server-error-handler';

describe('PropagatingToServerErrorHandler', () => {
  let propagatingToServerErrorHandler: PropagatingToServerErrorHandler;
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
    propagatingToServerErrorHandler = TestBed.inject(
      PropagatingToServerErrorHandler
    );
    propagateErrorResponse = TestBed.inject(PROPAGATE_ERROR_TO_SERVER);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should propagate error to server', () => {
    const error = new Error('test error');

    propagatingToServerErrorHandler.handleError(error);

    expect(propagateErrorResponse as jest.Mock).toHaveBeenCalledWith(error);
  });
});
