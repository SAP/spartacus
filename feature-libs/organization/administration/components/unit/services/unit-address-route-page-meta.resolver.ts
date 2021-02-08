import { Injectable } from '@angular/core';
import {
  Address,
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

  protected getParams(): Observable<Address> {
    return this.currentItemService.item$;
  }
}
