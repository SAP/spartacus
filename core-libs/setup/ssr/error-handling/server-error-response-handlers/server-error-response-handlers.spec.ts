import {
  CmsPageNotFoundServerErrorResponse,
  UnknownServerErrorResponse,
} from '../server-error-response';
import { defaultServerErrorResponseHandlers } from './server-error-response-handlers';

describe('serverErrorResponseHandlers', () => {
  let documentContent: string;
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    documentContent = 'some document content';
    req = {};
    res = {
      set: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  describe('handleCmsPageNotFoundErrorResponse', () => {
    it('should call next if headers are already sent', () => {
      const err = new CmsPageNotFoundServerErrorResponse({
        message: 'Page not found',
      });
      const errorRequestHandler =
        defaultServerErrorResponseHandlers(documentContent);
      res.headersSent = true;

      errorRequestHandler(err, req, res, next);

      expect(res.set).not.toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(err);
    });

    it('should handle CmsPageNotFoundServerErrorResponse', () => {
      const err = new CmsPageNotFoundServerErrorResponse({
        message: 'Page not found',
      });
      const errorRequestHandler =
        defaultServerErrorResponseHandlers(documentContent);

      errorRequestHandler(err, req, res, next);

      expect(res.set).toHaveBeenCalledWith('Cache-Control', 'no-store');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith(documentContent);
      expect(next).not.toHaveBeenCalled();
    });

    it('should call next for other error types', () => {
      const err = new Error('Some error');
      const errorRequestHandler =
        defaultServerErrorResponseHandlers(documentContent);

      errorRequestHandler(err, req, res, next);

      expect(res.set).not.toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(err);
    });
  });

  describe('handleUnknownServerErrorResponse', () => {
    it('should call next if headers are already sent', () => {
      const err = new UnknownServerErrorResponse({
        message: 'Page not found',
      });
      const errorRequestHandler =
        defaultServerErrorResponseHandlers(documentContent);
      res.headersSent = true;

      errorRequestHandler(err, req, res, next);

      expect(res.set).not.toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(err);
    });

    it('should handle UnknownServerErrorResponse', () => {
      const err = new UnknownServerErrorResponse({ message: 'Some error' });
      const errorRequestHandler =
        defaultServerErrorResponseHandlers(documentContent);

      errorRequestHandler(err, req, res, next);

      expect(res.set).toHaveBeenCalledWith('Cache-Control', 'no-store');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(documentContent);
      expect(next).not.toHaveBeenCalled();
    });

    it('should call next for other error types', () => {
      const err = new Error('Some error');
      const errorRequestHandler =
        defaultServerErrorResponseHandlers(documentContent);

      errorRequestHandler(err, req, res, next);

      expect(res.set).not.toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(err);
    });
  });
});
