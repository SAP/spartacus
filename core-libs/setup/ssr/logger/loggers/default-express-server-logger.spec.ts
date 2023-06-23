import * as angularCore from '@angular/core';
import { Request } from 'express';
import { DefaultExpressServerLogger } from './default-express-server-logger';
import { ExpressServerLoggerContext } from './express-server-logger';

const request = {
  originalUrl: 'test',
  res: {
    locals: {
      cx: {
        request: { uuid: 'test', timeReceived: new Date('2023-05-26') },
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

    it('should log message', () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      logger.log('test', { request: {} as Request });

      expect(logSpy).toHaveBeenCalledWith(
        logger['createLogMessage']('test', { request: {} as Request })
      );
    });

    it('should warn message', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      logger.warn('test', { request: {} as Request });

      expect(warnSpy).toHaveBeenCalledWith(
        logger['createLogMessage']('test', { request: {} as Request })
      );
    });

    it('should error message', () => {
      const errorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      logger.error('test', { request: {} as Request });

      expect(errorSpy).toHaveBeenCalledWith(
        logger['createLogMessage']('test', { request: {} as Request })
      );
    });

    it('should info message', () => {
      const infoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});

      logger.info('test', { request: {} as Request });

      expect(infoSpy).toHaveBeenCalledWith(
        logger['createLogMessage']('test', { request: {} as Request })
      );
    });

    it('should debug message', () => {
      const debugSpy = jest
        .spyOn(console, 'debug')
        .mockImplementation(() => {});

      logger.debug('test', { request: {} as Request });

      expect(debugSpy).toHaveBeenCalledWith(
        logger['createLogMessage']('test', { request: {} as Request })
      );
    });

    describe('is not dev mode', () => {
      beforeEach(() => {
        jest.spyOn(angularCore, 'isDevMode').mockReturnValue(false);
      });

      it('should log proper shape of the JSON', () => {
        const debugSpy = jest
          .spyOn(console, 'log')
          .mockImplementation(() => {});

        logger.log('test', { request });

        expect(debugSpy.mock.lastCall).toMatchInlineSnapshot(`
          [
            "{"message":"test","context":{"timestamp":"2023-05-26T00:00:00.000Z","request":{"url":"test","uuid":"test","timeReceived":"2023-05-26T00:00:00.000Z"}}}",
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
            "{"message":"test","context":{"timestamp":"2023-05-26T00:00:00.000Z","request":{"url":"test","uuid":"test","timeReceived":"2023-05-26T00:00:00.000Z"}}}",
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
            "{"message":"test","context":{"timestamp":"2023-05-26T00:00:00.000Z","request":{"url":"test","uuid":"test","timeReceived":"2023-05-26T00:00:00.000Z"}}}",
          ]
        `);
      });

      it('should info proper shape of the JSON', () => {
        const request = {
          originalUrl: 'test',
          res: {
            locals: {
              cx: {
                request: { uuid: 'test', timeReceived: new Date() },
              },
            },
          },
        } as unknown as Request;

        const debugSpy = jest
          .spyOn(console, 'info')
          .mockImplementation(() => {});

        logger.info('test', { request });

        expect(debugSpy.mock.lastCall).toMatchInlineSnapshot(`
          [
            "{"message":"test","context":{"timestamp":"2023-05-26T00:00:00.000Z","request":{"url":"test","uuid":"test","timeReceived":"2023-05-26T00:00:00.000Z"}}}",
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
            "{"message":"test","context":{"timestamp":"2023-05-26T00:00:00.000Z","request":{"url":"test","uuid":"test","timeReceived":"2023-05-26T00:00:00.000Z"}}}",
          ]
        `);
      });
    });

    describe('is dev mode', () => {
      beforeEach(() => {
        jest.spyOn(angularCore, 'isDevMode').mockReturnValue(true);
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
                "timeReceived": "2023-05-26T00:00:00.000Z"
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
                "timeReceived": "2023-05-26T00:00:00.000Z"
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
                "timeReceived": "2023-05-26T00:00:00.000Z"
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
                "timeReceived": "2023-05-26T00:00:00.000Z"
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
                "timeReceived": "2023-05-26T00:00:00.000Z"
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
      const logMessage = logger['createLogMessage'](
        'test',
        {} as ExpressServerLoggerContext
      );

      expect(logMessage).not.toContain('request');
    });

    it('should return message with request', () => {
      const logMessage = logger['createLogMessage']('test', {
        request: {} as Request,
      });

      expect(logMessage).toContain('request');
    });
  });

  describe('map request', () => {
    it('should return mapped request', () => {
      const request = {
        originalUrl: 'test',
        res: {
          locals: {
            cx: {
              request: { uuid: 'test', timeReceived: new Date() },
            },
          },
        },
      } as any;

      const mappedRequest = logger['mapRequest'](request);

      expect(mappedRequest).toEqual({
        url: 'test',
        ...request.res?.locals.cx.request,
      });
    });
  });
});
