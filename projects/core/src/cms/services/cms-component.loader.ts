import { Injectable, Optional } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CmsComponent } from '../../occ/occ-models/index';
import { PageContext } from '../../routing/models/page-context.model';
import { CmsComponentAdapter } from './cms-component.adapter';
import { CmsStructureConfigService } from './cms-structure-config.service';

/**
 * Abstract class that can be used to implement custom loader logic
 * in order to load CMS components from third-party CMS system.
 */
@Injectable({
  providedIn: 'root',
})
export abstract class CmsComponentLoader<T> {
  constructor(
    protected cmsStructureConfigService: CmsStructureConfigService,
    @Optional() protected adapter: CmsComponentAdapter<T>
  ) {}

  /**
   * Abstract method must be used to load the component for a given `id` and `PageContext`.
   * The component can be loaded from alternative backend, as long as the structure
   * converts to the `CmsStructureModel`.
   *
   * @param pageContext The `PageContext` holding the page Id.
   */
  abstract load(
    id: string,
    pageContext: PageContext,
    fields?: string
  ): Observable<T>;

  /**
   */
  get(id: string, pageContext: PageContext): Observable<CmsComponent> {
    return this.cmsStructureConfigService
      .getComponentFromConfig(id)
      .pipe(
        switchMap(configuredComponent =>
          configuredComponent
            ? of(configuredComponent)
            : this.load(id, pageContext).pipe(
                map(component => this.adapt(component))
              )
        )
      );
  }

  /**
   *
   * An adapter can be injected to convert the backend reponse to
   * the UI model.
   *
   * @param component the source that can be converted
   */
  adapt(component: T): CmsComponent {
    if (this.adapter) {
      return this.adapter.adapt(<T>component);
    }
    return <CmsComponent>component;
  }
}
