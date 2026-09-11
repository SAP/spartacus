/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NextFunction, Request, Response } from 'express';
import { createMarkdownPageHandler } from './create-markdown-page-handler';
import { HtmlToPageParser, ParsedPage, ParsedPageConverter } from './markdown-page-handler.model';

function mockReq(negotiated: string): Request {
  return {
    accepts: jest.fn().mockReturnValue(negotiated),
  } as unknown as Request;
}

function mockRes(): Response {
  const res = {
    send: jest.fn().mockImplementation(() => res),
    setHeader: jest.fn(),
  };
  return res as unknown as Response;
}

/** Minimal ParsedPage for use in mocks. */
const minimalParsed: ParsedPage = { body: '# MD' };

describe('createMarkdownPageHandler', () => {
  let next: NextFunction;
  beforeEach(() => (next = jest.fn()));

  it('passes through when markdown is not negotiated', () => {
    const res = mockRes();
    const originalSend = res.send;
    createMarkdownPageHandler()(mockReq('text/html'), res, next);
    expect(next).toHaveBeenCalled();
    expect(res.send).toBe(originalSend);
  });

  it('patches res.send when markdown is negotiated', () => {
    const res = mockRes();
    const originalSend = res.send;
    createMarkdownPageHandler()(mockReq('text/markdown'), res, next);
    expect(next).toHaveBeenCalled();
    expect(res.send).not.toBe(originalSend);
  });

  it('calls parser with the raw HTML then converter with the ParsedPage', async () => {
    const res = mockRes();
    const sendMock = res.send as jest.Mock;
    const parser: HtmlToPageParser = jest
      .fn()
      .mockResolvedValue(minimalParsed);
    const converter: ParsedPageConverter = jest.fn().mockReturnValue('# MD');

    createMarkdownPageHandler({ parser, converter })(
      mockReq('text/markdown'),
      res,
      next
    );
    sendMock.mockClear();

    res.send('<main>x</main>');
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(parser).toHaveBeenCalledWith('<main>x</main>');
    expect(converter).toHaveBeenCalledWith(minimalParsed);
  });

  it('sets markdown headers and sends converted output', async () => {
    const res = mockRes();
    const sendMock = res.send as jest.Mock;
    const parser: HtmlToPageParser = jest
      .fn()
      .mockResolvedValue(minimalParsed);
    const converter: ParsedPageConverter = jest.fn().mockReturnValue('# MD');

    createMarkdownPageHandler({ parser, converter })(
      mockReq('text/markdown'),
      res,
      next
    );
    sendMock.mockClear();

    res.send('<main>x</main>');
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(res.setHeader).toHaveBeenCalledWith(
      'Content-Type',
      'text/markdown; charset=utf-8'
    );
    expect(res.setHeader).toHaveBeenCalledWith('Vary', 'Accept');
    expect(sendMock).toHaveBeenCalledWith('# MD');
  });

  it('falls back to the original HTML when the parser throws', async () => {
    const res = mockRes();
    const sendMock = res.send as jest.Mock;
    const parser: HtmlToPageParser = () => {
      throw new Error('boom');
    };
    createMarkdownPageHandler({ parser })(
      mockReq('text/markdown'),
      res,
      next
    );
    sendMock.mockClear();

    res.send('<main>original</main>');
    await Promise.resolve();
    await Promise.resolve();

    expect(sendMock).toHaveBeenCalledWith('<main>original</main>');
    expect(res.setHeader).not.toHaveBeenCalledWith(
      'Content-Type',
      'text/markdown; charset=utf-8'
    );
  });

  it('falls back to the original HTML when the converter throws', async () => {
    const res = mockRes();
    const sendMock = res.send as jest.Mock;
    const parser: HtmlToPageParser = jest
      .fn()
      .mockResolvedValue(minimalParsed);
    const converter: ParsedPageConverter = () => {
      throw new Error('boom');
    };
    createMarkdownPageHandler({ parser, converter })(
      mockReq('text/markdown'),
      res,
      next
    );
    sendMock.mockClear();

    res.send('<main>original</main>');
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(sendMock).toHaveBeenCalledWith('<main>original</main>');
    expect(res.setHeader).not.toHaveBeenCalledWith(
      'Content-Type',
      'text/markdown; charset=utf-8'
    );
  });

  it('suppresses error logging when logger: null is passed', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const res = mockRes();
    const sendMock = res.send as jest.Mock;
    const parser: HtmlToPageParser = () => {
      throw new Error('boom');
    };
    createMarkdownPageHandler({ parser, logger: null })(
      mockReq('text/markdown'),
      res,
      next
    );
    sendMock.mockClear();

    res.send('<main>original</main>');
    await Promise.resolve();
    await Promise.resolve();

    expect(consoleSpy).not.toHaveBeenCalled();
    expect(sendMock).toHaveBeenCalledWith('<main>original</main>');
    consoleSpy.mockRestore();
  });

  it('routes errors to a custom logger when provided', async () => {
    const res = mockRes();
    const sendMock = res.send as jest.Mock;
    const customLogger = { error: jest.fn() };
    const parser: HtmlToPageParser = () => {
      throw new Error('boom');
    };
    createMarkdownPageHandler({ parser, logger: customLogger })(
      mockReq('text/markdown'),
      res,
      next
    );
    sendMock.mockClear();

    res.send('<main>original</main>');
    await Promise.resolve();
    await Promise.resolve();

    expect(customLogger.error).toHaveBeenCalledWith(
      '[markdown-page-handler] conversion failed',
      expect.any(Error)
    );
  });

  it('uses the two-argument accepts negotiation form', () => {
    const req = mockReq('text/html');
    createMarkdownPageHandler()(req, mockRes(), next);
    expect(req.accepts).toHaveBeenCalledWith(['text/html', 'text/markdown']);
  });

  it('serves original HTML and skips markdown headers when pipeline times out', async () => {
    jest.useFakeTimers();
    const res = mockRes();
    const sendMock = res.send as jest.Mock;
    // Parser returns a Promise that never resolves — simulates a stuck async step.
    const parser: HtmlToPageParser = () => new Promise<ParsedPage>(() => {});
    createMarkdownPageHandler({ parser, timeout: 100 })(
      mockReq('text/markdown'),
      res,
      next
    );
    sendMock.mockClear();

    res.send('<main>slow</main>');

    jest.advanceTimersByTime(200);

    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(sendMock).toHaveBeenCalledWith('<main>slow</main>');
    expect(res.setHeader).not.toHaveBeenCalledWith(
      'Content-Type',
      'text/markdown; charset=utf-8'
    );

    jest.useRealTimers();
  });

  it('passes through when request URL matches a skipUrls entry', () => {
    const res = mockRes();
    const originalSend = res.send;
    const req = {
      ...mockReq('text/markdown'),
      url: '/checkout/payment',
    } as Request;
    createMarkdownPageHandler({ skipUrls: ['checkout'] })(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.send).toBe(originalSend);
  });

  it('converts normally when request URL does not match skipUrls', () => {
    const res = mockRes();
    const originalSend = res.send;
    const req = { ...mockReq('text/markdown'), url: '/product/123' } as Request;
    createMarkdownPageHandler({ skipUrls: ['checkout'] })(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.send).not.toBe(originalSend);
  });
});
