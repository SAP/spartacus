import { TestBed } from '@angular/core/testing';
import { ExpressLoggerService } from './express-logger.service';
import { PrerenderingLoggerService } from './prerendering-logger.service';

describe('PrerenderingLoggerService', () => {
  let loggerService: PrerenderingLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpressLoggerService],
    });

    loggerService = TestBed.inject(PrerenderingLoggerService);
  });

  describe('log', () => {
    it('should log', () => {
      const log = jest.spyOn(console, 'log').mockImplementation(() => {});

      loggerService.log('test');

      expect(log).toHaveBeenCalledWith('test');
    });

    it('should warn', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

      loggerService.warn('test');

      expect(warn).toHaveBeenCalledWith('test');
    });

    it('should error', () => {
      const error = jest.spyOn(console, 'error').mockImplementation(() => {});

      loggerService.error('test');

      expect(error).toHaveBeenCalledWith('test');
    });

    it('should info', () => {
      const info = jest.spyOn(console, 'info').mockImplementation(() => {});

      loggerService.info('test');

      expect(info).toHaveBeenCalledWith('test');
    });

    it('should debug', () => {
      const debug = jest.spyOn(console, 'debug').mockImplementation(() => {});

      loggerService.debug('test');

      expect(debug).toHaveBeenCalledWith('test');
    });
  });
});
