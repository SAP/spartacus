import { Compiler, Injector, NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  Config,
  createFrom,
  EventService,
  ModuleInitializedEvent,
  provideConfig,
  provideDefaultConfig,
} from '@spartacus/core';
import { take } from 'rxjs/operators';
import { ConfigurationService } from './configuration.service';

@NgModule({
  providers: [
    provideDefaultConfig({ b: 'module default b' } as Config),
    provideConfig({ c: 'module c', d: 'module d' } as Config),
  ],
})
export class TestModule {}

describe('ConfigurationService', () => {
  let service: ConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideDefaultConfig({
          a: 'default a',
          b: 'default b',
          c: 'default c',
        } as Config),
        provideConfig({
          d: 'root d',
        } as Config),
      ],
    });
    service = TestBed.inject(ConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('config property', () => {
    it('should expose configuration', () => {
      const config = TestBed.inject(Config);
      expect(service.config).toBe(config);
    });
  });

  describe('unifiedConfig$', () => {
    it('should emit configuration', () => {
      const config = TestBed.inject(Config);
      let res;
      service.unifiedConfig$.subscribe((cfg) => (res = cfg));
      expect(res).toBe(config);
    });

    describe('when lazy module is instantiated', () => {
      let moduleEvent: ModuleInitializedEvent;
      let eventService: EventService;

      beforeEach(() => {
        eventService = TestBed.inject(EventService);
        const compiler = TestBed.inject(Compiler);
        const moduleFactory = compiler.compileModuleSync(TestModule);
        const moduleRef = moduleFactory.create(TestBed.inject(Injector));
        moduleEvent = createFrom(ModuleInitializedEvent, { moduleRef });
      });

      it('should emit new config on config change', () => {
        const configs = [];
        service.unifiedConfig$.subscribe((cfg) => configs.push(cfg));
        expect(configs.length).toEqual(1);
        eventService.dispatch(moduleEvent);
        expect(configs.length).toEqual(2);
      });

      it('should contribute to general config', async () => {
        eventService.dispatch(moduleEvent);
        const config: any = await service.unifiedConfig$
          .pipe(take(1))
          .toPromise();
        expect(config.a).toEqual('default a');
        expect(config.b).toEqual('module default b');
        expect(config.c).toEqual('module c');
      });

      it('should favor root config over lazy config', async () => {
        eventService.dispatch(moduleEvent);
        const config: any = await service.unifiedConfig$
          .pipe(take(1))
          .toPromise();
        expect(config.d).toEqual('root d');
      });

      it('should apply change to global configuration', () => {
        eventService.dispatch(moduleEvent);
        const config: any = TestBed.inject(Config);
        expect(config.a).toEqual('default a');
        expect(config.b).toEqual('module default b');
        expect(config.c).toEqual('module c');
      });

      describe('when disableConfigUpdates is enabled', () => {
        beforeEach(() => {
          const config = TestBed.inject(Config);
          // enable feature toggle
          config.features = {
            disableConfigUpdates: true,
          };
        });

        it('should emit new config on config change', () => {
          const configs = [];
          service.unifiedConfig$.subscribe((cfg) => configs.push(cfg));
          expect(configs.length).toEqual(1);
          eventService.dispatch(moduleEvent);
          expect(configs.length).toEqual(2);
        });
        it('should not apply changes to global configuration', () => {
          eventService.dispatch(moduleEvent);
          const config: any = TestBed.inject(Config);
          expect(config.a).toEqual('default a');
          expect(config.b).toEqual('default b');
          expect(config.c).toEqual('default c');
        });
      });
    });
  });
});
