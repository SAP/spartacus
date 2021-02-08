import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  Optional,
} from '@angular/core';
import { LazyModulesService } from './lazy-modules.service';
import { MODULE_INITIALIZER } from './tokens';

export function moduleInitializersFactory(
  lazyModuleService: LazyModulesService,
  moduleInitializerFunctions: (() => any)[]
): () => any {
  return () => {
    const asyncInitPromises: Promise<
      any
    >[] = lazyModuleService.runModuleInitializerFunctions(
      moduleInitializerFunctions
    );
    Promise.all(asyncInitPromises).catch((error) => {
      console.error(
        `MODULE_INITIALIZER promise was rejected when app was initialized: `,
        error
      );
      throw error;
    });
  };
}

@NgModule({})
export class LazyLoadingModule {
  static forRoot(): ModuleWithProviders<LazyLoadingModule> {
    return {
      ngModule: LazyLoadingModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: moduleInitializersFactory,
          deps: [LazyModulesService, [new Optional(), MODULE_INITIALIZER]],
          multi: true,
        },
      ],
    };
  }
}
