/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentRef, ElementRef, inject, Injectable, Injector, isDevMode, NgModuleRef, ViewContainerRef } from '@angular/core';
import {
  CmsComponentMapping,
  LoggerService,
  resolveApplicable,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { ComponentHandler } from '../handlers/component-handler';

/**
 * Responsible for obtaining component handler for specified component mapping
 */
@Injectable({
  providedIn: 'root',
})
export class ComponentHandlerService {
  protected handlers = inject(ComponentHandler, { optional: true });

  protected logger = inject(LoggerService);

  protected invalidMappings = new Set<CmsComponentMapping<any>>();

  /**
   * Get best matching component handler
   *
   * @param componentMapping
   */
  protected resolve(
    componentMapping: CmsComponentMapping
  ): ComponentHandler | undefined {
    const handler = resolveApplicable(this.handlers, [componentMapping]);

    if (isDevMode() && !handler) {
      if (!this.invalidMappings.has(componentMapping)) {
        this.invalidMappings.add(componentMapping);
        this.logger.warn(
          "Can't resolve handler for component mapping: ",
          componentMapping
        );
      }
    }

    return handler;
  }

  /**
   * Get launcher for specified component mapping
   *
   * @param componentMapping
   * @param viewContainerRef
   * @param elementInjector
   */
  getLauncher(
    componentMapping: CmsComponentMapping,
    viewContainerRef: ViewContainerRef,
    elementInjector?: Injector,
    module?: NgModuleRef<any>
  ):
    | Observable<{ elementRef: ElementRef; componentRef?: ComponentRef<any> }>
    | undefined {
    return this.resolve(componentMapping)?.launcher(
      componentMapping,
      viewContainerRef,
      elementInjector,
      module
    );
  }
}
