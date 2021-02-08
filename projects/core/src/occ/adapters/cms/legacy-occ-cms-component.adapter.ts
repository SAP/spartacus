import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { CMS_COMPONENT_NORMALIZER } from '../../../cms/connectors/component/converters';
import { CmsComponent } from '../../../model/cms.model';
import { PageContext } from '../../../routing';
import { Occ } from '../../occ-models/occ.models';
import { OccCmsComponentAdapter } from './occ-cms-component.adapter';

/**
 * Before 1905, the OCC CMS component API required was using POST method
 * to load a (potentially large) number of components. With 1905, the endpoint
 * evaluated to use GET. Switching from POST to GET has been initially implemented
 * with the `legacy` flag, but from version 3.0 onwards, we're moving the
 * implementation to this optional Adapter.
 *
 * If you like to connect to a pre 1905 version, you can provide this adapter for the
 * `CmsComponentAdapter` injection token.
 */
@Injectable({
  providedIn: 'root',
})
export class LegacyOccCmsComponentAdapter extends OccCmsComponentAdapter {
  findComponentsByIds(
    ids: string[],
    pageContext: PageContext,
    fields = 'DEFAULT',
    currentPage = 0,
    pageSize = ids.length,
    sort?: string
  ): Observable<CmsComponent[]> {
    const idList: Occ.ComponentIDList = { idList: ids };

    const requestParams = {
      ...this.getContextParams(pageContext),
      ...this.getPaginationParams(currentPage, pageSize, sort),
    };

    return this.http
      .post<Occ.ComponentList>(
        this.getComponentsEndpoint(requestParams, fields),
        idList,
        {
          headers: this.headers,
        }
      )
      .pipe(
        pluck('component'),
        this.converter.pipeableMany(CMS_COMPONENT_NORMALIZER)
      );
  }
}
