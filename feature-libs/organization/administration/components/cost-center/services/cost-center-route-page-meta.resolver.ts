import { Injectable } from '@angular/core';
import {
  CostCenter,
  DefaultRoutePageMetaResolver,
  TranslationService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentCostCenterService } from './current-cost-center.service';

@Injectable({ providedIn: 'root' })
export class CostCenterRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
  constructor(
    translation: TranslationService,
    protected currentItemService: CurrentCostCenterService
  ) {
    super(translation);
  }

  protected getParams(): Observable<CostCenter> {
    return this.currentItemService.item$;
  }
}
