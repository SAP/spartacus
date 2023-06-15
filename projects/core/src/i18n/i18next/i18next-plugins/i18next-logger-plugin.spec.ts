import { TestBed } from '@angular/core/testing';
import { LoggerService } from '@spartacus/core';
import { LoggerModule } from 'i18next';
import { I18NEXT_LOGGER_PLUGIN } from './i18next-logger-plugin';

describe('i18next logger plugin', () => {
  let plugin: LoggerModule;
  let logger: LoggerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService],
    });

    plugin = TestBed.inject(I18NEXT_LOGGER_PLUGIN);
    logger = TestBed.inject(LoggerService);
  });

  it('should return logger plugin', () => {
    expect(plugin).toBeTruthy();
    expect(plugin.type).toEqual('logger');
  });

  it('should log', () => {
    const log = spyOn(logger, 'log');

    plugin.log(['test']);

    expect(log).toHaveBeenCalledWith('test');
  });

  it('should warn', () => {
    const warn = spyOn(logger, 'warn');

    plugin.warn(['test']);

    expect(warn).toHaveBeenCalledWith('test');
  });

  it('should error', () => {
    const error = spyOn(logger, 'error');

    plugin.error(['test']);

    expect(error).toHaveBeenCalledWith('test');
  });
});
