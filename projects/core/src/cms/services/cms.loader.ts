import { Injectable, Inject } from '@angular/core';
import { PageContext } from '../../routing/models/page-context.model';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

import { CMSPage } from '../../occ/occ-models/occ.models';
import { CmsStructureModel } from '../model/page.model';
import { Adapter } from '../adapters/index';
import { CmsStructureConfigService } from './cms-config.service';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Abstract class that can be used to implement custom loader logic
 * in order to load CMS structure from third-party CMS system.
 */
@Injectable({
  providedIn: 'root'
})
export abstract class CmsLoader<S> {
  constructor(
    protected cmsStructureConfigService: CmsStructureConfigService,
    @Inject(Adapter) protected adapters: Adapter<S, CmsStructureModel>[]
  ) {}

  /**
   * Abstract method that provides the page structure for a given page.
   * The page can be loaded from alternative sources, as long as the structure
   * converts to the `CmsStructureModel` (see the `adapt` logic in this class).
   *
   * @param pageContext The `PageContext` holding the page Id.
   */
  abstract loadPage(_pageContext: PageContext): Observable<S>;

  /**
   * Get's the page structure. The page structure will be loaded from
   * the backend, unless there's a page being forced in the configuration.
   * See the `CmsConfigService` for more information on this topic.
   *
   * In addition, the `CmsConfigService` is used to merge default
   * page structure into the page structure.
   */
  get(pageContext: PageContext): Observable<CmsStructureModel> {
    return this.cmsStructureConfigService
      .loadPageFromConfig(pageContext.id)
      .pipe(
        switchMap(loadFromConfig => {
          if (!loadFromConfig) {
            return this.loadPage(pageContext).pipe(
              map(page => this.adapt(page)),
              catchError(error => {
                if (
                  error instanceof HttpErrorResponse &&
                  error.status === 400
                ) {
                  return of({});
                } else {
                  return throwError(error);
                }
              })
            );
          } else {
            return of({});
          }
        }),
        switchMap(page => this.mergeDefaultPageStructure(pageContext, page))
      );
  }

  /**
   *
   * The adapters can be used to serialize the backend reponse to
   * the UI model. Customers can inject multiple adapters in order to
   * convert to the target model, or override the adapt method in
   * their implementation.
   *
   * @param page the source that can be converted
   */
  adapt(page: CMSPage): CmsStructureModel {
    const target: CmsStructureModel = { page: null, components: [] };
    if (this.adapters) {
      this.adapters.forEach(p => p.convert(<S>page, target));
    }
    return target;
  }

  /**
   *
   * Merge default page structure inot the given `CmsStructureModel`.
   * This is benefitial for a fast setup of the UI without necessary
   * finegrained CMS setup.
   */
  private mergeDefaultPageStructure(
    pageContext: PageContext,
    pageStructure: CmsStructureModel
  ): Observable<CmsStructureModel> {
    return this.cmsStructureConfigService.mergeConfig(
      pageContext.id,
      pageStructure
    );
  }
}
