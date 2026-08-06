import { vi } from 'vitest';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EMPTY, of } from 'rxjs';
import { LoggerService } from '../logger';
import { MockTranslationService } from './testing/mock-translation.service';
import { TranslatePipe } from './translate.pipe';
import { TranslationService } from './translation.service';

class MockLoggerService {
  log(): void {}
  warn(): void {}
  error(): void {}
  info(): void {}
  debug(): void {}
}

@Injectable()
class MockChangeDetectorRef implements Partial<ChangeDetectorRef> {
  markForCheck() {}
}

describe('TranslatePipe', () => {
  let pipe: TranslatePipe;
  let service: TranslationService;
  let cd: ChangeDetectorRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TranslatePipe,
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef },
        { provide: LoggerService, useClass: MockLoggerService },
      ],
    });
    pipe = TestBed.inject(TranslatePipe);
    service = TestBed.inject(TranslationService);
    cd = TestBed.inject(ChangeDetectorRef);
  });

  describe('transform', () => {
    it('should return falsy when input is undefined', () => {
      const result = pipe.transform(undefined as any);
      expect(result).toBeFalsy();
    });

    it('should return raw string when input is object with "raw" property ', () => {
      const result = pipe.transform({ raw: 'test' });
      expect(result).toBe('test');
    });

    it('should return result of service.translate', () => {
      vi.spyOn(service, 'translate').mockReturnValue(of('expectedValue'));
      const result = pipe.transform('testKey', { param: 'param1' });
      expect(service.translate).toHaveBeenCalledWith(
        'testKey',
        { param: 'param1' },
        true
      );
      expect(result).toBe('expectedValue');
    });

    it('should return result of service.translate if first argument is an array', () => {
      vi.spyOn(service, 'translate').mockReturnValue(of('expectedValue'));
      const result = pipe.transform(['testKey', 'anotherTestKey'], {
        param: 'param1',
      });
      expect(service.translate).toHaveBeenCalledWith(
        ['testKey', 'anotherTestKey'],
        { param: 'param1' },
        true
      );
      expect(result).toBe('expectedValue');
    });

    it('should translate with merged params from the first and the second argument', () => {
      vi.spyOn(service, 'translate').mockReturnValue(EMPTY);
      pipe.transform(
        { key: 'testKey', params: { param1: 'value1' } },
        { param2: 'value2' }
      );
      expect(service.translate).toHaveBeenCalledWith(
        'testKey',
        { param1: 'value1', param2: 'value2' },
        true
      );
    });

    it('should translate with merged params from the first and the second argument, if key in first argument contains array', () => {
      vi.spyOn(service, 'translate').mockReturnValue(of());
      pipe.transform(
        {
          key: ['testKey', 'anotherTestKey'],
          params: { param1: 'value1', param2: 'value2' },
        },
        { param3: 'value3' }
      );
      expect(service.translate).toHaveBeenCalledWith(
        ['testKey', 'anotherTestKey'],
        { param1: 'value1', param2: 'value2', param3: 'value3' },
        true
      );
    });

    it('should NOT call service.translate twice if pipe.transform was called twice with the same arguments', () => {
      vi.spyOn(service, 'translate').mockReturnValue(EMPTY);
      pipe.transform('testKey', { param: 'param1' });
      pipe.transform('testKey', { param: 'param1' });
      expect(service.translate).toHaveBeenCalledTimes(1);
    });

    it('should call service.translate every time pipe.transform was called with different keys', () => {
      vi.spyOn(service, 'translate').mockReturnValue(EMPTY);
      pipe.transform('testKey', { param: 'param1' });
      pipe.transform('testKeyOther', { param: 'param1' });
      expect(service.translate).toHaveBeenCalledTimes(2);
    });

    it('should call service.translate every time pipe.transform was called with different options', () => {
      vi.spyOn(service, 'translate').mockReturnValue(EMPTY);
      pipe.transform('testKey', { param: 'param1' });
      pipe.transform('testKey', { param: 'param2' });
      pipe.transform('testKey', { param: 'param2', otherParam: 'otherParam1' });
      expect(service.translate).toHaveBeenCalledTimes(3);
    });

    it('should call cd.markForCheck every time when service.translate emits value', () => {
      const markForCheckSpy = vi.spyOn(cd, 'markForCheck');
      vi.spyOn(service, 'translate').mockReturnValueOnce(
        of('value1', 'value2'),
        of('value3')
      );
      pipe.transform('testKey', { param: 'param1' });
      pipe.transform('testKey', { param: 'param2' });
      expect(markForCheckSpy).toHaveBeenCalledTimes(3);
    });
  });
});
