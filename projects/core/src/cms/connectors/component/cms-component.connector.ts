import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CmsComponent, CmsComponentList } from '../../../occ/occ-models/index';
import { CmsComponentAdapter } from './cms-component.adapter';
import { CmsStructureConfigService } from '../../services/cms-structure-config.service';
import { PageContext } from '../../../routing/models/page-context.model';
import { IdList } from '../../model/idList.model';

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

  getList(
    idList: IdList,
    pageContext: PageContext,
    fields?: string,
    currentPage?: number,
    pageSize?: number,
    sort?: string
  ): Observable<CmsComponentList> {
    return this.adapter.loadList(
      idList,
      pageContext,
      fields,
      currentPage,
      pageSize,
      sort
    );
  }
}
