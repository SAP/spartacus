/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  Optional,
  inject,
} from '@angular/core';
import { LoggerService } from '../logger';
import { LazyModulesService } from './lazy-modules.service';
import { MODULE_INITIALIZER } from './tokens';

export function moduleInitializersFactory(
  lazyModuleService: LazyModulesService,
  moduleInitializerFunctions: (() => any)[]
): () => any {
  const logger = inject(LoggerService);
  const factoryFunction = () => {
    return Promise.all(
      lazyModuleService.runModuleInitializerFunctions(
        moduleInitializerFunctions
      )
    ).catch((error) => {
      logger.error(
        'MODULE_INITIALIZER promise was rejected during app initialization.',
        error
      );
      throw error;
    });
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
