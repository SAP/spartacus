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
  const factoryFunction = () => {
    return Promise.all(
      lazyModuleService.runModuleInitializerFunctions(
        moduleInitializerFunctions
      )
    );
  };
  return factoryFunction;
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
