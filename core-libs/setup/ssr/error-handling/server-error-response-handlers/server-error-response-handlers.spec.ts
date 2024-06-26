import { HttpErrorResponse } from '@angular/common/http';
import { CmsPageNotFoundHttpErrorResponse } from '@spartacus/core';
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
  });

  it('should do nothing if headers are already sent', () => {
    const err = new HttpErrorResponse({
      error: 'Page not found',
    });
    const errorRequestHandler =
      defaultServerErrorResponseHandlers(documentContent);
    res.headersSent = true;

    errorRequestHandler(err, req, res, next);

    expect(res.set).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  it('should handle CmsPageNotFoundHttpErrorResponse', () => {
    const err = {
      error: 'Page not found',
      cxCmsPageNotFound: true,
    } as CmsPageNotFoundHttpErrorResponse;
    const errorRequestHandler =
      defaultServerErrorResponseHandlers(documentContent);

    errorRequestHandler(err, req, res, next);

    expect(res.set).toHaveBeenCalledWith('Cache-Control', 'no-store');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith(documentContent);
  });

  it('should handle unknown error response', () => {
    const err = new Error('unknown error');
    const errorRequestHandler =
      defaultServerErrorResponseHandlers(documentContent);

    errorRequestHandler(err, req, res, next);

    expect(res.set).toHaveBeenCalledWith('Cache-Control', 'no-store');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(documentContent);
  });
});
