jest.mock('@angular/core', () => {
  return {
    ...jest.requireActual('@angular/core'),
    isDevMode: jest.fn(),
  };
});

import { isDevMode } from '@angular/core';
import { Request } from 'express';
import { DefaultExpressServerLogger } from './default-express-server-logger';

const request = {
  originalUrl: 'test',
  res: {
    locals: {
      cx: {
        request: {
          uuid: 'test',
          timeReceived: new Date('2023-05-26'),
          traceContext: {
            version: '00',
            traceId: 'd745f6735b44e81c0ae5410cb1fc8a0c',
            parentId: '1b527c3828976b39',
            traceFlags: '01',
          },
        },
      },
    },
  },
} as unknown as Request;

describe('DefaultExpressServerLogger', () => {
  let logger: DefaultExpressServerLogger;

  beforeEach(() => {
    logger = new DefaultExpressServerLogger();
    jest.useFakeTimers().setSystemTime(new Date('2023-05-26'));
  });

  describe('logging', () => {
    it('should be defined', () => {
      expect(logger).toBeDefined();
    });

    describe('is not dev mode', () => {
      beforeEach(() => {
        (isDevMode as jest.Mock).mockReturnValue(false);
      });

      it('should log proper shape of the JSON', () => {
        const debugSpy = jest
          .spyOn(console, 'log')
          .mockImplementation(() => {});

        logger.log('test', { request });

        expect(debugSpy.mock.lastCall).toMatchInlineSnapshot(`
          [
            "{"message":"test","context":{"timestamp":"2023-05-26T00:00:00.000Z","request":{"url":"test","uuid":"test","timeReceived":"2023-05-26T00:00:00.000Z","traceContext":{"version":"00","traceId":"d745f6735b44e81c0ae5410cb1fc8a0c","parentId":"1b527c3828976b39","traceFlags":"01"}}}}",
          ]
        `);
      });

      it('should warn proper shape of the JSON', () => {
        const debugSpy = jest
          .spyOn(console, 'warn')
          .mockImplementation(() => {});

        logger.warn('test', { request });

        expect(debugSpy.mock.lastCall).toMatchInlineSnapshot(`
          [
            "{"message":"test","context":{"timestamp":"2023-05-26T00:00:00.000Z","request":{"url":"test","uuid":"test","timeReceived":"2023-05-26T00:00:00.000Z","traceContext":{"version":"00","traceId":"d745f6735b44e81c0ae5410cb1fc8a0c","parentId":"1b527c3828976b39","traceFlags":"01"}}}}",
          ]
        `);
      });

      it('should error proper shape of the JSON', () => {
        const debugSpy = jest
          .spyOn(console, 'error')
          .mockImplementation(() => {});

        logger.error('test', { request });

        expect(debugSpy.mock.lastCall).toMatchInlineSnapshot(`
          [
            "{"message":"test","context":{"timestamp":"2023-05-26T00:00:00.000Z","request":{"url":"test","uuid":"test","timeReceived":"2023-05-26T00:00:00.000Z","traceContext":{"version":"00","traceId":"d745f6735b44e81c0ae5410cb1fc8a0c","parentId":"1b527c3828976b39","traceFlags":"01"}}}}",
          ]
        `);
      });

      it('should info proper shape of the JSON', () => {
        const debugSpy = jest
          .spyOn(console, 'info')
          .mockImplementation(() => {});

        logger.info('test', { request });

        expect(debugSpy.mock.lastCall).toMatchInlineSnapshot(`
          [
            "{"message":"test","context":{"timestamp":"2023-05-26T00:00:00.000Z","request":{"url":"test","uuid":"test","timeReceived":"2023-05-26T00:00:00.000Z","traceContext":{"version":"00","traceId":"d745f6735b44e81c0ae5410cb1fc8a0c","parentId":"1b527c3828976b39","traceFlags":"01"}}}}",
          ]
        `);
      });

      it('should debug proper shape of the JSON', () => {
        const debugSpy = jest
          .spyOn(console, 'debug')
          .mockImplementation(() => {});

        logger.debug('test', { request });

        expect(debugSpy.mock.lastCall).toMatchInlineSnapshot(`
          [
            "{"message":"test","context":{"timestamp":"2023-05-26T00:00:00.000Z","request":{"url":"test","uuid":"test","timeReceived":"2023-05-26T00:00:00.000Z","traceContext":{"version":"00","traceId":"d745f6735b44e81c0ae5410cb1fc8a0c","parentId":"1b527c3828976b39","traceFlags":"01"}}}}",
          ]
        `);
      });
    });

    describe('is dev mode', () => {
      beforeEach(() => {
        (isDevMode as jest.Mock).mockReturnValue(true);
      });

      it('should log proper shape of the JSON', () => {
        const debugSpy = jest
          .spyOn(console, 'log')
          .mockImplementation(() => {});

        logger.log('test', { request });

        expect(debugSpy.mock.lastCall).toMatchInlineSnapshot(`
          [
            "{
            "message": "test",
            "context": {
              "timestamp": "2023-05-26T00:00:00.000Z",
              "request": {
                "url": "test",
                "uuid": "test",
                "timeReceived": "2023-05-26T00:00:00.000Z",
                "traceContext": {
                  "version": "00",
                  "traceId": "d745f6735b44e81c0ae5410cb1fc8a0c",
                  "parentId": "1b527c3828976b39",
                  "traceFlags": "01"
                }
              }
            }
          }",
          ]
        `);
      });

      it('should warn proper shape of the JSON', () => {
        const debugSpy = jest
          .spyOn(console, 'warn')
          .mockImplementation(() => {});

        logger.warn('test', { request });

        expect(debugSpy.mock.lastCall).toMatchInlineSnapshot(`
          [
            "{
            "message": "test",
            "context": {
              "timestamp": "2023-05-26T00:00:00.000Z",
              "request": {
                "url": "test",
                "uuid": "test",
                "timeReceived": "2023-05-26T00:00:00.000Z",
                "traceContext": {
                  "version": "00",
                  "traceId": "d745f6735b44e81c0ae5410cb1fc8a0c",
                  "parentId": "1b527c3828976b39",
                  "traceFlags": "01"
                }
              }
            }
          }",
          ]
        `);
      });

      it('should error proper shape of the JSON', () => {
        const debugSpy = jest
          .spyOn(console, 'error')
          .mockImplementation(() => {});

        logger.error('test', { request });

        expect(debugSpy.mock.lastCall).toMatchInlineSnapshot(`
          [
            "{
            "message": "test",
            "context": {
              "timestamp": "2023-05-26T00:00:00.000Z",
              "request": {
                "url": "test",
                "uuid": "test",
                "timeReceived": "2023-05-26T00:00:00.000Z",
                "traceContext": {
                  "version": "00",
                  "traceId": "d745f6735b44e81c0ae5410cb1fc8a0c",
                  "parentId": "1b527c3828976b39",
                  "traceFlags": "01"
                }
              }
            }
          }",
          ]
        `);
      });

      it('should info proper shape of the JSON', () => {
        const debugSpy = jest
          .spyOn(console, 'info')
          .mockImplementation(() => {});

        logger.info('test', { request });

        expect(debugSpy.mock.lastCall).toMatchInlineSnapshot(`
          [
            "{
            "message": "test",
            "context": {
              "timestamp": "2023-05-26T00:00:00.000Z",
              "request": {
                "url": "test",
                "uuid": "test",
                "timeReceived": "2023-05-26T00:00:00.000Z",
                "traceContext": {
                  "version": "00",
                  "traceId": "d745f6735b44e81c0ae5410cb1fc8a0c",
                  "parentId": "1b527c3828976b39",
                  "traceFlags": "01"
                }
              }
            }
          }",
          ]
        `);
      });

      it('should debug proper shape of the JSON', () => {
        const debugSpy = jest
          .spyOn(console, 'debug')
          .mockImplementation(() => {});

        logger.debug('test', { request });

        expect(debugSpy.mock.lastCall).toMatchInlineSnapshot(`
          [
            "{
            "message": "test",
            "context": {
              "timestamp": "2023-05-26T00:00:00.000Z",
              "request": {
                "url": "test",
                "uuid": "test",
                "timeReceived": "2023-05-26T00:00:00.000Z",
                "traceContext": {
                  "version": "00",
                  "traceId": "d745f6735b44e81c0ae5410cb1fc8a0c",
                  "parentId": "1b527c3828976b39",
                  "traceFlags": "01"
                }
              }
            }
          }",
          ]
        `);
      });
    });
  });

  describe('create log message', () => {
    it('should return message without request', () => {
      const logMessage = logger['stringifyWithContext']('test', {});

      expect(logMessage).not.toContain('request');
    });

    it('should return message with request', () => {
      const logMessage = logger['stringifyWithContext']('test', {
        request,
      });

      expect(logMessage).toContain('request');
    });
  });

  describe('map context', () => {
    it('should return context without request', () => {
      const context = logger['mapContext']({
        options: {},
      });

      expect(context).toMatchInlineSnapshot(`
        {
          "options": {},
          "timestamp": "2023-05-26T00:00:00.000Z",
        }
      `);
    });

    it('should return context with request', () => {
      const context = logger['mapContext']({ request });

      expect(context).toMatchInlineSnapshot(`
        {
          "request": {
            "timeReceived": 2023-05-26T00:00:00.000Z,
            "traceContext": {
              "parentId": "1b527c3828976b39",
              "traceFlags": "01",
              "traceId": "d745f6735b44e81c0ae5410cb1fc8a0c",
              "version": "00",
            },
            "url": "test",
            "uuid": "test",
          },
          "timestamp": "2023-05-26T00:00:00.000Z",
        }
      `);
    });
  });

  describe('map request', () => {
    it('should return mapped request', () => {
      const mappedRequest = logger['mapRequest'](request);

      expect(mappedRequest).toMatchInlineSnapshot(`
        {
          "timeReceived": 2023-05-26T00:00:00.000Z,
          "traceContext": {
            "parentId": "1b527c3828976b39",
            "traceFlags": "01",
            "traceId": "d745f6735b44e81c0ae5410cb1fc8a0c",
            "version": "00",
          },
          "url": "test",
          "uuid": "test",
        }
      `);
    });

    it('should return mapped request without traceContext prop if traceparent is not available', () => {
      const requestWithoutTraceContext = {
        originalUrl: 'test',
        res: {
          locals: {
            cx: {
              request: {
                uuid: 'test',
                timeReceived: new Date('2023-05-26'),
              },
            },
          },
        },
      } as unknown as Request;

      const mappedRequest = logger['mapRequest'](requestWithoutTraceContext);

      expect(mappedRequest).toMatchInlineSnapshot(`
        {
          "timeReceived": 2023-05-26T00:00:00.000Z,
          "url": "test",
          "uuid": "test",
        }
      `);
    });
  });
});
