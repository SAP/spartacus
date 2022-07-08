import { Injectable } from '@angular/core';
import {
  B2BUnit,
  DefaultRoutePageMetaResolver,
  TranslationService,
} from '@spartacus/core';
import { CurrentUnitService } from '@spartacus/organization/administration/components';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountSummaryRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
  constructor(
    translation: TranslationService,
    protected currentItemService: CurrentUnitService
  ) {
    super(translation);
  }

  protected getParams(): Observable<B2BUnit | undefined> {
    return this.currentItemService.item$;
  }
}
