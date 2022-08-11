import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { PageContext } from '../../../routing/models/page-context.model';
import { CmsStructureModel } from '../../model/page.model';
import { CmsStructureConfigService } from '../../services/cms-structure-config.service';
import { CmsPageAdapter } from './cms-page.adapter';

@Injectable({
  providedIn: 'root',
})
export class CmsPageConnector {
  constructor(
    protected cmsPageAdapter: CmsPageAdapter,
    protected cmsStructureConfigService: CmsStructureConfigService
  ) {}

  /**
   * Returns an observable with the page structure. The page structure is
   * typically loaded from a backend, but can also be returned from static
   * configuration (see `CmsStructureConfigService`).
   */
  get(pageContext: PageContext): Observable<CmsStructureModel> {
    return this.cmsStructureConfigService
      .shouldIgnoreBackend(pageContext.id)
      .pipe(
        switchMap((loadFromConfig) => {
          if (!loadFromConfig) {
            return this.cmsPageAdapter.load(pageContext).pipe(
              catchError((error) => {
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
        switchMap((page) => this.mergeDefaultPageStructure(pageContext, page))
      );
  }

  /**
   *
   * Merge default page structure to the given `CmsStructureModel`.
   * This is beneficial for a fast setup of the UI without necessary
   * fine-grained CMS setup.
   */
  private mergeDefaultPageStructure(
    pageContext: PageContext,
    pageStructure: CmsStructureModel
  ): Observable<CmsStructureModel> {
    return this.cmsStructureConfigService.mergePageStructure(
      pageContext.id,
      pageStructure
    );
  }
}
