import { InjectionToken, Injector, NgModuleRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of, ReplaySubject } from 'rxjs';
import { Converter, ConverterService } from './converter.service';
import { LazyModulesService } from '@spartacus/core';

const TestConverterInjectionToken = new InjectionToken(
  'TestConverterInjectionToken'
);
const NotProvidedConverterInjectionToken = new InjectionToken(
  'NotProvidedConverterInjectionToken'
);

const TestLazyConverterInjectionToken = new InjectionToken(
  'TestLazyConverterInjectionToken'
);

class CopyNormalizer implements Converter<any, any> {
  convert(source: any, target: any = {}): any {
    return { ...target, ...source };
  }
}

class TestNormalizer implements Converter<any, any> {
  convert(source: any, target: any = {}): any {
    return { ...target, source };
  }
}

class MockLazyModulesService implements Partial<LazyModulesService> {
  modules$ = new ReplaySubject<NgModuleRef<any>>();
}

describe('ConverterService', () => {
  let service: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TestConverterInjectionToken,
          useClass: CopyNormalizer,
          multi: true,
        },
        {
          provide: TestConverterInjectionToken,
          useClass: TestNormalizer,
          multi: true,
        },
        {
          provide: LazyModulesService,
          useClass: MockLazyModulesService,
        },
      ],
    });
    service = TestBed.inject(ConverterService);
  });

  describe('hasConverters', () => {
    it('should return true when converters are available', () => {
      expect(service.hasConverters(TestConverterInjectionToken)).toBe(true);
    });
    it('should return false when converters are not provided', () => {
      expect(service.hasConverters(NotProvidedConverterInjectionToken)).toBe(
        false
      );
    });
  });

  describe('pipeable', () => {
    it('should convert when converters are available', () => {
      const source = { test: 'test' };
      let target;

      of(source)
        .pipe(service.pipeable(TestConverterInjectionToken))
        .subscribe((result) => (target = result));

      expect(target).toEqual({ test: 'test', source: { test: 'test' } });
    });
    it('should pass data if when converters are not provided', () => {
      const source = { test: 'test' };
      let target;

      of(source)
        .pipe(service.pipeable(NotProvidedConverterInjectionToken))
        .subscribe((result) => (target = result));

      expect(target).toBe(source);
    });
  });

  describe('pipeableMany', () => {
    it('should convert when converters are available', () => {
      const sources = [{ test: 'test' }, { test: 'test2' }];
      let target;

      of(sources)
        .pipe(service.pipeableMany(TestConverterInjectionToken))
        .subscribe((result) => (target = result));

      expect(target).toEqual([
        { test: 'test', source: { test: 'test' } },
        { test: 'test2', source: { test: 'test2' } },
      ]);
    });
    it('should pass data if when converters are not provided', () => {
      const sources = [{ test: 'test' }, { test: 'test2' }];
      let target;

      of(sources)
        .pipe(service.pipeable(NotProvidedConverterInjectionToken))
        .subscribe((result) => (target = result));

      expect(target).toBe(sources);
    });
  });

  describe('convert', () => {
    it('should convert when converters are available', () => {
      const source = { test: 'test' };
      const target = service.convert(source, TestConverterInjectionToken);
      expect(target).toEqual({ test: 'test', source: { test: 'test' } });
    });

    it('should pass data if when converters are not provided', () => {
      const source = { test: 'test' };
      const target = service.convert(
        source,
        NotProvidedConverterInjectionToken
      );
      expect(target).toBe(source);
    });
  });

  describe('convertMany', () => {
    it('should convert when converters are available', () => {
      const sources = [{ test: 'test' }, { test: 'test2' }];
      const target = service.convertMany(sources, TestConverterInjectionToken);
      expect(target).toEqual([
        { test: 'test', source: { test: 'test' } },
        { test: 'test2', source: { test: 'test2' } },
      ]);
    });

    it('should pass data if when converters are not provided', () => {
      const sources = [{ test: 'test' }, { test: 'test2' }];
      const target = service.convertMany(
        sources,
        NotProvidedConverterInjectionToken
      );
      expect(target).toBe(sources);
    });
  });

  describe('with lazy-loaded converters', () => {
    const moduleInstanceWithTestConverter: any = {
      injector: Injector.create({
        providers: [
          {
            provide: TestLazyConverterInjectionToken,
            useValue: 'lazyConverter',
            multi: true,
          },
        ],
      }),
    };

    it('should register converters from lazy-loaded modules', () => {
      expect(
        service.hasConverters(TestLazyConverterInjectionToken)
      ).toBeFalse();

      const lazyModules = TestBed.inject<MockLazyModulesService>(
        LazyModulesService as any
      );
      lazyModules.modules$.next(moduleInstanceWithTestConverter);

      expect(service.hasConverters(TestLazyConverterInjectionToken)).toBeTrue();
    });
  });
});
