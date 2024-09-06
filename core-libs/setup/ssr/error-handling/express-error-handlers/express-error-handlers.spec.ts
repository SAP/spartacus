import { HttpErrorResponse } from '@angular/common/http';
import { CmsPageNotFoundOutboundHttpError } from '@spartacus/core';
import { defaultExpressErrorHandlers } from './express-error-handlers';

describe('expressErrorHandlers', () => {
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
  });

  it('should do nothing if headers are already sent', () => {
    const err = new HttpErrorResponse({
      error: 'Page not found',
    });
    const errorRequestHandler = defaultExpressErrorHandlers(documentContent);
    res.headersSent = true;

    errorRequestHandler(err, req, res, next);

    expect(res.set).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  it('should handle CmsPageNotFoundOutboundHttpError', () => {
    const err = new CmsPageNotFoundOutboundHttpError('Page not found');
    const errorRequestHandler = defaultExpressErrorHandlers(documentContent);

    errorRequestHandler(err, req, res, next);

    expect(res.set).toHaveBeenCalledWith('Cache-Control', 'no-store');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith(documentContent);
  });

  it('should handle unknown error', () => {
    const err = new Error('unknown error');
    const errorRequestHandler = defaultExpressErrorHandlers(documentContent);

    errorRequestHandler(err, req, res, next);

    expect(res.set).toHaveBeenCalledWith('Cache-Control', 'no-store');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(documentContent);
  });
});
