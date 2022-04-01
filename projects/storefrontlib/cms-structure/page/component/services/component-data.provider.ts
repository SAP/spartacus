import { Injectable } from '@angular/core';
import { CmsService } from '@spartacus/core';
import { defer, EMPTY, Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CmsComponentsService } from '../../../services/cms-components.service';

/**
 * Provides data for `CmsComponentData`. This is used while component is injected
 * dynamically, so that the component implementation can access the data.
 *
 * The data is resolved from dynamic data (CMS api) as well as static configured data.
 */
@Injectable({
  providedIn: 'root',
})
export class ComponentDataProvider {
  constructor(
    protected componentsService: CmsComponentsService,
    protected cmsService: CmsService
  ) {}

  /**
   * Return the component data for a component given by the `uid`.
   *
   * If the `type` is provided, static component data (if available) is
   * merged into the component data. The static data is complemented and
   * overridden with data retrieved from the cms service.
   */
  get<T>(uid: string, type?: string): Observable<T> {
    return defer(() => {
      let staticComponentData: T;

      if (type) {
        staticComponentData = this.componentsService.getStaticData<T>(type);
      }

      if (uid) {
        if (staticComponentData) {
          return this.cmsService.getComponentData<T>(uid).pipe(
            map((data) => ({
              ...staticComponentData,
              ...data,
            })),
            startWith(staticComponentData)
          );
        } else {
          return this.cmsService.getComponentData<T>(uid);
        }
      } else {
        return staticComponentData ? of(staticComponentData) : EMPTY;
      }
    });
  }
}
