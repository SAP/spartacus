import { LegacyExpressServerLogger } from './legacy-server-logger';

describe('LegacyExpressServerLogger', () => {
  const logger = new LegacyExpressServerLogger();

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
    it('should info message', () => {
      const infoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});

      logger.info(message);

      expect(infoSpy).toHaveBeenCalledWith(message);
    });
    it('should debug message', () => {
      const debugSpy = jest
        .spyOn(console, 'debug')
        .mockImplementation(() => {});

      logger.debug(message);

      expect(debugSpy).toHaveBeenCalledWith(message);
    });
  });
});
