import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CmsComponent } from '../../../occ/occ-models/index';
import { CmsComponentAdapter } from './cms-component.adapter';
import { CmsStructureConfigService } from '../../services/cms-structure-config.service';
import { PageContext } from '../../../routing/models/page-context.model';

@Injectable({
  providedIn: 'root',
})
export class CmsComponentConnector {
  constructor(
    protected cmsStructureConfigService: CmsStructureConfigService,
    protected adapter: CmsComponentAdapter
  ) {}

  get<T extends CmsComponent>(
    id: string,
    pageContext: PageContext
  ): Observable<T> {
    return this.cmsStructureConfigService
      .getComponentFromConfig(id)
      .pipe(
        switchMap(configuredComponent =>
          configuredComponent
            ? of(configuredComponent)
            : this.adapter.load(id, pageContext)
        )
      );
  }

  getList(ids: string[], pageContext: PageContext): Observable<CmsComponent[]> {
    return this.cmsStructureConfigService.getComponentsFromConfig(ids).pipe(
      switchMap(configuredComponents => {
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
          return this.adapter
            .loadList(missingIds, pageContext)
            .pipe(
              map(loadedComponents => [
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
