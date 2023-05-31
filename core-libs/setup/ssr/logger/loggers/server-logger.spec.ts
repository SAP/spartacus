import { ServerLogger } from './server-logger';

describe('ServerLogger', () => {
  const logger = new ServerLogger();

  describe('log', () => {
    const message = 'test';

    it('should log message', () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      logger.log(message);

      expect(logSpy).toHaveBeenCalledWith(message);
    });
    it('should warn message', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      logger.warn(message);

      expect(warnSpy).toHaveBeenCalledWith(message);
    });
    it('should error message', () => {
      const errorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      logger.error(message);

      expect(errorSpy).toHaveBeenCalledWith(message);
    });
  });
});
