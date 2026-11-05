/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  Injectable,
  Injector,
  RendererFactory2,
  inject,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { LAUNCH_CALLER, LaunchInlineRootDialog } from '../config/launch-config';
import { LaunchRenderStrategy } from './launch-render.strategy';

@Injectable({ providedIn: 'root' })
export class InlineRootRenderStrategy extends LaunchRenderStrategy {
  protected override document = inject(DOCUMENT);
  protected override rendererFactory = inject(RendererFactory2);
  protected injector = inject(Injector);

  get hostComponent() {
    return this.injector.get(ApplicationRef)?.components?.[0];
  }

  render(
    config: LaunchInlineRootDialog,
    caller: LAUNCH_CALLER | string
  ): Observable<ComponentRef<any>> | void {
    if (this.shouldRender(caller, config)) {
      const componentRef = createComponent(config.component, {
        environmentInjector: this.injector.get(EnvironmentInjector),
      });

      this.injector.get(ApplicationRef)?.attachView(componentRef.hostView);

      this.renderer.appendChild(
        this.hostComponent?.location.nativeElement,
        componentRef.location.nativeElement
      );

      if (config?.dialogType) {
        this.applyClasses(componentRef, config?.dialogType);
      }

      this.renderedCallers.push({ caller, component: componentRef });

      return of(componentRef);
    }
  }

  hasMatch(config: LaunchInlineRootDialog) {
    return Boolean(config.inlineRoot);
  }
}
