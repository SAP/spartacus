import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FeatureConfigService, OccConfig, Priority } from '@spartacus/core';
import {
  CmsPageNotFoundServerErrorResponseFactory,
  SERVER_ERROR_RESPONSE_FACTORY,
  ServerErrorResponseFactory,
  UnknownServerErrorResponseFactory,
} from '../server-error-response-factory';
import { PROPAGATE_SERVER_ERROR_RESPONSE } from '../server-error-response/propagate-server-error-response';
import { ServerRespondingErrorHandler } from './server-responding-error-handler';

const mockOccConfig: OccConfig = {
  backend: {
    occ: {
      prefix: '/occ/v2/',
      baseUrl: 'https://localhost:9002',
      endpoints: { pages: 'cms/pages' },
    },
  },
};

const expectedUrl = `${mockOccConfig.backend?.occ?.baseUrl}${mockOccConfig.backend?.occ?.prefix}${mockOccConfig.backend?.occ?.endpoints?.pages}`;

class MockFactoryWithHigherPriority implements ServerErrorResponseFactory {
  hasMatch(): boolean {
    return true;
  }
  getPriority(): number {
    return Priority.HIGH;
  }

  create = jest.fn();
}

describe('ServerRespondingErrorHandler', () => {
  describe('default factories', () => {
    let pageNotFoundFactory: CmsPageNotFoundServerErrorResponseFactory;
    let unknownServerErrorFactory: UnknownServerErrorResponseFactory;
    let serverRespondingErrorHandler: ServerRespondingErrorHandler;
    let factories: ServerErrorResponseFactory[];
    let propagateServerErrorResponse: any;
    let featureConfigService: FeatureConfigService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ServerRespondingErrorHandler,
          FeatureConfigService,
          {
            provide: SERVER_ERROR_RESPONSE_FACTORY,
            useClass: CmsPageNotFoundServerErrorResponseFactory,
            multi: true,
          },
          {
            provide: SERVER_ERROR_RESPONSE_FACTORY,
            useClass: UnknownServerErrorResponseFactory,
            multi: true,
          },
          {
            provide: PROPAGATE_SERVER_ERROR_RESPONSE,
            useValue: jest.fn(),
          },
          {
            provide: OccConfig,
            useValue: mockOccConfig,
          },
        ],
      });

      serverRespondingErrorHandler = TestBed.inject(
        ServerRespondingErrorHandler
      );
      featureConfigService = TestBed.inject(FeatureConfigService);
      factories = TestBed.inject(SERVER_ERROR_RESPONSE_FACTORY);
      pageNotFoundFactory =
        factories[0] as CmsPageNotFoundServerErrorResponseFactory;
      unknownServerErrorFactory =
        factories[1] as UnknownServerErrorResponseFactory;
      propagateServerErrorResponse = TestBed.inject(
        PROPAGATE_SERVER_ERROR_RESPONSE
      );

      jest.spyOn(pageNotFoundFactory, 'create');
      jest.spyOn(unknownServerErrorFactory, 'create');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('when ssrErrorPropagation feature is enabled', () => {
      beforeEach(() => {
        jest.spyOn(featureConfigService, 'isEnabled').mockReturnValue(true);
      });
      it('should call CmsPageNotFoundServerErrorResponseFactory', () => {
        const error = new HttpErrorResponse({
          status: 404,
          url: expectedUrl,
        });

        serverRespondingErrorHandler.handleError(error);

        expect(pageNotFoundFactory.create).toHaveBeenCalledWith(error);
        expect(unknownServerErrorFactory.create).not.toHaveBeenCalled();
        expect(propagateServerErrorResponse as jest.Mock).toHaveBeenCalled();
      });

      it('should call UnknownServerErrorResponseFactory as fallback', () => {
        const error = {
          headers: {},
          url: 'https://localhost:9002/rest/v2/unknown',
        } as HttpErrorResponse;

        serverRespondingErrorHandler.handleError(error);

        expect(pageNotFoundFactory.create).not.toHaveBeenCalled();
        expect(unknownServerErrorFactory.create).toHaveBeenCalledWith(error);
        expect(propagateServerErrorResponse as jest.Mock).toHaveBeenCalled();
      });
    });
    describe('when ssrErrorPropagation feature is disabled', () => {
      beforeEach(() => {
        jest.spyOn(featureConfigService, 'isEnabled').mockReturnValue(false);
      });

      it('should not propagate any error', () => {
        const error = {
          headers: {},
          url: 'https://localhost:9002/rest/v2/unknown',
        } as HttpErrorResponse;

        serverRespondingErrorHandler.handleError(error);

        expect(
          propagateServerErrorResponse as jest.Mock
        ).not.toHaveBeenCalled();
      });
    });
  });

  describe('custom factories', () => {
    let serverRespondingErrorHandler: ServerRespondingErrorHandler;
    let factories: ServerErrorResponseFactory[];
    let featureConfigService: FeatureConfigService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ServerRespondingErrorHandler,
          FeatureConfigService,
          {
            provide: SERVER_ERROR_RESPONSE_FACTORY,
            useClass: CmsPageNotFoundServerErrorResponseFactory,
            multi: true,
          },
          {
            provide: SERVER_ERROR_RESPONSE_FACTORY,
            useClass: UnknownServerErrorResponseFactory,
            multi: true,
          },
          {
            provide: SERVER_ERROR_RESPONSE_FACTORY,
            useClass: MockFactoryWithHigherPriority,
            multi: true,
          },
          {
            provide: PROPAGATE_SERVER_ERROR_RESPONSE,
            useValue: jest.fn(),
          },
        ],
      });

      serverRespondingErrorHandler = TestBed.inject(
        ServerRespondingErrorHandler
      );
      factories = TestBed.inject(SERVER_ERROR_RESPONSE_FACTORY);
      featureConfigService = TestBed.inject(FeatureConfigService);

      jest.spyOn(featureConfigService, 'isEnabled').mockReturnValue(true);
    });

    it('should call factory with highers priority', () => {
      const error = {
        headers: {},
        url: 'https://localhost:9002/rest/v2/cms/pages',
      } as HttpErrorResponse;

      serverRespondingErrorHandler.handleError(error);

      expect(factories[2].create).toHaveBeenCalledWith(error);
    });
  });
});
