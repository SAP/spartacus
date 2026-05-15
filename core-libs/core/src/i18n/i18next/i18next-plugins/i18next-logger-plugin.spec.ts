import { TestBed } from '@angular/core/testing';
import { LoggerService } from '@spartacus/core';
import { LoggerModule } from 'i18next';
import { I18NEXT_LOGGER_PLUGIN } from './i18next-logger-plugin';

const testInput: any[][] = [['test'], ['test2', 2], ['test3', 3, 4]];

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

  testInput.forEach((input) => {
    describe(`logging ${input.length} argument(s)`, () => {
      it('should log', () => {
        const log = spyOn(logger, 'log');

        plugin.log(input);

        expect(log).toHaveBeenCalledWith(...input);
      });

      it('should warn', () => {
        const warn = spyOn(logger, 'warn');

        plugin.warn(input);

        expect(warn).toHaveBeenCalledWith(...input);
      });

      it('should error', () => {
        const error = spyOn(logger, 'error');

        plugin.error(input);

        expect(error).toHaveBeenCalledWith(...input);
      });
    });
  });
});
