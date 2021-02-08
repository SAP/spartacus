import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CmsComponent } from '../../../model/cms.model';
import { OccConfig } from '../../../occ/config/occ-config';
import { PageContext } from '../../../routing/models/page-context.model';
import { CmsStructureConfigService } from '../../services/cms-structure-config.service';
import { CmsComponentAdapter } from './cms-component.adapter';

@Injectable({
  providedIn: 'root',
})
export class CmsComponentConnector {
  constructor(
    protected cmsStructureConfigService: CmsStructureConfigService,
    protected cmsComponentAdapter: CmsComponentAdapter,
    protected config: OccConfig
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
          (acc, component, index) => {
            if (component === undefined) {
              acc.push(ids[index]);
            }
            return acc;
          },
          []
        );

        if (missingIds.length > 0) {
          return this.cmsComponentAdapter
            .findComponentsByIds(missingIds, pageContext)
            .pipe(
              map((loadedComponents) => [
                ...configuredComponents.filter(Boolean),
                ...loadedComponents,
              ])
            );
        } else {
          return of(configuredComponents);
        }
      })
    );
  }
}
