import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  CmsPageNotFoundServerErrorResponseTransformer,
  SERVER_ERROR_RESPONSE_TRANSFORMERS,
  ServerErrorResponseTransformer,
  UnknownServerErrorResponseTransformer,
} from '../server-error-response-transformers';
import { ServerRespondingErrorHandler } from './server-responding-error-handler';
import { Priority } from '@spartacus/core';

const pageNotFoundTransformer =
  new CmsPageNotFoundServerErrorResponseTransformer();
const unknownServerErrorTransformer =
  new UnknownServerErrorResponseTransformer();

class MockTransformerWithHigherPriority
  implements ServerErrorResponseTransformer
{
  hasMatch(): boolean {
    return true;
  }
  getPriority(): number {
    return Priority.HIGH;
  }

  transform = jest.fn();
}

describe('ServerRespondingErrorHandler', () => {
  describe('default transformers', () => {
    let serverRespondingErrorHandler: ServerRespondingErrorHandler;

    beforeEach(() => {
      jest.spyOn(pageNotFoundTransformer, 'transform');
      jest.spyOn(unknownServerErrorTransformer, 'transform');

      TestBed.configureTestingModule({
        providers: [
          {
            provide: SERVER_ERROR_RESPONSE_TRANSFORMERS,
            useValue: pageNotFoundTransformer,
            multi: true,
          },
          {
            provide: SERVER_ERROR_RESPONSE_TRANSFORMERS,
            useValue: unknownServerErrorTransformer,
            multi: true,
          },
        ],
      });

      serverRespondingErrorHandler = TestBed.inject(
        ServerRespondingErrorHandler
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call CmsPageNotFoundServerErrorResponseTransformer', () => {
      const error = {
        headers: {},
        url: 'https://localhost:9002/rest/v2/cms/pages',
      } as HttpErrorResponse;

      serverRespondingErrorHandler.handleError(error);

      expect(pageNotFoundTransformer.transform).toHaveBeenCalledWith(error);
      expect(unknownServerErrorTransformer.transform).not.toHaveBeenCalled();
    });

    it('should call UnknownServerErrorResponseTransformer as fallback', () => {
      const error = {
        headers: {},
        url: 'https://localhost:9002/rest/v2/unknown',
      } as HttpErrorResponse;

      serverRespondingErrorHandler.handleError(error);

      expect(pageNotFoundTransformer.transform).not.toHaveBeenCalled();
      expect(unknownServerErrorTransformer.transform).toHaveBeenCalledWith(
        error
      );
    });
  });

  describe('custom transformers', () => {
    let serverRespondingErrorHandler: ServerRespondingErrorHandler;
    let transformers: ServerErrorResponseTransformer[];

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ServerRespondingErrorHandler,
          {
            provide: SERVER_ERROR_RESPONSE_TRANSFORMERS,
            useValue: pageNotFoundTransformer,
            multi: true,
          },
          {
            provide: SERVER_ERROR_RESPONSE_TRANSFORMERS,
            useValue: unknownServerErrorTransformer,
            multi: true,
          },
          {
            provide: SERVER_ERROR_RESPONSE_TRANSFORMERS,
            useClass: MockTransformerWithHigherPriority,
            multi: true,
          },
        ],
      });

      serverRespondingErrorHandler = TestBed.inject(
        ServerRespondingErrorHandler
      );
      transformers = TestBed.inject(SERVER_ERROR_RESPONSE_TRANSFORMERS);
    });

    it('should call transformer with highers prioroty', () => {
      const error = {
        headers: {},
        url: 'https://localhost:9002/rest/v2/cms/pages',
      } as HttpErrorResponse;

      serverRespondingErrorHandler.handleError(error);

      expect(transformers[2].transform).toHaveBeenCalledWith(error);
    });
  });
});
