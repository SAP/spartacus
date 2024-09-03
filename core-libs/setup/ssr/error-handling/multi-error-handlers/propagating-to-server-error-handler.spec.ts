import { TestBed } from '@angular/core/testing';
import { FeatureConfigService } from '@spartacus/core';
import { PROPAGATE_ERROR_TO_SERVER } from '../error-response/propagate-error-to-server';
import { PropagatingToServerErrorHandler } from './propagating-to-server-error-handler';

describe('PropagatingToServerErrorHandler', () => {
  let propagatingToServerErrorHandler: PropagatingToServerErrorHandler;
  let featureConfigService: FeatureConfigService;
  let propagateErrorResponse: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PropagatingToServerErrorHandler,
        FeatureConfigService,
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
    featureConfigService = TestBed.inject(FeatureConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should propagate error when propagateErrorsToServer is enabled', () => {
    jest
      .spyOn(featureConfigService, 'isEnabled')
      .mockImplementationOnce((val) => val === 'propagateErrorsToServer');
    const error = new Error('test error');

    propagatingToServerErrorHandler.handleError(error);

    expect(propagateErrorResponse as jest.Mock).toHaveBeenCalledWith(error);
  });

  it('should not propagate error when propagateErrorsToServer is disabled', () => {
    jest
      .spyOn(featureConfigService, 'isEnabled')
      .mockImplementationOnce((val) => !(val === 'propagateErrorsToServer'));
    const error = new Error('test error');

    propagatingToServerErrorHandler.handleError(error);

    expect(propagateErrorResponse as jest.Mock).not.toHaveBeenCalled();
  });
});
