import {
  APP_INITIALIZER,
  Compiler,
  CompilerFactory,
  COMPILER_OPTIONS,
  ModuleWithProviders,
  NgModule,
  Optional,
} from '@angular/core';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
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
    ).catch((error) => {
      console.error(
        'MODULE_INITIALIZER promise was rejected during app initialization.',
        error
      );
      throw error;
    });
  };
  return factoryFunction;
}

export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
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
        { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
        {
          provide: CompilerFactory,
          useClass: JitCompilerFactory,
          deps: [COMPILER_OPTIONS],
        },
        {
          provide: Compiler,
          useFactory: createCompiler,
          deps: [CompilerFactory],
        },
      ],
    };
  }
}
