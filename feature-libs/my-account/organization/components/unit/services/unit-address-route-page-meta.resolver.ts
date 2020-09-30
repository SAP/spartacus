import { Injectable } from '@angular/core';
import {
  B2BAddress,
  DefaultRoutePageMetaResolver,
  TranslationService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentUnitAddressService } from '../links/addresses/services/current-unit-address.service';

@Injectable({ providedIn: 'root' })
export class UnitAddressRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
  constructor(
    translation: TranslationService,
    protected currentItemService: CurrentUnitAddressService
  ) {
    super(translation);
  }

  protected getParams(): Observable<B2BAddress> {
    return this.currentItemService.item$;
  }
}
