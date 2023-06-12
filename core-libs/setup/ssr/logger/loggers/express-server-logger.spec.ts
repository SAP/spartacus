import { ExpressServerLogger } from './express-server-logger';
import { ServerLogger } from './server-logger';

describe('ExpressServerLogger', () => {
  const logger = new ExpressServerLogger();
  jest.useFakeTimers().setSystemTime(new Date('2023-05-26'));

  describe('logging', () => {
    it('should be defined', () => {
      expect(logger).toBeDefined();
    });

    it('should extends SsrLogger', () => {
      expect(logger).toBeInstanceOf(ServerLogger);
    });

    it('should log message', () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      logger.log('test', { request: {} });

      expect(logSpy).toHaveBeenCalledWith(
        logger['createLogMessage']('test', { request: {} })
      );
    });

    it('should warn message', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      logger.warn('test', { request: {} });

      expect(warnSpy).toHaveBeenCalledWith(
        logger['createLogMessage']('test', { request: {} })
      );
    });

    it('should error message', () => {
      const errorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      logger.error('test', { request: {} });

      expect(errorSpy).toHaveBeenCalledWith(
        logger['createLogMessage']('test', { request: {} })
      );
    });
  });

  describe('create log message', () => {
    it('should return message without request', () => {
      const logMessage = logger['createLogMessage']('test', {});

      expect(logMessage).not.toContain('request');
    });

    it('should return message with request', () => {
      const logMessage = logger['createLogMessage']('test', { request: {} });

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
              render: 'test',
            },
          },
        },
      } as any;

      const mappedRequest = logger['mapRequest'](request);

      expect(mappedRequest).toEqual({
        url: 'test',
        render: 'test',
      });
    });
  });
});
