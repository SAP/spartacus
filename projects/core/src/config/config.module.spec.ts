import { TestBed } from '@angular/core/testing';
import { Config, ConfigModule, provideConfig } from './config.module';

describe('ConfigModule', () => {
  it('forRoot should provide a configuration', () => {
    TestBed.configureTestingModule({
      imports: [ConfigModule.forRoot()],
    });

    const config = TestBed.inject(Config);
    expect(config).toBeTruthy();
  });

  it('should provide default server config', () => {
    TestBed.configureTestingModule({
      imports: [ConfigModule.forRoot()],
    });

    const config = TestBed.inject(Config);
    expect(config).toEqual({});
  });

  it('should allow to override only part of the config', () => {
    TestBed.configureTestingModule({
      imports: [ConfigModule.forRoot({ test1: 'test1' })],
    });

    const config = TestBed.inject(Config);
    expect(config).toEqual(jasmine.objectContaining({ test1: 'test1' }));
  });

  it('should allow to provide config with ConfigModule.withConfig', () => {
    TestBed.configureTestingModule({
      imports: [
        ConfigModule.withConfig({ test1: 'test1' }),
        ConfigModule.forRoot(),
      ],
    });

    const config = TestBed.inject(Config);
    expect(config).toEqual(
      jasmine.objectContaining({
        test1: 'test1',
      })
    );
  });

  it('should allow to provide config with ConfigModule.withConfigFactory', () => {
    const configFactory = () => ({
      test1: 'test config',
      test2: 'a' + 'b',
      test3: 3 * 5,
    });
    TestBed.configureTestingModule({
      imports: [
        ConfigModule.withConfigFactory(configFactory),
        ConfigModule.forRoot(),
      ],
    });

    const config = TestBed.inject(Config);
    expect(config).toEqual(
      jasmine.objectContaining({
        test1: 'test config',
        test2: 'ab',
        test3: 15,
      })
    );
  });

  it('should allow to provide config with provideConfig', () => {
    TestBed.configureTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [provideConfig({ test: 'test value' })],
    });

    const config = TestBed.inject(Config);
    expect(config).toEqual(jasmine.objectContaining({ test: 'test value' }));
  });
});
