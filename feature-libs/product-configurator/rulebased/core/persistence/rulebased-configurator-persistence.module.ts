import { ModuleWithProviders, NgModule } from '@angular/core';
import { ConfigInitializerService, MODULE_INITIALIZER } from '@spartacus/core';
import { tap } from 'rxjs/operators';
import { RulebasedConfiguratorStatePersistenceService } from './rulebased-configurator-state-persistence.service';

export function configuratorStatePersistenceFactory(
  configuratorStatePersistenceService: RulebasedConfiguratorStatePersistenceService,
  configInit: ConfigInitializerService
) {
  const result = () =>
    configInit
      .getStable('context')
      .pipe(
        tap(() => {
          configuratorStatePersistenceService.initSync();
        })
      )
      .toPromise();
  return result;
}

/**
 * Complimentary module for rulebased configurator to store configuration ids in browser storage.
 * This makes it possible to work on the same configuration (per product) even after browser refresh
 */
@NgModule()
export class RulebasedConfiguratorPersistenceModule {
  static forRoot(): ModuleWithProviders<RulebasedConfiguratorPersistenceModule> {
    return {
      ngModule: RulebasedConfiguratorPersistenceModule,
      providers: [
        {
          provide: MODULE_INITIALIZER,
          useFactory: configuratorStatePersistenceFactory,
          deps: [
            RulebasedConfiguratorStatePersistenceService,
            ConfigInitializerService,
          ],
          multi: true,
        },
      ],
    };
  }
}
