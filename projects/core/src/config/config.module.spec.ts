import { TestBed } from '@angular/core/testing';
import { Config } from '@spartacus/core';
import {
  provideConfig,
  provideConfigFactory,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from './config-providers';
import { ConfigModule } from './config.module';

describe('ConfigModule', () => {
  const exampleConfigFactory = () => ({
    test1: 'test config',
    test2: 'a' + 'b',
    test3: 3 * 5,
  });

  it('configuration token should expose configuration', () => {
    TestBed.configureTestingModule({});

    const config: any = TestBed.inject(Config);
    expect(config).toBeTruthy();
  });

  it('provideConfig should provide configuration', () => {
    TestBed.configureTestingModule({
      providers: [provideConfig({ test: 'config' } as Config)],
    });

    const config: any = TestBed.inject(Config);
    expect(config).toEqual({ test: 'config' });
  });

  it('should allow to override only part of the config', () => {
    TestBed.configureTestingModule({
      imports: [ConfigModule.forRoot({ test1: 'test1' } as Config)],
      providers: [provideConfig({ test2: 'test2' } as Config)],
    });

    const config: any = TestBed.inject(Config);
    expect(config).toEqual(jasmine.objectContaining({ test1: 'test1' }));
    expect(config).toEqual(jasmine.objectContaining({ test2: 'test2' }));
  });

  it('should allow to provide config with ConfigModule.withConfig', () => {
    TestBed.configureTestingModule({
      imports: [ConfigModule.withConfig({ test1: 'test1' } as Config)],
    });

    const config: any = TestBed.inject(Config);
    expect(config).toEqual({
      test1: 'test1',
    });
  });

  it('should allow to provide config with ConfigModule.withConfigFactory', () => {
    TestBed.configureTestingModule({
      imports: [ConfigModule.withConfigFactory(exampleConfigFactory)],
    });

    const config: any = TestBed.inject(Config);
    expect(config).toEqual(exampleConfigFactory());
  });

  it('should allow to provide config with provideConfigFactory', () => {
    TestBed.configureTestingModule({
      providers: [provideConfigFactory(exampleConfigFactory)],
    });

    const config: any = TestBed.inject(Config);
    expect(config).toEqual(exampleConfigFactory());
  });

  describe('Default Config', () => {
    let testBed: any;

    const exampleConfiguration = {
      test1: 'aaa',
      test2: 'b',
    };

    beforeEach(() => {
      testBed = TestBed.configureTestingModule({
        imports: [ConfigModule.forRoot(exampleConfiguration as Config)],
      });
    });

    it('provideDefaultConfig should provide default config', () => {
      testBed.configureTestingModule({
        providers: [provideDefaultConfig({ test1: 'a', test3: 'c' } as Config)],
      });
      const config: any = TestBed.inject(Config);
      expect(config).toEqual({
        test1: 'aaa',
        test2: 'b',
        test3: 'c',
      });
    });

    it('provideDefaultConfigFactory should provide default config', () => {
      testBed.configureTestingModule({
        providers: [provideDefaultConfigFactory(exampleConfigFactory)],
      });
      const config: any = TestBed.inject(Config);
      expect(config).toEqual({
        test1: 'aaa',
        test2: 'b',
        test3: 15,
      });
    });
  });
});
