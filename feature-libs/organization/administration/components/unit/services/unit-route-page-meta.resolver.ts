import { Injectable } from '@angular/core';
import {
  B2BUnit,
  DefaultRoutePageMetaResolver,
  TranslationService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentUnitService } from './current-unit.service';

@Injectable({ providedIn: 'root' })
export class UnitRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
  constructor(
    translation: TranslationService,
    protected currentItemService: CurrentUnitService
  ) {
    super(translation);
  }

  protected getParams(): Observable<B2BUnit> {
    return this.currentItemService.item$;
  }
}
