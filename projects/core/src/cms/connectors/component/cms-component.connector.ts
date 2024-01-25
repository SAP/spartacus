/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CmsComponent } from '../../../model/cms.model';
import { PageContext } from '../../../routing/models/page-context.model';
import { CmsConfig } from '../../config/cms-config';
import { CmsStructureConfigService } from '../../services/cms-structure-config.service';
import { CmsComponentAdapter } from './cms-component.adapter';

@Injectable({
  providedIn: 'root',
})
export class CmsComponentConnector {
  constructor(
    protected cmsStructureConfigService: CmsStructureConfigService,
    protected cmsComponentAdapter: CmsComponentAdapter,
    protected config: CmsConfig
  ) {}

  get<T extends CmsComponent>(
    id: string,
    pageContext: PageContext
  ): Observable<T> {
    return this.cmsStructureConfigService
      .getComponentFromConfig(id)
      .pipe(
        switchMap((configuredComponent) =>
          configuredComponent
            ? of(configuredComponent)
            : this.cmsComponentAdapter.load(id, pageContext)
        )
      );
  }

  getList(ids: string[], pageContext: PageContext): Observable<CmsComponent[]> {
    return this.cmsStructureConfigService.getComponentsFromConfig(ids).pipe(
      switchMap((configuredComponents) => {
        // check if we have some components that are not loaded from configuration
        const missingIds = configuredComponents.reduce(
          (acc: string[], component, index) => {
            if (component === undefined) {
              acc.push(ids[index]);
            }
            return acc;
          },
          []
        );

        if (missingIds.length > 0) {
          const pageSize =
            this.config.componentsLoading?.pageSize || missingIds.length;
          const totalPages = Math.ceil(missingIds.length / pageSize);
          const cmsComponents: Observable<CmsComponent[]>[] = [];

          let currentPage = 0;
          while (currentPage < totalPages) {
            cmsComponents.push(
              this.cmsComponentAdapter.findComponentsByIds(
                missingIds.slice(
                  currentPage * pageSize,
                  (currentPage + 1) * pageSize
                ),
                pageContext
              )
            );
            currentPage++;
          }
          return zip(...cmsComponents).pipe(
            map((loadedComponents) =>
              [...configuredComponents.filter(Boolean)].concat(
                ...loadedComponents
              )
            )
          );
        } else {
          return of(configuredComponents);
        }
      })
    );
  }
}
