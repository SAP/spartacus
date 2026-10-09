/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ComponentRef,
  ElementRef,
  inject,
  Injectable,
  Injector,
  NgModuleRef,
  PendingTasks,
  ViewContainerRef,
} from '@angular/core';
import { CmsComponentMapping, Priority } from '@spartacus/core';
import { defer, Observable } from 'rxjs';
import { DefaultComponentHandler } from './default-component.handler';
import { finalize, switchMap } from 'rxjs/operators';
import { ComponentHandler } from './component-handler';

/**
 * Lazy component handler used for launching lazy loaded cms components implemented
 * as native Angular components.
 */
@Injectable({
  providedIn: 'root',
})
export class LazyComponentHandler implements ComponentHandler {
  protected pendingTasks = inject(PendingTasks);

  constructor(protected defaultHandler: DefaultComponentHandler) {}

  /**
   * We want to mach dynamic import signature () => import('')
   */
  hasMatch(componentMapping: CmsComponentMapping): boolean {
    return (
      typeof componentMapping.component === 'function' &&
      this.isNotClass(componentMapping.component)
    );
  }

  private isNotClass(symbol: any): boolean {
    const signature = symbol.toString().substring(0, 20).replace(' ', '');
    return signature.startsWith('function()') || signature.startsWith('()=>');
  }

  getPriority(): Priority {
    return Priority.LOW;
  }

  launcher(
    componentMapping: CmsComponentMapping,
    viewContainerRef: ViewContainerRef,
    elementInjector?: Injector,
    module?: NgModuleRef<any>
  ): Observable<{ elementRef: ElementRef; componentRef?: ComponentRef<any> }> {
    return defer(() => {
      // Register the dynamic import as a pending task so Angular's stability
      // counter stays > 0 until the chunk is loaded. This prevents SSR from
      // serializing and destroying the app while the import() is still in flight
      // (which would cause NG0205 — destroyed injector). The task is removed by
      // finalize(), which fires on complete, error, and unsubscribe.
      const removeTaskTracking = this.pendingTasks.add();
      return defer(() => componentMapping.component()).pipe(
        finalize(removeTaskTracking)
      );
    }).pipe(
      switchMap((component) =>
        this.defaultHandler.launcher(
          { ...componentMapping, component },
          viewContainerRef,
          elementInjector,
          module
        )
      )
    );
  }
}
