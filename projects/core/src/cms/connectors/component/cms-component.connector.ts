import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CmsComponent, CmsComponentList } from '../../../occ/occ-models/index';
import { CmsComponentAdapter } from './cms-component.adapter';
import { CmsStructureConfigService } from '../../services/cms-structure-config.service';
import { NormalizersService } from '../../../util/normalizers.service';
import { PageContext } from '../../../routing/models/page-context.model';
import { IdList } from '../../model/idList.model';
import {
  CMS_COMPONENT_LIST_NORMALIZER,
  CMS_COMPONENT_NORMALIZER,
} from './cms-component.normalizer';

@Injectable({
  providedIn: 'root',
})
export class CmsComponentConnector {
  constructor(
    protected cmsStructureConfigService: CmsStructureConfigService,
    protected adapter: CmsComponentAdapter<any, any>,
    protected normalizers: NormalizersService
  ) {}

  get(id: string, pageContext: PageContext): Observable<CmsComponent> {
    return this.cmsStructureConfigService
      .getComponentFromConfig(id)
      .pipe(
        switchMap(configuredComponent =>
          configuredComponent
            ? of(configuredComponent)
            : this.adapter
                .load(id, pageContext)
                .pipe(this.normalizers.pipeable(CMS_COMPONENT_NORMALIZER))
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
    return this.adapter
      .loadList(idList, pageContext, fields, currentPage, pageSize, sort)
      .pipe(this.normalizers.pipeable(CMS_COMPONENT_LIST_NORMALIZER));
  }
}
