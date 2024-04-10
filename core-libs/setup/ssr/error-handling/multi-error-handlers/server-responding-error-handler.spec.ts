import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  CmsPageNotFoundServerErrorResponseFactory,
  SERVER_ERROR_RESPONSE_FACTORY,
  ServerErrorResponseFactory,
  UnknownServerErrorResponseFactory,
} from '../server-error-response-factory';
import { ServerRespondingErrorHandler } from './server-responding-error-handler';
import { OccEndpointsService, Priority } from '@spartacus/core';

class MockFactoryWithHigherPriority implements ServerErrorResponseFactory {
  hasMatch(): boolean {
    return true;
  }
  getPriority(): number {
    return Priority.HIGH;
  }

  create = jest.fn();
}

class MockOccEndpointsService implements Partial<OccEndpointsService> {
  buildUrl(endpoint: string): string {
    return `https://localhost:9002/rest/v2/cms/${endpoint}`;
  }
}

describe('ServerRespondingErrorHandler', () => {
  describe('default factories', () => {
    let pageNotFoundFactory: CmsPageNotFoundServerErrorResponseFactory;
    let unknownServerErrorFactory: UnknownServerErrorResponseFactory;
    let serverRespondingErrorHandler: ServerRespondingErrorHandler;
    let factories: ServerErrorResponseFactory[];

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ServerRespondingErrorHandler,
          {
            provide: OccEndpointsService,
            useClass: MockOccEndpointsService,
          },
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
        ],
      });

      serverRespondingErrorHandler = TestBed.inject(
        ServerRespondingErrorHandler
      );
      factories = TestBed.inject(SERVER_ERROR_RESPONSE_FACTORY);
      pageNotFoundFactory =
        factories[0] as CmsPageNotFoundServerErrorResponseFactory;
      unknownServerErrorFactory =
        factories[1] as UnknownServerErrorResponseFactory;

      jest.spyOn(pageNotFoundFactory, 'create');
      jest.spyOn(unknownServerErrorFactory, 'create');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call CmsPageNotFoundServerErrorResponseFactory', () => {
      const error = new HttpErrorResponse({
        url: 'https://localhost:9002/rest/v2/cms/pages',
      });

      serverRespondingErrorHandler.handleError(error);

      expect(pageNotFoundFactory.create).toHaveBeenCalledWith(error);
      expect(unknownServerErrorFactory.create).not.toHaveBeenCalled();
    });

    it('should call UnknownServerErrorResponseFactory as fallback', () => {
      const error = {
        headers: {},
        url: 'https://localhost:9002/rest/v2/unknown',
      } as HttpErrorResponse;

      serverRespondingErrorHandler.handleError(error);

      expect(pageNotFoundFactory.create).not.toHaveBeenCalled();
      expect(unknownServerErrorFactory.create).toHaveBeenCalledWith(error);
    });
  });

  describe('custom factories', () => {
    let serverRespondingErrorHandler: ServerRespondingErrorHandler;
    let factories: ServerErrorResponseFactory[];

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ServerRespondingErrorHandler,
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
        ],
      });

      serverRespondingErrorHandler = TestBed.inject(
        ServerRespondingErrorHandler
      );
      factories = TestBed.inject(SERVER_ERROR_RESPONSE_FACTORY);
    });

    it('should call factory with highers prioroty', () => {
      const error = {
        headers: {},
        url: 'https://localhost:9002/rest/v2/cms/pages',
      } as HttpErrorResponse;

      serverRespondingErrorHandler.handleError(error);

      expect(factories[2].create).toHaveBeenCalledWith(error);
    });
  });
});
