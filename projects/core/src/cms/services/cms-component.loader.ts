import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CmsComponent } from '../../occ';
import { PageContext } from '../../routing/models/page-context.model';
import { CmsPageAdapter } from './cms-page.adapter';
import { CmsStructureConfigService } from './cms-structure-config.service';

/**
 * Abstract class that can be used to implement custom loader logic
 * in order to load CMS components from third-party CMS system.
 */
@Injectable({
  providedIn: 'root'
})
export abstract class CmsComponentLoader<T> {
  constructor(
    protected cmsStructureConfigService: CmsStructureConfigService,
    protected adapter: CmsPageAdapter<T>
  ) {}

  /**
   * Abstract method must be used to load the component for a given `id` and `PageContext`.
   * The component can be loaded from alternative backend, as long as the structure
   * converts to the `CmsStructureModel`.
   *
   * @param pageContext The `PageContext` holding the page Id.
   */
  abstract load(
    _id: string,
    _pageContext: PageContext,
    _fields?: string
  ): Observable<CmsComponent>;

  /**
   */
  get(id: string, pageContext: PageContext): Observable<CmsComponent> {
    return this.cmsStructureConfigService
      .getComponentFromConfig(id)
      .pipe(
        switchMap(component =>
          component ? of(component) : this.load(id, pageContext)
        )
      );
  }
}
