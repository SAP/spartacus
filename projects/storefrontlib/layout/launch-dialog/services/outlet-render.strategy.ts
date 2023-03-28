/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCUMENT } from '@angular/common';
import {
  ComponentRef,
  Inject,
  Injectable,
  RendererFactory2,
  Type,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  OutletPosition,
  OutletService,
} from '../../../cms-structure/outlet/index';
import { OutletRendererService } from '../../../cms-structure/outlet/outlet-renderer.service';
import { LaunchOutletDialog, LAUNCH_CALLER } from '../config/index';
import { LaunchRenderStrategy } from './launch-render.strategy';

@Injectable({ providedIn: 'root' })
export class OutletRenderStrategy extends LaunchRenderStrategy {
  constructor(
    @Inject(DOCUMENT) protected document: any,
    protected rendererFactory: RendererFactory2,
    protected outletService: OutletService<Type<any>>,
    protected outletRendererService: OutletRendererService
  ) {
    super(document, rendererFactory);
  }

  /**
   * Renders the element in the configured outlet
   *
   * @param config
   * @param caller
   * @param vcr
   */
  render(
    config: LaunchOutletDialog,
    caller: LAUNCH_CALLER | string
  ): Observable<ComponentRef<any> | undefined> | void {
    if (this.shouldRender(caller, config)) {
      this.outletService.add(
        config.outlet,
        config.component,
        config.position ? config.position : OutletPosition.BEFORE
      );
      this.outletRendererService.render(config.outlet);
      this.renderedCallers.push({ caller });

      return this.outletRendererService.getOutletRef(config.outlet).pipe(
        map((outletDirective) => {
          const components = outletDirective.renderedComponents.get(
            config.position ? config.position : OutletPosition.BEFORE
          ) as ComponentRef<any>[];

          return components
            .reverse()
            .find((component) => component.componentType === config.component);
        }),
        tap((component) => {
          if (config?.dialogType && component) {
            this.applyClasses(component, config?.dialogType);
          }
        })
      );
    }
  }

  hasMatch(config: LaunchOutletDialog) {
    return Boolean(config.outlet);
  }

  remove(caller: LAUNCH_CALLER | string, config: LaunchOutletDialog): void {
    this.outletService.remove(
      config.outlet,
      config.position ? config.position : OutletPosition.BEFORE,
      config.component
    );

    super.remove(caller, config);
  }
}
