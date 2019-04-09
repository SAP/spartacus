import { TestBed } from '@angular/core/testing';

import { Normalizer, NormalizersService } from './normalizers.service';
import { InjectionToken } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';

const TestNormalizerInjectionToken = new InjectionToken(
  'TestNormalizerInjectionToken'
);
const NotProvidedNormalizerInjectionToken = new InjectionToken(
  'TestNormalizerInjectionToken'
);

class CopyNormalizer implements Normalizer<any, any> {
  normalize(source: any, target: any = {}): any {
    return { ...target, ...source };
  }
}

class TestNormalizer implements Normalizer<any, any> {
  normalize(source: any, target: any = {}): any {
    return { ...target, source };
  }
}

describe('NormalizersService', () => {
  let service: NormalizersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TestNormalizerInjectionToken,
          useClass: CopyNormalizer,
          multi: true,
        },
        {
          provide: TestNormalizerInjectionToken,
          useClass: TestNormalizer,
          multi: true,
        },
      ],
    });
    service = TestBed.get(NormalizersService);
  });

  describe('hasNormalizers', () => {
    it('should return true when normalizers are available', () => {
      expect(service.hasNormalizers(TestNormalizerInjectionToken)).toBe(true);
    });
    it('should return false when normalizers are not provided', () => {
      expect(service.hasNormalizers(NotProvidedNormalizerInjectionToken)).toBe(
        false
      );
    });
  });

  describe('pipeable', () => {
    it('should normalize when normalizers are available', () => {
      const source = { test: 'test' };
      let target;

      of(source)
        .pipe(service.pipeable(TestNormalizerInjectionToken))
        .subscribe(result => (target = result));

      expect(target).toEqual({ test: 'test', source: { test: 'test' } });
    });
    it('should pass data if when normalizers are not provided', () => {
      const source = { test: 'test' };
      let target;

      of(source)
        .pipe(service.pipeable(NotProvidedNormalizerInjectionToken))
        .subscribe(result => (target = result));

      expect(target).toBe(source);
    });
  });

  describe('normalize', () => {
    it('should normalize when normalizers are available', () => {
      const source = { test: 'test' };
      const target = service.normalize(source, TestNormalizerInjectionToken);
      expect(target).toEqual({ test: 'test', source: { test: 'test' } });
    });

    it('should pass data if when normalizers are not provided', () => {
      const source = { test: 'test' };
      const target = service.normalize(
        source,
        NotProvidedNormalizerInjectionToken
      );
      expect(target).toBe(source);
    });
  });
});
